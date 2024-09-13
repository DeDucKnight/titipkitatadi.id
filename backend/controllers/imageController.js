const { Product, ProductImage, ProductCategory, Category, CategoryDetail, Image, sequelize } = require('../models');

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { log } = require('console');
const { Op, json } = require('sequelize');
require('dotenv').config();

// Create temp file
const decodeBase64Image = (dataString) => {
    const matches = dataString.match(/^data:(.+);base64,(.+)$/);
    const response = {};

    if (matches.length !== 3) {
        throw new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    return response;
};

// GUID Validator
const isValidUUID = (productId) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return productId && uuidRegex.test(productId);
};

// Upload Image
exports.upload_image = async (req, res) => {
    const { productId } = req.params;
    const file = req.file;

    console.log(productId);

    const t = await sequelize.transaction();
    try {
        // Check if the file exists
        if (!file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Create a FormData object to send the image to Cloudflare
        const formData = new FormData();
        formData.append('file', fs.createReadStream(file.path));

        // Upload the image to Cloudflare
        const response = await axios.post(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
                    ...formData.getHeaders(),
                },
            }
        );
        console.log("upload cloudflare");

        // Ensure the Cloudflare upload was successful
        if (!response.data || !response.data.result) {
            await t.rollback();
            throw new Error('Cloudflare upload failed');
        }

        fs.promises.unlink(file.path).catch(err => {
            console.error('Failed to delete temp file:', err);
        });
        console.log("delete temp");

        // Extract the image information from Cloudflare response
        const { id, variants } = response.data.result;
        const imagePath = variants[0];
        console.log(id);
        console.log(imagePath);

        // Save image information to the database
        const image = await Image.create({
            cdnid: id,
            imagepath: imagePath,
            imagetype: req.body.imagetype || 'banner',
        }, { transaction: t });
        console.log("create image");

        // Uploading product image
        if (productId && isValidUUID(productId)) {
            const productImage = await ProductImage.create({
                productid: productId,
                imageid: image.imageid
            }, { transaction: t });
            console.log("create product image");
        };

        await t.commit();
        res.status(200).json({ message: 'Image uploaded successfully', image });
    } catch (error) {
        await t.rollback();
        console.error('Error uploading image:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Upload product image - unused
exports.upload_product_image = async (req, res) => {
    const { productId } = req.params;
    const { base64, color, isDefault } = req.body;

    if (!base64) {
        return res.status(400).json({ error: 'Image data is required' });
    }

    try {
        const decodedImage = decodeBase64Image(base64);
        const tempFilePath = path.join(__dirname, '../uploads', `${Date.now()}.jpg`);

        // Save the image as a temporary file
        fs.writeFileSync(tempFilePath, decodedImage.data);

        // Create a FormData object to send the image to Cloudflare
        const formData = new FormData();
        formData.append('file', fs.readFileSync(tempFilePath));

        // Upload to Cloudflare Images
        const response = await axios.post(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
                    ...formData.getHeaders(),
                },
            }
        );

        // Delete the temporary local file after uploading
        fs.unlinkSync(tempFilePath);

        // Create image & productImage 
        const id = response.data.result.id;
        const path = response.data.result.variants[0];

        const image = await Image.create({
            cdnid: id,
            imagepath: path,
            imagetype: 'product',
        });

        // Send back the Cloudflare image URL or ID
        res.status(200).json({ message: 'Image created successfully', image });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Upload image test
exports.upload_image_test = async (req, res) => {
    // const { productId } = req.params;
    const { test } = req.body;

    try {
        const image = fs.readFileSync('./test_image_1.jpg');

        // Create a FormData object to send the image to Cloudflare
        const formData = new FormData();
        formData.append("file", image, "image_test_1");

        // Upload to Cloudflare Images
        const response = await axios.post(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
                    ...formData.getHeaders(),
                },
            }
        );

        const id = response.data.result.id;
        const path = response.data.result.variants[0];
        const newImage = await Image.create({
            cdnid: id,
            imagepath: path,
            imagetype: 'product',
        });

        // Send back the Cloudflare image URL or ID
        console.log(await json(response));
        res.status(200).json({ message: 'Image created successfully', newImage });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Get image
exports.get_images = async (req, res) => {
    try {
        const images = await Image.findAll({
            where: {
                imagetype: { [Op.ne]: 'product' }
            },
            attributes: ['cdnid', 'imagepath', 'imagetype'],
            order: [['createddate', 'DESC']]
        });

        if (images.length === 0) {
            return res.status(200).json({ message: 'No images found', images: [] });
        }

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
};

// Get image by product id
exports.get_images_by_productid = async (req, res) => {
    const { productId } = req.params;
    try {
        const images = await Image.findAll({
            where: {
                productid: productId
            },
            attributes: ['cdnid', 'imagepath', 'imagetype'],
            order: [['createddate', 'DESC']]
        });

        if (images.length === 0) {
            return res.status(200).json({ message: 'No images found', images: [] });
        }

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
};

// Get image test
exports.get_image_test = async (req, res) => {
    const imageId = 'b9e7d8b1-9125-4734-35a8-d8a5764c5500';

    const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${imageId}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
            },
            responseType: 'arraybuffer'
        });

        // Set the appropriate headers for the image
        res.set('Content-Type', response.headers['content-type']);
        res.set('Content-Length', response.headers['content-length']);

        // Send the image data to the client
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image from Cloudflare:', error.message);
        res.status(500).send('Failed to fetch image');
    }
}

// Delete image function
exports.delete_image = async (req, res) => {
    const { imageId } = req.params;

    try {
        const image = await Image.findOne({ where: { cdnid: imageId } });

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Send a DELETE request to Cloudflare
        const response = await axios.delete(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${imageId}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.CLOUDFLARE_TOKEN}`
                }
            }
        );

        if (!response.data.success) {
            throw new Error('Cloudflare deletion failed');
        }

        // Delete the image from database
        await Image.destroy({ where: { cdnid: imageId } });

        // Return success response
        res.status(200).json({ message: 'Image deleted successfully' });

    } catch (error) {
        console.error('Error deleting image:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to delete image' });
    }
};

// Update image
exports.update_image_by_cdnid = async (req, res) => {
    const images = req.body;

    if (!Array.isArray(images)) {
        return res.status(400).json({ error: 'Invalid data format. Expected an array of image objects.' });
    }

    try {
        // Loop through each image in the array
        for (const imageObj of images) {
            const { cdnid, properties } = imageObj;

            if (!cdnid || !properties) {
                return res.status(400).json({ error: `Missing cdnid or properties for image.` });
            }

            // Find the image by cdnid
            const image = await Image.findOne({ where: { cdnid } });

            if (!image) {
                return res.status(404).json({ error: `Image with cdnid ${cdnid} not found.` });
            }

            await image.update({ properties });
        }

        res.status(200).json({ message: 'Images updated successfully.' });
    } catch (err) {
        console.error('Error updating images:', err);
        res.status(500).json({ error: 'Failed to update images.' });
    }
};

const { Product, ProductImage, ProductCategory, Category, CategoryDetail, Image } = require('../models');

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const { log } = require('console');
const { json } = require('sequelize');
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

// Upload banner image
exports.upload_image = async (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({ error: 'Image data is required' });
    }

    try {
        const decodedImage = decodeBase64Image(image);
        const tempFilePath = path.join(__dirname, '../uploads', `${Date.now()}.jpg`);

        // Save the image as a temporary file
        fs.writeFileSync(tempFilePath, decodedImage.data);

        // Create a FormData object to send the image to Cloudflare
        const formData = new FormData();
        formData.append('file', fs.createReadStream(tempFilePath));

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

        // Create image 
        const variantPath = response.data.result.variants[0];

        const image = await Image.create({
            imagepath: variantPath,
            imagetype: 'banner',
        });


        // Send back the Cloudflare image URL or ID
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Upload product image
exports.upload_product_image = async (req, res) => {
    const { productId } = req.params;
    const { image, color, isDefault } = req.body;

    if (!image) {
        return res.status(400).json({ error: 'Image data is required' });
    }

    try {
        const decodedImage = decodeBase64Image(image);
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
        const variantPath = response.data.result.variants[0];

        const image = await Image.create({
            imagepath: variantPath,
            imagetype: 'product',
        });

        const productImage = await ProductImage.create({
            productid: productId,
            imageid: image.imageid,
            color: color,
            isdefault: isDefault
        })

        // Send back the Cloudflare image URL or ID
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Create image test
exports.upload_image_test = async (req, res) => {
    const { productId } = req.params;

    try {
        const image = fs.readFileSync('./sample-data/test_image_1.jpg');

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

        const variantPath = response.data.result.variants[0];

        const product = await ProductImage.create({

        });

        // Send back the Cloudflare image URL or ID
        console.log(await json(response));
        res.status(200).json(response);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Get image test
exports.get_image_test = async (req, res) => {
    const apiToken = 'rot7C1YxhAf3IUc4KmE4EJrGDa_1x7jVJiKimLi8'; 
    const accountId = '8c38baf0067f9ddd3e408e6702ad02bd'; 
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
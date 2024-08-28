const { Category, CategoryDetail } = require('../models');

// Create a New Category & Category Details
exports.create_category = async (req, res) => {
    const { CategoryName, IsStandard, CategoryDetails } = req.body;

    try {
        const category = await Category.create(
            { 
                categoryname: CategoryName, 
                isstandard: IsStandard,
            });
        
        if (CategoryDetails && CategoryDetails.length > 0) {
            for (const x of CategoryDetails) {
                await CategoryDetail.create(
                    {
                        categoryid: category.categoryid,
                        categorydetailname: x.CategoryDetailName,
                    }
                )
            }
        }
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

// Get All Categories
exports.get_categories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: {
                model: CategoryDetail                
            }
        });
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// Update a Category by ID
exports.update_category = async (req, res) => {
    const { categoryId } = req.params;
    const updates = req.body;

    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.update(updates);
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// Update a Category Detail by ID
exports.update_category_detail = async (req, res) => {
    const { categoryDetailId } = req.params;
    const updates = req.body;

    try {
        const categoryDetail = await CategoryDetail.findByPk(categoryDetailId);

        if (!categoryDetail) {
            return res.status(404).json({ message: 'Category Detail not found' });
        }

        await categoryDetail.update(updates);
        res.status(200).json({ message: 'Category detail updated successfully', category });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update category detail' });
    }
};

// Delete a Category by ID
exports.delete_category = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

// Delete a Category Detail by ID
exports.delete_category_detail = async (req, res) => {
    const { categoryDetailId } = req.params;

    try {
        const categoryDetail = await CategoryDetail.findByPk(categoryDetailId);

        if (!categoryDetail) {
            return res.status(404).json({ message: 'Category detail not found' });
        }

        await categoryDetail.destroy();
        res.status(200).json({ message: 'Category detail deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete category detail' });
    }
};

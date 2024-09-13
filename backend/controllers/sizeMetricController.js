const { SizeMetric, SizeAttribute, sequelize } = require('../models');

// Create a New Size Metric & Size Attributes
exports.create_size_metric = async (req, res) => {
    const { sizemetricname, SizeAttributes } = req.body;
    
    const t = await sequelize.transaction();
    try {
        // Create Size MEtric
        const sizeMetric = await SizeMetric.create({
            sizemetricname
        }, { transaction: t });

        // Bulk Create SizeAttributes
        if (SizeAttributes && SizeAttributes.length > 0) {
            const sizeAttributesToInsert = SizeAttributes.map(attr => ({
                sizemetricid: sizeMetric.sizemetricid,
                sizeattributename: attr.sizeattributename,
            }));

            await SizeAttribute.bulkCreate(sizeAttributesToInsert, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ message: 'Size metric created successfully', sizeMetric });

    } catch (err) {
        await t.rollback();
        console.error('Error creating size metric:', err);
        res.status(500).json({ error: 'Failed to create size metric' });
    }
};

// Get All Size Metrics
exports.get_size_metrics = async (req, res) => {
    try {
        const sizeMetric = await SizeMetric.findAll({
            include: {
                model: SizeAttribute,
                attributes: ['sizeattributeid', 'sizeattributename'],
            },
            order: [['sizemetricname', 'ASC']]
        });
        res.status(200).json(sizeMetric);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch size metrics' });
    }
};

// Get size metric by Id
exports.get_size_metric_by_id = async (req, res) => {
    const { sizemetricid } = req.params;

    try {
        const sizeMetric = await SizeMetric.findByPk(sizemetricid, {
            include: {
                model: SizeAttribute,
                attributes: ['sizeattributeid', 'sizeattributename'],
            }
        });

        if (!sizeMetric) {
            return res.status(404).json({ message: 'Size metric not found' });
        }

        res.status(200).json(sizeMetric);
    } catch (err) {
        console.error('Error fetching size metric:', err);
        res.status(500).json({ error: 'Failed to fetch size metric' });
    }
};

// Update a size metric by ID
exports.update_size_metric = async (req, res) => {
    const { sizemetricid } = req.params;
    const updates = req.body;

    const t = await sequelize.transaction();
    try {
        // Update Size Metric
        const sizeMetric = await SizeMetric.findByPk(sizemetricid, { transaction: t });

        if (!sizeMetric) {
            await t.rollback();
            return res.status(404).json({ message: 'Size metric not found' });
        }

        await sizeMetric.update(updates, { transaction: t });

        // Update Size Attributes
        if (updates.SizeAttributes && updates.SizeAttributes.length > 0) {
            // Fetch existing Size Attributes related to this category
            const existingSizeAttributes = await SizeAttribute.findAll({
                where: { sizemetricid },
                transaction: t
            });

            const existingSizeAttributeIds = existingSizeAttributes.map(attribute => attribute.sizeattributeid);
            const newSizeAttributes = updates.SizeAttributes.map(attribute => attribute.sizeattributeid);

            // Bulk Update or Create Size Attributes
            const updatesToApply = [];
            const newAttributesToCreate = [];

            for (const attribute of updates.SizeAttributes) {
                const sizeattributeid = attribute.sizeattributeid;

                if (existingSizeAttributeIds.includes(sizeattributeid)) {
                    // Add to update list
                    updatesToApply.push({
                        sizeattributeid: sizeattributeid,
                        sizeattributename: attribute.sizeattributename,
                        sizemetricid: sizemetricid
                    });
                } else {
                    // Add to create list
                    newAttributesToCreate.push({
                        sizeattributeid: sizeattributeid,
                        sizeattributename: attribute.sizeattributename,
                        categoryid: categoryid
                    });
                }
            }

            // Apply bulk updates
            if (updatesToApply.length > 0) {
                await Promise.all(updatesToApply.map(attribute => 
                    SizeAttribute.update(attribute, {
                        where: { sizeattributeid: attribute.sizeattributeid },
                        transaction: t
                    })
                ));
            }

            // Apply bulk creates
            if (newAttributesToCreate.length > 0) {
                await SizeAttribute.bulkCreate(newAttributesToCreate, { transaction: t });
            }

            // Remove Size Attributes that are no longer in the request
            const attributesToRemove = existingSizeAttributes.filter(
                attribute => !newSizeAttributes.includes(attribute.sizeattributeid)
            );

            if (attributesToRemove.length > 0) {
                await SizeAttribute.destroy({
                    where: {
                        sizeattributeid: attributesToRemove.map(attribute => attribute.sizeattributeid)
                    },
                    transaction: t
                });
            }
        }

        await t.commit();
        res.status(200).json({ message: 'Category updated successfully', category });

    } catch (err) {
        await t.rollback();
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

const { Announcement, sequelize } = require('../models');

// Create a new announcement
exports.create_announcement = async (req, res) => {
  try {
    const { announcementtext } = req.body;

    const newAnnouncement = await Announcement.create({
      announcementtext,
    });

    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all announcements
exports.get_announcements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      order: [['createddate', 'DESC']],
    });
    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single announcement by ID
exports.get_announcement_by_id = async (req, res) => {
  try {
    const { announcementid } = req.params;

    const announcement = await Announcement.findByPk(announcementid);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an announcement
exports.update_announcement = async (req, res) => {
  try {
    const { announcementid } = req.params;
    const updates = req.body;

    const announcement = await Announcement.findByPk(announcementid);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    announcement.update(updates);

    res.status(200).json(announcement);
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an announcement
exports.delete_announcement = async (req, res) => {
  try {
    const { announcementid } = req.params;

    const announcement = await Announcement.findByPk(announcementid);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    await announcement.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

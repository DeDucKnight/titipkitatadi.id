const express = require('express');
const announcementController = require('../controllers/announcementController');

const router = express.Router();

router.post('/announcements', announcementController.create_announcement);
router.post('/announcements-bulk', announcementController.bulk_create_announcements);
router.get('/announcements', announcementController.get_announcements);
router.get('/announcements/:announcementid', announcementController.get_announcement_by_id);
router.put('/announcements/:announcementid', announcementController.update_announcement);
router.delete('/announcements/:announcementid', announcementController.delete_announcement);

module.exports = router;

const express = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const canEdit = require('../middlewares/canEdit');
const entrieExist = require('../middlewares/entrieExist');

const {
    createEntrie,
    deleteEntrie,
    modifyEntry,
    getEntry,
    listEntries,
    voteEntry,
    addEntryPhoto,
    deleteEntryPhoto
} = require('../controllers/entries');

const router = express.Router();

router.post('/entries', tokenMiddleware ,createEntrie);
router.get('/entries', listEntries);
router.get('/entries/:id', entrieExist, getEntry);
router.delete('/entries/:id', tokenMiddleware, entrieExist, canEdit, deleteEntrie);
router.patch('/entries/:id', tokenMiddleware, entrieExist, canEdit, modifyEntry);
router.post('/entries/:id/votes', tokenMiddleware, entrieExist, voteEntry);
router.post('/entries/:id/photos', tokenMiddleware, entrieExist, canEdit, addEntryPhoto);
router.delete('/entries/:id/photos/:photoID', tokenMiddleware, entrieExist, canEdit, deleteEntryPhoto);

module.exports = router;
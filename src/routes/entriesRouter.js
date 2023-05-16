const express = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const canEdit = require('../middlewares/canEdit');
const entrieExist = require('../middlewares/entrieExist');

const {createEntrie, deleteEntrie, modifyEntry} = require('../controllers/entries');

const router = express.Router();

router.post('/entries', tokenMiddleware ,createEntrie);
router.delete('/entries/:id', tokenMiddleware, entrieExist, canEdit, deleteEntrie);
router.patch('/entries/:id', tokenMiddleware, entrieExist, canEdit, modifyEntry);

module.exports = router;
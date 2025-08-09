const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');



router.get("/",messageController.getAllMessages);
router.get("/new-msg" , messageController.createMessageGet)
router.post("/new-msg" , messageController.createMessagePost)
router.get('/delete-msg/:id' , messageController.deleteMessage);



module.exports= router;
const db = require('../db/queries')
const passport = require('passport')


async function  getAllMessages(req,res) {

   const messages= await db.getAllMessages();
        res.render('index', { user: req.user, messages: messages });
    
}

async function createMessageGet(req,res) {
        if(!req.user){
        return res.redirect('/log-in')
    }
     if(!req.user.is_member){
        return res.render('member');
    }
    res.render("message-form");
}

async function  createMessagePost(req,res) {
    if(!req.user ){
        return res.redirect('/log-in')
    }
   
    const content = req.body.content;
    const user_id = req.user.id;
    if (!content || content.trim() === '') {
    return res.status(400).send("Message content cannot be empty.");
}
      
    await db.insertMessage(user_id, content);
    res.redirect('/');
}

async function  deleteMessage(req,res) {
    const {id} = req.params;
    await db.deleteMessage(id);
    res.redirect('/');
}

module.exports={getAllMessages,createMessageGet,createMessagePost,deleteMessage};
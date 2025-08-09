const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

router.get('/', messageController.getAllMessages)
router.get('/log-in', userController.createLogInGet);
router.post('/log-in', userController.createLogInPost);

router.get('/sign-up', userController.createSignUpGet);
router.post('/sign-up', userController.createSignUpPost);

router.get('/log-out', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/log-in');
    }
  });
});


router.post('/member', userController.makeMember)



module.exports = router;
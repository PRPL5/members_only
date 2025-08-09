const db = require('../db/queries')
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;


const createSignUpGet = async(req,res)=>{
res.render('sign-up')

}

const createSignUpPost = async (req,res)=>{
    const { firstname , lastname , email , password , confirmPassword } = req.body;
    if (!firstname || !lastname || !email || !password || !confirmPassword ){
        return res.status(400).json({error:"All fields are required !!"});
    } 
  if (password !== confirmPassword) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('/sign-up');
  }
    await db.insertUser(firstname , lastname , email , password );
    res.redirect('/log-in')
}

const createLogInGet = async (req,res)=>{
    res.render('log-in')
} 


const createLogInPost = passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureFlash: true
});


const makeMember = async (req, res) => {
  const codeword = req.body.codeword;
  const correctCodeword = 'jakubbaba';

  if (codeword === correctCodeword) {
    const id = req.user.id;
    await db.makeMember(id);
    res.redirect('/');
  } else {
    res.render('member', { error: 'Wrong code' });
  }
};

module.exports = {
    createLogInGet,
    createSignUpGet,
    createLogInPost,
    createSignUpPost,
    makeMember
};
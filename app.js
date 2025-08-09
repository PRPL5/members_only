const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const db = require('./db/queries')
const bcrypt = require('bcryptjs')
const flash = require('express-flash');
const session = require('express-session');

app.use(session({
  secret: 'jakubbaba',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");


const userRoutes = require('./routes/userRoutes');
app.use('/' , userRoutes);

const messageRoutes = require('./routes/messageRoutes');
app.use('/', messageRoutes);

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const rows = await db.getUser(email);
      const user = rows && rows[0];
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await db.getUserById(id);
    const user = rows && rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.listen(3000, () => console.log("app listening on port 3000!"));
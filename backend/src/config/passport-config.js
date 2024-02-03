const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Add this line
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_default_secret_key',
};

const passportConfig = () => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.id);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user || !(await user.comparePassword(password))) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};

module.exports = passportConfig;
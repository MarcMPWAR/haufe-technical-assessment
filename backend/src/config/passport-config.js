const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Add this line
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "51d5cb5a9f2f237f5c8d2c1f7d68e2887d7d9f4d1dd5bc7e24f7e75d697f6872",
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
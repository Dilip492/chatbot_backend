import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../models/User.js"
import dotenv from "dotenv"
dotenv.config();

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User');

// console.log(process.env.BACKEND_URL)


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,

        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log('Google Profile:', profile);

                // Check if user exists by googleId

                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // Update last login
                    user.lastLogin = new Date();
                    await user.save();
                    return done(null, user);
                }

                // Check if user exists by email
                const existingUser = await User.findOne({ email: profile.emails[0].value });

                if (existingUser) {
                    // Link Google account to existing user
                    existingUser.googleId = profile.id;
                    existingUser.provider = 'google';
                    existingUser.lastLogin = new Date();
                    await existingUser.save();
                    return done(null, existingUser);
                }

                // Create new user
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName || profile.name?.givenName || 'User',
                    email: profile.emails[0].value,
                    profilePicture: profile.photos?.[0]?.value || '',
                    provider: 'google',
                    isVerified: true,
                });

                await newUser.save();
                return done(null, newUser);
                
            } catch (error) {
                console.error('Google Strategy Error:', error);
                return done(error, null);
            }
        }
    )
);

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});



export default passport;
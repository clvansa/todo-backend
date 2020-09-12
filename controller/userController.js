require('dotenv/config')
const User = require('../model/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.SignupUser = async (req, res, next) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json(errors.errors);

        const user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).json({ msg: "This Email is token" })
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });
        await newUser.save();
        const token = await jwt.sign(String(newUser._id), process.env.SECRET);
        res.status(200).json(token);
    } catch (err) {
        console.error(err);
    }

}

exports.loginUser = async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ msg: "Email not found" })
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) return res.status(400).json({ msg: "Email or Password is wrong" })
        const token = await jwt.sign(String(user._id), process.env.SECRET);
        res.status(200).json(token);
    } catch (err) {
        console.error(err);
    }

}


exports.getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) return res.status(400).json({ msg: "Email not found" })
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
    }

}
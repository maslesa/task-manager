const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userRegister = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        const userAlreadyExists = await User.findOne({$or : [{username}, {email}]});
        if(userAlreadyExists){
            return res.status(400).json({
                success: false,
                message: 'User with that username or email already exists'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username : username,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        if(newUser){
            res.status(200).json({
                success: true,
                message: 'User registered successfully',
                data: newUser
            })
        }else{
            res.status(400).json({
                success: false,
                message: 'User could not be created'
            })
        }

    } catch (error) {
        console.log('Something went wrong');
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const userLogin = async(req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Username or password is not correct'
            })
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if(!passwordMatches){
            return res.status(400).json({
                success: false,
                message: 'Username or password is not correct'
            })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
        }, process.env.JWT_TOKEN,{
            expiresIn: '1h'
        })

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token: token,
            user: user
        })

    } catch (error) {
        console.log('Something went wrong');
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

module.exports = {
    userRegister,
    userLogin
}
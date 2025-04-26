const User = require('../models/User');
const bcrypt = require('bcrypt');

const updatePassword = async(req, res) => {
    try {
        const userId = req.userInfo.id;
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        const user = await User.findById(userId);

        if(!user){    
            return res.status(404).json({
                success: false,
                message: 'user with that id not found'
            })
        }


        const oldPassMatches = await bcrypt.compare(oldPassword, user.password);        
        if(!oldPassMatches){
            return res.status(400).json({
                success: false,
                message: 'old passes dont match'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        const updatedPass = await User.findByIdAndUpdate(
            userId,
            {password: hashedNewPassword},
            {new: true}
        )

        if(updatedPass){            
            res.status(200).json({
                success: true,
                message: 'Password updated successfully',
            });
        }

    } catch (error) {
        console.log('Something went wrong');
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

module.exports = {
    updatePassword,
}
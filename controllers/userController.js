const User = require("../models/User")
const transporter=require('../config/email')

// Create User
exports.createUser = async (req, res) => {
    try {

        const user = await User.create(req.body);
         await transporter.sendMail({
            from:process.env.EMAIL,
            to:user.email,
            subject:"Welcome to our app",
            text:`Hello ${user.name}, welcome to our app!`
         })
        res.status(201).json( {
            success: true,
            message: "User created and email sent successfully",data: req.body.image,user

        });     

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Users
exports.getUsers = async (req, res) => {

    try {

       
          const filter = {};
        if(req.query.name){
            filter.name={
                $regex:req.query.name,
                $options:"i"
            }

        }
        if (req.query.age) {
            filter.age = Number(req.query.age);
        }

        const users = await User.find(filter);

        res.json(users);
        

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Single User
exports.getUser = async (req, res) => {

    try {
     
        const user = await User.findById(req.params.id);
 
        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
//query to get user by age

// Update User
exports.updateUser = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete User
exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const { json } = require("express");
const fs=require("fs")
const path=require("path")
const filePath = path.join(__dirname, "../data/users.json");

exports.createUserF = (req, res) => {

    fs.readFile(filePath, "utf-8", (err, data) => {

        if (err) {
            return res.status(500).json({   
                   message: err.message
            });
        }
        console.log(data)
        const users = JSON.parse(data);
        console.log(users)
        const newUser = {
            id: Date.now(),
            ...req.body
        };

        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "User created",
                user: newUser
            });

        });

    });

};
exports.getUsersF = (req, res) => {

    fs.readFile(filePath, "utf-8", (err, data) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }
         console.log(data)
        res.json(JSON.parse(data));

    });

};
exports.getUserF = (req, res) => {

    fs.readFile(filePath, "utf-8", (err, data) => {

        const users = JSON.parse(data);

        const user = users.find(
            u => u.id == req.params.id
        );

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    });

};
exports.updateUserF = (req, res) => {

    fs.readFile(filePath, "utf-8", (err, data) => {

        const users = JSON.parse(data);

        const index = users.findIndex(
            u => u.id == req.params.id
        );

        if (index === -1) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        users[index] = {
            ...users[index],
            ...req.body
        };

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json({
                message: "User updated",
                user: users[index]
            });

        });

    });

};
exports.deleteUserF = (req, res) => {

    fs.readFile(filePath, "utf-8", (err, data) => {

        const users = JSON.parse(data);

        const filteredUsers = users.filter(
            u => u.id != req.params.id
        );

        fs.writeFile(filePath, JSON.stringify(filteredUsers, null, 2), (err) => {

            if (err) {

                return res.status(500).json({
                    message: err.message
                });

            }

            res.json({
                message: "User deleted"
            });

        });

    });

};
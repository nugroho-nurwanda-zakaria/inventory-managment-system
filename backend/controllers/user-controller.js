const { User } = require("../models")
const path = require("path")
const fs = require("fs")

class UserController {
    static async Login (req, res) {
        try {
            // AMBIL REQUEST DARI BODY
            const {username, password} = req.body

            const user = await User.findOne({
                where: {
                    username
                }
            })

            if (!user) {
                return res.json({
                    message: "Username not found"
                })
            }

            if (user.password !== password) {
                return res.json({
                    message: "Wrong Password"
                })
            }

            return res.json({
                message: "Login Success",
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async Register (req, res) {
        try {
            const {username, password} = req.body
            
            const user_exist = await User.findOne({
                where: {
                    username
                }
            })

            if (user_exist) {
                return res.json({
                    message: "Username already exist"
                })
            }

            const response = await User.create({
                username : username,
                password : password
            })

            return res.json({
                message: "Register Success",
                data : response
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getUserById (req, res) {
        try {
            // AMBIL ID YANG DIKIRIM DARI PARAMETER
            const { id } = req.params
            
            const findUserById = await User.findOne({
                where: {
                    id
                }
            })

            if (!findUserById) {
                return res.json({
                    message: "User not found"
                })
            }

            return res.json({
                message: "Get User Success",
                data: findUserById
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updatePasswordUserById (req, res) {
        try {
            const { id } = req.params
            const { password } = req.body

            const response = await User.update({
                password
            }, {
                where: {
                    id
                }
            })

            return res.json({
                message: "Update Password Success",
                data: response
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateImageUserById (req, res) {
        try {
            const { id } = req.params;
            const image = req.file;
            const imagePath = image ? image.filename : null;
    
            if (!imagePath) {
                return res.status(400).json({
                    message: "No image uploaded"
                });
            }
    
            // Fetch user data by ID
            const findUser = await User.findOne({
                where: { id }
            });
    
            if (!findUser) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
    
            const oldImagePath = findUser.image;
    
            // Delete old image if it exists
            if (oldImagePath) {
                const oldImageFullPath = path.join(__dirname, `../public/images/${oldImagePath}`);
                if (fs.existsSync(oldImageFullPath)) {
                    fs.unlinkSync(oldImageFullPath);
                }
            }
    
            // Update user record with the new image path
            const response = await User.update(
                { image: imagePath },
                { where: { id } }
            );
    
            return res.json({
                message: "Update Image Success",
                data: response
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error",
                error
            });
        }
    }
    

    static async deleteUserById (req, res) {
        try {
            const { id } = req.params

            const findUserById = await User.findOne({
                where: {
                    id
                }
            })

            if (!findUserById) {
                return res.json({
                    message: "User not found"
                })
            }

            const response = await User.destroy({
                where: {
                    id
                }
            })

            return res.json({
                message: "Delete User Success",
                data: response
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController
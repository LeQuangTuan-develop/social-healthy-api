const User = require('../models/User')
const Doctor = require('../models/Doctor')
const bcrypt = require('bcrypt')

class UserController {
    // GET users?userId=...
    async show (req, res) {
        const userId = req.query.userId
        console.log(userId);
        try {
            const user = await User.findById(userId) 
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(403).json("không có user")
            }
        } catch (error) {
            res.status(500).json(err)
        }
    }

    // GET users/all
    async index(req, res) {
        try {
            const users = await User.find({})
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET users/doctors/:userId
    async doctors (req, res) {
        try {
            const user = await User.findById(req.params.userId)
            const doctors = await Promise.all(
                user.followings.map(doctorId => 
                    Doctor.findById(doctorId)
                )
            )
            let doctorList = []
            doctors.map(doctor => {
                const { _id, name, img} = doctor
                doctorList.push({ _id, name, img})
            })
            res.status(200).json(doctorList)
        } catch (error) {
            res.status(500).json(err)
        }
    }

    // POST users/auth/register 
    async register(req, res) {
        console.log(req.body);
        try {
            // generator new password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            // create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hashedPassword
            })

            const user = await newUser.save()
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // POST auth/login
    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(400).json("User not found")

            if (user.password !== req.body.password) {
                res.status(400).json("Wrong password")
            }
            // const validPassword = await bcrypt.compare(req.body.password, user.password)
            // !validPassword && res.status(400).json("Wrong password")

            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // POST users/create
    async create(req, res) {
        const newUser = await new User(req.body);
        try {
            const saveUser = await newUser.save();
            res.status(200).json(saveUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // PUT users/:id
    async update(req, res) {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password, salt)

                } catch (error) {
                    return res.status(500).json(err)  
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id,  {
                    $set: req.body
                })
                res.status(200).json("Account has been updated")
            } catch (error) {
                return res.status(500).json(err)  
            }
        } else {
            return res.status(403).json("You can update only your account")
        }
    }

    // DELETE users/:id/force
    async forceDelete(req, res) {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const user = await User.deleteOne({ _id: req.params.id})
                res.status(200).json("Account has been deleted")
            } catch (error) {
                return res.status(500).json(err)  
            }
        } else {
            return res.status(403).json("You can delete only your account")
        }
    }
}

module.exports = new UserController()
const Doctor = require('../models/Doctor')
const User = require('../models/User')
const bcrypt = require('bcrypt')

class DoctorController {
    // GET doctors/all
    async index(req, res) {
        try {
            const doctors = await Doctor.find({})
            res.status(200).json(doctors)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET doctors?param=...
    async list(req, res) {
        const {_page, _limit, _sort, _order} = req.query
        
        let skipIndex = 0
        if (_page) {
            skipIndex = (_page - 1) * _limit;
        }

        try {
            const doctors = await Doctor
                .find()
                .sort(_sort && _order ? {[_sort]: _order} : {})
                .limit(_limit ? parseInt(_limit) : 10)
                .skip(skipIndex)
            res.status(200).json(doctors)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET doctors/store
    async trashDoctors(req, res) {
        try {
            const doctors = await Doctor.findDeleted({})
            res.status(200).json(doctors)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET doctors/detail/:id
    async show(req, res) {
        try {
            const doctor = await Doctor.findById(req.params.id)
            res.status(200).json(doctor)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET doctors/:cateid
    async listDoctorsByCate(req, res) {
        try {
            const dôctors = await Doctor.find({ cate_id: req.params.cateid })
            res.status(200).json(dôctors)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET doctors/patients/:doctorId
    async patients (req, res) {
        try {
            const doctor = await Doctor.findById(req.params.doctorId)
            const patients = await Promise.all(
                doctor.followings.map(friendId => 
                    User.findById(friendId)
                )
            )
            let patientList = []
            patients.map(patient => {
                const { _id, username, profilePicture} = patient
                patientList.push({ _id, username, profilePicture})
            })
            res.status(200).json(patientList)
        } catch (error) {
            res.status(500).json(err)
        }
    }

    // POST doctors/auth/register 
    async register(req, res) {
        try {
            // generator new password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            // create new doctor
            const newDoctor = new Doctor({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })

            const doctor = await newDoctor.save()
            res.status(200).json(doctor)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // POST doctors/auth/login
    async login(req, res) {
        try {
            const doctor = await Doctor.findOne({ email: req.body.email });
            !doctor && res.status(400).json("Doctor not found")

            if (doctor.password !== req.body.password) {
                res.status(400).json("Wrong password")
            }
            // const validPassword = await bcrypt.compare(req.body.password, user.password)
            // !validPassword && res.status(400).json("Wrong password")

            res.status(200).json(doctor)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // PUT doctors/update/:doctorId
    async update(req, res) {
        try {
            await Doctor.updateOne({ _id: req.params.doctorId }, req.body)
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // POST doctors/create
    async create(req, res) {
        const newDoctor = await new Doctor(req.body);
        try {
            const saveDoctor = await newDoctor.save();
            res.status(200).json(saveDoctor)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // PUT doctors/follow/:doctorId
    async follow(req, res) {
        try {
            const doctor = await Doctor.findById(req.params.doctorId)
            const curUser = await User.findById(req.body.userId)

            if (!curUser.followings.includes(req.params.doctorId)) {
                await doctor.updateOne({ $push: {followers: req.body.userId, followings: req.body.userId} })
                await curUser.updateOne({ $push: {followings: req.params.doctorId} })

                res.status(200).json("doctor has been followed")
            } else {
                res.status(403).json("You already follow this doctor")
            }
        } catch (error) {
            return res.status(500).json(err)  
        }
    }

    // PUT doctors/unfollow/:doctorId
    async unfollow(req, res) {
        try {
            const doctor = await Doctor.findById(req.params.doctorId)
            const curUser = await User.findById(req.body.userId)

            if (curUser.followings.includes(req.params.doctorId)) {
                await doctor.updateOne({ $pull: {followers: req.body.userId, followings: req.body.userId} })
                await curUser.updateOne({ $pull: {followings: req.params.doctorId} })
                
                res.status(200).json("doctor has been unfollowed")
            } else {
                res.status(403).json("You don't unfollow this doctor")
            }
        } catch (error) {
            return res.status(500).json(err)  
        }
    }

    // PATCH doctors/restore/:doctorId
    async restore(req, res) {
        try {
            await Doctor.restore({ _id: req.params.doctorId })
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // DELETE doctors/delete/:doctorId
    async delete(req, res) {
        try {
            await Doctor.delete({ _id: req.params.doctorId })
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // DELETE doctors/destroy/:doctorId
    async destroy(req, res) {
        try {
            await Doctor.deleteOne({ _id: req.params.doctorId })
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new DoctorController()
const Appointment = require('../models/Appointment')

class AppointmentController{ 
    // GET categories/all
    async index(req, res) {
        try {
            const appoinments = await Appointment.find({})
            res.status(200).json(appoinments)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET categories
    async show(req, res) {
        try {
            const appoinments = await Appointment.find({userId: req.params.userId})
            res.status(200).json(appoinments)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // POST categories/create
    async create(req, res) {
        const newAppoint = await new Appointment(req.body);
        try {
            const saveAppoint = await newAppoint.save();
            res.status(200).json(saveAppoint)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new AppointmentController()
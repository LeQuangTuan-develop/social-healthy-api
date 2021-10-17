const express = require('express');
const router = express.Router();
const appointmentController = require('../app/controllers/Appointment.controller')

router.get('/all', appointmentController.index)
router.get('/:userId', appointmentController.show)
// router.put('/update/:id', appointmentController.update)
router.post('/create', appointmentController.create)
// router.delete('/delete/:id', appointmentController.delete)

module.exports = router
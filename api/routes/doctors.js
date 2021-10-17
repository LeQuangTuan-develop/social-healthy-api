const express = require('express');
const router = express.Router();
const doctorController = require('../app/controllers/Doctor.controller')

router.get('/', doctorController.list)
router.get('/all', doctorController.index)
router.get('/store', doctorController.trashDoctors)
router.get('/:cateid', doctorController.listDoctorsByCate)
router.get('/detail/:id', doctorController.show)
router.get('/patients/:doctorId', doctorController.patients)
router.put('/follow/:doctorId', doctorController.follow)
router.put('/unfollow/:doctorId', doctorController.unfollow)
router.put('/update/:doctorId', doctorController.update)
router.patch('/restore/:doctorId', doctorController.restore)
router.post('/auth/login', doctorController.login)
router.post('/create', doctorController.create)
router.delete('/delete/:doctorId', doctorController.delete)
router.delete('/destroy/:doctorId', doctorController.destroy)

module.exports = router
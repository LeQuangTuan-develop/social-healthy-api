const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/Post.controller')

router.get('/all', postController.index)
router.get('/doctorpost', postController.doctorPost)
router.get('/userpost', postController.userPost)
router.get('/:cateId', postController.list)
router.get('/detail/:id', postController.show)
router.get('/doctor/:doctorId', postController.profile)
router.patch('/restore/:postId', postController.restore)
router.put('/like/:postId', postController.like)
router.put('/update/:postId', postController.update)
router.post('/create', postController.create)
router.delete('/delete/:postId', postController.delete)
router.delete('/destroy/:postId', postController.destroy)

module.exports = router
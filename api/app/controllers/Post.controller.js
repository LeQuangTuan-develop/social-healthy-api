const Post = require('../models/Post')

class PostController {
    // GET posts/all
    async index(req, res) {
        try {
            const posts = await Post.find({})
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET posts/doctorpost
    async doctorPost(req, res) {
        try {
            const posts = await Post.find({ userId: null })
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET posts/userpost
    async userPost(req, res) {
        try {
            const posts = await Post.find({ doctorId: null })
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET posts/:cateId
    async list(req, res) {
        try {
            const post = await Post.find({ cateId: req.params.cateId })
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET posts/detail/:postId
    async show(req, res) {
        try {
            const post = await Post.findById(req.params.id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET posts/doctor/:doctorId
    async profile(req, res) {
        console.log(req.params.doctorId);
        try {
            const posts = await Post.find({doctorId: req.params.doctorId})
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // PUT posts/like/:postId
    async like(req, res) {
        try {
            const post = await Post.findById(req.params.postId)
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } })
                res.status(200).json({ status: 1, message: 'the post had been liked' })
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } })
                res.status(403).json({ status: 1, message: 'the post had been unliked' })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // PUT posts/update/:postId
    async update(req, res) {
        try {
            await Post.updateOne({ _id: req.params.postId }, req.body)
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // POST posts/create
    async create(req, res) {
        const newPost = await new Post(req.body);
        try {
            const savePost = await newPost.save();
            res.status(200).json(savePost)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // PATCH posts/restore/:postId
    async restore(req, res) {
        try {
            await Post.restore({ _id: req.params.postId })
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // DELETE posts/delete/:cateId
    async delete(req, res) {
        try {
            await Post.delete({ _id: req.params.postId })
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // DELETE posts/destroy/:postId
    async destroy(req, res) {
        try {
            await Post.deleteOne({ _id: req.params.postId })
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET posts/newfeed/:userId
    async newfeed(req, res) {
        try {
            const curUser = await User.findById(req.params.userId)
            const userPosts = await Post.find({ userId: curUser._id })
            const friendPosts = await Promise.all(
                curUser.followings.map(friendId => 
                    Post.find({ userId: friendId})
                )
            )
            res.status(200).json(userPosts.concat(friendPosts.flat()))
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new PostController()
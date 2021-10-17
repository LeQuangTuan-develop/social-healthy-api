const Category = require('../models/Category')

class CategoryController { 
    // GET categories/all
    async index(req, res) {
        try {
            const categories = await Category.find({})
            res.status(200).json(categories)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // GET categories/:cateId
    async show(req, res) {
        try {
            const categorie = await Category.findById({ _id: req.params.cateId })
            res.status(200).json(categorie)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // PUT categories/update/:cateId
    async update(req, res) {
        try {
            await Category.updateOne({_id: req.params.cateId}, req.body)
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // POST categories/create
    async create(req, res) {
        const newCategory = await new Category(req.body);
        try {
            const saveCategory = await newCategory.save();
            res.status(200).json(saveCategory)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // DELETE categories/delete/:cateId
    async delete(req, res) {
        try {
            await Category.deleteOne({_id: req.params.cateId})
            res.status(200).json({ status: 1 })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new CategoryController()
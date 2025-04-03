const Blog = require('../models/BlogModel')

const fs = require('fs');

const addBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content || !req.file) {
            return res.status(400).send({
                success: false,
                message: "ENTER ALL FILED"
            });
        }
        const blog = await Blog.create({
            userId: req.user?._id,
            title: title,
            content: content,
            image: req.file?.path
        })
        return res.status(200).send({
            success: true,
            message: "BLOG CREATE",
            blog: blog
        })

    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}


const adminviewBlog = async (req, res) => {

    try {
        let blogs = await Blog.find({}).populate('userId');
        return res.status(200).send({
            success: true,
            message: "BLOG LIST",
            length: blogs.length,
            blogs: blogs,
        })

    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}


const userwiseviewBlog = async (req, res) => {
    try {
        let userid = req.user?._id;
        let blog = await Blog.find({ userId: userid })
        return res.status(200).send({
            success: true,
            message: "BLOG LIST",
            blog
        })

    } catch (error) {
        return res.status(401).send({
            success: false,
            err: error
        })
    }
}


const admindeleteBlog = async (req, res) => {
    try {
        let id = req.query.id
        let singleblog = await Blog.findById(id);
        fs.unlinkSync(singleblog?.image)

        await Blog.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "BLOG DELETE",
        })
        return res.json(singleblog)
    } catch (error) {
        return res.status(401).send({
            success: false,
            err: error
        })
    }
}


const updateBlog = async (req, res) => {
    try {
        const { id, title, content } = req.body;
        if (req.file) {
            let singleblog = await Blog.findById(id);
            fs.unlinkSync(singleblog?.image);
            await Blog.findByIdAndUpdate(id, {
                title: title,
                content: content,
                image: req.file?.path
            })
            return res.status(200).send({
                success: true,
                message: "BLOG UPDATE"
            })
        } else {
            let singleblog = await Blog.findById(id);
            await Blog.findByIdAndUpdate(id, {
                title: title,
                content: content,
                image: singleblog?.image
            })
            return res.status(200).send({
                success: true,
                message: "BLOG UPDATE"
            })
        }
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}


const userwiseDeleteBlog = async (req, res) => {
    try {
        let blogid = req.query?.blogid;
        let singleblog = await Blog.findById(blogid);
        let user = await Blog.find({ userId: singleblog?.userId });
        if (user.length === 0) {
            return res.status(404).send({
                success: false,
                message: "BLOG NOT FOUND"
            })
        }
        fs.unlinkSync(singleblog?.image);
        await Blog.findByIdAndDelete(blogid);
        return res.status(200).send({
            success: true,
            message: "BLOG DELETE"
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}

module.exports = {
    addBlog,
    adminviewBlog,
    userwiseviewBlog,
    admindeleteBlog,
    updateBlog,
    userwiseDeleteBlog
}
const User = require('../models/UserModel')

const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email: email })


        if (!user || user.password != password) {
            return res.status(401).send({
                success: false,
                message: 'INVALID PASS AND EMAIL'
            })
        }
        let token = await jwt.sign({ payload: user }, 'neha', { expiresIn: '4hr' })

        return res.status(200).send({
            success: true,
            message: 'USER LOGIN',
            token
        })

    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, city, gender, phone } = req.body;

        if (!name || !email || !password || !city || !gender || !phone) {
            return res.status(400).json({
                message: "PLS ENTER FILD"
            });
        }

        const dup = await User.findOne({ email: email });
        if (dup) {
            return res.status(400).send({
                success: false,
                message: "EMAIL EXISTS"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            city,
            gender,
            phone

        })

        return res.status(201).send({
            success: true,
            message: "USER CREATE",
            user: user
        });

    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}
const viewUser = async (req, res) => {
    try {

        let users = await User.find({})
        return res.status(200).send({
            success: true,
            message: "USER FETCH",
            users: users
        });

    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}


const deleteUser = async (req, res) => {
    try {
        let id = req.query.id
        let user = await User.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "USER DELETE",
            user: user
        });


    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}



const updateUser = async (req, res) => {
    try {
        let id = req.query.id
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            city:req.body.city,
            gender: req.body.gender,
            phone: req.body.phone

        })
        return res.status(200).send({
            success: true,
            message: "USER UPDATE",

        });
    } catch (err) {
        return res.status(505).send({
            success: false,
            error: err
        })
    }
}



module.exports = {
    registerUser,
    viewUser,
    deleteUser,
    updateUser,
    loginUser
}
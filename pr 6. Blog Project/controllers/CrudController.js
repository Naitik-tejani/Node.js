const UserModel = require('../models/UserModel');

const ProUser = require('../models/ProModel');

const fs = require('fs');

const path = require('path');


const loginPage = (req, res) => {
    if (req.cookies?.auth) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
};

const registerPage = (req, res) => {
    return res.render('register');
};


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await UserModel.create({
            name: name,
            email: email,
            password: password
        });
        console.log("User created");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email: email, password: password });
        if (!user) {
            console.log(`Email and Password are invalid`);
            return res.redirect('/');
        }
        res.cookie('auth', user);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
};


const logout = (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/');
};

const formPage = (req, res) => {
    return res.render('add');
};


const dashboardPage = async (req, res) => {
    if (!req.cookies?.auth) {
        return res.redirect('/');
    }
    try {
        const record = await ProUser.find({});
        return res.render('dashboard', { record });
    } catch (err) {
        console.log(err);
        return false;
    }
};

const informationPage = async (req, res) => {
    if (!req.cookies?.auth) {
        return res.redirect('/');
    }
    try {
        const record = await ProUser.find({});
        const userId = req.query.id;
        const user = record.find((val) => val.id === userId);
        return res.render('information', { user });
    } catch (err) {
        console.log(err);
        return false;

    }
};
const insertData = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? req.file.path : 'default-image.jpg';  // Use a default image

        await ProUser.create({
            name,
            description,
            image,
        });

        return res.redirect('/form');
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.query.id;
        const user = await ProUser.findById(userId);
        if (!user) {
            return('User not found');
        }

        if (user.image) {
            const filePath = path.resolve(__dirname, '../uploads/', user.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            } else {
                console.warn(`File not found at ${filePath}`);
            }
        }
        await ProUser.findByIdAndDelete(userId);
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
};

const updateUser = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await ProUser.findById(id);
        return res.render('edit', {
            single
        });
    } catch (err) {
        console.log(err);
        return false;
    }
};

const updateData = async (req, res) => {
    try {
        let id = req.body.editid;
        let old = await ProUser.findById(id);

        if (req.file) {
            if (old.image) {
                fs.unlinkSync(old.image);
            }

            await ProUser.findByIdAndUpdate(id, {
                name: req.body?.name,
                description: req.body?.description,
                image: req.file?.path,

            });
        } else {
            await ProUser.findByIdAndUpdate(id, {
                name: req.body?.name,
                description: req.body?.description,
                image: old?.image,

            });
        }
        console.log("Record updated");
        return res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    loginPage, registerPage, informationPage, registerUser, dashboardPage, loginUser, logout, formPage, insertData, deleteUser, updateUser, updateData
};

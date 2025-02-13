const checkUserLogin = (req, res, next) => {
    if (!req.cookies?.auth) {
        return res.redirect('/');
    }
}
module.exports = {
    checkUserLogin
}
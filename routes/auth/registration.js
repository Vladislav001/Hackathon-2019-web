exports.get = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/detail-company');
    }

    res.render('auth/registration', { expressFlash: req.flash('message')});
};
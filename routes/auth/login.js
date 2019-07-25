exports.get = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/detail-company');
    }

    res.render('auth/login', { expressFlash: req.flash('message')} );
};
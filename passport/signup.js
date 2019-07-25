const LocalStrategy = require('passport-local').Strategy;
const Employer = require('../models/employer');
const bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, email, password, done) {

      findOrCreateUser = function () {

        Employer.findOne({ 'email': email }, function (err, user) {
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }

          if (user) {
            console.log('User already exists with email: ' + email);
            return done(null, false, req.flash('message', 'Пользователь уже существует с этим email'));
          } else {

            let newEmployer = new Employer();

            newEmployer.company = req.body.company;
            newEmployer.site = req.body.site;
            newEmployer.email = email;
            newEmployer.password = createHash(password);

            newEmployer.save(function (err) {
              if (err) {
                console.log('Error in Saving user: ' + err);
                throw err;
              }
              console.log('User Registration succesful');

              return done(null, newEmployer);
            });
          }
        });
      };


      process.nextTick(findOrCreateUser);
    })
  );


  const createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }


};

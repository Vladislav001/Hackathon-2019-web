const Student = require('../../../../models/student');
const constants = require('../../../../functions/constants');
const bCryptPassword = require('../../../../functions/bcryptpassword');
const apiError = require('../../../../functions/apierror');
const jwt = require('jsonwebtoken');

exports.post = function (req, res) {

    let errors = [];

    let email = req.body.email;
    let password = req.body.password;
    let first_name = req.body.first_name;
    let second_name = req.body.second_name;
    let last_name = req.body.last_name;
    let id_university = req.body.id_university;

    Student.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            errors.push(apiError.createError("1", 'Пользователь с такой почтой уже зарегистрирован'));
            return res.status(401).json({
                errors
            });
        } else {
            let newStudent = new Student();
            newStudent.email = email;
            newStudent.password = bCryptPassword.createHash(password);
            newStudent.first_name = first_name;
            newStudent.second_name = second_name;
            newStudent.last_name = last_name;
            newStudent.id_university = id_university;

            let token = jwt.sign({id: newStudent._id}, constants.SECRET_STRING, {
                expiresIn: constants.TIME_LIFE_TOKEN
            });
            newStudent.token = token;

            newStudent.save(function (err) {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    "token": token
                });
            });
        }
    });
};



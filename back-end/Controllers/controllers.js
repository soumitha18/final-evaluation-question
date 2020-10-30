const { loginValidation, registerValidation, teacherValidation } = require("../Validations/validations")
const Admin = require("../models/admin")
const Teacher = require("../models/teachers")
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")

const registration = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const emailExists = await Admin.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send("Email already exists in the database");
    }

    const hashedPassword = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    );
    const user = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
}

const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await Admin.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("Email or password is wrong");
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");
    res.send("logged in");
}

const postTeachers = async (req, res) => {
    const { error } = teacherValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const teacher = new Teacher({
        school_id: req.body.school_id,
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        classes: req.body.classes
    });

    try {
        const savedTeacher = await teacher.save();
        res.send(savedTeacher);
    } catch (err) {
        res.status(400).send(err);
    }

}

const getTeachers = async (req, res) => {
    try {
        if (!req.query.school_id) {
            return res.status(400).send('Missing user query');
        }
        const sort = req.query.sort === 'asc' ? 1 : -1;
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const filter =
            req.query.gender === 'female'
                ? 'female'
                : req.query.gender === 'male'
                    ? 'male'
                    : null;

        const search_params = { school_id: mongoose.Types.ObjectId(req.query.school_id) };
        if (filter) {
            search_params['gender'] = filter;
        }

        let teachers = await Teacher.find(search_params)
            .sort({ age: sort })
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await Teacher.countDocuments(search_params).exec();
        const totalPages = Math.ceil(count / limit);
        res.status(200).json({ teachers, count, totalPages, page, limit });
    } catch (err) {
        res.status(400).send(err.message);

    }
}

const getTeacherInfo = async (req, res) => {
    try {
        const name = req.query.name
        const search_params = { school_id: mongoose.Types.ObjectId(req.query.school_id) };
        if (name) {
            search_params['name'] = name;
        }
        console.log(search_params)
        let teachers = await Teacher.find(search_params)
        res.send(teachers)
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

const editTeacher = async (req, res) => {
    Teacher.findById(req.params.id)
        .then(teacher => {
            teacher.name = req.body.name,
                teacher.gender = req.body.gender,
                teacher.age = req.body.age,
                teacher.classes = req.body.classes

            teacher.save()
                .then(() => res.json("Teacher Data updated Successfully!"))
                .catch(err => res.status(400).json(`Error : ${err}`))
        })
        .catch(err => res.status(400).json(`ERROR : ${err}`))
}

const deleteTeacher = async (req, res) => {
    const id = req.params.id
    Teacher.findByIdAndDelete(id)
        .then(() => res.json("Teacher Data deleted Successfully!"))
        .catch(err => res.status(400).json(`Error : ${err}`))
}


module.exports = { registration, login, postTeachers, getTeachers, getTeacherInfo, editTeacher, deleteTeacher }

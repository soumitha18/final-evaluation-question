const express = require("express");
const { registration, login, postTeachers, getTeachers, getTeacherInfo, editTeacher, deleteTeacher } = require("../Controllers/controllers");
const router = express.Router();

router.post("/login", login)

router.post("/register", registration)

router.post("/teacher", postTeachers)

router.get("/teachers", getTeachers)

router.get("/teacher", getTeacherInfo)

router.post("/teacher/edit/:id", editTeacher)

router.delete("/teacher/delete/:id", deleteTeacher)


module.exports = router

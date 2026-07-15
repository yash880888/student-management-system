const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();






const teachersSchema = new mongoose.Schema({
  teacherID: Number,
  teacherName: String,
  subject: String,
  gender: String,
  phone: Number,
  email: String,
  experience: String,
  photo: String
});

const Teacher = mongoose.model("Teachers", teachersSchema, "teachers")


router.get("/", (req, res) => {

  return res.status(200).json({ message: "server created succesfully" })
})

router.post("/teachers", async (req, res) => {


  try {
    const teacher = new Teacher(req.body);

    await teacher.save();

    return res.status(201).json({ message: "teacher created succesfully", teacher: teacher })
  } catch (error) {
    return res.status(500).json({ message: "error in creating teacher", error: error.message })
  }
})

router.get("/teachers", async (req, res) => {

  try {
    const found = await Teacher.find()

    if (found.length === 0) {
      return res.status(200).json({
        message: "No teachers found",
        teachers: [],
      });
    }

    return res.status(200).json({ message: "teachers found succesfully", teachers: found })
  } catch (error) {
    return res.status(500).json({ message: "error in fetching teachers", error: error.message })
  }
})


router.get("/teachers/:id", async (req, res) => {
  try {

    const search = await Teacher.findOne({ teacherID: Number(req.params.id) })

    if (!search) {
      return res.status(404).json({ message: "teachers  not found" })

    }

    return res.status(200).json({ message: "teachers found succesfully", teachers: search })

  } catch (error) {
    return res.status(500).json({ message: "id not found", error: error.message })
  }
})

router.put("/teachers/:id", async (req, res) => {

  try {

    const { id } = req.params;


    const info = await Teacher.findOne({ teacherID: Number(id) })

    const { teacherID, teacherName, subject, gender, phone, email, experience } = req.body;

    if (!info) {
      return res.status(404).json({ message: "teachers not found" })
    }

    info.teacherID = teacherID;
    info.teacherName = teacherName;
    info.subject = subject;
    info.gender = gender;
    info.phone = phone;
    info.email = email;
    info.experience = experience;

    await info.save();
    return res.status(200).json({ message: "teacher updated succesfully", info: info })
  } catch (error) {
    return res.status(500).json({ message: "error in updating teacher", error: error.message })
  }
})


router.delete("/teachers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const remove = await Teacher.findOneAndDelete({ teacherID: Number(id) });

    if (!remove) {
      return res.status(404).json({ message: "teacher not found" })
    }

    return res.status(200).json({ message: "teacher deleted succesfully", teacher: remove })
  } catch (error) {
    return res.status(500).json({ message: "error in deleting teacher", error: error.message })
  }

})



module.exports = router;
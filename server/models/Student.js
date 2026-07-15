const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");




const studentsSchema = new mongoose.Schema({
  studentID: Number,
  studentName: String,
  fatherName: String,
  gender: String,
  birthdate: Date,
  phone: Number,
  email: String,
  course: String,
  address: String,
  admissionDate: Date,
});


const Student = mongoose.model("Students", studentsSchema)



router.get("/", (req, res) => {

  return res.status(200).json({ message: "server created succesfully" })
})



router.post("/students", async (req, res) => {


  try {
    const student = new Student(req.body);

    await student.save();

    return res.status(201).json({ message: "student created succesfully", student: student })
  } catch (error) {
    return res.status(500).json({ message: "error in creating student", error: error.message })
  }
})

router.get("/students", async (req, res) => {

  try {
    const found = await Student.find()

    if (!found || found.length === 0) {
      return res.status(404).json({ message: "students not found" })

    }

    return res.status(200).json({ message: "students found succesfully", students: found })
  } catch (error) {
    return res.status(500).json({ message: "error in fetching students", error: error.message })
  }
})


router.get("/students/:id", async (req, res) => {
  try {

    const search = await Student.findOne({ studentID: Number(req.params.id) })

    if (!search) {
      return res.status(404).json({ message: "students  not found" })

    }

    return res.status(200).json({ message: "students found succesfully", students: search })

  } catch (error) {
    return res.status(500).json({ message: "id not found", error: error.message })
  }
})

router.put("/students/:id", async (req, res) => {

  try {

    const { id } = req.params;


    const info = await Student.findOne({ studentID: Number(id) })

    const { studentID, studentName, course, gender, phone, admissionDate } = req.body;

    if (!info) {
      return res.status(404).json({ message: "students not found" })
    }

    info.studentID = studentID;
    info.studentName = studentName;
    info.course = course;
    info.gender = gender;
    info.phone = phone;
    info.admissionDate = admissionDate;

    await info.save();
    return res.status(200).json({ message: "student updated succesfully", info: info })
  } catch (error) {
    return res.status(500).json({ message: "error in updating student", error: error.message })
  }
})


router.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const remove = await Student.findOneAndDelete({ studentID: Number(id) });

    if (!remove) {
      return res.status(404).json({ message: "student not found" })
    }

    return res.status(200).json({ message: "student deleted succesfully", student: remove })
  } catch (error) {
    return res.status(500).json({ message: "error in deleting student", error: error.message })
  }

})

module.exports = router;
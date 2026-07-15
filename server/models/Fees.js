const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");




const feesSchema = new mongoose.Schema({
  id: Number,
  studentName: String,
  course: String,
  totalFees: Number,
  paidFees: Number,
  pendingFees: Number,
});

const Fee = mongoose.model("Fees", feesSchema, "fees");

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "server created successfully",
  });
});

router.post("/fees", async (req, res) => {
  try {
    const fee = new Fee(req.body);

    await fee.save();

    return res.status(201).json({
      message: "fee created successfully",
      fee: fee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in creating fee",
      error: error.message,
    });
  }
});

router.get("/fees", async (req, res) => {
  try {
    const found = await Fee.find();

    return res.status(200).json({
      message: "fees found successfully",
      fees: found,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in fetching fees",
      error: error.message,
    });
  }
});

router.get("/fees/:id", async (req, res) => {
  try {
    const search = await Fee.findOne({
      id: Number(req.params.id),
    });

    if (!search) {
      return res.status(404).json({
        message: "fee not found",
      });
    }

    return res.status(200).json({
      message: "fee found successfully",
      fees: search,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in fetching fee",
      error: error.message,
    });
  }
});

router.put("/fees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const info = await Fee.findOne({
      id: Number(id),
    });

    if (!info) {
      return res.status(404).json({
        message: "fee not found",
      });
    }

    const {
      id: studentID,
      studentName,
      course,
      totalFees,
      paidFees,
      pendingFees,
    } = req.body;

    info.id = studentID;
    info.studentName = studentName;
    info.course = course;
    info.totalFees = totalFees;
    info.paidFees = paidFees;
    info.pendingFees = pendingFees;

    await info.save();

    return res.status(200).json({
      message: "fee updated successfully",
      fees: info,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in updating fee",
      error: error.message,
    });
  }
});

router.delete("/fees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const remove = await Fee.findOneAndDelete({
      id: Number(id),
    });

    if (!remove) {
      return res.status(404).json({
        message: "fee not found",
      });
    }

    return res.status(200).json({
      message: "fee deleted successfully",
      fee: remove,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in deleting fee",
      error: error.message,
    });
  }
});


module.exports = router;
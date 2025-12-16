import express from "express";
import Applicant from "../models/Applicant.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Setup file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Save a new applicant
router.post("/", upload.fields([
  { name: "passportPhoto", maxCount: 1 },
  { name: "idCopy", maxCount: 1 },
  { name: "educationCertificates", maxCount: 1 },
]), async (req, res) => {
  try {
    const data = req.body;

    const existingApplicant = await Applicant.findOne({
        where: { idNumber: data.idNumber },
      });

      if (existingApplicant) {
        return res.status(409).json({
          success: false,
          message: "Applicant with this NIDA/passport number already exists",
        });
      }

    // Attach file paths
    if (req.files.passportPhoto) data.passportPhoto = req.files.passportPhoto[0].path;
    if (req.files.idCopy) data.idCopy = req.files.idCopy[0].path;
    if (req.files.educationCertificates) data.educationCertificates = req.files.educationCertificates[0].path;

    const applicant = await Applicant.create(data);
    res.status(201).json({ success: true, applicant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to save applicant", error });
  }
});

// Get all applicants
router.get("/", async (req, res) => {
  try {
    const applicants = await Applicant.findAll({ order: [["createdAt", "DESC"]] });
    res.json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch applicants" });
  }
});

// Get a single applicant by ID
router.get("/:id", async (req, res) => {
  try {
    const applicant = await Applicant.findByPk(req.params.id);
    if (!applicant) return res.status(404).json({ success: false, message: "Applicant not found" });
    res.json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch applicant" });
  }
});

export default router;

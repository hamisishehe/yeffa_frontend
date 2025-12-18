import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Application = sequelize.define("Application", {
  // Step 1: Personal Information
  fullName: { type: DataTypes.STRING, allowNull: false },
  guadianName: { type: DataTypes.STRING },
  gender: { type: DataTypes.ENUM("male", "female"), allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
  nationality: { type: DataTypes.STRING },
  id_type: { type: DataTypes.STRING },
  idNumber: { type: DataTypes.STRING, allowNull: false, unique: true, },
  address: { type: DataTypes.TEXT },
  region: { type: DataTypes.STRING, allowNull: false },
  district: { type: DataTypes.STRING, allowNull: false },
  selected_institution: { type: DataTypes.STRING, allowNull: false },
  selected_course: { type: DataTypes.STRING, allowNull: false },

  // Step 2: Contact Information
  phonePrimary: { type: DataTypes.STRING, allowNull: false },
  phoneSecondary: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false },

  // Step 3: Education
  educationLevel: { type: DataTypes.STRING },
  institution: { type: DataTypes.STRING },
  course: { type: DataTypes.STRING },
  graduationYear: { type: DataTypes.STRING },
  grade: { type: DataTypes.STRING },

  // Step 4: Declaration & Files
  passportPhoto: { type: DataTypes.STRING }, 
  idCopy: { type: DataTypes.STRING },        
  educationCertificates: { type: DataTypes.STRING }, 
  confirmAccuracy: { type: DataTypes.BOOLEAN, defaultValue: false },
  agreeToRules: { type: DataTypes.BOOLEAN, defaultValue: false },
  applicantName: { type: DataTypes.STRING },
  signature: { type: DataTypes.STRING },
  submissionDate: { type: DataTypes.DATEONLY },
}, {
  tableName: "applications",
  timestamps: true,
});

export default Application;

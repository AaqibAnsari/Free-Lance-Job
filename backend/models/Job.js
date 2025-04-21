// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  deadline: { type: Date, required: true },
  category: { type: String, required: true },
  bidCount: { type: Number, default: 0 }, // initialized as 0
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional: link to client
}, { timestamps: true,strict:true });

module.exports = mongoose.model("Job", jobSchema);

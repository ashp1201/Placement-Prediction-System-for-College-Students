import mongoose  from "mongoose";

// Define a schema for your resume data
const resumeSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  owner_contact: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
  },
  amount: {
    type: String,
  },
  photo: {
    type:String,
  },
  description: {
    type: String,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

// Create a resume model based on the schema
export default mongoose.model.resumes || mongoose.model('resume',resumeSchema);



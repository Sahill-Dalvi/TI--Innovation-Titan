import mongoose from 'mongoose';

const jobToolkitSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    resume: {
      data: Buffer,
      contentType: String,
      filename: String,
    },
    coverLetter: {
      data: Buffer,
      contentType: String,
      filename: String,
    },
  },
  { collection: 'JobToolkit' }
);

const JobToolkit = mongoose.model('JobToolkit', jobToolkitSchema);

export default JobToolkit;

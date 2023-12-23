import { Request, Response } from 'express';
import JobToolkit from '../../models/jobToolkitModel';

const uploadJobToolkit = async (req: any, res: Response) => {
  try {
    const file = req.files;
    const { userId } = req.body;
    
    console.log(userId);
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check if a JobToolkit document with the given userId already exists
    let existingJobToolkit = await JobToolkit.findOne({ userId });


    if (existingJobToolkit) {
      // If the document exists, update its resume information
    // console.log("...............File found");

      if(file.resume){
        existingJobToolkit.resume = {
          data: file.resume.data,
          contentType: file.resume.mimetype,
          filename: file.resume.name,
        };
      }

      if(file.coverLetter){
        existingJobToolkit.coverLetter = {
          data: file.coverLetter.data,
          contentType: file.coverLetter.mimetype,
          filename: file.coverLetter.name,
        };
      }

      await existingJobToolkit.save();

      res.status(200).json(existingJobToolkit);
    } else {
    // console.log("No file.........................");

      // If the document does not exist, create a new one
      if(file.resume){

        const newJobToolkit = new JobToolkit({
          userId,
          resume: {
            data: file.resume.data,
            contentType: file.resume.mimetype,
            filename: file.resume.name,
          },
        });

        await newJobToolkit.save();
        res.status(201).json(newJobToolkit);
      }
      if(file.coverLetter){

        const newJobToolkit = new JobToolkit({
          userId,
          resume: {
            data: file.coverLetter.data,
            contentType: file.coverLetter.mimetype,
            filename: file.coverLetter.name,
          },
        });

        await newJobToolkit.save();
        res.status(201).json(newJobToolkit);
      }
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get job postings by empId
const getJobToolkitById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const jobToolkit = await JobToolkit.findOne({userId: userId});
    // console.log(".............", jobToolkit, userId)
    res.status(200).json(jobToolkit);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export { uploadJobToolkit, getJobToolkitById };

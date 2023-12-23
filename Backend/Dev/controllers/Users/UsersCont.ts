import { Request, Response } from 'express';
import Users from '../../models/userModel';

// Get all job postings
const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Create a new job posting
const createNewUser = async (req: Request, res: Response) => {
  const userData = req.body;

  try {
    const newUserData = await Users.create(userData);
    res.status(201).json(newUserData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error ' });
  }
};


// Get job postings by empId
const getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
  
    try {
      const userData = await Users.find({ email: email });
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export {getAllUsers, createNewUser, getUserByEmail};

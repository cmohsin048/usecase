import { dbConnect } from '../../../../utils/dbconnect';
import User from "../../../../models/usermodal";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req) => {
  await dbConnect();

  try {
    // Log the entire request object
    const rawBody = await req.text();
    console.log('Raw Request Body:', rawBody);

    // Parse the JSON manually
    const { fullName, email, password } = JSON.parse(rawBody);
    
    console.log('Parsed Data:', { fullName, email, password });

    // Rest of your existing registration logic...
    if (!fullName || !email || !password) {
      return new Response(JSON.stringify({ 
        error: "All fields are required" 
      }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email is already registered" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ 
      fullName: fullName.trim(), 
      email, 
      password: hashedPassword 
    });

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return new Response(JSON.stringify({ fullName, token }), { status: 201 });
  } catch (error) {
    console.error('Detailed Registration Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || "Error registering user",
      detailedError: error.toString()
    }), { status: 500 });
  }
};
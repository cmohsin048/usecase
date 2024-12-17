import { dbConnect } from '../../../../utils/dbconnect';
import User from "../../../../models/usermodal";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req) => {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    console.log('Login attempt for:', email); // Add logging for tracking

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ 
        message: "Please provide both email and password" 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Find user and validate
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return new Response(JSON.stringify({ 
        message: "Invalid email or password" 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ 
        message: "Invalid email or password" 
      }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate token
    const tokenPayload = { 
      userId: user._id, 
      email: user.email,
      fullName: user.fullName // Include full name in token if needed
    };

    const token = jwt.sign(
      tokenPayload, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Return response with token and user info
    return new Response(JSON.stringify({ 
      token, 
      userId: user._id, 
      email: user.email,
      fullName: user.fullName
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return new Response(JSON.stringify({ 
      message: "Internal server error during login",
      error: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
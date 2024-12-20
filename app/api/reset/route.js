import { NextResponse } from "next/server";
import User from "../../../models/usermodal";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Generate 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; text-align: center;">
        <h2>Password Reset Request</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="background-color: #f0f0f0; padding: 10px; letter-spacing: 2px;">${otp}</h1>
        <p style="font-size: 0.8em; color: #666;">This code expires in 10 minutes</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

// API Route Handler
export async function POST(request) {
  try {
    const { email } = await request.json();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate OTP
    const otp = generateOTP();

    // Update user with OTP details
    user.otp = {
      code: otp, // Store plain OTP
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
    };

    // Save to database
    await user.save();

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);
    if (!emailSent) {
      return NextResponse.json(
        { message: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in sendResetOTP:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import User from "../../../../models/usermodal";
import { dbConnect } from "../../../../utils/dbconnect"; // Assuming you have this setup

export async function POST(request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Get email from request body
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find user in database
    const user = await User.findOne(
      { email },
      { image: 1, fullName: 1, _id: 0 } // Only select image and fullName fields
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user data
    return NextResponse.json({
      image: user.image,
      fullName: user.fullName,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

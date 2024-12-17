import { dbConnect } from "../../../utils/dbconnect";
import User from "../../../models/usermodal";
import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to convert file to Base64
const fileToBase64 = async (filePath) => {
  const fileData = await fs.readFile(filePath);
  return `data:image/png;base64,${fileData.toString("base64")}`;
};

export async function POST(req) {
  await dbConnect();

  // Configure upload directory
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Ensure upload directory exists
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Error creating upload directory:", err);
  }

  // Convert request to form data
  const formData = await req.formData();

  // Extract fields
  const email = formData.get('email');
  const fullName = formData.get('fullName');
  const imageFile = formData.get('image');

  try {
    let imageBase64 = null;

    // Handle image upload
    if (imageFile && imageFile instanceof File) {
      // Create a temporary file path
      const tempFilePath = path.join(uploadDir, `temp-${Date.now()}.png`);
      
      // Convert File to buffer and save
      const buffer = await imageFile.arrayBuffer();
      await fs.writeFile(tempFilePath, Buffer.from(buffer));

      // Convert to base64
      imageBase64 = await fileToBase64(tempFilePath);

      // Remove temporary file
      await fs.unlink(tempFilePath);
    }

    // Update user in database
    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      {
        fullName,
        ...(imageBase64 && { image: imageBase64 }), 
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(
      { message: "User updated successfully!", user: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
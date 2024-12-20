import { dbConnect } from "../../../../utils/dbconnect";
import User from "../../../../models/usermodal";
import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

export const config = {
  api: {
    bodyParser: false,
  },
};

const fileToBase64 = async (filePath) => {
  const fileData = await fs.readFile(filePath);
  return `data:image/png;base64,${fileData.toString("base64")}`;
};

export async function POST(req) {
  await dbConnect();

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {
    console.error("Error creating upload directory:", err);
  }

  const formData = await req.formData();

  const email = formData.get("email");
  const fullName = formData.get("fullName");
  const imageFile = formData.get("image");
  const otp = formData.get("otp");
  const newPassword = formData.get("newPassword");

  try {
    let imageBase64 = null;
    if (imageFile && imageFile instanceof File) {
      const tempFilePath = path.join(uploadDir, `temp-${Date.now()}.png`);
      const buffer = await imageFile.arrayBuffer();
      await fs.writeFile(tempFilePath, Buffer.from(buffer));
      imageBase64 = await fileToBase64(tempFilePath);
      await fs.unlink(tempFilePath);
    }

    // Find the user first to check OTP if password update is requested
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare update object
    const updateObj = {
      fullName,
      ...(imageBase64 && { image: imageBase64 }),
    };

    // If password update is requested, verify OTP first
    if (newPassword && otp) {
      if (
        !user.otp ||
        user.otp.code !== otp ||
        user.otp.expiresAt < new Date()
      ) {
        return NextResponse.json(
          { error: "Invalid or expired OTP" },
          { status: 400 }
        );
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateObj.password = hashedPassword;

      // Clear the OTP after successful use
      updateObj.otp = {
        code: null,
        expiresAt: null,
      };
    }

    // Update user in database
    const updatedUser = await User.findOneAndUpdate({ email }, updateObj, {
      new: true,
    });

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

// app/api/settings/route.js
import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/dbconnect";
import User from "../../../models/usermodal";

export async function PUT(request) {
  try {
    await connectDB();

    // Get the authenticated user's session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { isAutomated, classificationRate } = await request.json();

    // Validate the classification rate
    const validRates = [
      "every-second",
      "every-5-seconds",
      "every-minute",
      "every-5-minutes",
      "every-hour",
    ];
    if (!validRates.includes(classificationRate)) {
      return NextResponse.json(
        { error: "Invalid classification rate" },
        { status: 400 }
      );
    }

    // Find the user first
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If systemSettings doesn't exist, create it
    if (!user.systemSettings) {
      user.systemSettings = {
        isAutomated: isAutomated,
        classificationRate: classificationRate,
        updatedAt: new Date(),
      };
      await user.save();

      return NextResponse.json({
        message: "Settings created successfully",
        settings: user.systemSettings,
      });
    }

    // If systemSettings exists, update it
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          "systemSettings.isAutomated": isAutomated,
          "systemSettings.classificationRate": classificationRate,
          "systemSettings.updatedAt": new Date(),
        },
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Settings updated successfully",
      settings: updatedUser.systemSettings,
    });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

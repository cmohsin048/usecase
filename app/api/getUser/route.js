import User from "../../../models/usermodal"; 
import { dbConnect } from "../../../utils/dbconnect";

export const POST = async (req) => {
  try {
    await dbConnect(); 

    const { email } = await req.json(); 

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }

    // Fetch user details from the database
    const user = await User.findOne({ email });

    if (user) {
      return new Response(
        JSON.stringify({
          fullName: user.fullName,
          email: user.email,
          image: user.image || null, // Include image data if available
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
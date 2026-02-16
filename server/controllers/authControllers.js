import { generateToken } from "../utils/jwtTokenGenerator.js";
import userModel from "../models/User.js";
import { hashPassword ,comparePassword} from "../utils/hashedPassword.js";

export const registerUser = async (req, res) => {
  try {
    const { email, fullName, password  } = req.body;

    // 1. Validate input
    if (!email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message: "Please add all the details",
      });
    }

    // 2. Check if user already exists
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Member already exists with this email",
      });
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Create user
    const user = await userModel.create({
      name : fullName,
      email,
      password: hashedPassword,
   
    });

    // 5. Generate JWT token
    const token = generateToken(user._id);

    // 6. Send response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
  
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({

      success: false,
      message: "Server error",
    });
  }
};




export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

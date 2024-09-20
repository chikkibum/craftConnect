
import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const profileImg =
      "https://api.multiavatar.com/" +
      JSON.stringify(Math.floor(Math.random() * 10000000)) +
      ".svg";
    const user = new User({ username, email, password, role, profileImg });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const googleLogin = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email } = ticket.getPayload();

    if (email_verified) {
      const user = await User.findOne({ email });

      if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });
        res.cookie("token", token, { httpOnly: true }).json({
          token,
          action: "Login",
          user: { _id: user._id, name: user.username, email: user.email },
        });
      } else {
        let password = email + process.env.JWT_SECRET;
        const profileImg =
          "https://api.multiavatar.com/" +
          JSON.stringify(Math.floor(Math.random() * 10000000)) +
          ".svg";
        let newUser = new User({
          username: name,
          email,
          password,
          role: "New User",
          profileImg,
        });
        newUser = await newUser.save();
        const token = jwt.sign(
          {
            userId: newUser._id,
            role: newUser.role,
            profileImg: newUser.profileImg,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "8h",
          }
        );
        res
          .cookie("token", token, { httpOnly: true })
          .json({
          token,
          action: "Register",
          user: {
            _id: newUser._id,
            name: newUser.username,
            email: newUser.email,
          },
        });
      }
    } else {
      return res.status(400).json({
        error: "Google login failed. Try again.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

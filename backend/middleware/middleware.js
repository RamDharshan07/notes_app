import jwt, { decode } from "jsonwebtoken"
import User from "../models/User.js"

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secretkeyofnoteapp123");
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = { name: user.name, id: user._id };
    console.log(req.user);
    
    next();
  } catch (err) {
    console.error("Middleware error:", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
export default middleware
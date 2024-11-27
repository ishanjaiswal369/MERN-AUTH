import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("verifyToken");
  
  const token = req.cookies.token;
  try {
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Invalid token not provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    req.userId = decoded.userId;
    next();

  } catch (error) {
    console.log("Error in token verification", error);
    res
     .status(500)
     .json({ success: false, message: "Server Error" });
  }
};

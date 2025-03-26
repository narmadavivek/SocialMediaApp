import JWT from "jsonwebtoken";


const userAuth = (req, res, next) => {
  
  const token = req.header('Authorization')?.replace('Bearer ','');


  //const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Authentication failed: No token provided" });
  }

  


  try {
    console.log("Token:", token);
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Decoded token:', decodedToken);
    req.user ={ userId: decodedToken.userId};
    next();
  } catch (error) {
    console.error("JWT Verification Error:",error);
  
   // Handle specific JWT errors
   if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }

  // Handle other errors
  return res.status(500).json({ message: "Authentication failed" });
  }
};

export default userAuth;
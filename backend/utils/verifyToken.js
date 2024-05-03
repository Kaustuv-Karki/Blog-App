import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["access_token"].split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) next();
    else res.status(403).json({ message: "Forbidden" });
  });
};

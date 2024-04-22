import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, "secret_lalala");

        req.userId = decoded._id;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}
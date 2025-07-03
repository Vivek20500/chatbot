import jwt from 'jsonwebtoken';
export const createToken = (id, email, expiresIn = "7d") => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
//# sourceMappingURL=toekn-manager.js.map
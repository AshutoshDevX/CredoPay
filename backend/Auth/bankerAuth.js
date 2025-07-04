export const bankerOnlyMiddleware = async (req, res, next) => {
    if (req.user.user_type !== 'banker') {
        return res.status(403).json({ message: 'Access denied. Bankers only.' });
    }
    next();
};
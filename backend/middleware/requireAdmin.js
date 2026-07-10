// Duhet te vije gjithmone pas verifyToken, i cili e mbush req.user.
module.exports = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Vetem administratoret mund ta bejne kete!' });
  }
  next();
};

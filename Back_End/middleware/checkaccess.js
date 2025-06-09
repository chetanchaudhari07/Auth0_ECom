module.exports = function (allowedRolesStr) {
  const allowedRoles = allowedRolesStr.split(',');

  return (req, res, next) => {
    const roles = req.auth?.['https://Auth0Ecom/roles'];

    if (!roles || !roles.some(role => allowedRoles.includes(role))) {
      return res.status(403).json({ message: 'Access Denied: Insufficient role' });
    }

    next();
  };
};

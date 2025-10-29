function authorizationRole(requiredRole) {
  return (req, res, next) => {
    const user = req.user;
    console.log(user)

    const rolesHierarchy = ['customer','seller','admin'];

    if (!rolesHierarchy.includes(user.role)) {
      return res.status(401).json({
        error: true,
        message: 'Role not recognized'
      });
    }

    const userRoleIndex = rolesHierarchy.indexOf(user.role);
    const requiredRoleIndex = rolesHierarchy.indexOf(requiredRole);

    if (userRoleIndex < requiredRoleIndex) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized'
      });
    }

    next();
  };
}

module.exports = { authorizationRole };

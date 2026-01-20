const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) { //comaparing req->role and api->role 
      return res.status(403).json({      //sending 403 forbiden 
        success: false,
        message: "Access denied"
      });
    }
    next();
  };
};

//exporting 
module.exports = authorizeRoles;

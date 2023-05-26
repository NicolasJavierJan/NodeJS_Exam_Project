// To check if it's Admin
export function isAdmin (req, res, next){
    if (req.session.userType === 1){
      next();
    } else {
      res.status(401).send();
    }
  };
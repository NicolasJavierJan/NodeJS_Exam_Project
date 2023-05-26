// To check Authentication
export function isAuthenticated (req, res, next){
    if (req.session.userId && req.session.username){
      next();
    } else {
      res.status(401).send();
    }
  };


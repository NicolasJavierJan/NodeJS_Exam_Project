// To check Authentication
export function isAuthenticated (req, res, next){
    if (req.session.userId && req.session.username){
      next();
    } else {
      // TODO: Do something, return an error code or an error page.
      res.send("No");
    }
  };


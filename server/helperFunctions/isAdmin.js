// To check if it's Admin
export function isAdmin (req, res, next){
    if (req.session.userType === 1){
      next();
    } else {
      // TODO: Do something, return an error code or an error page.
      // TODO: It would be nice to have an error page here.
      res.send("No");
    }
  };
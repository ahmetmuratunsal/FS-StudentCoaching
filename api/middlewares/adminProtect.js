import AppError from "../utils/appError.js";

const adminProtect = (req, res, next) => {
  if (req.isAdmin === false) {
    return next(new AppError("Sadece adminler bu bilgilere ulaşabilir", 403));
  } else {
    next();
  }
};

export default adminProtect;

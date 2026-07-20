const User = require("../models/User");

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
     return  res.status(404).json({
        message: "user not found",
      });
    }
      res.status(200).json({
        message: "welcome",
        user: user,
      });
    
  } catch (e) {
    res.status(500).json({
        message:`Internal Error${e}`
    })
  }
};
module.exports = profile;

const User = require("../../../models/user");

class UsersControllers {
  // Get All Users
  async index(req, res) {
    try {
      const users = await User.find();

      if (!users) {
        return res.status(200).json({
          success: true,
          message: "هیچ کاربری وجود ندارد",
        });
      }

      return res.status(200).json({ success: true, users });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Error in Server" });
    }
  }

  //  DELETE User
  async destroy(req, res) {
    try {
      const userId = req.params.id;
      console.log(userId);
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "کاربر مورد نظر وجود ندارد",
        });
      }

      return res
        .status(200)
        .json({ success: true, message: "کاربر مورد نظر حذف شد" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Error in Server" });
    }
  }

  // Change role of User
  async changeRole(req,res){
   try {
    const {role} = req.body
    const userId = req.params.id
    const user = await User.findById(userId)

    if(!user){
      return res.status(404).json({
        success: false,
        message:"کاربر مورد نظر یافت نشد"
      })
    }
    const updatedUser = await User.findByIdAndUpdate(userId,{role})

    return res.status(200).json({
      success: true,
      message:"نقش کاربر آپدیت شد",
      updatedUser
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false, message:"Internal Error in Server"})
  }
}
}

module.exports = new UsersControllers();

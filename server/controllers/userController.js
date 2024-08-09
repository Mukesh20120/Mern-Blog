const asyncWrapper = require("../middleware/asyncWrapper");
const userModel = require("../model/user");

const updateUser = asyncWrapper(async (req, res) => {
  const { username, email, password, imageUrl } = req.body;
  const { id } = req.payload;
  if (username && (username.length < 4 || username.length > 20))
    throw new Error("username is not valid");
  if (password && password.length < 4) throw new Error("password is not valid");
  const newUpdateData = {};
  if (username) newUpdateData["username"] = username;
  if (email) newUpdateData["email"] = email;
  if (password) newUpdateData["password"] = password;
  if (imageUrl) newUpdateData["imageUrl"] = imageUrl;
  const fetchUser = await userModel.findOne({ _id: id });
  if (fetchUser) {
    Object.assign(fetchUser, newUpdateData);
    await fetchUser.save();
  }
  const { password: newUpdatedPass, ...remainData } = fetchUser._doc;
  return res.json({
    success: true,
    userData: remainData,
    message: "user data update successfully",
  });
});

const deleteUser = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  if (!userId || userId != req.payload?.id)
    throw new Error("Deleting wrong user");
  await userModel.findByIdAndDelete(userId);
  res.json({ success: true, message: "User delete successfully" });
});

module.exports = { updateUser, deleteUser };

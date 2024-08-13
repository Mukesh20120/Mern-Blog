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
  await userModel.findByIdAndDelete(userId);
  res.json({ success: true, message: "User delete successfully" });
});

const getUsers = asyncWrapper(async (req, res) => {
  const startIndex = req.query.startIndex ? parseInt(req.query.startIndex) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 9;
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

  const fetchUsers = await userModel
    .find({})
    .sort({ updatedAt: sortOrder })
    .skip(startIndex)
    .limit(limit);
  const userWithOutPassword = fetchUsers.map((user) => {
    const { password, ...res } = user._doc;
    return res;
  });
  const totalUsers = await userModel.countDocuments();
  const now = new Date();
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  const lastMonthUsers = await userModel.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });
  res.json({
    success: true,
    message: "fetch post successfully",
    users: userWithOutPassword,
    totalUsers,
    lastMonthUsers,
  });
});

const signOut = asyncWrapper((req, res) => {
  return res
    .clearCookie()
    .status(200)
    .json({ success: true, message: "user sign out successfully" });
});

module.exports = { updateUser, deleteUser, signOut, getUsers };

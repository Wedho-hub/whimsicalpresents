import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password');
  }
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};

const registerUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('User already exists');

  const user = await User.create({ name, email, password });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  };
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

const updateUserProfile = async (id, { name, email, password }) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  if (name)     user.name  = name;
  if (email)    user.email = email;
  if (password) user.password = password;

  const updated = await user.save();
  return {
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    token: generateToken(updated._id),
  };
};

const getAllUsers = async () => User.find({}).select('-password');

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return user;
};

const updateUser = async (id, { name, email, role }) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  if (name)  user.name  = name;
  if (email) user.email = email;
  if (role)  user.role  = role;

  const updated = await user.save();
  return { _id: updated._id, name: updated.name, email: updated.email, role: updated.role };
};

export {
  authenticateUser,
  registerUser,
  getUserById,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUser,
};

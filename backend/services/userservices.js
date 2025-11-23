import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// Authenticate user
const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      };
    }
    throw new Error('Invalid email or password');
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

// Register new user
const registerUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists');

    const user = await User.create({ name, email, password });
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Update user profile
const updateUserProfile = async (id, updateData) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');

    user.name = updateData.name || user.name;
    user.email = updateData.email || user.email;
    if (updateData.password) user.password = updateData.password;

    const updatedUser = await user.save();
    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    };
  } catch (error) {
    throw new Error(`Error updating profile: ${error.message}`);
  }
};

// Get all users (admin)
const getAllUsers = async () => {
  try {
    return await User.find({}).select('-password');
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

// Delete user (admin)
const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

// Update user (admin)
const updateUser = async (id, updateData) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');

    user.name = updateData.name || user.name;
    user.email = updateData.email || user.email;
    user.role = updateData.role || user.role;

    const updatedUser = await user.save();
    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
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

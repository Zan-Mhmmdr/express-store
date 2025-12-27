// controllers/users.controller.js

// GET /users
exports.getUsers = async (req, res) => {
  try {
    // nanti ganti ke DB
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// GET /users/:id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      data: {
        id,
        name: "John Doe",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: 3,
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        id,
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      message: `User ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

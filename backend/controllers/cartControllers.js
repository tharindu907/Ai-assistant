const Cart = require('../models/cartModel');

// Fetch Cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.query.userId; // Assuming user ID is passed as a query parameter
    if (!userId) return res.status(400).json({ message: 'User ID is required.' });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart.', error });
  }
};

// Add/Update Cart
exports.updateCart = async (req, res) => {
  try {
    const { userId, items } = req.body; // Items array should include productId, quantity, etc.
    if (!userId || !items) return res.status(400).json({ message: 'User ID and items are required.' });

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items } }, // Replace current items with new ones
      { new: true, upsert: true } // Create a new cart if none exists
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart.', error });
  }
};

// Remove Item from Cart
exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) return res.status(400).json({ message: 'User ID and product ID are required.' });

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } }, // Remove the specific item
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: 'Cart not found.' });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart.', error });
  }
};

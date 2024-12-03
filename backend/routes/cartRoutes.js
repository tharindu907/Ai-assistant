const express = require('express');


const router = express.Router();

// Get Cart for a User
router.get('/', async (req, res) => {
    const { userId, hotelId } = req.query;

    try {
        const cart = await Cart.findOne({ userId, hotelId });
        if (!cart) return res.status(200).json({ items: [] }); // Return empty if no cart
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

// Add/Update Item in Cart
router.post('/', async (req, res) => {
    const { userId, hotelId, items } = req.body;

    try {
        let cart = await Cart.findOne({ userId, hotelId });

        if (!cart) {
            // Create new cart if not exists
            cart = new Cart({ userId, hotelId, items });
        } else {
            // Update items in existing cart
            items.forEach((newItem) => {
                const existingItem = cart.items.find((item) => item.mealId === newItem.mealId);
                if (existingItem) {
                    existingItem.quantity = newItem.quantity;
                } else {
                    cart.items.push(newItem);
                }
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
    }
});

// Remove Item from Cart
router.delete('/:mealId', async (req, res) => {
    const { userId, hotelId } = req.query;
    const { mealId } = req.params;

    try {
        const cart = await Cart.findOne({ userId, hotelId });
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.items = cart.items.filter((item) => item.mealId !== parseInt(mealId));
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).json({ error: 'Failed to remove item' });
    }
});

module.exports = router;

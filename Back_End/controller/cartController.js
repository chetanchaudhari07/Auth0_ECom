const express = require('express');
const Cart = require('../models/cart');


exports.addToCart = async (req, res) => {
  const user = req.user.sub;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};


exports.getCart = async (req, res) => {
  const user = req.user.sub;
  try {
    const cart = await Cart.findOne({ user }).populate('items.productId');
    res.status(200).json(cart || { user, items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};
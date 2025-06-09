const express = require('express');
const Wishlist = require('../models/wishlist');


exports.addToWishlist = async (req, res) => {
  const user = req.user.sub;
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user });

    if (!wishlist) {
      wishlist = new Wishlist({ user, items: [productId] });
    } else {
      if (!wishlist.items.includes(productId)) {
        wishlist.items.push(productId);
      }
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};


exports.getWishlist = async (req, res) => {
  const user = req.user.sub;
  try {
    const wishlist = await Wishlist.findOne({ user }).populate('items');
    res.status(200).json(wishlist || { user, items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

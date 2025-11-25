exports.addToCart = async (req, res) => {
  res.send("Item added");
};

exports.getCart = async (req, res) => {
  res.send("Cart fetched");
};

exports.removeFromCart = async (req, res) => {
  res.send("Item removed");
};

import User from "../models/userModel.js";

// GET /api/user/addresses
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("addresses");
    res.json({ success: true, addresses: user.addresses || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/user/addresses
export const addAddress = async (req, res) => {
  try {
    const { name, phone, street, city, state, postalCode, country, isDefault } = req.body;

    if (!name || !phone || !street || !city) {
      return res.status(400).json({ success: false, message: "Name, phone, street and city are required" });
    }

    const user = await User.findById(req.user._id);

    const newAddress = { name, phone, street, city, state, postalCode, country };

    // If set as default, remove default from others
    if (isDefault) {
      user.addresses.forEach((a) => (a.isDefault = false));
      newAddress.isDefault = true;
    }

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({ success: true, addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/user/addresses/:id
export const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    const { name, phone, street, city, state, postalCode, country, isDefault } = req.body;

    if (name)       address.name       = name;
    if (phone)      address.phone      = phone;
    if (street)     address.street     = street;
    if (city)       address.city       = city;
    if (state)      address.state      = state;
    if (postalCode) address.postalCode = postalCode;
    if (country)    address.country    = country;

    if (isDefault) {
      user.addresses.forEach((a) => (a.isDefault = false));
      address.isDefault = true;
    }

    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/user/addresses/:id
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    address.deleteOne();
    await user.save();
    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

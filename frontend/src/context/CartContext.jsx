// frontend/src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();
const CART_KEY = "shaheen_cart_v1";

/**
 * Normalize legacy stored cart formats to the new flattened item shape:
 * { _id, name, price, image, brand, ram, storage, qty }
 */
function normalizeStored(parsed) {
  if (!parsed || !parsed.items) return { items: [] };

  // legacy: items: [{ key, product: {...}, qty }]
  if (parsed.items.length > 0 && parsed.items[0].product) {
    return {
      items: parsed.items.map((it) => {
        const p = it.product || {};
        return {
          _id: p._id || p.id || it.key || p.slug || p.name,
          name: p.name || "Product",
          price: Number(p.price || p.priceRaw || 0),
          image: p.image || (p.images && p.images[0]) || "",
          brand: p.brand || "",
          ram: p.ram || "",
          storage: p.storage || "",
          qty: Number(it.qty || 1),
        };
      }),
    };
  }

  // already flattened shape
  if (parsed.items.length > 0 && parsed.items[0]._id) {
    return {
      items: parsed.items.map((it) => ({
        _id: it._id,
        name: it.name || (it.product && it.product.name) || "Product",
        price: Number(it.price || (it.product && it.product.price) || 0),
        image: it.image || (it.product && (it.product.image || (it.product.images && it.product.images[0]))) || "",
        brand: it.brand || (it.product && it.product.brand) || "",
        ram: it.ram || (it.product && it.product.ram) || "",
        storage: it.storage || (it.product && it.product.storage) || "",
        qty: Number(it.qty || 1),
      })),
    };
  }

  return { items: [] };
}

function init() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    return normalizeStored(parsed);
  } catch {
    return { items: [] };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload || { items: [] };

    case "ADD": {
      const { item } = action.payload;
      const exists = state.items.find((it) => it._id === item._id);
      if (exists) {
        const items = state.items.map((it) =>
          it._id === item._id ? { ...it, qty: it.qty + item.qty } : it
        );
        return { ...state, items };
      }
      return { ...state, items: [item, ...state.items] };
    }

    case "REMOVE": {
      const id = action.payload;
      const items = state.items.filter((it) => it._id !== id);
      return { ...state, items };
    }

    case "SET_QTY": {
      const { id, qty } = action.payload;
      const items = state.items.map((it) => (it._id === id ? { ...it, qty: Math.max(1, qty) } : it));
      return { ...state, items };
    }

    case "DELTA_QTY": {
      const { id, delta } = action.payload;
      const items = state.items.map((it) => (it._id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it));
      return { ...state, items };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state]);

  // External API: addToCart expects raw product object and qty
  const addToCart = (product, qty = 1) => {
    const id = product._id || product.id || product.slug || product.name;
    const item = {
      _id: id,
      name: product.name || "Product",
      price: Number(product.price || product.priceRaw || 0),
      image: product.image || (product.images && product.images[0]) || "",
      brand: product.brand || "",
      ram: product.ram || "",
      storage: product.storage || "",
      qty: Number(qty || 1),
    };

    const exists = state.items.find((it) => it._id === item._id);
    dispatch({ type: "ADD", payload: { item } });

    if (exists) toast.info(`${item.name} quantity updated! 🛒`);
    else toast.success(`${item.name} added to cart! 🛒`);
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE", payload: id });
    toast.info("Item removed from cart");
  };

  const updateQty = (id, delta) => dispatch({ type: "DELTA_QTY", payload: { id, delta } });

  const setQty = (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } });

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
    toast.info("Cart cleared");
  };

  const cartItems = state.items || [];
  const cartCount = cartItems.reduce((s, it) => s + (Number(it.qty) || 0), 0);
  const subtotal = cartItems.reduce((s, it) => s + (Number(it.price || 0) * (Number(it.qty) || 0)), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQty,
        setQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
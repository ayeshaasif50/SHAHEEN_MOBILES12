import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import "./ListProducts.css"

// ✅ ICONS
import editIcon from "../assets/pencil.png"
import deleteIcon from "../assets/bin.png"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000"

const ListProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // 🔹 Fetch all products
  const fetchProducts = async () => {
    try {
      const TOKEN = localStorage.getItem("adminToken")
      const res = await axios.get(`${API}/api/products?limit=100`, {
        headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}
      })
      setProducts(res.data.products)
    } catch (err) {
      console.log(err)
      toast.error("Product does not loaded!")
    }
    setLoading(false)
  }

  // 🔹 Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      const TOKEN = localStorage.getItem("adminToken")
      await axios.delete(`${API}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      })
      toast.success("Product deleted successfully!")
      fetchProducts()
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to delete product!")
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) return <div className="loading">Loading products...</div>

  return (
    <div className="list-products">
      <div className="page-header">
        <h2>All Products</h2>
        <p>Total: <strong>{products.length}</strong> products</p>
      </div>

      <div className="products-table-wrap">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Badge</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No products found</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.image ? (p.image.startsWith("http") ? p.image : `${API}${p.image}`) : "https://via.placeholder.com/50"}
                      alt={p.name}
                      className="product-thumb"
                    />
                  </td>

                  <td className="product-name">{p.name}</td>
                  <td>{p.brand}</td>
                  <td className="price">Rs. {p.price}</td>

                  <td>
                    <span className={`stock-badge ${p.stock > 0 ? "in-stock" : "out-stock"}`}>
                      {p.stock > 0 ? `${p.stock} left` : "Out"}
                    </span>
                  </td>

                  <td>
                    {p.badge ? <span className="badge-tag">{p.badge}</span> : <span className="no-badge">—</span>}
                  </td>

                  {/* ✅ ACTION BUTTONS */}
                  <td className="actions-cell">
                    <button className="edit-btn" onClick={() => navigate(`/edit/${p._id}`)}>
                      <img src={editIcon} alt="edit" className="btn-icon" /> Edit
                    </button>

                    <button className="delete-btn" onClick={() => deleteProduct(p._id)}>
                      <img src={deleteIcon} alt="delete" className="btn-icon" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListProducts
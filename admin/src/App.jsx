import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

import Login from "./pages/Login"
import AddProduct from "./pages/AddProduct"
import ListProducts from "./pages/ListProducts"
import Orders from "./pages/Orders"
import EditProduct from "./pages/EditProduct"

import "./App.css"

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken")
  if (!token) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected admin routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout">
                <Navbar />
                <div className="main-layout">
                  <Sidebar />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<AddProduct />} />
                      <Route path="/add" element={<AddProduct />} />
                      <Route path="/list" element={<ListProducts />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/edit/:id" element={<EditProduct />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './Orders.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const STATUS = {
  pending: {
    label: 'Pending',
    bg: '#eef5f2',
    color: '#173f36',
  },
  confirmed: {
    label: 'Confirmed',
    bg: '#e7f7f1',
    color: '#0f6b55',
  },
  shipped: {
    label: 'Shipped',
    bg: '#eef6ff',
    color: '#1f4f7a',
  },
  delivered: {
    label: 'Delivered',
    bg: '#eaf8ef',
    color: '#1f6d3b',
  },
  cancelled: {
    label: 'Cancelled',
    bg: '#f3f5f5',
    color: '#66736f',
  },
}

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const getAdminToken = () => {
    const directToken =
      localStorage.getItem('adminToken') ||
      localStorage.getItem('token') ||
      localStorage.getItem('userToken')

    if (directToken) return directToken

    const adminInfo = localStorage.getItem('adminInfo')
    const userInfo = localStorage.getItem('userInfo')

    try {
      if (adminInfo) {
        const parsedAdmin = JSON.parse(adminInfo)
        return parsedAdmin?.token || ''
      }

      if (userInfo) {
        const parsedUser = JSON.parse(userInfo)
        return parsedUser?.token || ''
      }
    } catch (error) {
      console.log('Token parse error:', error.message)
    }

    return ''
  }

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString()
  }

  const formatDate = (date) => {
    if (!date) return '—'

    return new Date(date).toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const getTotalItems = (orderItems = []) => {
    return orderItems.reduce((total, item) => total + Number(item.qty || 0), 0)
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)

      const token = getAdminToken()

      if (!token) {
        toast.error('Admin token nahi mila. Dobara login karo.')
        setOrders([])
        return
      }

      const res = await axios.get(`${API}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const ordersData = Array.isArray(res.data)
        ? res.data
        : res.data?.orders || []

      setOrders(ordersData)
    } catch (error) {
      console.log('ORDERS FETCH ERROR:', error.response?.data || error.message)
      toast.error(error.response?.data?.message || 'Failed to load orders!')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const token = getAdminToken()

      if (!token) {
        toast.error('Admin token nahi mila. Dobara login karo.')
        return
      }

      await axios.put(
        `${API}/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success(`Status updated to ${status}`)
      fetchOrders()
    } catch (error) {
      console.log('STATUS UPDATE ERROR:', error.response?.data || error.message)
      toast.error(error.response?.data?.message || 'Failed to update status!')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <div className="loading">Loading orders...</div>

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h2>Orders</h2>
        </div>

        <span className="orders-count">
          {orders.length} Total Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">No orders available</div>
      ) : (
        orders.map((o) => {
          const orderStatus = o.status || 'pending'
          const statusStyle = STATUS[orderStatus] || STATUS.pending

          return (
            <div key={o._id} className="order-card">
              <div className="order-header">
                <div className="order-id-block">
                  <span>Order ID</span>
                  <strong>#{o._id?.slice(-8).toUpperCase()}</strong>
                </div>

                <div className="order-meta-row">
                  <div className="meta-item">
                    <span>Items</span>
                    <span>{getTotalItems(o.orderItems)}</span>
                  </div>

                  <div className="meta-item">
                    <span>Total</span>
                    <span className="price-val">
                      Rs. {formatPrice(o.totalPrice)}
                    </span>
                  </div>

                  <div className="meta-item order-date-box">
                    <span>Date</span>
                    <span>{formatDate(o.createdAt)}</span>
                  </div>

                  <span className="payment-pill">
                    {(o.paymentMethod || 'cod').toUpperCase()}
                  </span>
                </div>

                <select
                  className="status-dropdown"
                  value={orderStatus}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  style={{
                    background: statusStyle.bg,
                    color: statusStyle.color,
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="order-body">
                <div className="customer-section">
                  <p className="section-label">Customer</p>

                  <p className="customer-name">
                    {o.user?.name || o.customerName || o.guestInfo?.name || 'Guest User'}
                  </p>

                  <p className="customer-addr">
                    {o.shippingAddress?.address || 'No address'}
                    {o.shippingAddress?.city ? `, ${o.shippingAddress.city}` : ''}
                    {o.shippingAddress?.zip ? ` - ${o.shippingAddress.zip}` : ''}
                  </p>

                  <p className="customer-phone">
                    {o.user?.phone || o.guestInfo?.phone || '—'}
                  </p>

                  {o.customerEmail || o.guestInfo?.email ? (
                    <p className="customer-email">
                      {o.customerEmail || o.guestInfo?.email}
                    </p>
                  ) : null}
                </div>

                <div className="items-section">
                  <p className="section-label">Order Items</p>

                  <div className="items-list">
                    {o.orderItems?.length > 0 ? (
                      o.orderItems.map((item, i) => (
                        <span key={i} className="item-chip">
                          {item.name} × {item.qty}
                        </span>
                      ))
                    ) : (
                      <span className="item-chip">No items found</span>
                    )}
                  </div>

                  {o.notes ? (
                    <p className="order-notes">
                      <strong>Note:</strong> {o.notes}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Orders
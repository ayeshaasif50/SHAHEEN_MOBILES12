import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import "./Login.css"

// API base URL (Vite environment variable or fallback)
const API = import.meta.env.VITE_API_URL || "http://localhost:5000"

/*
  ForgotPasswordModal behavior:
  - Tries POST `${API}/api/auth/forgot-password` with { email }
  - If success: show toast and close
  - If response.status === 404: show helpful fallback (copy email template / open mail client)
  - Other errors: show toast
*/
function ForgotPasswordModal({ open, onClose, defaultEmail = "" }) {
  const [email, setEmail] = useState(defaultEmail)
  const [loading, setLoading] = useState(false)
  const [routeNotFound, setRouteNotFound] = useState(false)
  const [supportEmail, setSupportEmail] = useState("support@yourdomain.com") // change to your support address
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setEmail(defaultEmail || "")
    setRouteNotFound(false)
    setCopied(false)
  }, [open, defaultEmail])

  if (!open) return null

  const templateBody = `Hello Support Team,

I tried to reset my admin password for the site. Please send a password reset link to this email address:

User email: ${email}

Please let me know once the reset link has been sent.

Thanks,
(Your name)
`

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter an email")
      return
    }
    setLoading(true)
    setRouteNotFound(false)
    try {
      await axios.post(`${API}/api/auth/forgot-password`, { email })
      toast.success(`Password reset link sent to ${email}. Check your inbox.`)
      onClose()
    } catch (err) {
      const status = err.response?.status
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Could not send reset email"
      if (status === 404) {
        // Endpoint not implemented on backend — show fallback UI
        setRouteNotFound(true)
        toast.error("Reset route not found on server — using fallback")
      } else {
        toast.error(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error("Copy failed — try selecting and copying manually")
    }
  }

  const openMailClient = () => {
    const mailto = `mailto:${supportEmail}?subject=${encodeURIComponent(
      "Password reset request"
    )}&body=${encodeURIComponent(templateBody)}`
    window.location.href = mailto
  }

  return (
    <div className="fp-overlay" role="dialog" aria-modal="true" aria-label="Forgot password">
      <div className="fp-card">
        <button className="fp-close" onClick={onClose} aria-label="Close">×</button>
        <h2 className="fp-title">Reset password</h2>
        <p className="fp-desc">Enter your email and we'll try to send a reset link.</p>

        {!routeNotFound && (
          <form onSubmit={handleSubmit} className="fp-form">
            <label className="field-label" htmlFor="fp-email">Email</label>
            <input
              id="fp-email"
              type="email"
              className="field-input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        {routeNotFound && (
          <div className="fp-fallback">
            <p className="fp-desc">
              The password-reset endpoint was not found on your backend (404). Use the fallback below to contact support or copy the email template to request a reset.
            </p>

            <label className="field-label" htmlFor="support-email">Support email (where to send request)</label>
            <input
              id="support-email"
              type="email"
              className="field-input"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />

            <label className="field-label" htmlFor="support-body">Generated message</label>
            <textarea
              id="support-body"
              className="field-input fp-textarea"
              value={templateBody}
              readOnly
            />

            <div className="fp-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => copyToClipboard(templateBody)}
              >
                {copied ? "Copied" : "Copy message"}
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={openMailClient}
              >
                Open mail client
              </button>
            </div>

            <p className="fp-hint">
              Tip: ask your backend developer to implement POST {API}/api/auth/forgot-password to send reset emails.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const Login = () => {
  const [email, setEmail] = useState("admin@shaheen.com")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [fpOpen, setFpOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${API}/api/auth/admin-login`, {
        email,
        password,
      })

      // Store token: localStorage if remembered, otherwise sessionStorage
      const store = remember ? localStorage : sessionStorage
      store.setItem("adminToken", data.token)

      toast.success("Login successful!")
      navigate("/") // Redirect to dashboard
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed"
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper dark-theme">
      <div className="animated-bg" />

      <form className="login-card" onSubmit={handleLogin} aria-labelledby="login-heading">
        <h1 id="login-heading" className="login-title">Admin Login</h1>
        <p className="login-sub">Sign in to manage the site</p>

        <label className="field-label" htmlFor="email">Email</label>
        <input
          id="email"
          className="field-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          autoComplete="email"
        />

        <label className="field-label" htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            id="password"
            className="field-input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="form-row">
          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="forgot-btn"
            onClick={() => setFpOpen(true)}
          >
            Forgot?
          </button>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="login-footer">
          <small>
            By continuing, you agree to the <a href="/terms">terms of use</a> &amp; <a href="/privacy">privacy policy</a>.
          </small>
        </div>
      </form>

      <ForgotPasswordModal
        open={fpOpen}
        onClose={() => setFpOpen(false)}
        defaultEmail={email}
      />
    </div>
  )
}

export default Login
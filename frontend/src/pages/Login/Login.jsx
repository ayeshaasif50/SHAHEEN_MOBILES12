import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

const Login = ({ setShowLogin }) => {
  const { login, register, loading } = useAuth()

  const [currentForm, setCurrentForm] = useState("login")
  const [showPass,    setShowPass]    = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Login form data
  const [loginData, setLoginData] = useState({ email: '', password: '' })

  // Signup form data
  const [signupData, setSignupData] = useState({
    firstName: '', lastName: '',
    email: '', phone: '',
    password: '', confirmPassword: ''
  })

  // ===== LOGIN SUBMIT =====
  const handleLogin = async (e) => {
    e.preventDefault()
    const success = await login(loginData.email, loginData.password)
    if (success) setShowLogin(false)
  }

  // ===== SIGNUP SUBMIT =====
  const handleSignup = async (e) => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      import('react-toastify').then(({ toast }) => toast.error('Passwords does not match!'))
      return
    }

    if (signupData.password.length < 6) {
      import('react-toastify').then(({ toast }) => toast.error('Password must be at least 6 characters long!'))
      return
    }

    const success = await register({
      name:     `${signupData.firstName} ${signupData.lastName}`,
      email:    signupData.email,
      phone:    signupData.phone,
      password: signupData.password,
    })
    if (success) setShowLogin(false)
  }

  return (
    <div className="auth-overlay" onClick={() => setShowLogin(false)}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>

        {/* CLOSE */}
        <button className="auth-close" onClick={() => setShowLogin(false)}>✕</button>

        {/* TITLE */}
        <h2 className="auth-title">
          {currentForm === "login" ? "Login" : "Sign Up"}
        </h2>

        {/* ====== LOGIN FORM ====== */}
        {currentForm === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>

            <div className="auth-input-wrap">
              <input
                type="email"
                placeholder="Your email"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            <div className="auth-input-wrap pass-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <span className="pass-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? '⏳ Logging in...' : 'Login'}
            </button>

            <div className="auth-terms">
              <input type="checkbox" id="terms-login" required />
              <label htmlFor="terms-login">
                By continuing, I agree to the{" "}
                <a href="#">terms of use</a> &amp;{" "}
                <a href="#">privacy policy</a>.
              </label>
            </div>

            <p className="auth-switch">
              Create a new account?{" "}
              <span onClick={() => setCurrentForm("signup")}>Click here</span>
            </p>

          </form>
        )}

        {/* ====== SIGNUP FORM ====== */}
        {currentForm === "signup" && (
          <form className="auth-form" onSubmit={handleSignup}>

            <div className="auth-input-row">
              <div className="auth-input-wrap">
                <input
                  type="text"
                  placeholder="First name"
                  value={signupData.firstName}
                  onChange={e => setSignupData({ ...signupData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="auth-input-wrap">
                <input
                  type="text"
                  placeholder="Last name"
                  value={signupData.lastName}
                  onChange={e => setSignupData({ ...signupData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="auth-input-wrap">
              <input
                type="email"
                placeholder="Your email"
                value={signupData.email}
                onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            <div className="auth-input-wrap">
              <input
                type="tel"
                placeholder="Phone (03XX XXXXXXX)"
                value={signupData.phone}
                onChange={e => setSignupData({ ...signupData, phone: e.target.value })}
                required
              />
            </div>

            <div className="auth-input-wrap pass-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={signupData.password}
                onChange={e => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <span className="pass-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="auth-input-wrap pass-wrap">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={signupData.confirmPassword}
                onChange={e => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                required
              />
              <span className="pass-eye" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? '⏳ Creating...' : 'Create account'}
            </button>

            <div className="auth-terms">
              <input type="checkbox" id="terms-signup" required />
              <label htmlFor="terms-signup">
                By continuing, I agree to the{" "}
                <a href="#">terms of use</a> &amp;{" "}
                <a href="#">privacy policy</a>.
              </label>
            </div>

            <p className="auth-switch">
              Already have an account?{" "}
              <span onClick={() => setCurrentForm("login")}>Login here</span>
            </p>

          </form>
        )}

      </div>
    </div>
  )
}

export default Login
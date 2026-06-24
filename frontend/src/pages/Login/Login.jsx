import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";

const EyeOpen = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeClosed = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const SpinnerIcon = () => (
  <svg
    width="16" height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth="2.5"
    strokeLinecap="round"
    style={{ animation: "spin 0.8s linear infinite", marginRight: "6px", verticalAlign: "middle" }}
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

const Login = ({ setShowLogin }) => {
  const { login, register, loading } = useAuth()

  const [currentForm, setCurrentForm] = useState("login")
  const [showPass,    setShowPass]    = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [loginData, setLoginData] = useState({ email: '', password: '' })

  const [signupData, setSignupData] = useState({
    firstName: '', lastName: '',
    email: '', phone: '',
    password: '', confirmPassword: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    const success = await login(loginData.email, loginData.password)
    if (success) setShowLogin(false)
  }

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

        <button className="auth-close" onClick={() => setShowLogin(false)}>✕</button>

        <h2 className="auth-title">
          {currentForm === "login" ? "Login" : "Sign Up"}
        </h2>

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
                {showPass ? <EyeOpen /> : <EyeClosed />}
              </span>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <><SpinnerIcon /> Logging in...</> : 'Login'}
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
                {showPass ? <EyeOpen /> : <EyeClosed />}
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
                {showConfirm ? <EyeOpen /> : <EyeClosed />}
              </span>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <><SpinnerIcon /> Creating...</> : 'Create account'}
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
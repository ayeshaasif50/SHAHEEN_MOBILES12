import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

// ✅ FIX: localhost hardcode hataya
const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("shaheenUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("shaheenToken") || ""
  );
  const [loading, setLoading] = useState(false);

  const sessionTimerRef = useRef(null);

  const clearAuth = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("shaheenUser");
    localStorage.removeItem("shaheenToken");
    localStorage.removeItem("loginTime");
  };

  const logout = async (showMessage = true) => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }

    try {
      await axios.post(`${API}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    }

    clearAuth();
    if (showMessage) toast.success("Logout! 👋");
  };

  const startSessionTimer = (loginTime) => {
    if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);

    const remaining = SESSION_DURATION - (Date.now() - loginTime);

    if (remaining <= 0) {
      logout(false);
      toast.error("Session expire ho gaya, dobara login karein");
      return;
    }

    sessionTimerRef.current = setTimeout(() => {
      logout(false);
      toast.error("Session expire ho gaya, dobara login karein");
    }, remaining);
  };

  const resetSessionTimer = () => {
    const loginTime = Date.now();
    localStorage.setItem("loginTime", String(loginTime));
    startSessionTimer(loginTime);
  };

  useEffect(() => {
    const savedLoginTime = localStorage.getItem("loginTime");
    const savedUser = localStorage.getItem("shaheenUser");

    if (savedLoginTime && savedUser) {
      startSessionTimer(Number(savedLoginTime));
    }

    const events = ["click", "keypress", "mousemove", "touchstart", "scroll"];
    const handleActivity = () => {
      if (localStorage.getItem("shaheenToken")) {
        resetSessionTimer();
      }
    };

    events.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        const loginTime = Date.now();
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("shaheenUser", JSON.stringify(res.data.user));
        localStorage.setItem("shaheenToken", res.data.token);
        localStorage.setItem("loginTime", String(loginTime));
        startSessionTimer(loginTime);
        toast.success(`Welcome back, ${res.data.user.name}!`);
        setLoading(false);
        return true;
      }

      setLoading(false);
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
      setLoading(false);
      return false;
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/api/auth/register`,
        userData,
        { withCredentials: true }
      );

      if (res.data.success) {
        const loginTime = Date.now();
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("shaheenUser", JSON.stringify(res.data.user));
        localStorage.setItem("shaheenToken", res.data.token);
        localStorage.setItem("loginTime", String(loginTime));
        startSessionTimer(loginTime);
        toast.success(`Account created! Welcome ${res.data.user.name}! 🎉`);
        setLoading(false);
        return true;
      }

      setLoading(false);
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
      setLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
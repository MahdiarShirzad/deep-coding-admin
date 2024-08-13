import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = ({ email, password }) => {
    if (email === "admin@gmail.com" && password === "admin123") {
      // Simulate setting user data
      const userData = { email, name: "Admin" };
      dispatch(setUser(userData));
      localStorage.setItem("session", JSON.stringify(userData));

      navigate("/admin-panel/dashboard");
      return { success: true };
    } else {
      return { success: false };
    }
  };

  return { login };
}

import api from "../api/axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode"; //to decode token

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      // valadating form
      alert("All fields are required");
      return;
    }
    const res = await api.post("/auth/login", form); //api call

    const token = res.data.token;

    // Decode token to get role
    const decoded = jwtDecode(token);

    localStorage.setItem("token", token); // storing in localstorage ,
    //  in production we store in http only cookies
    localStorage.setItem("role", decoded.role);

    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        style={styles.input}
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button style={styles.button} onClick={submit}>
        Login
      </button>
      <p>
        Dont have Account create one <a href="/register">Register</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "100px auto",
    gap: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

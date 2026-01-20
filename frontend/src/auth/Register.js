import api from "../api/axios";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const submit = async () => {
    if (!form.email || !form.password || !form.role || !form.name) { //valadating form 
      alert("All fields are required");
      return;
    }

    await api.post("/auth/register", form); //api call 
    alert("Registered successfully");
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input
        style={styles.input}
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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
      <select style={styles.input}   onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="USER">user</option>
        <option value="ADMIN">admin</option>
      </select>

      <button style={styles.button} onClick={submit}>
        Register
      </button>

      <p>
        Already have an account? <a href="/login">Login</a>
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

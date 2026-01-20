import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();   // deleting storaed items 
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3>Task Manager</h3>

      <div style={styles.links}>
        <Link to="/"  style={styles.links}>Home</Link>

        {role === "USER" && <Link to="/tasks" style={styles.links}>My Tasks</Link>}
         {/* displaying according to role  */}
        {role === "ADMIN" && <Link to="/admin" style={styles.links}>Admin</Link>}

        <button onClick={logout} style={styles.btn}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#282c34",
    color: "#fff"
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    color: "green",
    fontWeight: "bold",
    fontSize: "20px",
  },
  btn: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

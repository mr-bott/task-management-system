import Navbar from "../components/Navbar";
// import UserTasks from "./UserTasks";
export default function Home() {
  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Welcome to Task Manager</h1>

        {role === "ADMIN" ? (
          <p>
            You are logged in as <b style={styles.b}>Admin</b>.  
            Use the Admin Dashboard to test APIs and manage users.
          </p>
        ) : (
          <p>
            You are logged in as <b style={styles.b}>User</b>.  
            Create, update, and manage your personal tasks.
          </p>
        )}

        <h1>  "/tasks" : for user Tasks </h1>
       <h1> "/admin" : for Admin Dashboard </h1>
      </div>
       
    </>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center"
  },
  b: {
 color : "green",
 fontSize : "32px"
  }
};

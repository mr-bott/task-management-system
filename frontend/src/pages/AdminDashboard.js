import api from "../api/axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const [userTasks, setUserTasks] = useState({});
  const [openUserId, setOpenUserId] = useState(null);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data.data.users);
    setUserCount(res.data.data.count);
  };

  const fetchAllTasks = async () => {
    const res = await api.get("/admin/tasks");
    setTaskCount(res.data.data.count);
  };

  useEffect(() => {
    fetchUsers();
    fetchAllTasks();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    await api.patch(`/admin/users/${id}/role`, { role });
    fetchUsers();
  };

  const getUserTasks = async (userId) => {
    if (openUserId === userId) {
      setOpenUserId(null);
      return;
    }

    const res = await api.get(`/admin/users/${userId}/tasks`);
    setUserTasks((prev) => ({
      ...prev,
      [userId]: res.data.data.tasks,
    }));
    setOpenUserId(userId);
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      {/* Stats */}
      <div style={styles.stats}>
        <div>Total Users: {userCount}</div>
        <div>Total Tasks: {taskCount}</div>
      </div>

      {/* Users */}
      <h3>Users</h3>
      {users.map((user) => (
        <div key={user._id} style={styles.card}>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>

          <div style={styles.actions}>
            <button
              style={styles.button}
              onClick={() =>
                changeRole(
                  user._id,
                  user.role === "ADMIN" ? "USER" : "ADMIN"
                )
              }
            >
              Make {user.role === "ADMIN" ? "USER" : "ADMIN"}
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => getUserTasks(user._id)}
            >
              {openUserId === user._id ? "Hide Tasks" : "View Tasks"}
            </button>

            <button
              style={styles.deleteButton}
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
          </div>

          {/* User Tasks */}
          {openUserId === user._id && userTasks[user._id] && (
            <div style={styles.taskList}>
              <h4>User Tasks</h4>
              {userTasks[user._id].length === 0 ? (
                <p>No tasks</p>
              ) : (
                userTasks[user._id].map((task) => (
                  <div key={task._id} style={styles.task}>
                    <b>{task.title}</b>
                    <p>{task.description}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  card: {
    border: "1px solid #ccc",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
    flexWrap: "wrap",
  },
  button: {
    padding: "6px 10px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "6px 10px",
    backgroundColor: "#9C27B0",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "6px 10px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  taskList: {
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid #ddd",
  },
  task: {
    border: "1px solid #eee",
    padding: "8px",
    borderRadius: "4px",
    marginBottom: "6px",
  },
};

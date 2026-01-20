import api from "../api/axios";
import { useEffect, useState } from "react";

export default function UserTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    await api.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const updateTask = async (id) => {
    await api.put(`/tasks/${id}`, {
      title: editTitle,
      description: editDescription,
    });

    setEditingId(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <h2>My Tasks</h2>

      {/* Add Task */}
      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.input}
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.button} onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <div key={task._id} style={styles.task}>
          {editingId === task._id ? (
            <>
              <input
                style={styles.input}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                style={styles.input}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <button
                style={styles.button}
                onClick={() => updateTask(task._id)}
              >
                Save
              </button>
              <button
                style={styles.secondaryButton}
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <b>{task.title}</b>
              <p>{task.description}</p>

              <div style={styles.actions}>
                <button
                  style={styles.button}
                  onClick={() => startEdit(task)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/* SINGLE styles object */
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width:"50vw",
    margin: "50px auto",
    gap: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  input: {
    padding: "8px",
    fontSize: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "8px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "8px",
    backgroundColor: "#777",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  deleteButton: {
    padding: "8px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  task: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "5px",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  },
};

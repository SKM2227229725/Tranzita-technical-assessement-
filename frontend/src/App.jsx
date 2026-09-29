import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/tasks";

function App() {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");

  const [form, setForm] = useState({
    title: "", 
    description: "",
    priority: "",
    status: "",
    dueDate: ""
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {

    try {
      setLoading(true);
      setError("");

      let url = API_URL;

      if (filter) {
        url += `?status=${filter}`;
      }

      const response = await axios.get(url);

      setTasks(response.data);

    } catch (error) {
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!form.priority) {
      setError("Priority is required");
      return;
    }

    if (!form.status) {
      setError("Status is required");
      return;
    }

    if (!form.dueDate) {
      setError("Due date is required");
      return;
    }

    try {

      if (editingId) {

        await axios.put(
          `${API_URL}/${editingId}`,
          form
        );

        setMessage("Task updated successfully");

      } else {

        await axios.post(
          API_URL,
          form
        );

        setMessage("Task created successfully");
      }

      resetForm();
      fetchTasks();

    } catch (error) {

      setError("Something went wrong. Please try again.");
    }
  };


  const editTask = (task) => {

    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate
    });

    setEditingId(task.id);
  };


  const deleteTask = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(`${API_URL}/${id}`);

      setMessage("Task deleted successfully");

      fetchTasks();

    } catch (error) {

      setError("Unable to delete task");
    }
  };


  const resetForm = () => {

    setForm({
      title: "",
      description: "",
      priority: "",
      status: "",
      dueDate: ""
    });

    setEditingId(null);
  };


  return (
    <div className="container">

      <h1>Task Management System</h1>

      <div className="form-section">

        <h2>
          {editingId ? "Edit Task" : "Create Task"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label>Title</label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <label>Priority</label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <label>Due Date</label>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId ? "Update Task" : "Create Task"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}

        </form>

        {error && <p className="error">{error}</p>}

        {message && <p className="success">{message}</p>}

      </div>


      <div className="task-section">

        <div className="filter">

          <label>Filter by Status: </label>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

        </div>


        <h2>Tasks</h2>

        {loading && <p>Loading tasks...</p>}

        {!loading && tasks.length === 0 && (
          <p>No tasks found.</p>
        )}

        {!loading && tasks.length > 0 && (

          <table>

            <thead>

              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr key={task.id}>

                  <td>{task.title}</td>

                  <td>{task.description}</td>

                  <td>{task.priority}</td>

                  <td>
                    <span className={`status ${task.status
                      .replace(" ", "-")
                      .toLowerCase()}`}>
                      {task.status}
                    </span>
                  </td>

                  <td>{task.dueDate}</td>

                  <td>

                    <button
                      onClick={() => editTask(task)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default App;
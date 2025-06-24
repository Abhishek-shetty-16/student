import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [marks, setMarks] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchStudents = () => {
    axios.get("http://localhost:8000/students").then(res => setStudents(res.data));
  };

  const handleSubmit = () => {
    if (!name.trim() || !roll.trim() || marks === "") {
      alert("Please fill all fields");
      return;
    }

    const student = { id: editId || Date.now(), name, roll, marks: parseInt(marks) };

    if (editId) {
      axios
        .put(`http://localhost:8000/students/${editId}`, student)
        .then(() => fetchStudents());
    } else {
      axios
        .post("http://localhost:8000/students", student)
        .then(() => fetchStudents());
    }

    setName("");
    setRoll("");
    setMarks("");
    setEditId(null);
  };

  const handleEdit = (s) => {
    setEditId(s.id);
    setName(s.name);
    setRoll(s.roll);
    setMarks(s.marks);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/students/${id}`).then(() => fetchStudents());
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>🎓 Student Record System</h2>

      <input
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Roll No"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        type="number"
      />
      <button className="btn btn-primary me-2" onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>
      {editId && (
        <button
          className="btn btn-secondary"
          onClick={() => {
            setEditId(null);
            setName("");
            setRoll("");
            setMarks("");
          }}
        >
          Cancel
        </button>
      )}

      <hr />
      <h3>Student List</h3>
      <ul className="list-group">
        {students.map((s) => (
          <li key={s.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {s.name} | Roll: {s.roll} | Marks: {s.marks}
            </div>
            <div>
              <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(s)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

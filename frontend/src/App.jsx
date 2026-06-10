import { useEffect, useState } from 'react';
import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/api/todos`;

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTodos = () => {
    axios.get(API).then(res => setTodos(res.data)).catch(console.error);
  };

  useEffect(() => { fetchTodos(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await axios.post(API, { title });
    setTitle('');
    fetchTodos();
  };

  const handleToggle = async (todo) => {
    await axios.put(`${API}/${todo._id}`, { done: !todo.done });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  };

  const handleUpdate = async (id) => {
    await axios.put(`${API}/${id}`, { title: editTitle });
    setEditingId(null);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h1>Todos List</h1>

      <form onSubmit={handleCreate}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ marginTop: 8 }}>
            {editingId === todo._id ? (
              <>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <button type="submit" onClick={() => handleUpdate(todo._id)}>Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo)} />
                <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
                <button type="button" onClick={() => startEdit(todo)}>Edit</button>
                <button type="button" onClick={() => handleDelete(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
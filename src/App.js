import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Pages/Login/Register';
import AddTask from './Pages/Home/AddTask';
import Home from './Pages/Home/Home';
import Header from './Pages/Shared/Header';
import RequireAuth from './Pages/Login/RequireAuth';
import TaskItems from './Pages/Home/TaskItems';
import { useEffect, useState } from 'react';
// import SingleDeleteTask from './Pages/SingleDeleteTask';
// import DeleteITasks from './Pages/DeleteITasks';
import TaskDeletion from './Pages/TaskDeletion';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://gentle-headland-50426.herokuapp.com/tasks')
      .then(res => res.json())
      .then(data => {
        setItems(data);
      });
  }, []);
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/showTasks" element={<div className='container mt-5'>
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {
              items.map(item =>
                <TaskItems
                  key={item._id}
                  item={item}>
                </TaskItems>)
            }
          </div>
        </div>}></Route>
        <Route path="/addTask" element={<RequireAuth><AddTask></AddTask></RequireAuth>}></Route>
        {/* <Route path="/deleteTasks" element={<RequireAuth><DeleteITasks></DeleteITasks></RequireAuth>}></Route> */}
        {/* <Route path="/deleteTasks" element={<RequireAuth><DeleteITasks></DeleteITasks></RequireAuth>}></Route> */}
        {/* <Route path="/deleteTasks" element={<RequireAuth><DeleteITasks></DeleteITasks></RequireAuth>}></Route> */}
        <Route path="/deleteTasks" element={<RequireAuth><TaskDeletion></TaskDeletion></RequireAuth>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

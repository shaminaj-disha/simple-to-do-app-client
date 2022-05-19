import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskItems from './TaskItems';

const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://gentle-headland-50426.herokuapp.com/tasks')
            .then(res => res.json())
            .then(data => {
                setItems(data);
            });
    }, []);
    const navigate = useNavigate();
    const handleAddTask = () => {
        navigate('/addTask');
    }
    return (
        <div className='d-flex flex-column align-items-center'>
            <div className='my-3'><h1>To-Do App</h1></div>
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {
                    items.map(item =>
                        <TaskItems
                            key={item._id}
                            item={item}>
                        </TaskItems>)
                }
            </div>
            <div className='mt-5'><button onClick={handleAddTask} className='btn btn-dark'>Go to Add Task</button></div>
        </div>
    );
};

export default Home;
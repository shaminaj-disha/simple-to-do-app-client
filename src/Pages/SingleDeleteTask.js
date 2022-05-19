import React, { useEffect, useState } from 'react';

const SingleDeleteTask = ({ item }) => {
    const { _id, taskName, description } = item;

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://gentle-headland-50426.herokuapp.com/tasks')
            .then(res => res.json())
            .then(data => {
                setItems(data);
            });
    }, []);

    const handleDeleteTask = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `https://gentle-headland-50426.herokuapp.com/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remainingItems = items.filter(item => item._id !== id);
                    setItems(remainingItems);
                })
        }
    }

    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title mb-4">{taskName}</h5>
                    <p className="card-text">{description}</p>
                    <button onClick={() => handleDeleteTask(_id)} className='btn btn-dark'>Delete Task</button>
                </div>
            </div>
        </div>
    );
};

export default SingleDeleteTask;
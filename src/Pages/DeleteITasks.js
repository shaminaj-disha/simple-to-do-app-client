import React, { useEffect, useState } from 'react';
import SingleDeleteTask from './SingleDeleteTask';

const DeleteITasks = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://gentle-headland-50426.herokuapp.com/tasks')
            .then(res => res.json())
            .then(data => {
                setItems(data);
            });
    }, []);

    return (
        <div className='container mt-5'>
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {
                    items.map(item =>
                        <SingleDeleteTask
                            key={item._id}
                            item={item}>
                        </SingleDeleteTask>)
                }
            </div>
        </div>
    );
};

export default DeleteITasks;
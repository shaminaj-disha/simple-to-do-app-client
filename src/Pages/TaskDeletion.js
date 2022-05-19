import React, { useEffect, useState } from 'react';

const TaskDeletion = () => {
    const [items, setItems] = useState([]);
    // const [completed, setCompleted] = useState();

    useEffect(() => {
        fetch('https://gentle-headland-50426.herokuapp.com/tasks')
            .then(res => res.json())
            .then(data => {
                setItems(data);
            });
    }, []);

    const handleDeleteItem = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `https://gentle-headland-50426.herokuapp.com/tasks/${id}`;
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
    const handleCompleteItem = id => {
        // const quantity = (parseInt(item?.quantity) - 1);
        // console.log(item?.sold);
        // const sold = (parseInt(item?.sold) + 1);
        // console.log(quantity);
        // const updatedItem = { quantity, sold };
        // console.log(updatedItem);
        // const status = "complete";
        // const updatedItem = {status};

        // send data to server
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `http://localhost:5000/tasks/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert('Task Completed');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    }
    return (
        <div className='m-2'>
            <h2 className='text-center my-4'>All Tasks ({items.length})</h2>
            <div className='container' style={{ overflowX: "auto" }}>
                <table className="table table-bordered table-hover" >
                    <thead className='table-dark'>
                        <tr>
                            {/* <th scope="col">Id</th> */}
                            <th scope="col">Task Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Complete</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item =>
                            <tr key={item._id}>
                                {/* <th scope="row">{item?._id}</th> */}
                                <td>{item?.taskName}</td>
                                <td>{item?.description}</td>
                                <td><button className='bg-white' onClick={() => handleCompleteItem(item._id)}>Complete</button></td>
                                <td><button className='bg-white' onClick={() => handleDeleteItem(item._id)}>X</button></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskDeletion;
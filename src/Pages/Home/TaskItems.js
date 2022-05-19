import React from 'react';

const TaskItems = ({ item }) => {
    const { taskName, description, status } = item;
    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-body">
                    {
                        status === 'complete' ?
                            <div>
                                <h5 className="card-title mb-4">Task Name: <span className='text-decoration-line-through'>{taskName}</span></h5>
                                <p className="card-text">Description: <span className='text-decoration-line-through'>{description}</span></p>
                            </div>
                            :
                            <div>
                                <h5 className="card-title mb-4">Task Name: {taskName}</h5>
                                <p className="card-text">Description: {description}</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default TaskItems;
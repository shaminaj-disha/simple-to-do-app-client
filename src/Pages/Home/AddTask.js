import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';

const AddTask = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [user] = useAuthState(auth);
    const onSubmit = data => {
        console.log(data);
        data.status = 'incomplete';
        const url = `https://gentle-headland-50426.herokuapp.com/addTask`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                alert('Item Added Successfully');
                reset();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className='container w-50 mx-auto mt-5'>
            <h1>Add Task</h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='my-2' value={user?.displayName} type="text" readOnly {...register("name", { required: true })} />
                <input className='my-2' value={user?.email} type="email" readOnly {...register("email", { required: true })} />
                <input className='my-2' placeholder='Task Name' type="text" {...register("taskName", { required: true })} />
                <textarea className='my-2' placeholder='Description' {...register("description", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                <input className='w-50 btn btn-dark mx-auto mt-3' type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddTask;
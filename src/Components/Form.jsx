import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ShowUsersData from './ShowUsersData';

const From = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleForm = (data) => {
        console.log(data);

        // Save data in Database 
        axios.post('http://localhost:3000/users-data', data)
            .then(res => {
                toast.success("Submit successfully");
            })
            .catch(error => {
                console.log('error', error);
                toast.error("Failed to submit data");
            });
    }

    useEffect(() => {
        fetch("http://localhost:3000/all-users-data")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching users:", err));
    }, []);
    // console.log(users)

    return (
        <div>
            <div className='max-w-xl mx-auto my-10 shadow p-6 rounded-xl bg-white'>
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className='space-y-4'>

                    <div className="flex gap-4">
                        {/* name input field */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Enter name"
                                className="w-full border border-gray-400 p-2 rounded-xl"
                                {...register('name', { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* select field */}
                        <div className="flex-1">
                            <select
                                {...register("role", { required: "Role is required" })}
                                className="w-full border border-gray-400 p-2 rounded-xl">
                                <option value="">Select Role</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="engineer">Engineer</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-1">{errors?.role?.message}</p>
                            )}
                        </div>
                    </div>

                    {/* submit button */}
                    <div>
                        <input
                            type="submit"
                            className='px-6 py-2 border-green-400 bg-green-400 hover:bg-green-500 rounded-2xl cursor-pointer'
                        />
                    </div>
                </form>
            </div>
            <div>
                <ShowUsersData users={users} loading={loading}></ShowUsersData>
            </div>
        </div>
    );
};

export default From;
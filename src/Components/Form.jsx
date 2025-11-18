import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ShowUsersData from './ShowUsersData';

const From = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [fields, setFields] = useState([{ name: '', role: '' }]);;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add new field
    const addField = () => {
        setFields([...fields, { name: '', role: '' }]);
    };

    // Delete field
    const deleteField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    // Handle input change
    const handleChange = (index, e) => {
        const newFields = [...fields];
        newFields[index][e.target.name] = e.target.value;
        setFields(newFields);
    };


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

    // Fetch Users data 
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
                <form onSubmit={handleSubmit(handleForm)} className='space-y-4'>

                    {fields.map((field, index) => (
                        <div key={index} className="flex gap-4 mb-2 items-center">
                            {/* Name input */}
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={field.name}
                                onChange={(e) => handleChange(index, e)}
                                {...register('name', { required: "Name is required" })}
                                className="flex-1 border border-gray-400 p-2 rounded-xl"

                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}

                            {/* Role select */}
                            <select
                                name="role"
                                value={field.role}
                                onChange={(e) => handleChange(index, e)}
                                className="flex-1 border border-gray-400 p-2 rounded-xl"
                                {...register("role", { required: "Role is required" })}
                            >
                                <option value="">Select Role</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="engineer">Engineer</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-1">{errors?.role?.message}</p>
                            )}

                            {/* Delete button */}
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => deleteField(index)}
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}

                    {/* Add button */}
                    <div>
                        <button
                            type="button"
                            onClick={addField}
                            className='px-2 border-2 border-green-500 bg-green-400 hover:bg-green-500 rounded-2xl cursor-pointer text-xl mb-4'
                        >
                            +
                        </button>
                    </div>

                    {/* Submit button */}
                    <div>
                        <input
                            type="submit"
                            className='px-6 py-2 border-2 border-green-500 bg-green-400 hover:bg-green-500 rounded-2xl cursor-pointer'
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
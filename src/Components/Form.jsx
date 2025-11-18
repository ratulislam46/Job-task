import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const From = () => {
    const { register, handleSubmit, formState: { errors },reset } = useForm();

    const handleForm = async (data) => {
        console.log(data);

        try {
            const res = await axios.post("/applied-trainers", data);
            if (res.data.insertedId) {
                reset();
            }
        } catch (err) {
            console.error("Submission error:", err);
        }
    }

    return (
        <div className='max-w-xl mx-auto my-10 shadow'>
            <form
                onSubmit={handleSubmit(handleForm)}
                className='py-8 space-y-4 px-12'>

                {/* name input field  */}
                <label>Full Name</label> <br />
                <input
                    type="text"
                    placeholder="Enter name"
                    className="border border-gray-400 p-2 rounded-xl"
                    {...register('name', { required: "Name is required" })}
                />
                {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                )}
                <br />

                {/* select field  */}
                <label>Select Role</label> <br />
                <select
                    {...register("role", { required: "Role is required" })}
                    className="border border-gray-400 p-2 rounded-xl">
                    <option value="">Select Role</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="engineer">Engineer</option>
                </select>
                {errors.role && (
                    <p className="text-red-500">{errors?.role?.message}</p>
                )}

                {/* submit button  */}
                <br />
                <input type="submit" className='px-4 py-2 border-green-400 bg-green-400 hover:bg-green-500 rounded-2xl' />
            </form>
        </div>
    );
};

export default From;
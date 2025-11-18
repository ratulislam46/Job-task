import React from 'react';
import { useForm } from 'react-hook-form';

const From = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const handleForm = (data) => {
        console.log(data);
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
                    className="border p-2 "
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
                    className='p-2 border'>
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
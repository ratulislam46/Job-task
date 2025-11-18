import React from 'react';

const ShowUsersData = ({ users, loading }) => {
    // console.log(users);
    if (loading) return <p className='text-center'>Loading . . .</p>;

    return (
        <div className='container mx-auto'>
            {users?.length < 1 ? (
                <p className='text-center'>No users found</p>
            ) : (
                <div>
                    <h2 className='text-xl font-bold mb-4'>Users List:</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center'>
                        {users.map((user, index) => (
                            <div key={index} className='border p-4 rounded'>
                                <p>Name: {user.name}</p>
                                <p>Role: {user.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowUsersData;
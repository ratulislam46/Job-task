import React from 'react';

const ShowUsersData = ({ users, loading }) => {
    console.log(users);
    if (loading) return <p className='text-center'>Loading . . .</p>;

    const filtered = users.filter(item => {
        return !Object.values(item).some(value => Array.isArray(value));
    });

    console.log(filtered);

    return (
        <div className='container mx-auto'>
            {filtered?.length < 1 ? (
                <p className='text-center'>No users found</p>
            ) : (
                <div>
                    <h2 className='text-xl font-bold mb-4'>Users List:</h2>
                    {filtered?.map((user, index) => (
                        <div key={index}>
                            <h3>{index + 1}. Name: {user?.name}</h3>
                            <h3>Role: {user?.role}</h3> <br />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowUsersData;
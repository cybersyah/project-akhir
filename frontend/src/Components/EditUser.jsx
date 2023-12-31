import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const EditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");

    const navigate = useNavigate();
    const { id } = useParams();

    
    const getUserById = async () => {
        const response = await axios.get(`https://project-akhir-api.vercel.app/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
    }
    
    useEffect(() => {
        getUserById();
    }, [])

    
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://project-akhir-api.vercel.app/users/${id}`, {
                name,
                email,
                gender
            })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="columns">
            <div className="column is-half">

                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='email@mail.com'
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button type='submit' className='button is-success'>
                                Update
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default EditUser
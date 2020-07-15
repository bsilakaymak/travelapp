import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/users'
import User from './User'
import { Title } from '../shared/Elements'
const Users = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const { users } = useSelector((state) => state.users)
    console.log(users)
    return (
        <div>
            <Title center fontSize="2rem" margin="1rem">
                Users
            </Title>
            {users.map((user) => (
                <User key={user._id} user={user} />
            ))}
        </div>
    )
}

export default Users

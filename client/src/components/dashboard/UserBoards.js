import React from 'react'

import { Link } from 'react-router-dom'

const UserBoards = ({ boards }) => {
    return (
        <div>
            {boards && boards.length === 0 && <h4>No boards</h4>}
            {boards &&
                boards.map((board) => (
                    <Link to={`/boards/${board._id}`} key={board._id}>
                        <h4>{board.listName}</h4>
                    </Link>
                ))}
        </div>
    )
}

export default UserBoards

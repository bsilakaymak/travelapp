import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
    getBoard,
    followBoard,
    unfollowBoard,
    deleteBoard,
} from '../../actions/boards'
import { useParams, useHistory } from 'react-router-dom'
import BoardPlaces from './BoardPlaces'
import { Divider, Button, Icon } from '../shared/Elements'
import Moment from 'react-moment'
import BoardFollowers from './BoardFollowers'
import { Modal } from 'react-responsive-modal'
import EditBoard from './EditBoard'

const BoardDetailsDiv = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    justify-content: center;
    padding: 2%;
`
const OwnerButtonsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const BoardDetails = () => {
    const { boardId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const { board } = useSelector((state) => state.boards)
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    useEffect(() => {
        dispatch(getBoard(boardId))
    }, [dispatch, boardId])
    const isFollowed = (user) => {
        if (board.followers.find((follower) => follower._id === user._id))
            return true
        return false
    }
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    return (
        <BoardDetailsDiv>
            {board && user && (
                <Fragment>
                    <h3>{board.listName}</h3>
                    {board.creator === user._id && (
                        <OwnerButtonsDiv>
                            <Icon
                                color="black"
                                className="fa fa-pencil-square-o"
                                onClick={(e) => setShowEdit(!showEdit)}
                                margin="1rem"
                            />
                            <Modal
                                center
                                open={showEdit}
                                onClose={() => {
                                    setShowEdit(false)
                                }}
                            >
                                <EditBoard />
                            </Modal>
                            <Icon
                                color="black"
                                className="far fa-trash-alt"
                                onClick={(e) => setShowDelete(!showDelete)}
                                margin="1rem"
                            />
                            <Modal
                                center
                                open={showDelete}
                                onClose={() => setShowDelete(false)}
                            >
                                <p>
                                    Are you sure you want to delete this board?
                                </p>
                                <Button
                                    red
                                    small
                                    onClick={() => {
                                        dispatch(deleteBoard(boardId))
                                        setShowDelete(false)
                                        history.push('/boards')
                                    }}
                                >
                                    DELETE
                                </Button>
                                <Button
                                    darkGray
                                    small
                                    onClick={() => setShowDelete(false)}
                                >
                                    Cancel
                                </Button>
                            </Modal>
                        </OwnerButtonsDiv>
                    )}

                    <Divider marginTop="1rem" marginBottom="1rem"></Divider>
                    {isAuthenticated && user && (
                        <>
                            {!isFollowed(user) ? (
                                <Button
                                    small
                                    background="#004C7F"
                                    marginBottom="1rem"
                                    onClick={() => {
                                        dispatch(followBoard(board._id))
                                    }}
                                >
                                    Follow
                                </Button>
                            ) : (
                                <Button
                                    small
                                    background="#004C7F"
                                    marginBottom="1rem"
                                    onClick={() => {
                                        dispatch(unfollowBoard(board._id))
                                    }}
                                >
                                    Unfollow
                                </Button>
                            )}
                        </>
                    )}
                    <span>
                        Created At:{' '}
                        <Moment format="DD-MM-YY">{board.createdAt}</Moment>
                    </span>
                    <p>Description: {board.description}</p>
                    <BoardPlaces
                        places={board.places}
                        boardId={board._id}
                        creator={board.creator}
                    />
                    <BoardFollowers followers={board.followers} />
                </Fragment>
            )}
        </BoardDetailsDiv>
    )
}

export default BoardDetails

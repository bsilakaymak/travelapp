import React, { useState, useEffect } from 'react'
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
import { Divider, Button, Icon, Holder } from '../shared/Elements'
import Moment from 'react-moment'
import BoardFollowers from './BoardFollowers'
import { Modal } from 'react-responsive-modal'
import EditBoard from './EditBoard'

const BoardDetailsContainer = styled.div`
    width: 100%;
    display: flex;
    height: 350px;
    position: relative;
    z-index: 5;
    background-image: url('https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
    &::before {
        content: '';
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
`
const BoardContent = styled.div`
    width: 50%;
    margin: auto;
    border: 1px solid #9c9595;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    @media (max-width: 576px) {
        width: 100%;
    }
`
const IconsContainer = styled.div`
    float: right;
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
        <>
            <Modal
                center
                open={showEdit}
                onClose={() => {
                    setShowEdit(false)
                }}
            >
                <EditBoard />
            </Modal>
            <Modal
                center
                open={showDelete}
                onClose={() => setShowDelete(false)}
            >
                <p>Are you sure you want to delete this board?</p>
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
                <Button darkGray small onClick={() => setShowDelete(false)}>
                    Cancel
                </Button>
            </Modal>
            <BoardDetailsContainer>
                <BoardContent>
                    {board && user && (
                        <>
                            {board.creator === user._id && (
                                <IconsContainer>
                                    <Icon
                                        color="white"
                                        className="fa fa-pencil-square-o"
                                        onClick={(e) => setShowEdit(!showEdit)}
                                        mr="0.5rem"
                                    />
                                    <Icon
                                        color="white"
                                        className="far fa-trash-alt"
                                        onClick={(e) =>
                                            setShowDelete(!showDelete)
                                        }
                                    />
                                </IconsContainer>
                            )}
                            <h3>{board.listName}</h3>
                            <Divider
                                marginTop="1rem"
                                marginBottom="1rem"
                            ></Divider>
                            <Holder>
                                {isAuthenticated && user && (
                                    <Button
                                        small
                                        background="#004C7F"
                                        marginBottom="1rem"
                                        onClick={() => {
                                            dispatch(
                                                !isFollowed(user)
                                                    ? followBoard(board._id)
                                                    : unfollowBoard(board._id)
                                            )
                                        }}
                                    >
                                        {!isFollowed(user)
                                            ? 'Follow'
                                            : 'Unfollow'}
                                    </Button>
                                )}
                                <span>
                                    Created At:{' '}
                                    <Moment format="DD-MM-YY">
                                        {board.createdAt}
                                    </Moment>
                                </span>
                                <p>Description: {board.description}</p>
                            </Holder>
                            <BoardFollowers followers={board.followers} />
                        </>
                    )}
                </BoardContent>
            </BoardDetailsContainer>

            {board && user && (
                <BoardPlaces
                    places={board.places}
                    boardId={board._id}
                    creator={board.creator}
                />
            )}
        </>
    )
}

export default BoardDetails

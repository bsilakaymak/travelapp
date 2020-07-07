import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getBoard, followBoard, unfollowBoard } from '../../actions/boards'
import { useParams } from 'react-router-dom'
import BoardPlaces from './BoardPlaces'
import { Divider, Button } from '../shared/Elements'
import Moment from 'react-moment'

const BoardDetailsDiv = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    justify-content: center;
    padding: 2%;
`

const BoardDetails = () => {
    const { boardId } = useParams()
    const dispatch = useDispatch()
    const { board } = useSelector((state) => state.boards)
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    useEffect(() => {
        dispatch(getBoard(boardId))
    }, [dispatch, boardId])
    const isFollowed = (user) => {
        if (board.followers.find((follower) => follower === user._id))
            return true
        return false
    }
    return (
        <BoardDetailsDiv>
            {board && (
                <Fragment>
                    <h3>{board.listName}</h3>
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
                    <BoardPlaces places={board.places} />
                </Fragment>
            )}
        </BoardDetailsDiv>
    )
}

export default BoardDetails

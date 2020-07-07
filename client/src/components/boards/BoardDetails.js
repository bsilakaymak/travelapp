import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getBoard } from '../../actions/boards'
import { useParams } from 'react-router-dom'
import BoardPlaces from './BoardPlaces'

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
    useEffect(() => {
        dispatch(getBoard(boardId))
    }, [dispatch, boardId])
    return (
        <BoardDetailsDiv>
            {board && (
                <Fragment>
                    <h3>{board.listName}</h3>
                    <p>{board.createdAt}</p>
                    <p>{board.description}</p>
                    <BoardPlaces places={board.places} />
                </Fragment>
            )}
        </BoardDetailsDiv>
    )
}

export default BoardDetails

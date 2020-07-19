import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import styled from 'styled-components'
import ScrollToBottom from 'react-scroll-to-bottom'

import { Input, Form, Label, InputHolder } from '../shared/FormGroup'
import { Card, Title, Icon, Holder, Image, Divider } from '../shared/Elements'
import { useDispatch, useSelector } from 'react-redux'
import {
    addComment,
    deleteComment,
    getComments,
    updateComment,
} from '../../actions/places'

const CommentFormStyled = styled(Form)`
    background: none;
    padding: 10px 20px;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 0.8rem;
    margin-top: 0.8rem;

    @media (min-width: 300px) {
        width: 100%;
    }
`
const Comment = styled.p`
    word-break: break-word;
`
const CommentItemHolder = styled.div`
    background: #eee;
    padding: 0.5rem 0.5rem 0;
`
const CommenterNameHolder = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 5px;
`
const ScrollToBottomStyled = styled(ScrollToBottom)`
    height: 400px;
    width: 100%;
`
const CommentForm = ({ placeId, isAuthenticated, user }) => {
    const { comments } = useSelector((state) => state.places)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [updateMode, setUpdateMode] = useState(null)

    const onSubmitCommentHandler = (e) => {
        e.preventDefault()
        if (Boolean(updateMode)) {
            dispatch(updateComment(updateMode, { comment }))
        } else {
            dispatch(addComment(placeId, { comment }))
        }

        setComment('')
    }
    useEffect(() => {
        dispatch(getComments(placeId))
    }, [dispatch, placeId])

    return (
        <>
            {isAuthenticated && (
                <CommentFormStyled onSubmit={onSubmitCommentHandler}>
                    <InputHolder>
                        <Input
                            borderColor="#244384"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            required
                        />
                        <Label color="#244384">Add comment</Label>
                    </InputHolder>
                </CommentFormStyled>
            )}
            {comments.length > 0 && (
                <ScrollToBottomStyled>
                    {comments !== null &&
                        comments.map(({ _id, createdAt, creator, comment }) => (
                            <CommentItemHolder>
                                <Card
                                    key={_id}
                                    marginTop="0.25rem"
                                    marginBottom="0.25rem"
                                >
                                    <CommenterNameHolder>
                                        <Holder
                                            width="50px"
                                            height="50px"
                                            mt="-10px"
                                            ml="-10px"
                                        >
                                            <Image
                                                src={creator.image}
                                                alt={creator.name}
                                            />
                                        </Holder>

                                        <Title
                                            marginLeft="10px"
                                            marginRight="10px"
                                        >
                                            {creator.name}
                                        </Title>

                                        <span>
                                            <Moment format="h:mm a">
                                                {createdAt}
                                            </Moment>
                                        </span>
                                        <Holder
                                            ml="auto"
                                            direction="inherit"
                                            width="10%"
                                        >
                                            {isAuthenticated &&
                                                creator._id === user._id && (
                                                    <>
                                                        <Icon
                                                            mr="5px"
                                                            className="far fa-trash-alt"
                                                            onClick={() =>
                                                                dispatch(
                                                                    deleteComment(
                                                                        _id
                                                                    )
                                                                )
                                                            }
                                                        ></Icon>
                                                        <Icon
                                                            mr="5px"
                                                            className="far fa-edit"
                                                            onClick={() => {
                                                                setUpdateMode(
                                                                    _id
                                                                )
                                                                setComment(
                                                                    comment
                                                                )
                                                            }}
                                                        ></Icon>
                                                    </>
                                                )}
                                        </Holder>
                                    </CommenterNameHolder>
                                    <Divider
                                        gray
                                        marginTop="0.5rem"
                                        marginBottom="0.5rem"
                                    />
                                    <Comment>{comment}</Comment>
                                </Card>
                            </CommentItemHolder>
                        ))}
                </ScrollToBottomStyled>
            )}
        </>
    )
}

export default CommentForm

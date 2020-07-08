import React, { useState } from 'react'
import Moment from 'react-moment'
import styled from 'styled-components'
import { Input, Form, Label, InputHolder } from '../shared/FormGroup'
import { Card, Title, Icon, Holder } from '../shared/Elements'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteComment } from '../../actions/places'

const CommentFormStyled = styled(Form)`
    background: none;
    padding: 10px 20px;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 0.8rem;
    margin-top: 0.8rem;

    @media (min-width: 576px) {
        width: 100%;
    }
`
const CommentItemHolder = styled.div`
    background: #eee;
    padding: 1.5rem;
`
const CommenterNameHolder = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 5px;
`

const CommentForm = ({ placeId, place }) => {
    const userId = useSelector((state) => state.auth.user._id)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const onSubmitCommentHandler = (e) => {
        e.preventDefault()
        dispatch(addComment(placeId, { text: comment }))
    }

    return (
        <>
            <CommentFormStyled onSubmit={onSubmitCommentHandler}>
                <InputHolder>
                    <Input
                        borderColor="#244384"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        autoComplete="off"
                        required
                    />
                    <Label color="#244384">Add comment</Label>
                </InputHolder>
            </CommentFormStyled>
            {place && place.comments && place.comments.length > 0 && (
                <CommentItemHolder>
                    {place.comments.map((comment) => (
                        <Card
                            key={comment._id}
                            marginTop="0.25rem"
                            marginBottom="0.25rem"
                        >
                            <CommenterNameHolder>
                                <Title marginRight="10px">{comment.user}</Title>
                                <span>
                                    <Moment format="h:mm a">
                                        {comment.createdAt}
                                    </Moment>
                                </span>
                                <Holder
                                    ml="auto"
                                    direction="inherit"
                                    width="10%"
                                >
                                    {comment.creator._id === userId && (
                                        <Icon
                                            mr="5px"
                                            className="far fa-trash-alt"
                                            onClick={() =>
                                                dispatch(
                                                    deleteComment(
                                                        placeId,
                                                        comment._id
                                                    )
                                                )
                                            }
                                        ></Icon>
                                    )}
                                </Holder>
                                {comment.creator && comment.creator.name && (
                                    <div>
                                        <p>by: {comment.creator.name}</p>
                                    </div>
                                )}
                            </CommenterNameHolder>

                            <p>{comment.text}</p>
                        </Card>
                    ))}
                </CommentItemHolder>
            )}
        </>
    )
}

export default CommentForm

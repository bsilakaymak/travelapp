import React, { useState } from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { Input, Form, Label, InputHolder } from '../shared/FormGroup';
import { Card, Title, Icon, Holder } from '../shared/Elements';
import { DUMMY_DATA } from '../../UsersData';

const CommentFormStyled = styled(Form)`
  background: none;
  padding: 10px 20px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.8rem;
  margin-top: 0.8rem;

  @media (min-width: 576px) {
    width: 100%;
  }
`;
const CommentItemHolder = styled.div`
  background: #eee;
  padding: 1.5rem;
`;
const CommenterNameHolder = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
`;

const CommentForm = ({ placeId }) => {
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState([]);

  const onSubmitCommentHandler = (e) => {
    e.preventDefault();

    const place = DUMMY_DATA.filter((place) => place.id === placeId);

    place[0].comments.push({
      commentId: uuid(),
      user: 'test',
      comment,
      createAt: Date.now(),
    });
    setNewComment(place[0].comments);
    setComment('');
  };

  return (
    <>
      <CommentFormStyled onSubmit={onSubmitCommentHandler}>
        <InputHolder>
          <Input
            borderColor='#244384'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            autoComplete='off'
            required
          />
          <Label color='#244384'>Add comment</Label>
        </InputHolder>
      </CommentFormStyled>
      {newComment.length > 0 && (
        <CommentItemHolder>
          {newComment.map((comment) => (
            <Card
              key={comment.commentId}
              marginTop='0.25rem'
              marginBottom='0.25rem'
            >
              <CommenterNameHolder>
                <Title marginRight='10px'>{comment.user}</Title>
                <span>
                  <Moment format='h:mm a'>{comment.createAt}</Moment>
                </span>
                <Holder ml='auto' direction='inherit' width='10%'>
                  <Icon mr='5px' className='far fa-trash-alt'></Icon>
                  <Icon className='far fa-edit'></Icon>
                </Holder>
              </CommenterNameHolder>

              <p>{comment.comment}</p>
            </Card>
          ))}
        </CommentItemHolder>
      )}
    </>
  );
};

export default CommentForm;

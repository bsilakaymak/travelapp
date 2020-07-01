import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../shared/Elements';
const StarRatingHolder = styled.div`
  width: 150px;
  display: inline-block;
`;

const RadioInput = styled.input`
  display: none;
`;

const StarRating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <StarRatingHolder>
      {[...Array(5)].map((start, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <RadioInput
              type='radio'
              name='rating'
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              onChange={props.onChange}
            />
            <Icon
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(ratingValue)}
              className='fas fa-star'
              mr_s='7px'
              size='25px;'
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
            />
          </label>
        );
      })}
    </StarRatingHolder>
  );
};

export default StarRating;

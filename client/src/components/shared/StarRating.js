import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from '../shared/Elements'
const StarRatingHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`
const RatingsCount = styled.span`
    color: gray;
    margin-left: 10px;
    line-height: 1.9;
    font-size: 14px;
`
const RadioInput = styled.input`
    display: none;
`

const StarRating = (props) => {
    const [rating, setRating] = useState(props.count)
    const [hover, setHover] = useState(null)

    return (
        <StarRatingHolder>
            {[...Array(5)].map((start, index) => {
                const ratingValue = index + 1
                return (
                    <label key={index}>
                        <RadioInput
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            onChange={props.onChange}
                        />
                        <Icon
                            value={props.count}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(ratingValue)}
                            className="fas fa-star"
                            mr_s="7px"
                            size="25px;"
                            color={
                                ratingValue <= (hover || rating)
                                    ? '#ffc107'
                                    : '#e4e5e9'
                            }
                        />
                    </label>
                )
            })}
            <RatingsCount>{props.ratings} </RatingsCount>
        </StarRatingHolder>
    )
}

export default StarRating

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Title,
  Holder,
  Image,
  Divider,
  Button,
} from '../shared/Elements';

import StarRating from '../shared/StarRating';
const PlaceItem = ({ place }) => {
  const { title, address, description, image, id } = place;
  const [rating, setRating] = useState(null);
  console.log(rating);
  return (
    <Card marginTop='1rem' marginBottom='1rem'>
      <Title center marginTop='1.5rem' marginBottom='1.5rem'>
        {title}
      </Title>
      <Divider gray marginTop='0.8rem' marginBottom='0.8rem' />
      <Holder>
        <Image src={image} alt='' />
      </Holder>
      <Title center marginTop='1.5rem' marginBottom='1.5rem'>
        {address}
      </Title>
      <p>{description}</p>
      <Divider gray marginTop='0.8rem' marginBottom='0.8rem' />
      <StarRating
        onChange={(e) => {
          setRating(e.target.value);
        }}
      />
      <Link to={`/place/${id}`}>
        <Button right small background='#004C7F' margin='0 0 10px 0'>
          Details
        </Button>
      </Link>
    </Card>
  );
};

export default PlaceItem;
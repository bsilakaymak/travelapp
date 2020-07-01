import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Title,
  Holder,
  Image,
  Divider,
  Button,
} from '../shared/Elements';
import { Container, Row, Grid } from '../shared/GridSystem';
import CommentForm from './CommentForm';
import { DUMMY_DATA } from '../../UsersData';
const PlaceItem = () => {
  const placeId = useParams().placeId;
  const place = DUMMY_DATA.find((place) => place.id.toString() === placeId);
  const { title, address, description, image, id } = place;
  return (
    <Container>
      <Row center>
        <Grid md={6} sm={12} lg={4}>
          <Card marginTop='1rem'>
            <Title center marginTop='1.5rem' marginBottom='1.5rem'>
              {title}
            </Title>
            <Divider gray marginBottom='0.8rem' />
            <Holder>
              <Image src={image} alt='' />
            </Holder>
            <Title center marginTop='1.5rem' marginBottom='1.5rem'>
              {address}
            </Title>
            <p>{description}</p>
            <Divider gray marginTop='0.8rem' marginBottom='0.8rem' />
            <Button small background='#004C7F' margin='0 0 10px 0'>
              Map
            </Button>
          </Card>
          <CommentForm placeId={id} />
        </Grid>
      </Row>
    </Container>
  );
};

export default PlaceItem;

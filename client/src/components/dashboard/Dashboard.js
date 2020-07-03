import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Grid, Row } from '../shared/GridSystem';
import {
  Title,
  Divider,
  Image,
  Holder,
  Button,
  Icon,
} from '../shared/Elements';
import { USER_DUMMY_DATA } from '../../UsersData';
import UserUpdate from './UserUpdate';
const { name, avatar, id, followers, following } = USER_DUMMY_DATA;
const UserInfoContent = styled.div`
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  box-shadow: 0px 1px 5px 0px;
  padding: 1rem;
  margin-top: 2rem;
`;

const Dashboard = () => {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#000b76'
          fillOpacity='1'
          d='M0,224L48,186.7C96,149,192,75,288,58.7C384,43,480,85,576,128C672,171,768,213,864,213.3C960,213,1056,171,1152,133.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        ></path>
      </svg>
      <Container>
        <Row center>
          <Grid md={4}>
            <UserInfoContent>
              <Icon
                color='#fff'
                className='fas fa-user-edit'
                float='right'
                onClick={(e) => setShowEdit(!showEdit)}
              />
              <Holder width='150px' height='150px'>
                <Image src={avatar} alt={name} />
              </Holder>
              <Title marginTop='1rem'>
                <span>Name : </span> {name}
              </Title>
              <Divider width='100%' marginTop='5px' />
              <Title marginTop='1rem'>
                <span>Followers : </span> {followers}
              </Title>
              <Divider width='100%' marginTop='5px' />
              <Title marginTop='1rem'>
                <span>Following : </span> {following}
              </Title>
              <Divider width='100%' marginTop='5px' />
              <Button
                small
                background='#007bff'
                marginTop='1rem'
                marginRight='1rem'
              >
                My Places
              </Button>
              <Button small background='#007bff' marginTop='1rem'>
                My Boards
              </Button>
            </UserInfoContent>
            {showEdit && <UserUpdate />}
          </Grid>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

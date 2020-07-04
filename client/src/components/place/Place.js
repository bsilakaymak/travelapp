import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Grid } from '../shared/GridSystem'
import { Card, Title, Divider, Button, Icon } from '../shared/Elements'
import Checkbox from '../shared/Checkbox'
import { Input, InputHolder, Label } from '../shared/FormGroup'
import PlacesList from './PlacesList'
import { DUMMY_DATA } from '../../UsersData'
const Place = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    return (
        <Container>
            <Row center>
                <Grid lg={4} md={4} center>
                    <Card marginTop="1rem">
                        <Title marginTop="1.5rem " marginBottom="1.5rem">
                            Sorting & search
                        </Title>
                        <Divider gray marginBottom="0.8rem" />
                        <InputHolder>
                            <Input
                                autocomplete="off"
                                required
                                borderColor="#244384"
                            />
                            <Label color="#244384">search places</Label>
                        </InputHolder>

                        <Checkbox label="Test one" htmlFor="one" id="one" />
                        <Checkbox label="Test two" htmlFor="two" id="two" />
                        <Checkbox
                            label="Test three"
                            htmlFor="three"
                            id="three"
                        />
                    </Card>
                </Grid>
                <Grid lg={4} md={8}>
                    {isAuth && (
                        <Link to="/create-place">
                            <Button background="#004C7F" marginTop="0.5rem">
                                <Icon mr="0.25rem" className="fas fa-plus" />
                                Create place
                            </Button>
                        </Link>
                    )}
                    {DUMMY_DATA.map((place) => (
                        <PlacesList place={place} key={place.id} />
                    ))}
                </Grid>
            </Row>
        </Container>
    )
}

export default Place

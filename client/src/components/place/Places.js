import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Grid } from '../shared/GridSystem'
import { Card, Title, Divider, Button, Icon } from '../shared/Elements'
import Checkbox from '../shared/Checkbox'
import { Input, InputHolder, Label } from '../shared/FormGroup'
import PlaceItem from './PlaceItem'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaces } from '../../actions/places'
const Places = () => {
    const [search, setSearch] = useState(null)
    const [tags, setTags] = useState([])
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPlaces(search, tags.join(',')))
    }, [search, tags])


    const places = useSelector((state) => state.places.places)

    const checkboxHandler = (event) => {
        const tagName = event.target.value
        const checked = event.target.checked

        if (checked) {
            setTags((oldTags) => {
                return oldTags.includes(tagName)
                    ? oldTags
                    : [...oldTags, tagName]
            })
        } else {
            setTags((oldTags) => {
                return oldTags.includes(tagName)
                    ? oldTags.filter((tag) => tag !== tagName)
                    : oldTags
            })
        }
    }

    const checkbox = ['Natural', 'Historical', 'Outdoor', 'Touristic'].map(
        (att, i) => {
            return (
                <Checkbox
                    key={i}
                    label={att}
                    htmlFor={att}
                    id={att}
                    value={att}
                    onChange={checkboxHandler}
                />
            )
        }
    )

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
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Label color="#244384">search places</Label>
                        </InputHolder>
                        {checkbox}
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

                    {places !== null && places.length === 0 ? (
                        <Card marginTop="1rem" textAlign="center">
                            No place
                        </Card>
                    ) : (
                        places !== null &&
                        places.map((place) => (
                            <PlaceItem place={place} key={place._id} />
                        ))
                    )}
                </Grid>
            </Row>
        </Container>
    )
}

export default Places

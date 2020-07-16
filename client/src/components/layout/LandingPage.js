import React from 'react'
import styled from 'styled-components'
import { Button, Icon, Holder } from '../shared/Elements'
import { Link } from 'react-router-dom'
import { Container, Grid, Row } from '../shared/GridSystem'
import { useSelector } from 'react-redux'

const Jumbotron = styled.div`
    color: #fff;
    padding: 1.5rem;
    width: 100%;
    display: flex;
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    height: 450px;
`
const JumbotronContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const LandingPageTitle = styled.h1`
    font-size: 2rem;
    font-weight: 450;
    font-family: 'Gothic A1', sans-serif;
    margin-top: 5rem;
    @media (max-width: 576px) {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
`
const Paragraph = styled.p`
    color: ${(props) => props.color};
    font-family: 'Tajawal', sans-serif;
    padding: ${(props) => props.padding};
    font-size: ${(props) => props.fontsize};
`
const TitleTwo = styled.h4`
    padding: ${(props) => props.padding};
`
const LandingPage = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    return (
        <>
            <Jumbotron>
                <Container>
                    <Row>
                        <Grid md={6}>
                            <JumbotronContent>
                                <LandingPageTitle>
                                    The standard Lorem Ipsum passage.
                                </LandingPageTitle>
                                <Paragraph color="#fff">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit,
                                </Paragraph>
                            </JumbotronContent>
                        </Grid>
                        <Grid md={6}>
                            {!isAuthenticated && (
                                <Holder
                                    ml="auto"
                                    md_mt="5rem"
                                    md_width="50%"
                                    mt="0.8rem"
                                >
                                    <Link to="/login">
                                        <Button marginBottom="10px">
                                            <Icon
                                                mr="0.25rem"
                                                className="fas fa-sign-in-alt"
                                            />
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button marginBottom="10px">
                                            <Icon className="far fa-envelope"></Icon>{' '}
                                            Sign Up with Email
                                        </Button>
                                    </Link>
                                    <Link to="/">
                                        <Button marginBottom="10px">
                                            <Icon className="fab fa-facebook"></Icon>{' '}
                                            Facebook
                                        </Button>
                                    </Link>
                                    <Link to="/">
                                        <Button marginBottom="10px" red>
                                            <Icon className="fab fa-google-plus-g"></Icon>{' '}
                                            google
                                        </Button>
                                    </Link>
                                </Holder>
                            )}
                        </Grid>
                    </Row>
                </Container>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#0099ff"
                        fillOpacity="1"
                        d="M0,96L48,122.7C96,149,192,203,288,213.3C384,224,480,192,576,154.7C672,117,768,75,864,80C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </Jumbotron>
            <Container mb="2rem">
                <Row>
                    <Grid md={12} center>
                        <TitleTwo padding="1.5rem">
                            What is Lorem Ipsum?
                        </TitleTwo>
                        <Paragraph padding="1.5rem" fontsize="20px">
                            It is a long established fact that a reader will be
                            distracted by the readable content
                        </Paragraph>
                    </Grid>
                    <Grid md={4} center>
                        <i className="fas fa-plane fa-3x"></i>
                        <TitleTwo padding="2rem">What is Lorem Ipsum?</TitleTwo>
                        <Paragraph>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout.
                        </Paragraph>
                    </Grid>
                    <Grid md={4} center>
                        <i className="fas fa-route fa-3x"></i>
                        <TitleTwo padding="2rem">What is Lorem Ipsum?</TitleTwo>
                        <Paragraph>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout.
                        </Paragraph>
                    </Grid>
                    <Grid md={4} center>
                        <i className="fas fa-globe fa-3x"></i>
                        <TitleTwo padding="2rem">What is Lorem Ipsum?</TitleTwo>
                        <Paragraph>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout.
                        </Paragraph>
                    </Grid>
                </Row>
            </Container>
        </>
    )
}

export default LandingPage

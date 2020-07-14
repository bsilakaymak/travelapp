import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/auth'
const Ul = styled.ul`
    list-style-type: none;
    width: 50%;
    display: flex;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    font-family: cursive;
    justify-content: space-around;
    margin-left: auto;
`
const Menu = styled.nav`
  display: flex;
  width: 100%;
  height: 35px;
  background:#122141;
  position: relative;
  padding: 1.5rem 1rem;
  @media (max-width: 576px) { 
    ${Ul}{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0px;
        top: 48px;
        background:#122141;
        width: 100%;
        visibility: ${(props) => props.show || 'hidden'};
        z-index:5
    }
    }
  }
`
const Link = styled(NavLink)`
    text-decoration: none;
    transition: 0.5 ease-in-out;
    color: ${(props) => props.active || `#fff`};
    &:hover {
        color: #3f51b5;
    }
    margin: -6px;
    @media (max-width: 576px) {
        display: flex;
        justify-content: space-around;
        height: 10vh;
    }
`
const HamburgerButton = styled.i`
    position: absolute;
    right: 20px;
    color: #fff;
    font-size: 1.6rem;
    top: 11px;
    cursor: pointer;
    @media (min-width: 576px) {
        visibility: hidden;
    }
`
const Logo = styled(Link)`
    font-size: 1.2rem;
    font-weight: bold;
    margin: -10px 0 0px 13px;
`
const Navbar = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useLocation()
    function isActive(route) {
        return route === router.pathname
    }
    const [open, toggle] = useState(false)
    return (
        <Menu show={open ? 'visible' : 'hidden'}>
            <Logo to={isAuthenticated ? '#!' : '/'}>Travel App</Logo>
            <HamburgerButton
                onClick={(e) => toggle(!open)}
                className="fas fa-bars"
            ></HamburgerButton>
            <Ul>
                {!isAuthenticated && (
                    <Link active={isActive('/') ? '#3F51B5' : '#fff'} to="/">
                        Home
                    </Link>
                )}
                <Link
                    active={isActive('/places') ? '#3F51B5' : '#fff'}
                    to="/places"
                >
                    Places
                </Link>

                <Link
                    active={isActive('/boards') ? '#3F51B5' : '#fff'}
                    to="/boards"
                >
                    Boards
                </Link>
                {isAuthenticated && (
                    <Link
                        active={isActive('/dashboard') ? '#3F51B5' : '#fff'}
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>
                )}
                {isAuthenticated && (
                    <Link to="#!" onClick={(e) => dispatch(logout())}>
                        Logout
                    </Link>
                )}
            </Ul>
        </Menu>
    )
}

export default Navbar

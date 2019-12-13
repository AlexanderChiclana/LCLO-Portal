import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to='/calendar'>Calendar</Link>
    <Link to='/pinned'>Pinned</Link>
    {/* <Link to="/team_member">Team</Link> */}

    <Link to="/training">Training</Link>
    <Link to="/capacity_building">Capacity Building</Link>
    <Link to="/entrepreneurship">Entrepreneurship</Link>
    <Link to="/points_of_encounter">Points Of Encounter</Link>
    <Link to="/news">News</Link>
    <Link to="/resources">Resources</Link>

    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>LCLO Group Site Portal
    </h1>
    <nav>
      {/* { user && <span>Welcome, {user.email}</span>} */}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header

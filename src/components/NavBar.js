import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <nav>
                <NavLink to='/'  className='nav-link' exact activeClassName="selected">Home</NavLink>
                <NavLink to='/new'  className='nav-link' activeClassName="selected">New Tweet</NavLink>
        </nav>
    )
}

export default NavBar
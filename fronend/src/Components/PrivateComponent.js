import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'

const PrivateComponent = () => {
    const auth = localStorage.getItem('user')
    return  <Outlet /> 
}

export default PrivateComponent

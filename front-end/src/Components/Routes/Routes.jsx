import React from "react"
import { Route } from "react-router-dom"
import AddTeacher from "../Pages/AddTeacher"
import DashBoard from "../Pages/Dashboard"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Navbar from "../NavBar"
import Register from "../Pages/Register"

export default function Routes() {
    return (
        <div>
            <Route path="/" exact>
                <Navbar />
                <Home />
            </Route>
            <Route path="/login">
                <Navbar />
                <Login />
            </Route>
            <Route path="/register">
                <Navbar />
                <Register />
            </Route>
            <Route path="/dashboard">
                <Navbar />
                <DashBoard />
            </Route>
            <Route path="/addteacher">
                <Navbar />
                <AddTeacher />
            </Route>
        </div>
    )
}
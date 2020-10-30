import React from "react"
import { Route } from "react-router-dom"
import AddTeacher from "../Pages/AddTeacher"
import DashBoard from "../Pages/Dashboard"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Register from "../Pages/Register"

export default function Routes() {
    return (
        <div>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/addteacher" component={AddTeacher} />
        </div>
    )
}
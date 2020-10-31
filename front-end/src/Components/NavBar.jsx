import React from "react"
import { Link } from "react-router-dom"
import style from "./style.module.css"

export default function NavBar() {

    const userData = JSON.parse(localStorage.getItem("activeUserDetails")) || []

    const handleOut = () => {
        const obj = {
            active: false,
            obj: {}
        }
        localStorage.setItem("activeUserDetails", JSON.stringify(obj))
    }
    return (
        <div className={`row p-3 ${style.navigation} font-weight-bolder shadow-lg`}>
            <div className="col-12 col-md-8 col-lg-10">
                <Link to="/">SaYoDa</Link>
            </div>
            {
                !userData.active ?
                    <div className="col-12 col-md-4 col-lg-2 row">
                        <div className="col-6 text-center">
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="col-6 text-center">
                            <Link to="/register">Register</Link>
                        </div>
                    </div> :
                    <div className="col-12 col-md-4 col-lg-2 row">
                        <div className="col-6 text-center">
                            <Link to="/dashboard">DashBoard</Link>
                        </div>
                        <div className="col-6 text-center">
                            <Link to="/register" onClick={handleOut}>Logout</Link>
                        </div>
                    </div>
            }

        </div>
    )
}
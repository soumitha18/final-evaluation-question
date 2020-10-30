import React from "react"
import { Link } from "react-router-dom"
import style from "./style.module.css"

export default function NavBar() {
    return (
        <div className={`row p-3 ${style.navigation} font-weight-bolder shadow-lg`}>
            <div className="col-12 col-md-8 col-lg-10">
                <Link to="/">SaYoDa</Link>
            </div>
            <div className="col-6 col-md-2 col-lg-1 text-center">
                <Link to="/login">Login</Link>
            </div>
            <div className="col-6 col-md-2 col-lg-1 text-center">
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}
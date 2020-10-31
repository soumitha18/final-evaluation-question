import React from "react"
import { useState } from "react"
import { Redirect, useHistory } from "react-router"
import style from "../style.module.css"
import axios from "axios"
import { Link } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const history = useHistory()

    const userData = JSON.parse(localStorage.getItem("activeUserDetails")) || []

    const handleSubmit = () => {
        setErr("")
        let obj = { email, password }
        axios.post("http://localhost:5000/login", obj)
            .then(res => {
                const data = {
                    active: true,
                    obj: res.data
                }
                savingData(data);
                history.push("/dashboard")
            })
            .catch(err => setErr(err.response.data))
    }

    const savingData = (data) => {
        localStorage.setItem("activeUserDetails", JSON.stringify(data));
    };

    if (userData.active) {
        return <Redirect to="/dashboard"></Redirect>;
    }

    return (
        <div className="mt-5">
            <h2 className="mt-5 text-center text-info">LOGIN</h2>
            <div className={`${style.login} mt-5`}>
                <div>
                    <label className="sr-only">Email</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <img src="https://www.flaticon.com/svg/static/icons/svg/88/88042.svg" alt="email" width="20px" />
                            </div>
                        </div>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                    </div>
                </div>
                <div className="mt-3">
                    <label className="sr-only">Password</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <img src="https://www.flaticon.com/svg/static/icons/svg/1000/1000966.svg" width="20px" alt="password" />
                            </div>
                        </div>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                    </div>
                </div>
                <button className="my-3 py-2" onClick={handleSubmit}>Login</button>
                <div className="text-center text-danger" >{err}</div>
                <div className="text-center text-small"><small>Create an account <Link to="/register">Here</Link></small></div>
            </div>
        </div>
    )
}
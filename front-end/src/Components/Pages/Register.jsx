import React, { useState } from "react"
import { useHistory } from "react-router"
import style from "../style.module.css"
import axios from "axios"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")

    const history = useHistory()

    const handleSubmit = () => {
        setErr("")
        let obj = { name, email, password }
        axios.post("http://localhost:5000/register", obj)
            .then(res => {
                history.push("/dashboard")
                console.log(res)
            })
            .catch(err => setErr(err.response.data))
    }

    return (
        <div className="mt-5">
            <h2 className="mt-5 text-center">Register</h2>
            <div className={`${style.login} mt-5`}>
                <div>
                    <label className="sr-only">UserName</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <img src="https://www.flaticon.com/svg/static/icons/svg/1077/1077063.svg" alt="Name" width="20px" />
                            </div>
                        </div>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="UserName" />
                    </div>
                </div>
                <div className="mt-3">
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
                <button className="my-3 py-2" onClick={handleSubmit}>Register</button>
                <div className="text-center text-danger" >{err}</div>
            </div>
        </div>
    )
}
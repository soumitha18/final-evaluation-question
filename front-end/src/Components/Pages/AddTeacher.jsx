import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'
import style from "../style.module.css"

export default function AddTeacher() {
    const [classes, setClasses] = useState(0)
    const history = useHistory()
    const [classData, setClassData] = useState([])
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const userData = JSON.parse(localStorage.getItem("activeUserDetails")) || []
    const [age, setAge] = useState(0)

    const handleCancel = () => {
        history.push("/dashboard")
    }

    const handleAdd = (obj) => {
        setClassData([...classData, obj])
        alert("class Added!")
    }

    const handleSubmit = () => {
        let obj = {
            name,
            gender,
            age,
            school_id: userData.obj["_id"],
            classes: [...classData]
        }
        Axios.post("http://localhost:5000/teacher", obj)
            .then(res => {
                alert("Teacher Added to Data Base!")
                history.push("/dashboard")
            })
            .catch(err => console.log(err.response.data))
    }

    const addClasses = () => {
        let getClasses = []
        for (let i = 0; i < classes; i++) {
            getClasses.push(<div key={i}><Classes onSubmit={handleAdd} /></div>)
        }
        return getClasses
    }

    return (
        <div className={`p-5 ${style.form}`}>
            <h3 className="text-center text-info">Add Teachers Here</h3>
            <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Teacher Name" />
            <select value={gender} onChange={e => setGender(e.target.value)} className="form-control">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input className="form-control" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Enter Age" />
            <h5 className="text-info">Classes</h5>
            <Classes onSubmit={handleAdd} />
            {
                addClasses()
            }
            <div className="row">
                <button className="col-4 btn btn-info" onClick={() => setClasses(classes + 1)}>Add More Class</button>
                <button className="col-4 btn btn-success" onClick={handleSubmit}>Add Teacher</button>
                <button className="col-4 btn btn-danger" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

function Classes({ onSubmit, key }) {

    const [grade, setGrade] = useState(0)
    const [section, setSection] = useState("")
    const [subject, setSubject] = useState("")

    const handleAdd = () => {
        let obj = { grade, section, subject }
        onSubmit(obj)
    }

    return (
        <div className={`px-5 ${style.classes}`}>
            <input className="form-control" type="number" value={grade} onChange={e => setGrade(e.target.value)} placeholder="Grade" />
            <input className="form-control" type="text" value={section} onChange={e => setSection(e.target.value)} placeholder="section" />
            <input className="form-control" type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="subject" />
            <button className="btn btn-primary" onClick={handleAdd}>+</button>
        </div>
    )
}


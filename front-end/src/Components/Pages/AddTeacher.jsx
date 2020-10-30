import Axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router'

export default function AddTeacher() {
    const [classes, setClasses] = useState(0)
    const history = useHistory()
    const [classData, setClassData] = useState([])
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState(0)
    const [school_id, setSchool_id] = useState("5f9bc75b14e79841a9d2d8a1")

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
            school_id,
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
        <div>
            <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Teacher Name" />
            <input className="form-control" type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Enter Gender" />
            <input className="form-control" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Enter Age" />
            <Classes onSubmit={handleAdd} />
            {
                addClasses()
            }
            <button onClick={() => setClasses(classes + 1)}>Add More Class</button>
            <button onClick={handleSubmit}>Add Teacher</button>
            <button onClick={handleCancel}>Cancel</button>
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
        <div>
            <input className="form-control" type="number" value={grade} onChange={e => setGrade(e.target.value)} placeholder="Grade" />
            <input className="form-control" type="text" value={section} onChange={e => setSection(e.target.value)} placeholder="section" />
            <input className="form-control" type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="subject" />
            <button onClick={handleAdd}>+</button>
        </div>
    )
}


import React, { useState } from "react"
import style from "../style.module.css"

export default function Teacher({ data, handleDelete, handleEdit, handleBack }) {

    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(data.name)
    const [gender, setGender] = useState(data.gender)
    const [age, setAge] = useState(data.age)
    const classes = data.classes

    const editing = () => {
        const obj = {
            name, gender, age, classes
        }
        console.log(obj)
        handleEdit({ obj })
        handleBack()
    }

    if (edit) {
        return (
            <div>
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

                    <div className="row">
                        <button className="col-4 btn btn-info">Add More Class</button>
                        <button className="col-4 btn btn-success" onClick={() => editing()}>Change</button>
                        <button className="col-4 btn btn-danger" onClick={() => setEdit(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`card ${style.more}`}>
            <div className="card-header">
                <h2>{data.name}'s Information</h2>
            </div>
            <div className="card-body">
                <div className="card-text h5">Gender : <b className="h3">{data.gender}</b></div>
                <div className="card-text h5">Age : <b className="h3">{data.age}</b></div>
                <div className="card-text row">
                    <p className="col-2 h4">Classes : </p>
                    <div className="col-10 text-center">
                        <div className="card pt-3 bg-dark text-light">
                            <div className="row">
                                <p className="col-3">Sl.No</p>
                                <p className="col-3"> Grade</p>
                                <p className="col-3">Section</p>
                                <p className="col-3">Subject</p>
                            </div>
                        </div>
                        {
                            data.classes && data.classes.map((item, i) =>
                                <div key={i} className="card pt-3">
                                    <div className="row">
                                        <p className="col-3">{i + 1}</p>
                                        <p className="col-3">{item.grade}</p>
                                        <p className="col-3">{item.section}</p>
                                        <p className="col-3">{item.subject}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="row m-3 ">
                    <button className="col-4 btn btn-info" onClick={() => setEdit(true)}>Edit</button>
                    <button className="col-4 btn btn-success" onClick={() => handleBack()}>Back</button>
                    <button className="col-4 btn btn-danger" onClick={() => handleDelete(data._id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}
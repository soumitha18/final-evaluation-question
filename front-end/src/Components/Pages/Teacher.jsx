import React, { useState } from "react"
import style from "../style.module.css"

export default function Teacher({ data, handleDelete, handleEdit, handleBack }) {

    const [obj, setObj] = useState(data)
    const [edit, setEdit] = useState(false)

    const editing = () => {
        const obj = {
            _id: "5f9c6decf4dbe141ff0dd0e6",
            classes: [],
            school_id: "5f9bc75b14e79841a9d2d8a1",
            name: "Hari",
            gender: "male",
            age: 20
        }
        handleEdit({ obj })
        handleBack()
    }

    if (edit) {
        return (
            <div>

                <div>
                    <button className="btn btn-danger" onClick={() => setEdit(false)}>Back</button>
                    <button className="btn btn-success" onClick={() => editing()}>Change</button>
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
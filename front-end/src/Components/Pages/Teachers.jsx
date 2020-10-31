import React, { useState } from "react"
import Teacher from "./Teacher"
import style from "../style.module.css"

export default function Students({ data, handleDelete, handleEdit, search, setSearch, handleSearch, page, totalPages, setPage }) {

    const [more, setMore] = useState(false)
    const [obj, setObj] = useState({})

    const handleMore = (obj) => {
        setMore(true)
        setObj(obj)
    }

    if (more) {
        return (
            <Teacher data={obj} handleDelete={handleDelete} handleBack={() => setMore(false)} handleEdit={handleEdit} />
        )
    }

    return (
        <div>
            <div className={`mb-3 ${style.search}`}>
                <label className="sr-only">Password</label>
                <div className="input-group">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="form-control" placeholder="Search Teacher" />
                    <div className="input-group-prepend">
                        <div className="input-group-text" onClick={handleSearch}>
                            <img src="https://www.flaticon.com/svg/static/icons/svg/1086/1086933.svg" width="20px" alt="password" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 row">
                {
                    data && data.map(item => (
                        <div key={item._id} className={`card my-3 ${style.cards}`}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-3 col-lg-2">
                                        {
                                            item.gender === "male" ?
                                                <img className="rounded-circle" src="https://www.flaticon.com/svg/static/icons/svg/2784/2784488.svg" width="100px" alt={item.name} />
                                                :
                                                <img className="rounded-circle" src="https://www.flaticon.com/svg/static/icons/svg/2784/2784518.svg" alt={item.name} width="100px" />
                                        }
                                    </div>
                                    <div className="col-12 col-md-7 col-lg-8">
                                        <h5>{item.name} {
                                            item.gender === "male" ?
                                                <img src="https://www.flaticon.com/svg/static/icons/svg/758/758174.svg" alt="male" width="20px" />
                                                :
                                                <img src="https://www.flaticon.com/svg/static/icons/svg/949/949854.svg" alt="female" width="25px" />
                                        }</h5>
                                        <p className="card-text">Age : <b>{item.age}</b></p>
                                        <p className="card-text">NO. of Classes : <b>{item.classes.length}</b></p>
                                    </div>
                                    <div onClick={() => handleDelete(item._id)} className="col-1">
                                        <img src="https://www.flaticon.com/svg/static/icons/svg/2089/2089743.svg" alt="delete" width="20px" />
                                    </div>
                                    <div onClick={() => handleMore(item)} className="col-1">
                                        <img src="https://www.flaticon.com/svg/static/icons/svg/1828/1828805.svg" alt="moreInfo" width="20px" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${page === 1 ? "disabled" : null}`}>
                        <p className="page-link" tabIndex="-1" aria-disabled="true" onClick={() => setPage(page - 1)}>Previous</p>
                    </li>
                    {
                        totalPages && totalPages.map(item =>
                            <li className={`page-item ${item === page ? "active" : null}`} key={item}>
                                <p className="page-link" onClick={() => setPage(item)}>{item}</p>
                            </li>
                        )
                    }
                    <li className={`page-item ${page === totalPages[totalPages.length - 1] ? "disabled" : null}`}>
                        <p className="page-link" onClick={() => setPage(page + 1)}>Next</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
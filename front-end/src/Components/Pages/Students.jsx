import React from "react"

export default function Students({ data }) {
    return (
        <div className="px-5 row">
            {
                data && data.map(item => (
                    <div key={item._id} className="card my-3" style={{ width: "60%", margin: "0% auto" }}>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
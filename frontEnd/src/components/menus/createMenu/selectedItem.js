import React from 'react'
import "./selectedList.css"

export default function SelectedItem(props) {
    const obj = props.obj
    const deleteSelected = props.deleteSelected

    const deleteItem = (e) => {
        const id = (e.target.id);
        deleteSelected(id)
    }
    // }
    return (
        <li className='d-flex selectedLi align-items-center'>
            {props.bullet && <i className="fa fa- fa-circle me-1" aria-hidden="true"></i>}
            <span className='fw-bold me-1'>{obj?.amount} </span>
            <span >{obj?.measName} </span>
            <span className='me-1 fs-6 fw-bold'>({obj?.totalGrams}גרם)</span>
            <span className='me-1'>"{obj?.prodName}"</span>
            {!props.noX && <span className='ms-auto text-end'><button id={obj?.id} type="button" class="btn-close fs-5 text-dangers" aria-label="Close" onClick={deleteItem}></button></span>}
        </li>
    )
}

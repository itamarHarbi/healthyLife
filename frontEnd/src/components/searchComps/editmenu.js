import { Dropdown } from 'react-bootstrap'
import React from 'react'
import { ApiUrl, apiMethod } from '../../services/apiServices'

export default function Editmenu(props) {
    const deleteItem = async () => {
        try {
            console.log(props);
           await apiMethod(
                `${ApiUrl}/menus/${props._id}`,
                "DELETE"
            )
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>

            <Dropdown>
                <Dropdown.Toggle className='editMenuDots bg-transparent border-0'   >
                    <i className="fa fa-ellipsis-v text-black" aria-hidden="true"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu align={"end"}>
                    <Dropdown.Item onClick={deleteItem}>
                        <i class="fa fa-trash text-danger me-3" aria-hidden="true"></i>
                        מחיקת תפריט
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

import React from 'react'
import { Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function InfoOverlay({ msg, _id }) {
    return (
        <span className='position-absolute '>

            <OverlayTrigger
                placement="bottom"
                variant="light"
                overlay={<Tooltip id={_id}>{msg}</Tooltip>}
            >
                {({ ref, ...triggerHandler }) => (

                    <i
                        ref={ref}
                        class="fa fa-info-circle " aria-hidden="true"
                        {...triggerHandler}

                    />
                )}
            </OverlayTrigger>
        </span>

    )
}

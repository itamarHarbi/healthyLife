import React, { forwardRef } from 'react'

const Child = forwardRef((props, ref) => {
    const { label } = props;
    return (
        <>
            <label>{label}</label> 
            <input ref={ref} />
        </>
    );
});

export default Child

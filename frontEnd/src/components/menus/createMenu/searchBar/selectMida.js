import React, { useContext, useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import { apiGetMida } from '../../../../services/apiServices';
import { CreateMenuDataContext } from '../../../../contexts';

export default function SelectMida(props) {
    const selectRef = useRef()
    const [midot, setMidot] = useState(null)
    const { currentItem, currentMeas, setCurrentMeas} = useContext(CreateMenuDataContext)
    const refrence = useRef();
    refrence.current = currentItem

    useEffect(() => {
        const updateMidot = async () => {

            try {
                let data;
                const code = await refrence.current?.code
                if (code) data = await apiGetMida(code);
                if (refrence.current?.code) {
                    await data.forEach(element => {
                        element.label = <div >{element.name}<span className='fs-6 fw-light ms-1'>({element.grams}גרם)</span></div>
                    });
                    setMidot(data)
                    console.log(data);
                }
                else {
                    setMidot(undefined)
                    setCurrentMeas(null)

                }
            }

            catch (error) {
                console.log(error);
            }

        }
        updateMidot()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentItem])

    const upVal = (e) => {
        // Setting the values for the form
        try {
            setCurrentMeas(e)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={props.class}>
            <Select
                isDisabled={midot ? false : true}
                placeholder={"בחר מידה"}
                isClearable
                ref={selectRef}
                loadingMessage={() => { return "מחפש..." }}
                noOptionsMessage={() => { return "אין מידע" }}
                options={midot}
                id='select-mida'
                isRtl={true}
                required={true}
                onChange={upVal}
                className='h-100'
                value={currentMeas}
            />
        </div>
    )
}

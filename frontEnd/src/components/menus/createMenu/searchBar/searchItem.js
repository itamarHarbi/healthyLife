import { React, useContext } from 'react';
import { ApiUrl } from '../../../../services/apiServices';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import { CreateMenuDataContext } from '../../../../contexts';

const SearchItem = (props) => {
    const { setCurrentItem, currentItem, currentNameRef, setCurrentAmount } = useContext(CreateMenuDataContext)
    const getProductsList = async (e) => {
        const url = ApiUrl + `/menus/create/searchItem?q=${e}`
        const data = (await axios.get(url)).data;

        return await data.map(op => {
            return { code: op.code, label: op.name }
        })
    }


    const upVal = (e) => {
        // Setting the values for the form
        try {
            // setValue("prodName",e.label)
            // setValue("prodCode",e.code)

            if (e) setCurrentItem(e)
            else {
                setCurrentItem(null)
                setCurrentAmount("")
            }
            // console.log(e);

            props.activate()
            // console.log(e);
            // console.log(currentItem);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={props.class}>
            <AsyncSelect
                // onChange={changeSelected}
                placeholder={"בחר מוצר"}
                isClearable
                ref={currentNameRef}
                loadingMessage={() => { return "מחפש..." }}
                noOptionsMessage={() => { return "אין מידע" }}
                loadOptions={getProductsList}
                required={true}
                id='select-item'
                isRtl={true}
                className='h-100'
                onChange={upVal}
                value={currentItem}
            />

        </div>
    );
}

export default SearchItem;
import React, { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CreateMenuDataContext } from '../../../../contexts'

export default function NumInput(props) {
  const { register } = useFormContext()
  const {  currentMeas, currentAmount,setCurrentAmount } = useContext(CreateMenuDataContext)

  const changeVal = (e) => {
    console.log(e.target.value);
    setCurrentAmount(e.target.value)
  }

  return (
    <div className={props.class}>
      <input
       value={currentAmount}
        type='number'
        {...register("amount")}
        required={true}
        placeholder='כמות'
        disabled={currentMeas ? false : true}
        className='w-100 h-100'
        id='select-amount'
        onChange={changeVal}
      >

      </input>

    </div>
  )
}

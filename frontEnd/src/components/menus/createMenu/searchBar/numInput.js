import React, { useContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CreateMenuDataContext } from '../../../../contexts'

export default function NumInput(props) {
  const [inputVal, setInputVal] = useState()
  const { register } = useFormContext()
  // const [dis, setDis] = useState(true)
  const { setCurrentItem, currentItem, currentMeas, setCurrentMeas,currentAmount,setCurrentAmount } = useContext(CreateMenuDataContext)


  const changeVal = (e) => {
    console.log(e.target.value);
    setCurrentAmount(e.target.value)
  }

  // useEffect(() => {
  //   const updateDisable = async () => {
  //     try {
  //       const measurement = await getValues().measCode
  //       if (measurement) {
  //         setDis(false)
  //       }
  //       else {
  //         setDis(true)
  //       }
  //     }

  //     catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   updateDisable()
  // }, [watch("measCode")])

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

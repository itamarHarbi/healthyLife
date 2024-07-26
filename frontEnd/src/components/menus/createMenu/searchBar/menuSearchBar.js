import { React, useContext, useState } from 'react'
import SearchItem from './searchItem'
import { useForm, FormProvider } from 'react-hook-form'
import SelectMida from './selectMida'
import NumInput from './numInput'
import "./createMenuSearchCss.css"
import { CreateMenuDataContext } from '../../../../contexts'

export default function MenuSearchBar() {
    const [isActive, setIsActive] = useState(false)
    const methods = useForm()

    const { arr, setArr,
        currentItem, setCurrentItem,
        currentAmount, setCurrentAmount,
        currentMeas, setCurrentMeas
    } = useContext(CreateMenuDataContext)

    const onSubmit = () => {
        try {
            const i = currentItem
            const m = currentMeas
            console.log(i);
            console.log(m.grams);
            console.log(currentAmount);
            setArr([...arr, {
                prodName: i.label,
                prodCode: i.code,
                measName: m.name,
                measCode: m.code,
                measMultiplier: m.grams,
                amount: currentAmount,
                id: Date.now(),
                totalGrams: (m.grams * currentAmount)
            }])
            setCurrentItem(null)
            setCurrentMeas(null)
            setCurrentAmount("")
        }
        catch (err) {
            console.log(err);
        }
    }



    const activate = async () => {
        const data = await methods.getValues()
        // console.log("sa",data);
        if ('product' in data) {
            if ('code' in data.product) { setIsActive(true); return };
        }
        setIsActive(false);
    }


    return (

        <>
            <FormProvider {...methods}

            >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className='d-flex row addItemRow border  rounded-2  shadow bg-light m-0 p-2'>
                        <SearchItem
                            class={"col-12 col-lg-7 p-0 border border-lg-start z2"}
                            activate={activate}
                        />
                        <SelectMida
                            isDisabled={!isActive}
                            class={"col-9 col-lg-3 p-0"}
                        />
                        <NumInput
                            class={"col-3 col-lg-1 p-1 bg-light"}
                        />

                        <button type='submit' className=' border col-4 col-lg-1 rounded-0 mx-auto text-bold ' >הוספה</button>

                    </div>

                </form>
            </FormProvider>
        </>
    )
}

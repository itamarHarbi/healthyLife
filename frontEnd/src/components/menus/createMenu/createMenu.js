import React, { useContext, useEffect, useRef, useState } from 'react'
import MenuSearchBar from './searchBar/menuSearchBar'
import { CreateMenuDataContext, IsSignedInContext } from '../../../contexts';
import SelectedItem from './selectedItem';
import Table from '../table/table';
import { ApiUrl, MenuTableDataApi, apiMethod } from '../../../services/apiServices';
import headers from "../table/headers.json"
import "./createMenuCss.css"
import { useForm } from 'react-hook-form';
import { validateMenuSchema } from '../../../schemas/menuProdSchema';
import { useNavigate } from 'react-router-dom';

export default function CreateMenu() {
  const { isSignedIn } = useContext(IsSignedInContext)
  // store search bar data
  const [currentItem, setCurrentItem] = useState(undefined);
  const [currentMeas, setCurrentMeas] = useState(null);
  const [currentAmount, setCurrentAmount] = useState("");
  //-------------


  const [arr, setArr] = useState([]);
  const [tableData, setTableData] = useState(undefined);
  const { register, setValue, handleSubmit, formState: {  } } = useForm()
  const currentNameRef = useRef()
  const navigate = useNavigate()

  const getTableData = async (_arr) => {
    try {
      if (Array.isArray(_arr)) {
        const codes = await _arr.map(item => {
          return { code: item.prodCode, grams: item.amount * item.measMultiplier }
        })

        const apiData = await MenuTableDataApi(JSON.stringify(codes))
        const data = {
          headers, prods: apiData
        }
        return data
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loggedIn = () => {
    if (!isSignedIn)
      throw ("")

  }

  const deleteSelected = async (id) => {
    const tempArr = [...arr];
    const index = tempArr.findIndex((item) => item.id == id)
    await tempArr.splice(index, 1)
    setArr(tempArr)

  }
  const onSubmit = async (e) => {
    console.log(e);
    if (arr.length > 0) {

      const valid = validateMenuSchema(e);
      try {
        if (!valid.error) {
          console.log(e);
          try {
            const res = await apiMethod(
              `${ApiUrl}/menus/createMenu`,
              "POST",
              e
            )
            console.log(res);
            navigate(`/menus/post?id=${res.data._id}`)
          }
          catch (error) {
            console.log(error);
          }
        }
        else {
          alert(valid.error)
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alert("לא נבחרו מוצרים")
    }

  }

  useEffect(() => {
    let isCancaled = false
    try {
      setValue("products", arr)
      getTableData(arr).then(
        (res) => {
          if (!isCancaled) {
            if (arr.length > 0) { setTableData(res) }
            else { setTableData(undefined) }
          }
        }
      )

    } catch (error) {
      console.log(error);
    }

    return () => {
      isCancaled = true
    }
  }, [arr])
  loggedIn()

  return (
    <CreateMenuDataContext.Provider
      value={{
        arr, setArr,
        currentItem, setCurrentItem,
        currentNameRef,
        currentMeas, setCurrentMeas,
        currentAmount, setCurrentAmount
      }}>

      <div div className='container main_create_menu'>
        <h1 className='h1 text-decoration-underline mb-4 text-shadow'>יצירת מתכון חדש</h1>
        <div className=' mb-4'>
          <h2 className=''>בחירת מוצרים:</h2>
          <MenuSearchBar />
        </div>

        <div className=' mb-4 p-1'>
          <div className='d-flex   border-bottom-5'>

            <h2 className=' h2 w-auto  pe-3'>מוצרים שנבחרו:</h2>
          </div>
          <ul className='selectedUl'>
            {arr.map(item => {
              console.log(item);
              return <SelectedItem obj={item} deleteSelected={deleteSelected} />
            })}
          </ul>
        </div>
        <div className=' mb-4'>
          <div className='d-flex p-1'>
            <h2 className='h2'> טבלת ערכים:</h2>
          </div>
          {tableData && <Table data={tableData} />}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-5 text-start'>
          <div>
            <input {...register("name", { required: true })} className=' ' placeholder='שם המתכון'></input>
          </div>
          <textarea {...register("menuDescription", { required: true })} className='description' type='' placeholder='הוראות הכנה'></textarea>
          <div className='text-center'>
            <button className='btn btn-outline-dark'>פרסום!</button>
          </div>
        </form>
      </div>
    </CreateMenuDataContext.Provider>
  )
}

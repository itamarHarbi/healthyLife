import React, { useEffect, useState } from 'react'
// import data from '../tData.json'
import "./table.css"
import Scratch from '../createMenu/searchBar/searchItem';


export default function Table({ data }) {
  console.log(data);
  const [sum, setSum] = useState({});

  const getSum = async () => {
    const mergedObj = { shmmitzrach: 'סה"כ' }

    await data.prods.map(async (item) => {

      await Object.keys(item).forEach(key => {

        if (typeof (item[key]) == "number") {
          mergedObj[key] = item[key] + (mergedObj[key] || 0);
        }
      })

    })
    await setSum(mergedObj)
  }
  const isSum = (id) => {
    if (id == 'shmmitzrach') return true
    if (!Object.getOwnPropertyDescriptor(sum, id) || (Object.getOwnPropertyDescriptor(sum, id).value) <= 0) return false
    return true
  }
  useEffect(() => { getSum() }, [data])

  return (
    <>
       <div className='tableWrap overflow-scroll border border-4 p-0'>
        <table className='table table-striped '>

          {/* Generates all headers */}
          <thead style={{ zIndex: "1", position: "sticky", top: "0", right: "0" }}>
            <tr>
              {
                data.headers.map((item) => {

                  if (isSum(item.id)) return <th
                    style={{
                      position: item.id == 'shmmitzrach' ? "sticky" : "",
                      right: item.id == 'shmmitzrach' ? "0" : "", top: item.id == 'shmmitzrach' ? "0" : "",
                    }}
                    className='border border-2 text-center header'>

                    {item.info.label}
                    <span>{item.info.notes != "" && ` (${item.info?.notes.replace("יחידות מידה : ", "")})`}</span>
                  </th>
                })
              }
            </tr>
          </thead>

          <tbody>

            {/* Generates all products*/}
            {
              data.prods.map(i => {
                return <tr>
                  {data.headers.map(item => {
                    if (isSum(item.id)) return <td
                      style={{ position: item.id == 'shmmitzrach' ? "sticky" : "", right: item.id == 'shmmitzrach' ? "0" : "" }}
                      className='border text-center' > <div className=''>{Object.getOwnPropertyDescriptor(i, item.id).value}</div></td>
                  })}
                </tr>
              })
            }

            {/* Generates Sum row */}
            {
              <tr style={{ position: "sticky", bottom: "0", background: "red!important" }} >
                {data.headers.map(item => {
                  if (isSum(item.id)) return <td style={{ whiteSpace: "nowrap",  fontWeight: "bolder", position: item.id == 'shmmitzrach' ? "sticky" : "", right: item.id == 'shmmitzrach' ? "0" : "" }} className='border text-center' > {Object.getOwnPropertyDescriptor(sum, item.id)?.value}</td>
                })}
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}





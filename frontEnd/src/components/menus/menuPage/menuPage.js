import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import "./menuPage.css"
import { useNavigate,  useSearchParams } from 'react-router-dom'
import { apiGet } from '../../../services/apiServices'
import headers from "../table/headers.json"
import Table from '../table/table'

export default function MenuPage() {
    const navigate = useNavigate()

    const [data, setData] = useState(undefined)

    const [searchParams] = useSearchParams()
    const menuId = searchParams.get('id')


    const renderComponent = async () => {
        try {
            const apiData = await apiGet(`menus/post?id=${menuId}`)
            apiData.tableData.headers = headers
            console.log(apiData);
            setData(apiData)
        }
        catch (err) {
            console.log(err);
            navigate("/error")
        }
    }
    useEffect(() => {
        renderComponent()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuId])



    return (



        data && <Container className="bg-white shadow">
            <div className='menuWarper mt-4 p-2'>

                <div className='text-center '>
                    <h1 className='heading ' >{data.menuData.name}</h1>
                    <p className='text-start'>
                        <label className='h5'>תיאור:</label>
                        <br />
                        {data.menuData.menuDescription}
                    </p>

                </div>
                <h3>
                    מצרכים:
                </h3>
                <ul>
                    {
                        data.menuData.products.map(prod => {
                            return <li> {prod.amount} {prod.measName} <span className='font-weight-lighter' style={{ fontSize: '0.8em' }}>({prod.totalGrams} גרם)</span> "{prod.prodName}"</li>
                        })

                    }
                </ul>
                <div>

                </div>
                {/* <div>
                    <h3>שלבי הכנה:</h3>
                    <ul className='text-start fs-2 mt-2'>
                        <li>asda</li>
                        <li>asda</li>
                        <li>asda</li>
                    </ul>
                </div> */}

                <div>
                    <h3>טבלת ערכים:</h3>
                    <div>
                        <Table data={data.tableData} />
                    </div>
                </div>
            </div>
        </Container>


    )
}

import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { getAllHistory } from '../service/allApi';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './History.css'


function History() {
    const [history, setHistory] = useState([])

    const getHistory = async () => {
        // const result=await getAllHistory()
        // console.log(result.data);
        // setHistory(result.data)
        const { data } = await getAllHistory()
        setHistory(data)
    }
    // console.log(history);


    useEffect(() => {
        getHistory()

    }, [])


    return (
        <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center container w-100'>

            <div className='mt-5'>

                <h1 className='text-center mt-5' >Video Watch History</h1>
                <Table striped bordered hover dark >
                    <thead>
                        <tr>
                            <th className='text-success text-center' >#</th>
                            <th className='text-success text-center'>Video Title</th>
                            <th className='text-success text-center' >URL</th>
                            <th className='text-success text-center' >Date</th>
                        </tr>
                    </thead>
                    <tbody >
                        {history.length > 0 ? history.map((i, index) => (
                            <tr>
                                <td className='text-center' >{index + 1}</td>
                                <td className='text-center'>{i?.cardName}</td>
                                <td className='text-center' >{i?.url}</td>
                                <td className='text-center'>{i?.date}</td>
                            </tr>

                        )) :
                            <h1 className='text-center mt-5'>Not Watched Any Videos</h1>

                        }


                    </tbody>
                </Table>

                <Link to={'/home'}>
                    <Button variant="info" className='mt-3 text-center'>Back To Home</Button>
                </Link>

            </div>

        </div>
    )
}

export default History
'use client'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState, useMemo } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from "@mui/icons-material/Edit";

const Membership= () => {
    const router = useRouter();
    const [customerData, setCustomerData] = useState<any[]>([]);
    useEffect(() => {
        axios.get('/api/customers')
            .then((response) => {
                setCustomerData(response.data);
            })
            .catch((error: any) => {
                const errorMessage = error.response ? error.response.data.message : error.message;
                toast.error(errorMessage);
            });
    }, [customerData]);
//   Show Contact

const updateCustomer =(id: any)=>{
    router.push(`/edit/${id}`)
}
    // Call Delete API
    const deleteCustomer = async (id: any) => {
        if (confirm("Do you want to Delete ?") === true) {
            try {
                let response = await fetch(`/api/customers/${id}`, {
                    method: 'DELETE',
                    cache: 'no-cache',
                });
                    toast.success('Customer deleted successfully');
                    router.refresh()
            } catch (error) {
                toast.error('An error occurred while deleting the Customer');
            }
        }
    }
    const columns = useMemo(() => [
        { field: 'firstName', headerName: 'First Name', width: 200 },
        {
            field: 'lastName', headerName: 'Last Name', width: 200,
        },
        {
            field: 'email', headerName: 'Email', width: 200,
        },
        {
            field: 'contact', headerName: 'Contact', width: 200,
        },
        {
            field: 'status', headerName: 'Membership', width: 200,
        },
        {
            field: 'update', headerName: 'Update', width: 130, renderCell: (params: any) => (
              
                <EditIcon style={{cursor:'pointer'}} onClick={() => updateCustomer(params.id)} color='success' fontSize='large' />
            )
        },
        {
            field: 'delete', headerName: 'Delete', width: 130, renderCell: (params: any) => (
              
                <DeleteForeverIcon style={{cursor:'pointer'}}  onClick={() => deleteCustomer(params.id)} color='error' fontSize='large' />
            )
        }
    ], [customerData]);

    return (
        <Container>
            <Row>
                <Col md={12} className='my-3'>
                <Box sx={{ height: '400px', width: '100%' }}>
                    <DataGrid
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                        rows={customerData}
                        columns={columns}
                        getRowId={(row) => row.id}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                </Box>
                </Col>
            </Row>
        </Container>
    );
}

export default Membership;

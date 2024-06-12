
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { Data } from '../model/data.model';
import ALBASA_JSON from "../../assets/json/albasa.json";
import "./table-page.scss";
import { Box, Button, TextField } from '@mui/material';
import { Form } from 'react-bootstrap';
interface Column {
    id: 'isbn' | 'author' | 'title' | 'fees' | 'subject' | 'pub_year' | 'url_link' | 'school' | 'consortium' | 'tranche' | 'eal_account' | 'total_amount' | 'after_discount' | 'remarks';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'isbn', label: 'ISBN', minWidth: 50 },
    { id: 'author', label: 'Author', minWidth: 100 },
    { id: 'title', label: 'Title', minWidth: 450 },
    { id: 'fees', label: 'Fees', minWidth: 100 },
    { id: 'subject', label: 'Subject', minWidth: 100 },
    { id: 'pub_year', label: 'Pub Year', minWidth: 100 },
    { id: 'url_link', label: 'URL Link', minWidth: 100 },
    { id: 'school', label: 'School', minWidth: 100 },
    { id: 'consortium', label: 'Consortium', minWidth: 100 },
    { id: 'tranche', label: 'Tranche', minWidth: 100 },
    { id: 'eal_account', label: 'EAL Account', minWidth: 300 },
    { id: 'total_amount', label: 'Total Amount', minWidth: 300 },
    { id: 'after_discount', label: 'After Agent Discount', minWidth: 300 },
    { id: 'remarks', label: 'Remarks', minWidth: 300 },

];



function createData(
    isbn: number,
    author: string,
    title: string,
    fees: number,
    subject: string,
    pub_year: number,
    url_link: string,
    school: string,
    consortium: string,
    tranche: number,
    eal_account: string,
    total_amount: string,
    after_discount: string,
    remarks: string
): Data {
    return { isbn, author, title, fees, subject, pub_year, url_link, school, consortium, tranche, eal_account, total_amount, after_discount, remarks };
}


const TablePageComponent = ({ nameMod }: any) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [name, setName] = useState(nameMod);
    const [rows, setRows] = useState<Data[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        querySearch(searchQuery);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {

        if (name == "albasa") {
            const rowsdata = new Array();
            ALBASA_JSON.map((item) => {
                const rowItem = item;

                rowsdata.push(createData(item.ISBN, item.Author,
                    item.Title,
                    item["Fees - US$"],
                    item['Subject (Specialized Subject Area)'],
                    item['Pub Year'],
                    item['URL Link'],
                    item.School,
                    item.Consortium,
                    item.Tranche,
                    item['EAL Account'],
                    item['Total Amount'],
                    item['After Agent Discount'],
                    item.Remarks));


            })
            setRows(rowsdata);
        }

    }, [])

    const querySearch = (query) => {

        const rowsdata = new Array();
        ALBASA_JSON.filter((item) => item.Title.includes(query) || item.Author.includes(query) || String(item["ISBN"]).includes(query)).map((item) => {
            const rowItem = item;

            rowsdata.push(createData(item.ISBN, item.Author,
                item.Title,
                item["Fees - US$"],
                item['Subject (Specialized Subject Area)'],
                item['Pub Year'],
                item['URL Link'],
                item.School,
                item.Consortium,
                item.Tranche,
                item['EAL Account'],
                item['Total Amount'],
                item['After Agent Discount'],
                item.Remarks));


        })
        setRows(rowsdata);
    }

    return (

        <div className="table-pages-control">
            <Box
                className='table-search-control'
                component="form"
                sx={{ display: 'flex', alignItems: 'center' }}
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            >
                <Form.Control
                    type="text"
                    placeholder="Search eg, ISBN, Title, Author"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="me-2"
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>
            </Box>


            <Paper style={{ width: '100%' }} className='table-control'>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <TableContainer style={{ width: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead style={{ height: '30px' }}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <div className="table-header-column">
                                            {column.label}</div>


                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.isbn}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align} >
                                                        {
                                                            column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value
                                                        }

                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default TablePageComponent;

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
import IC_CLEAR from '../../assets/assets/images/clear.png';
import IC_SORT_UP from '../../assets/assets/images/caret-up.png';
import IC_SORT_DOWN from '../../assets/assets/images/caret-down.png';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
interface Column {
    id: 'isbn' | 'title' | 'author' | 'subject' | 'pub_year' | 'school' | 'tranche';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'isbn', label: 'ISBN', minWidth: 150 },
    { id: 'title', label: 'Title', minWidth: 350 },
    { id: 'author', label: 'Author', minWidth: 200 },
    { id: 'subject', label: 'Subject', minWidth: 100 },
    { id: 'pub_year', label: 'Pub Year', minWidth: 100 },
    { id: 'school', label: 'School', minWidth: 250 },
    { id: 'tranche', label: 'Tranche', minWidth: 100 },
];



function createData(
    status: string,
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
    return { status, isbn, author, title, fees, subject, pub_year, url_link, school, consortium, tranche, eal_account, total_amount, after_discount, remarks };
}


const TablePageComponent = ({ nameMod }: any) => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentFilter, setCurrentFilter] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [name, setName] = useState(nameMod);
    const [rows, setRows] = useState<Data[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [originalRow, setOriginalRow] = useState<Data[]>([]);
    const [arrayFilter, setArrayFilter] = useState<String[]>([]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        querySearch(searchQuery);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const sortByAuthorAsc = () => {
        const sortedBooks = [...rows].sort((a, b) => a.author.localeCompare(b.author));
        setRows(sortedBooks);
    };

    const sortByAuthorDesc = () => {
        const sortedBooks = [...rows].sort((a, b) => b.author.localeCompare(a.author));
        setRows(sortedBooks);
    };

    const sortBySubjectAsc = () => {
        const sortedBooks = [...rows].sort((a, b) => a.subject.localeCompare(b.subject));
        setRows(sortedBooks);
    };

    const sortBySubjectDesc = () => {
        const sortedBooks = [...rows].sort((a, b) => b.subject.localeCompare(a.subject));
        setRows(sortedBooks);
    };

    const sortByTitleAsc = () => {
        const sortedBooks = [...rows].sort((a, b) => a.title.localeCompare(b.title));
        setRows(sortedBooks);
    };

    const sortByTitleDesc = () => {
        const sortedBooks = [...rows].sort((a, b) => b.title.localeCompare(a.title));
        setRows(sortedBooks);
    };

    const sortByIsbnAsc = () => {
        const sortedBooks = [...rows].sort((a, b) => a.isbn - b.isbn);
        setRows(sortedBooks);
    };

    const sortByIsbnDesc = () => {
        const sortedBooks = [...rows].sort((a, b) => b.isbn - a.isbn);
        setRows(sortedBooks);
    };
    const clickFilter = (column) => {
        if (column == 'author') {
            if (sortOrder == 'asc') {
                sortByAuthorDesc();
                setSortOrder('desc');
                setCurrentFilter(column);
            } else {
                sortByAuthorAsc();
                setSortOrder('asc');
                setCurrentFilter(column);
            }

        } else if (column == 'title') {
            if (sortOrder == 'asc') {
                sortByTitleAsc();
                setSortOrder('desc');
                setCurrentFilter(column);
            } else {
                sortByTitleDesc();
                setSortOrder('asc');
                setCurrentFilter(column);
            }

        } else if (column == 'subject') {
            if (sortOrder == 'asc') {
                sortBySubjectAsc();
                setSortOrder('desc');
                setCurrentFilter(column);
            } else {
                sortBySubjectDesc();
                setSortOrder('asc');
                setCurrentFilter(column);
            }

        } else if (column == 'isbn') {
            if (sortOrder == 'asc') {
                sortByIsbnAsc();
                setSortOrder('desc');
                setCurrentFilter(column);
            } else {
                sortByIsbnDesc();
                setSortOrder('asc');
                setCurrentFilter(column);
            }

        }

    }
    const exportToExcel = (data: any[], filename: string) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, `${filename}.xlsx`);
      };
    const handleFilterSubject = (value: string) => {
        const arryFilter = [...arrayFilter];
        if(arryFilter.filter((item) => item == value).length > 0){

        }else{
            const filtered = [...rows].filter(book => book.subject === value);
            setRows(filtered);
            arryFilter.push(value);
            setArrayFilter(arryFilter)
        }
       
       
    };

    const deleteFilter = (value: string) => {
        setRows(originalRow);
        const arryFilter = [...arrayFilter];
        arryFilter.splice(arryFilter.indexOf(value),1);
        setArrayFilter(arryFilter)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {

        if (name == "albasa") {
            const rowsdata = new Array();
            ALBASA_JSON.map((item) => {
                const rowItem = item;

                rowsdata.push(createData(item.status, item.isbn, item.author,
                    item.title,
                    item.fees,
                    item.subject,
                    item.pub_year,
                    item.url_link,
                    item.school,
                    item.consortium,
                    item.tranche,
                    item.eal_account,
                    item.total_amount,
                    item.after_discount,
                    item.remarks));


            })
            setRows(rowsdata);
            setOriginalRow(rowsdata);
        }

    }, [])

    const querySearch = (query) => {

        const rowsdata = new Array();
        ALBASA_JSON.filter((item) => item.title.includes(query) || item.author.includes(query) || String(item.isbn).includes(query)).map((item) => {
            const rowItem = item;

            rowsdata.push(createData(item.status, item.isbn, item.author,
                item.title,
                item.fees,
                item.subject,
                item.pub_year,
                item.url_link,
                item.school,
                item.consortium,
                item.tranche,
                item.eal_account,
                item.total_amount,
                item.after_discount,
                item.remarks));


        })
        setRows(rowsdata);
    }

    return (

        <div className="table-pages-control">
            {/* <Button className='ml-auto' onClick={() => exportToExcel(rows, 'save')}>Export to Excel</Button> */}
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

            <div className='table-filter-control'>
                {
                    arrayFilter && arrayFilter.map((item) => {

                        return (
                            <div className='table-filter-item'>
                                <span className='table-filter-text'>{item}</span>
                                <img src={IC_CLEAR} className='table-filter-clear-img' onClick={() => deleteFilter(item+"")}></img>
                            </div>
                        )
                    })
                }
            </div>


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
                                        {
                                            column.id == "author" ?
                                                <div className="table-header-column"
                                                    onClick={() => clickFilter(column.id)}>
                                                    {column.label}{
                                                        currentFilter == column.id && sortOrder == 'asc' ?
                                                            <img src={IC_SORT_UP} className='table-header-icon'></img>
                                                            : currentFilter == column.id && sortOrder == 'desc' ? <img src={IC_SORT_DOWN} className='table-header-icon'></img> : <></>
                                                    }</div> :
                                                column.id == "title" ?
                                                    <div className="table-header-column"
                                                        onClick={() => clickFilter(column.id)}>
                                                        {column.label}{
                                                            currentFilter == column.id && sortOrder == 'asc' ?
                                                                <img src={IC_SORT_UP} className='table-header-icon'></img>
                                                                : currentFilter == column.id && sortOrder == 'desc' ? <img src={IC_SORT_DOWN} className='table-header-icon'></img> : <></>
                                                        }</div> :
                                                    column.id == "subject" ?
                                                        <div className="table-header-column"
                                                            onClick={() => clickFilter(column.id)}>
                                                            {column.label}{
                                                                currentFilter == column.id && sortOrder == 'asc' ?
                                                                    <img src={IC_SORT_UP} className='table-header-icon'></img>
                                                                    : currentFilter == column.id && sortOrder == 'desc' ? <img src={IC_SORT_DOWN} className='table-header-icon'></img> : <></>
                                                            }</div> :
                                                        column.id == "isbn" ?
                                                            <div className="table-header-column"
                                                                onClick={() => clickFilter(column.id)}>
                                                                {column.label}{
                                                                    currentFilter == column.id && sortOrder == 'asc' ?
                                                                        <img src={IC_SORT_UP} className='table-header-icon'></img>
                                                                        : currentFilter == column.id && sortOrder == 'desc' ? <img src={IC_SORT_DOWN} className='table-header-icon'></img> : <></>
                                                                }</div> :
                                                            <div className="table-header-column">
                                                                {column.label}</div>
                                        }



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
                                                            column.id == "title" ?
                                                                <div className='table-title-control'>
                                                                    <a href={row.url_link + ""} className='table-link-a' target='_blank'>{value}</a> </div> :
                                                                column.id == 'tranche' ?
                                                                    <div className='d-flex'>
                                                                        <span className='table-tranche-title'>{value}</span> </div> :
                                                                    column.id == 'subject' ?
                                                                        <div className='d-flex'>
                                                                            <span className='table-tranche-title' onClick={() => handleFilterSubject(value + "")}>{value}</span> </div> :
                                                                        column.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : <span className='table-column-title'>{value}</span>
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
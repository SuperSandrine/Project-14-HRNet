import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Autocomplete,
  Box,
  InputAdornment,
  TablePagination,
  TableSortLabel,
  TextField,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { SearchBar1, SearchBar2 } from './EmployeeSearchBar';
import SearchBar from '@mkyy/mui-search-bar';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const columnTitle = [
  { title: 'First Name', data: 'firstName', id: 'AA' },
  { title: 'Last Name', data: 'lastName', id: 'AB' },
  { title: 'Start Date', data: 'startDate', id: 'AC' },
  { title: 'Department', data: 'department', id: 'AD' },
  { title: 'Date of Birth', data: 'birthDate', id: 'AE' },
  { title: 'Street', data: 'streetAddress', id: 'AF' },
  { title: 'City', data: 'cityAddress', id: 'AG' },
  { title: 'State', data: 'stateAddress', id: 'AH' },
  { title: 'Zip Code', data: 'zipCodeAddress', id: 'AI' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const DEFAULT_ORDER = 'asc';
//const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ORDER_BY = 'firstName';
const DEFAULT_ROWS_PER_PAGE = 2;

//_________________________________
//_________________________________
//_________________________________
const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };
  //{ title: 'First Name', data: 'firstName', id: 'AZ' },
  console.log("qu'est ce que orderby", orderBy);
  console.log("qu'est ce que order", order);

  return (
    <TableHead>
      <TableRow>
        {columnTitle.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding="normal"
            //padding={headCell.disablePadding ? 'none' : 'normal'}
            //sortDirection={orderBy === headCell.id ? order : false}
            //sortDirection="asc"
          >
            <TableSortLabel
              active={orderBy === headCell.data}
              direction={orderBy === headCell.data ? order : 'asc'}
              onClick={createSortHandler(headCell.data)}
              hideSortIcon={false}
            >
              {headCell.title}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
              {/* box= button= titre et petite flèche */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
// };

//___________________________________
//___________________________________
//___________________________________
//___________________________________
//___________________________________
const EmployeeTable = (props) => {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [page, setPage] = React.useState(0);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE); // un chiffre qui indique le nb de rows/page
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [searched, setSearched] = React.useState('');

  console.log('voici les props de employee table', props.data);
  const { data } = props;
  const rows = data;

  React.useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, []);
  //console.log('les rows visibles', visibleRows);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage]
  );

  // const handleChangePage = () => {
  //   console.log('je dois changer de page');
  // };

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;

      const newPaddingHeight = 53 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
      //      console.log('ligne vide', numEmptyRows);
    },
    [order, orderBy, rowsPerPage]
  );
  // const handleChangeRowsPerPage = () => {
  //   console.log('je dois changer le nombre de rangs par page');
  // };
  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);
      //console.log('quaije', updatedRowsPerPage); // renvoi le nombre sélectionner en nombre

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy]
  );

  //console.log('visiblerow', visibleRows);
  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const filteredRows = rows.filter((row) => {
      console.log('searchedVal type', typeof searchedVal);
      //return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
      return Object.values(row).some((value) =>
        //typeof value === 'string' &&
        value
          .toString()
          .toLowerCase()
          .includes(searchedVal.toString().toLowerCase())
      );
    });
    setVisibleRows(filteredRows);
  };

  const cancelSearch = () => {
    //e.preventDefault();
    setSearched('');
    requestSearch('');
  };

  return (
    <>
      <TextField
        sx={{ backgroundColor: 'pink' }}
        label="Search bar"
        name="searchBar"
        margin="normal"
        value={searched}
        onChange={(event) => requestSearch(event.target.value)}
        //onCancelSearch={() => cancelSearch()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searched.length > 0 ? (
                <CloseIcon
                  color="secondary"
                  onClick={cancelSearch}
                  sx={{ cursor: 'pointer' }}
                />
              ) : (
                <SearchIcon color="primary" />
              )}
            </InputAdornment>
          ),
        }}
      />
      <SearchBar
        fullwidth
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      {/* <SearchBar2 options={rows} /> */}
      <SearchBar1 options={rows} />
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={rows.map((option) => option.firstName)}
        renderInput={(params) => (
          <TextField {...params} label="search input" type="search" />
        )}
      />
      {/* <Autocomplete
        // autocomplete = normal texte input enhanced with options
        freeSolo //can contain any arbitrary value
        id="free-solo-2-demo"
        disableClearable
        options={rows.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            type="search"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      /> */}
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          {/* <TableHead>
            <TableRow>
              {columnTitle.map((column) => (
                <TableCell key={column.title}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead> */}

          <TableBody>
            {visibleRows
              ? visibleRows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.firstName + row.id}
                    </TableCell>
                    {/* j'enlève le premier index puisqu'il est traité avant avec la méthode slice */}
                    {columnTitle.slice(1).map((column) => (
                      <TableCell key={column.id + row.id}>
                        {/* {console.log('column', row)} */}
                        {/* {console.log('column', row[column.data])} */}
                        {/* je ne suis pas sûre que la ternaire soit utile, à tester */}
                        {row[column.data]}
                        {/* TOUN = je ne suis pas sure du fonctionnement de cet appel */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
            {/* la ternaire gère lorsque le tableau est vide à ne pas créer d'erreur */}
            {paddingHeight > 0 && (
              <TableRow
                style={{
                  height: paddingHeight,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 50]}
        component="div"
        //count={rows.length}
        count={rows ? rows.length : 0}
        //TOUN qu'est ce qu'on affiche, les row visible ou all rows?
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default EmployeeTable;

// OK = TODO récupérer les data de la fonction précédente, et les ajouter au tableau current employee
// const EmployeeTable = () => {
//   return (
//     <TableContainer component={Paper} elevation={3}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             {columnTitle.map((column) => (
//               <TableCell key={column.title}>{column.title}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.firstName}
//               </TableCell>
//               {/* j'enlève le premier index puisqu'il est traité avant avec la méthode slice */}
//               {
//                 (console.log(columnTitle.slice(1)),
//                 columnTitle.slice(1).map((column) => (
//                   <TableCell key={column.data}>
//                     {/* je ne suis pas sûre que la ternaire soit utile, à tester */}
//                     {row[column.data] ? row[column.data] : ''}
//                   </TableCell>
//                 )))
//               }
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination rowsPerPageOptions={[10, 50]} />
//     </TableContainer>
//   );
// };

// export default EmployeeTable;

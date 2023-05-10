import { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getComparator, stableSort } from '../../utils/functions';
import { columnTitle } from './EmployeeTableData';
import { EnhancedTableHead } from './EnhancedTableHead';
import { EmployeeTablePagination } from './EmployeeTablePagination';

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'firstName';
const DEFAULT_ROWS_PER_PAGE = 5;

const EmployeeTable = (props) => {
  const [order, setOrder] = useState(DEFAULT_ORDER); // default: asc
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY); // by default: firstname
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE); // un chiffre qui indique le nb de rows/page
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [searched, setSearched] = useState('');
  const [filtered, setFiltered] = useState({});

  const { data } = props;
  const rows = data;

  useEffect(() => {
    let rowsOnMount = stableSort(
      !filtered[0] ? rows : filtered,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );
    setVisibleRows(rowsOnMount);
  }, []);

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
      const sortedRows = stableSort(
        !filtered[0] ? rows : filtered,
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

  const handleChangePage = useCallback(
    (event, newPage) => {
      console.log('event et newPage', event, 'et', newPage);
      setPage(newPage);

      const sortedRows = stableSort(
        !filtered[0] ? rows : filtered,
        //arrayPage,
        getComparator(order, orderBy)
      );
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0
          ? Math.max(
              0,
              (1 + newPage) * rowsPerPage -
                (!filtered[0] ? rows.length : filtered.length)
            )
          : 0;

      const newPaddingHeight = 53 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, rowsPerPage, filtered, rows]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);
      setPage(0);
      const sortedRows = stableSort(
        !filtered[0] ? rows : filtered,
        getComparator(order, orderBy)
      );
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );
      setVisibleRows(updatedRows);
      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy, filtered, rows]
  );

  const requestSearch = (searchedVal) => {
    setSearched(searchedVal);
    const filteredRows = rows.filter((row) => {
      return Object.values(row).some((value) =>
        value
          .toString()
          .toLowerCase()
          .includes(searchedVal.toString().toLowerCase())
      );
    });
    setFiltered(filteredRows);
    const updatedRows = filteredRows.slice(
      0 * rowsPerPage,
      0 * rowsPerPage + rowsPerPage
    );
    setVisibleRows(updatedRows);
    setPage(0);
  };

  const cancelSearch = () => {
    requestSearch('');
    setPaddingHeight(0);
  };

  return (
    <>
      <TextField
        sx={{ display: 'flex' }}
        label="Search bar"
        name="searchBar"
        margin="normal"
        value={searched}
        onChange={(event) => requestSearch(event.target.value)}
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
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {visibleRows
              ? visibleRows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.firstName + row.id}
                      {/* TODO= rajouter une condition, genre on concatène l'id s'il n'ya pas de prénom */}
                    </TableCell>
                    {/* j'enlève le premier index puisqu'il est traité avant avec la méthode slice */}
                    {columnTitle.slice(1).map((column) => (
                      <TableCell key={column.id + row.id}>
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
      {
        //rows.length > 0 &&
        searched.length == 0 ? (
          <EmployeeTablePagination
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChangeFcn={handleChangePage}
            onRowsPerPageChangeFcn={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `Displaying ${from} to ${to} of ${count} entries`
            }
          />
        ) : null
      }{' '}
      {searched.length > 0 ? (
        <EmployeeTablePagination
          rows={filtered}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChangeFcn={handleChangePage}
          onRowsPerPageChangeFcn={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `Displaying ${from} to ${to} of ${count} entries (filtered from ${rows.length} total entries)`
          }
        />
      ) : null}{' '}
    </>
  );
};

export default EmployeeTable;

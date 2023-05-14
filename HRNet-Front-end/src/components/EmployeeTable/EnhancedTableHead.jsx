import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { columnTitle } from './EmployeeTableData';

export const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {columnTitle.map((headCell) => (
          <TableCell key={headCell.id} padding="normal">
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
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

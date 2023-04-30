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
  //console.log("qu'est ce que orderby", orderBy);
  //console.log("qu'est ce que order", order);

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

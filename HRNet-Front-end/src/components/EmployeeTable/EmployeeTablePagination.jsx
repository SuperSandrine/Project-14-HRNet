import { TablePagination } from '@mui/material';
import { TablePaginationActions } from './EmployeeTablePaginationActions';

export const EmployeeTablePagination = (props) => {
  const {
    rows,
    rowsPerPage,
    page,
    onPageChangeFcn,
    onRowsPerPageChangeFcn,
    labelDisplayedRows,
  } = props;

  return (
    <>
      <TablePagination
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '&> div': {
            display: 'flex',
            flexDirection: { xs: 'unset', md: 'row' },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: 'center',
            paddingLeft: { xs: '0' },
            margin: { xs: '0' },
            '&> div': {
              margin: { xs: '0' },
              '&> .css-194a1fa-MuiSelect-select-MuiInputBase-input ': {
                backgroundColor: '#1976d2',
                borderRadius: '5px',
                color: 'white',
                padding: 0,
                paddingLeft: '3px',
                paddingRight: '3px',
                height: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '3px',
                marginRight: '3px',
              },
              '&> svg': {
                color: 'white',
                padding: 0,
              },
            },
            '& .MuiTablePagination-actions': {
              margin: { xs: '0' },
            },
          },
          '& p': {
            wordBreak: 'break-word',
            maxWidth: '100%',
          },
        }}
        rowsPerPageOptions={[2, 5, 10, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChangeFcn}
        onRowsPerPageChange={onRowsPerPageChangeFcn}
        labelDisplayedRows={labelDisplayedRows}
        ActionsComponent={TablePaginationActions}
      ></TablePagination>
    </>
  );
};

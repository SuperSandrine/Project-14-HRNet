import { TablePagination } from '@mui/material';

export const EmployeeTablePagination = (props) => {
  console.log('*********** props table pagination', props);
  const {
    rows,
    rowsPerPage,
    page,
    onPageChangeFcn,
    onRowsPerPageChangeFcn,
    labelDisplayedRows,
  } = props;

  return (
    <TablePagination
      sx={{
        display: 'flex',
        justifyContent: 'center',
        '&> div': {
          display: 'flex',
          flexDirection: { xs: 'unset', sm: 'row' },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          justifyContent: 'center',
          paddingLeft: { xs: '0' },
          margin: { xs: '0' },
          '&> div': {
            margin: { xs: '0' },
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
      //count={rows.length}
      count={rows.length}
      //TOUN qu'est ce qu'on affiche, les row visible ou all rows?
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChangeFcn}
      onRowsPerPageChange={onRowsPerPageChangeFcn}
      labelDisplayedRows={labelDisplayedRows}
    />
  );
};

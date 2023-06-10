import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import {styled} from '@mui/material/styles';
import {STATUS} from '../../../type/common';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f8f8f9',
    color: theme.palette.common.black,
    padding: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: theme.typography.body1,
    height: 50,
  },
}));

export interface IMenu {
  label: string;
  action: (data: any) => void;
  hidden?: boolean;
}

export interface IRowTitle {
  label: string;
  minWidth: number;
  hidden?: boolean;
}

export interface ITabelData {
  data: any[];
  menu: IMenu[];
  rowTitle: IRowTitle[];
  currentPage: number;
  onChangePage: (event: any, newPage: number) => void;
  totalItem: number;
  renderData?: (data: any) => React.ReactNode;
  handleSelectItem: (data: any) => void;
  showStatus?: boolean;
  showAction?: boolean;
}

export default function TabelData({
  data,
  menu,
  rowTitle,
  currentPage,
  onChangePage,
  totalItem,
  renderData,
  handleSelectItem,
  showStatus = true,
  showAction = true,
}: ITabelData) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [item, setItem] = React.useState<any>();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, data: any) => {
    setAnchorEl(event.currentTarget);
    setItem(data);
    handleSelectItem(data);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderStatus = (status: boolean) => {
    if (status) return <div style={{color: '#6BA80C'}}>Active</div>;
    return <div style={{color: '#F74340'}}>Inactive</div>;
  };

  return (
    <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{height: `calc(100vh - 254px)`}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {rowTitle
                ?.filter(data => !data.hidden)
                ?.map(data => (
                  <StyledTableCell
                    align={'center'}
                    style={{color: 'gray', minWidth: data.minWidth}}>
                    {data.label}
                  </StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data, index) => {
              return (
                <TableRow
                  key={data.id}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={data.id}>
                  <StyledTableCell align={'center'}>
                    {index + 1}
                  </StyledTableCell>
                  {renderData?.(data) || (
                    <>
                      <StyledTableCell align={'center'}>
                        <img src={data.image} width={50} height={50} />
                      </StyledTableCell>
                      <StyledTableCell align={'center'}>
                        {data.name}
                      </StyledTableCell>
                      <StyledTableCell align={'center'}>
                        {data.price}
                      </StyledTableCell>
                    </>
                  )}
                  {data?.status !== undefined && showStatus && (
                    <StyledTableCell align={'center'}>
                      {renderStatus(data?.status)}
                    </StyledTableCell>
                  )}
                  {showAction && (
                    <StyledTableCell>
                      <IconButton
                        id="demo-positioned-button"
                        aria-controls={
                          open ? 'demo-positioned-menu' : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={e => {
                          handleClick(e, data);
                        }}>
                        <MoreVertIcon />
                      </IconButton>
                    </StyledTableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={totalItem}
        rowsPerPage={20}
        page={currentPage}
        onPageChange={onChangePage}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        {menu
          ?.filter(data => !data.hidden)
          ?.map(data => (
            <MenuItem
              onClick={() => {
                data.action(item);
                handleClose();
              }}>
              {data.label}
            </MenuItem>
          ))}
      </Menu>
    </Paper>
  );
}

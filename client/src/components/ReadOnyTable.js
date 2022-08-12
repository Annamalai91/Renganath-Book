import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ReadActionCell = ({ deleteBill, id, setEditBill, role }) => {
  let path = role !== "admin" ? "#" : "/";

  return (
    <div className={"actions"}>
      <Link
        to="/"
        className="edit-icon"
        onClick={() => setEditBill(id)}
        tabIndex={0}
      >
        {role === "admin" ? <EditIcon /> : <PrintIcon />}
      </Link>
      {role === "admin" ? (
        <div
          className="delete-icon"
          disabled={role !== "admin" ? true : false}
          onClick={() => deleteBill(id)}
          tabIndex={0}
          style={{ pointerEvents: role !== "admin" ? "none" : "" }}
        >
          <DeleteIcon />
        </div>
      ) : null}
    </div>
  );
};

export const StatusPill = ({ label }) => {
  let pill = "blue";
  if (label === "Sales" || label === "Payments") {
    pill = "red";
  }
  const pillStyle = "status-pill " + pill;

  return <div className={pillStyle}>{label}</div>;
};

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells, billTableColumnsPrint } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <></>
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

function EnhancedTableHeadPrint(props) {
  const { order, orderBy, onRequestSort, billTableColumnsPrint } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <></>
        </StyledTableCell>
        {billTableColumnsPrint.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({
  handlePrintMain,
  length,
  openingBalance,
  openingBalanceType,
  report,
}) => {
  const balanceStyle = openingBalanceType === "debit" ? "red" : "blue";

  return (
    <Toolbar>
      <Typography variant="h6" id="tableTitle" component="div">
        Total Bills : {length}
      </Typography>
      <div
        style={{ display: "flex", width: "fit-content", marginLeft: "auto" }}
      >
        {report === "Customer Report" && openingBalanceType ? (
          <Typography
            sx={{
              marginRight: "15px",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
            }}
            variant="h7"
            id="tableTitle"
            component="div"
            align="right"
          >
            Opening Balance :
            <span style={{ color: balanceStyle, marginLeft: "2px" }}>
              {Math.abs(openingBalance)}
            </span>
            <span style={{ marginLeft: "5px" }}>
              {openingBalanceType === "debit" ? " DR" : " CR"}
            </span>
          </Typography>
        ) : null}
        <Typography variant="h6" id="tableTitle" component="div" align="right">
          <button
            className="btn print noPrint"
            onClick={(e) => handlePrintMain(e)}
          >
            Print
          </button>
        </Typography>
      </div>
    </Toolbar>
  );
};

const ReadOnlyTable = ({
  headCells,
  rows,
  deleteBill,
  setEditBill,
  handlePrintMain,
  billTableColumnsPrint,
  role,
  openingBalance,
  openingBalanceType,
  report,
  closingBalance,
  closingBalanceType,
}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const balanceStyle = closingBalanceType === "debit" ? "red" : "blue";

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Box className="noPrint" sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            length={rows.length}
            handlePrintMain={handlePrintMain}
            openingBalance={openingBalance}
            openingBalanceType={openingBalanceType}
            report={report}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                        key={row.id}
                      >
                        <StyledTableCell padding="checkbox"></StyledTableCell>
                        <StyledTableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.billDate}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.customerName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <StatusPill label={row.billType}></StatusPill>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.voucher}
                        </StyledTableCell>
                        {report === "Customer Report" ? null : (
                          <>
                            <StyledTableCell align="center">
                              {row.phone}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.customerCity}
                            </StyledTableCell>
                          </>
                        )}

                        <StyledTableCell align="center">
                          {row.debit}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.credit}
                        </StyledTableCell>
                        {report === "Customer Report" ? null : (
                          <StyledTableCell align="center">
                            {row.sysDate}
                          </StyledTableCell>
                        )}
                        {role === "admin" && report !== "Customer Report" ? (
                          <StyledTableCell align="center">
                            {row.billStatus}
                          </StyledTableCell>
                        ) : null}
                        {role === "admin" && report !== "Customer Report" ? (
                          <StyledTableCell align="center">
                            {row.createdBy.email}
                          </StyledTableCell>
                        ) : null}
                        {report === "Search Entry" ? (
                          <StyledTableCell align="center">
                            <ReadActionCell
                              deleteBill={deleteBill}
                              id={row.id}
                              setEditBill={setEditBill}
                              role={role}
                            />
                          </StyledTableCell>
                        ) : null}
                      </StyledTableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <StyledTableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {report === "Customer Report" && closingBalanceType ? (
              <Typography
                sx={{
                  marginRight: "90px",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
                variant="h7"
                id="tableTitle"
                component="div"
                align="right"
              >
                Closing Balance :
                <span style={{ color: balanceStyle, marginLeft: "2px" }}>
                  {closingBalance}
                </span>
                <span style={{ marginLeft: "5px" }}>
                  {closingBalanceType === "debit" ? " DR" : " CR"}
                </span>
              </Typography>
            ) : null}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Paper>
      </Box>
      <div className="printPage">
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2, padding: "10px" }}>
            <EnhancedTableToolbar
              length={rows.length}
              handlePrintMain={handlePrintMain}
            />
            <TableContainer sx={{ overflow: "hidden" }}>
              <Table aria-labelledby="tableTitle" size="medium">
                <EnhancedTableHeadPrint
                  billTableColumnsPrint={billTableColumnsPrint}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy)).map(
                    (row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <StyledTableRow
                          hover
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                          key={row.id}
                        >
                          <StyledTableCell padding="checkbox"></StyledTableCell>
                          <StyledTableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.billDate}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {row.customerName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <StatusPill label={row.billType}></StatusPill>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.voucher}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.customerCity}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.debit}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.credit}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {row.sysDate}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                  )}
                  {emptyRows > 0 && (
                    <StyledTableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <StyledTableCell colSpan={6} />
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default ReadOnlyTable;

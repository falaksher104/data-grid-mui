import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridPagination,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGridApiRef } from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export default function App() {
  const apiRef = useGridApiRef();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRowsPerPageChange = (event) => {
    const newPageSize = event.target.value;
    setRowsPerPage(newPageSize);
    apiRef.current.setPageSize(newPageSize);
  };
  const Next = () => {
    return <>Next</>;
  };
  const Previous = () => {
    return <>Prev</>;
  };

  const RowsPerPageSelector = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontWeight: "bold", fontSize: "20px" }}>
        {" "}
        Rows per page:
      </span>
      <Box sx={{ minWidth: 40 }}>
        <FormControl fullWidth>
          <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
            {[5, 10, 25, 50, 100].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
  const CustomToolbar = () => (
    <GridToolbarContainer
      sx={{ display: " flex", justifyContent: "space-between" }}
    >
      <div>
        <RowsPerPageSelector />
      </div>
      <div>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </div>
    </GridToolbarContainer>
  );
  function Pagination({ page, onPageChange, className }) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <MuiPagination
        color="primary"
        className={className}
        count={pageCount}
        page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event, newPage - 1);
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: Previous, next: Next }}
            {...item}
          />
        )}
      />
    );
  }

  Pagination.propTypes = {
    className: PropTypes.string,
    /**
     * Callback fired when the page is changed.
     *
     * @param {React.MouseEvent<HTMLButtonElement> | null} event The event source of the callback.
     * @param {number} page The page selected.
     */
    onPageChange: PropTypes.func.isRequired,
    /**
     * The zero-based index of the current page.
     */
    page: PropTypes.number.isRequired,
  };

  function CustomPagination(props) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
  }

  return (
    <div style={{ width: "100%" }} className="peopleSearch">
      <DataGrid
        rows={[
          { id: 1, col1: "Hello", col2: "World" },
          { id: 2, col1: "Hello", col2: "World" },
          { id: 3, col1: "Hello", col2: "World" },
          { id: 4, col1: "Hello", col2: "World" },
          { id: 5, col1: "Hello", col2: "World" },
          { id: 6, col1: "Hello", col2: "World" },
          { id: 7, col1: "Hello", col2: "World" },
          { id: 8, col1: "Hello", col2: "World" },
          { id: 9, col1: "Hello", col2: "World" },
          { id: 10, col1: "Hello", col2: "World" },
          { id: 11, col1: "Hello", col2: "World" },
          { id: 12, col1: "Hello", col2: "World" },
          { id: 13, col1: "Hello", col2: "World" },
          { id: 14, col1: "Hello", col2: "World" },
          { id: 15, col1: "Hello", col2: "World" },
          { id: 16, col1: "Hello", col2: "World" },
          { id: 17, col1: "Hello", col2: "World" },
          { id: 18, col1: "Hello", col2: "World" },
          { id: 19, col1: "Hello", col2: "World" },
          { id: 20, col1: "Hello", col2: "World" },
          { id: 21, col1: "Hello", col2: "World" },
          { id: 22, col1: "Hello", col2: "World" },
        ]}
        columns={[
          { field: "id", headerName: "id " },
          { field: "col1", headerName: "Column 1" },
          { field: "col2", headerName: "Column 2" },
        ]}
        pageSize={rowsPerPage}
        components={{
          Toolbar: CustomToolbar,
          pagination: CustomPagination,
        }}
        apiRef={apiRef}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        checkboxSelection
      />
    </div>
  );
}

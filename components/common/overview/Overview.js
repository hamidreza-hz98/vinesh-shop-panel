"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDialogs } from "@/hooks/useDialogs/useDialogs";
import PageContainer from "../PageContainer";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const INITIAL_PAGE_SIZE = 10;

export default function Overview({
  title,
  breadcrumbs,
  columns,
  getMany,
  deleteOne,
  createPath = "create",
  formMode = "page",
  FormComponent,
  rowActions,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const dialogs = useDialogs();
  const notifications = useNotifications();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerMode, setDrawerMode] = React.useState("create");
  const [selectedRow, setSelectedRow] = React.useState(null);

  const [paginationModel, setPaginationModel] = React.useState({
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 0,
    pageSize: searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : INITIAL_PAGE_SIZE,
  });

  const [filterModel, setFilterModel] = React.useState(
    searchParams.get("filter")
      ? JSON.parse(searchParams.get("filter") ?? "")
      : { items: [] }
  );

  const [sortModel, setSortModel] = React.useState(
    searchParams.get("sort") ? JSON.parse(searchParams.get("sort") ?? "") : []
  );

  const [rowsState, setRowsState] = React.useState({
    rows: [],
    rowCount: 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handlePaginationModelChange = React.useCallback(
    (model) => {
      setPaginationModel(model);

      searchParams.set("page", String(model.page));
      searchParams.set("pageSize", String(model.pageSize));

      const newSearchParamsString = searchParams.toString();

      router.push(
        `${pathname}${newSearchParamsString ? "?" : ""}${newSearchParamsString}`
      );
    },
    [router, pathname, searchParams]
  );

  const handleFilterModelChange = React.useCallback(
    (model) => {
      setFilterModel(model);

      if (
        model.items.length > 0 ||
        (model.quickFilterValues && model.quickFilterValues.length > 0)
      ) {
        searchParams.set("filter", JSON.stringify(model));
      } else {
        searchParams.delete("filter");
      }

      const newSearchParamsString = searchParams.toString();

      router.push(
        `${pathname}${newSearchParamsString ? "?" : ""}${newSearchParamsString}`
      );
    },
    [router, pathname, searchParams]
  );

  const handleSortModelChange = React.useCallback(
    (model) => {
      setSortModel(model);

      if (model.length > 0) {
        searchParams.set("sort", JSON.stringify(model));
      } else {
        searchParams.delete("sort");
      }

      const newSearchParamsString = searchParams.toString();

      router.push(
        `${pathname}${newSearchParamsString ? "?" : ""}${newSearchParamsString}`
      );
    },
    [router, pathname, searchParams]
  );

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const listData = await getMany({
        paginationModel,
        sortModel,
        filterModel,
      });

      setRowsState({
        rows: listData.items,
        rowCount: listData.rowCount,
      });
    } catch (listDataError) {
      setError(listDataError);
    }

    setIsLoading(false);
  }, [getMany, paginationModel, sortModel, filterModel]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = React.useCallback(() => {
    if (!isLoading) {
      loadData();
    }
  }, [isLoading, loadData]);

 const handleRowClick = React.useCallback(
   ({row}) => {
     if (formMode === "drawer") {
       setDrawerMode("edit");
       setSelectedRow(row);
       setDrawerOpen(true);
     } else {
       router.push(`${pathname}/${createPath}/${row.id}`);
     }
   },
   [formMode, router, pathname, createPath]
 );

  const handleCreateClick = React.useCallback(() => {
    if (formMode === "drawer") {
      setDrawerMode("create");
      setSelectedRow(null);
      setDrawerOpen(true);
    } else {
      router.push(`${pathname}/${createPath}`);
    }
  }, [formMode, router, pathname, createPath]);

  // Handle edit
  const handleRowEdit = React.useCallback(
    (row) => () => {
      if (formMode === "drawer") {
        setDrawerMode("edit");
        setSelectedRow(row);
        setDrawerOpen(true);
      } else {
        router.push(`${pathname}/${createPath}/${row.id}`);
      }
    },
    [formMode, router, pathname, createPath]
  );

  const handleRowDelete = React.useCallback(
    (row) => async () => {
      const confirmed = await dialogs.confirm(
        `Do you wish to delete this item?`,
        {
          title: `Delete item?`,
          severity: "error",
          okText: "Delete",
          cancelText: "Cancel",
        }
      );

      if (confirmed) {
        setIsLoading(true);
        try {
          await deleteOne(Number(row.id));

          notifications.show("Item deleted successfully.", {
            severity: "success",
            autoHideDuration: 3000,
          });
          loadData();
        } catch (deleteError) {
          notifications.show(
            `Failed to delete item. Reason: ${deleteError.message}`,
            {
              severity: "error",
              autoHideDuration: 3000,
            }
          );
        }
        setIsLoading(false);
      }
    },
    [dialogs, notifications, loadData, deleteOne]
  );
  const handleSuccess = React.useCallback(() => {
    notifications.show("Operation successful.", {
      severity: "success",
      autoHideDuration: 3000,
    });

    handleDrawerClose();
    loadData();
  }, [loadData, notifications]);

  const initialState = React.useMemo(
    () => ({
      pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
    }),
    []
  );

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedRow(null);
  };

  // Add default actions if not provided
  const dynamicColumns = React.useMemo(() => {
    const actionsColumn = {
      field: "actions",
      type: "actions",
      flex: 1,
      align: "right",
      minWidth: 100,
      getActions: ({ row }) =>
        rowActions
          ? rowActions(row, { handleRowEdit, handleRowDelete })
          : [
              <GridActionsCellItem
                key="edit-item"
                icon={<ModeEditOutlineOutlinedIcon />}
                label="Edit"
                onClick={handleRowEdit(row)}
              />,
              <GridActionsCellItem
                key="delete-item"
                icon={<DeleteOutlinedIcon />}
                label="Delete"
                onClick={handleRowDelete(row)}
              />,
            ],
    };
    // Only add actions column if not present
    const hasActions = columns.some((col) => col.field === "actions");
    return hasActions ? columns : [...columns, actionsColumn];
  }, [columns, handleRowEdit, handleRowDelete, rowActions]);

  return (
    <PageContainer
      title={title}
      breadcrumbs={breadcrumbs || [{ title }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleCreateClick}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        {error ? (
          <Box sx={{ flexGrow: 1 }}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        ) : (
          <DataGrid
            rows={rowsState.rows}
            rowCount={rowsState.rowCount}
            columns={dynamicColumns}
            pagination
            sortingMode="server"
            filterMode="server"
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            filterModel={filterModel}
            onFilterModelChange={handleFilterModelChange}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            loading={isLoading}
            initialState={initialState}
            showToolbar
            pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
            sx={{
              [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                outline: "transparent",
              },
              [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                {
                  outline: "none",
                },
              [`& .${gridClasses.row}:hover`]: {
                cursor: "pointer",
              },
            }}
            slotProps={{
              loadingOverlay: {
                variant: "circular-progress",
                noRowsVariant: "circular-progress",
              },
              baseIconButton: {
                size: "small",
              },
            }}
          />
        )}
      </Box>

      {formMode === "drawer" && FormComponent && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
            sx: {
              zIndex: (theme) => theme.zIndex.modal + 1000,
            },
          }}
          PaperProps={{
            sx: {
              position: "fixed",
              zIndex: (theme) => theme.zIndex.modal + 1000,
              ...(isMobile
                ? { width: "100vw", height: "100vh", maxWidth: "100vw", top: 0 }
                : { width: 400, maxWidth: "100vw", top: 0 }),
            },
          }}
        >
          <Box sx={{ p: 2, height: "100%" }}>
            <FormComponent
              mode={drawerMode}
              data={drawerMode === "edit" ? selectedRow : null}
              onClose={handleDrawerClose}
              onSuccess={handleSuccess}
            />
          </Box>
        </Drawer>
      )}
    </PageContainer>
  );
}

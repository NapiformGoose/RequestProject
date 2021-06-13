import React, { Component } from "react";
import { withStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableToolbar from './TableToolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import regeneratorRuntime, { async } from "regenerator-runtime";
import InfoTableView from "./InfoTableView";
import Mappers from './Services/Mappers'

import meta from './meta';

const styles = theme => ({
    root1: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    root: {
        flexShrink: 0,
    },
    table: {
        minWidth: 500,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});


export class TableView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 10,
            tableCollection: this.props.tableCollection,
            selectedRows: [],
            openCollapseRows: [],
            entityType: this.props.entityType,
            currentAjaxService: this.props.currentAjaxService
        };
    }

    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (props.tableCollection !== state.tableCollection) {
            newState.tableCollection = props.tableCollection
        }
        if (props.entityType !== state.entityType) {
            newState.entityType = props.entityType
        }
        if (props.currentAjaxService !== state.currentAjaxService) {
            newState.currentAjaxService = props.currentAjaxService
        }
        if (newState.tableCollection || newState.entityType || newState.currentAjaxService) {
            return newState;
        }
        return null;
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: +event.target.value, page: 0 })
    };

    handleSelectRowClick(event, row) {
        let newSelected = [];
        const selectedIndex = this.state.selectedRows.map(row => row.id).indexOf(row.id);

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selectedRows, row);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.state.selectedRows.slice(1));
        } else if (selectedIndex === this.state.selectedRows.length - 1) {
            newSelected = newSelected.concat(this.state.selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.state.selectedRows.slice(0, selectedIndex),
                this.state.selectedRows.slice(selectedIndex + 1),
            );
        }
        this.setState({ selectedRows: newSelected })
    }

    handleSetIsOpenCollapse(event, row) {
        let newOpenCollapsed = [];
        const collapsedIndex = this.state.openCollapseRows.map(row => row.id).indexOf(row.id);

        if (collapsedIndex === -1) {
            newOpenCollapsed = newOpenCollapsed.concat(this.state.openCollapseRows, row);
        } else if (collapsedIndex === 0) {
            newOpenCollapsed = newOpenCollapsed.concat(this.state.openCollapseRows.slice(1));
        } else if (collapsedIndex === this.state.openCollapseRows.length - 1) {
            newOpenCollapsed = newOpenCollapsed.concat(this.state.openCollapseRows.slice(0, -1));
        } else if (collapsedIndex > 0) {
            newOpenCollapsed = newOpenCollapsed.concat(
                this.state.openCollapseRows.slice(0, collapsedIndex),
                this.state.openCollapseRows.slice(collapsedIndex + 1),
            );
        }
        this.setState({ openCollapseRows: newOpenCollapsed })
    }

    handleSelectAllClick(event) {
        if (event.target.checked) {
            this.setState({ selectedRows: this.state.tableCollection })
        } else {
            this.setState({ selectedRows: [] })
        }
    }

    isSelected = (id) => this.state.selectedRows.map(row => row.id).indexOf(id) !== -1;
    isOpenCollapse = (id) => this.state.openCollapseRows.map(row => row.id).indexOf(id) !== -1;
    isShowInfoPanel = (entityType) => entityType === meta.entityType.request ? true : false;

    getCurrentColumns() {
        switch (this.state.entityType) {
            case meta.entityType.employee: {
                return meta.empoyeeColumns;
            }
            case meta.entityType.service: {
                return meta.serviceColumns;
            }
            case meta.entityType.request: {
                return meta.requestColumns;
            }
            default:
                return [];
        }
    }

    __getTableHead() {
        return (
            <TableRow>
                <TableCell align='center'>
                    <Checkbox
                        //indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={this.state.selectedRows.length > 0}
                        onChange={this.handleSelectAllClick.bind(this)}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {this.getCurrentColumns().map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>
                ))}
                {this.isShowInfoPanel(this.state.entityType) ? <TableCell /> : null}
            </TableRow>
        );
    }

    __getTableRow(row, classes) {
        const isItemSelected = this.isSelected(row.id);
        const isItemOpenCollapse = this.isOpenCollapse(row.id);
        return (
            <React.Fragment>
                <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    key={row.id}
                    tabIndex={-1}
                    onClick={(event) => this.handleSelectRowClick(event, row)}
                    selected={isItemSelected}
                    className={classes.root1}
                >
                    <TableCell align="center">
                        <Checkbox
                            id={row.id}
                            checked={isItemSelected}
                            onChange={(event) => this.handleSelectRowClick(event, row)}
                        />
                    </TableCell>
                    {this.getCurrentColumns().map((column) => {
                         switch (column.type) {
                            case meta.columnType.text: {
                                return (<TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {row[column.id]}
                                </TableCell>)
                            }
                            case meta.columnType.date: {
                                return (<TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {Mappers.mapDateToClient(row[column.id])}
                                </TableCell>)
                            }
                            case meta.columnType.dropdownList: {
                                return (<TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {meta.requestStatus.filter(status => status.value === row[column.id])[0].title}
                                </TableCell>)
                            }
                        }
                    })}
                    {this.isShowInfoPanel(this.state.entityType) ? <TableCell align="center">
                        <IconButton aria-label="expand row" size="small" onClick={(event) => this.handleSetIsOpenCollapse(event, row)}>
                            {isItemOpenCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell> : null}
                </TableRow>
                {this.isShowInfoPanel(this.state.entityType) ? this.__getInfoPanel(row, isItemOpenCollapse) : null}
            </React.Fragment>
        );
    }

    __getInfoPanel(row, isItemOpenCollapse) {
        let infoTableViews;
        switch (this.state.entityType) {
            case meta.entityType.request: {
                infoTableViews = () => {
                    return (
                        <Box>
                            {/* //хардкодные заголовки вынести в InfoTableView */}
                            <Typography variant="h6" gutterBottom component="div"> Задействованные сотрудники </Typography>
                            <InfoTableView entityType={meta.entityType.employee} tableCollection={row.employees} />
                            <Typography variant="h6" gutterBottom component="div"> Выполняемые работы </Typography>
                            <InfoTableView entityType={meta.entityType.service} tableCollection={row.services} />
                        </Box>
                    );
                }
            }
        }

        return (
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={this.getCurrentColumns().length}>
                    <Collapse in={isItemOpenCollapse} timeout="auto" unmountOnExit>
                        {infoTableViews()}
                    </Collapse>
                </TableCell>
            </TableRow>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <TableToolbar
                    selectedRows={this.state.selectedRows}
                    currentAjaxService={this.state.currentAjaxService}
                    entityType={this.state.entityType}
                />
                <Paper className={classes.root}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                { this.__getTableHead() }
                            </TableHead>
                            <TableBody>
                                { this.state.tableCollection.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => this.__getTableRow(row, classes)) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={this.state.tableCollection.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TableView);

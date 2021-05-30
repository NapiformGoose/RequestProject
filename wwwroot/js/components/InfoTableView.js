import React, { Component } from "react";
import { withStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';

import meta from './meta';

const styles = theme => ({
    root: {
        flexShrink: 0
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


export class InfoTableView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 10,
            tableCollection: this.props.tableCollection,
            entityType: this.props.entityType,
        };
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: +event.target.value, page: 0 })
    };

    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (props.tableCollection !== state.tableCollection) {
            newState.tableCollection = props.tableCollection
        }
        if (props.entityType !== state.entityType) {
            newState.entityType = props.entityType
        }
        if (newState.tableCollection || newState.entityType || newState.currentAjaxService) {
            return newState;
        }
        return null;
    }

    getCurrentColumns() {
        switch (this.state.entityType) {
            case meta.entityType.employee: {
                return meta.empoyeeColumns;
            }
            case meta.entityType.service: {
                return meta.serviceColumns;
            }
            default:
                return [];
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <TableContainer>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    {this.getCurrentColumns().map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.tableCollection.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                                    return (
                                        <TableRow
                                            key={row.id}
                                            tabIndex={-1}
                                        >
                                           {this.getCurrentColumns().map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
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

export default withStyles(styles)(InfoTableView);

import React, { Component } from "react";
import { withStyles, useTheme } from '@material-ui/core/styles';
import regeneratorRuntime, { async } from "regenerator-runtime";
import { AjaxService as Ajax } from './Services/AjaxService';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TransferList from './TransferList';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Container } from "@material-ui/core";
import Mappers from './Services/Mappers'
import meta from './meta';

const styles = theme => ({
    formControl: {
        minWidth: 170,
      },
});

export class CreateAndEditPopupView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            onClose: this.props.onClose,
            submitHandler: this.props.submitHandler,
            currentFunctionType: this.props.functionType,
            mutableRow: this.props.mutableRow,
            entityType: this.props.entityType,
            // allEmployees: [],
            // allServices: []
        };
    }

    async componentDidMount() {
        switch(this.state.entityType) {
            case meta.entityType.request: {
                const employees = await Ajax.Employee.ListAll();
                const services = await Ajax.Service.ListAll();
        
                this.setState({
                    allEmployees: employees,
                    allServices: services
                });
                break;
            }
        }
    }

    __getListData() {
        switch (this.state.entityType) {
            case meta.entityType.request: {

                const getAvailableItems = (allItems, checkedItems) =>  checkedItems.length === 0 ? allItems : allItems?.filter(function(x) { 
                    return !checkedItems.includes( x );
                });
                const getSelectedItems= (checkedItems) => checkedItems.length === 0 ? [] : checkedItems;

                return [
                    {
                        title: 'Работники',
                        availableItems: getAvailableItems(this.state.allEmployees, this.state.mutableRow.employees),
                        selectedItems: getSelectedItems(this.state.mutableRow.employees),
                        entityType: meta.entityType.employee
                    },
                    {
                        title: 'Услуги',
                        availableItems: getAvailableItems(this.state.allServices, this.state.mutableRow.services),
                        selectedItems: getSelectedItems(this.state.mutableRow.services),
                        entityType: meta.entityType.service
                    }
                ];
            }
            default:
                return [];
        }
    }

    __getTransferLists() {
        const collectionList = this.__getListData();
        return collectionList.map(element => {
            if (element.availableItems && element.selectedItems) {
                return <TransferList listData={element} updateMutableRow={this.updateMutableRow.bind(this)} />
            }
        });
    }

    handleClose() {
        this.state.onClose()
    };

    handleChange = (event) => {
        event.preventDefault();
        this.updateMutableRow(event.target.id, event.target.value);
    };

    handleDateChange = (event) => {
        event.preventDefault();
        this.updateMutableRow(event.target.id, Mappers.mapDateToServer(event.target.value));
    };

    handleRequestStatusChange = (event, id) => {
        event.preventDefault();
        this.updateMutableRow(id, event.target.value);
    };

    updateMutableRow(key, value) {
        let newRow = this.state.mutableRow;
        newRow[key] = value;
        this.setState({ mutableRow: newRow });
    }

    handleClick() {
        this.state.submitHandler(this.state.mutableRow)
        this.state.onClose()
    };

    __getTitle() {
        switch (this.state.entityType) {
            case meta.entityType.employee: {
                return 'Добавить нового работника';
            }
            case meta.entityType.service: {
                return 'Добавить новую услугу';
            }
            case meta.entityType.request: {
                return 'Добавить новую заявку';
            }
        }
    }
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

    render() {
        const { classes } = this.props;
        return (
            <Dialog maxWidth="xl"
                open={this.state.isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.__getTitle()}</DialogTitle>
                <Container >
                    <form id="myform">
                        {this.getCurrentColumns().map((column) => {
                            switch (column.type) {
                                case meta.columnType.text: {
                                    return (<TextField
                                        required
                                        id={column.id}
                                        label={column.label}
                                        variant="outlined"
                                        value={this.state.mutableRow[column.id]}
                                        onChange={this.handleChange}
                                    />);
                                }
                                case meta.columnType.date: {
                                    return (<TextField
                                        required
                                        id={column.id}
                                        type='date'
                                        label={column.label}
                                        variant="outlined"
                                        format="MM-dd-yyyy"
                                        value={Mappers.mapDateToClient(this.state.mutableRow[column.id])}
                                        onChange={this.handleDateChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />);
                                }
                                case meta.columnType.dropdownList: {
                                    return (<FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id={column.label}>{column.label}</InputLabel>
                                        <Select
                                            labelId={column.label}
                                            id={column.id}
                                            value={this.state.mutableRow[column.id]}
                                            onChange={(event, id) => this.handleRequestStatusChange(event, column.id)}
                                        >
                                        {/* {<MenuItem value={meta.rs.pending}>{meta.rs.pending}</MenuItem>} */}

                                        {meta.requestStatus.map(status => <MenuItem value={status.value}>{status.title}</MenuItem>)}
                                        </Select>
                                    </FormControl>)
                                }
                            }
                        })
                        }
                        {this.__getTransferLists()}
                    </form>

                </Container>
                <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">Отмена</Button>
                    <Button onClick={this.handleClick.bind(this)} color="primary" form="myform" >Применить</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(CreateAndEditPopupView);

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

import { Container } from "@material-ui/core";
import meta from './meta';

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
            collectionList: [],
        };
    }

    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (props.submitHandler !== state.submitHandler) {
            newState.submitHandler = props.submitHandler
        }
        if (props.currentFunctionType !== state.currentFunctionType) {
            newState.currentFunctionType = props.currentFunctionType
        }
        if (props.mutableRow !== state.mutableRow) {
            newState.mutableRow = props.mutableRow
        }
        if (props.entityType !== state.entityType) {
            newState.entityType = props.entityType
        }

        if (newState.submitHandler || newState.currentFunctionType || newState.mutableRow || newState.entityType) {
            return newState;
        }
        return null;
    }

    async componentDidMount() {
        await this._getTableData();
    }

    __getListData() {
        switch (this.state.entityType) {
            case meta.entityType.employee: {
                
            }
            case meta.entityType.service: {
                return meta.serviceColumns;
            }
            case meta.entityType.request: {
                // const employeeCollection = await Ajax.Employee.ListAll();
                // const serviceCollection = await Ajax.Service.ListAll();
                const collectionList = [
                    {
                        collectionTitle: 'Работники',
                        left: await Ajax.Employee.ListAll(),
                        right: [],
                    },
                    {
                        collectionTitle: 'Услуги',
                        left: await Ajax.Service.ListAll(),
                        right: [],
                    }
                ];
                this.setState({collectionList: collectionList})
            }
            default:
                return [];
        }
    }

    __getLists() {
        let lists;
        this.state.collectionList.forEach(element => {
            lists.push();
    })
}

    handleClose() {
        this.state.onClose()
    };

    handleChange = (event) => {
        event.preventDefault();
        let newRow = this.state.mutableRow;
        newRow[event.target.id] = event.target.value;
        this.setState({ mutableRow: newRow });
    };

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
                                        value={this.state.mutableRow[column.id]}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />);
                                }
                            }
                        })
                        }
                        <TransferList entityType={this.state.entityType} />
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

export default CreateAndEditPopupView;

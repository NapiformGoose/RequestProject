import { Container, Toolbar } from "@material-ui/core";
import React, { Component } from "react";
import regeneratorRuntime, { async } from "regenerator-runtime";
import { AjaxService as Ajax } from './Services/AjaxService';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import meta from './meta';
import CreateAndEditPopupView from './CreateAndEditPopupView';

export class TableToolbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenDialog: false,
            isCreating: true, 
            selectedRows: [],
            submitHandler: null,
            currentFunctionType: '',
            currentAjaxService: this.props.currentAjaxService,
            entityType: this.props.entityType
        };
    }

    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (props.selectedRows !== state.selectedRows) {
            newState.selectedRows = props.selectedRows
        }
        if (props.entityType !== state.entityType) {
            newState.entityType = props.entityType
        }
        if (props.currentAjaxService !== state.currentAjaxService) {
            newState.currentAjaxService = props.currentAjaxService
        }

        if (newState.selectedRows || newState.entityType || newState.currentAjaxService) {
            return newState;
        }
        return null;
    }

    handleClick(functionType) {
        switch(functionType) {
            case meta.functionType.create: {
                this.setState({ 
                    isOpenDialog: true, 
                    currentFunctionType: meta.functionType.create,
                    submitHandler: this.handleAddClick
                });
                break;
            }
            case meta.functionType.edit: {
                this.setState({ 
                    isOpenDialog: true, 
                    currentFunctionType: meta.functionType.edit,
                    submitHandler: this.handleEditClick
                });
                break;

            }
            case meta.functionType.delete: {
                this.handleDeleteClick();
                break;

            }
        }
    }
    
    async handleAddClick(parameters = {}) {
        await this.state.currentAjaxService.Create(parameters);
    }
    
    async handleEditClick(parameters = {}) {
        await this.state.currentAjaxService.Edit(parameters);
    }

    async handleDeleteClick() {
        await this.state.currentAjaxService.Delete(this.state.selectedRows.map(row => row.id));
    }

    onClose() {
        this.setState({ isOpenDialog: false });
    }

    isEditButtonDisabled = () => this.state.selectedRows.length === 1 ? false : true;
    isDeleteButtonDisabled = () => this.state.selectedRows.length > 0 ? false : true;

    getPopupView() {
        if(this.state.isOpenDialog) {
            switch (this.state.entityType) {
                case meta.entityType.employee: {
                    return <CreateAndEditPopupView
                        onClose={this.onClose.bind(this)}
                        functionType={this.state.currentFunctionType}
                        submitHandler={this.state.submitHandler.bind(this)}
                        mutableRow={this.state.selectedRows[0] ?? meta.employeeTemplate}
                        entityType={this.state.entityType}
                    />
                }
                case meta.entityType.service: {
                    return <CreateAndEditPopupView
                        onClose={this.onClose.bind(this)}
                        functionType={this.state.currentFunctionType}
                        submitHandler={this.state.submitHandler.bind(this)}
                        mutableRow={this.state.selectedRows[0] ?? meta.serviceTemplate}
                        entityType={this.state.entityType}
                    />
                }
                case meta.entityType.request: {
                    return <CreateAndEditPopupView
                        onClose={this.onClose.bind(this)}
                        functionType={this.state.currentFunctionType}
                        submitHandler={this.state.submitHandler.bind(this)}
                        mutableRow={this.state.selectedRows[0] ?? meta.requestTemplate}
                        entityType={this.state.entityType}
                    />
                }
                default: 
                    return null
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.getPopupView()}
                <Box className='tableToolbar'>
                    <Button variant="contained" className='addButton' onClick={() => this.handleClick(meta.functionType.create)} startIcon={<AddIcon />}>
                        Добавить
                    </Button>
                    <Button variant="contained" disabled={this.isEditButtonDisabled()} className='editButton' onClick={() => this.handleClick(meta.functionType.edit)} startIcon={<EditIcon />}>
                        Редактировать
                    </Button>
                    <Button variant="contained" disabled={this.isDeleteButtonDisabled()} className='deleteButton' onClick={() => this.handleClick(meta.functionType.delete)} startIcon={<DeleteIcon />}>
                        Удалить
                    </Button>
                </Box>
            </React.Fragment>
        );
    }
}

export default TableToolbar;

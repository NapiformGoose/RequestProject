import React, { Component } from "react";
import { withStyles, useTheme } from '@material-ui/core/styles';
import { AjaxService as Ajax } from './Services/AjaxService';
import Spinner from './Spinner';
import TableView from './TableView';
import meta from './meta';

import regeneratorRuntime, { async } from "regenerator-runtime";

export class CustomTableContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            tableCollection: null,
            entityType: this.props.entityType,
            currentAjaxService: null
        };
    }

    async componentDidMount() {
        await this._getTableData();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.entityType !== this.props.entityType) {
            await this._getTableData();
        }
    }

    async _getTableData() { //вынести в контроллер или это контроллер?
        switch (this.props.entityType) {
            case meta.entityType.employee: {
                await Ajax.Employee.ListAll().then((collection) => {
                    this.setState({ tableCollection: collection, isLoading: false, currentAjaxService: Ajax.Employee, entityType: this.props.entityType });
                });
                break;
            }
            case meta.entityType.service: {
                await Ajax.Service.ListAll().then((collection) => {
                    this.setState({ tableCollection: collection, isLoading: false, currentAjaxService: Ajax.Service, entityType: this.props.entityType });
                });
                break;
            }
            case meta.entityType.request: {
                await Ajax.Request.ListAll().then((collection) => {
                    this.setState({ tableCollection: collection, isLoading: false, currentAjaxService: Ajax.Request, entityType: this.props.entityType });
                });
                break;
            }
        }
    }

    render() {
        return (
            this.state.isLoading ?
                <Spinner /> :
                <TableView
                    tableCollection={this.state.tableCollection}
                    currentAjaxService={this.state.currentAjaxService}
                    entityType={this.state.entityType}
                />
        );
    }
}

export default CustomTableContainer;

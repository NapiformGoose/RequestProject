import React, { Component } from "react";
import { withStyles, useTheme } from '@material-ui/core/styles';
import { AjaxService as Ajax } from './Services/AjaxService';
import TableView from './TableView';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import meta from './meta';

import regeneratorRuntime, { async } from "regenerator-runtime";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
});

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

    handleClose = () => {
        this.setState({ isLoading: false });
    };

    render() {
        const { classes } = this.props;
        return (
            this.state.isLoading ?
                <Backdrop className={classes.backdrop} open={this.state.isLoading} onClick={this.handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop> :
                <TableView
                    tableCollection={this.state.tableCollection}
                    currentAjaxService={this.state.currentAjaxService}
                    entityType={this.state.entityType}
                />
        );
    }
}

export default withStyles(styles)(CustomTableContainer);

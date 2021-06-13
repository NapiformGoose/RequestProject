import React, { Component } from "react";
import regeneratorRuntime, { async } from "regenerator-runtime";
import NavigationView from "./NavigationView";
import MainLayout from "./MainLayout";
import { AjaxService as Ajax } from './Services/AjaxService';
import { CssBaseline } from "@material-ui/core";

export class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            materialsCollection: null,
            workingDaysCollection: null,
            servicesCollection: null,
            employeeCollection: null
        };
    }

    render() {
        return (
            <div className="app">
                <React.Fragment>
                    <CssBaseline/>
                    <NavigationView />
                    <MainLayout employeeCollection = {this.state.employeeCollection}/>
                </React.Fragment>
                
            </div>
        );
    }
}

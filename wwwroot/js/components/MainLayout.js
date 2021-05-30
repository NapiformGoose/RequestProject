import React, { Component } from "react";
import regeneratorRuntime, { async } from "regenerator-runtime";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { AjaxService as Ajax } from './Services/AjaxService';
import meta from './meta';

import Home from "./Home";
import CustomTableContainer from "./CustomTableContainer";

export class MainLayout extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
        };
    }

    render() {
        return (
            <div className="mainLayout">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/employee" render={()=><CustomTableContainer entityType={meta.entityType.employee} />} />
                    <Route path="/service" render={()=><CustomTableContainer entityType={meta.entityType.service}/>} />
                    <Route path="/request" render={()=><CustomTableContainer entityType={meta.entityType.request}/>} />
                </Switch>
            </div>
        );
    }
}

export default MainLayout;

import React, { Component } from "react";
import { withStyles, useTheme } from '@material-ui/core/styles';
import regeneratorRuntime, { async } from "regenerator-runtime";
import { AjaxService as Ajax } from './Services/AjaxService';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import meta from './meta';

const styles = theme => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    }
});

class TransferList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: [],
            listData: this.props.listData,
            updateMutableRow: this.props.updateMutableRow
        };
    }

    not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    availableItemsChecked = () => this.intersection(this.state.checked, this.state.listData.availableItems);
    selectedItemsChecked = () => this.intersection(this.state.checked, this.state.listData.selectedItems);

    onListChange(entityType, value) {
        switch(entityType) {
            case meta.entityType.employee: {
                this.state.updateMutableRow('employees', value);
                break;
            }
            case meta.entityType.service: {
                this.state.updateMutableRow('services', value);
                break;
            }
        }
    }

    handleToggle(event, value) {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({ checked: newChecked });
    };

    handleAllRight() {
        const listData = this.state.listData;
        const selectedItems = listData.selectedItems.concat(listData.availableItems);
        this.setState({
            listData: {
                ...listData,
                selectedItems: selectedItems,
                availableItems: []
            }
        });
        this.onListChange(listData.entityType, selectedItems);

    };

    handleCheckedRight() {
        const listData = this.state.listData;
        const selectedItems = listData.selectedItems.concat(this.availableItemsChecked());
        this.setState({
            listData: {
                ...listData,
                selectedItems: selectedItems,
                availableItems: this.not(listData.availableItems, this.availableItemsChecked()),
            },
            checked: this.not(this.state.checked, this.availableItemsChecked())
        });
        this.onListChange(listData.entityType, selectedItems);
    };

    handleCheckedLeft() {
        const listData = this.state.listData;
        const selectedItems = this.not(listData.selectedItems, this.selectedItemsChecked());
        this.setState({
            listData: {
                ...listData,
                selectedItems: selectedItems,
                availableItems: listData.availableItems.concat(this.selectedItemsChecked()),
            },
            checked: this.not(this.state.checked, this.availableItemsChecked())
        });
        this.onListChange(listData.entityType, selectedItems);
    };

    handleAllLeft() {
        const listData = this.state.listData;
        const selectedItems = [];
        this.setState({
            listData: {
                ...listData,
                selectedItems: selectedItems,
                availableItems: listData.availableItems.concat(listData.selectedItems)
            }
        });
        this.onListChange(listData.entityType, selectedItems);
    };

    getCustomList(items, entityType, classes) {
        return (
            <Paper className={classes.paper}>
                <List dense component="div" role="list" >
                    {items.map((value) => {
                        const labelId = `transfer-list-item-${value.id}-label`;
                        let label;
                        switch (entityType) {
                            case meta.entityType.service: {
                                label = value.name;
                                break;
                            }
                            case meta.entityType.employee: {
                                label = `${value.name} ${value.surname} - ${value.position}`;
                                break;
                            }
                        }
                        return <ListItem key={value.id} role="listitem" button onClick={(event) => this.handleToggle(event, value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={label} />
                        </ListItem>
                    })}
                    <ListItem />
                </List>
            </Paper>
        )
    }
    render() {
        const checkedAvailableItems = this.availableItemsChecked();
        const checkedSelectedItems = this.selectedItemsChecked();
        const { classes } = this.props;

        return (
            <React.Fragment>
            <Typography variant="h6" gutterBottom component="div"> {this.state.listData.title} </Typography>
                <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                    <Grid item>{this.getCustomList(this.state.listData.availableItems, this.state.listData.entityType, classes)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={this.handleAllRight.bind(this)}
                                disabled={this.state.listData.availableItems.length === 0}
                                aria-label="move all selectedItems"
                            >
                                ≫
                        </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={this.handleCheckedRight.bind(this)}
                                disabled={checkedAvailableItems.length === 0}
                                aria-label="move selected selectedItems"
                            >
                                &gt;
                        </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={this.handleCheckedLeft.bind(this)}
                                disabled={checkedSelectedItems.length === 0}
                                aria-label="move selected availableItems"
                            >
                                &lt;
                        </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                className={classes.button}
                                onClick={this.handleAllLeft.bind(this)}
                                disabled={this.state.listData.selectedItems.length === 0}
                                aria-label="move all availableItems"
                            >
                                ≪
                        </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{this.getCustomList(this.state.listData.selectedItems, this.state.listData.entityType, classes)}</Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TransferList);
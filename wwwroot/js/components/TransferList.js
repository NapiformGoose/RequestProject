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
            left: [1, 2, 3, 4],
            right: [5, 6, 7, 8],
            entityType: this.props.entityType
        };
    }

    not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }
    
    intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    leftChecked = () => this.intersection(this.state.checked, this.state.left);
    rightChecked = () => this.intersection(this.state.checked, this.state.right);

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
        this.setState({ 
            right: this.state.right.concat(this.state.left), 
            left: [] 
        });
    };

    handleCheckedRight() {
        this.setState({ 
            right: this.state.right.concat(this.leftChecked()), 
            left: this.not(this.state.left, this.leftChecked()),
            checked: this.not(this.state.checked, this.leftChecked())
        });
    };

    handleCheckedLeft() {
        this.setState({ 
            right: this.not(this.state.right, this.rightChecked()), 
            left: this.state.left.concat(this.rightChecked()),
            checked: this.not(this.state.checked, this.rightChecked())
        });
    };

    handleAllLeft() {
        this.setState({ 
            right: [], 
            left: this.state.left.concat(this.state.right)
        });
    };

    getCustomList(items, classes) {
        return (
            <Paper className={classes.paper}>
                <List dense component="div" role="list">
                    {items.map((value) => {
                        const labelId = `transfer-list-item-${value}-label`;
                        return <ListItem key={value} role="listitem" button onClick={(event) => this.handleToggle(event, value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={this.state.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`List item ${value + 1}`} />
                        </ListItem>
                    })}
                    <ListItem />
                </List>
            </Paper>
        )
    }
    render() {
        const leftCheckedItems = this.leftChecked();
        const rightCheckedItems = this.rightChecked();
        const { classes } = this.props;

        return (
            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item>{this.getCustomList(this.state.left, classes)}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={this.handleAllRight.bind(this)}
                            disabled={this.state.left.length === 0}
                            aria-label="move all right"
                        >
                            ≫
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={this.handleCheckedRight.bind(this)}
                            disabled={leftCheckedItems.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={this.handleCheckedLeft.bind(this)}
                            disabled={rightCheckedItems.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={this.handleAllLeft.bind(this)}
                            disabled={this.state.right.length === 0}
                            aria-label="move all left"
                        >
                            ≪
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{this.getCustomList(this.state.right, classes)}</Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(TransferList);
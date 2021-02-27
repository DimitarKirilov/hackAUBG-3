import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './InsurancePanel.css';

export default function InsurancePanel() {

    const useStyles = makeStyles({
        table: {
            backgroundColor: '#494b63',
        },
        tableRow: {
            color: '#fff'
        }
    });

    const classes = useStyles();

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    };
      
    const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    return (
        <div className="insurancePanel">
            {/* <header className="insurancePanelHeader">
                <h2>Insurance Panel</h2>
                <img src={StolenLogo} className="logo"></img>
                <div className="iconContainer">
                    <IconButton className="profileIcon">
                        <AccountCircleIcon></AccountCircleIcon>
                    </IconButton>
                    <label className="clickable">Profile</label>
                </div>
            </header> */}
            <section className="mainContentContainer">
                <div className="sidebarContainer">
                    <div className="sidebarListItem clickable">New York</div>
                    <div className="sidebarListItem clickable">London</div>
                    <div className="sidebarListItem clickable">Sofia de Janeiro</div>
                </div>
                <div className="dataContainer">
                    <TableContainer component={Paper} className="tableContainer">
                        <Table aria-label="simple table" size="small"  className={ classes.table }>
                            <TableHead>
                            <TableRow className={ classes.tableRow }>
                                <TableCell className={ classes.tableRow }>Dessert (100g serving)</TableCell>
                                <TableCell align="right" className={ classes.tableRow }>Calories</TableCell>
                                <TableCell align="right" className={ classes.tableRow }>Fat&nbsp;(g)</TableCell>
                                <TableCell align="right" className={ classes.tableRow }>Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right" className={ classes.tableRow }>Protein&nbsp;(g)</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row" className={ classes.tableRow }>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" className={ classes.tableRow }>{row.calories}</TableCell>
                                <TableCell align="right" className={ classes.tableRow }>{row.fat}</TableCell>
                                <TableCell align="right" className={ classes.tableRow }>{row.carbs}</TableCell>
                                <TableCell align="right" className={ classes.tableRow }>{row.protein}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </section>
        </div>
    );
;}
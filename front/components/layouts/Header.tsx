import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from "next/link"
import { grey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles({});
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: grey[700],
            },
        }
    });

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" color="primary">

                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link href="/">
                                <a style={{ color: "#000" }}> Home</a>
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
}
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';

import Link from "next/link"
import { grey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { State } from '../../store';

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
        home: {
            display: "block",
            marginRight: 50
        }
    }),
);

const loginUser = (state: State) => state.user

export default function ButtonAppBar() {
    const classes = useStyles({});
    const user = useSelector(loginUser)
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
                            <Link href="/" >
                                <a style={{ color: "#000" }}> Home</a>
                            </Link>

                        </Typography>
                        {!user && (
                            <div>
                                <IconButton aria-label="display more actions" edge="end" color="inherit">
                                    <Link href="/login">
                                        <a style={{ color: "#000" }}> Sign Up</a>
                                    </Link>
                                </IconButton>
                                <IconButton aria-label="display more actions" edge="end" color="inherit">
                                    <Link href="/signup">
                                        <a style={{ color: "#000" }}> Login</a>
                                    </Link>
                                </IconButton>
                            </div>
                        )}
                        {user &&
                            <IconButton aria-label="display more actions" edge="end" color="inherit">
                                <Button>LogOut</Button>
                            </IconButton>}
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
}
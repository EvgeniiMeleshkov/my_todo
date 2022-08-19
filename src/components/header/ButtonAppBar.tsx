import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {memo} from 'react';

type ButtonAppBarPropsType = {
    addTodo: (title: string)=>void
    toggle: ()=>void
    appearance: boolean
}

 function ButtonAppBarToMemo({addTodo, toggle, appearance}: ButtonAppBarPropsType) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{backgroundColor: '#5f9ea054', position: 'static'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export const ButtonAppBar = memo(ButtonAppBarToMemo)
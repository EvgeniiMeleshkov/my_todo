import * as React from 'react';
import {memo} from 'react';
import {AppBar, Box, Button, IconButton, MenuItem, Toolbar} from '@material-ui/core';

// type ButtonAppBarPropsType = {
//     addTodo: (title: string)=>void
//     toggle: ()=>void
//     appearance: boolean
// }

 function ButtonAppBarToMemo() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{backgroundColor: '#5f9ea054', position: 'static'}}>
                <Toolbar>
                    <IconButton
                        size={'medium'}
                        color={'inherit'}

                    >
                        <MenuItem />
                    </IconButton>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export const ButtonAppBar = memo(ButtonAppBarToMemo)
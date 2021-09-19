import { useState } from "react";
import { 
    Button, 
    Grid,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import HamburgerContent from "./hamburgerContentComponent";

export default function Hamburger({onLogout, onUpdate, onSucces, user}:any) {
    const [ append, setAppend ] = useState<boolean>(false);

    const handleAppend = () => setAppend(!append);

    return(
        <Grid>
            <Button onClick={() => handleAppend()} >
                <MenuIcon fontSize='large' style={{color: 'white'}} />
            </Button>
            {
                append &&
                <HamburgerContent 
                    onAppend={handleAppend}
                    onLogout={onLogout} 
                    onUpdate={onUpdate} 
                    onSucces={onSucces}
                    user={user}
                />
            }
        </Grid>
    )
}
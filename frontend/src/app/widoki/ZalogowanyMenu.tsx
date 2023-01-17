import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { wyloguj } from "../../funkcjonalnosci/konto/kontoSlice";
import { wyczyscKoszyk } from "../../funkcjonalnosci/Koszyk/koszykSlice";
import { useAppDispatch, useAppSelector } from "../../funkcjonalnosci/sklep/configureStore";

export default function ZalogowanyMenu() {
    const dispatch = useAppDispatch();
    const { uzytkownik } = useAppSelector(state => state.konto);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const klikniecie = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                color='inherit'
                onClick={klikniecie}
                sx={{ typography: 'h6' }}
            >
                {uzytkownik?.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Profil</MenuItem>
                <MenuItem onClick={handleClose}>Moje zamowienia</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(wyloguj());
                    dispatch(wyczyscKoszyk());
                }}>Logout</MenuItem>
            </Menu>
        </>
    );
}
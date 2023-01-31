import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../funkcjonalnosci/redux/configureStore";
import ZalogowanyMenu from "./ZalogowanyMenu";

interface Props {
    trybCiemny: boolean;
    zmienStyl: () => void;
}

const logLinki = [
    { tytul: 'logowanie', sciezka: '/logowanie' },
    { tytul: 'rejestracja', sciezka: '/rejestracja' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500',

    },
    '&:active': {
        color: 'aeaeae'
    }
    
}

export default function Naglowek({ trybCiemny, zmienStyl }: Props) {
    const { koszyk } = useAppSelector(state => state.koszyk);
    const { uzytkownik } = useAppSelector(state => state.konto);
    const licznikKoszyka = koszyk?.przedmioty.reduce((sum) => sum + 1, 0);

    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant="h4" component={NavLink} to='/' sx={{ color: 'inherit', textDecoration: 'none' }} exact>
                        Hoduje
                    </Typography>
                    <img
                        src={`/images/hoduje_icon.ico`}
                        alt={`hoduje.pl`}
                        width={35}
                    />
                </Box>
                <Box>
                    <List sx={{ display: 'flex' }}>
                            <ListItem
                                component={NavLink}
                                to={"/katalog"}
                                key={"/katalog"}
                                sx={navStyles}
                            >
                                KATALOG
                            </ListItem>
                    
                    {uzytkownik ? (<ListItem><ZalogowanyMenu /></ListItem>) : (
                        <>
                        {logLinki.map(({ tytul, sciezka }) => (
                            <ListItem
                                component={NavLink}
                                to={sciezka}
                                key={sciezka}
                                sx={navStyles}
                            >
                                {tytul.toUpperCase()}
                            </ListItem>
                        ))}
                        </>
                    )}
                    </List>
                    
                </Box>
                <Box display='flex' alignItems='center'>
                    
                    
                    <Typography>Tryb ciemny</Typography>
                    <Switch checked={trybCiemny} onChange={zmienStyl} />
                    <Typography  component={Link} to='/koszyk' sx={{ color: 'inherit', textDecoration: 'none' }}>Koszyk</Typography>
                    <IconButton component={Link} to='/koszyk' size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={licznikKoszyka} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
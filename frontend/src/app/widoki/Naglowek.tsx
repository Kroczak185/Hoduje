import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

interface Props {
    trybCiemny: boolean;
    zmienStyl: () => void;
}

const linki = [
    { tytul: 'katalog', sciezka: '/katalog' },
    { tytul: 'autor', sciezka: '/autor' },
    { tytul: 'kontakt', sciezka: '/kontakt' }
]

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
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Naglowek({ trybCiemny, zmienStyl }: Props) {
    const {koszyk} = useStoreContext();
    const licznikKoszyka = koszyk?.przedmioty.reduce((sum)=>sum+1,0);

    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <img
                        src={`/images/hoduje_icon.ico`}
                        alt={`hoduje.pl`}
                        width={35}
                    />
                    <Typography variant="h4" component={NavLink} to='/' sx={{ color: 'inherit', textDecoration: 'none' }} exact>
                        Hoduje
                    </Typography>
                    <Switch checked={trybCiemny} onChange={zmienStyl} />
                </Box>
                    <List sx={{ display: 'flex' }}>
                        {linki.map(({ tytul, sciezka }) => (
                            <ListItem
                                component={NavLink}
                                to={sciezka}
                                key={sciezka}
                                sx={navStyles}
                            >
                                {tytul.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/koszyk' size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={licznikKoszyka} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                </IconButton>
                    <List sx={{ display: 'flex' }}>
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
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
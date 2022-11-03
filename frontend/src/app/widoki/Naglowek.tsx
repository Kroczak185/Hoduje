import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    trybCiemny: boolean;
    zmienStyl: () => void;
}

export default function Naglowek({trybCiemny, zmienStyl}: Props) {
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <img
                    src={`/images/hoduje_icon.ico`}
                    alt={`hoduje.pl`}
                    width={35}
                />
                <Typography variant="h4" >
                    Hoduje.pl
                </Typography>
                <Switch checked={trybCiemny} onChange={zmienStyl} />
            </Toolbar>
        </AppBar>
    )
}
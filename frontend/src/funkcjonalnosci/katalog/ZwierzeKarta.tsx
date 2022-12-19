import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Zwierze } from "../../app/modele/zwierze";

interface Props {
    zwierze: Zwierze
}

export default function ZwierzeKarta({ zwierze }: Props) {
    
    const [ladowanie, ustawLadowanie] = useState(false);
    const {koszyk,ustawKoszyk,usunItem}= useStoreContext();
    const item = koszyk?.przedmioty.find(i=>i.zwierzeId === zwierze?.id);
    

    function handleDodajItem(ZwierzeId: number) {
        ustawLadowanie(true);
        agent.Koszyk.dodajItem(ZwierzeId)
            .then(koszyk => ustawKoszyk(koszyk))
            .catch(error => console.log(error))
            .finally(() => ustawLadowanie(false));
    }

    function handleRemoveItem(zwierzeId: number) {
        ustawLadowanie(true);
                agent.Koszyk.usunItem(zwierzeId)
                    .then(() => usunItem(zwierzeId ))
                    .catch(error => console.log(error))
                    .finally(() => ustawLadowanie(false));
     }
    return (
        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {zwierze.nazwa.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={zwierze.nazwa}
                sx={{height:80, width: 265}}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main', fontSize:16}
                }}
                
            />
            <CardMedia
                sx={{height: 265, backgroundSize: 'contain', bgcolor: 'transparent'}}
                image={zwierze.zdjecieUrl}
                title={zwierze.nazwa}
                
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    {(zwierze.cena / 100).toFixed(2)}zł
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {zwierze.gatunek} / {zwierze.typ}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={ladowanie} onClick={()=> item ? handleRemoveItem(zwierze.id):handleDodajItem(zwierze.id)} size="small">
                    {item ? "Usun z koszyka":"Dodaj do koszyka"}
                    </LoadingButton>
                <Button component={Link} to={`/katalog/${zwierze.id}`} size="small">Wyświetl</Button>
            </CardActions>
        </Card>
    )
}
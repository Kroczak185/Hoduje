import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, createMuiTheme, createTheme, makeStyles, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Zwierze } from "../../app/modele/zwierze";
import { dodajKoszykItemAsync, usunKoszykItemAsync } from "../Koszyk/koszykSlice";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";

interface Props {
    zwierze: Zwierze
}

export default function ZwierzeKarta({ zwierze }: Props) {
    
    const {koszyk, status} = useAppSelector(state=>state.koszyk)
    const dispatch = useAppDispatch();
    const item = koszyk?.przedmioty.find(i=>i.zwierzeId === zwierze?.id);

    
    return (
        <Card>
            <CardMedia
                component="img"
                sx={{height: 150, backgroundSize: 'contain', bgcolor: 'transparent'}}
                image={zwierze.zdjecieUrl}
                title={zwierze.nazwa}
            />

            <CardHeader 
                
                title={zwierze.nazwa}
                sx={{height:40, width: 265}}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main', fontSize:16}
                }}
                
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    {(zwierze.cena / 100).toFixed(2)}zł
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 {zwierze.typ} / {zwierze.lokalizacja} 
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status.includes('pendingAddItem' + zwierze.id)} onClick={()=> 
                    item ? 
                    dispatch(usunKoszykItemAsync({zwierzeId: zwierze.id})): 
                    dispatch(dodajKoszykItemAsync({zwierzeId: zwierze.id}))}
                    size="small"
                    >
                    {item ? "Usun z koszyka":"Dodaj do koszyka"}
                    </LoadingButton>
                <Button component={Link} to={`/katalog/${zwierze.id}`} size="small">Wyświetl</Button>
            </CardActions>
        </Card>
    )
}
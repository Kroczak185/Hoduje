import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Zwierze } from "../../app/modele/zwierze";
import { dodajKoszykItemAsync, usunKoszykItemAsync } from "../Koszyk/koszykSlice";
import { useAppDispatch, useAppSelector } from "../sklep/configureStore";

interface Props {
    zwierze: Zwierze
}

export default function ZwierzeKarta({ zwierze }: Props) {
    
    const {koszyk, status} = useAppSelector(state=>state.koszyk)
    const dispatch = useAppDispatch();
    const item = koszyk?.przedmioty.find(i=>i.zwierzeId === zwierze?.id);
    
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
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Zwierze } from "../../app/modele/zwierze";

interface Props {
    zwierze: Zwierze
}

export default function ZwierzeKarta({ zwierze }: Props) {
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
                <Button size="small">Dodaj do koszyka</Button>
                <Button component={Link} to={`/katalog/${zwierze.id}`} size="small">Wyświetl</Button>
            </CardActions>
        </Card>
    )
}
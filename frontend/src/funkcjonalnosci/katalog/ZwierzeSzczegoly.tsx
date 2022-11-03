import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Zwierze } from "../../app/modele/zwierze";

export default function ZwierzeSzczegoly(){
    const {id} = useParams<{id: string}>();

    const [zwierze, ustawZwierze] = useState<Zwierze | null>(null);
    const [ladowanie, ustawLadowanie] = useState(true);

    
    useEffect(()=>{
        axios.get(`http://localhost:5000/backend/zwierzeta/${id}`)
        .then(response => ustawZwierze(response.data))
        .catch(error => console.log(error))
        .finally(()=> ustawLadowanie(false));
    },[id])

    if(ladowanie) return <h3>Ładowanie...</h3>
    if(!zwierze) return <h3>Zwierze nie znaleziono</h3>

    var plec = "";

    if(zwierze.plec==0){
        plec = "Samiec";
    }
    else{
        plec = "Samica"
    }

    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={zwierze.zdjecieUrl} alt={zwierze.nazwa} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{zwierze.nazwa}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant='h4' color='secondary'>{(zwierze.cena / 100).toFixed(2)}zł</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Nazwa</TableCell>
                                <TableCell>{zwierze.nazwa}</TableCell>
                            </TableRow>    
                            <TableRow>
                                <TableCell>Opis</TableCell>
                                <TableCell>{zwierze.opis}</TableCell>
                            </TableRow> 
                            <TableRow>
                                <TableCell>Wiek</TableCell>
                                <TableCell>{zwierze.wiek} lata</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Waga</TableCell>
                                <TableCell>{zwierze.waga/100} kg</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Plec</TableCell>
                                <TableCell>{plec}</TableCell>
                            </TableRow> 
                            <TableRow>
                                <TableCell>Typ</TableCell>
                                <TableCell>{zwierze.typ}</TableCell>
                            </TableRow>  
                            <TableRow>
                                <TableCell>Gatunek</TableCell>
                                <TableCell>{zwierze.gatunek}</TableCell>
                            </TableRow>  
                            <TableRow>
                                <TableCell>Lokalizacja</TableCell>
                                <TableCell>{zwierze.lokalizacja}</TableCell>
                            </TableRow>  
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
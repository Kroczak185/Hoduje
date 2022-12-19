import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import KoszykPodsumowanie from "./KoszykPodsumowanie";


export default function KoszykPage() {

    const { koszyk, ustawKoszyk, usunItem } = useStoreContext();
    const [status,ustawStatus]=useState({
        ladowanie: false,
        nazwa: ''
    });


    function handleRemoveItem(zwierzeId: number, nazwa: string) {
        ustawStatus({ladowanie: true, nazwa});
        agent.Koszyk.usunItem(zwierzeId)
            .then(() => usunItem(zwierzeId ))
            .catch(error => console.log(error))
            .finally(()=>ustawStatus({ladowanie:false ,nazwa: ''}))
    }

    if (!koszyk) return <Typography variant='h3'>Twój koszyk jest pusty!</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produkt</TableCell>
                            <TableCell align="right">Lokalizacja</TableCell>
                            <TableCell align="right">Cena</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {koszyk.przedmioty.map(item => {
                            return (
                                <TableRow
                                    key={item.zwierzeId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Box display='flex' alignItems='center'>
                                            <img src={item.zdjecieUrl} alt={item.nazwa} style={{ height: 50, marginRight: 20 }} />
                                            <span>{item.nazwa}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">{item.lokalizacja}</TableCell>
                                    <TableCell align="right">{(item.cena / 100).toFixed(2)}zł</TableCell>
                                    <TableCell align="right">
                                        <LoadingButton 
                                        loading={status.ladowanie &&status.nazwa ==='del' + item.zwierzeId} 
                                        onClick={()=>handleRemoveItem(item.zwierzeId, 'del' + item.zwierzeId)} 
                                        color='error'>
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <KoszykPodsumowanie />
                    <Button
                        component={Link}
                        to='/rezerwacja'
                        variant='contained'
                        size='large'
                        fullWidth
                    >DALEJ</Button>
                </Grid>
                        </Grid>
        </>

    )
}
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../sklep/configureStore";
import KoszykPodsumowanie from "./KoszykPodsumowanie";
import { usunKoszykItemAsync } from "./koszykSlice";


export default function KoszykPage() {

    const { koszyk, status } = useAppSelector(state => state.koszyk);
    const dispatch = useAppDispatch();


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
                        {koszyk.przedmioty.map(item => 
                        {
                            return(
                                <TableRow
                                    key={item.zwierzeId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Box display='flex' alignItems='center'>
                                            <img src={item.zdjecieUrl} alt={item.nazwa} style={{ height: 50, marginRight: 20 }} />
                                            <Typography component={Link} to={`/katalog/${item.zwierzeId}`} >{item.nazwa}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">{item.lokalizacja}</TableCell>
                                    <TableCell align="right">{(item.cena / 100).toFixed(2)}zł</TableCell>
                                    <TableCell align="right">
                                        <LoadingButton 
                                        
                                        loading={status === 'pendingRemoveItem' + item.zwierzeId + 'del'}
                                        onClick={() => dispatch(usunKoszykItemAsync({zwierzeId: item.zwierzeId, name: 'del'}))}
                                        color='error'>
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>
                                </TableRow>)
                            
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
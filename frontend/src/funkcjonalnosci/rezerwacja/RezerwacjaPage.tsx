import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";

export default function RezerwacjaPage() {

    const { koszyk } = useAppSelector(state => state.koszyk);
    const dispatch = useAppDispatch();


    if (!koszyk) return <Typography variant='h3'>Twój koszyk jest pusty!</Typography>

    return (
        <>
            <Typography variant="h5">Skontaktuj się ze sprzedawcami na podane adresy email.</Typography>
            <br></br>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produkt</TableCell>
                            <TableCell align="right">Email</TableCell>
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
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Box display='flex' alignItems='center'>
                                            <img src={item.zdjecieUrl} alt={item.nazwa} style={{ height: 50, marginRight: 20 }} />
                                            <Typography component={Link} to={`/katalog/${item.zwierzeId}`} sx={{ color: 'inherit', textDecoration: 'none' }}>{item.nazwa}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">{item.email}</TableCell>
                                    <TableCell align="right">{item.lokalizacja}</TableCell>
                                    <TableCell align="right">{(item.cena / 100).toFixed(2)}zł</TableCell>
                                    <TableCell align="right">

                                    </TableCell>
                                </TableRow>)

                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}
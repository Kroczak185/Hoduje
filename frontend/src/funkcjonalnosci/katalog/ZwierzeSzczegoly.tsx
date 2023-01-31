import { LoadingButton } from "@mui/lab";
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import Ladowanie from "../../app/widoki/Ladownie";
import { dodajKoszykItemAsync, usunKoszykItemAsync } from "../Koszyk/koszykSlice";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { fetchZwierzeAsync, removeZwierze, zwierzeSelectors } from "./katalogSlice";

export default function ZwierzeSzczegoly() {

    const { id } = useParams<{ id: string }>();
    const { koszyk, status } = useAppSelector(state => state.koszyk);
    const { status: zwierzeStatus } = useAppSelector(state => state.katalog);
    const dispatch = useAppDispatch();
    const zwierze = useAppSelector(state => zwierzeSelectors.selectById(state, id));
    const item = koszyk?.przedmioty.find(i => i.zwierzeId === zwierze?.id);
    const { uzytkownik } = useAppSelector(state => state.konto);

    useEffect(() => {
        if (!zwierze) dispatch(fetchZwierzeAsync(parseInt(id)))
    }, [id, item, dispatch, zwierze])

    function handleAktualizacjaKoszyka() {
        if (!item) {

            dispatch(dodajKoszykItemAsync({ zwierzeId: zwierze?.id! }))
        }
        else {
            dispatch(usunKoszykItemAsync({ zwierzeId: zwierze?.id! }))
        }
    }

    async function handleUsunOgloszenie() {
        if(zwierze?.id)
        try {
            let response = await agent.Admin.deleteZwierze(zwierze?.id);
            
            dispatch(removeZwierze(response));

        } catch (error) {
            console.log(error)
        }
    }
    if (zwierzeStatus.includes('pending')) return <Ladowanie message='Ładowanie zwierzęcia...' />
    if (!zwierze) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={zwierze.zdjecieUrl} alt={zwierze.nazwa} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{zwierze.nazwa}</Typography>
                <Divider sx={{ mb: 2 }} />
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
                                <TableCell>{zwierze.waga / 100} kg</TableCell>
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
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <LoadingButton
                                sx={{ height: '55px' }}
                                color='primary'
                                size='large'
                                variant='contained'
                                onClick={handleAktualizacjaKoszyka}
                                loading={status.includes('pending')}
                                fullWidth>
                                {item ? 'Usun z koszyka' : 'Dodaj do koszyka'}


                            </LoadingButton>

                        </Grid>
                        <Grid item xs={6}>
                            {uzytkownik ? uzytkownik.email==zwierze.email ?<Button
                                    sx={{ height: '55px' }}
                                    color='error'
                                    size='large'
                                    variant='contained'
                                    onClick={handleUsunOgloszenie}
                                    fullWidth>
                                    Usun ogłoszenie
                                </Button> : "": ""}
                        </Grid>
                    </Grid>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Grid } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { wyswietlFormat } from "../../app/format/cena";

export default function KoszykPodsumowanie() {
    const {koszyk} = useStoreContext();
    const total = koszyk?.przedmioty.reduce((sum, item) => sum + item.cena, 0) ?? 0;
    return (
        <>
            { <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Suma</TableCell>
                            <TableCell align="right">{wyswietlFormat(total)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> }
        </>
    )
}
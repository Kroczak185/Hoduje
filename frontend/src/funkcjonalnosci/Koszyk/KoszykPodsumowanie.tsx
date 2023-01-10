import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { wyswietlFormat } from "../../app/format/cena";
import { useAppSelector } from "../sklep/configureStore";

export default function KoszykPodsumowanie() {
    const {koszyk} = useAppSelector(state => state.koszyk);
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
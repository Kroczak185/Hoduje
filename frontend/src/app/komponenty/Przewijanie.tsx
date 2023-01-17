import { Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { MetaDane } from "../modele/podzial";

interface Props {
    metaDane: MetaDane;
    onPageChange: (page: number) => void;
}

export default function Przewijanie({metaDane, onPageChange}: Props) {
    const {aktualnaStrona, suma, iloscStron, wielkoscStrony} = metaDane;
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Wyświetlanie {(aktualnaStrona-1)*wielkoscStrony+1}-
                {aktualnaStrona*wielkoscStrony > suma 
                    ? suma 
                    : aktualnaStrona*wielkoscStrony} z {suma} zwierząt
            </Typography>
            <Pagination
                color='secondary'
                size='large'
                count={iloscStron}
                page={aktualnaStrona}
                onChange={(e, page) => onPageChange(page) }
                
            />
            
        </Box>
    )
}
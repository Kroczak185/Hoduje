import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

export default function Ladowanie({message ='Ładowanie...'}: Props){
    return(
        <Backdrop open={true} invisible={true}>
            <Box display='flex' justifyContent='center' alignItems='center' height='50vh'>
                <CircularProgress size={70} color='primary' />
                <Typography variant="h5" sx={{justifyContent:'center', position:'fixed', top:'57%'}}>{message}</Typography>
            </Box>
        </Backdrop>
    )
}
import { Box, CircularProgress, Typography } from "@mui/material"

export const Loading = () =>{

    return(
        <Box sx={{margin:'auto', width:'100%',height:'50vh', textAlign:'center', display:'flex', flexDirection:'column',justifyContent:'center', gap:'40px', alignItems:'center'}}>
            <Typography variant="h2">Cargando...</Typography>
            <CircularProgress thickness={2}/>
        </Box>
    )
}
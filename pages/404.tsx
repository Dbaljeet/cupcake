import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../components/layouts"

export default function Page404() {
  return (
    <ShopLayout
      title={"Página no encontrada"}
      pageDescription={"No hay nada que mostrar aquí"}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
      >
        <Typography variant='h1' component='h1' fontSize={100}>
          Error 404|
        </Typography>
      </Box>
    </ShopLayout>
  )
}

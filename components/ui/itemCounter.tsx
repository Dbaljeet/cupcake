import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import React, { FC, useState } from "react"
interface Props {
  limit: number
}
export const ItemCounter: FC<Props> = ({ limit }) => {
  const [cant, setCant] = useState(0)

  return (
    <>
      <Box display='flex' alignItems='center'>
        <IconButton
          onClick={() => {
            cant <= 0 ? setCant(0) : setCant(cant - 1)
          }}
        >
          <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign: "center" }}>{cant}</Typography>
        <IconButton
          onClick={() => {
            cant >= limit ? setCant(cant) : setCant(cant + 1)
          }}
        >
          <AddCircleOutline />
        </IconButton>
      </Box>
    </>
  )
}

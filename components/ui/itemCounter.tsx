import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { Dispatch, FC, useState } from 'react'
interface Props {
  limit: number
  selectedCount: number
  setSelectedCount: Dispatch<number>
}
export const ItemCounter: FC<Props> = ({
  limit,
  selectedCount,
  setSelectedCount,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={() => {
            selectedCount <= 1
              ? setSelectedCount(1)
              : setSelectedCount(selectedCount - 1)
          }}
        >
          <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign: 'center' }}>
          {selectedCount}
        </Typography>
        <IconButton
          onClick={() => {
            selectedCount >= limit
              ? setSelectedCount(selectedCount)
              : setSelectedCount(selectedCount + 1)
          }}
        >
          <AddCircleOutline />
        </IconButton>
      </Box>
    </>
  )
}

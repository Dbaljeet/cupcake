import { Box, Button } from "@mui/material"
import { Dispatch, FC, SetStateAction } from "react"
import { ISize } from "../../interfaces"
interface Props {
  selectedSize: ISize
  setSelectedSize: Dispatch<SetStateAction<"Pequeño" | "Mediano" | "Grande">>
  sizes: ISize[]
}

export const SizeSelector: FC<Props> = ({
  selectedSize,
  setSelectedSize,
  sizes,
}) => {
  return (
    <>
      <Box>
        {sizes.map((size) => (
          <Button
            onClick={() => setSelectedSize(size)}
            key={size}
            size='small'
            color={selectedSize === size ? "inherit" : "primary"}
          >
            {size}
          </Button>
        ))}
      </Box>
    </>
  )
}

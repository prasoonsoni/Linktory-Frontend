import { Button } from '@mui/material'
import React from 'react'

const LinktoryButton = (props) => {
  return (
    <div>
        <Button variant="outlined" sx={{m:0.5}} fullWidth href={props.link} target="_blank">{props.name}</Button>
    </div>
  )
}

export default LinktoryButton
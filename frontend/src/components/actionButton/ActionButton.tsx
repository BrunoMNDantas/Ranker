import React, { useState } from "react"
import { IconButton, IconButtonProps } from "@mui/material"

export interface ActionButtonProps extends IconButtonProps {
    buttonAction: (event: React.MouseEvent) => Promise<void>
}

const ActionButton = ({ buttonAction, children, ...props } : ActionButtonProps) => {
    const [executing, setExecuting] = useState(false)

    const handleClick = async (e: React.MouseEvent) => {
        setExecuting(true)

        try {
            await buttonAction(e)
        } finally {
            setExecuting(false)
        }
    }

    return (
        <IconButton onClick={handleClick} loading={executing} {...props}>
            { children }
        </IconButton>
    )
}

export default ActionButton;
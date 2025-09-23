import React, { useState } from "react"
import { CircularProgress, CircularProgressProps, IconButton, IconButtonProps } from "@mui/material"

export const SPINNER_SIZE_MAP: Record<NonNullable<IconButtonProps["size"]>, number> = {
    small: 16,
    medium: 20,
    large: 24,
};

export interface ActionButtonProps extends IconButtonProps {
    buttonAction: (event: React.MouseEvent) => Promise<void>
    circularProgressProps?: CircularProgressProps
}

const ActionButton = ({ buttonAction, circularProgressProps, children, ...props } : ActionButtonProps) => {
    const [executing, setExecuting] = useState(false)
    const spinnerSize = SPINNER_SIZE_MAP[props.size || "medium"] + "px"

    const handleClick = async (e: React.MouseEvent) => {
        setExecuting(true)

        try {
            await buttonAction(e)
        } finally {
            setExecuting(false)
        }
    }

    return (
        <IconButton onClick={handleClick} {...props}>
            { executing ? <CircularProgress size={spinnerSize} {...circularProgressProps}/> : children }
        </IconButton>
    )
}

export default ActionButton;
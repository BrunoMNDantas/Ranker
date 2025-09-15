import React, { useState } from 'react';
import { TextField, Popover, InputAdornment, IconButton } from '@mui/material';
import { Palette } from '@mui/icons-material';
import { RgbaColorPicker } from 'react-colorful';

export interface RgbaColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export const hexToRgba = (hex: string | null): RgbaColor => {
    if (!hex) return { r: 0, g: 0, b: 0, a: 1 };

    const cleanHex = hex.replace('#', '');

    if (cleanHex.length === 6) {
        return {
            r: parseInt(cleanHex.substr(0, 2), 16),
            g: parseInt(cleanHex.substr(2, 2), 16),
            b: parseInt(cleanHex.substr(4, 2), 16),
            a: 1
        };
    } else if (cleanHex.length === 8) {
        return {
            r: parseInt(cleanHex.substr(0, 2), 16),
            g: parseInt(cleanHex.substr(2, 2), 16),
            b: parseInt(cleanHex.substr(4, 2), 16),
            a: parseInt(cleanHex.substr(6, 2), 16) / 255
        };
    }

    return { r: 0, g: 0, b: 0, a: 1 };
};

export const rgbaToHex = (rgba: RgbaColor): string => {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}${toHex(rgba.a * 255)}`;
};

export interface ColorFieldProps {
    label?: string;
    value: string | null;
    onChange: (color: string) => void;
    disabled?: boolean;
}

const ColorField = ({ label = "Color", value, onChange, disabled = false }: ColorFieldProps) => {
    const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);

    const handleColorChange = (newColor: RgbaColor) => {
        if (!disabled) {
            const hexColor = rgbaToHex(newColor);
            onChange(hexColor);
        }
    };

    return (
        <>
            <TextField
                disabled={disabled}
                label={label}
                type="text"
                value={value || ""}
                onChange={e => !disabled ? onChange(e.target.value) : null}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={e => !disabled ? setColorPickerAnchor(e.currentTarget) : null}
                                    disabled={disabled}
                                    size="small">
                                    <Palette />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
            <Popover
                open={Boolean(colorPickerAnchor)}
                anchorEl={colorPickerAnchor}
                onClose={() => setColorPickerAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <RgbaColorPicker
                    color={hexToRgba(value)}
                    onChange={handleColorChange}/>
            </Popover>
        </>
    );
};

export default ColorField;
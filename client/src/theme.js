import { createTheme } from "@mui/material/styles";

export const shades = {
    primary: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#101010",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000",
    },
    secondary: {
        100: "#cdf4fb",
        200: "#b3eefa",
        300: "#97e9f7",
        400: "#54d8f2",
        500: "#00d0fa",
        600: "#00b1ec",
        700: "#0091df",
        800: "#014fb5",
        900: "#030590",
    },
    neutral: {
        100: "#f5f5f5",
        200: "#ecebeb",
        300: "#e2e1e1",
        400: "#d9d7d7",
        500: "#cfcdcd",
        600: "#a6a4a4",
        700: "#7c7b7b",
        800: "#535252",
        900: "#272727",
    },
};

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: shades.primary[900],
        },
        secondary: {
            main: shades.secondary[500],
        },
        neutral: {
            dark: shades.neutral[600],
            main: shades.neutral[500],
            light: shades.neutral[100],
        },
    },
    typography: {
        fontFamily: ["Open Sans", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            fontFamily: ["Open Sans", "sans-serif"].join(","),
            fontSize: 48,
        },
        h2: {
            fontFamily: ["Open Sans", "sans-serif"].join(","),
            fontSize: 36,
        },
        h3: {
            fontFamily: ["Open Sans", "sans-serif"].join(","),
            fontSize: 20,
        },
        h4: {
            fontFamily: ["Open Sans", "sans-serif"].join(","),
            fontSize: 14,
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: shades.secondary[500], //font
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: shades.secondary[500] //border
                        }
                    },
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'white',
                    backgroundColor: shades.primary[400],
                    "&:hover": {
                        backgroundColor: shades.primary[300],
                    }
                }
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    "&.MuiPickersDay-today": {
                        // border: '1px solid yellow',
                        '&:not(.Mui-selected)': {
                            // today: {
                            // border: '1px solid yellow'
                            // }
                        }
                    },
                }
            }
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    backgroundColor: shades.neutral[900], //colors OUTSIDE month
                    "&.Mui-selected": {
                        backgroundColor: shades.secondary[600],
                        "&:hover": {
                            backgroundColor: shades.primary[400],
                        },
                        "&:focus": {
                            backgroundColor: shades.secondary[600],
                        }
                    },
                    "&:hover": {
                        backgroundColor: shades.primary[400],
                    },
                },
                dayOutsideMonth: {
                    backgroundColor: shades.neutral[800], //colors INSIDE month
                },
                today: {
                    border: '1px solid yellow',
                    "&: not(.Mui-selected)": {
                        border: '1px solid yellow',
                    }
                },
            }
        },
        MuiDateCalendar: {
            styleOverrides: {
                root: {
                    // color: 'white',
                    // color:shades.secondary[500], //font
                    // backgroundColor: shades.secondary[100],
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    backgroundColor: shades.neutral[800],
                    border: `1px solid ${shades.neutral[900]}`,
                    "&:hover": {
                        backgroundColor: shades.primary[400],
                    },
                    "&.Mui-selected": {
                        backgroundColor: shades.secondary[600],
                        "&:hover": {
                            backgroundColor: shades.secondary[700],
                        },
                    }
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    border: `1px solid ${shades.neutral[900]}`,
                },
                grouped: {
                    "&: not(:first-of-type)": {
                        border: `1px solid ${shades.neutral[900]}`,
                    }
                }
            }
        },
    },
});
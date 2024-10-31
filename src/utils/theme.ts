import { createTheme } from '@mui/material/styles';
import { WHITE } from '../config/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#264653', // Main color
        },
        secondary: {
            main: '#2A9D8F', // Complementary color
        },
        background: {
            default: '#f7f7f7',
            paper: WHITE,
        },
        text: {
            primary: '#264653',
            secondary: '#777777',
        },
    },
    typography: {
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8, // Consistent border radius
    },
});

export default theme;

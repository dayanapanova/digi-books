import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiContainer: { defaultProps: { maxWidth: 'xl' } },
    }
});

export default theme;

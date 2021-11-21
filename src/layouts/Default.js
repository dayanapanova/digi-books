import React from 'react';
import { Box, Container } from '@mui/material';

const DefaultLayout = ({ children }) => (
    <Box mt={12}>
        <Container>
            {children}
        </Container>
    </Box>
);

export default DefaultLayout;

import { Grid, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import DefaultLayout from '../layouts/Default';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const GENERAL_SETTINGS = [
    {
        label: 'Notifications and emails',
    },
    {
        label: 'User management',
    },
    {
        label: 'Physical libraries',
    },
    {
        label: 'Reading events',
    },
    {
        label: 'Invocing',
    },
    {
        label: 'Book statistic',
    },
    {
        label: 'Readers statistic',
    },
    {
        label: 'Events statistic',
    },
];

const BOOK_SETTINGS = [
    {
        label: 'Manage geners',
    },
    {
        label: 'Book visibility',
    },
    {
        label: 'Authors Database',
    },
    {
        label: 'Book covers',
    },
];

const NavItem = styled(Button)(({ theme }) => `
  position: relative;
  text-transform: none;
  font-size: 18px;
  color: #000;
  font-weight: 600;
  padding: 10px 0;
  justify-content: flex-start;
  text-transform: uppercase;

  & .MuiButton-endIcon {
    position: absolute;
    right: -12px;

    svg {
      font-size: 40px;
      color: ${theme.palette.primary.main};
    }
  }

  &::after {
    content: '';
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 1px;
    background-color: ${theme.palette.primary.main};
    margin-left: 20px;
    flex: 1;
  }
`);

const SettingsNav = ({ items }) => (
    <Stack spacing={1} mt={3}>
        {items?.map(({ label }, index) => (
            <NavItem key={`settings-nav-item-${label}-${index}`} endIcon={<ArrowRightIcon />}>{label}</NavItem>
        ))}
    </Stack>
);

const Settings = () => (
    <DefaultLayout>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant='h5'>General settings</Typography>
                        <SettingsNav items={GENERAL_SETTINGS} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Grid container justifyContent='space-between' alignItems='center'>
                            <Typography gutterBottom={false} variant='h5'>Book settings</Typography>
                            <Button variant='contained' color='secondary'>Add new</Button>
                        </Grid>
                        <SettingsNav items={BOOK_SETTINGS} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </DefaultLayout>
);

export default Settings;

import { useState } from 'react';
import {
    AppBar,
    IconButton as MuiIconButton,
    Stack,
    Container,
    Button,
    Collapse,
    Backdrop,
    Fade,
    Box,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoSVG from '../svg/LogoSVG';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AccountIcon from '../svg/AccountIcon';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../store/AuthenticationSlice';

const HeaderWrapper = styled('div')(({ theme }) => `
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  ${theme.breakpoints.up('sm')} {
    padding: 0;
  }
`);

const NavItem = styled(Button)(({ theme, isActive }) => `
  position: relative;
  color: #000000;
  font-weight: 400;
  border-bottom: 4px solid ${isActive ? theme.palette.secondary.main : 'transparent'};
  border-radius: 0;
  padding: 12px 0;

  ${theme.breakpoints.up('sm')} {
    padding: 18px 6px;
  }
`);

const Logo = styled(LogoSVG)`
  width: 140px;
  cursor: pointer;
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 26px;
    height: 26px;
  }
`;

const BackButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
  color: #000;
  font-weight: 400;

  & .MuiButton-startIcon {
    margin-right: 2px;
  }

  & .MuiSvgIcon-root {
    font-size: 26px;
  }
`;

const NAV_ITEMS = [
    {
        label: 'Library',
        route: '/',
    },
    {
        label: 'Settings',
        route: '/settings',
    }
];

const Navigation = ({ onItemClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isUpSm = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Stack direction={isUpSm ? 'row' : 'column'} spacing={isUpSm ? 6 : 2}>
            {NAV_ITEMS.map(({ label, route }) => (
                <NavItem
                    key={`${label}-${route}`}
                    onClick={(ev) => {
                        navigate(route);
                        if (onItemClick && typeof onItemClick === 'function') {
                            onItemClick(ev);
                        }
                    }}
                    isActive={location?.pathname === route}
                >
                    {label}
                </NavItem>
            ))}
        </Stack>
    )
}

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isUpSm = useMediaQuery(theme.breakpoints.up('sm'));
    const [isOpen, setIsOpen] = useState(false);

    const isSingleBookRoute = location?.pathname.includes('/books');

    const actionsNav = (
        <Stack direction='row' spacing={1}>
            <IconButton color='inherit'>
                <AccountIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(logout())} color='inherit'>
                <LogoutIcon />
            </IconButton>
        </Stack>
    )

    return (
        <>
            <AppBar color='default' sx={{ zIndex: (theme) => theme.zIndex.drawer + 2 }}>
                <Container>
                    <HeaderWrapper>
                        {!isUpSm && (
                            <IconButton onClick={() => setIsOpen(!isOpen)} color='secondary'>
                                <MenuIcon />
                            </IconButton>
                        )}
                        <div>
                            {(isUpSm && isSingleBookRoute) && (
                                <BackButton
                                    startIcon={<ArrowLeftIcon />}
                                    onClick={() => navigate('/')}
                                    variant='text'
                                >
                                    Library
                                </BackButton>
                            )}

                            {isUpSm ? (
                                !isSingleBookRoute ? <Logo onClick={() => navigate('/')} /> : ''
                            ) : (
                                <Logo onClick={() => navigate('/')} />
                            )}
                        </div>

                        {isUpSm && (
                            <Navigation />
                        )}

                        <div>
                            {!isUpSm ? (
                                <Fade in={!isOpen}>
                                    {actionsNav}
                                </Fade>
                            ) : actionsNav}
                        </div>
                    </HeaderWrapper>
                </Container>
                {!isUpSm && (
                    <Collapse in={isOpen}>
                        <Box p={2} display='inline-block'>
                            <Navigation onItemClick={() => setIsOpen(false)} />
                        </Box>
                    </Collapse>
                )}
            </AppBar>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpen}
                onClick={() => setIsOpen(false)}
            />
        </>
    );
}

export default Header;

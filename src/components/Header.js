import {
    AppBar, IconButton as MuiIconButton, Stack, Container, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoSVG from '../svg/LogoSVG';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import AccountIcon from '../svg/AccountIcon';
import { logout } from '../store/AuthenticationSlice';

const HeaderWrapper = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

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

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSingleBookRoute = location?.pathname.includes('/books');

    return (
        <AppBar color='default'>
            <Container>
                <HeaderWrapper>
                    <div>
                        {isSingleBookRoute ? (
                            <BackButton
                                startIcon={<ArrowLeftIcon />}
                                onClick={() => navigate('/')}
                                variant='text'
                            >
                                Library
                            </BackButton>
                        ) : (
                            <Logo onClick={() => navigate('/')} />
                        )}
                    </div>
                    <Stack direction='row' spacing={1}>
                        <IconButton color='inherit'>
                            <AccountIcon />
                        </IconButton>
                        <IconButton onClick={() => dispatch(logout())} color='inherit'>
                            <LogoutIcon />
                        </IconButton>
                    </Stack>
                </HeaderWrapper>
            </Container>
        </AppBar>
    );
}

export default Header;

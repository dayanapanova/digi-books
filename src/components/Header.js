import { AppBar, IconButton as MuiIconButton, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import LogoSVG from '../svg/LogoSVG';
import LogoutIcon from '@mui/icons-material/Logout';
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
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 26px;
    height: 26px;
  }
`;

const Header = () => {
    const dispatch = useDispatch();

    return (
        <AppBar color='default'>
            <Container>
                <HeaderWrapper>
                    <div>
                        <Logo />
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

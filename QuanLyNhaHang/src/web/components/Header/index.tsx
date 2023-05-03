import {styled} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import {makeStyles} from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import UserMenu from './UserMenu';
import {useNavigate} from 'react-router';
import {Logo} from '../../../assets';
import {COLORS} from '../../../utils/color';

export const HEADER_HEIGHT = 64;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<MuiAppBarProps>(({theme}) => ({
  zIndex: theme.zIndex.appBar,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: COLORS.primary,
  boxShadow: 'none',
  color: '#cd5c5c',
  height: HEADER_HEIGHT,
}));

const useStyles = makeStyles({
  headerWrapper: {
    justifyContent: 'space-between',
    padding: '0px 8px',
    minHeight: 48,
  },
});

const Header = () => {
  const navigate = useNavigate();

  const styles = useStyles();
  return (
    <AppBar>
      <Toolbar className={styles.headerWrapper}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
          <img src={Logo} alt="logo" width={50} height={50} />
          <span
            style={{
              color: 'white',
              fontSize: 18,
            }}>
            Wedding Res
          </span>
        </div>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};
export default Header;

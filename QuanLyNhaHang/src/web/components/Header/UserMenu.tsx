import {
  Chat as ChatIcon,
  Logout as LogoutIcon,
  PermIdentity as PermIdentityIcon,
} from '@mui/icons-material';
import {Avatar, Box, Button, IconButton, Zoom} from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {styled} from '@mui/material/styles';
import {AppDispatch, AppState} from '../../../store';
import {IUser} from '../../../type/user';
import {clearResolveBookingId} from '../../../store/global';

const CustomizeButton = styled(Button)(() => ({
  '&.MuiButtonBase-root': {
    justifyContent: 'flex-start',
    padding: '12px',
    color: '#262626',
    borderBottom: '2px solid #f5f5f5',
    gap: '8px',
  },
}));

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };
  return handleClick;
};

interface IUserMenu {}

const UserMenu = (props: IUserMenu) => {
  const [openMenu, setOpenMenu] = useState(false);
  const nagivate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const pUser = useSelector<AppState, IUser>(state => state.user?.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    nagivate('/');
  };
  const handleNavigateDashboard = () => {
    nagivate('/chat');
    setOpenMenu(false);
  };
  const handleNavigateAdmin = () => {
    dispatch(clearResolveBookingId());
    nagivate('/admin');
    setOpenMenu(false);
  };

  useEffect(() => {
    const handleClick = useOutsideClick(ref, () => setOpenMenu(false));
    document.addEventListener('click', handleClick);
  }, []);
  return (
    <StyleUserMenu ref={ref}>
      <Avatar
        className="btn-open-menu m-3"
        onClick={() => setOpenMenu(!openMenu)}
        sx={{width: 32, height: 32}}
        alt={pUser?.name}
        src={pUser?.avatar}
      />
      {openMenu && (
        <Zoom
          in={openMenu}
          style={{
            transformOrigin: '90% 10px 10px',
            transitionDelay: '50ms',
          }}>
          <Box className="menu-box__wrapper">
            <div className="menu-header">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Avatar
                    sx={{width: 40, height: 40}}
                    alt={pUser?.name}
                    src={pUser?.avatar}
                  />
                  <div className="name">{pUser?.name}</div>
                </div>
                <IconButton
                  aria-label="Logout"
                  color="primary"
                  onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </div>
            </div>
            <div className="menu-list">
              <CustomizeButton fullWidth onClick={handleNavigateAdmin}>
                <PermIdentityIcon fontSize="small" />
                <span>Admin</span>
              </CustomizeButton>
              <CustomizeButton fullWidth onClick={handleNavigateDashboard}>
                <ChatIcon fontSize="small" />
                <span>Chat</span>
              </CustomizeButton>
            </div>
          </Box>
        </Zoom>
      )}
    </StyleUserMenu>
  );
};

const StyleUserMenu = styled('div')`
  position: relative;
  .btn-open-menu {
    cursor: pointer;
  }
  .menu-box__wrapper {
    color: #262626;
    right: 0;
    top: 55px;
    position: absolute;
    width: 290px;
    min-width: 240px;
    max-width: 290px;
    background: #fff;
    box-shadow: rgb(0 0 0 / 40%) 0px 1px 4px;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    .menu-header {
      padding: 24px 20px 20px 20px;
      border-bottom: 2px solid #f5f5f5;
      .name {
        font-size: 16px;
        padding-left: 8px;
      }
      .role-name {
        color: #8c8c8c;
        font-size: 12px;
      }
    }
  }
`;

export default UserMenu;

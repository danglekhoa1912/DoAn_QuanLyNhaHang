import {Box, CssBaseline} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import {Header} from '../components';
import {AppDispatch} from '../../store';
import {navigate} from '../../utils/navigate';
import {getUser} from '../../store/user/thunkApi';

const DashboardLayoutContainer = styled(Box)(
  `position: relative;
top: 60px;
height: calc(100vh - 64px);
overflow-y: auto`,
);

const MainLayout = () => {
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch<AppDispatch>();

  if (!token) return <Navigate to={'/'} />;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <DashboardLayoutContainer>
      <CssBaseline />
      <Header />
      <Box style={{height: '100%'}} component="main" id="container">
        <Outlet />
      </Box>
    </DashboardLayoutContainer>
  );
};

export default MainLayout;

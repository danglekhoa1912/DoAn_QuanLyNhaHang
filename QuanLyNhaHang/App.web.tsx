import React from 'react';
import {StyleSheet} from 'react-native';
import LoginPage from './src/web/page/LoginPage';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundPage from './src/web/page/NotFound';
import AdminLayout from './src/web/layout/AdminLayout';
import DishManager from './src/web/page/DishManager';
import {Portal, ThemeProvider} from '@mui/material';
import theme from './src/web/themes';
import ServiceManager from './src/web/page/ServiceManager';
import LobbyManager from './src/web/page/LobbyManager';
import {ADMIN_ROUTES} from './src/web/router';
import MainLayout from './src/web/layout/MainLayout';
import ChatPage from './src/web/page/ChatPage';
import {SnackbarProvider} from 'notistack';
import {SnackbarUtilsConfigurator} from './src/utils/toastWeb';
import {makeStyles} from '@mui/styles';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';

const App = () => {
  const useStyles = makeStyles(theme => ({
    snackbar: {
      zIndex: '500000000 !important',
    },
  }));

  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              classes={{containerRoot: classes.snackbar}}
              maxSnack={300}
              autoHideDuration={3000}
              preventDuplicate
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
              <SnackbarUtilsConfigurator />
              <Routes>
                <Route path={'/'} element={<LoginPage />} />
                <Route element={<MainLayout />}>
                  <Route path="admin" element={<AdminLayout />}>
                    {ADMIN_ROUTES.map(route => (
                      <Route path={route.path} element={route.element} />
                    ))}
                  </Route>
                  <Route path="chat/:userId" element={<ChatPage />} />
                  <Route path="chat" element={<ChatPage />} />
                </Route>
                <Route path={'*'} element={<NotFoundPage />} />
              </Routes>
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </LocalizationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

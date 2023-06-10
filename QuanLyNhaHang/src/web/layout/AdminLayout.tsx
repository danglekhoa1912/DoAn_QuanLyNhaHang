import {Box, Tabs} from '@mui/material';
import {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import TabLink from '../components/TabLink';
import TabPanel from '../components/TabPanel';
import {ADMIN_ROUTES, STAFF_ROUTES} from '../router';
import {AppState} from '../../store';
import {isAdmin} from '../../store/user/selector';
interface IAdminLayoutProps {}

function AdminLayout({}: IAdminLayoutProps) {
  const path = useLocation();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const pIsAdmin = useSelector<AppState>(state => isAdmin(state));

  useEffect(() => {
    const currentPath = path.pathname.split('/')[2];

    if (!currentPath) {
      navigate('/admin/dish-manager');
      return;
    }

    const index = ADMIN_ROUTES.findIndex(item => item.path === currentPath);
    setValue(index);
  }, [path.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // navigate((event.target as HTMLElement)?.pathname)
  };

  return (
    <div style={{height: '100%'}}>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
        }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value != -1 && value}
          onChange={handleChange}
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            minWidth: 160,
            padding: '12px 0',
          }}
          TabIndicatorProps={{
            sx: {
              backgroundColor: 'transparent',
            },
          }}>
          {(pIsAdmin ? ADMIN_ROUTES : STAFF_ROUTES).map((page, index) => (
            <TabLink
              key={index}
              label={page.label}
              href={`/admin/${page.path}`}
            />
          ))}
        </Tabs>
        <TabPanel value={value}>
          <Outlet />
        </TabPanel>
      </Box>
    </div>
  );
}

export default AdminLayout;

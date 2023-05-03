import {Box, Tab, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Link} from 'react-router-dom';
import {COLORS} from '../../../utils/color';

const useStyles = makeStyles<Theme>(theme => ({
  tab: {
    fontWeight: 'bold',
    '&:hover': {
      color: 'red',
    },
    '&.Mui-selected': {
      backgroundColor: COLORS.primary,
      borderRadius: 8,
      margin: '0 8px',
      color: 'white !important',
    },
  },
}));

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
interface LinkTabProps {
  label?: string;
  href?: string;
}
export default function TabLink(props: LinkTabProps) {
  const classes = useStyles();
  return (
    <Tab
      component={Link}
      label={props.label}
      to={props.href || ''}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // event.preventDefault();
      }}
      className={classes.tab}
      {...a11yProps(1)}
      {...props}
    />
  );
}

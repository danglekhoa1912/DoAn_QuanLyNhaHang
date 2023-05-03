import {Box} from '@mui/material';

export interface IMSTabPanelProps {
  children?: React.ReactNode;
  value: number;
}
export default function TabPanel(props: IMSTabPanelProps) {
  const {children, value} = props;
  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${value}`}
      aria-labelledby={`vertical-tab-${value}`}
      style={{flex: 1}}>
      <Box sx={{p: 3}}>{children}</Box>
    </div>
  );
}

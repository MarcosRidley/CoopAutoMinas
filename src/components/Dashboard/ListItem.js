import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Item(props) {
  const {name, update, value} = props;
  let icon;
  if(name === 'Dashboard') {
    icon = <DashboardIcon />;
  } else if(name === 'Consultas/Emissões') {
    icon = <PeopleIcon />;
  } else {
    icon = <BarChartIcon />
  }
  return (
    <ListItemButton>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={name} onClick={ () => update(value) } />
    </ListItemButton>
  );
}
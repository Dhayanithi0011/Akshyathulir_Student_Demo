import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Tooltip } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon, 
  Person as ProfileIcon, 
  Insights as StatsIcon, 
  Gavel as PatentIcon, 
  Handshake as IndustryIcon, 
  Science as ResearchIcon, 
  Hub as AlumniIcon, 
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const drawerWidth = 280;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#1a3e36', 
  color: '#fff',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: '#1a3e36',
  color: '#fff',
});

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      ...(open ? openedMixin(theme) : closedMixin(theme)),
    },
  }),
);

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
  { text: 'Student Entrepreneurship', icon: <StatsIcon />, path: '/stats' },
  { text: 'IP/Patent Filings', icon: <PatentIcon />, path: '/patents' },
  { text: 'Industry Collaboration', icon: <IndustryIcon />, path: '/collaboration' },
  { text: 'Research Commercialization', icon: <ResearchIcon />, path: '/research' },
  { text: 'Alumni Startup Network', icon: <AlumniIcon />, path: '/alumni' },
];

export default function Drawx() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f4f7f6', minHeight: '100vh' }}>
      <StyledDrawer 
        variant="permanent" 
        open={open} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: '#fff', color: '#1a3e36' }}>🎓</Avatar>
          {open && <Typography variant="h6" fontWeight="bold">Institutions</Typography>}
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.96)' }} />
        
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block'}}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  bgcolor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  borderLeft: location.pathname === item.path ? '4px solid #fff' : 'none',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>


        <Box sx={{ marginTop: 'auto', mb: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.99)', mb: 1 }} />
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, color: '#fff', '&:hover': { color: '#ff6b6b' }, '&:active': { color: '#ff6b6b' } }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'inherit' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </StyledDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, bgcolor: '#1a3e36', p: 2, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <Typography variant="h5" fontWeight="bold" color="#fff">Educational Institutional Dashboard</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Account settings">
              <IconButton size="small">
                <Avatar sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
            <IconButton sx={{ color: '#fff', '&:hover': { color: '#ff6b6b' }, '&:active': { color: '#ff6b6b' } }}><LogoutIcon /></IconButton>
          </Box>
        </Box>

        <Outlet /> 
      </Box>
    </Box>
  );
}
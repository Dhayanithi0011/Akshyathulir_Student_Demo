import React, { useState } from 'react';
import {
  Box, Grid, Card, Typography, Button, Stack, Avatar, 
  Chip, LinearProgress, IconButton, TextField, InputAdornment,
  Tooltip as MuiTooltip,
  Divider, Paper, Badge, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

import {
  CorporateFare, 
  HistoryEdu, 
  Science, 
  EmojiObjects, 
  Search, 
  FilterList, 
  MoreVert, 
  AccountBalanceWallet, 
  OpenInNew,
  TrendingUp,
  AccessTime,
  People,
  MonetizationOn,
  CalendarToday,
  Work,
  School,
  Business,
  ArrowForward,
  CheckCircle,
  Warning,
  Schedule,
  Star,
  PieChart as PieChartIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const THEME_COLORS = {
  primary: '#004d40',
  secondary: '#00bfa5',
  bg: '#f8fafb',
  border: '#e0e6ed',
  success: '#34a853',
  warning: '#fbbc04',
  info: '#1a73e8',
  error: '#ea4335'
};

// --- Enhanced Mock Data ---
const collabStats = [
  { label: 'Active MOUs', value: '24', icon: <HistoryEdu />, color: THEME_COLORS.info, change: '+3', trend: 'up' },
  { label: 'CSR Grants (YTD)', value: '₹42L', icon: <AccountBalanceWallet />, color: THEME_COLORS.success, change: '+12%', trend: 'up' },
  { label: 'Joint Patents', value: '12', icon: <EmojiObjects />, color: THEME_COLORS.warning, change: '+2', trend: 'up' },
  { label: 'Industry Mentors', value: '85', icon: <CorporateFare />, color: '#7b1fa2', change: '+8', trend: 'up' },
  { label: 'Startups Supported', value: '156', icon: <Business />, color: THEME_COLORS.primary, change: '+24', trend: 'up' },
  { label: 'Avg Deal Size', value: '₹18L', icon: <MonetizationOn />, color: THEME_COLORS.secondary, change: '+5%', trend: 'up' },
];

const sectorEngagementData = [
  { sector: 'Technology', partnerships: 18, funding: '₹28L', mentors: 32 },
  { sector: 'Healthcare', partnerships: 12, funding: '₹15L', mentors: 18 },
  { sector: 'Manufacturing', partnerships: 8, funding: '₹22L', mentors: 15 },
  { sector: 'Finance', partnerships: 10, funding: '₹18L', mentors: 20 },
  { sector: 'Energy', partnerships: 6, funding: '₹12L', mentors: 12 },
];

const fundingTimeline = [
  { month: 'Jan', committed: 1200000, utilized: 850000 },
  { month: 'Feb', committed: 1500000, utilized: 1100000 },
  { month: 'Mar', committed: 1800000, utilized: 1450000 },
  { month: 'Apr', committed: 2200000, utilized: 1800000 },
  { month: 'May', committed: 2500000, utilized: 2100000 },
  { month: 'Jun', committed: 3000000, utilized: 2600000 },
];

const partnershipTypes = [
  { name: 'Research Collaboration', value: 35, color: '#1a73e8' },
  { name: 'CSR Funding', value: 25, color: '#34a853' },
  { name: 'Infrastructure Support', value: 20, color: '#fbbc04' },
  { name: 'Mentorship', value: 15, color: '#7b1fa2' },
  { name: 'Internship Program', value: 5, color: THEME_COLORS.secondary },
];

const expertPool = [
  { 
    id: 1, 
    name: 'Dr. Sarah Chen', 
    company: 'NVIDIA', 
    domain: 'Edge AI', 
    availability: 'Tue, Thu', 
    sessions: 24,
    rating: 4.8,
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Rajesh Iyer', 
    company: 'Tata Steel', 
    domain: 'Material Science', 
    availability: 'Wednesdays', 
    sessions: 18,
    rating: 4.6,
    status: 'Active'
  },
];

const upcomingEvents = [
  { id: 1, title: 'Microsoft R&D Visit', date: 'Jan 15', participants: 12, status: 'Confirmed' },
  { id: 2, title: 'AWS Cloud Workshop', date: 'Jan 22', participants: 25, status: 'Confirmed' },
  { id: 3, title: 'Siemens Industry 4.0', date: 'Jan 28', participants: 18, status: 'Pending' },
  { id: 4, title: 'FinTech Investor Meet', date: 'Feb 5', participants: 30, status: 'Confirmed' },
];

const industryRows = [
  { 
    id: 1, 
    partner: 'AWS', 
    type: 'Cloud Credits', 
    validity: 'Dec 2026', 
    status: 'Active', 
    utilization: 65,
    value: '₹50L',
    contact: 'John Smith',
    renewIn: '8 months'
  },
  { 
    id: 2, 
    partner: 'Siemens', 
    type: 'Center of Excellence', 
    validity: 'Mar 2028', 
    status: 'Active', 
    utilization: 40,
    value: '₹1.2Cr',
    contact: 'Maria Garcia',
    renewIn: '14 months'
  },
  { 
    id: 3, 
    partner: 'HDFC Bank', 
    type: 'CSR - Rural Fintech', 
    validity: 'Jan 2026', 
    status: 'Expiring Soon', 
    utilization: 90,
    value: '₹35L',
    contact: 'Rajesh Kumar',
    renewIn: '1 month'
  },
  { 
    id: 4, 
    partner: 'Tata Motors', 
    type: 'EV Research Lab', 
    validity: 'Sep 2027', 
    status: 'Active', 
    utilization: 75,
    value: '₹2.5Cr',
    contact: 'Priya Sharma',
    renewIn: '20 months'
  },
  { 
    id: 5, 
    partner: 'Infosys', 
    type: 'Digital Innovation', 
    validity: 'Jun 2026', 
    status: 'Active', 
    utilization: 55,
    value: '₹75L',
    contact: 'David Lee',
    renewIn: '5 months'
  },
];

// --- Enhanced Sub-Components ---

const StatCard = ({ label, value, icon, color, change, trend }) => (
  <Card sx={{ 
    p: 2.5, 
    borderRadius: 3, 
    border: `1px solid ${THEME_COLORS.border}`, 
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    height: '100%'
  }}>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ 
          bgcolor: `${color}15`, 
          color: color,
          width: 48,
          height: 48
        }}>
          {icon}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight="800">{value}</Typography>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <TrendingUp sx={{ 
          fontSize: 16, 
          color: trend === 'up' ? THEME_COLORS.success : THEME_COLORS.error 
        }} />
        <Typography variant="caption" sx={{ 
          color: trend === 'up' ? THEME_COLORS.success : THEME_COLORS.error,
          fontWeight: 'bold'
        }}>
          {change}
        </Typography>
        <Typography variant="caption" color="text.secondary">this quarter</Typography>
      </Stack>
    </Stack>
  </Card>
);

const EventCard = ({ title, date, participants, status }) => (
  <Paper sx={{ 
    p: 2, 
    borderRadius: 2, 
    border: `1px solid ${THEME_COLORS.border}`,
    '&:hover': { bgcolor: '#f8fafb' }
  }}>
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="subtitle2" fontWeight="600">{title}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <CalendarToday sx={{ fontSize: 14, color: THEME_COLORS.primary }} />
            <Typography variant="caption" color="text.secondary">{date}</Typography>
          </Stack>
        </Box>
        <Chip 
          label={status} 
          size="small" 
          sx={{ 
            bgcolor: status === 'Confirmed' ? `${THEME_COLORS.success}15` : `${THEME_COLORS.warning}15`,
            color: status === 'Confirmed' ? THEME_COLORS.success : THEME_COLORS.warning,
            fontWeight: 'bold'
          }}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <People sx={{ fontSize: 14, color: THEME_COLORS.info }} />
          <Typography variant="caption">{participants} startups</Typography>
        </Stack>
        <Button 
          size="small" 
          endIcon={<ArrowForward />}
          sx={{ 
            color: THEME_COLORS.primary,
            ml: 'auto',
            textTransform: 'none'
          }}
        >
          Details
        </Button>
      </Stack>
    </Stack>
  </Paper>
);

export default function IndustryCollaboration() {
  const [timeFilter, setTimeFilter] = useState('6m');

  return (
    <Box sx={{ p: 4, bgcolor: THEME_COLORS.bg, minHeight: '100vh' }}>
      
      {/* Header */}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" color={THEME_COLORS.primary} gutterBottom>
            Industry Collaboration Hub
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Managing corporate partnerships, CSR pipelines, and industry mentorships
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeFilter}
              label="Time Range"
              onChange={(e) => setTimeFilter(e.target.value)}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="3m">Last 3 Months</MenuItem>
              <MenuItem value="6m">Last 6 Months</MenuItem>
              <MenuItem value="1y">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<FilterList />} sx={{ borderRadius: 2 }}>
            Export Report
          </Button>
          <Button variant="contained" sx={{ 
            bgcolor: THEME_COLORS.primary, 
            borderRadius: 2,
            '&:hover': { bgcolor: '#00382c' }
          }}>
            + New MOU
          </Button>
        </Stack>
      </Stack>

      {/* Top Stats */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        {collabStats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={i} sx={{ height: "140px" }}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Left Column - Charts */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Funding Timeline Chart */}
            <Grid item xs={12}>
              <Card sx={{ 
                borderRadius: 3, 
                border: `1px solid ${THEME_COLORS.border}`, 
                boxShadow: 'none',
                p: 3
              }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color={THEME_COLORS.primary}>
                      Funding Utilization Timeline
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Committed vs Utilized CSR Funds (₹ Thousands)
                    </Typography>
                  </Box>
                  <Chip 
                    icon={<TrendingUp />}
                    label="₹26L Utilized" 
                    size="small" 
                    sx={{ bgcolor: `${THEME_COLORS.success}15`, color: THEME_COLORS.success }}
                  />
                </Stack>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fundingTimeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666' }}
                        tickFormatter={(value) => `₹${value/1000}K`}
                      />
                      <RechartsTooltip 
                        formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="committed" 
                        stroke={THEME_COLORS.info} 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Committed Funds"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="utilized" 
                        stroke={THEME_COLORS.success} 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Utilized Funds"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>

            {/* Sector Engagement Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                borderRadius: 3, 
                border: `1px solid ${THEME_COLORS.border}`, 
                boxShadow: 'none',
                p: 3,
                height: '100%'
              }}>
                <Typography variant="h6" fontWeight="bold" color={THEME_COLORS.primary} sx={{ mb: 3 }}>
                  Sector-wise Engagement
                </Typography>
                <Box sx={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="sector" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#666' }}
                      />
                      <RechartsTooltip />
                      <Legend />
                      <Bar 
                        dataKey="partnerships" 
                        name="Partnerships" 
                        fill={THEME_COLORS.info}
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="mentors" 
                        name="Mentors" 
                        fill={THEME_COLORS.secondary}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>

            {/* Partnership Types Pie Chart */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                borderRadius: 3, 
                border: `1px solid ${THEME_COLORS.border}`, 
                boxShadow: 'none',
                p: 3,
                height: '100%'
              }}>
                <Typography variant="h6" fontWeight="bold" color={THEME_COLORS.primary} sx={{ mb: 3 }}>
                  Partnership Types Distribution
                </Typography>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={partnershipTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {partnershipTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  {partnershipTypes.map((type, index) => (
                    <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 10, height: 10, bgcolor: type.color, borderRadius: '50%' }} />
                        <Typography variant="caption">{type.name}</Typography>
                      </Stack>
                      <Typography variant="caption" fontWeight="bold">{type.value}%</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column - Expert Pool & Events */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Industry Expert Pool */}
            <Card sx={{ 
              borderRadius: 3, 
              border: `1px solid ${THEME_COLORS.border}`, 
              boxShadow: 'none',
              height: '100%'
            }}>
              <Box sx={{ p: 3, borderBottom: `1px solid ${THEME_COLORS.border}` }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="bold">Expert Mentors Pool</Typography>
                  <Chip 
                    label={`${expertPool.length} Active`} 
                    size="small" 
                    sx={{ bgcolor: `${THEME_COLORS.success}15`, color: THEME_COLORS.success }}
                  />
                </Stack>
              </Box>
              <Stack spacing={0} divider={<Divider />}>
                {expertPool.map((expert) => (
                  <Box key={expert.id} sx={{ p: 2.5, '&:hover': { bgcolor: '#f8fafb' } }}>
                    <Stack spacing={1.5}>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Avatar sx={{ bgcolor: THEME_COLORS.primary }}>{expert.name[0]}</Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" fontWeight="bold">{expert.name}</Typography>
                          <Typography variant="caption" display="block" color="text.secondary">
                            {expert.company} • {expert.domain}
                          </Typography>
                        </Box>
                        <Stack alignItems="flex-end">
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Star sx={{ fontSize: 14, color: THEME_COLORS.warning }} />
                            <Typography variant="caption" fontWeight="bold">{expert.rating}</Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary">{expert.sessions} sessions</Typography>
                        </Stack>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Chip 
                          label={expert.availability} 
                          size="small" 
                          variant="outlined"
                          sx={{ borderColor: THEME_COLORS.border }}
                        />
                        <Chip 
                          label={expert.status} 
                          size="small" 
                          sx={{ 
                            bgcolor: expert.status === 'Highly Active' ? `${THEME_COLORS.success}15` : `${THEME_COLORS.info}15`,
                            color: expert.status === 'Highly Active' ? THEME_COLORS.success : THEME_COLORS.info,
                            fontSize: '0.7rem'
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
              <Box sx={{ p: 2, borderTop: `1px solid ${THEME_COLORS.border}` }}>
                <Button 
                  fullWidth 
                  endIcon={<ArrowForward />}
                  sx={{ color: THEME_COLORS.primary, textTransform: 'none' }}
                >
                  View All Experts
                </Button>
              </Box>
            </Card>

            {/* Upcoming Events */}
            <Card sx={{ 
              borderRadius: 3, 
              border: `1px solid ${THEME_COLORS.border}`, 
              boxShadow: 'none'
            }}>
              <Box sx={{ p: 3, borderBottom: `1px solid ${THEME_COLORS.border}` }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight="bold">Upcoming Events</Typography>
                  <Badge 
                    badgeContent={upcomingEvents.filter(e => e.status === 'Confirmed').length} 
                    color="success"
                    sx={{ '& .MuiBadge-badge': { bgcolor: THEME_COLORS.success } }}
                  >
                    <CalendarToday sx={{ color: THEME_COLORS.primary }} />
                  </Badge>
                </Stack>
              </Box>
              <Stack spacing={2} sx={{ p: 3 }}>
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Partnership Management Table - Full Width */}
        <Grid item xs={12}>
          <Card sx={{ 
            borderRadius: 3, 
            border: `1px solid ${THEME_COLORS.border}`, 
            boxShadow: 'none',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              p: 3, 
              borderBottom: `1px solid ${THEME_COLORS.border}`,
              bgcolor: '#fafafa'
            }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6" fontWeight="bold">Active Corporate Partnerships</Typography>
                  <Typography variant="caption" color="text.secondary">
                    24 active partnerships • ₹4.3Cr total value
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField 
                    size="small" 
                    placeholder="Search Partner..." 
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><Search sx={{ color: '#666' }} /></InputAdornment>,
                      sx: { borderRadius: 2 }
                    }}
                    sx={{ width: 250 }}
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Filter
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={industryRows}
                columns={[
                  { 
                    field: 'partner', 
                    headerName: 'Industry Partner', 
                    flex: 1.2, 
                    renderCell: (p) => (
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32, 
                          bgcolor: THEME_COLORS.primary,
                          fontSize: '0.875rem'
                        }}>
                          {p.value[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">{p.value}</Typography>
                          <Typography variant="caption" color="text.secondary">{p.row.contact}</Typography>
                        </Box>
                      </Stack>
                    )
                  },
                  { 
                    field: 'type', 
                    headerName: 'Collaboration Type', 
                    flex: 1.2,
                    renderCell: (p) => (
                      <Chip 
                        label={p.value} 
                        size="small" 
                        sx={{ 
                          bgcolor: `${THEME_COLORS.info}15`,
                          color: THEME_COLORS.info,
                          fontWeight: 'bold'
                        }}
                      />
                    )
                  },
                  { 
                    field: 'value', 
                    headerName: 'Deal Value', 
                    flex: 1,
                    renderCell: (p) => (
                      <Typography variant="body2" fontWeight="600">
                        {p.value}
                      </Typography>
                    )
                  },
                  { 
                    field: 'utilization', 
                    headerName: 'Resource Utilization', 
                    flex: 1.5, 
                    renderCell: (p) => (
                      <Box sx={{ width: '100%' }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                          <Typography variant="caption">{p.value}% utilized</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Renew in: {p.row.renewIn}
                          </Typography>
                        </Stack>
                        <LinearProgress 
                          variant="determinate" 
                          value={p.value} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: p.value > 80 ? THEME_COLORS.success : 
                                      p.value > 50 ? THEME_COLORS.info : THEME_COLORS.warning,
                              borderRadius: 3
                            }
                          }} 
                        />
                      </Box>
                    )
                  },
                  { 
                    field: 'status', 
                    headerName: 'Status', 
                    flex: 0.8, 
                    renderCell: (p) => (
                      <Chip 
                        label={p.value} 
                        size="small" 
                        sx={{ 
                          bgcolor: p.value === 'Active' ? `${THEME_COLORS.success}15` : `${THEME_COLORS.warning}15`,
                          color: p.value === 'Active' ? THEME_COLORS.success : THEME_COLORS.warning,
                          fontWeight: 'bold'
                        }} 
                      />
                    )
                  },
                  { 
                    field: 'actions', 
                    headerName: 'Actions', 
                    width: 120, 
                    renderCell: () => (
                      <Stack direction="row" spacing={1}>
                        <MuiTooltip title="View Details">
                          <IconButton size="small">
                            <OpenInNew sx={{ fontSize: 18, color: THEME_COLORS.primary }} />
                          </IconButton>
                        </MuiTooltip>
                        <MuiTooltip title="More Options">
                          <IconButton size="small">
                            <MoreVert sx={{ fontSize: 18, color: '#666' }} />
                          </IconButton>
                        </MuiTooltip>
                      </Stack>
                    )
                  }
                ]}
                sx={{ 
                  border: 'none',
                  '& .MuiDataGrid-columnHeaders': { 
                    bgcolor: '#fafafa', 
                    borderBottom: `1px solid ${THEME_COLORS.border}`,
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  },
                  '& .MuiDataGrid-cell': { 
                    borderBottom: `1px solid ${THEME_COLORS.border}`,
                  },
                  '& .MuiDataGrid-row:hover': {
                    bgcolor: '#f8fafb'
                  }
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                  sorting: { sortModel: [{ field: 'utilization', sort: 'desc' }] }
                }}
                pageSizeOptions={[5, 10, 25]}
              />
            </Box>
          </Card>
        </Grid>

        {/* CSR & Funding Pipeline */}
        <Grid item xs={12}>
          <Card sx={{ 
            p: 3, 
            borderRadius: 3, 
            bgcolor: THEME_COLORS.primary, 
            color: 'white',
            background: `linear-gradient(135deg, ${THEME_COLORS.primary} 0%, ${THEME_COLORS.secondary} 100%)`
          }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" fontWeight="bold">Upcoming Industry Visit: Microsoft R&D</Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <CalendarToday sx={{ opacity: 0.9 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Scheduled for Jan 15th • 10:00 AM - 4:00 PM
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <People sx={{ opacity: 0.9 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      12 Startups selected for "Pitch-to-Corporate" session
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Work sx={{ opacity: 0.9 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Focus areas: AI/ML, Cloud Computing, IoT Solutions
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Stack spacing={2} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                  <Chip 
                    label="Confirmed" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: 'white', 
                      color: THEME_COLORS.primary,
                      borderRadius: 2,
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                    endIcon={<ArrowForward />}
                  >
                    Manage Schedule
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
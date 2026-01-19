import React, { useState, useMemo } from 'react';
import { 
  Grid, Paper, Typography, Box, Card, CardContent, 
  Stack, Avatar, LinearProgress,
  Container, MenuItem, Select, FormControl, InputLabel,
  Chip
} from '@mui/material';
import { 
  RocketLaunch, Gavel, Handshake, Science, 
  FilterList, CalendarToday,
  BusinessCenter, CurrencyRupee, EmojiEvents, TrendingUp,
  ArrowUpward
} from '@mui/icons-material';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// --- Configuration & Theming ---
const COLORS = {
  primary: '#15573F',
  accent: '#2E8B57',
  lightGreen: '#F1F8F5',
  borderLight: '#D4E6DF',
  darkGreen: '#0C3B2E',
  chartColors: ['#2E8B57', '#3CB371', '#66CDAA', '#98FB98', '#A9DFBF']
};

const FILTER_OPTIONS = {
  timePeriod: [
    { value: 'monthly', label: 'Last Month' },
    { value: 'quarterly', label: 'Last Quarter' },
    { value: 'yearly', label: 'Last Year' }
  ],
  department: [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'science', label: 'Science' }
  ]
};

// --- Mock Data Object ---
const dataByFilter = {
  monthly: {
    stats: [
      { title: "Active Startups", value: "42", change: "+12%", icon: <RocketLaunch />, color: "#2E8B57" },
      { title: "IP / Patents", value: "18", change: "+8%", icon: <Gavel />, color: "#4682B4" },
      { title: "Industry Partners", value: "24", change: "+15%", icon: <Handshake />, color: "#FF8C00" },
      { title: "Research Projects", value: "128", change: "+22%", icon: <Science />, color: "#9C27B0" }
    ],
    // DATA FROM YOUR IMAGE (Adjusted for monthly)
    kpiStats: [
      { title: "Industry Collaborations", subtitle: "Active partnerships", value: "12", change: "+5%", icon: <BusinessCenter />, color: "#15573F" },
      { title: "Total Funding", subtitle: "Raised this month", value: "₹1.2Cr", change: "+10%", icon: <CurrencyRupee />, color: "#15573F" },
      { title: "Awards Received", subtitle: "National/International", value: "4", change: "+2%", icon: <EmojiEvents />, color: "#15573F" },
      { title: "Success Rate", subtitle: "Graduated startups", value: "81%", change: "+3%", icon: <TrendingUp />, color: "#15573F" }
    ],
    chartData: [{ name: 'Wk 1', startups: 32 }, { name: 'Wk 2', startups: 34 }, { name: 'Wk 3', startups: 38 }, { name: 'Wk 4', startups: 42 }],
    pipelineData: [{ stage: 'Ideation', value: 60, color: '#2196F3' }, { stage: 'Prototype', value: 35, color: '#FF9800' }, { stage: 'Market Ready', value: 12, color: '#4CAF50' }, { stage: 'Scaling', value: 5, color: '#9C27B0' }],
    fundingData: [{ type: 'Seed', amount: 22, color: COLORS.chartColors[0] }, { type: 'Series A', amount: 14, color: COLORS.chartColors[1] }, { type: 'Series B', amount: 8, color: COLORS.chartColors[2] }, { type: 'Series C+', amount: 5, color: COLORS.chartColors[3] }],
    stageData: [{ name: 'Tech', value: 30, color: COLORS.chartColors[0] }, { name: 'Social', value: 22, color: COLORS.chartColors[1] }, { name: 'Healthcare', value: 18, color: COLORS.chartColors[2] }, { name: 'Education', value: 12, color: COLORS.chartColors[3] }]
  },
  quarterly: {
    stats: [
      { title: "Active Startups", value: "58", change: "+25%", icon: <RocketLaunch />, color: "#2E8B57" },
      { title: "IP / Patents", value: "24", change: "+33%", icon: <Gavel />, color: "#4682B4" },
      { title: "Industry Partners", value: "32", change: "+20%", icon: <Handshake />, color: "#FF8C00" },
      { title: "Research Projects", value: "156", change: "+18%", icon: <Science />, color: "#9C27B0" }
    ],
    // DATA EXACTLY AS PER YOUR IMAGE
    kpiStats: [
      { title: "Industry Collaborations", subtitle: "Active partnerships", value: "48", change: "+12%", icon: <BusinessCenter />, color: "#15573F" },
      { title: "Total Funding", subtitle: "Raised this quarter", value: "₹6.8Cr", change: "+24%", icon: <CurrencyRupee />, color: "#15573F" },
      { title: "Awards Received", subtitle: "National/International", value: "24", change: "+18%", icon: <EmojiEvents />, color: "#15573F" },
      { title: "Success Rate", subtitle: "Graduated startups", value: "84%", change: "+8%", icon: <TrendingUp />, color: "#15573F" }
    ],
    chartData: [{ name: 'Jan', startups: 32 }, { name: 'Feb', startups: 38 }, { name: 'Mar', startups: 45 }, { name: 'Apr', startups: 58 }],
    pipelineData: [{ stage: 'Ideation', value: 65, color: '#2196F3' }, { stage: 'Prototype', value: 40, color: '#FF9800' }, { stage: 'Market Ready', value: 15, color: '#4CAF50' }, { stage: 'Scaling', value: 8, color: '#9C27B0' }],
    fundingData: [{ type: 'Seed', amount: 28, color: COLORS.chartColors[0] }, { type: 'Series A', amount: 18, color: COLORS.chartColors[1] }, { type: 'Series B', amount: 12, color: COLORS.chartColors[2] }, { type: 'Series C+', amount: 8, color: COLORS.chartColors[3] }],
    stageData: [{ name: 'Tech', value: 35, color: COLORS.chartColors[0] }, { name: 'Social', value: 25, color: COLORS.chartColors[1] }, { name: 'Healthcare', value: 20, color: COLORS.chartColors[2] }, { name: 'Education', value: 15, color: COLORS.chartColors[3] }]
  },
  yearly: {
    stats: [
      { title: "Active Startups", value: "142", change: "+45%", icon: <RocketLaunch />, color: "#2E8B57" },
      { title: "IP / Patents", value: "84", change: "+52%", icon: <Gavel />, color: "#4682B4" },
      { title: "Industry Partners", value: "76", change: "+30%", icon: <Handshake />, color: "#FF8C00" },
      { title: "Research Projects", value: "412", change: "+25%", icon: <Science />, color: "#9C27B0" }
    ],
    kpiStats: [
      { title: "Industry Collaborations", subtitle: "Active partnerships", value: "156", change: "+35%", icon: <BusinessCenter />, color: "#15573F" },
      { title: "Total Funding", subtitle: "Raised this year", value: "₹24Cr", change: "+40%", icon: <CurrencyRupee />, color: "#15573F" },
      { title: "Awards Received", subtitle: "National/International", value: "92", change: "+22%", icon: <EmojiEvents />, color: "#15573F" },
      { title: "Success Rate", subtitle: "Graduated startups", value: "89%", change: "+12%", icon: <TrendingUp />, color: "#15573F" }
    ],
    chartData: [{ name: 'Q1', startups: 85 }, { name: 'Q2', startups: 105 }, { name: 'Q3', startups: 125 }, { name: 'Q4', startups: 142 }],
    pipelineData: [{ stage: 'Ideation', value: 75, color: '#2196F3' }, { stage: 'Prototype', value: 55, color: '#FF9800' }, { stage: 'Market Ready', value: 30, color: '#4CAF50' }, { stage: 'Scaling', value: 15, color: '#9C27B0' }],
    fundingData: [{ type: 'Seed', amount: 65, color: COLORS.chartColors[0] }, { type: 'Series A', amount: 42, color: COLORS.chartColors[1] }, { type: 'Series B', amount: 22, color: COLORS.chartColors[2] }, { type: 'Series C+', amount: 13, color: COLORS.chartColors[3] }],
    stageData: [{ name: 'Tech', value: 45, color: COLORS.chartColors[0] }, { name: 'Social', value: 20, color: COLORS.chartColors[1] }, { name: 'Healthcare', value: 25, color: COLORS.chartColors[2] }, { name: 'Education', value: 10, color: COLORS.chartColors[3] }]
  }
};

// --- Updated Sub-Components ---

const StatCard = ({ title, subtitle, value, change, icon, color }) => (
  <Card sx={{ 
    borderRadius: '12px', height: '100%', bgcolor: '#FFFFFF',
    border: `1px solid ${COLORS.borderLight}`,
    boxShadow: 'none',
    transition: 'all 0.2s ease',
    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
  }}>
    <CardContent sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar sx={{ bgcolor: '#F1F8F5', color: COLORS.accent, width: 48, height: 48, borderRadius: '8px' }}>
          {React.cloneElement(icon, { sx: { fontSize: 24 } })}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#0C3B2E', lineHeight: 1 }}>{value}</Typography>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 0.5, color: '#0C3B2E' }}>{title}</Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#666', fontWeight: 500 }}>{subtitle}</Typography>
            <Chip 
              label={change} size="small"
              sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 700, fontSize: '0.65rem', height: 20 }}
            />
          </Stack>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const FilterBar = ({ filters, onFilterChange }) => (
  <Paper sx={{ p: 2, mb: 3, borderRadius: '10px', border: `1px solid ${COLORS.borderLight}`, boxShadow: 'none' }}>
    <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <FilterList sx={{ color: COLORS.accent, fontSize: 20 }} />
        <Typography variant="subtitle2" fontWeight={700} color={COLORS.darkGreen}>FILTERS</Typography>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flex: 1 }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Time Period</InputLabel>
          <Select value={filters.timePeriod} label="Time Period" onChange={(e) => onFilterChange('timePeriod', e.target.value)}>
            {FILTER_OPTIONS.timePeriod.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Department</InputLabel>
          <Select value={filters.department} label="Department" onChange={(e) => onFilterChange('department', e.target.value)}>
            {FILTER_OPTIONS.department.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  </Paper>
);

// --- Main Dashboard Component ---

export default function MainDash() {
  const [filters, setFilters] = useState({ timePeriod: 'quarterly', department: 'all' });

  const handleFilterChange = (type, val) => setFilters(prev => ({ ...prev, [type]: val }));

  const currentData = useMemo(() => {
    return dataByFilter[filters.timePeriod] || dataByFilter.quarterly;
  }, [filters.timePeriod]);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#F9FBF9', minHeight: '100vh', pb: 5 }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
        
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Top Overview Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {currentData.stats.map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
                {/* Standard Stat Card */}
                <Card sx={{ borderRadius: '10px', border: `1px solid ${COLORS.borderLight}`, boxShadow: 'none' }}>
                    <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ bgcolor: `${stat.color}15`, color: stat.color }}>{stat.icon}</Avatar>
                            <Box>
                                <Typography variant="h5" fontWeight={800}>{stat.value}</Typography>
                                <Typography variant="caption" fontWeight={600} color="textSecondary">{stat.title}</Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Growth Chart */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: '12px', border: `1px solid ${COLORS.borderLight}`, boxShadow: 'none', minWidth: 0 }}>
          <Typography variant="h6" fontWeight={700} color={COLORS.darkGreen} gutterBottom>Growth Trends</Typography>
          <Box sx={{ height: 350, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData.chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="startups" stroke={COLORS.accent} strokeWidth={3} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* NEW SECTION: KEY PERFORMANCE INDICATORS (Matching your image) */}
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={700} color={COLORS.darkGreen} sx={{ mb: 2 }}>
                Key Performance Indicators
            </Typography>
            <Grid container spacing={2}>
            {currentData.kpiStats.map((stat, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                    <StatCard {...stat} />
                </Grid>
            ))}
            </Grid>
        </Box>

        {/* Bottom Distribution Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: '12px', border: `1px solid ${COLORS.borderLight}`, boxShadow: 'none' }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>Incubation Pipeline</Typography>
              {currentData.pipelineData.map((item) => (
                <Box key={item.stage} sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{item.stage}</Typography>
                    <Typography variant="body2" fontWeight={700} color={item.color}>{item.value}%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={item.value} sx={{ height: 6, borderRadius: 3, bgcolor: '#F0F0F0', '& .MuiLinearProgress-bar': { bgcolor: item.color } }} />
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: '12px', border: `1px solid ${COLORS.borderLight}`, boxShadow: 'none', minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>Funding Stages</Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData.fundingData}>
                    <XAxis dataKey="type" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {currentData.fundingData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: '12px', border: `1px solid ${COLORS.borderLight}`, boxShadow: 'none', minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>Startup Categories</Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={currentData.stageData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {currentData.stageData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}
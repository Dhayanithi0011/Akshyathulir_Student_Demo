import React, { memo } from 'react';
import {
  Box, Typography, Grid, Paper, Button, Avatar,
  Chip, Divider, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Stack, LinearProgress, Container
} from '@mui/material';

import {
  RocketLaunch, AccountBalance, TrendingUp, People, InfoOutlined
} from '@mui/icons-material';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';

/* ======================
   CROP SMILE THEME SYSTEM
====================== */
const COLORS = {
  primary: '#0a231e',    // Deep forest green from sidebar
  accent: '#4caf50',     // Vibrant green from buttons/stats
  bg: '#f7fff7',         // Updated: rgb(247, 255, 247) - Very light mint green
  border: '#eef2f1',     // Soft border color
  textMain: '#2d3436',
  textSecondary: '#636e72',
  chipAgri: '#e8f5e9'    // Light green for tags
};

const CARD_SX = {
  bgcolor: '#fff',
  borderRadius: '16px',
  border: `1px solid ${COLORS.border}`,
  boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
  }
};

/* ======================
   DATA (Unchanged Content)
====================== */
const KPI_DATA = [
  { title: 'Total Startups', value: '129', trend: '+8%', icon: <RocketLaunch />, color: '#4caf50' },
  { title: 'Active Founders', value: '184', trend: '+12', icon: <People />, color: '#2196f3' },
  { title: 'Institutional Funding', value: '₹4.8 Cr', trend: 'Verified', icon: <AccountBalance />, color: '#e91e63' },
  { title: 'Success Rate', value: '84%', trend: 'Stable', icon: <TrendingUp />, color: '#ff9800' }
];

const GROWTH_DATA = [
  { name: 'Jan', value: 300 }, { name: 'Feb', value: 450 }, { name: 'Mar', value: 380 },
  { name: 'Apr', value: 700 }, { name: 'May', value: 600 }, { name: 'Jun', value: 1100 }
];

const FUNDING_DISTRIBUTION = [
  { name: 'Seed', value: 35, color: '#4caf50' },
  { name: 'Pre-Series A', value: 25, color: '#8bc34a' },
  { name: 'Series A', value: 20, color: '#0a231e' },
  { name: 'Bootstrapped', value: 20, color: '#cddc39' }
];

const IDEA_STATS = [
  { domain: 'AI / ML', ideas: 18 }, { domain: 'HealthTech', ideas: 12 },
  { domain: 'EdTech', ideas: 15 }, { domain: 'FinTech', ideas: 10 }, { domain: 'AgriTech', ideas: 8 }
];

const STARTUP_IDEAS = [
  { title: 'Smart Crop Advisory', domain: 'AgriTech', description: 'AI-powered crop yield and fertilizer planning.', stage: 'Ideation' },
  { title: 'AI Interview Coach', domain: 'EdTech', description: 'Mock interviews with real-time AI feedback.', stage: 'Prototype' },
  { title: 'Remote Health Monitor', domain: 'HealthTech', description: 'Wearable-based patient monitoring system.', stage: 'MVP' }
];

const VENTURES = [
  { name: 'NeuralFarm AI', lead: 'Arjun V.', stage: 'MVP', funding: '₹2.5L' },
  { name: 'QuickLearn', lead: 'Sara Khan', stage: 'Scaling', funding: '₹12.0L' },
  { name: 'BioHeal Hub', lead: 'Leo Das', stage: 'Ideation', funding: '--' }
];

const ALUMNI_DATA = [
  { name: 'Siddharth Kumar', batch: '2018', role: 'Founder & CEO', startup: 'NeuralFarm AI', status: 'Mentor' },
  { name: 'Ananya Mehta', batch: '2019', role: 'CTO', startup: 'QuickLearn', status: 'Investor' },
  { name: 'Rahul Verma', batch: '2017', role: 'Product Lead', startup: 'BioHeal Hub', status: 'Founder' }
];

/* ======================
   MAIN COMPONENT
====================== */
export default function Alumni() {
  return (
    <Box bgcolor={COLORS.bg} minHeight="100vh">
      <SubHeader />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* KPI Cards */}
        <Grid container spacing={3} mb={4}>
          {KPI_DATA.map(kpi => <KPICard key={kpi.title} {...kpi} />)}
        </Grid>

        {/* Three Charts in Single Row */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} lg={5}>
            <AnalyticsChart />
          </Grid>
          <Grid item xs={12} lg={3}>
            <FundingPieChart />
          </Grid>
          <Grid item xs={12} lg={4}>
            <StartupIdeasChart />
          </Grid>
        </Grid>

        {/* Single Row: Three Startup Idea Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <IdeaCard 
              title="Smart Crop Advisory"
              domain="AgriTech"
              description="AI-powered crop yield and fertilizer planning."
              stage="Ideation"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <IdeaCard 
              title="AI Interview Coach"
              domain="EdTech"
              description="Mock interviews with real-time AI feedback."
              stage="Prototype"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <IdeaCard 
              title="Remote Health Monitor"
              domain="HealthTech"
              description="Wearable-based patient monitoring system."
              stage="MVP"
            />
          </Grid>
        </Grid>

        {/* Alumni Network and Portfolio Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AlumniSection />
          </Grid>
          <Grid item xs={12}>
            <PortfolioTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* ======================
   THEMED COMPONENTS
====================== */

const SubHeader = memo(() => (
  <Box bgcolor="white" borderBottom={`1px solid ${COLORS.border}`} py={3}>
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={800} color={COLORS.primary}>Alumni Startup Network</Typography>
        <Button 
          variant="contained" 
          sx={{ bgcolor: COLORS.accent, '&:hover': { bgcolor: '#388e3c' }, textTransform: 'none', borderRadius: '8px', fontWeight: 600 }}
        >
          New Application
        </Button>
      </Stack>
    </Container>
  </Box>
));

const KPICard = memo(({ title, value, trend, icon, color }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Paper sx={{ ...CARD_SX, p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: 'transparent', border: `1px solid ${COLORS.border}`, color: color }}>{icon}</Avatar>
          <Typography variant="subtitle2" fontWeight={600} color={COLORS.textSecondary}>{title}</Typography>
        </Stack>
        <InfoOutlined sx={{ fontSize: 18, color: '#b2bec3' }} />
      </Stack>
      <Box mt={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Typography variant="h4" fontWeight={800} color={COLORS.primary}>{value}</Typography>
          <Chip 
            label={trend} 
            size="small" 
            sx={{ bgcolor: COLORS.chipAgri, color: COLORS.accent, fontWeight: 700, fontSize: '0.7rem' }} 
          />
        </Stack>
      </Box>
    </Paper>
  </Grid>
));

const IdeaCard = memo(({ title, domain, description, stage }) => (
  <Paper 
    sx={{ 
      ...CARD_SX, 
      p: 3, 
      height: '100%',
      border: `2px solid #e8f5e9`,
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 30px rgba(76, 175, 80, 0.12)',
        borderColor: '#4caf50',
        bgcolor: '#f9fdf9'
      }
    }}
  >
    <Typography variant="h6" fontWeight={800} color={COLORS.primary} mb={1}>
      {title}
    </Typography>
    <Chip 
      label={domain} 
      size="small" 
      sx={{ 
        mb: 2, 
        bgcolor: '#f1f8e9', 
        fontWeight: 700, 
        color: '#33691e',
        border: '1px solid #c5e1a5'
      }} 
    />
    <Typography 
      variant="body2" 
      color={COLORS.textSecondary} 
      sx={{ 
        minHeight: '60px',
        lineHeight: 1.6,
        mb: 2
      }}
    >
      {description}
    </Typography>
    <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
      <Chip 
        label={stage} 
        size="small" 
        sx={{ 
          bgcolor: '#e8f5e9',
          border: `1px solid #81c784`,
          color: '#2e7d32', 
          fontWeight: 800,
          fontSize: '0.75rem'
        }} 
      />
      <Button 
        size="small" 
        variant="outlined"
        sx={{ 
          borderColor: '#4caf50',
          color: '#4caf50',
          fontWeight: 600,
          fontSize: '0.75rem',
          '&:hover': {
            borderColor: '#388e3c',
            bgcolor: '#e8f5e9'
          }
        }}
      >
        View Details
      </Button>
    </Box>
  </Paper>
));

const AnalyticsChart = memo(() => (
  <Paper sx={{ ...CARD_SX, p: 3, height: '90%' }}>
    <Typography variant="h6" fontWeight={800} color={COLORS.accent} mb={2}>Growth Performance</Typography>
    <Box height={280}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: COLORS.textSecondary, fontSize: 11, fontWeight: 500}}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: COLORS.textSecondary, fontSize: 11, fontWeight: 500}}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              padding: '10px 14px',
              fontSize: '12px'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={COLORS.accent} 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
    <Box mt={2}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box p={1.5} bgcolor={`${COLORS.bg}`} borderRadius='6px' border={`1px solid ${COLORS.border}`}>
            <Typography variant="body2" color={COLORS.textSecondary} fontSize="11px">Monthly Growth</Typography>
            <Typography variant="subtitle2" fontWeight={700} color={COLORS.primary}>+15.2%</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box p={1.5} bgcolor={`${COLORS.bg}`} borderRadius='6px' border={`1px solid ${COLORS.border}`}>
            <Typography variant="body2" color={COLORS.textSecondary} fontSize="11px">Peak Value</Typography>
            <Typography variant="subtitle2" fontWeight={700} color={COLORS.primary}>1,100</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box p={1.5} bgcolor={`${COLORS.bg}`} borderRadius='6px' border={`1px solid ${COLORS.border}`}>
            <Typography variant="body2" color={COLORS.textSecondary} fontSize="11px">Avg. Value</Typography>
            <Typography variant="subtitle2" fontWeight={700} color={COLORS.primary}>588</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Paper>
));

const FundingPieChart = memo(() => (
  <Paper sx={{ ...CARD_SX, p: 3, height: '90%' }}>
    <Typography variant="h6" fontWeight={800} color={COLORS.accent} mb={2}>Funding Distribution</Typography>
    <Box height={280}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={FUNDING_DISTRIBUTION} 
            dataKey="value" 
            innerRadius={55} 
            outerRadius={75} 
            paddingAngle={3}
            labelLine={false}
          >
            {FUNDING_DISTRIBUTION.map((e, i) => <Cell key={i} fill={e.color || COLORS.primary} />)}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: `1px solid ${COLORS.border}`,
              backgroundColor: 'white',
              padding: '10px',
              fontSize: '12px'
            }} 
          />
          <Legend 
            iconType="circle" 
            wrapperStyle={{ 
              paddingTop: '15px', 
              fontSize: '11px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }} 
            formatter={(value) => <span style={{ color: COLORS.textMain, fontSize: '11px' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
    <Box mt={2}>
      <Typography variant="body2" color={COLORS.textSecondary} fontSize="12px" textAlign="center">
        <Box component="span" fontWeight={700} color={COLORS.primary}>Seed funding</Box> leads with 35%
      </Typography>
    </Box>
  </Paper>
));

const StartupIdeasChart = memo(() => (
  <Paper sx={{ ...CARD_SX, p: 3, height: '90%'}}>
    <Typography variant="h6" fontWeight={800} color={COLORS.accent} mb={2}>Startup Ideas by Domain</Typography>
    <Box height={280}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={IDEA_STATS}>
          <XAxis 
            dataKey="domain" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10 }}
            interval={0}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10 }}
          />
          <Tooltip 
            cursor={{fill: '#f7fff7'}}
            contentStyle={{ 
              borderRadius: '12px', 
              border: `1px solid ${COLORS.border}`,
              backgroundColor: 'white',
              padding: '10px',
              fontSize: '12px'
            }} 
          />
          <Bar 
            dataKey="ideas" 
            fill={COLORS.accent} 
            radius={[4, 4, 0, 0]} 
            barSize={25}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
    <Box mt={2}>
      <Typography variant="body2" color={COLORS.textSecondary} fontSize="12px">
        <Box component="span" fontWeight={700} color={COLORS.primary}>AI/ML</Box> has the highest number of startup ideas
      </Typography>
    </Box>
  </Paper>
));

 const PortfolioTable = memo(() => (
  <TableContainer component={Paper} sx={{ ...CARD_SX, overflow: 'hidden' }}>
    <Box p={3} bgcolor="white" borderBottom={`1px solid ${COLORS.border}`}>
      <Typography variant="h6" fontWeight={800} color={COLORS.accent}>Recent Portfolio</Typography>
    </Box>
    <Table>
      <TableHead sx={{ bgcolor: COLORS.bg }}>
        <TableRow>
          <TableCell sx={{ fontWeight: 700, color: COLORS.textSecondary }}>Venture</TableCell>
          <TableCell sx={{ fontWeight: 700, color: COLORS.textSecondary }}>Founder</TableCell>
          <TableCell sx={{ fontWeight: 700, color: COLORS.textSecondary }}>Stage</TableCell>
          <TableCell sx={{ fontWeight: 700, color: COLORS.textSecondary }}>Funding</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {VENTURES.map(v => (
          <TableRow key={v.name} hover sx={{ '&:hover': { bgcolor: COLORS.bg } }}>
            <TableCell sx={{ fontWeight: 600 }}>{v.name}</TableCell>
            <TableCell>{v.lead}</TableCell>
            <TableCell>
              <Chip label={v.stage} size="small" sx={{ fontWeight: 600, bgcolor: COLORS.chipAgri, color: COLORS.accent }} />
            </TableCell>
            <TableCell fontWeight={700}>{v.funding}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
));

const AlumniSection = memo(() => (
  <Paper sx={{ ...CARD_SX, p: 4,mt:6 }}>
    <Typography variant="h6" fontWeight={800} color={COLORS.accent} mb={3}>Alumni Network</Typography>
    <Grid container spacing={3}>
      {ALUMNI_DATA.map(a => (
        <Grid item xs={12} md={4} key={a.name}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              border: `1px solid ${COLORS.border}`, 
              borderRadius: '12px',
              bgcolor: COLORS.bg
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: COLORS.primary, fontWeight: 700 }}>{a.name[0]}</Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={800}>{a.name}</Typography>
                <Typography variant="caption" color={COLORS.textSecondary}>Batch of {a.batch}</Typography>
              </Box>
            </Stack>
            <Typography variant="body2" fontWeight={600} color={COLORS.accent}>{a.role}</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="body2" fontWeight={700} mb={1}>{a.startup}</Typography>
            <Chip label={a.status} size="small" sx={{ bgcolor: COLORS.primary, color: 'white', fontWeight: 600 }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Paper>
));
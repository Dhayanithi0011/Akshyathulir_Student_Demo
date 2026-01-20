import React, { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, Stack, 
  Button, Avatar, Chip, Paper, Grid, LinearProgress,
  Divider, IconButton, Tooltip as MuiTooltip
} from '@mui/material';
import { 
  Science, 
  TrendingUp,
  Download,
  ArrowUpward,
  CheckCircle,
  Handshake,
  EmojiEvents,
  InfoOutlined,
  RocketLaunch,
  MonetizationOn,
  Groups,
  Stars,
  CalendarMonth,
  LocalFireDepartment,
  WorkspacePremium,
  MoreVert
} from '@mui/icons-material';

const COLORS = {
  primaryGreen: '#1a3e36',
  background: '#f4f7f6',
  cardWhite: '#ffffff',
  accentGreen: '#4caf50',
  textGrey: '#666666',
  chartGreen: '#2e7d32',
  chartLight: '#a5d6a7',
  info: '#2196f3',
  warning: '#ff9800',
  danger: '#f44336',
  secondary: '#00c853'
};

// Data Sets
const stats = [
  { label: 'Active Patents', value: '36', growth: '+12%', icon: <Science />, color: COLORS.info },
  { label: 'Tech Transfers', value: '18', growth: '+8%', icon: <Handshake />, color: COLORS.accentGreen },
  { label: 'Royalty Revenue', value: '₹8.5Cr', growth: '+25%', icon: <TrendingUp />, color: COLORS.secondary },
  { label: 'Spin-offs', value: '12', growth: '+3', icon: <EmojiEvents />, color: COLORS.warning },
];

const trlData = [
  { name: 'Discovery (1-3)', value: 45, color: '#90caf9' },
  { name: 'Development (4-6)', value: 30, color: '#ffb74d' },
  { name: 'Deployment (7-9)', value: 25, color: COLORS.accentGreen },
];

const projects = [
  { id: 1, name: 'Graphene Water Filter', pi: 'Dr. Sarah J.', trl: 7, status: 'Pilot', progress: 70 },
  { id: 2, name: 'AI Crop Diagnostics', pi: 'Prof. Ram K.', trl: 9, status: 'Licensed', progress: 100 },
  { id: 3, name: 'Insulin Pump', pi: 'Dr. Amit V.', trl: 4, status: 'Testing', progress: 40 },
  { id: 4, name: 'Smart Water System', pi: 'Dr. Priya S.', trl: 6, status: 'Dev', progress: 60 },
];

const spinoffs = [
  { name: 'AquaPure Tech', founder: 'Dr. Sarah J.', stage: 'Series A', funding: '₹2.5Cr', year: 2022 },
  { name: 'CropIntel AI', founder: 'Prof. Ram K.', stage: 'Seed', funding: '₹45L', year: 2023 },
  { name: 'MedTech Solutions', founder: 'Dr. Amit V.', stage: 'Pre-seed', funding: '₹10L', year: 2024 },
];

// Enhanced Stat Card matching EntrepreneurHub style
const StatCard = ({ label, value, growth, icon, color }) => (
  <Card sx={{ 
    borderRadius: '16px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
    border: '1px solid #edf2f0',
    height: '100%'
  }}>
    <CardContent sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between">
        <Avatar sx={{ 
          bgcolor: `${color}15`, 
          color: color,
          width: 48,
          height: 48
        }}>
          {icon}
        </Avatar>
        <MuiTooltip title="More details">
          <IconButton size="small">
            <InfoOutlined sx={{ fontSize: 18, color: '#bdc3c7' }} />
          </IconButton>
        </MuiTooltip>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" fontWeight="800" color={COLORS.primaryGreen}>
          {value}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
          <Typography variant="caption" sx={{ 
            bgcolor: '#e8f5e9', 
            px: 1, 
            py: 0.2, 
            borderRadius: '4px', 
            color: COLORS.accentGreen, 
            fontWeight: 'bold' 
          }}>
            {growth}
          </Typography>
          <Typography variant="caption" color="textSecondary">vs last month</Typography>
        </Stack>
      </Box>
      <Typography variant="body2" sx={{ 
        mt: 2, 
        color: COLORS.textGrey, 
        fontSize: '0.75rem', 
        fontWeight: 600 
      }}>
        {label}
      </Typography>
    </CardContent>
  </Card>
);

// Enhanced Progress Card matching EntrepreneurHub style
const ProjectCard = ({ project }) => (
  <Card sx={{ 
    borderRadius: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    border: '1px solid #edf2f0',
    '&:hover': { 
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      transform: 'translateY(-2px)'
    },
    transition: 'all 0.3s ease'
  }}>
    <CardContent>
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="700" color={COLORS.primaryGreen}>
              {project.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {project.pi}
            </Typography>
          </Box>
          <Chip 
            label={`TRL ${project.trl}`}
            size="small"
            sx={{ 
              bgcolor: project.trl >= 7 ? '#e8f5e9' : '#e3f2fd', 
              color: project.trl >= 7 ? COLORS.chartGreen : COLORS.info,
              fontWeight: 'bold', 
              borderRadius: '6px'
            }}
          />
        </Stack>

        <Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="caption" fontWeight="600" color={COLORS.textGrey}>
              Progress
            </Typography>
            <Typography variant="caption" fontWeight="bold" color={COLORS.accentGreen}>
              {project.progress}%
            </Typography>
          </Stack>
          <LinearProgress 
            variant="determinate" 
            value={project.progress}
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: '#f0f0f0',
              '& .MuiLinearProgress-bar': { 
                bgcolor: COLORS.accentGreen, 
                borderRadius: 4 
              }
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip 
            label={project.status}
            size="small"
            sx={{ 
              bgcolor: '#f0f7f6',
              color: COLORS.primaryGreen,
              fontWeight: 'bold',
              border: '1px solid #e0e0e0'
            }}
          />
          <Button 
            size="small" 
            sx={{ 
              color: COLORS.primaryGreen, 
              fontWeight: '600',
              textTransform: 'none',
              '&:hover': { bgcolor: `${COLORS.primaryGreen}10` }
            }}
          >
            View Details →
          </Button>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

// Spinoff Company Card matching EntrepreneurHub style
const SpinoffCard = ({ spinoff }) => (
  <Card sx={{ 
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    background: `linear-gradient(135deg, ${COLORS.primaryGreen} 0%, #2d5a4f 100%)`,
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 32px rgba(26, 62, 54, 0.2)',
    },
    transition: 'all 0.3s ease'
  }}>
    <CardContent>
      <Stack spacing={2.5}>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 0.5 }}>
                {spinoff.name}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Founded {spinoff.year}
              </Typography>
            </Box>
            <Box sx={{ 
              p: 1, 
              bgcolor: 'rgba(255,255,255,0.1)', 
              borderRadius: '8px' 
            }}>
              <EmojiEvents sx={{ fontSize: 20 }} />
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>
              Founder
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {spinoff.founder}
            </Typography>
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>
                Stage
              </Typography>
              <Chip 
                label={spinoff.stage}
                size="small"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 0.5 }}>
                Funding
              </Typography>
              <Typography variant="body2" fontWeight="700" sx={{ color: COLORS.secondary }}>
                {spinoff.funding}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

// TRL Distribution Chart (Enhanced with EntrepreneurHub styling)
const TRLChart = () => (
  <Card sx={{ 
    borderRadius: '16px', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    height: '100%' 
  }}>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h6" fontWeight="700" color={COLORS.primaryGreen}>
            Research Maturity Distribution
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Technology Readiness Levels
          </Typography>
        </Box>
        <Chip 
          label="TRL 1-9" 
          size="small" 
          sx={{ 
            bgcolor: `${COLORS.primaryGreen}15`,
            color: COLORS.primaryGreen,
            fontWeight: 'bold'
          }}
        />
      </Stack>

      <Stack spacing={3}>
        {trlData.map((item, idx) => (
          <Box key={idx}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight="600" color={COLORS.primaryGreen}>
                {item.name}
              </Typography>
              <Typography variant="body2" fontWeight="700" sx={{ color: item.color }}>
                {item.value}%
              </Typography>
            </Stack>
            <Box sx={{ 
              height: 10, 
              borderRadius: 4, 
              bgcolor: '#f0f0f0',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                height: '100%', 
                width: `${item.value}%`,
                bgcolor: item.color,
                borderRadius: 4,
                transition: 'width 0.5s ease'
              }} />
            </Box>
          </Box>
        ))}
      </Stack>

      <Paper sx={{ 
        mt: 3, 
        p: 2.5, 
        bgcolor: '#e8f5e9', 
        borderRadius: '12px',
        border: `1px solid ${COLORS.accentGreen}40`
      }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <CheckCircle sx={{ 
            color: COLORS.accentGreen, 
            fontSize: 20, 
            mt: 0.5, 
            flexShrink: 0 
          }} />
          <Box>
            <Typography variant="caption" fontWeight="700" color={COLORS.chartGreen}>
              Ready for Industry Matching
            </Typography>
            <Typography variant="caption" color={COLORS.chartGreen} sx={{ display: 'block', mt: 0.5 }}>
              2 projects ready for commercialization (TRL 7+)
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </CardContent>
  </Card>
);

export default function ResearchCom() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: COLORS.background, minHeight: '100vh' }}>
      {/* Header Section matching EntrepreneurHub */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', md: 'center' }} 
        sx={{ mb: 4 }} 
        spacing={2}
      >
        <Box>
          <Typography variant="h4" fontWeight="800" color={COLORS.primaryGreen} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
            Research Commercialization Hub
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarMonth sx={{ fontSize: 16, mr: 0.5 }} /> Academic Year 2025-26
            </Typography>
            <Chip 
              icon={<RocketLaunch sx={{ fontSize: '16px !important' }}/>} 
              label="6 New Innovations this month" 
              size="small" 
              sx={{ 
                bgcolor: '#fff', 
                fontWeight: 'bold',
                border: `1px solid ${COLORS.primaryGreen}20`
              }} 
            />
          </Stack>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            sx={{ 
              color: COLORS.primaryGreen, 
              borderColor: COLORS.primaryGreen, 
              borderRadius: '8px', 
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                borderColor: COLORS.primaryGreen,
                bgcolor: `${COLORS.primaryGreen}08`
              }
            }}
          >
            Export Report
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Handshake />} 
            sx={{ 
              bgcolor: COLORS.primaryGreen, 
              borderRadius: '8px', 
              textTransform: 'none', 
              px: 3, 
              width: { xs: '100%', sm: 'auto' },
              '&:hover': { bgcolor: '#0f2a24' } 
            }}
          >
            Submit Innovation
          </Button>
        </Stack>
      </Stack>

      {/* Stats Grid - FIXED: Using MUI v5 Grid syntax */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid - FIXED: Using MUI v5 Grid syntax */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* TRL Distribution - Left */}
        <Grid item xs={12} md={4}>
          <TRLChart />
        </Grid>

        {/* Projects - Right */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            borderRadius: '16px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            height: '100%' 
          }}>
            <Box sx={{ 
              p: 3, 
              borderBottom: '1px solid #f0f0f0', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <Box>
                <Typography variant="h6" fontWeight="700" color={COLORS.primaryGreen}>
                  Active Research Projects
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Real-time status of commercialization pipeline
                </Typography>
              </Box>
              <Button 
                size="small" 
                endIcon={<MoreVert />} 
                sx={{ color: COLORS.textGrey }}
              >
                View All
              </Button>
            </Box>
            <CardContent>
              <Grid container spacing={2}>
                {projects.map((project) => (
                  <Grid item xs={12} sm={6} key={project.id}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Spin-off Companies Section - FIXED: Using MUI v5 Grid syntax */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" fontWeight="700" color={COLORS.primaryGreen}>
              Startup Spin-offs from Research
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Companies launched from campus research
            </Typography>
          </Box>
          <Button 
            variant="text" 
            sx={{ 
              color: COLORS.primaryGreen, 
              fontWeight: '600',
              textTransform: 'none'
            }}
          >
            View All →
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {spinoffs.map((spinoff, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <SpinoffCard spinoff={spinoff} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Key Metrics Footer matching EntrepreneurHub - FIXED: Using MUI v5 Grid syntax */}
      <Grid container spacing={3}>
        {[
          { label: 'Patents Filed', value: '56', icon: <Science />, color: COLORS.info },
          { label: 'Industry Partnerships', value: '12+', icon: <Handshake />, color: COLORS.accentGreen },
          { label: 'Licensed Technologies', value: '45+', icon: <CheckCircle />, color: COLORS.secondary },
          { label: 'Total Funding Generated', value: '₹15Cr+', icon: <TrendingUp />, color: COLORS.warning },
        ].map((metric, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ 
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid #edf2f0',
              textAlign: 'center',
              height: '100%'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Avatar sx={{ 
                  bgcolor: `${metric.color}15`, 
                  color: metric.color,
                  width: 56,
                  height: 56,
                  mx: 'auto',
                  mb: 2
                }}>
                  {metric.icon}
                </Avatar>
                <Typography variant="h5" fontWeight="800" color={COLORS.primaryGreen} sx={{ mb: 0.5 }}>
                  {metric.value}
                </Typography>
                <Typography variant="caption" color={COLORS.textGrey} fontWeight="600">
                  {metric.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
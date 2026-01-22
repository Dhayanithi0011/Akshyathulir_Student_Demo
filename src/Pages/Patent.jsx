import * as React from "react";
import {
  Box, Grid, Typography, Card, CardContent,
  Button, Chip, Dialog, DialogTitle, DialogContent,
  TextField, MenuItem, Select, FormControl, InputLabel,
  Paper, Divider, Avatar, LinearProgress, IconButton,
  Tabs, Tab, List, ListItem, ListItemText, ListItemAvatar,
  Badge, Stack, Switch, FormControlLabel, Tooltip,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Accordion, AccordionSummary, AccordionDetails,
  Slider, InputAdornment, Menu, useMediaQuery
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem
} from "@mui/x-data-grid";
import {
  PieChart,
  BarChart,
  LineChart
} from "@mui/x-charts";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp,
  MonetizationOn,
  AssignmentTurnedIn,
  Timeline,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  CloudDownload,
  FilterList,
  ExpandMore,
  Notifications,
  Search,
  CalendarToday,
  Person,
  Business,
  Science,
  Computer,
  Engineering,
  MedicalServices,
  Agriculture,
  Security,
  Language,
  Share,
  MoreVert,
  Star,
  StarBorder,
  TrendingDown,
  TrendingFlat,
  Visibility,
  Download,
  Refresh,
  Sort,
  Info,
  Warning,
  CheckCircle,
  Cancel,
  Schedule,
  Assessment,
  Insights,
  ArrowUpward,
  ArrowDownward,
  People,
  LocalOffer,
  AccountBalance,
  AttachMoney,
  Verified,
  FileCopy,
  ContentCopy
} from "@mui/icons-material";
import { Patents as patentData } from "../Data/Patents";

// Color theme matching the sample image
const theme = {
  primary: "#4CAF50", // Green from image
  secondary: "#2196F3", // Blue
  warning: "#FF9800", // Orange
  error: "#f44336",
  success: "#4CAF50",
  info: "#2196F3",
  background: "#f5f5f5",
  cardBg: "#ffffff",
  textPrimary: "#1a3e36",
  textSecondary: "#666666"
};

// Domain icons mapping
const domainIcons = {
  "Biotechnology": <Science sx={{ color: "#9C27B0" }} />,
  "Software": <Computer sx={{ color: "#2196F3" }} />,
  "Electronics": <Engineering sx={{ color: "#FF9800" }} />,
  "Mechanical": <Engineering sx={{ color: "#795548" }} />,
  "Medical": <MedicalServices sx={{ color: "#E91E63" }} />,
  "Agriculture": <Agriculture sx={{ color: "#4CAF50" }} />,
  "Security": <Security sx={{ color: "#F44336" }} />,
  "Other": <Language sx={{ color: "#607D8B" }} />
};

export default function Patent() {
  const muiTheme = useMuiTheme();
  const fullScreen = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [rows, setRows] = React.useState(patentData || []);
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [filter, setFilter] = React.useState("all");
  const [tabValue, setTabValue] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showStarred, setShowStarred] = React.useState(false);
  const [revenueThreshold, setRevenueThreshold] = React.useState(100000);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [form, setForm] = React.useState({
    title: "",
    inventors: "",
    department: "",
    domain: "",
    filingDate: "",
    publicationDate: "",
    grantDate: "",
    status: "Filed",
    applicationNo: "",
    patentNo: "",
    country: "India",
    applicantName: "",
    assignee: "",
    ipcClass: "",
    abstract: "",
    attorney: "",
    commercialized: "No",
    licensee: "",
    revenue: "",
    validityTill: "",
    remarks: "",
    priorityDate: "",
    starred: false
  });

  const handleSubmit = () => {
    if (editMode && editingId) {
      setRows(rows.map(row => row.id === editingId ? { ...row, ...form, revenue: Number(form.revenue || 0) } : row));
    } else {
      const newId = Math.max(...rows.map(r => r.id)) + 1;
      setRows([...rows, { id: newId, ...form, revenue: Number(form.revenue || 0) }]);
    }
    setOpen(false);
    resetForm();
  };

  const handleEdit = (id) => {
    const patent = rows.find(r => r.id === id);
    if (patent) {
      setForm(patent);
      setEditMode(true);
      setEditingId(id);
      setOpen(true);
    }
  };

  const handleDelete = (id) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const handleStarToggle = (id) => {
    setRows(rows.map(row => row.id === id ? { ...row, starred: !row.starred } : row));
  };

  const resetForm = () => {
    setForm({
      title: "",
      inventors: "",
      department: "",
      domain: "",
      filingDate: "",
      publicationDate: "",
      grantDate: "",
      status: "Filed",
      applicationNo: "",
      patentNo: "",
      country: "India",
      applicantName: "",
      assignee: "",
      ipcClass: "",
      abstract: "",
      attorney: "",
      commercialized: "No",
      licensee: "",
      revenue: "",
      validityTill: "",
      remarks: "",
      priorityDate: "",
      starred: false
    });
    setEditMode(false);
    setEditingId(null);
  };

  // -------- ANALYTICS --------
  const filteredRows = React.useMemo(() => {
    let filtered = filter === "all" ? rows :
      filter === "commercialized" ? rows.filter(p => p.commercialized === "Yes") :
        rows.filter(p => p.status === filter);

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.inventors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.domain.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showStarred) {
      filtered = filtered.filter(p => p.starred);
    }

    return filtered.filter(p => (p.revenue || 0) >= revenueThreshold);
  }, [rows, filter, searchTerm, showStarred, revenueThreshold]);

  const statusCount = {
    Granted: rows.filter(p => p.status === "Granted").length,
    Published: rows.filter(p => p.status === "Published").length,
    Filed: rows.filter(p => p.status === "Filed").length,
    Pending: rows.filter(p => p.status === "Pending").length
  };

  const commercialized = rows.filter(p => p.commercialized === "Yes");
  const totalRevenue = commercialized.reduce((s, p) => s + (p.revenue || 0), 0);
  const avgRevenue = commercialized.length ? Math.round(totalRevenue / commercialized.length) : 0;
  const conversionRate = rows.length ? Math.round((statusCount.Granted / rows.length) * 100) : 0;
  const starredCount = rows.filter(p => p.starred).length;

  // Department distribution
  const deptMap = {};
  rows.forEach(p => { deptMap[p.department] = (deptMap[p.department] || 0) + 1; });
  const deptLabels = Object.keys(deptMap);
  const deptValues = Object.values(deptMap);

  // Yearly filings
  const yearMap = {};
  rows.forEach(p => {
    if (p.filingDate) {
      const y = new Date(p.filingDate).getFullYear();
      yearMap[y] = (yearMap[y] || 0) + 1;
    }
  });
  const yearLabels = Object.keys(yearMap).sort();
  const yearValues = yearLabels.map(y => yearMap[y]);

  // Monthly trend (last 6 months)
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    const filings = rows.filter(p => {
      if (!p.filingDate) return false;
      const filingDate = new Date(p.filingDate);
      return filingDate.getMonth() === date.getMonth() &&
        filingDate.getFullYear() === date.getFullYear();
    }).length;
    return { month: monthYear, filings: filings || Math.floor(Math.random() * 5) + 1 };
  }).reverse();

  // Revenue by department
  const revenueByDept = {};
  commercialized.forEach(p => {
    revenueByDept[p.department] = (revenueByDept[p.department] || 0) + (p.revenue || 0);
  });

  // Top performing patents
  const topPatents = [...rows]
    .filter(p => p.revenue > 0)
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
    .slice(0, 5);

  // Expiring soon (within next year)
  const expiringSoon = rows.filter(p => {
    if (!p.validityTill) return false;
    const validityDate = new Date(p.validityTill);
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    return validityDate <= oneYearFromNow && validityDate >= new Date();
  }).slice(0, 5);

  // -------- GRID COLUMNS --------
  const columns = [
    {
      field: "starred",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleStarToggle(params.id);
          }}
        >
          {params.value ? <Star sx={{ color: "#FF9800" }} /> : <StarBorder />}
        </IconButton>
      )
    },
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: (params) => (
        <Avatar sx={{ bgcolor: theme.primary, width: 32, height: 32, fontSize: 14 }}>
          {params.value}
        </Avatar>
      )
    },
    {
      field: "title",
      headerName: "Patent Title",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="500" noWrap>
            {params.value}
          </Typography>
          <Typography variant="caption" color="textSecondary" noWrap>
            {params.row.domain}
          </Typography>
        </Box>
      )
    },
    {
      field: "inventors",
      headerName: "Inventors",
      width: 150,
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.value.split(",")[0]} +{params.value.split(",").length - 1}
        </Typography>
      )
    },
    {
      field: "department",
      headerName: "Department",
      width: 130,
      minWidth: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{ bgcolor: `${theme.primary}20`, color: theme.primary }}
        />
      )
    },
    {
      field: "filingDate",
      headerName: "Filed",
      width: 100,
      minWidth: 80,
      valueFormatter: (params) => {
        const val = params?.value ?? params;
        return val ? new Date(val).getFullYear() : "";
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      minWidth: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: params.value === "Granted" ? `${theme.success}20` :
              params.value === "Published" ? `${theme.secondary}20` : `${theme.warning}20`,
            color: params.value === "Granted" ? theme.success :
              params.value === "Published" ? theme.secondary : theme.warning
          }}
        />
      )
    },
    {
      field: "commercialized",
      headerName: "Comm.",
      width: 100,
      minWidth: 80,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === "Yes" ? "success" : "default"}
          variant={params.value === "Yes" ? "filled" : "outlined"}
        />
      )
    },
    {
      field: "revenue",
      headerName: "Revenue",
      width: 120,
      minWidth: 100,
      renderCell: (params) => (
        <Typography fontWeight="500" color={params.value > 0 ? "success.main" : "text.secondary"}>
          {params.value ? `₹${params.value.toLocaleString()}` : "-"}
        </Typography>
      )
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      minWidth: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
          sx={{ color: "error.main" }}
        />
      ]
    }
  ];

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, bgcolor: theme.background, minHeight: "100vh" }}>

      {/* Header */}
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} mb={3} gap={2}>
        <Box>
          <Typography variant="h4" fontWeight={700} color={theme.textPrimary} fontSize={{ xs: "1.5rem", sm: "2rem" }}>
            Patent Portfolio
          </Typography>
          <Typography variant="body2" color={theme.textSecondary}>
            Track, manage and analyze your patent assets
          </Typography>
        </Box>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search patents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />
            }}
            sx={{ minWidth: 200, flexGrow: { xs: 1, sm: 0 } }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setFilter(filter === "commercialized" ? "all" : "commercialized")}
            sx={{ borderColor: theme.primary, color: theme.primary }}
          >
            {filter === "commercialized" ? "All" : "Comm."}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { resetForm(); setOpen(true); }}
            sx={{ bgcolor: theme.primary, "&:hover": { bgcolor: "#3d8b40" } }}
          >
            Add
          </Button>
        </Box>
      </Box>

      {/* KPI Cards - Responsive */}
      <Grid container spacing={2} mb={4}>
        {[
          {
            title: "Total Patents",
            value: rows.length,
            change: "+2 this month",
            icon: <AssignmentTurnedIn sx={{ color: theme.textPrimary }} />,
            color: theme.textPrimary,
            trend: "up"
          },
          {
            title: "Granted",
            value: statusCount.Granted,
            change: `${conversionRate}% conversion`,
            icon: <Verified sx={{ color: theme.textPrimary }} />,
            color: theme.textPrimary,
            trend: "up"
          },
          {
            title: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            change: `Avg: ₹${avgRevenue.toLocaleString()}`,
            icon: <MonetizationOn sx={{ color: theme.textPrimary }} />,
            color: theme.textPrimary,
            trend: "up"
          },
          {
            title: "Commercialized",
            value: commercialized.length,
            change: `${Math.round((commercialized.length / rows.length) * 100)}% rate`,
            icon: <TrendingUp sx={{ color: theme.textPrimary }} />,
            color: theme.textPrimary,
            trend: "up"
          },
          {
            title: "Starred",
            value: starredCount,
            change: `${Math.round((starredCount / rows.length) * 100)}%`,
            icon: <Star sx={{ color: theme.textPrimary }} />,
            color: theme.textPrimary,
            trend: "flat"
          },
          {
            title: "Pending",
            value: statusCount.Pending,
            change: `${Math.round((statusCount.Pending / rows.length) * 100)}%`,
            icon: <Schedule sx={{ color: theme.textPrimary }} />,
            color: theme.textPrimary,
            trend: "down"
          }
        ].map((kpi, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
            <Card sx={{ 
              bgcolor: theme.cardBg, 
              border: `1px solid muted`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              height: "100%"
            }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Box>
                    <Typography variant="body2" color="textSecondary" fontSize="0.75rem">{kpi.title}</Typography>
                    <Typography variant="h6" fontWeight={700} mt={0.5}>{kpi.value}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: `${kpi.color}15`, width: 36, height: 36 }}>
                    {kpi.icon}
                  </Avatar>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {kpi.trend === "up" ? <ArrowUpward sx={{ fontSize: 14, color: theme.success }} /> :
                   kpi.trend === "down" ? <ArrowDownward sx={{ fontSize: 14, color: theme.error }} /> :
                   <TrendingFlat sx={{ fontSize: 14, color: theme.textSecondary }} />}
                  <Typography variant="caption" color="textSecondary">
                    {kpi.change}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Control Panel */}
      <Card sx={{ mb: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems={{ xs: "stretch", sm: "center" }} justifyContent="space-between" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Tabs 
                value={tabValue} 
                onChange={(e, v) => setTabValue(v)}
                sx={{ minHeight: 40 }}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <Tab icon={<BarChartIcon />} label="Overview" sx={{ minHeight: 40 }} />
                <Tab icon={<Timeline />} label="Trends" sx={{ minHeight: 40 }} />
                <Tab icon={<PieChartIcon />} label="Distribution" sx={{ minHeight: 40 }} />
                <Tab icon={<MonetizationOn />} label="Revenue" sx={{ minHeight: 40 }} />
              </Tabs>
            </Box>
            
            <Box display="flex" gap={2} flexWrap="wrap">
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={showStarred}
                    onChange={(e) => setShowStarred(e.target.checked)}
                  />
                }
                label="Starred Only"
              />
              
              <Box sx={{ minWidth: 200, flexGrow: 1 }}>
                <Typography variant="caption" color="textSecondary">Revenue Threshold</Typography>
                <Slider
                  size="small"
                  value={revenueThreshold}
                  onChange={(e, val) => setRevenueThreshold(val)}
                  min={0}
                  max={1000000}
                  step={10000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                />
              </Box>
              
              <Button startIcon={<Refresh />} size="small">Refresh</Button>
              <Button startIcon={<CloudDownload />} size="small" variant="outlined">Export</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Main Content Grid - Responsive */}
      <Grid container spacing={3} mb={4}>
        {/* Charts Section */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Status Distribution */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Status Distribution</Typography>
                    <Chip label="Live" size="small" color="primary" />
                  </Box>
                  <Box sx={{ height: 300 }}>
                    <PieChart
                      height={300}
                      series={[{
                        data: [
                          { id: 0, value: statusCount.Granted, label: "Granted", color: theme.success },
                          { id: 1, value: statusCount.Published, label: "Published", color: theme.secondary },
                          { id: 2, value: statusCount.Filed, label: "Filed", color: theme.warning },
                          { id: 3, value: statusCount.Pending, label: "Pending", color: "#9E9E9E" }
                        ],
                        innerRadius: 60,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 4
                      }]}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Monthly Trend */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent>
                  <Typography variant="h6" mb={2}>Monthly Filing Trend</Typography>
                  <Box sx={{ height: 300 }}>
                    <BarChart
                      height={300}
                      xAxis={[{ 
                        data: monthlyData.map(d => d.month),
                        scaleType: 'band',
                        tickLabelStyle: { angle: 45, textAnchor: 'start' }
                      }]}
                      series={[{
                        data: monthlyData.map(d => d.filings),
                        label: 'Patent Filings',
                        color: theme.primary
                      }]}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Department Distribution */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent>
                  <Typography variant="h6" mb={2}>Department-wise Distribution</Typography>
                  <Box sx={{ height: 300 }}>
                    <BarChart
                      height={300}
                      xAxis={[{
                        scaleType: 'band',
                        data: deptLabels,
                        tickLabelStyle: { angle: 45, textAnchor: 'start' }
                      }]}
                      series={[{
                        data: deptValues,
                        label: 'Patents',
                        color: theme.secondary
                      }]}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Revenue by Department */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent>
                  <Typography variant="h6" mb={2}>Revenue by Department</Typography>
                  <Box sx={{ height: 300 }}>
                    <BarChart
                      height={300}
                      xAxis={[{
                        scaleType: 'band',
                        data: Object.keys(revenueByDept),
                        tickLabelStyle: { angle: 45, textAnchor: 'start' }
                      }]}
                      series={[{
                        data: Object.values(revenueByDept),
                        label: 'Revenue (₹)',
                        color: "#FF9800"
                      }]}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Sidebar Stats and Lists */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Quick Stats */}
            <Grid item xs={12} md={6} lg={12}>
              <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent>
                  <Typography variant="h6" mb={3}>Quick Stats</Typography>
                  
                  <Box mb={3}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="textSecondary">Commercialization Rate</Typography>
                      <Typography variant="body2" fontWeight="500">
                        {Math.round((commercialized.length / rows.length) * 100)}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(commercialized.length / rows.length) * 100} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Box mb={3}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="textSecondary">Grant Conversion Rate</Typography>
                      <Typography variant="body2" fontWeight="500">{conversionRate}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={conversionRate} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" color="textSecondary" mb={2}>Top Domains</Typography>
                  <Stack spacing={1}>
                    {["Biotechnology", "Software", "Electronics", "Mechanical", "Medical"].map((domain, i) => (
                      <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1}>
                          {domainIcons[domain] || domainIcons.Other}
                          <Typography variant="body2">{domain}</Typography>
                        </Box>
                        <Chip label={`${Math.floor(Math.random() * 20) + 5}`} size="small" />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Top Performing Patents */}
            <Grid item xs={12} md={6} lg={12}>
              <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Top Performing Patents</Typography>
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <List dense>
                    {topPatents.map((patent, index) => (
                      <ListItem key={patent.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: index < 3 ? theme.primary : theme.secondary, width: 32, height: 32 }}>
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" fontWeight="500" noWrap>
                              {patent.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="textSecondary" noWrap>
                              {patent.domain}
                            </Typography>
                          }
                        />
                        <Chip 
                          label={`₹${patent.revenue.toLocaleString()}`} 
                          size="small" 
                          color="success"
                          variant="outlined"
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Expiring Soon */}
            <Grid item xs={12} md={6} lg={12}>
              <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Expiring Soon</Typography>
                    <Tooltip title="Patents expiring within next year">
                      <Info fontSize="small" color="action" />
                    </Tooltip>
                  </Box>
                  <List dense>
                    {expiringSoon.map((patent) => (
                      <ListItem key={patent.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: theme.warning, width: 32, height: 32 }}>
                            <Warning fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" fontWeight="500" noWrap>
                              {patent.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="textSecondary">
                              Expires: {new Date(patent.validityTill).toLocaleDateString()}
                            </Typography>
                          }
                        />
                        <Chip 
                          label={patent.status} 
                          size="small" 
                          color="warning"
                          variant="outlined"
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Recent Activity Table */}
      <Card sx={{ mb: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Recent Patents</Typography>
            <Box display="flex" gap={1}>
              <Button size="small" startIcon={<CloudDownload />}>Export</Button>
              <Button size="small" startIcon={<FilterList />}>Filter</Button>
              <Button size="small" startIcon={<Sort />}>Sort</Button>
            </Box>
          </Box>
          <Box sx={{ width: "100%", height: 400 }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
                sorting: { sortModel: [{ field: 'filingDate', sort: 'desc' }] }
              }}
              pageSizeOptions={[5, 10, 25]}
              sx={{
                border: "none",
                "& .MuiDataGrid-cell": { borderBottom: "1px solid #f0f0f0" },
                "& .MuiDataGrid-columnHeaders": { bgcolor: "#fafafa" }
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Bottom Section - Additional Info */}
      <Grid container spacing={3}>
        {/* Patent Status Summary */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Status Summary</Typography>
              <Stack spacing={2}>
                {Object.entries(statusCount).map(([status, count]) => (
                  <Box key={status} display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: status === "Granted" ? theme.success :
                                 status === "Published" ? theme.secondary :
                                 status === "Filed" ? theme.warning : "#9E9E9E"
                      }} />
                      <Typography variant="body2">{status}</Typography>
                    </Box>
                    <Chip label={count} size="small" />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Recent Activities</Typography>
              <List dense>
                {[
                  { action: "Patent filed", patent: "Smart Irrigation System", time: "2 hours ago", icon: <AddIcon color="primary" /> },
                  { action: "Status updated", patent: "AI Diagnosis Tool", time: "1 day ago", icon: <EditIcon color="secondary" /> },
                  { action: "Revenue updated", patent: "Solar Panel Tech", time: "2 days ago", icon: <MonetizationOn color="success" /> },
                  { action: "Patent commercialized", patent: "Water Purification", time: "1 week ago", icon: <CheckCircle color="info" /> },
                ].map((activity, i) => (
                  <ListItem key={i} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${theme.primary}15`, width: 32, height: 32 }}>
                        {activity.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="500">
                          {activity.action}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="textSecondary">
                          {activity.patent} • {activity.time}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Domain Distribution */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Domain Distribution</Typography>
              <Stack spacing={1}>
                {[
                  { domain: "Biotechnology", count: 12, color: "#9C27B0" },
                  { domain: "Software", count: 8, color: "#2196F3" },
                  { domain: "Electronics", count: 6, color: "#FF9800" },
                  { domain: "Mechanical", count: 4, color: "#795548" },
                  { domain: "Medical", count: 3, color: "#E91E63" },
                ].map((item, i) => (
                  <Box key={i}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="body2">{item.domain}</Typography>
                      <Typography variant="body2" fontWeight="500">{item.count}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(item.count / rows.length) * 100}
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: `${item.color}20`,
                        "& .MuiLinearProgress-bar": { bgcolor: item.color }
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ height: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Quick Actions</Typography>
              <Stack spacing={1}>
                <Button variant="contained" startIcon={<AddIcon />} fullWidth>
                  Add New Patent
                </Button>
                <Button variant="outlined" startIcon={<CloudDownload />} fullWidth>
                  Export Data
                </Button>
                <Button variant="outlined" startIcon={<Share />} fullWidth>
                  Share Report
                </Button>
                <Button variant="outlined" startIcon={<CalendarToday />} fullWidth>
                  Schedule Review
                </Button>
                <Button variant="outlined" startIcon={<Notifications />} fullWidth>
                  Set Reminder
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add/Edit Patent Dialog */}
      <Dialog open={open} onClose={() => { setOpen(false); resetForm(); }} fullWidth maxWidth="md" fullScreen={fullScreen}>
        <DialogTitle sx={{ bgcolor: theme.primary, color: "white" }}>
          {editMode ? "Edit Patent" : "Add New Patent"}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {[
              { field: "title", label: "Patent Title", required: true, width: 12 },
              { field: "inventors", label: "Inventors", required: true, width: 12 },
              { field: "department", label: "Department", width: 6 },
              { field: "domain", label: "Domain", width: 6, select: true, options: ["Biotechnology", "Software", "Electronics", "Mechanical", "Medical", "Agriculture", "Security", "Other"] },
              { field: "applicationNo", label: "Application Number", width: 6 },
              { field: "patentNo", label: "Patent Number", width: 6 },
              { field: "filingDate", label: "Filing Date", type: "date", width: 6 },
              { field: "publicationDate", label: "Publication Date", type: "date", width: 6 },
              { field: "grantDate", label: "Grant Date", type: "date", width: 6 },
              { field: "validityTill", label: "Validity Till", type: "date", width: 6 },
              { field: "status", label: "Status", width: 6, select: true, options: ["Filed", "Published", "Granted", "Pending", "Abandoned"] },
              { field: "country", label: "Country", width: 6 },
              { field: "commercialized", label: "Commercialized", width: 6, select: true, options: ["Yes", "No"] },
              { field: "revenue", label: "Revenue (₹)", type: "number", width: 6, InputProps: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } },
              { field: "licensee", label: "Licensee", width: 6 },
              { field: "assignee", label: "Assignee", width: 6 },
              { field: "ipcClass", label: "IPC Class", width: 12 },
              { field: "abstract", label: "Abstract", multiline: true, rows: 3, width: 12 },
              { field: "remarks", label: "Remarks", multiline: true, rows: 2, width: 12 }
            ].map((field, i) => (
              <Grid item xs={12} sm={field.width} key={i}>
                {field.select ? (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={form[field.field] || ""}
                      label={field.label}
                      onChange={(e) => setForm({ ...form, [field.field]: e.target.value })}
                    >
                      {field.options.map(opt => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    margin="normal"
                    label={field.label}
                    type={field.type || "text"}
                    value={form[field.field] || ""}
                    onChange={(e) => setForm({ ...form, [field.field]: e.target.value })}
                    multiline={field.multiline}
                    rows={field.rows}
                    required={field.required}
                    InputProps={field.InputProps}
                    InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box display="flex" gap={2} mt={3}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => { setOpen(false); resetForm(); }}
              sx={{ borderColor: theme.primary, color: theme.primary }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ bgcolor: theme.primary, "&:hover": { bgcolor: "#3d8b40" } }}
            >
              {editMode ? "Update Patent" : "Add Patent"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

    </Box>
  );
}
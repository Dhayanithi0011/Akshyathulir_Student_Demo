import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Paper,
  Box,
  Divider,
  Autocomplete,
} from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const institutionData = {
  School: {
    departments: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Commerce", "Economics", "English"],
  },
  Polytechnic: {
    degrees: {
      Diploma: ["Computer Engineering", "Mechanical Engineering", "Electrical Engineering", "Electronics Engineering", "Civil Engineering", "Automobile Engineering"],
    },
  },
  Engineering: {
    degrees: {
      "B.Tech": ["AI & DS", "Computer Science Engineering", "CSBS", "Information Technology", "Electronics & Communication", "Electrical & Electronics", "Mechanical Engineering"],
      "B.E": ["Computer Science Engineering", "Mechanical Engineering", "Civil Engineering", "Electrical & Electronics", "Electronics & Communication"],
      "M.Tech": ["Data Science", "VLSI Design", "Structural Engineering", "Power Systems", "Software Engineering"],
      MBA: ["Finance", "Human Resources", "Marketing", "Operations", "Business Analytics"],
    },
  },
  "Arts & Science": {
    degrees: {
      BSc: ["Computer Science", "Mathematics", "Physics", "Chemistry", "Statistics"],
      BCA: ["Computer Applications", "AI & ML", "Cloud Computing", "Cyber Security"],
      BCom: ["General", "Accounting & Finance", "Business Analytics"],
      MSc: ["Computer Science", "Data Science", "Mathematics", "Statistics"],
    },
  },
};

const sectionHeaderStyle = {
  backgroundColor: "#046f0bff",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "4px 4px 0 0",
};

const cardStyle = {
  border: "2px solid #046f0bff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "40px",
  overflow: "hidden"
};

export default function Person() {
  const [institutionType, setInstitutionType] = useState("");
  const [autonomousStatus, setAutonomousStatus] = useState("");
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institutionName: "",
    yearEstablished: "",
    naacGrade: "",
    officialEmail: "",
    universityName: "",
    gender: "",
    principalName: "",
    principalEmail: "",
    principalPhone: "",
    academicCoordinatorName: "",
    academicCoordinatorEmail: "",
    academicCoordinatorPhone: "",
    placementHeadName: "",
    placementHeadEmail: "",
    placementHeadPhone: "",
    websiteUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    facebookUrl: ""
  });

  const [address, setAddress] = useState({
    country: "",
    state: "",
    district: "",
    city: "",
    area: "",
    pinCode: ""
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryInput, setCountryInput] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [districtInput, setDistrictInput] = useState("");
  const [cityInput, setCityInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/iso");
        const data = await res.json();
        setCountries(data.data?.map(c => c.name) || []);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleAddressChange = async (field, value, isSelection = false) => {
    // Only update selected values and perform fetches when a selection occurs.
    // Typing is handled by separate `inputValue` states to avoid dropdown flicker.
    let updated = { ...address };

    if (field === "country") {
      if (!isSelection) return; // don't act on typing
      updated = { ...updated, country: value || "", state: "", district: "", city: "", area: "", pinCode: "" };
      setStates([]); setDistricts([]); setCities([]);
      try {
        if (value) {
          const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: value }),
          });
          const data = await res.json();
          setStates(data.data?.states?.map(s => s.name) || []);
        }
      } catch (e) { console.error(e); }
    }

    if (field === "state") {
      if (!isSelection) return;
      updated = { ...updated, state: value || "", district: "", city: "", area: "", pinCode: "" };
      setDistricts([]); setCities([]);
      try {
        if (value && address.country) {
          const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: address.country, state: value }),
          });
          const data = await res.json();
          setDistricts(data.data || []);
        }
      } catch (e) { console.error(e); }
    }

    if (field === "district") {
      if (!isSelection) return;
      updated = { ...updated, district: value || "", city: "", area: "", pinCode: "" };
      setCities([`${value} Central`, `${value} North`, `${value} South`, "Main City Area"]);
    }

    if (field === "city") {
      updated = { ...updated, city: value || "", area: "", pinCode: "" };
    }

    if (field === "area" || field === "pinCode") {
      updated = { ...updated, [field]: value };
    }

    setAddress(updated);
  };


  const handleDegreeToggle = (degree) => {
    setSelectedDepartments([]);
    setSelectedDegrees(prev =>
      prev.includes(degree) ? prev.filter(d => d !== degree) : [...prev, degree]
    );
  };

  const handleDeptToggle = (dept) => {
    setSelectedDepartments(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const subHeaderStyle = {
    color: "#046f0bff",
    fontWeight: "bold",
  };

  const [uploadedFiles, setUploadedFiles] = useState({
    "Registration Certificate": null,
    "ID Proof": null,
    "Address Proof": null,
    "Accreditation Certificate": null,
  });

  const handleFileChange = (docName, event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUploadedFiles((prev) => ({ ...prev, [docName]: fileUrl }));
    }
  };

  const handleViewFile = (docName) => {
    const fileUrl = uploadedFiles[docName];
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const handleReset = () => {
    setInstitutionType("");
    setAutonomousStatus("");
    setSelectedDegrees([]);
    setSelectedDepartments([]);
    setFormData({
      firstName: "", lastName: "", email: "", phone: "",
      institutionName: "", yearEstablished: "", naacGrade: "",
      officialEmail: "", universityName: "", gender: "",
      principalName: "", principalEmail: "", principalPhone: "",
      academicCoordinatorName: "", academicCoordinatorEmail: "", academicCoordinatorPhone: "",
      placementHeadName: "", placementHeadEmail: "", placementHeadPhone: "",
      websiteUrl: "", linkedinUrl: "", instagramUrl: "", facebookUrl: ""
    });
    setAddress({ country: "", state: "", district: "", city: "", area: "", pinCode: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submission Data:", { ...formData, institutionType, autonomousStatus, selectedDegrees, selectedDepartments, address });
    alert("Form submitted successfully!");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" sx={{ color: "#046f0bff", fontWeight: 700, mb: 6 }}>
        Educational Institution Registration
      </Typography>

      <form onSubmit={handleSubmit}>

        <Paper sx={cardStyle}>
          <Box sx={sectionHeaderStyle}>
            <Typography variant="h6">Institution Details</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Institution Name" required name="institutionName" value={formData.institutionName} onChange={handleInputChange} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  select fullWidth label="Institution Type"
                  value={institutionType}
                  onChange={(e) => {
                    setInstitutionType(e.target.value);
                    setSelectedDegrees([]);
                    setSelectedDepartments([]);
                    setAutonomousStatus("");
                  }}
                  required
                  
                >
                  <MenuItem value="School">School</MenuItem>
                  <MenuItem value="Polytechnic">Polytechnic</MenuItem>
                  <MenuItem value="Engineering">Engineering College</MenuItem>
                  <MenuItem value="Arts & Science">Arts & Science College</MenuItem>
                </TextField>
              </Grid>
              <Grid xs={12} md={4}>
                <TextField fullWidth type="number" label="Year of Establishment" name="yearEstablished" value={formData.yearEstablished} onChange={handleInputChange} required />
              </Grid>
              <Grid xs={12} md={4}>
                <TextField
                  select fullWidth label="NAAC Grade" name="naacGrade"
                  value={formData.naacGrade} onChange={handleInputChange} required
                >
                  {["A++", "A+", "A", "B++", "B+", "B", "C", "Not Accredited"].map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={4}>
                <TextField fullWidth type="email" label="Official Email" name="officialEmail" value={formData.officialEmail} onChange={handleInputChange} required />
              </Grid>

              {(institutionType === "Engineering" || institutionType === "Arts & Science") && (
                <>
                  <Grid xs={12} md={6}>
                    <TextField
                      select fullWidth label="Autonomous Status" name="autonomousStatus"
                      value={autonomousStatus} onChange={(e) => setAutonomousStatus(e.target.value)}
                    >
                      <MenuItem value="Autonomous">Autonomous</MenuItem>
                      <MenuItem value="Non-Autonomous">Non-Autonomous</MenuItem>
                    </TextField>
                  </Grid>
                  {autonomousStatus === "Non-Autonomous" && (
                    <Grid xs={12} md={6}>
                      <TextField fullWidth label="Affiliated University" name="universityName" value={formData.universityName} onChange={handleInputChange} />
                    </Grid>
                  )}
                </>
              )}

              {institutionType && (
                <Grid xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" sx={{ color: "#046f0bff", fontWeight: 600, mb: 2 }}>
                    {institutionType === "School" ? "Departments Offered" : "Degrees Offered"}
                  </Typography>
                  <Grid container spacing={1}>
                    {institutionType === "School" ? (
                      institutionData.School.departments.map(dept => (
                        <Grid xs={6} md={3} key={dept}>
                          <FormControlLabel control={<Checkbox color="success" onChange={() => handleDeptToggle(dept)} />} label={dept} />
                        </Grid>
                      ))
                    ) : (
                      Object.keys(institutionData[institutionType].degrees).map(deg => (
                        <Grid xs={6} md={3} key={deg}>
                          <FormControlLabel control={<Checkbox color="success" checked={selectedDegrees.includes(deg)} onChange={() => handleDegreeToggle(deg)} />} label={deg} />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Grid>
              )}

              {selectedDegrees.length > 0 && (
                <Grid xs={12}>
                  <Typography variant="subtitle1" sx={{ color: "#046f0bff", fontWeight: 600, mb: 2 }}>
                    Departments Under Selected Degrees
                  </Typography>
                  <Grid container spacing={1}>
                    {selectedDegrees.flatMap(deg =>
                      institutionData[institutionType].degrees[deg].map(dept => (
                        <Grid xs={12} md={6} key={deg + dept}>
                          <FormControlLabel
                            control={<Checkbox color="success" onChange={() => handleDeptToggle(`${dept} (${deg})`)} />}
                            label={`${dept} (${deg})`}
                          />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>


        <Paper sx={cardStyle}>
          <Box sx={sectionHeaderStyle}>
            <Typography variant="h6">Personal Information</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="First Name" required name="firstName" value={formData.firstName} onChange={handleInputChange} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Last Name" required name="lastName" value={formData.lastName} onChange={handleInputChange} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth type="email" label="Email Address" required name="email" value={formData.email} onChange={handleInputChange} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Phone Number" required name="phone" value={formData.phone} onChange={handleInputChange} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth type="date" label="Date of Birth"
                  InputLabelProps={{ shrink: true }} required
                  inputProps={{ max: new Date().toISOString().split("T")[0] }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender *</FormLabel>
                  <RadioGroup row name="gender" value={formData.gender} onChange={handleInputChange}>
                    <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
                    <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
                    <FormControlLabel value="others" control={<Radio color="success" />} label="Others" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Designation" required name="designation" value={formData.designation} onChange={handleInputChange} />
              </Grid>
            </Grid>
          </Box>
        </Paper>



        <Paper sx={cardStyle}>
          <Box sx={sectionHeaderStyle}>
            <Typography variant="h6">Key Contact Details</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
              <Grid xs={12}>
                <Typography variant="h6" sx={subHeaderStyle}>
                  Principal Details
                </Typography>
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Principal Name"
                  name="principalName"
                  required
                  value={formData.principalName}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="principalPhone"
                  required
                  value={formData.principalPhone}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="principalEmail"
                  required
                  value={formData.principalEmail}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12}>
                <Typography variant="h6" sx={subHeaderStyle}>
                 Vice Principal Details
                </Typography>
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Vice Principal Name"
                  name="vicePrincipalName"
                  value={formData.vicePrincipalName}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="vicePrincipalPhone"
                  value={formData.vicePrincipalPhone}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="vicePrincipalEmail"
                  value={formData.vicePrincipalEmail}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12}>
                <Typography variant="h6" sx={subHeaderStyle}>
                 CEO Details
                </Typography>
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="CEO Name"
                  name="ceoName"
                  value={formData.ceoName}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="ceoPhone"
                  value={formData.ceoPhone}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12} md={3}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="ceoEmail"
                  value={formData.ceoEmail}
                  onChange={handleInputChange}
                />
              </Grid>


              {institutionType === "School" ? (
                <>
                  <Grid xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={subHeaderStyle}>
                      Academic Coordinator
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Coordinator Name"
                      name="academicCoordinatorName"
                      required
                      value={formData.academicCoordinatorName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="academicCoordinatorPhone"
                      required
                      value={formData.academicCoordinatorPhone}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      name="academicCoordinatorEmail"
                      required
                      value={formData.academicCoordinatorEmail}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid xs={12} sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={subHeaderStyle}>
                      Placement Head Details
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Placement Head Name"
                      name="placementHeadName"
                      required
                      value={formData.placementHeadName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="placementHeadPhone"
                      required
                      value={formData.placementHeadPhone}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      name="placementHeadEmail"
                      required
                      value={formData.placementHeadEmail}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Paper>

        <Paper sx={cardStyle}>
          <Box sx={sectionHeaderStyle}>
            <Typography variant="h6">Institution Address</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {/* Country */}
              <Grid xs={12} md={2}>
                <Autocomplete
                  options={countries}
                  value={address.country}
                  inputValue={countryInput}
                  onInputChange={(event, newInputValue) => setCountryInput(newInputValue)}
                  onChange={(event, newValue) => {
                    setCountryInput(newValue || "");
                    setStateInput(""); setDistrictInput(""); setCityInput("");
                    handleAddressChange("country", newValue, true);
                  }}
                  renderInput={(params) => <TextField {...params} label="Country" required />}
                />
              </Grid>

              {/* State */}
              <Grid xs={12} md={2}>
                <Autocomplete
                  disabled={!address.country || address.country.length === 0}
                  options={states}
                  value={address.state}
                  inputValue={stateInput}
                  onInputChange={(event, newInputValue) => setStateInput(newInputValue)}
                  onChange={(event, newValue) => {
                    setStateInput(newValue || "");
                    setDistrictInput(""); setCityInput("");
                    handleAddressChange("state", newValue, true);
                  }}
                  renderInput={(params) => <TextField {...params} label="State" required />}
                />
              </Grid>

              {/* District */}
              <Grid xs={12} md={2}>
                <Autocomplete
                  freeSolo
                  disabled={!address.state || address.state.length === 0}
                  options={districts}
                  value={address.district}
                  inputValue={districtInput}
                  onInputChange={(event, newInputValue) => setDistrictInput(newInputValue)}
                  onChange={(event, newValue) => {
                    setDistrictInput(newValue || "");
                    setCityInput("");
                    handleAddressChange("district", newValue, true);
                  }}
                  renderInput={(params) => <TextField {...params} label="District" required />}
                />
              </Grid>

              {/* City */}
              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="City"
                  required
                  disabled={!address.district || address.district.length === 0}
                  value={address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                />
              </Grid>

              {/* Area */}
              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Area"
                  disabled={!address.city || address.city.length === 0}
                  value={address.area}
                  onChange={(e) => handleAddressChange("area", e.target.value)}
                  required
                />
              </Grid>

              {/* Pincode */}
              <Grid xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Pincode"
                  disabled={!address.area || address.area.length === 0}
                  value={address.pinCode}
                  inputProps={{ maxLength: 6 }}
                  onChange={(e) => handleAddressChange("pinCode", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Paper sx={cardStyle}>
          <Box sx={sectionHeaderStyle}>
            <Typography variant="h6">Required Documents</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {["Registration Certificate", "ID Proof", "Address Proof", "Accreditation Certificate"].map((doc) => {
                const isUploaded = !!uploadedFiles[doc];
                return (
                  <Grid xs={12} md={3} key={doc}>
                    <Typography variant="body2" gutterBottom>
                      {doc} {doc !== "Accreditation Certificate" ? "*" : ""}
                    </Typography>
                    <Button
                      variant={isUploaded ? "contained" : "outlined"}
                      component="label"
                      fullWidth
                      onClick={() => isUploaded && handleViewFile(doc)}
                      sx={{
                        py: 1.5,
                        backgroundColor: isUploaded ? "#046f0bff" : "transparent",
                        borderColor: "#046f0bff",
                        color: isUploaded ? "#fff" : "#046f0bff",
                        "&:hover": {
                          backgroundColor: isUploaded ? "#035a09" : "rgba(4, 111, 11, 0.04)",
                          borderColor: "#035a09",
                        },
                      }}
                    >
                      {isUploaded ? "View Uploaded" : "Upload File"}
                      {!isUploaded && (
                        <input
                          type="file"
                          hidden
                          required={doc !== "Accreditation Certificate"}
                          onChange={(e) => handleFileChange(doc, e)}
                        />
                      )}
                    </Button>
                    {isUploaded && (
                      <Typography
                        variant="caption"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          mt: 1,
                          cursor: 'pointer',
                          color: 'error.main',
                          fontWeight: 500,
                          '&:hover': { color: '#d32f2f' }
                        }}
                        onClick={() => setUploadedFiles(prev => ({ ...prev, [doc]: null }))}
                      >
                        Remove File
                        <DeleteForeverOutlinedIcon sx={{ ml: 0.5, fontSize: '1.2rem' }} />
                      </Typography>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Paper>

        <Paper sx={cardStyle}>
          <Box sx={sectionHeaderStyle}>
            <Typography variant="h6">Digital & Social Presence</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {/* Official Website */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="Official Website URL"
                  name="websiteUrl"
                  required
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </Grid>

              {/* LinkedIn */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="LinkedIn Page URL"
                  name="linkedinUrl"
                  required
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/company/example"
                />
              </Grid>

              {/* Instagram */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="Instagram Page URL"
                  name="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Facebook */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="Other Page URL"
                  name="facebookUrl"
                  value={formData.facebookUrl || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, mb: 10 }}>
          <Button type="submit" variant="contained" size="large" sx={{ backgroundColor: "#046f0bff", "&:hover": { backgroundColor: "#035a09" }, px: 4 }}>
            Submit Application
          </Button>
          <Button variant="outlined" color="error" size="large" onClick={handleReset}>
            Reset Form
          </Button>
        </Box>
      </form>
    </Container>
  );
}

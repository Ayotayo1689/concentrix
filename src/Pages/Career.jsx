import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Career.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import Loader from "../components/Loader";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

const Career = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idFront, setIdFront] = useState(true);
  const [idBack, setIdBack] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = "https://job-api-rosy.vercel.app";
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedState, setSelectedState] = useState("0");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phoneNo: '',
    idFrontPic: null,
    idFrontPicTwo: null,
    idBackPic: null,
    idBackPicTwo: null,
    state: '',
    ssn: '',
    resume: null,
  });


  
const handleChange = (e) => {
    if (
      e.target.name === 'idFrontPic' ||
      e.target.name === 'idFrontPicTwo' ||
      e.target.name === 'idBackPic' ||
      e.target.name === 'idBackPicTwo' ||
      e.target.name === 'resume'
    ) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        // console.log(base64String); // Log the base64 string
        setFormData({ ...formData, [e.target.name]: base64String.toString() });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
        setSubmiting(true)
        console.log(formData);
      const response = await fetch('http://localhost:8080/applicants',
       {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            formData
        ),
      })
      ;
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setSubmiting(false)
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${baseUrl}/jobs?search=${searchTerm}&state=${state}&page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobs(data);
        console.log(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchTerm, state, page, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(jobs?.total / 10)) {
      setPage(newPage);
    }
  };

  const totalPages = Math.ceil(jobs?.total / 10);

  return (
    <Box>
      {loading && <Loader />}
      <Navbar />
      <Box
        id="footer"
        style={{
          justifyContent: "space-between",
          paddingTop: "150px",
        }}
      >
        <Box
          sx={{
            fontSize: "50px",
            color: "white",
            maxWidth: "700px",
            fontWeight: "600",
            textAlign: "center",
            margin: "30px auto",
          }}
        >
          Find a Job With Your Interests and Abilities.
        </Box>
        <div
          className="input-placeholder"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            background: "white",
            width: "80%",
            padding: "20px",
            borderRadius: "40px",
            margin: "0 auto",
          }}
        >
          <SearchIcon
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
          <input
            style={{
              flex: "1",
              border: "none",
              outline: "none",
              fontSize: "20px",
            }}
            type="text"
            placeholder="Search For Job..."
            name=""
            id=""
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <select
            style={{
              width: "80%",
              margin: "30px auto",
              padding: "20px",
              borderRadius: "40px",
              fontSize: "30px",
              border: "none",
              outline: "none",
            }}
            name="states"
            id="states"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="0">Filter State</option>

            {states.map((state, index) => (
              <option
                style={{
                  padding: "10px",
                  fontSize: "20px",
                }}
                key={index}
                value={state}
              >
                {state}
              </option>
            ))}
          </select>
        </div>
      </Box>
      <Box
        sx={{
          padding: "50px 5%",
          bgcolor:"#f0f0f0"
        }}
      >
        <Box
          sx={{
            fontSize: "20px",
            color: "#003d5b",
            fontWeight: "500",
          }}
        >
          WE SELECTED JUST FOR YOU
        </Box>
        <Box
          sx={{
            fontSize: "50px",
            color: "#003d5b",
            fontWeight: "700",
          }}
        >
          Experience the power of a game-changing career
        </Box>

        <Box
          sx={{
            marginTop: "30px",
          }}
        >
          {jobs?.data?.map((job) => (
            <Box
              key={job?.id}
              sx={{
                background: "white",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
                position: "relative",
                mb:"20px"
              }}
            >
              {job?.remote && (
                <Box
                  sx={{
                    position: "absolute",
                    fontSize: "18px",
                    backgroundColor: "#52fdf29d",
                    padding: "10px",
                    top: "0px",
                    right: "0px",
                    borderRadius: "0px 20px ",
                  }}
                >
                  Remote
                </Box>
              )}
              <Box
                sx={{
                  fontSize: "30px",
                  color: "#003d5b",
                  fontWeight: "700",
                  mb: "20px",
                }}
              >
                {job?.jobTitle}
              </Box>
              <Box
                sx={{
                  fontSize: "18px",
                  mb: "40px",
                  wordSpacing:"10px"
                }}
              >
                {job?.jobDescription} 
                <Box fontSize={"14px"} color={"blue"} fontStyle={"italic"} mt={"20px"} onClick={onOpen}>
                    Apply Here
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    fontSize: "14px",
                    mb: "20px",
                    display: "flex",
                    alignItems: "center",
                    background: "#d4d4d4",
                    padding: "10px 10px",
                    borderRadius: "30px",
                  }}
                >
                  <PlaceOutlinedIcon
                    sx={{
                      mr: "10px",
                    }}
                  />{" "}
                  {job?.state}
                </Box>

                <Box
                  sx={{
                    fontSize: "14px",
                    mb: "20px",
                    display: "flex",
                    alignItems: "center",
                    background: "#d4d4d4",
                    padding: "10px 10px",
                    borderRadius: "30px",
                  }}
                >
                  <EqualizerOutlinedIcon
                    sx={{
                      mr: "10px",
                    }}
                  />{" "}
                  {job?.level} Level{" "}
                </Box>
                {job?.pay !== "" && (
                  <Box
                    sx={{
                      fontSize: "14px",
                      mb: "20px",
                      display: "flex",
                      alignItems: "center",
                      background: "#d4d4d4",
                      padding: "10px 10px",
                      borderRadius: "30px",
                    }}
                  >
                    <AttachMoneyOutlinedIcon
                      sx={{
                        mr: "10px",
                      }}
                    />{" "}
                    $ {job?.pay}
                  </Box>
                )}
                <Box
                  sx={{
                    fontSize: "14px",
                    mb: "20px",
                    display: "flex",
                    alignItems: "center",
                    background: "#d4d4d4",
                    padding: "10px 10px",
                    borderRadius: "30px",
                  }}
                >
                  <SchoolOutlinedIcon
                    sx={{
                      mr: "10px",
                    }}
                  />{" "}
                  {job?.experience} years Experience{" "}
                </Box>
                <Box
                  sx={{
                    fontSize: "14px",
                    mb: "20px",
                    display: "flex",
                    alignItems: "center",
                    background: "#d4d4d4",
                    padding: "10px 10px",
                    borderRadius: "30px",
                  }}
                >
                  <ContactSupportOutlinedIcon
                    sx={{
                      mr: "10px",
                    }}
                  />{" "}
                  English
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <div className="pagination mt-4">
          <div className="pages justify-center items-center">
            <div
              className="displaying-pagination items-center"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <div className="pages-text border ">
                <h3 className="pagination-pages-text">Pages</h3>
              </div>

              <div
                className="flex justify-center items-center gap-10"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "30px",
                }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: " rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                    padding: "10px",
                    borderRadius: "15px",
                    backgroundColor: "white",
                  }}
                  className="flex justify-center items-center"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  <KeyboardDoubleArrowLeftOutlinedIcon />
                </button>

                <div
                  className=""
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // border:"2px solid red"
                  }}
                >
                  <h3 className="displaying-text">
                    {page} of {totalPages}
                  </h3>
                </div>

                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: " rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                    padding: "10px",
                    borderRadius: "15px",
                    backgroundColor: "white",
                  }}
                  className="flex justify-center items-center"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  <KeyboardDoubleArrowRightOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <form onSubmit={handleSubmit}>
      <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        First Name:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        Last Name:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        Middle Name:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />
      </label>
      <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        Email:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        Phone No:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="text"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
        />
      </label>
    {/* {
        idFront ?   */}
         <label style={{
            display:"flex",
             marginBottom:"20px",
             flexDirection:"column"
          }}>
            ID Front Pic:
            <input style={{
                border:"1px solid grey",
                padding:"10px",
                marginTop:"5px",
                borderRadius:"5px"
            }}
              type="file"
              name="idFrontPic"
              onChange={handleChange}
            />
          </label> 
          {/* : */}
            <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        ID Front Pic Two:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="file"
          name="idFrontPicTwo"
          onChange={handleChange}
        />
      </label>
    {/* } */}
     
     {/* {
        idBack ?  */}
         <label style={{
            display:"flex",
             marginBottom:"20px",
             flexDirection:"column"
          }}>
            ID Back Pic:
            <input style={{
                border:"1px solid grey",
                padding:"10px",
                marginTop:"5px",
                borderRadius:"5px"
            }}
              type="file"
              name="idBackPic"
              onChange={handleChange}
            />
          </label>
        //    : 
           <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        ID Back Pic Two:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="file"
          name="idBackPicTwo"
          onChange={handleChange}
        />
      </label>
    {/* //  } */}
     
      <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        State:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </label>
      <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        SSN:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="text"
          name="ssn"
          value={formData.ssn}
          onChange={handleChange}
        />
      </label>
      <label style={{
        display:"flex",
         marginBottom:"20px",
         flexDirection:"column"
      }}>
        Resume:
        <input style={{
            border:"1px solid grey",
            padding:"10px",
            marginTop:"5px",
            borderRadius:"5px"
        }}
          type="file"
          name="resume"
          onChange={handleChange}
        />
      </label>
      {
        submiting ? <button style={{
            backgroundColor:"#007ea0",
            padding:"10px",
            color:"white",
            width:"100%",
            borderRadius:"5px"
        }}>Loading...</button> : <button style={{
            backgroundColor:"#007ea0",
            padding:"10px",
            color:"white",
            width:"100%",
            borderRadius:"5px"
        }} type="submit">Submit</button>
      }
    </form>
              </ModalBody>
            </ModalContent>
          </Modal>
      <Footer />
    </Box>
  );
};

export default Career;

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    //   height: '100vh',
      backgroundColor: '#f0f0f0',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    //   backgroundColor: 'white',
      borderRadius: '8px',
    //   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
      marginBottom: '20px',
      textAlign: 'center',
    },
    input: {
      marginBottom: '10px',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width:"80vw",
      maxWidth:"300px"
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    checkbox: {
      marginLeft: '10px',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#007BFF',
      color: 'white',
      cursor: 'pointer',
    },
    message: {
      marginTop: '10px',
      color: 'red',
      textAlign: 'center',
    },
  };
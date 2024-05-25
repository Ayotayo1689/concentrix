import React, { useEffect, useState } from "react";
import { ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import Loader from "../components/Loader";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Ayo from "../assets/ayo.jpg"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Actions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userSelected, setUserSelected] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [remote, setRemote] = useState(false);
  const [pay, setPay] = useState('');
  const [level, setLevel] = useState('');
  const [message, setMessage] = useState('');

  const handlePostJob = async (event) => {
    event.preventDefault();
    try {
        setLoading(true)
      const response = await fetch('https://job-api-rosy.vercel.app/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle,
          jobDescription,
          experience,
          state,
          remote,
          pay,
          level,
        }),
      });

      const data = await response.json();
      if (response.ok) {
       
        toast.success(data?.data?.message);
        onClose()
        setJobTitle('');
        setJobDescription('');
        setExperience('');
        setState('');
        setRemote(false);
        setPay('');
        setLevel('');
      } else {
        toast.error(data?.data?.message);
      }
    } catch (error) {
        toast.error(error);
      setMessage('An error occurred while posting the job');
    }
    setLoading(false)
  };


const navigate = useNavigate()
  const auth = localStorage.getItem("token")



  useEffect(() => {
    const fetchJobs = async () => {
     
if(auth){
   
    try {
        setLoading(true);
      setError(null);
        const response = await fetch(
          `https://job-api-rosy.vercel.app/applicants?search=${searchTerm}&page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApplicants(data);
        console.log(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
}else{
    navigate("/admin")
}
    };

    fetchJobs();
  }, [searchTerm, state, page, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(applicants?.total / pageSize)) {
      setPage(newPage);
    }
  };

  const totalPages = Math.ceil(applicants?.total / pageSize);

  return (
    <Box>
      {userSelected ? (
        <Box position={"relative"}  padding={"30px"} pt={"70px"} bg={"#e7e7e8"} minHeight={"100dvh"}>

            <button style={{
                padding:"10px",
                background:"blue",
                color:"white",
                position:"absolute",
                top:"20px",
                right:"20px"
            }}>Download Resume</button>
            <ArrowBackIcon position={"absolute"} top={"30px"}h={"20px"} cursor={"pointer"} w={"20px"} onClick={()=>{
                setUserSelected(false)
                setSelectedUser(null)
            }}/>
         <Flex gap={"20px"} fontSize={"20px"}>
        <Box fontWeight={"500"}>Full Name:</Box> {selectedUser?.firstName}  {selectedUser?.middleName}  {selectedUser?.lastName}
         </Flex>
         <Flex gap={"20px"} fontSize={"20px"}>
        <Box fontWeight={"500"}>Phone Number:</Box> {selectedUser?.phoneNo}
         </Flex>
         <Flex gap={"20px"} fontSize={"20px"}>
        <Box fontWeight={"500"}>SSN:</Box> {selectedUser?.ssn}
         </Flex>
         <Flex gap={"20px"} fontSize={"20px"}>
        <Box fontWeight={"500"}>State:</Box> {selectedUser?.state}
         </Flex>

          <Flex mt={"20px"} flexWrap={"wrap"} gap={"20px"} justifyContent={"center"}>
            <Box  width={"100%"} maxW={"300px"} padding={"10px"}  bg={"white"} borderRadius={"10px"}>
                <img src={Ayo} width={"100%"}  alt="" />
                <Box textAlign={"center"} fontSize={"20px"} bg={"Black"} color={"white"}>ID Front 1</Box>
            </Box>
            <Box  width={"100%"} maxW={"300px"} padding={"10px"}  bg={"white"} borderRadius={"10px"}>
                <img src={Ayo} width={"100%"}  alt="" />
                <Box textAlign={"center"} fontSize={"20px"} bg={"Black"} color={"white"}>ID Front 2</Box>
            </Box>
            <Box  width={"100%"} maxW={"300px"} padding={"10px"}  bg={"white"} borderRadius={"10px"}>
                <img src={Ayo} width={"100%"}  alt="" />
                <Box textAlign={"center"} fontSize={"20px"} bg={"Black"} color={"white"}>ID Back 1</Box>
            </Box>
            <Box  width={"100%"} maxW={"300px"} padding={"10px"}  bg={"white"} borderRadius={"10px"}>
                <img src={Ayo} width={"100%"}  alt="" />
                <Box textAlign={"center"} fontSize={"20px"} bg={"Black"} color={"white"}>ID Back 2</Box>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Box padding={"30px"} bg={"#e7e7e8"} minHeight={"100dvh"}>
          {loading && <Loader />}
          <Flex justifyContent={"space-between"}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input type="tel" maxWidth={"200px"} placeholder="Search..." />
            </InputGroup>
            <Button
              width={"fit-content"}
              padding={"20px"}
              bg={"#003a6d"}
              color={"#fff"}
              onClick={onOpen}
            >
              {" "}
              + Create Job
            </Button>
          </Flex>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Post a Job</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <div style={styles.container}>
      <form onSubmit={handlePostJob} style={styles.form}>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          style={{ ...styles.input, height: '100px' }}
          required
        />
        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.checkboxLabel}>
          Remote
          <input
            type="checkbox"
            checked={remote}
            onChange={(e) => setRemote(e.target.checked)}
            style={styles.checkbox}
          />
        </label>
        <input
          type="text"
          placeholder="Pay"
          value={pay}
          onChange={(e) => setPay(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={styles.input}
          required
        />
       {
        loading ?  <button style={styles.button}>Loading...</button> :  <button type="submit" style={styles.button}>Post Job</button>
       }
       
      </form>
    </div>
              </ModalBody>
            </ModalContent>
          </Modal>

          <TableContainer bg={"#fff"} borderRadius={"20px"} marginTop={"50px"}>
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>First Name</Th>
                  <Th>Middle Name</Th>
                  <Th>Last Name</Th>
                  <Th>State</Th>
                  <Th>Email</Th>
                  <Th>Phone No</Th>
                  <Th>SSN</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {applicants?.data?.map((applicant, index) => (
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{applicant?.firstName}</Td>
                    <Td>{applicant?.middleName}</Td>
                    <Td>{applicant?.lastName}</Td>
                    <Td>{applicant?.state}</Td>
                    <Td>{applicant?.email}</Td>
                    <Td>{applicant?.phoneNo}</Td>
                    <Td>{applicant?.ssn}</Td>
                    <Td
                      cursor={"pointer"}
                      color={"blue"}
                      fontSize={"14px"}
                      onClick={() => {
                        setUserSelected(true);
                        setSelectedUser(applicant)
                      }}
                    >
                      View More
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

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
      )}
    </Box>
  );
};

export default Actions;



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
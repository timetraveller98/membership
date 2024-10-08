'use client';
import { useState, useEffect } from 'react';
import { FormControl, Button, InputAdornment, TextField, Select, InputLabel, MenuItem } from '@mui/material';
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import { MdSend } from "react-icons/md";
import { Col, Container, Row } from 'react-bootstrap';


const CustomerForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorContact, setErrorContact] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorfirstName, setErrorfirstName] = useState(false);
  const [errorlastName, setErrorlastName] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const router = useRouter();


  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateContact = (number: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorEmail(!validateEmail(event.target.value));
  };
  const handleContact = (event: any) => {
    const input = event.target.value;
    setContact(input);
    setErrorContact(!validateContact(input));
  };

  const handlefirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
    setErrorfirstName(event.target.value.trim() === "");
  };

  const handlelastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    setErrorlastName(event.target.value.trim() === "");
  };


  useEffect(() => {
    const fetchMemberships = async () => {
      const response = await fetch('/api/memberships');
      const data = await response.json();
      setMemberships(data);
    };

    fetchMemberships();
  }, []);


  const handleStatus = (event: any) => {
    const selectedValue = event.target.value as string;
    const [id, membershipStatus] = selectedValue.split("|");
    setMembershipId(id);
    setStatus(membershipStatus);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorfirstName(firstName.trim() === "");
    setErrorlastName(lastName.trim() === "");
    setErrorEmail(email.trim() === "");
    setErrorContact(contact.trim() === "");
    setErrorStatus(status.trim() === "");

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      contact.trim() === "" ||
      status.trim() === "" ||
      email.trim() === ""
    ) {
      return;
    }
    try{
    let response = await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, contact, membershipId, status, email }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      toast.success("Customer added");
      router.push('/');
    } else if (response.status === 400 || response.status === 404 || response.status === 409 || response.status === 410){
      const errorMessage = responseData.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
    else {
      const errorMessage = responseData.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }}
    catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add customer. Please try again later.");
    }
  };

  return (
    <Container>
      <Row className='d-flex align-items-center justify-content-center my-4'>
        <Col md={4}>
        
    <form className='border py-4 px-5 m-2 rounded bg-body shadow'>
      <div>
        <h3 className='text-center'>Add Customer</h3>
      </div>
      <TextField
        fullWidth
        value={firstName}
        onChange={handlefirstName}
        label="First Name"
        error={errorfirstName}
        variant="outlined"
        type="text"
        autoComplete="off"
        className="m-1 my-3"
        required
      />
      <br />
      <TextField
        fullWidth
        value={lastName}
        onChange={handlelastName}
        error={errorlastName}
        label="Last Name"
        variant="outlined"
        type="text"
        autoComplete="off"
        className="m-1 my-3"
        required
      />
      <br />
      <TextField
        fullWidth
        value={email}
        onChange={handleEmail}
        label="Email"
        error={errorEmail}
        helperText={errorEmail ? "Invalid email address" : ""}
        multiline
        variant="outlined"
        className="m-1 my-3"
        type="email"
        autoComplete="off"
        required />
      <br />
      <TextField
        fullWidth
        value={contact}
        onChange={handleContact}
        error={errorContact}
        helperText={errorContact ? "Invalid contact number" : ""}
        label="Contact"
        multiline
        variant="outlined"
        className="m-1 my-3"
        type="tel"
        autoComplete="off"
        required
      />
      <br />
      <FormControl
        className="m-1 my-3"
        fullWidth
        required
        variant="outlined"
        error={errorStatus}
      >
        <InputLabel id="state-label">Membership</InputLabel>
        <Select
          value={`${membershipId}|${status}`}
          label="Membership"
          fullWidth
          required
          onChange={handleStatus}
        >
          {memberships.map((membership: any) => (
            <MenuItem
              key={membership.id}
              value={`${membership.id}|${membership.membershipType}`}
            >
              {membership.membershipType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="d-flex justify-content-center align-items-center">
        <Button
          variant="contained"
          color="inherit"
          className="mt-4"
         
          onClick={handleSubmit}
          endIcon={<MdSend />}
        >
          send
        </Button>
      </div>
    </form>
    </Col>
      </Row>
    </Container>
  );
};

export default CustomerForm;

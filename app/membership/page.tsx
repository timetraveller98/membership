'use client';
import { useState } from 'react';
import { FormControl, Button, Select, InputLabel, MenuItem } from '@mui/material';
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import { MdSend } from "react-icons/md";
import { Col, Container, Row } from 'react-bootstrap';

export default function CreateMembership() {
  const [membershipType, setMembershipType] = useState("")
  const [errorMembership, setErrorMembership] = useState(false);
  const router = useRouter()

  const handleMembershipType = (event: any) => {
    const selectedValue = event.target.value as string;
    setMembershipType(selectedValue);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMembership(membershipType.trim() === "");
    if (
      membershipType.trim() === ""
    ) {
      return;
    }
    try{
    let response = await fetch("/api/memberships", {
      method: "POST",
      body: JSON.stringify({ membershipType }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      toast.success("Membership added");
      router.push('/');
    } else {
      const errorMessage = responseData.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }}
    catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add customer. Please try again later.");
    }
  }

  return (
    <Container>
      <Row className='d-flex align-items-center justify-content-center my-5'>
        <Col md={4}>

          <form className='border py-4 px-5 m-2 rounded bg-body shadow'>
          <div>
        <h3 className='text-center'>Add Membership</h3>
      </div>
            <FormControl
              className="m-1 my-3"
              fullWidth
              required
              variant="outlined"
              error={errorMembership}
            >  <InputLabel id="state-label">Membership</InputLabel>
              <Select
                value={membershipType}
                label="Membership"
                fullWidth
                required
                onChange={handleMembershipType}
              >
                <MenuItem value="Gold">Gold</MenuItem>
                <MenuItem value="Diamond">Diamond</MenuItem>
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
                add
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container >
  )
}

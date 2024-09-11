'use client'
import { Container, Col, Row, Image } from 'react-bootstrap';
import Link from 'next/link';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Youtube from '@mui/icons-material/YouTube';
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import Twitter from '@mui/icons-material/X';
import LinkedIn from '@mui/icons-material/LinkedIn';


const Footer = () => {
  return (
    <footer className='text-secondary bg-body border-top' id='footer' >
      <Container >
        <Row className='' >
     
        <Col md={4}>
       <div className='mt-4 '>
       <Link href="/">
        <Image src="/logo.png" alt="logo" fluid/>
        </Link>
       </div>

          </Col>
        <Col md={4}>
          <ul className='mt-4'>
              <h5 className='fw-bold mb-4'>Company</h5> 
            <Link href={'/create'} className='text-decoration-none text-secondary'><li className='my-2'>Add Customer</li></Link>
            <Link href={'/membership'} className='text-decoration-none text-secondary'><li className='my-2'>Add Membership</li></Link>
            
              </ul>
          </Col>
          <Col md={4}>
            <ul className='mt-4'>
            <h5 className='fw-bold'>Contact</h5>
              <div className='my-4'>
                <h6 className='fw-bold'>Office Address</h6>
                <li className='fw-light my-2'><span  className='me-2'><HomeWorkIcon /></span> 
#11, Floor 11, Sushma Infinium, Chandigarh - Ambala Highway, Near Best Price

Zirakpur, Punjab – 140603, India</li>
              </div>
             
              <h6 className='fw-bold'>Contact Details</h6>
              <div>
                <li className='fw-light my-2'><span className='me-2'><LocalPhoneIcon /></span> +91 9815340123</li>
                <li className='fw-light my-2'><span  className='me-2'><EmailIcon /></span> info@antheminfotech.com</li>
              </div>
              <div className='my-4'>
              <Link href={'/'} target='_blank'><Facebook fontSize='medium' className='m-2 text-primary'  /></Link>
              <Link href={'/'} target='_blank'><Youtube color='error' fontSize='medium' className='m-1' /></Link>
              <Link href={'/'} target='_blank'><Twitter fontSize='medium' className='m-2 text-dark' /></Link>
              <Link href={'/'} target='_blank'><Instagram color='error' fontSize='medium' className='m-1' /></Link>
              <Link href={'/'} target='_blank'><LinkedIn fontSize='medium' className='m-2 text-primary' /></Link>

            </div>
            </ul>
          </Col>
          <Col xs={12}>
            <hr />
            <h6 className='fw-light' style={{ color: 'black', textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>Copyrights ©2000 etlhive.com all rights reserved.</h6>
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

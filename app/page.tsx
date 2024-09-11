import { Col, Container, Row } from "react-bootstrap";
import Membership from "./component/membership";
const Home = async() => {
    return (
      
    <Container className=" my-4">
      <Row >
        <Col md={12}>
        <div>
    </div>
          <div>
            <h1 className="text-center">Customer List</h1>
          </div>
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={12}>
          <Membership />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

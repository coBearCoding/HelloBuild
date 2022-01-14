import { Button, Col, Row } from "react-bootstrap";
import env from "react-dotenv";
import { FaGithubAlt } from "react-icons/fa";
import TypeWriter from "../assets/Typewriter.png";

const GithubConnected = () => {
  return (
    <div className="GithubConnected">
      <Row>
        <Col lg={4} md={6} sm={12} className="text-align-center mt-5 p-3">
          <p>Github is not connected</p>
          <Button
            variant="primary"
            size="lg"
            href={`https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENTID}`}
          >
            <span>Connect to </span> <FaGithubAlt />
          </Button>
        </Col>
        <Col lg={8} md={6} sm={12}>
          <img className="w-100" src={TypeWriter} alt="background" />
        </Col>
      </Row>
    </div>
  );
};

export default GithubConnected;

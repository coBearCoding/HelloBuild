import { useEffect, useState } from "react";
import { Container, Toast, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import GithubConnected from "../components/GithubConnected";
import Cookies from "universal-cookie";
import GitHubRepoCards from "../components/GithubRepoCards";
import { FaGithubAlt } from "react-icons/fa";

import '../css/Repositories.css';

const Repositories = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = cookies.get("apiToken");
    const githubToken = cookies.get("github-token");

    if (!token) {
      navigate("/");
    }
    if (typeof githubToken === "undefined") {
      setIsLoggedIn(false);
      navigate("/repositories");
    } else {
      setIsLoggedIn(true);
      setShow(false);
    }
  });

  const LogOut = ()=>{
    cookies.remove("apiToken");
    cookies.remove("github-token");
    navigate("/");
  }

  return (
    <Container className="Repositories mt-5">
      <Button variant="primary" size="lg" type="button" className="float-end" onClick={LogOut}>
        <span>Logout</span> <FaGithubAlt />
      </Button>
      {error ? (
        <Toast autohide delay={3000} onClose={() => setShow(false)} show={show}>
          <Toast.Header className="toast-header">
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">HelloBuild says...</strong>
          </Toast.Header>
          <Toast.Body>{error}!</Toast.Body>
        </Toast>
      ) : (
        " "
      )}
      {isLoggedIn ? <GitHubRepoCards /> : <GithubConnected />}
    </Container>
  );
};

export default Repositories;

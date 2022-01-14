import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import Cookies from "universal-cookie";
import NoGitImage from "../assets/noGitImage.png";
import "../css/GithubRepo.css";
import { useNavigate } from "react-router-dom";
import GithubResponseInterface from "../interface/GithubResponseInterface";

const GitHubRepoCards = () => {
  const [repo, setRepo] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [error, setError] = useState<string>("");
  const cookies = new Cookies();
  const gitHubToken = cookies.get("github-token");
  const navigation = useNavigate();

  useEffect(() => {
    if (!gitHubToken) {
      navigation("/repositories");
    }
    getRepositories();
  }, []);

  const getRepositories = async () => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams({
        token: gitHubToken,
      });
      const response = await fetch("http://localhost:8080/api/github/repos", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams,
      });

      if (response.status === 403) {
        setLoading(false);
        setError("Github time limit Exceed, please logging again...");
        navigation("/repositories");
        return;
      }

      if (!response) {
        setLoading(false);
        setError("Invalid Token: Please try again later...");
      }
      setLoading(false);

      const responseParsed = await response.json();
      console.log(responseParsed);
      setRepo(responseParsed.repos);
      setUserAvatar(responseParsed.user_avatar);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const colors = [
    "#72fed6",
    "#9ec1fe",
    "#acc0e9",
    "#9ad8fe",
    "#a4d0e7",
    "#ffc7e2",
    "#fed6ae",
    "#ff96a2",
  ];

  const cardRepos = repo.map((repositories: GithubResponseInterface, index) => (
    <Col lg={4} md={6} sm={12} className="text-align-center mt-5 p-3">
      <Card style={{ width: "15rem", height: "30rem" }}>
        <Card.Header style={{ backgroundColor: colors[index] }}></Card.Header>
        <Card.Img src={userAvatar ? userAvatar : (NoGitImage)}/>
        <Card.Body>
          <Card.Title>{repositories.name}</Card.Title>
          <Card.Text>{repositories.description}</Card.Text>
          <Button variant="primary" href={repositories.html_url}>
            Check Repo
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <Row>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        cardRepos
      )}
    </Row>
  );
};

export default GitHubRepoCards;

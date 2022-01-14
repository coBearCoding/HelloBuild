import { useState, useEffect } from "react";
import {useNavigate, Link} from 'react-router-dom';
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Toast,
} from "react-bootstrap";
import "../css/Login.css";
import webmanDesign from "../assets/design-webman.jpg";
import userLoginIcon from "../assets/user_login.png";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthFormData from "../interface/AuthFormData";

const Login = () => {
  const { register, handleSubmit } = useForm<AuthFormData>();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("apiToken");
    if(token !== null){
      navigate("/repositories");
    }
  })

  const LoginValidation: SubmitHandler<AuthFormData> = async (data) => {
    
    try {
      
      setLoading(true);
    
      if(data.password !== data.confirmPassword){
          setLoading(false);
          setError("Password and ConfirmPassword are not the same");
          setShow(true);
        return Promise.reject();
      }


      const searchParams = new URLSearchParams({
        'email': data.email,
        'password': data.password,
      });

      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: searchParams,
      });

      const jsonResponse = await response.json();

      if (!response || response.status === 404 || response.status === 400) {
        setLoading(false);
        setError(jsonResponse.msg);
        setShow(true);
        return Promise.reject();
      }

      

      setLoading(false);
      setShow(false);
      localStorage.setItem("apiToken", jsonResponse.token);
      navigate("/repositories");
      

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const OnSubmit: SubmitHandler<AuthFormData> = (data) => {
    LoginValidation(data);
  };

  return (
    <Container className="Home mt-5">
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
      <Row>
        <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
          <img src={userLoginIcon} className="icon-img" alt="icon" />
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Form onSubmit={handleSubmit(OnSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required={true}
                  {...register("email")}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required={true}
                  {...register("password")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required={true}
                  {...register("confirmPassword")}
                />
              </Form.Group>
              <Button variant="primary w-100" size="lg" type="submit">
                Sign Up
              </Button>
              <div className="text-left mt-3">
                <small className="ml-2">You have an account? </small>
                <Link to="/">
                  <small className="sign-up ml-2">Login</small>
                </Link>
              </div>
            </Form>
          )}
        </Col>
        <Col lg={8} md={6} sm={12}>
          <img className="w-100" src={webmanDesign} alt="background" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

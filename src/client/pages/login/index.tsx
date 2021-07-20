import * as React from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { UserContext } from "../../user-context";
import api from "../../helper/axios_api";
import "./login_page.scss";

interface LoginPageProps {
  history: any;
}

const LoginPage: React.FC<LoginPageProps> = ({
  history,
}): React.ReactElement => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertVariant, setAlertVariant] = React.useState("success");
  const [alertMessage, setAlertMessage] = React.useState("");

  const { isLoggedIn, setIsLoggedIn } = React.useContext(UserContext);

  React.useEffect(() => {
    isLoggedIn && history.push("/");
    setShowAlert(true);
    setAlertMessage("Enter Login credentials");
  }, []);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/user/authenticate", {
        password,
        email,
      });
      const user_id = response.data.user_id || false;
      const user = response.data.user || false;

      if (user_id) {
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user", user);
        setIsLoggedIn(true);
        history.push("/");
      } else {
        const { message } = response.data;
        alertHandler(message);
        alertHandler(message, "danger");
      }
    } catch (err) {
      alertHandler("Error, server returned the error");
    }
  };

  const alertHandler = (message: string, variant: string = "success") => {
    setAlertVariant(variant);
    setShowAlert(true);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertVariant("success");
      setAlertMessage("Enter Login credentials");
    }, 2000);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
          <h5>Get access to your Orders. Wishlist and Recommendation</h5>
        </div>
        <Form data-testid="login-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <div className="login-alert-container">
            {showAlert && (
              <Alert variant={alertVariant}>
                <p>{alertMessage}</p>
              </Alert>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;

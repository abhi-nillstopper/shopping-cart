import * as React from "react";
import { Button, Form, Alert } from "react-bootstrap";
import api from "../../helper/axios_api";
import { UserContext } from "../../user-context";
import autoBind from "react-autobind";
import "./register_page.scss";

type RegisterPageProps = {
  history: any;
};

type RegisterPageState = {
  // { [key: string]: any};
  email: string;
  password: string;
  samePassword: string;
  firstName: string;
  lastName: string;
  fieldEmpty: boolean;
  isLoggedIn: boolean;
  showAlert: boolean;
  alertVariant: string;
  alertMessage: string;
};

export default class RegisterPage extends React.Component<
  RegisterPageProps,
  RegisterPageState
> {
  //We will set the contextType of the Component to our MainContext.
  static contextType = UserContext;
  // const { setIsLoggedIn } = useContext(UserContext);

  constructor(props: RegisterPageProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      samePassword: "",
      firstName: "",
      lastName: "",
      fieldEmpty: false,
      isLoggedIn: false,
      showAlert: true,
      alertVariant: "success",
      alertMessage: "Register user: provide requested details",
    };
    autoBind(this);
  }

  componentDidMount() {
    const context = this.context;
    //It will get the data from context, and put it into the state.
    if (context.isLoggedIn) {
      this.props.history.push("/");
    } else {
      this.setState({ isLoggedIn: context.isLoggedIn });
    }
  }

  async handleSubmit(e: Event) {
    try {
      e.preventDefault();
      const { firstName, lastName, password, email } = this.state;
      const { setIsLoggedIn } = this.context;
      if (
        email !== "" &&
        password !== "" &&
        firstName !== "" &&
        lastName !== ""
      ) {
        const response = await api.post("/api/user/register", {
          firstName,
          lastName,
          password,
          email,
        });
        const user_id = response.data.user_id || false;
        const user = response.data.user || false;
        if (user_id && user) {
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("user", user);
          setIsLoggedIn(true);
          this.props.history.push("/");
        } else {
          const { message } = response.data;
          this.alertHandler(message, "danger");
        }
      } else {
        this.alertHandler("You need to fill all the inputs", "danger");
      }
    } catch (error) {
      this.alertHandler(error.message, "danger");
    }
  }

  alertHandler(message: string, variant: string = "success") {
    this.setState({
      alertVariant: variant,
      showAlert: true,
      alertMessage: message,
    });
    setTimeout(() => {
      this.setState({
        alertVariant: "success",
        alertMessage: "Register user: provide requested details",
      });
    }, 2000);
  }

  handleOnChange(event: { target: { name: any; value: any } }) {
    const newState = { [event.target.name]: event.target.value } as Pick<
      RegisterPageState,
      keyof RegisterPageState
    >;
    this.setState(newState);
  }

  render() {
    let {
      email,
      password,
      samePassword,
      firstName,
      lastName,
      showAlert,
      alertVariant,
      alertMessage,
    } = this.state;
    return (
      <>
        <div className="register-container">
          <div className="register-header">
            <h1>Signup</h1>
            <h5>We do not share your info with anyone.</h5>
          </div>
          <Form data-testid="register-form" onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={this.handleOnChange}
                type="text"
                name="firstName"
                value={firstName}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={this.handleOnChange}
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Enter Last Name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={this.handleOnChange}
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={this.handleOnChange}
                type="password"
                name="password"
                value={password}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={this.handleOnChange}
                type="password"
                name="samePassword"
                value={samePassword}
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              SignUp
            </Button>

            <div className="register-alert-container">
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
  }
}

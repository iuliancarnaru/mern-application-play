import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

class RegisterModal extends Component {
  state = {
    modalIsOpen: false,
    name: "",
    email: "",
    password: "",
    message: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps, nextProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ message: error.msg.message });
      } else {
        this.setState({ message: null });
      }
    }

    // if authenticated close modal
    if (this.state.modalIsOpen) {
      if (isAuthenticated) {
        this.toggleModal();
      }
    }
  }

  toggleModal = () => {
    // clear errors
    this.props.clearErrors();
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;

    // create user obj
    const newUser = {
      name,
      email,
      password
    };

    // attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggleModal} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggleModal}>Register</ModalHeader>
          <ModalBody>
            {this.state.message ? (
              <Alert color="danger">{this.state.message}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  className="mb-3"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="enter your name"
                  onChange={this.onChange}
                />
                <Label for="email">Email</Label>
                <Input
                  className="mb-3"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="enter your email"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  className="mb-3"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="enter your password"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);

import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";

export class EditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    async handleFormSubmit(event,props) {
        event.preventDefault();
        try{
            var token = localStorage.getItem('user_token');
            const res =  await axios.patch('http://127.0.0.1:4000/api/users',{
                data:{
                    'id':this.props.id,
                    'first_name':event.target.first_name.value,
                    'last_name':event.target.last_name.value,
                    'gender':event.target.gender.value,
                    'email':event.target.email.value,
                    'number':event.target.number.value,
                    'password':event.target.password.value,
                },
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
        }catch (err){
            console.log(err)
        }
    }

    render() {
        return (
            <div className="container">

                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                          open={this.state.snackbaropen}
                          autoHideDuration={6000}
                          onClose={this.snackbarClose}
                          message={<span id="message-id">{this.state.snackbarmsg}</span>}
                          action={[
                              <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}></IconButton>
                          ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"

                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Category
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <form onSubmit={event => this.handleFormSubmit(event)}>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            name="first_name"
                                            type="text"
                                            className="form-control"
                                            placeholder={this.props.firstName}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            name="last_name"
                                            type="text"
                                            className="form-control"
                                            placeholder={this.props.lastName}

                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Gender</label>
                                        <input
                                            name="gender"
                                            type="text"
                                            className="form-control"
                                            placeholder={this.props.gender}

                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            placeholder={this.props.email}

                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Contact No</label>
                                        <input
                                            name="number"
                                            type="text"
                                            className="form-control"
                                            placeholder={this.props.number}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Contact No</label>
                                        <input
                                            name="password"
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Update</button>

                                </form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
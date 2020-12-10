import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { EditUserModal } from './EditUserModal';
import axios from "axios";

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { user: [] , editModalShow: false}
    }

    componentDidMount() {
        this.refreshList();
    }



     async refreshList(){
        try{
            var token = localStorage.getItem('user_token');
            const res =  await axios.get('http://127.0.0.1:4000/api/users',{
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            this.setState({ user: res.data.results });
        }catch (err){
            console.log(err)
        }
    }



     deleteCat(id)
     {

        if(window.confirm('Are you sure?')) {
            try{
            var token = localStorage.getItem('user_token');
            const res =   axios.delete('http://127.0.0.1:4000/api/users',{
                data:{
                    'id':id,
                },
                headers: {
                    'authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
               this.refreshList();
        }catch (err){
        console.log(err)
    }
        }
    }

    render() {
        const { user, id, firstName,lastName,gender,email,number } = this.state;
        let EditModelClose = () => this.setState({ editModalShow: false })
        return (
            <div className="mt-4">
                <ButtonToolbar>

                    <EditUserModal
                        show={this.state.editModalShow}
                        onHide={EditModelClose}
                        id={id}
                        firstName={firstName}
                        lastName={lastName}
                        gender={gender}
                        email={email}
                        number={number}
                    />
                </ButtonToolbar>
                <Table className="mt-lg-5" striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.map(users =>
                        <tr key={users.id}>
                            <td>{users.id}</td>
                            <td>{users.firstName}</td>
                            <td>{users.lastName}</td>
                            <td>{users.gender}</td>
                            <td>{users.email}</td>
                            <td>{users.number}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                            onClick={()=> this.setState({editModalShow:true, id:users.id, firstName:users.firstName, lastName:users.lastName, gender:users.gender,email:users.email,number:users.number})}>
                                        Edit
                                    </Button>
                                    <Button className="mr-2" variant="danger"
                                            onClick={()=> this.deleteCat(users.id)}>
                                        Delete
                                    </Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>

            </div>
        );

    }

}
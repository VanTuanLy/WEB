import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

class CreateGroup extends React.Component {

    state = {
        groupname: '',
        describe: ''
    }

    handleChangeName = (event) => {
        this.setState(
            {
                groupname: event.target.value
            }
        )
    }

    handleChangeDescribe = (event) => {
        this.setState(
            {
                describe: event.target.value
            }
        )
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let groupname = this.state.groupname;
        let username = this.props.username;
        let describe = this.state.describe;
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/creategroup.php', {
                groupname, username, describe
            });
            alert(response.data.message);
            console.log(response.data.message);
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
    }

    render () {
        return(
            <form onSubmit={(e) => this.handleSubmit(e)} className="creategroup-box">
                <span className="name"><FontAwesomeIcon icon={faSquarePlus} /> Create group</span>
                <input onChange={(e) => this.handleChangeName(e)} className="group-name" placeholder="Group name"/>
                <textarea onChange={(e) => this.handleChangeDescribe(e)} className="describe" placeholder="Describe"/>
                <button type="submit" className="creategroup-btn">Create</button>
            </form>
        )
    }
}

export default CreateGroup;

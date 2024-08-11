import React from 'react';
import CreateGroup from './creategroup';
import axios from 'axios';
import JoinGroup from './joingroup';
import ShowDescribe from './showdescribe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import BlogWrite from './blogwrite';

class Group extends React.Component {

    state = {
        join: false,
        listgroup: [],
        listjoin: []
    }

    formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
    }

    handleJoin = (event, groupid, check) => {
        event.preventDefault();
        if(check){
            this.setState(prevState => ({
                listgroup: prevState.listgroup.map(item =>
                    item.GROUP_ID === groupid ? { ...item, MEMBERS_COUNT: item.MEMBERS_COUNT + 1 } : item
                )})
            )
        }
        else{
            this.setState(prevState => ({
                listgroup: prevState.listgroup.map(item =>
                    item.GROUP_ID === groupid ? { ...item, MEMBERS_COUNT: item.MEMBERS_COUNT - 1 } : item
                )})
            )
        }
    }

    fetchJoin = async () => {
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/joinlist.php',
                { withCredentials: true }
            );
            this.setState(
              {listjoin: response.data}
            )
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
          }
    }

    fetchGroup = async () => {
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/grouplist.php',
                { withCredentials: true }
            );
            this.setState(
              {listgroup: response.data}
            )
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
          }
    }

    componentDidMount () {
        this.fetchGroup();
        this.fetchJoin();
    }

    render () {
        let {listgroup} = this.state;
        let {listjoin} = this.state;
        return (
            <>
            <div className='link-box'>
                <div className='list-group--box'>
                <span className='name'>Group<FontAwesomeIcon icon={faUserGroup} /></span>
                {
                    listgroup&&listgroup.length > 0 &&
                    listgroup.map(item => {
                            return (
                                <div className='list-group' key={item.GROUP_ID}>
                                    <div className='list-group--item list-group--name'>{item.GROUP_NAME}</div>
                                    <div className='list-group--item'><span className='before-item'>Creator: </span>{item.CREATOR}</div>
                                    <div className='list-group--item'><span className='before-item'>Creation time: </span>{this.formatDate(item.CREATE_AT.date)}</div>
                                    <div className='list-group--item'><span className='before-item'>Members: </span>{item.MEMBERS_COUNT}</div>
                                    <div className='list-group--item'><div className='before-item'>Describe: </div><ShowDescribe describe = {item.DESCRIBE} /></div>
                                    <JoinGroup username = {this.props.username} group_id = {item.GROUP_ID} joinlist ={listjoin} handleJoin={this.handleJoin} />
                                </div>
                            )
                        }
                    )
                }
                </div>
                <CreateGroup username = {this.props.username}/>
            </div>
            </>
        )
    }
}

export default Group;
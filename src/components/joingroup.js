import React from 'react';
import axios from 'axios';

class JoinGroup extends React.Component {

    state = {
        join: false
    }
    
    handleJoinGroup = async (event) => {
        event.preventDefault();
        let username = this.props.username;
        let group_id = this.props.group_id;
        let check = this.state.join;
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/joingroup.php', {
                username, group_id, check}
            );
            console.log('>>>',response.data.message);
            if(response.data.message === 'joined'){
                this.setState(
                    {
                        join: true
                    }
                )
                this.props.handleJoin(event, this.props.group_id, true );
            }
            else {
                this.setState(
                    {
                        join: false
                    }
                )
                this.props.handleJoin(event, this.props.group_id, false );
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
    }

    componentDidMount() {
        const isJoined = this.props.joinlist.some(item =>
            item.MEMBERS === this.props.username && item.GROUP_ID === this.props.group_id
        );
        console.log(this.props.group_id,'>>',isJoined)
        this.setState({
            join: isJoined
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.joinlist !== this.props.joinlist || prevProps.group_id !== this.props.group_id) {
            const isJoined = this.props.joinlist.some(item =>
                item.MEMBERS === this.props.username && item.GROUP_ID === this.props.group_id
            );
            this.setState({ join: isJoined });
        }
    }
    

    render() {
        return (
            
            <button onClick={(e) => this.handleJoinGroup(e)} className='join-btn'>
                {this.state.join ? 'Out group' : <> Join group </>}
            </button>
            
        )
    }
}

export default JoinGroup;
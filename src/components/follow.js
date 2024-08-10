import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

class Follow extends React.Component {

    state = {
        follow: false
    }
    
    handleFollow =  async (event) => {
        event.preventDefault();
        let follower = this.props.follower;
        let followed = this.props.followed;
        let check = this.state.follow;
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/follow.php', {
                follower, followed, check
            }, { withCredentials: true});
            if(response.data.message === 'followed'){
                this.setState(
                    {
                        follow: true
                    }
                )
            }
            else {
                this.setState(
                    {
                        follow: false
                    }
                )
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
    }

    componentDidMount() {
        const isFollowed = this.props.followlist.some(item =>
            item.BE_FOLLOWED === this.props.followed && item.FOLLOWER === this.props.follower
        );
        console.log(this.props.followed,'>>',isFollowed)
        this.setState({
            follow: isFollowed
        });
    }

    render() {
        return (
            
            <button onClick={(e) => this.handleFollow(e)} className='lists-item follow'>
                {this.state.follow ? 'Unfollow' : <> Follow<FontAwesomeIcon icon={faUserPlus} /></>}
            </button>
            
        )
    }
}

export default Follow;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

class Like extends React.Component {
    state = {
        liked: false
    }

    handleGetLike = (event) => {
        
        event.preventDefault();
        this.state.liked ?
        this.props.handleLike(event, this.props.item, false )
        :
        this.props.handleLike(event, this.props.item, true );
        console.log(this.state.liked);
        this.setState({ liked: !this.state.liked });
    }

    componentDidMount() {
        const isLiked = this.props.likelist.some(likeitem => 
            likeitem.ID === this.props.item && likeitem.username === this.props.username
        );
        console.log(this.props.item, ">>", isLiked);
        this.setState({ liked: isLiked });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.likelist !== this.props.likelist || prevProps.item !== this.props.item) {
            const isLiked = this.props.likelist.some(likeitem => 
                likeitem.ID === this.props.item && likeitem.username === this.props.username
            );
            this.setState({ liked: isLiked });
        }
    }

    render(){
        return ( 
            <button onClick={(e) => this.handleGetLike(e)} className='lists-item like-btn'>
                { !this.state.liked ? <FontAwesomeIcon icon={faThumbsUp} className='like-btn_icon' /> : <FontAwesomeIcon icon={faThumbsDown} className='like-btn_icon' />}
            </button>
        )
    }
}

export default Like;
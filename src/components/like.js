import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class Like extends React.Component {
    state = {
        liked: false
    }

    handleGetLike = (event) => {
        // this.props.likelist && this.props.likelist.length > 0 &&
        //     this.props.likelist.map((likeitem, likeindex) =>{ 
        //         if(likeitem.ID === this.props.item && likeitem.username === this.props.username){
        //             this.setState(
        //                 {
        //                     liked: true
        //                 }
        //             )
        //         }
        //     }
        //     )
        
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

    render(){
        return ( 
            <button onClick={(e) => this.handleGetLike(e)} className='lists-item like-btn'>
                { !this.state.liked ? <FontAwesomeIcon icon={faThumbsUp} className='like-btn_icon' /> : 'Unlike'}
            </button>
        )
    }
}

export default Like;
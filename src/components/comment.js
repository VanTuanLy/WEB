import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import ShowComment from "./showcomment";

class Comment extends React.Component {
    state = {
        check: false,
        comment: '',
        checkShowComment: false,
        commentlist: [],
        checkcomment: false
    }

    handleComment = (event) => {
        event.preventDefault();
        this.setState(
            {
                comment: event.target.value
            }
        )
    }

    handleSubmitComment =  async (event) => {
        event.preventDefault();
        let comment = this.state.comment;
        let username = this.props.username;
        let id = this.props.item;
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/comment.php', {
               comment, username, id }
            );
            console.log(response.data.message);
            this.setState(
                {
                    checkcomment: !this.state.checkcomment
                }
            )
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
    }
    
    handleShow =  (event) => {
        event.preventDefault();
        this.setState(
            {
                check: !this.state.check,
                checkShowComment: !this.state.checkShowComment
            }
        )
    }

    handleShowComment = (event) => {
        event.preventDefault();
        this.setState(
            {
                checkShowComment: !this.state.checkShowComment
            }
        )
    }

    fetchComment = async () => {
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/commentlist.php',
                { withCredentials: true }
            );
            this.setState(
              {commentlist: response.data}
            )
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
          }
    }

    componentDidMount () {
        this.fetchComment();
    }

    render () {

        let commentlist = this.state.commentlist;
        return(
            <>
                <button onClick={(e) => this.handleShow(e)} className='lists-item comment' ><FontAwesomeIcon icon={faComments} /></button>
                {
                        this.state.check || this.state.checkShowComment?
                    <form onSubmit={(e) => this.handleSubmitComment(e)} className="comment-box">
                        <textarea onChange={(e) => this.handleComment(e)} className="comment-box--text"/>
                        <button type="submit" className="post-btn">Submit</button>
                    </form> 
                    : <div className="comment-box" >
                    </div>
                }
                {
                    this.state.checkcomment ? 
                    <div className="commentlist lists-item new-assign">
                        <div className='commentlist-users'>{this.props.username}</div>
                        <div className='commentlist-comment'>{this.state.comment}</div>
                    </div> 
                    : 
                    <div></div>
                }
                {
                        this.state.checkShowComment ? 
                        <>
                            <ShowComment commentlist = {commentlist} blogId={this.props.item} />
                            <div className="hidecomment">
                                <button className="post-btn" onClick={(e) => this.handleShow(e)}>Hide Comment</button>
                            </div>
                        </>
                    :
                    <div></div>
                }
            </>
        )
    }
}

export default Comment;
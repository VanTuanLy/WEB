import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Like from './like';
import Follow from './follow';
import Comment from './comment';
import ShowContent from './showcontent';

class BlogList extends React.Component {

    state = {
        list: [],
        likelist: [],
        followlist: [],
        check: false
    }

    fetchBlogs = async () => {
        try {
          const response = await axios.get('http://localhost:8080/webblogvan/src/php/bloglist.php',
            { withCredentials: true }
          );
          this.setState(
            {list: response.data}
          )
          console.log(response.data);
        } catch (error) {
          console.error('There was an error!', error);
          alert('An error occurred. Please try again.');
        }
    }

    formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
    }

    handleLike = async (event, idBlog, likeBlog) => {
        let id = idBlog;
        let like = likeBlog;
        let username = this.props.username;
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/like.php', {
                id, like, username
            },{ withCredentials: true});
            if(response.data.message === 'liked'){
                this.setState(prevState => ({
                    list: prevState.list.map(item =>
                        item.ID === idBlog ? { ...item, LIKES: item.LIKES + 1 } : item
                    )})
                )
            }
            else {
                this.setState(prevState => ({
                    list: prevState.list.map(item =>
                        item.ID === idBlog ? { ...item, LIKES: item.LIKES - 1 } : item
                    )})
                )
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
    }

    fetchLikeBlog = async () =>{
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/likeblog.php',
                { withCredentials: true }
            );
            this.setState(
              {likelist: response.data}
            )
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
          }
    }

    fetchFollow = async () => {
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/followlist.php',
                { withCredentials: true }
            );
            this.setState(
              {followlist: response.data}
            )
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
          }
    }

    handleChangeCheck = (event) => {
        event.preventDefault();
        this.setState (
            {
                check: !this.state.check
            }
        )
    }

    componentDidMount() {
        this.fetchBlogs();
        this.fetchLikeBlog();
        this.fetchFollow();
    }

    render() {
        let {list} = this.state; 
        let {likelist} = this.state;
        let {followlist} = this.state;
        return(
            <div>
                {
                    this.props.profile ?
                    list && list.length > 0 &&
                        list.map((item) =>
                            this.props.username === item.WRITERS ? 
                            
                                <div className='lists' key={item.ID}>
                                    <div className='lists-item author'>{item.WRITERS}</div>
                                    <div className='lists-item time'>{this.formatDate(item.CREATE_AT.date)}</div>
                                    <div className='lists-item titles'>{item.TITLES}</div>
                                    <div className='lists-item tags'>{item.HASHTAGS}</div>
                                    <ShowContent content={item.CONTENTS}/>
                                    <div className='like_follow-box'>
                                        <div className='lists-item like'><span className='like-icon'><FontAwesomeIcon icon={faThumbsUp} /></span>{item.LIKES}</div>
                                        <Like username={this.props.username} item={item.ID} likelist={likelist} handleLike={this.handleLike} />
                                        <Follow follower={this.props.username}  followed={item.WRITERS} followlist={followlist} />
                                        <Comment username={this.props.username} item = {item.ID}/>
                                    </div>
                                </div>
                            
                        :
                        <div></div>
                    )
                    :
                    this.props.followlistchange === '' ? 
                    list && list.length > 0 &&
                        list.map((item, index) => {
                            return (
                                <div className='lists' key={item.ID}>
                                    <div className='lists-item author'>{item.WRITERS}</div>
                                    <div className='lists-item time'>{this.formatDate(item.CREATE_AT.date)}</div>
                                    <div className='lists-item titles'>{item.TITLES}</div>
                                    <div className='lists-item tags'>{item.HASHTAGS}</div>
                                    <ShowContent content={item.CONTENTS}/>
                                    <div className='like_follow-box'>
                                        <div className='lists-item like'><span className='like-icon'><FontAwesomeIcon icon={faThumbsUp} /></span>{item.LIKES}</div>
                                        <Like username={this.props.username} item={item.ID} likelist={likelist} handleLike={this.handleLike} />
                                        <Follow follower={this.props.username}  followed={item.WRITERS} followlist={followlist} />
                                        <Comment username={this.props.username} item = {item.ID}/>
                                    </div>
                                </div>
                            )
                        })
                    :
                    list && list.length > 0 &&
                        list.map((item, index) => 
                            this.props.followlistchange === item.WRITERS ? 
                            
                                <div className='lists' key={item.ID}>
                                    <div className='lists-item author'>{item.WRITERS}</div>
                                    <div className='lists-item time'>{this.formatDate(item.CREATE_AT.date)}</div>
                                    <div className='lists-item titles'>{item.TITLES}</div>
                                    <div className='lists-item tags'>{item.HASHTAGS}</div>
                                    <ShowContent content={item.CONTENTS}/>
                                    <div className='like_follow-box'>
                                        <div className='lists-item like'><span className='like-icon'><FontAwesomeIcon icon={faThumbsUp} /></span>{item.LIKES}</div>
                                        <Like username={this.props.username} item={item.ID} likelist={likelist} handleLike={this.handleLike} />
                                        <Follow follower={this.props.username}  followed={item.WRITERS} followlist={followlist} />
                                        <Comment username={this.props.username} item = {item.ID}/>
                                    </div>
                                </div>
                            
                            :
                            <div></div>

                    )
                }
            </div>
        
        )
    }
}

export default BlogList;
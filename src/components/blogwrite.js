import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

class BlogWrite extends React.Component {

    state = {
        title: '',
        blog: '',
        tags: ''
    }

    handleSubmit = async (event) => {
        let title = this.state.title;
        let blog = this.state.blog;
        let tags = this.state.tags;
        let username = this.props.username;
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/blogwrite.php', {
                title,
                blog,
                tags,
                username
            });
            alert(response.data.message);
            console.log(response.data.message);
        } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
        }
    };

    handleChangeTitle = (event) => {
        event.preventDefault();
        this.setState(
            {
                title: event.target.value
            }
        )
    }

    handleChangeBlog = (event) => {
        event.preventDefault();
        this.setState(
            {
                blog: event.target.value
            }
        )
    }

    handleChangeTags = (event) => {
        event.preventDefault();
        this.setState(
            {
                tags: event.target.value
            }
        )
    }

    render(){
        return(
            <>
                <div className='pen-icon'> Write Blog Here <FontAwesomeIcon icon={faPen} /></div>
                <form onSubmit={(e) => this.handleSubmit(e)} className='blog-form'>
                    <div className='title-tags_box'>
                        <input onChange={(e) => this.handleChangeTitle(e)} className='title' placeholder='Title'/>
                        <input onChange={(e) => this.handleChangeTags(e)} className='tags' placeholder='Tags'/>
                    </div>
                    <textarea onChange={(e) => this.handleChangeBlog(e)} className="blog-box" placeholder='Blog'/>
                    <button type='submit' className='post-btn'>Submit</button>
                </form>
            
            </>
        )
    }
}

export default BlogWrite;
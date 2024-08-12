import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faListUl } from '@fortawesome/free-solid-svg-icons';
import ShowDescribe from './showdescribe';

class BlogWrite extends React.Component {

    state = {
        title: '',
        blog: '',
        tags: '',
        listgroup: [],
        id: null
    }

    handleSubmit = async (event) => {
        let title = this.state.title;
        let blog = this.state.blog;
        let tags = this.state.tags;
        let username = this.props.username;
        let id = this.state.id;
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/webblogvan/src/php/blogwrite.php', {
                title,
                blog,
                tags,
                username,
                id
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

    handleChangeId = (event, groupid) => {
        this.setState(
            {
                id: groupid
            }
        )
    }

    fetchGroup = async () => {
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/groupusers.php',
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
    }

    render(){
        let {listgroup} = this.state;
        return(
            <>
            <div className='writeblog-box'>
                <div className='writeblog-item'>
                    <div className='pen-icon'> Write Blog Here <FontAwesomeIcon icon={faPen} /></div>
                    <form onSubmit={(e) => this.handleSubmit(e)} className='blog-form'>
                        <div className='title-tags_box'>
                            <input onChange={(e) => this.handleChangeTitle(e)} className='title' placeholder='Title'/>
                            <input onChange={(e) => this.handleChangeTags(e)} className='tags' placeholder='Tags'/>
                        </div>
                        <textarea onChange={(e) => this.handleChangeBlog(e)} className="blog-box" placeholder='Blog'/>
                        <button type='submit' className='post-btn'>Submit</button>
                    </form>
                </div>
                <div className='grouplist'>
                    <div className='pen-icon'><FontAwesomeIcon icon={faListUl} /> Group</div>
                    <label className='list-group'>
                        <input type='radio' onChange={(e) => this.handleChangeId(e, null)} name='radio' className='list-group--item checkbox-item'/>
                        <div className='list-group--item list-group--name'>Public</div>
                    </label>
                    <div>
                        {
                            listgroup&&listgroup.length > 0 &&
                            listgroup.map((item, index) => 
                                item.MEMBERS === this.props.username ?
                                    
                                    <label className='list-group' key={index}>
                                        <input type='radio' onChange={(e) => this.handleChangeId(e, item.GROUP_ID)} name='radio' className='list-group--item checkbox-item'/>
                                        <div className='list-group--item list-group--name'>{item.GROUP_NAME}</div>
                                        <div className='list-group--item'><span className='before-item'>Creator: </span>{item.CREATOR}</div>
                                        <div className='list-group--item'><div className='before-item'>Describe: </div><ShowDescribe describe = {item.DESCRIBE} /></div>
                                    </label>
                                :
                                <div></div>
                            )
                        }
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default BlogWrite;
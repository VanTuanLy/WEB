import React from "react";
import axios from "axios";
import ImageSwitch from "./imageswitch";
import BlogList from "./bloglist";
import img1 from '../assets/img/img1.jpg';

class Profile extends React.Component {

    state = {
        list: [],
        userinfo: []
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

    fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/webblogvan/src/php/profile.php',
                 { withCredentials: true }
            );
            this.setState(
              {userinfo: response.data}
            )
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
            alert('An error occurred. Please try again.');
          }
      }

    componentDidMount () {
        this.fetchBlogs();
        this.fetchUser();
    }

    render () {
        let {list} = this.state;
        return (
          <>
            <div className="userInfo-box">
                
                <img src={img1} className='avatar'/>
                <div className="userInfo-box--list">
                    <div className="userinfo name">{this.props.username}</div>
                    <div className="userinfo email">{this.state.userinfo.length > 0&&this.state.userinfo&&this.state.userinfo[0].email}</div>
                    <div className="userinfo follows">{this.state.userinfo.length > 0&&this.state.userinfo&&this.state.userinfo[0].follows}</div>
                </div>

              </div>
            <div className="userblog-box">
                <BlogList username={this.props.username} profile = {true} />
            </div>
          </>
        )
      }
}

export default Profile;
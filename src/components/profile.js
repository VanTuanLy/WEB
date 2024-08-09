import React from "react";
import axios from "axios";
import ImageSwitch from "./imageswitch";
import BlogList from "./bloglist";

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
                
                <img src='https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/453513395_2171892326538341_4406271196663426957_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=y2nWEYLqmaQQ7kNvgG4_fCZ&_nc_ht=scontent.fsgn2-9.fna&oh=00_AYAGkdoIa2kMhzMhYY2ERJqLU48HHKwbqwYUxQRQNulQew&oe=66BBD622' className='avatar'/>
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
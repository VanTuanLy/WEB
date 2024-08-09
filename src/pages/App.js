
import './App.scss';
import React from 'react'
import NavBar from '../components/navbar.js';
import Container from '../components/container.js';
import Login from '../components/login.js';
import Register from '../components/register.js';
import Profile from '../components/profile.js';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BlogWrite from '../components/blogwrite.js';


class App extends React.Component {

  state = {
    check: false,
    username: '',
    email: '',
  }

  handleChangeLogin = () => {
    this.setState(
      {
        check: !this.state.check
      }
    )
  }

  getUser = (user) => {
    // fetch('http://localhost:8080/webblogvan/src/php/getuser.php', {
    //   credentials: 'include' // Đảm bảo gửi cookie cùng với yêu cầu
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.username) {
    //         this.setState({ username: data.username });
    //     } else {
    //         console.log('User not logged in');
    //     }
    // })
    // .catch(error => console.error('Error:', error));
    // axios.get('http://localhost:8080/webblogvan/src/php/getuser.php', {
    //   withCredentials: true // Đảm bảo gửi cookie cùng với yêu cầu}
    // })
    // .then(response => {
    //     const data = response.data;
    //     console.log('data: ',data); // In ra phản hồi để kiểm tra
    //     if (data.username) {
    //         this.setState({ username: data.username });
    //     } else {
    //         console.log('User not logged in');
    //     }
    // })
    // .catch(error => console.error('Error:', error));
    this.setState(
      {
        username: user
      }
    )
  }

  getUserinfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/webblogvan/src/php/getuser.php',
        { withCredentials: true }
      );
      let user = response.data.username;
      this.setState(
        {username: user}
      )
    } catch (error) {
      console.error('There was an error!', error);
      alert('An error occurred. Please try again.');
    }
  }

  componentDidMount () {
    this.getUserinfo();
  }

  render(){
    return (
      <Router>
        <div className="App">
          {
            
            <>
              <Routes>
                <Route path="/" element={<Container username = {this.state.username}/>}exact>
          
                </Route>
                <Route path="/login" element={<Login getUser={this.getUser}/>}>
                  
                </Route>
                <Route path="/register" element={<Register/>}>
                  
                </Route>
                <Route path="/profile" element={<Profile username={this.state.username} />}>
                  
                </Route>
                <Route path="/write" element={<BlogWrite username={this.state.username} />}>
                  
                </Route>
              </Routes> 
              <NavBar username = {this.state.username} />
            </>
          }
        </div>
      </Router>
    );
  }
}

export default App;

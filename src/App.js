import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// class component got using  a snippet  
// "rcep" ==> (react class component with props)

export default class App extends Component {
  pageSize = 6
  apiKey = process.env.REACT_APP_NEWS_API  //hiding my api key getting through enviornment variable in .env file
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <div style={{ backgroundColor: "#f7faf7", overflow: "hidden" }} >
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={4}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='General' pageSize={this.pageSize} country='us' category='General' />}></Route>
            <Route exact path="/Business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Business' pageSize={this.pageSize} country='us' category='Business' />}></Route>
            <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Entertainment' pageSize={this.pageSize} country='us' category='Entertainment' />}></Route>
            <Route exact path="/General" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='General' pageSize={this.pageSize} country='us' category='General' />}></Route>
            <Route exact path="/Health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Health' pageSize={this.pageSize} country='us' category='Health' />}></Route>
            <Route exact path="/Science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Science' pageSize={this.pageSize} country='us' category='Science' />}></Route>
            <Route exact path="/Sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Sports' pageSize={this.pageSize} country='us' category='Sports' />}></Route>
            <Route exact path="/Technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='Technology' pageSize={this.pageSize} country='us' category='Technology' />}></Route>

          </Routes>
        </BrowserRouter>
      </div>

    )
  }
}

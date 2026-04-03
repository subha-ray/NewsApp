
import { Component } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";
import News from './Components/News';


export default class App extends Component {
  static propTypes = {
    prop: PropTypes
  }
  pageSize=4;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {

    return (
      <div>
        <BrowserRouter>
          <Navbar />

          <LoadingBar
            color="#09dbd4"
            progress={this.state.progress}
            height={3}
            onLoaderFinished={() => this.setProgress(this.state.progress)}
          />

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key='general' pageSize={4} country="us" category="general" />}></Route>
            
            <Route exact path="/business" element={<News setProgress={this.setProgress} key='business' pageSize={4} country="us" category="business" />}></Route>
            
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key='entertainment' pageSize={4} country="us" category="entertainment" />}></Route>
            
            <Route exact path="/health" element={<News setProgress={this.setProgress} key='health' pageSize={4} country="us" category="health" />}></Route>
            
            <Route exact path="/science" element={<News setProgress={this.setProgress} key='science' pageSize={4} country="us" category="science" />}></Route>
            
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key='sports' pageSize={4} country="us" category="sports" />}></Route>
            
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key='technology' pageSize={4} country="us" category="technology" />}></Route>

          </Routes>
        </BrowserRouter>

        {/* <News setProgress={this.setProgress} pageSize={4} country="us" category="general"/> */}
      </div>
    )
  }
}


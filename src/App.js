import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

export default class App extends Component {
    pageSize = 12;
    country = 'in';
    apiKey = process.env.REACT_APP_NEWS_API

    state = {
        progress:0
    }
    setProgress = (progress) => {
        this.setState({progress:progress})
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar/>
                    <LoadingBar
                        height={3}
                        color='#f11946'
                        progress={this.state.progress}
                    />
                    <Switch>
                        <Route exact path="/">
                            <News setProgress={this.setProgress} key="general" country={this.country} apiKey={this.apiKey} category="general" pageSize={this.pageSize} />
                        </Route>
                        <Route exact path="/sports">
                            <News setProgress={this.setProgress} key="sports" country={this.country}  apiKey={this.apiKey} category="sports" pageSize={this.pageSize} />
                        </Route>
                        <Route exact path="/entertainment">
                            <News setProgress={this.setProgress} key="entertainment" country={this.country}  apiKey={this.apiKey} category="entertainment" pageSize={this.pageSize} />
                        </Route>
                        <Route exact path="/business">
                            <News setProgress={this.setProgress} key="business" country={this.country}  apiKey={this.apiKey} category="business" pageSize={this.pageSize} />
                        </Route>
                        <Route exact path="/science">
                            <News setProgress={this.setProgress} key="science" country={this.country}  apiKey={this.apiKey} category="science" pageSize={this.pageSize} />
                        </Route>
                        <Route exact path="/health">
                            <News setProgress={this.setProgress} key="health" country={this.country}  apiKey={this.apiKey} category="health" pageSize={this.pageSize} />
                        </Route>
                        <Route exact path="/technology">
                            <News setProgress={this.setProgress} key="technology" country={this.country}  apiKey={this.apiKey} category="technology" pageSize={this.pageSize} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const App = () => {
    const pageSize = 12;
    const country = 'in';
    const apiKey = 'f085a633458d4cb6b2869319975b1b28';

    const [progress, setProgress] = useState(0)

    return (
        <div>
            <Router>
                <Navbar/>
                <LoadingBar
                    height={3}
                    color='#f11946'
                    progress={progress}
                />
                <Switch>
                    <Route exact path="/">
                        <News setProgress={setProgress} key="general" country={country} apiKey={apiKey} category="general" pageSize={pageSize} />
                    </Route>
                    <Route exact path="/sports">
                        <News setProgress={setProgress} key="sports" country={country}  apiKey={apiKey} category="sports" pageSize={pageSize} />
                    </Route>
                    <Route exact path="/entertainment">
                        <News setProgress={setProgress} key="entertainment" country={country}  apiKey={apiKey} category="entertainment" pageSize={pageSize} />
                    </Route>
                    <Route exact path="/business">
                        <News setProgress={setProgress} key="business" country={country}  apiKey={apiKey} category="business" pageSize={pageSize} />
                    </Route>
                    <Route exact path="/science">
                        <News setProgress={setProgress} key="science" country={country}  apiKey={apiKey} category="science" pageSize={pageSize} />
                    </Route>
                    <Route exact path="/health">
                        <News setProgress={setProgress} key="health" country={country}  apiKey={apiKey} category="health" pageSize={pageSize} />
                    </Route>
                    <Route exact path="/technology">
                        <News setProgress={setProgress} key="technology" country={country}  apiKey={apiKey} category="technology" pageSize={pageSize} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;

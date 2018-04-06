import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";
import { AppContainer } from "react-hot-loader";
//react热更新
const root = document.getElementById("root");
const render = Component => {
    return ReactDom.hydrate(
        <AppContainer>
            <Component/>
        </AppContainer>,
        root)
};

//render(<App/>);
ReactDom.hydrate(
    <AppContainer>
        <App/>
    </AppContainer>,
    root);

if(module.hot){
    module.hot.accept("./App.js",()=>{
        const NextApp = require('./App.js').default;
        ReactDom.hydrate(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            root);
    })
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App/>, document.getElementById('app'));

// 設定10秒（10000 milliseconds）後解除安裝組件
// setTimeout() 為 javascript 函式，用於設定特定時間後觸發特定行為。
setTimeout(() => {
   ReactDOM.unmountComponentAtNode(document.getElementById('app'));}, 10000);
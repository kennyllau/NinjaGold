var React = require('react');
var ReactDOM = require('react-dom');

var Headline = require('./react_components/headline.js');
var Game = require('./react_components/game.js');



ReactDOM.render(<Headline/>, document.getElementById('title'));
ReactDOM.render(<Game/>, document.getElementById('app'));

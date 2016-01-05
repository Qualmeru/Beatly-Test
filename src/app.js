var React = require('react');

var Main = React.createClass({
  render: function() {
      return <h1>Beatly Testsadasd</h1>
  }
});

var element = React.createElement(Main, {});
React.render(element, document.querySelector('.container'));

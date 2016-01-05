var React = require('react');
var messages = require('./messages');
var ReactRouter = require('react-router');
var Lenk = ReactRouter.Link;

module.exports = React.createClass({
    getInitialState: function(){
        return{
            messages: []
        }
    },
    componentDidMount: function () {
        $.ajax({
            url: "src/api/messages.json",
            dataType: 'json',
            //cache: false,
            success: function (data) {
                this.setState({ messages: data });
            }.bind(this),
            error: function (xhr, status, err) {
                //console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return <div><h1>Beatly Test</h1>
        
        <div className="list-group">
            {this.renderMessages()}
        </div></div>
    },
    renderMessages: function () {
        if (this.state.messages.data) {
            return this.state.messages.data.map(function (message) {
                return <a href="#" className="list-group-item" key={message.id } > 
              <b>{message.subject}</b>
                 <p>{message.description}</p>
             </a>
            });
        }
    }
    
});
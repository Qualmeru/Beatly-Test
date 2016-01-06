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
            success: function (json) {
                json.data.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date)
                });
                this.setState({ messages: json.data });
            }.bind(this),
            error: function (xhr, status, err) {
                //console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return <div>
        
        <div className="list-group col-md-4 row col-md-offset-4">
    <h1 className="vertical-center-row">Beatly Test</h1>
            {this.renderMessages()}
        </div></div>
    },
    renderMessages: function () {
        if (this.state.messages) {
            return this.state.messages.map(function (message) {
                return <a href="#" className="list-group-item" key={message.id } > 
              <b>{message.subject}</b>
                 <p>{message.description}</p>
                <p>{message.date}</p>
             </a>
            });
        }
    }
    
});
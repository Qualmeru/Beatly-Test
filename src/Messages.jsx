var React = require('react');





var url = "src/api/messages.json";


module.exports = React.createClass({

    getInitialState: function(){
        return{
            messages: []
        }
    },
  
   componentDidMount: function () {
       $.ajax({
           url: url,
           dataType: 'json',
           cache: false,
           success: function (data) {
               this.setState({ messages: data });
           }.bind(this),
           error: function (xhr, status, err) {
               console.error(this.props.url, status, err.toString());
           }.bind(this)
       });
   },
    render: function () {
           return <div className="list-group">
            {this.renderMessages()}
        </div>
    },
    renderMessages: function () {
        return this.state.messages.map(function (message) {
            return <a href="#" className="list-group-item" key={message.id} > 
           <b>{message.subject}</b>
            <p>{message.description}</p>
        </a>
        });
    }
})
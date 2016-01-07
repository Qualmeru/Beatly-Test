var React = require('react');
var messages = require('./messages');
var ReactRouter = require('react-router');
var Lenk = ReactRouter.Link;

module.exports = React.createClass({
    getInitialState: function(){
        return{
            messages: [],
            senders:[]
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
        $.ajax({
            url: "src/api/senders.json",
            dataType: 'json',
            //cache: false,
            success: function (json) {
                this.setState({ senders: json.data });
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
            {this.renderPostMessage()}
            {this.renderMessages()}
        </div></div>
    },
    renderMessages: function () {
        if (this.state.messages) {
            return this.state.messages.map(function (message) {
                return <a href="#" className="list-group-item" key={message.id } > 
              <p>{message.sender}</p>
              <b>{message.subject}</b>
                 <p>{message.description}</p>
                <p>{message.date}</p>
             </a>
            });
        }
    },
    renderPostMessage: function () {
        return <div className="form-group well"> 
    <div className="col-md-offset-4">    <button type="button" className="btn btn-default" data-toggle="modal" data-target=".bs-example-modal-sm">Write message</button></div> 

<div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div className="modal-dialog modal-sm">
    <div className="modal-content">
     <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">Modal title</h4>
     </div>
      <div className="modal-body">
<form className="commentForm" onSubmit={this.postMessage}>
      <div className="form-group">
          <span>Sender</span>
          <select className="form-control" id="ddSenders" onChange={this.senderChange}>{this.renderSenders()}</select>
      </div>
      <div className="form-group">
          <span>Subject</span>
          <input className="form-control" type="text" id="txtSubject" onChange={this.subjectChange} />
      </div>
      <div className="form-group">
          <span>Message</span>
          <textarea className="form-control" id="txtMessage" onChange={this.messageChange}></textarea>
      </div>
      <div className="form-group"><button type="submit" className="btn btn-default">Send message</button></div>
    </form>
</div>
    </div>
  </div>
</div></div>
    },
    renderSenders: function () {
        if (this.state.senders) {
            return this.state.senders.map(function (sender) {
                return <option id={sender.id} key={sender.id } > 
                {sender.name}
             </option>
            });
        }
    },
    postMessage: function (e) {
        e.preventDefault();
        //  console.log("sender: "+ this.state.sender +" subject: "+ this.state.subject + " message: "+ this.state.message)
        var noom = this.state.messages.length;
        var subject = this.state.subject;
        var message = this.state.message;
        var sender = this.state.sender;
        if (!this.state.sender) {
            sender = this.state.senders[0].name;
        }
        noom++;
        var now = new Date(Date.now());
        this.state.messages.push({ "id": noom, "subject": subject, "sender": sender, "message": message, "date": now.getFullYear() +"/" + now.getMonth() + 1 +"/" + now.getDate() +" "+ now.getHours() +":"+ now.getMinutes() });
        console.log(this.state.messages);
       // this.props.onMessageSubmit({"id": noom++, "subject": subject, "sender": sender, "message": message})
        this.setState({ sender: '', subject: '', message: '' });
        this.setState({ messages: this.state.messages });
        $(".bs-example-modal-sm").modal("hide");
        this.forceUpdate();
    },
    senderChange: function (e) {
        this.setState({ sender: e.target.value });
    },
    subjectChange: function (e) {
        this.setState({ subject: e.target.value });
    },
    messageChange: function (e) {
        this.setState({ message: e.target.value });
    }
});
import React from 'react';

class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', chat: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReturnKey = this.handleReturnKey.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let name = this.state.name.trim();
        let chat = this.state.chat.trim();
        this.props.addChat(name, chat);
        this.setState({name: '', chat: ''})
    }

    handleReturnKey(event) {
        if(event.keyCode === 13 && !event.shiftKey){
            event.preventDefault()
            let button = document.getElementById('submitBtn');
            button.click();
        } else {
            let {chat, name} = this.state;
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <li className="list-group-item borderless d-flex justify-content-between align-items-center">
                    <button type="submit" id="submitBtn" className="btn btn-primary btn-circle m-1"><i className="fas fa-comment fa-2x"></i></button>
                    <div className="speech-bubble col-11">
                        <div className="form-label-group">
                            <input type="text" name="name" id="Name" className="form-control " placeholder="Name" required={true}
                                autoFocus={true} onChange={this.handleChange} value={this.state.name} onKeyUp={this.handleReturnKey} />
                            <label htmlFor="addLetter">Name</label>
                        </div>
                        <div className="form-label-group mb-0">
                            <textarea id="Chat" name="chat" className="form-control" placeholder="Type your message here ..." required={true}
                                autoFocus={true} onChange={this.handleChange} value={this.state.chat} onKeyUp={this.handleReturnKey}/>
                        </div>
                    </div>
                </li>
            </form>
        );
    }
}

export default ChatForm;
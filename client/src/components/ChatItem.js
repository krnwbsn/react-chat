import React from 'react';
import ReactMarkdown from 'react-markdown';

function ChatItem(props){
    let { name, chat, id } = props.chatData;
    return (
        <li className="list-group-item borderless d-flex justify-content-between align-items-center">
            <button className="btn btn-success btn-circle m-1"><i className="fas fa-comment fa-2x" onClick={() => props.deleteChat(id)}></i></button>
            <div className="speech-bubble col-11" style={{ color: '#595959' }}>
                <div>
                    <h5><i class="fas fa-headset"></i> {name}</h5>
                    <span>
                        {props.chatData.status ? '' : (<button className="btn text-white bg-transparent" onClick={() => props.resendChat(name, chat, id)}> resend chat <i className="fas fa-sync-alt "></i></button>)}
                    </span>
                </div>
                <h4><ReactMarkdown source={chat} /></h4>
            </div>
        </li>
    );
}

export default ChatItem;
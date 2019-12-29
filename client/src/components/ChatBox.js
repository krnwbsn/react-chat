import React from 'react';
import axios from 'axios';
import ChatForm from './ChatForm';
import ChatItem from './ChatItem';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
const API_URL = 'http://localhost:3001/api/chats';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        this.loadChat()

        socket.on('load chat', (newData) => {
            this.setState((state) => ({ data: [...state.data, newData] }));
        })

        socket.on('delete chat', (id) => {
            this.setState(state => ({
                data: state.data.filter(chatData => chatData.id !== id)
            }));
        })
    }

    loadChat = () => {
        return axios.get(API_URL)
            .then((response) => {
                if (response.data.error)
                    console.log(response.data.message);
                else {
                    let chatData = response.data.chatData.map((chat) => {
                        return { ...chat, status: true };
                    })
                    this.setState({ data: chatData });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteChat = (id) => {
        this.setState(state => ({
            data: state.data.filter(chatData => chatData.id !== id)
        }));
        axios.delete(API_URL + `/${id}`)
            .then((response) => {
            socket.emit('delete chat', id);
            })
    }

    addChat = (name, chat, deletedId) => {
        if (chat.length > 0) {
            let id = Date.now();
            this.setState(state => {
                let chatData = state.data.filter(chatData => chatData.id !== deletedId);
                return { data: [...chatData, { id, name, chat, status: true }], typer: '' }
            });
            axios.post(API_URL, { id, name, chat })
                .then((response) => {
                    let chatData = { ...response.data.chatAdded, status: true }
                    socket.emit('add chat', chatData)
                    socket.emit('stop typing')
                })
                .catch(err => {
                    this.setState(state => ({
                        data: state.data.map(chatData => {
                            if (chatData.id === id)
                                chatData.status = false;
                            return chatData;
                        })
                    }));
                });
        }
    }

    resendChat = (name, chat, id) => {
        this.addChat(name, chat, id);
    }

    render() {
        return (
            <div className="container mt-2 d-flex p-3 flex-column borderless">
                <main role="main" className="inner cover dashboard-main">
                    <div>
                        <div className="text-center">
                            <h3>React Chat</h3>
                        </div>
                        <div>
                            <ul>
                                <div className="scrollable" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                                    {this.state.data.map((chatData, index) => (
                                        <ChatItem key={chatData.id} chatData={chatData} deleteChat={this.deleteChat} resendChat={this.resendChat} />
                                    ))}
                                </div>
                                <ChatForm addChat={this.addChat} />
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default ChatBox;
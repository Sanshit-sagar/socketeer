import React, { Component } from 'react';
import websocketClient, { WebSocketConnection } from '../websockets/client';
import { styled } from '../stitches.config'

const StyledIndex = styled('div', {
    '&.messages_header': {
        padding: '20px',
        borderBottom: '1px solid #ddd',
    },
    '&.messages_header_p': {
        margin: 0,
    },
});

const MessageList = styled('ul', {
    listStyle: 'none',
    padding: '2rem',
    margin: 0,
    border: '0.15rem solid #000',
    borderRadius: '0.35rem'
});

const Message = styled('li', {
    fontSize: '12px',
    padding: '0.25rem',
    border: '0.15rem solid #000',
    borderRadius: '0.35rem',
    backgroundColor: '#0d0dff',
    color: '#fff',
});

interface SocketeerState {
    message?: string;
    received?: { message: string }[];
    connected?: boolean;
    websocketClient: WebSocketConnection | undefined;
}; 
type PrevState = Partial<SocketeerState>;

export default class Socketeer extends Component {

    state: SocketeerState = {
        message: "",
        received: [],
        connected: false,
        websocketClient: undefined,
    };

    componentDidMount() {
        websocketClient({
            queryParams: {
                favoritePizza: "vegan"
            },
            onMessage: (message: string) => {
                console.log("message");
                this.setState(({ received }: PrevState) => {
                    return {
                        received: [
                            received,
                            message
                        ]
                    }
                });
            },
            onDisconnect: () => {
                this.setState({
                    connected: false
                });
            },
        },
        (websocketClient) => {
            this.setState({ connected: true }, () => {
                websocketClient = websocketClient;
            });
        }
    )};

    handleSendMessage = () => {
        const { message } = this.state;
        this.state.websocketClient?.send({ message });
        this.setState({ message: "" }); 
    }

    render() {
        const { message, received, connected } = this.state;

        return (
            <StyledIndex>
                <div className="row">
                    <div className="col-sm-6">
                        <label className="form-label"> 
                            Send a Message {this.state.message} 
                        </label>
                        <input
                            type="text"
                            name="message"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(event) => 
                                this.setState({
                                    message: event.currentTarget.value,
                                    received: [
                                        ...this.state.received?.map(({ msg }: string, index) => msg),
                                        event.currentTarget.value
                                    ]
                                })
                            }
                        />
                        <button
                            className="btn btn-primary"
                            onClick={this.handleSendMessage}
                        >
                            Send Message
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="messages">
                                <header className="messages_header">
                                    <p className="messages_header_p">
                                        {connected ? "Connected" : "Not connected"}
                                    </p>
                                </header>
                                <MessageList>
                                    {received?.map((datum, index) => (
                                        <Message key={`${message}_${index}`}>
                                            {JSON.stringify(datum)}
                                        </Message>
                                    ))}
                                    {connected && received?.length === 0 && (
                                        <li>No messages received yet</li>
                                    )}
                                </MessageList>
                            </div>
                        </div>
                    </div>
                </div>
            </StyledIndex>
        );     
    }
}
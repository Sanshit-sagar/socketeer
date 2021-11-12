import React, { Component } from 'react';
import websocketClient, { WebSocketConnection } from '../websockets/client';
import { styled } from '../stitches.config'

const StyledIndex = styled('div', {
    '&.messages': {
        backgroundColor: '$gray100',
        marginTop: '50px',
    },
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
                        <label className="form-label"> Send a Message </label>
                        <input
                            type="text"
                            name="message"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(event) => 
                                this.setState({
                                    message: event.currentTarget.value
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
                                    {received?.map(({ message }, index) => (
                                        <li key={`${message}_${index}`}>{message}</li>; 
                                    })}
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
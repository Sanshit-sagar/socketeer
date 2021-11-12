import React, { Component } from 'react';
import websocketClient from '../websockets/client';

import { styled } from '../stitches.config'

interface PrevState {
    received?: string;
    message?: string;
    connected?: boolean;
}; 

class Socketeer extends Component {

    state = {
        message: "",
        received: [],
        connected: false
    };

    componentDidMount() {
        websocketClient(
            {
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
                    this.websocketClient = websocketClient;
                });
            }
        );
    }

    handleSendMessage = () => {
        const { message } = this.state;
        this.websocketClient.send({ message });
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
                            onClick={}
                    </div>
                </div>

            </StyledIndex>
        );     
    }
}
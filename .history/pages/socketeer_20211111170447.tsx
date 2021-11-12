import React, { Component } from 'react';
import websocketClient from '../websockets/client';

import { styled } from '../stitches.config'

interface PrevState {
    received: string;
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
                                ...this.state.received,
                                message
                            ]
                        }
                    });
                },
                onDisconnect: () => 
            }
        )
    }
}
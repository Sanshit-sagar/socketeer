import React, { Component } from 'react';
import websocketClient from '../websockets/client';

import { styled } from '../stitches.config'


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
                    favoritePizze: "vegan"
                },
                onMessage: (message: string) => {
                    console.log("message");
                    this.setState({
                        recieved: [
                            ...re
                        ]
                    })
                }
            }
        )
    }
}
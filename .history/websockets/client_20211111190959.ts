import queryString from 'query-string';
import settings from '../settings.json';

export type Options = {
    onDisconnect?: () => void; 
    queryParams?: any; 
    onMessage?: (message: string) => void; 
}

export interface WebSocketConnection {
    client: WebSocket;
    send: (message?: {}) => void | undefined;
}; 

type OnConnect = ((connection?: WebSocketConnection) => void) | null; 

const websocketClient = (options: Options = {}, onConnect: OnConnect = null) => {
    let url: string | undefined = settings?.websockets?.url ?? undefined

    if(options.queryParams) {
        url = `${url}?${queryString.stringify(options.queryParams)}`;
    }

    let client: WebSocket | null = new WebSocket(url);

    client.addEventListener("open", () => {
        console.log(`[websockets] connected to ${settings?.websockets?.url}`);
    });

    client.addEventListener("close", () =>  {
        console.log(`[websockets] disconnected from ${settings?.websockets?.url}`);
        client = null; 

        if(options?.onDisconnect) {
            options.onDisconnect(); 
        }
    });

    client.addEventListener("message", (event) => {
        if(event?.data && options.onMessage) {
            console.log(`Recieved: ${event.data}`)
            options.onMessage(JSON.parse(event.data)); 
        }
    })

    const connection = {
        client,
        send: (message = {}) => {
            if(client) {
                if (options.queryParams) {
                    message = { ...message, ...options.queryParams };
                }
        
                return client.send(JSON.stringify(message));
            }
        },
    };

    if(onConnect) onConnect(connection);

    return connection; 
}

export default websocketClient;

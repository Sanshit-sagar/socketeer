import queryString from 'query-string';
import settings from '../settings.json';

type OptionsType = {
    onDisconnect?: () => void; 
    queryParams?: string[]; 
}

const websocketClient = (options: OptionsType = {}, onConnect = null) => {
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

    const connection = {
        client,
        send: (message = {}) => {
            if(options.queryParams) {
                message = {
                    ...message,
                    ...options.queryParams
                };
            }
        }
    }
}

export default websocketClient;

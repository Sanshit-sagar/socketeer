import queryString from 'query-string';
import settings from '../settings.json';

type OptionsType = {
    onDisconnect?: () => void; 
    queryParams?: string[]; 
}

const websocketClient = (options: OptionsType = {}, onConnect = null) => {
    let url: string | undefined = settings?.websockets?.url ?? undefined
    let client: WebSocket | null = new WebSocket(url);

    if(options.queryParams) {
        url = `${url}?${queryString.stringify(options.queryParams)}`;
    }

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
}

export default websocketClient;

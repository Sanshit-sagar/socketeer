import queryString from 'query-string';
import settings from '../settings.json';

const websocketClient = (options = {}, onConnect = null) => {
    let url: string | undefi= settings?.websockets?.url; 
    let client: WebSocket | null = new WebSocket(url);

    client.addEventListener('open', () => {
        console.log(`[websockets] connected to ${settings?.websockets?.url}`);
    });

    client.addEventListener('close', () =>  {
        console.log(`[websockets] disconnected from ${settings?.websockets?.url}`);
        client = null; 
    });
}

export default websocketClient;

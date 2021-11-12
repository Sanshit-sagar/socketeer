import queryString from 'query-string';
import settings from '../settings.json';

const websocketClient = (options = {}, onConnect = null) => {
    const url = settings?.websockets?.url; 
    const client = new WebSocket(url);

    client.addEventListener('open', {
        console.log(`[websockets] connected to ${settings?.websockets?.url}`)
    });

    client.addEventListener('close', {
        console.log(`[websockets] disconnected from ${settings?.websockets?.url}`);
    });
}

export default websocketClient;

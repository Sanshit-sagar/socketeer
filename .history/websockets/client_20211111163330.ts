import queryString from 'query-string';
import settings from '../settings.json';

const websocketClient = (options = {}, onConnect = null) => {
    const url = settings?.websockets?.url; 
    const client = new WebSocket(url);

    client.addEventListener('open', {
        console.log(`[websockets] connected to ${}`)
    });

    client.addEventListener('close', {

    });
}

export default websocketClient;

import queryString from 'query-string';
import settings from '../settings.json';

const websocketClient = (options = {}, onConnect = null) => {
    const url = settings?.websockets?.url; 
    const client = WebSocket(url);

}

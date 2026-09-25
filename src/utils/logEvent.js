import { getSessionId } from './session';

export function logEvent(event, data = {}) {
  fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionId: getSessionId(),
      event,
      data,
      createdAt: new Date().toISOString()
    }),
    keepalive: true
  }).catch(error => {
    console.warn('Không gửi được log:', error);
  });
}
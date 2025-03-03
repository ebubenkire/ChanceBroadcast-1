import api from './api';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: {
    token: localStorage.getItem('token')
  }
});

export const streamingService = {
  // REST API calls
  async getLiveStreams() {
    const response = await api.get('/streaming/live');
    return response.data;
  },

  async getStream(id) {
    const response = await api.get(`/streaming/${id}`);
    return response.data;
  },

  async createStream(streamData) {
    const response = await api.post('/streaming', streamData);
    return response.data;
  },

  async updateStreamStatus(id, status) {
    const response = await api.put(`/streaming/${id}/status`, { status });
    return response.data;
  },

  // Socket.IO events
  joinStream(streamId, callback) {
    socket.emit('joinStream', streamId);
    if (callback) {
      socket.on('viewerJoined', callback);
    }
  },

  leaveStream(streamId) {
    socket.emit('leaveStream', streamId);
  },

  sendChatMessage(streamId, message) {
    socket.emit('chatMessage', { streamId, message });
  },

  onChatMessage(callback) {
    socket.on('newChatMessage', callback);
  },

  onViewerUpdate(callback) {
    socket.on('viewerJoined', callback);
    socket.on('viewerLeft', callback);
  },

  disconnect() {
    socket.disconnect();
  }
}; 
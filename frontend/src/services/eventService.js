import api from './api';

export const eventService = {
  async getAllEvents() {
    const response = await api.get('/events');
    return response.data;
  },

  async getEvent(id) {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  async registerForEvent(id) {
    const response = await api.post(`/events/${id}/register`);
    return response.data;
  }
}; 
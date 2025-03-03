import api from './api';

export const votingService = {
  async getActiveVotings() {
    const response = await api.get('/voting/active');
    return response.data;
  },

  async submitVote(id) {
    const response = await api.post(`/voting/${id}/vote`);
    return response.data;
  },

  async getResults(id) {
    const response = await api.get(`/voting/${id}/results`);
    return response.data;
  }
}; 
import api from './api';

export const auditionService = {
  async getAuditions() {
    const response = await api.get('/auditions');
    return response.data;
  },

  async submitApplication(id, applicationData) {
    const response = await api.post(`/auditions/${id}/apply`, applicationData);
    return response.data;
  },

  async getApplicationStatus(auditionId, applicationId) {
    const response = await api.get(`/auditions/${auditionId}/applications/${applicationId}`);
    return response.data;
  }
}; 
import api from './api';

export const academyService = {
  async getCourses() {
    const response = await api.get('/academy');
    return response.data;
  },

  async getCourse(id) {
    const response = await api.get(`/academy/${id}`);
    return response.data;
  },

  async enrollCourse(id) {
    const response = await api.post(`/academy/${id}/enroll`);
    return response.data;
  }
}; 
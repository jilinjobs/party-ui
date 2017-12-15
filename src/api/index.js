import axios from 'axios'

export default {
  async query ({sfzh}) {
    const res = await axios.get('/api/query?sfzh='+sfzh);
    return res.data;
  },

  async submit (type, formData) {
    const res = await axios.post(`/api/submit?type=${type}`, formData);
    return res.data;
  },
}
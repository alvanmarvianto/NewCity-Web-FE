import { defineStore } from "pinia";
import axios from "axios";

export const usePemerintahStore = defineStore("pemerintah", {
  state: () => ({
    pemerintah: null,
    error: null,
  }),

  getters: {
    goverment: (state) => state.pemerintah,
    errors: (state) => state.error,
  },

  actions: {
    async getPemerintah(page = 1) {
      try {
        const response = await axios.get(`/api/pemerintah?page=${page}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },

    async getPemerintahById(id) {
      try {
        const response = await axios.get(`/api/pemerintah/${id}`);
        return response;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },

    async updatePemerintah(data, id) {
      try {
        const response = await axios.post(`/api/pemerintah/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },

    async deletePemerintah(id) {
      try {
        const response = await axios.delete(`/api/pemerintah/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },

    async getInstitusi() {
      try {
        const response = await axios.get(`/api/institusi`);
        return response.data;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },
  },
});

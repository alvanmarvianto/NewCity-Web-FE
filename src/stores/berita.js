import { defineStore } from "pinia";
import axios from "axios";

export const useBeritaStore = defineStore("berita", {
  state: () => ({
    berita: null,
    error: null,
  }),

  getters: {
    news: (state) => state.berita,
    errors: (state) => state.error,
  },

  actions: {
    async getBerita(page = 1) {
      try {
        const response = await axios.get(`/api/berita?page=${page}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching berita:", error);
        throw error;
      }
    },
  },
});

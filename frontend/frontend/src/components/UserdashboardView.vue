<template>
  <div class="pt-16 pb-16 vercel-background">
    <div class="dashboard-container">
      <div class="dashboard-section">
        <div class="dashboard-section-2 d-flex flex-row justify-space-around">
          <div class="pl-12 pr-12 pb-12 pt-12 dashboard-item">
            <LinechartView />
          </div>
        </div>
        <div class="dashboard-section-1">
          <div
            class="pt-10 pl-10 pr-10 pb-10 mb-8 d-flex flex-column vercel-square vercel-large-square"
          >
            <span class="text-h5 pd-8">Songs uploaded</span>
            <span class="text-h5">{{ songCount }}</span>
          </div>
          <div
            class="pt-10 pl-10 pr-10 pb-10 d-flex flex-column vercel-square vercel-large-square"
          >
            <span class="text-h5 pd-4">Total albums</span>
            <span class="text-h5">{{ albumCount }}</span>
          </div>
        </div>
      </div>

      <div class="mb-16 dashboard-section-1">
        <div>
          <div class="mt-12 text-h4 text">
            <div class="d-flex flex justify-space-between">
              <div>Tracks</div>
              <div>
                <router-link to="/upload" class="text-h6 upload-button">
                  Upload song
                </router-link>
              </div>
            </div>
            <div class="transprent mt-8">
              <div v-for="(track, index) in tracks" :key="index">
                <div>
                  {{ track[1][1] }} | {{ track[2][2] }} | {{ track[5][3] }}
                </div>
              </div>
              <div class="transprent mt-8" v-if="tracks.length === 0">
                No tracks available
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="mt-12 text-h4 text">
            <div class="d-flex flex justify-space-between">
              <div>Albums</div>
              <div>
                <router-link to="/upload" class="text-h6 upload-button">
                  Create album
                </router-link>
              </div>
            </div>
            <div class="transprent mt-8">
              <div v-for="(album, index) in albums" :key="index">
                <!-- Display album name and date from 2nd and 3rd indices -->
                <div>{{ album[2] }} | {{ album[3] }}</div>
              </div>
              <div class="transprent mt-8" v-if="albums.length === 0">
                No albums available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CurrentplaybarView />
  </div>
</template>

<!-- Your existing script and style sections remain unchanged -->

<script>
import LinechartView from "./LinechartView.vue";
import CurrentplaybarView from "./CurrentplaybarView.vue";
import axios from "axios";

export default {
  name: "UserdashboardView",
  components: {
    LinechartView,
    CurrentplaybarView,
  },
  data() {
    return {
      tracks: [], // Initialize as an empty array
      albums: [],
      songCount: 0,
      albumCount: 0,
    };
  },
  created() {
    this.fetchDashboardData();
    this.fetchTracklist();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get("http://localhost:5000/creatorsdash");
        console.log(response);
        if (response.status === 200) {
          this.songCount = response.data.title_count;
          this.albumCount = response.data.album_count;
          this.albums = response.data.albums;
        } else {
          console.error("Failed to fetch dashboard data:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
    async fetchTracklist() {
      try {
        const response = await axios.get("http://localhost:5000/tracklist");
        console.log(response);
        if (response.status === 200) {
          this.tracks = response.data.tracks;
        } else {
          console.error("Failed to fetch dashboard data:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
  },
};
</script>

<style scoped>
.upload-button {
  align-items: left;
  padding: 10px 10px;
  margin-top: 10px;
  background-color: #61dafb; /* Spotify's green color */
  color: black;
  border: none;
  border-radius: 4%; /* Make it round */
  cursor: pointer;
  /* font-size: 1.2em */
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #4fa3d1; /* Darker shade on hover */
}
.vercel-background {
  background: linear-gradient(to bottom right, #121415, #303034);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 
.dashboard-section-1 {
  flex: 2;
} */

.dashboard-section-2 {
  flex: 2;
}
.dashboard-item {
  flex: 0 0 75%;
}

.transprent {
  padding: 15px;
  border-radius: 15px;
  background-color: rgba(
    112,
    102,
    102,
    0.7
  ); /* Adjust opacity and color as needed */
  /* min-height: 100vh; */
  /* align-items: center; */
  /* display: flex; Allow content to be centered horizontally */
  /* justify-content: center; */
}
.text {
  color: white;
}
.vercel-square {
  /* width: 100px; */
  /* height: 200px; */
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border: 0.75px solid #fff; /* White border */
  border-radius: 10px;
}

.vercel-large-square {
  flex: 1; /* Make each square take equal width within the container */
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px; /* Adjust the maximum width as needed */
}

.dashboard-section {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.dashboard-item {
  background-color: #000;
  color: #fff;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 5px;
  border: 0.75px solid #fff;
  border-radius: 10px;
}

.dashboard-title {
  font-size: 1.2em;
}
</style>

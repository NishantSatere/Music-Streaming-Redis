<template>
  <div class="vercel-background">
    <UsernavbarView />
    <!-- Uncommented navbar component -->
    <div class="main-bg">
      <div class="center-container">
        <div class="song-card">
          <div class="song-info">
            <h2 class="text">{{ songName }}</h2>
            <button class="play-btn" @click="togglePlayPause">
              {{ isPlaying ? "Pause" : "Play" }}
            </button>
            <p class="text">{{ releaseDate }}</p>
          </div>

          <div class="custom-slider">
            <label class="text" for="musicTime">Music Time:</label>
            <input
              type="range"
              id="musicTime"
              v-model="musicTime"
              @input="updateMusicTime"
              :max="audioDuration"
            />
            <span class="text">{{ formattedTime(musicTime) }}</span>
          </div>

          <div class="custom-slider">
            <label class="text" for="volume">Volume:</label>
            <input
              type="range"
              id="volume"
              v-model="volume"
              @input="updateVolume"
            />
            <span class="text">{{ volume }}</span>
            <div class="btn-2">
              <button class="btn" @click="decreaseVolume">-</button>
              <button class="btn" @click="increaseVolume">+</button>
            </div>
          </div>

          <div class="lyrics">
            <!-- Lyrics display area -->
            <p class="text" v-for="(line, index) in lyrics" :key="index">
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <audio ref="audioPlayer" :src="audioSrc"></audio>
  </div>
</template>

<script>
import UsernavbarView from "./UsernavbarView.vue"; // Import the navbar component

export default {
  name: "SongslyricsView",
  components: {
    UsernavbarView, // Add the navbar component to the list of components
  },
  data() {
    return {
      songName: "Song Title",
      releaseDate: "Release Date",
      isPlaying: false,
      progress: 0,
      volume: 50,
      musicTime: 0,
      audioSrc: "../../backend/uploads/simple.mp3", // Change this to your audio file path
      audioDuration: 0,
      lyrics: [
        "Verse 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Chorus: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        // Add more lyrics lines as needed
      ],
    };
  },
  mounted() {
    this.$refs.audioPlayer.addEventListener("timeupdate", this.updateProgress);
    this.$refs.audioPlayer.addEventListener("loadedmetadata", () => {
      this.audioDuration = this.$refs.audioPlayer.duration;
    });
  },
  methods: {
    togglePlayPause() {
      if (this.isPlaying) {
        this.$refs.audioPlayer.pause();
      } else {
        this.$refs.audioPlayer.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    formattedTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    },
    increaseVolume() {
      this.volume = Math.min(100, this.volume + 10);
      this.$refs.audioPlayer.volume = this.volume / 100;
    },
    decreaseVolume() {
      this.volume = Math.max(0, this.volume - 10);
      this.$refs.audioPlayer.volume = this.volume / 100;
    },
    updateProgress() {
      this.musicTime = this.$refs.audioPlayer.currentTime;
    },
    updateMusicTime() {
      this.$refs.audioPlayer.currentTime = this.musicTime;
    },
    updateVolume() {
      this.$refs.audioPlayer.volume = this.volume / 100;
    },
  },
};
</script>

<style scoped>
/* Your existing styles */

.custom-slider {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.custom-slider label {
  margin-right: 10px;
}

.btn {
  padding: 5px;
  margin: 3px;
  border-radius: 10%;
  background-color: white;
  gap: 2;
}

.custom-slider input {
  flex: 1;
  margin-right: 10px;
}

.main-bg {
  display: flex;
  padding: 10;
  height: 80vh;
  align-items: center;
  justify-content: center;
}

.text {
  color: white;
}

.center-container {
  width: 80%;
}

.play-btn {
  background-color: #61dafb;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10%;
}

.play-btn:hover {
  background-color: #4fa3d1; /* Darker shade on hover */
}
.song-card {
  background-color: #000;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.song-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.lyrics p {
  margin-bottom: 8px;
}
</style>

<template>
  <Layout>
    <Header />
    <div class="map-container">
      <!--
    <div style="height: 200px overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div> -->
      <l-map
        class="map"
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 100%; width: 90%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <!--
      <l-marker :lat-lng="withPopup">

        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
       -->
        <l-marker :lat-lng="center">
          <l-tooltip
            :options="{
              permanent: true,
              interactive: true,
              direction: 'bottom',
            }"
          >
            <div>
              Via Guidobaldi snc 64010 - Alba Adriatica (TE) - Italy
              <p v-show="showParagraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                Donec finibus semper metus id malesuada.
              </p>
            </div>
          </l-tooltip>
          -->
        </l-marker>
      </l-map>
    </div>
    <div class="section">
      <h2 class="title">CONTATTACI</h2>
      <div class="form-section">
        <form
          name="contatti"
          method="post"
          v-on:submit.prevent="handleSubmit"
          action="/success/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label> Don’t fill this out: <input name="bot-field" /> </label>
          </p>

          <div class="sender-info">
            <div>
              <label for="name" class="label">Nome</label>
              <input type="text" name="name" v-model="formData.name" />
            </div>
            <div>
              <label class="tel" for="tel">Telefono</label>
              <input type="tel" name="tel" v-model="formData.tel" />
            </div>
            <div>
              <label class="email" for="email">Email</label>
              <input type="email" name="email" v-model="formData.email" />
            </div>
          </div>

          <div class="message-wrapper">
            <label class="message" for="message">Messaggio</label>
            <textarea
              name="message"
              v-model="formData.message"
              rows="5"
            ></textarea>
          </div>

          <button class="btn-contact" type="submit">INVIA</button>
        </form>
      </div>
    </div>
    <div class="section">
      <strong>Corrado Di Marco</strong>
      <p>Tel: 348-0779392</p>
      <p>Email: corrado@partsncode.works</p>
    </div>
  </Layout>
</template>

<script>
//import { latLng } from "leaflet";

//import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

import Header from "~/components/Header.vue";

let Vue2Leaflet = {};
let L = {};
let latLng;

if (process.isClient) {
  L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
  Vue2Leaflet = require("vue2-leaflet");
  latLng = require("leaflet").latLng;
}

export default {
  components: {
    LMap: Vue2Leaflet.LMap,
    LTileLayer: Vue2Leaflet.LTileLayer,
    LMarker: Vue2Leaflet.LMarker,
    LPopup: Vue2Leaflet.LPopup,
    LTooltip: Vue2Leaflet.LTooltip,

    Header,
  },
  metaInfo: {
    title: "Contatti | PartsnCode",
    titleTemplate: "%s",
  },
  data() {
    return {
      formData: {},
      zoom: 13,
      //center: latLng(42.83461, 13.9195),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      //withPopup: latLng(42.839354, 13.89684),
      //withTooltip: latLng(42.83461, 13.9195),
      currentZoom: 11.5,
      //currentCenter: latLng(42.83461, 13.9195),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          ...this.formData,
        }),
      })
        .then(() => this.$router.push("/grazie/"))
        .catch((error) => alert(error));
    },
  },
  computed: {
    center() {
      if (process.isClient) {
        return latLng(42.83461, 13.9195);
      }
    },
  },
};
</script>

<style scoped>
.map-container {
  height: 40vh;
  width: 100%;
  display: flex;
  justify-content: center;
}

.map {
  z-index: 0;
}

.label,
.email,
.message,
.tel {
  font-weight: bold;
  display: block;
  margin-top: 1.2em;
}

input,
textarea {
  border: 1px solid #707070;
  width: 60%;
  max-width: 600px;
  padding: 1em;
  border-radius: 0.5em;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  text-align: center;
}

.btn-contact {
  padding: 1em 0;
  font-weight: bold;
  width: 20%;
  border-radius: 0.5em;
  font-size: 1.3rem;
  cursor: pointer;
  border: none;
  margin-top: 2em;
  max-width: 200px;
  background-color: white;
}

.btn-contact:hover {
  background-color: #e6e6e6;
}

.section {
  text-align: center;
  margin-top: 4em;
}
.form-section {
  width: 100%;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="text"],
  input[type="tel"],
  input[type="email"],
  textarea {
    font-size: 16px;
  }
}
</style>

<template>
<div class="video-wrapper">
  <div class="webRTC" :class="{'active-call': remoteStream}">
      <div class="video pa-2">
        <video  
          id="local_video"
          playsinline
          autoplay
          muted></video>
      </div>

      <div class="video pa-2">
        <video 
        id="remoteVideo"
        playsinline
        autoplay muted></video>
      </div>
      
  </div>
</div>
  
</template>

<script>
export default {
  name: 'webRTC',
  data: function () {
    return {
      localStream: null,
      remoteStream: null,
      peerConnection: null,
      connection: null,
      call: null
    }
  },
  sockets: {
      'start-video': function() {
        this.startCall();
      },
      'end-video': function() {
        this.peerConnection.disconnect();
        this.endConnection();
      } 
  },
  methods: {
    startCall: async function() {
      const self = this;
      let peerId = location.search.slice(1);
      this.connection = this.peerConnection.connect(peerId);
      let call = await this.peerConnection.call(peerId, this.localStream);
      call.on('stream', function(stream) {
        document.getElementById("remoteVideo").srcObject = stream;
        self.remoteStream = stream;
      });
    },
    initConnection: function() {
      const self = this;
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(localStream => {
          document.getElementById("local_video").srcObject = localStream;
          self.localStream = localStream;
        })
        .catch(err => {this.handleError(err)});
    },
    handleError: function(err) {
      this.$store.dispatch('addGlobalMessage', {text: err.message, type: 'error'});
    },
    endConnection: function() {
      this.call = null;
      document.getElementById("local_video").pause;
      document.getElementById("remoteVideo").pause;
      document.getElementById("local_video").srcObject = null;
      document.getElementById("remoteVideo").srcObject = null;
      if(this.localStream) this.localStream.getTracks()[0].stop();
      if(this.remoteStream) this.remoteStream.getTracks()[0].stop();
    }
  },

  created () {
    let Peer = window.peerjs.Peer;
    this.initConnection();
    this.peerConnection = new Peer();
    const self = this;

    this.peerConnection.on('open', function(id) {
      self.$emit('peer-id', id);
    }); 
    this.peerConnection.on('connection', dataConnection => {
      this.connection = dataConnection;
      console.log(this.connection, dataConnection);
    });
    this.peerConnection.on('call',async call => {
      console.log(1);
      call.answer(self.localStream);
      call.on('stream', function(stream) {
        document.getElementById("remoteVideo").srcObject = stream;
        self.remoteStream = stream;
      });
    });
  }
}
</script>  

<style>
.video-wrapper{
  position: relative;
  width: 100%;
}
.webRTC{
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 50%;
  right: 0;
  z-index: -1;
}  
.webRTC > .video {
  display: flex;
  max-width: 50%;
  border: 1px solid white;
}
video{
  max-width: 100%
}
.active-call{
  z-index: 10 !important;
}
</style>
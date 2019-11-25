<template>
<div>
  <div class="webRTC" v-show="call">
    <video  
      id="local_video" 
      playsinline 
      autoplay class="ml-auto"
      muted></video>
    <video 
      id="remoteVideo" 
      playsinline class="ml-2"
      autoplay muted></video>
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
      call: null
    }
  },
  sockets: {
      'start-video': function() {
        this.startCall();
      } 
  },
  methods: {
    startCall: async function() {
      let peerId = location.search.slice(1);
      this.peerConnection.connect(peerId);
      this.call = await this.peerConnection.call(peerId, this.localStream)
      this.call.on('stream', function(stream) {
        document.getElementById("remoteVideo").srcObject = stream;
        this.remoteStream = stream;
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
    }
  },

  created () {
    let Peer = window.peerjs.Peer;
    this.initConnection();
    if(this.$store.state.auth.currentUser._id) {
      this.peerConnection = new Peer([this.$store.state.auth.currentUser._id]); 
    } else {
      this.peerConnection = new Peer();
    }
    this.peerConnection.on('call', call => {
      call.answer(this.localStream);
      this.call = call;
      this.call.on('stream', function(stream) {
        document.getElementById("remoteVideo").srcObject = stream;
      });
    });
  }
}
</script>  

<style>
.webRTC{
  display: flex;
  width: fit-content;
}  
.webRTC > video {
  display: flex;
  max-width: 25%;
}
</style>
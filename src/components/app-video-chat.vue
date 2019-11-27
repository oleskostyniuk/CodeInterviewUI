<template>
<div>
  <div class="webRTC d-flex">
    <div class="webRTC_video d-flex">
      <div class="no-video" v-show="!localStream">

      </div>
      <video  
      id="local_video" 
      playsinline 
      autoplay
      muted></video>
    </div>

    <div class="webRTC_video d-flex">
      <video v-show="remoteStream"
        id="remoteVideo" 
        playsinline class="ml-2"
        autoplay muted></video>
        <div class="no-video" v-if="!remoteStream"></div>
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
      call: null
    }
  },
  sockets: {
      'start-video': function() {
        this.startCall();
      },
      'end-video': function() {
        debugger
        this.peerConnection.disconnect();
        this.endConnection();
      } 
  },
  methods: {
    startCall: async function() {
      const self = this;
      let peerId = location.search.slice(1);
      this.peerConnection.connect(peerId);
      this.call = await this.peerConnection.call(peerId, this.localStream)
      this.call.on('stream', function(stream) {
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
    // this.peerConnection.on('close', () => {
    //   this.peerConnection.disconnect();
    //   this.endConnection();
    // });
  }
}
</script>  

<style>
.webRTC{
  display: flex;
  width: 100%;
  justify-content: flex-end;
}  
.webRTC_video > video {
  display: flex;
  max-width: 25%;
}
.webRTC_video > .no-video {
  display: flex;
  width: 25%;
  height: 100%;
  background: #000000;
}
</style>
<template>
<div>
  <div class="webRTC">
    <video 
      id="local_video" 
      playsinline 
      autoplay 
      muted></video>
    <video 
      id="remoteVideo" 
      playsinline 
      autoplay></video>
  </div>
  
  <v-btn @click="startCall" 
          small 
          v-if="peerConnection && peerConnection.id !== 123" 
          class="primary ml-auto mt-2">Call</v-btn>
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
      
  },
  methods: {
    startCall: function() {
      let dataConnection = this.peerConnection.connect('123');
      console.log(dataConnection);
      this.call = this.peerConnection.call('123', this.localStream)
      this.call.on('stream', function(stream) {
        document.getElementById("remoteVideo").srcObject = stream;
      });
      console.log(this.call);
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
    this.initConnection();
    let Peer = window.peerjs.Peer;
    let urlParam = location.search;
    if(urlParam.length === 0) {
      this.peerConnection = new Peer(); 
    } else {
      this.peerConnection = new Peer([123]);  
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
  width: 100%;
  justify-content: space-around;
}  
.webRTC > video {
  display: flex;
  max-width: 50%;
  max-height: 200px;
}
</style>
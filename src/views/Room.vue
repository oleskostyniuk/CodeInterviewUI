<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <span class="w-100 text-center">Hello world</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import io from 'socket.io-client';

export default {
	name: 'room',
	data: () => ({
		socket: null
	}),
	methods: {
		// initSocketConnection: function() {
		// 	let socket = io.connect('http://localhost:3000');
			
		// 	socket.on('connect', function (data) {
				
		// 	});

		// 	socket.on('connect', function (data) {
				
		// 	});

		// 	socket.on('connect', function (data) {
				
		// 	});
		// }
	},
	created() {
		// this.initSocketConnection();
	}
}
</script>

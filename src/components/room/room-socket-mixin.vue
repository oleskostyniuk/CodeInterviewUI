<template>
	<span class="d-none">Socket Mixin for room</span>		
</template>

<script>
export default {
	sockets: {
		'message': function(data) {
			this.handleEvent(data[0], data[1]);
		},
		'error': function(err) {
			this.handleEvent(err.message, 'error');
		},
		'connect_error': function(err) {
			this.handleEvent(err.message, 'error');
		},
		'connect_timeout': function() {
			this.handleEvent('Connection timeout', 'error');
		}
	},
	methods: {
		handleEvent: function(data, type) {
			this.$store.dispatch('addGlobalMessage', {text: data, type: type});
		},
	},
	created() {
		console.log('Room socket mixin added');
	}
}
</script>
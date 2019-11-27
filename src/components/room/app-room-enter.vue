<template>
	<v-dialog v-model="dialog" persistent overlay-opacity='90' width="500">
		<v-card class="pa-5" dark>
        
				<v-text-field solo v-model="name" hide-details placeholder="Enter your name"></v-text-field>
        
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" class="mx-auto px-5" :disabled="name.length === 0" @click="setName">
            Start
          </v-btn>
        </v-card-actions>
      </v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['dialog'],
	data: () => ({
		name: ''
	}),
	methods: {
		setName: function() {
			this.$emit('name-setted', this.name);
		}
	}
}
</script>
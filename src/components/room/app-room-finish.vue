<template>
	<v-dialog v-model="dialog" persistent overlay-opacity='90' width="500">
		<v-card class="pa-5" dark>
        
				<span class="text-center d-block title">Call End <br>How do you like it?</span>
        
        <v-card-actions>
          <div class="text-center mx-auto">
						<v-rating v-model="rating" color="orange"></v-rating>
					</div>
        </v-card-actions>
      </v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['dialog'],
	data: () => ({
		rating: null
	}),
}
</script>
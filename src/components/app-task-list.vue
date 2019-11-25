<template>
	<v-card flat>

		<v-tabs v-model="tab" centered dark>
					<v-tab>
						My
					</v-tab>

					<v-tab>
						Public
					</v-tab>
		</v-tabs>

    <v-tabs-items dark v-model="tab">
      <v-tab-item>
        <v-card flat>
					<v-list dense v-if="myTasks.length !== 0">
						<v-list-item v-for="(item, index) in myTasks" :key='index' @click="show(item)">
							<v-list-item-content>
								{{item.title}}
							</v-list-item-content>
							<v-list-item-action>
								<v-btn icon>
									<v-icon color="grey lighten-1">mdi-information</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</v-list>
        </v-card>
      </v-tab-item>

			<v-tab-item >
        <v-card flat>
					<v-list dense v-if="tasks.length !== 0">
						<v-list-item v-for="(item, index) in tasks" :key='index' @click="show(item)">
							<v-list-item-content>
								{{item.title}}
							</v-list-item-content>
							<v-list-item-action>
								<v-btn icon>
									<v-icon color="grey lighten-1">mdi-information</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</v-list>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

		
	</v-card>
</template>

<script>
export default {
	data: () => ({
		tasks: [],
		myTasks: [],
		tab: null
	}),
	watch: {
		tab: function(val) {
			if(val === 0) {
				this.getMyTasks();
			} else if (val === 1) {
				this.getTasks();
			}
		}
	},
	methods: {
		show(item) {
			console.log(item);
		},
		getTasks() {
			this.$store.dispatch('getTasks')
				.then(res => {
					if(res) {
						this.tasks = res;
					}
				})
		},
		getMyTasks() {
			this.$store.dispatch('getMyTasks')
				.then(res => {
					if(res) {
						this.myTasks = res;
					}
				})
		}
	},
}
</script>
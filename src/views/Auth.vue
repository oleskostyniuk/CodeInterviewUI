<template>
	<div class="auth_page flex blue-grey darken-3 mx-0">
		<v-flex d-flex class="justify-center align-center h-100">
			<v-card class="w-25 blue-grey darken-4 px-3 pb-3" dark >
					<div class="text-center title mt-2 mb-3">Sign In</div>		
					
					<v-text-field solo placeholder="Email" prepend-inner-icon="mdi-account" v-model="loginForm.email"
						:error-messages="errors.email" @input="errors.email = ''"></v-text-field>		

					<v-text-field solo placeholder="Password" type="password" prepend-inner-icon="mdi-lock"
						:error-messages="errors.password" @input="errors.password = ''" v-model="loginForm.password"></v-text-field>		
			
					<div class="w-100 mt-2 text-center">
						<span>Don't have acoount yet?</span><br>
						<router-link :to="{ name: 'reg'}">Sign Up</router-link>
						<v-btn class="d-flex mx-auto w-25 mt-2" @click="doLogin">LOGIN</v-btn>
					</div>
			</v-card>
		</v-flex>
  </div>
</template>

<script>
export default {
	name: 'auth',
	data: () => ({
		loginForm: {
			email: '',
			password: ''
		},
		errors: { email: '', password: ''}
	}),
	methods: {
		validate: function() {
			let errors = {};
			if(this.loginForm.email.length < 1) {
				errors.email = 'Enter email';
			}
			if(this.loginForm.password.length < 1) {
				errors.password = 'Enter password';
			}
			if(Object.entries(errors).length > 0) {
				this.errors = errors;
				return false
			} else {
				return true;
			}
		},
		doLogin: function() {
			if(this.validate()) {
				let self = this;
				this.$store.dispatch('logIn', {"email": this.loginForm.email, "password": this.loginForm.password })
					.then(res => {
						if(res) {
							self.$router.push({name: 'home'});
						}
					});
			}
		},
		created() {
		}
	}
}
</script>

<style>
.auth_page{
	height: 100vh;
}
.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot{
	background: #7F7F7F !important;

}
</style>
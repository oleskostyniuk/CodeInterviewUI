<template>
	<div class="auth_page flex blue-grey darken-3 mx-0">
		<v-flex d-flex class="justify-center align-center h-100">
			<v-card class="w-25 blue-grey darken-4 px-3 pb-3" dark >
					<div class="text-center title mt-2 mb-3">Sign In</div>		
					
					<v-text-field solo placeholder="Login" prepend-inner-icon="mdi-account" v-model="loginForm.login"
						:error-message="errors.login"></v-text-field>		

					<v-text-field solo placeholder="Password" type="password" prepend-inner-icon="mdi-lock"
						:error-message="errors.password" v-model="loginForm.password"></v-text-field>		
			
					<div class="w-100 mt-2 text-center">
						<span>Don't have acoount yet?</span><br>
						<router-link :to="{ path: '/registration'}">Sign Up</router-link>
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
			login: '',
			password: ''
		},
		errors: { login: '', password: ''}
	}),
	methods: {
		validate: function() {
			let errors = {};
			if(this.loginForm.login.length < 1) {
				errors.login = 'Enter Login';
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
			debugger;
			if(this.validate()) {
				this.$store.dispatch('logIn', {"login": this.loginForm.login, "password": this.loginForm.password });
			}
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
<template>
	<div class="auth_page flex blue-grey darken-3 mx-0">
		<v-flex d-flex class="justify-center align-center h-100">
			<v-card class="w-25 blue-grey darken-4 px-3 pb-3" dark >
					<div class="text-center title mt-2 mb-3">Sign Up</div>		
					
					<v-text-field solo placeholder="Login" prepend-inner-icon="mdi-account"
						:error-messages="errors.login"></v-text-field>		

					<v-text-field solo placeholder="Password" type="password" prepend-inner-icon="mdi-lock"
						:error-messages="errors.password"></v-text-field>

					<v-text-field solo placeholder="Repeat Password" type="password" prepend-inner-icon="mdi-lock"
						:error-messages="errors.repeatPassword"></v-text-field>		

					<v-text-field solo placeholder="First Name" prepend-inner-icon="mdi-lock"
						:error-messages="errors.firstName"></v-text-field>		
						
					<v-text-field solo placeholder="Last Name"  prepend-inner-icon="mdi-lock"
						:error-messages="errors.lastName"></v-text-field>	

					<v-text-field solo placeholder="Company" prepend-inner-icon="mdi-lock"
						:error-messages="errors.company"></v-text-field>	
			
					<div class="w-100 mt-2 text-center">
						<v-btn class="d-flex mx-auto w-25 mt-2" @click="doRegistration">Sign Up</v-btn>
					</div>
			</v-card>
		</v-flex>
  </div>
</template>

<script>
export default {
	data: () => ({

	}),
	methods: {
		doRegistration: function() {

		},
		validate: function() {
			this.errors = {};
			if(this.loginForm.login.length < 1) {
				this.errors.login = 'Enter Login';
			}
			if(this.loginForm.password.length < 1) {
				this.errors.password = 'Enter password';
			}
			if(this.loginForm.RepeatPassword.length < 1) {
				this.errors.repeatPassword = 'Enter repeat password';
			}
			if(this.loginForm.password.firstName < 1) {
				this.errors.firstName = 'Enter first name';
			}
			if(this.loginForm.lastName.length < 1) {
				this.errors.lastName = 'Enter last name';
			}
			if(this.loginForm.company.length < 1) {
				this.errors.company = 'Enter company';
			}
			if(this.loginForm.RepeatPassword !== this.regForm.password) {
				this.errors.repeatPassword = 'Passwords are different';
			}
		},
	}
}
</script>

<style scoped>

</style>
<template>
	<div class="auth_page flex blue-grey darken-3 mx-0">
		<v-flex d-flex class="justify-center align-center h-100">
			<v-card class="w-25 blue-grey darken-4 px-3 pb-3" dark >
					<div class="text-center title mt-2 mb-3">Sign Up</div>		
					
					<v-text-field solo placeholder="Email" prepend-inner-icon="mdi-account"
						:error-messages="errors.email" v-model="loginForm.email" @input="errors.login = null"></v-text-field>		

					<v-text-field solo placeholder="Password" type="password" prepend-inner-icon="mdi-lock"
						:error-messages="errors.password" v-model="loginForm.password" @input="errors.password = null"></v-text-field>

					<v-text-field solo placeholder="Repeat Password" type="password" prepend-inner-icon="mdi-lock"
						:error-messages="errors.repeatPassword" v-model="loginForm.repeatPassword" @input="errors.repeatPassword = null"></v-text-field>		

					<v-text-field solo placeholder="First Name" prepend-inner-icon="mdi-lock"
						:error-messages="errors.firstName" v-model="loginForm.firstName" @input="errors.firstName = null"></v-text-field>		
						
					<v-text-field solo placeholder="Last Name"  prepend-inner-icon="mdi-lock"
						:error-messages="errors.lastName" v-model="loginForm.lastName" @input="errors.lastName = null"></v-text-field>	

					<v-text-field solo placeholder="Company" prepend-inner-icon="mdi-lock"
						:error-messages="errors.company" v-model="loginForm.company" @input="errors.company = null"></v-text-field>	
			
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
		errors: {},
		loginForm: {
			email: '',
			password: '',
			repeatPassword: '',
			firstName: '',
			lastName: '',
			company: ''
		}
	}),
	methods: {
		isEmpty(obj) {
			for (let key in obj) {
				return false;
			}
				return true;
		},
		doRegistration: function() {
			this.validate();
			const self = this;
			if(this.isEmpty(this.errors)) {
				this.$store.dispatch('registration', this.loginForm)
					.then((res) => {
						debugger;
						if(typeof(res) === 'string') {
							self.errors.email = res;
						} else if (typeof(res) === 'object') {
							self.$router.push({name: 'auth'});
						}
					});
			}
		},
		validate: function() {
			this.errors = {};
			if(this.loginForm.email.length < 1) {
				this.errors.email = 'Enter email';
			}
			if(this.loginForm.password.length < 1) {
				this.errors.password = 'Enter password';
			}
			if(this.loginForm.repeatPassword.length < 1) {
				this.errors.repeatPassword = 'Enter repeat password';
			}
			if(this.loginForm.firstName.length < 1) {
				this.errors.firstName = 'Enter first name';
			}
			if(this.loginForm.lastName.length < 1) {
				this.errors.lastName = 'Enter last name';
			}
			if(this.loginForm.company.length < 1) {
				this.errors.company = 'Enter company';
			}
			if(this.loginForm.repeatPassword !== this.loginForm.password) {
				this.errors.repeatPassword = 'Passwords are different';
			}
		},
	}
}
</script>

<style scoped>

</style>
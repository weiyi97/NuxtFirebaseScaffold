<template>
	<v-app-bar app color="primary">
		<v-row align="center" justify="center">
			<v-col lg="10" md="10" sm="10" xs="10" class="pa-0">
				<div class="d-flex justify-space-between align-center">
					<a href="/" class="title-text">
						<img src="logo/logo.png" width="100px" height="40px" />
					</a>

					<div v-if="isAuthenticated" class="d-flex justify-end">
						<!-- Only show welcome message in laptops -->
						<div v-if="!$vuetify.breakpoint.mobile">
							<h5 class="white--text">Welcome</h5>
							<h2 class="white--text">Your Name Here</h2>
						</div>
						<v-avatar class="mx-4">
							<img :src="photoUrl" />
						</v-avatar>
						<v-btn icon @click="logout">
							<v-icon color="white" @click="logout">mdi-logout</v-icon>
						</v-btn>
					</div>

					<div v-else>
						<v-btn text color="white" class="mx-4" nuxt to="/login">
							Login
						</v-btn>
						<v-btn outlined color="white" darkclass="mx-4" nuxt to="/signup">
							Sign Up
						</v-btn>
					</div>
				</div>
			</v-col>
		</v-row>
	</v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "AppBar",
	data() {
		return {
			photoUrl: "https://cdn.vuetifyjs.com/images/john.jpg"
		};
	},
	computed: {
		...mapGetters("user", ["isAuthenticated"])
	},
	methods: {
		...mapActions("user", ["authLogout"]),

		logout() {
			this.authLogout().then(() => {
				this.$router.push("/");
			});
		}
	}
};
</script>

<style scoped>
</style>

<template>
	<div>
		<v-row justify="center">
			<v-col lg="8" sm="9" xs="12">
				<v-card v-if="!confirmed" color="grey lighten-2">
					<v-container>
						<v-row align="center" justify="center">
							<v-col>
								<div class="text-h5 text-center mb-5">Create User Account</div>
								<v-card-text>
									<v-form ref="signUpForm" v-model="valid">
										<v-text-field
											background-color="white"
											v-model="extraDisplayName"
											label="Display Name"
											prepend-inner-icon="mdi-karate"
											clearable
											outlined
										></v-text-field>
										<v-text-field
											background-color="white"
											v-model="email"
											label="E-mail"
											:rules="emailRules"
											name="email"
											prepend-inner-icon="mdi-email"
											type="email"
											clearable
											outlined
										></v-text-field>

										<v-text-field
											background-color="white"
											v-model="password"
											:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
											:rules="passwordRules"
											:type="show1 ? 'text' : 'password'"
											name="input-10-1"
											label="Password"
											@click:append="show1 = !show1"
											prepend-inner-icon="mdi-lock"
											clearable
											outlined
										></v-text-field>

										<v-text-field
											background-color="white"
											v-model="confirmPassword"
											:append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
											:rules="[
												this.password === this.confirmPassword ||
													'Password must match',
											]"
											:type="show2 ? 'text' : 'password'"
											name="input-10-1"
											label="Confirm Password"
											@click:append="show2 = !show2"
											prepend-inner-icon="mdi-lock"
											clearable
											outlined
										></v-text-field>

										<v-btn
											block
											color="primary"
											:disabled="!valid"
											@click="signUp"
											>Sign Up
										</v-btn>
										<p class="red--text mt-4" v-if="error">{{ error }}</p>
									</v-form>

									<v-divider class="mt-2 mb-3"></v-divider>
									<div class="text-button d-flex justify-center">
										OR SIGN IN WITH:
									</div>
									<v-btn
										class="mt-3 buttoncolor"
										block
										outlined
										color="primary"
										@click="googleSignIn"
									>
										<v-icon class="pr-4">mdi-google</v-icon>
										Google
									</v-btn>
									<v-btn
										class="mt-3 buttoncolor"
										block
										outlined
										color="primary"
										@click="facebookLogin"
									>
										<v-icon color="#3b5998" class="pr-4">mdi-facebook</v-icon>
										Facebook
									</v-btn>
									<v-btn
										class="mt-3 buttoncolor"
										block
										outlined
										color="primary"
										@click="linkedInLogin"
									>
										<v-icon color="#0077B5" class="pr-4">mdi-linkedin</v-icon>
										LinkedIn
									</v-btn>
								</v-card-text>
							</v-col>
						</v-row>
					</v-container>
				</v-card>

				<v-card v-if="confirmed" color="grey lighten-2">
					<v-container>
						<v-col align="center">
							<div class="my-3 text-h5 font-weight-bold">
								Welcome to the Club!
							</div>
							<div class="my-3 text-subtitle-1">
								A verification email was sent to your email.
							</div>
							<v-btn color="primary" @click="$router.push('/')"
								>Back to Home</v-btn
							>
						</v-col>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { auth, firestoreDB } from "@/firebase/init.js";

export default {
	name: "SignUp",
	data() {
		return {
			confirmed: false,
			error: "",
			show1: false,
			show2: false,
			valid: false,
			email: "",
			emailRules: [
				v => !!v || "E-mail is required",
				v => /.+@.+\..+/.test(v) || "E-mail must be valid"
				//(v) => /@gmail.com\s*$/.test(v) || "E-mail must be a Gmail",
			],
			password: "",
			passwordRules: [v => !!v || "Password is required"],
			confirmPassword: "",
			extraDisplayName: "" // Not required by Firebase Auth, but extra stuff you might want
		};
	},

	methods: {
		googleSignIn() {
			this.$store.dispatch("user/signInWithGoogle").catch(err => {
				alert(err.message);
			});
		},
		facebookLogin() {
			this.$store.dispatch("user/signInWithFacebook").catch(err => {
				alert(err.message);
			});
		},
		linkedInLogin() {
			this.$store.dispatch("user/signInWithLinkedIn").catch(err => {
				alert(err.message);
			});
		},
		signUp() {
			// Create user in Firebase Auth
			auth
				.createUserWithEmailAndPassword(this.email, this.password)
				.then(user => {
					this.confirmed = true;
					return user;
				})
				.then(user => {
					// Create User document in Firestore to store additional details
					const userData = {
						email: this.email,
						emailVerified: user.user.emailVerified,
						uid: user.user.uid,
						displayName: this.extraDisplayName
					};

					firestoreDB
						.collection("Users")
						.doc(user.user.uid)
						.set(userData)
						.catch(err => {
							console.error(err);
						});
				})
				.then(() => {
					// Send email verification, if you want to
					auth.currentUser.sendEmailVerification();
				})
				.catch(e => {
					this.error = e;
				});
		}
	}
};
</script>

<style scoped>
.buttoncolor {
	background-color: white !important;
}
</style>

// This method negates the need to have cookies
// because all of it is handled within onAuthStateChanged listener
import { auth } from '@/firebase/init.js'

export default (context) => {
	const { store } = context;

	return new Promise((resolve, reject) => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				await store.dispatch('user/authSuccess', user);
			} else {
				await store.dispatch('user/authLogoutSuccess', user);
			}
			resolve()
		})
	})
}

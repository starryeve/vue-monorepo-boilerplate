import { defineComponent } from 'vue'

// @ts-ignore
import Home from './pages/Home.vue'

const app = defineComponent({
	name: 'App',
	setup() {
		return () => (
			<div>
				<Home></Home>
			</div>
		)
	},
})

export default app

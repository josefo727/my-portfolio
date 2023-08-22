<template>
	<section id="success-stories" class="success-stories">
		<div v-for="(storie, index) in successStories" :key="index">
			<h4>{{ storie.title }}</h4>
			<div v-html="storie.body" />
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "Index",
	computed: {
		...mapState('successStories', ['successStories']),
	}
}
</script>

<style scoped>
.success-stories {
	margin: 40px 100px 0;
}
</style>

<template>
	<div>
		<h3 class="resume-title">Professional Experience</h3>
		<div class="resume-item" v-for="(exp, index) in experience" :key="index">
			<h4>{{ exp.title }}</h4>
			<h5>{{ exp.tenure }}</h5>
			<p>
				<em>{{ exp.company }}</em>
				<small v-if="exp.web_site"> - <a :href="exp.web_site" target="_blank">Sitio Web</a></small>
			</p>
			<ul>
				<li v-for="(item, index) in exp.items" :key="index" v-html="item"></li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "Experience",
	computed: {
		...mapState('experience', ['experience']),
	}
}
</script>

<style scoped></style>

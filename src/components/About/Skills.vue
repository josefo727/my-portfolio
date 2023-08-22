<template>
	<section id="skills" class="skills section-bg">
		<div class="container">
			<div class="section-title">
				<h2>Habilidades y Destrezas</h2>
				<p class="skills-intro">
					A lo largo de mi carrera como desarrollador, he ganado habilidades que me han impulsado hacia adelante.
					Por ejemplo, prefiero simplificar problemas en vez de complicarlos. Estoy comprometido y me implico al
					máximo en lo que hago. Soy proactivo, siempre con la iniciativa y el deseo de aprender y mejorar cada
					día. La perseverancia es una de mis fortalezas y sé manejar la frustración. Tengo una base sólida en
					programación orientada a objetos y puedo adaptarme rápidamente a nuevas tecnologías.
				</p>
			</div>
			<div class="row skills-content">
				<template v-for="(skill, index) in skills">
					<skill :skill="skill" :index="index" :key="index"></skill>
				</template>
			</div>
		</div>
	</section>
</template>

<script>
import Skill from './Skill';
import { mapState } from 'vuex';

export default {
	name: "Skills",
	components: {
		Skill,
	},
	computed: {
		...mapState('skills', ['skills']),
	}
}
</script>

<style scoped>
.skills-content {
	margin-bottom: 75px;
	margin-left: 8px;
}

.skills-intro {
	text-align: justify;
}
</style>

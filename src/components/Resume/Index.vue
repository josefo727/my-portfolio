<template>
	<section id="resume" class="resume">
		<div class="container">

			<div class="section-title">
				<h2>Currículum</h2>
				<p>
					Soy matemático y desarrollador web UI/UX con más de 13 años de experiencia en programación. He
					generado código para empresas e instituciones tanto del sector público como privado. Me considero un
					especialista en resolver problemas y trabajar en equipo. Además, disfruto trabajando como freelancer.
				</p>
			</div>

			<div class="row">
				<div class="col-lg-6" data-aos="fade-up">
					<Summary />
					<Education />
				</div>
				<div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
					<Experience />
				</div>
			</div>

		</div>
	</section>
</template>

<script>
import Summary from "./Summary";
import Education from "./Education";
import Experience from "./Experience";

export default {
	name: "Index",
	components: {
		Summary,
		Education,
		Experience
	}
}
</script>

<style scoped></style>

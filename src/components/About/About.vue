<template>
	<section id="about" class="about">
		<div class="container">

			<div class="section-title">
				<h2>Acerca de mí</h2>
				<p>
					Hola, soy José Rafael Gutierrez, un padre de familia con una hermosa esposa y dos retoños en proceso de
					cremimiento.
				</p>
			</div>

			<div class="row">
				<div class="col-lg-4" data-aos="fade-right">
					<img src="assets/img/profile-img.jpeg" class="img-fluid" alt="">
				</div>
				<div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
					<h3>UI/UX Designer &amp; Web Developer.</h3>
					<p class="font-italic">
						Algunos datos personales sobre mí.
					</p>
					<div class="row">
						<div class="col-lg-6">
							<ul>
								<li><i class="icofont-rounded-right"></i> <strong>Fecha de Nac.:</strong> {{ birthday }}
								</li>
								<li><i class="icofont-rounded-right"></i> <strong>Sitio Web:</strong> <a
										:href="contact.web_site" target="_blank">{{ contact.web_site }}</a></li>
								<li><i class="icofont-rounded-right"></i> <strong>Mvil:</strong> {{ contact.mobil }}</li>
								<li><i class="icofont-rounded-right"></i> <strong>Ciudad:</strong> {{ location.city }}</li>
							</ul>
						</div>
						<div class="col-lg-6">
							<ul>
								<li><i class="icofont-rounded-right"></i> <strong>Edad:</strong> {{ age }}</li>
								<li><i class="icofont-rounded-right"></i> <strong>Perfil:</strong> Senior</li>
								<li><i class="icofont-rounded-right"></i> <strong>Email:</strong> {{ contact.email }}</li>
								<li><i class="icofont-rounded-right"></i> <strong>Freelance:</strong> Disponible</li>
							</ul>
						</div>
					</div>
					<p class="justify-content">
						Desde hace tiempo me desempeño como desarrollador de sistemas web a medida. Soy aficionado a la
						electrónica, la tecnología, la ciencia y la lectura. Valoro el crecimiento y desarrollo personal que
						surge de la convivencia familiar. Disfruto del ajedrez, la buena música y el cine, pero, más que
						nada, valoro tener tiempo para mis seres queridos.
					</p>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex';
import { calculateAge, formatDate } from '@/helpers/index';

export default {
	name: 'About',
	computed: {
		...mapState('personal', ['my']),
		...mapState('location', ['location']),
		...mapState('contact', ['contact']),
		age() {
			return calculateAge(this.my.birthday);
		},
		birthday() {
			return formatDate(this.my.birthday);
		}
	},
}
</script>

<style scoped>.justify-content {
	text-align: justify;
}</style>

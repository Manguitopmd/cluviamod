document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo img');
    logo.classList.add('animate__animated', 'animate__slideInLeft');
    setTimeout(() => logo.classList.add('animate__pulse'), 1000);

    new Swiper('.hero-swiper', {
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        autoplay: { delay: 5000, disableOnInteraction: false },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 800,
    });

    new Swiper('.cursos-swiper', {
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        autoplay: { delay: 5000, disableOnInteraction: false },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: { 768: { slidesPerView: 3 } },
    });

    new Swiper('.planes-swiper', {
        loop: true,
        initialSlide: 1,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        autoplay: { delay: 5000, disableOnInteraction: false },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: { 768: { slidesPerView: 3 } },
    });

    new Swiper('.testimonios-swiper', {
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        autoplay: { delay: 5000, disableOnInteraction: false },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: { 768: { slidesPerView: 3 } },
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .nav-links-mobile a');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-links-mobile');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.location.href = href;
            }
            if (navMobile.style.display === 'flex') {
                navMobile.style.display = 'none';
                hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#hero').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    window.addEventListener('scroll', () => {
        setActiveLink();
        scrollTopBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
        scrollTopBtn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    });

    const ctaText = document.getElementById('cta-text');
    const ctaPhrases = [
        "Únete a Cluvia y alcanza la excelencia profesional.",
        "Explora nuestros cursos y empieza a crecer hoy.",
        "Conecta con una comunidad que impulsa tu éxito."
    ];
    let ctaIndex = 0;
    setInterval(() => {
        ctaText.classList.remove('animate__fadeInUp');
        ctaText.classList.add('animate__fadeOut');
        setTimeout(() => {
            ctaIndex = (ctaIndex + 1) % ctaPhrases.length;
            ctaText.textContent = ctaPhrases[ctaIndex];
            ctaText.classList.remove('animate__fadeOut');
            ctaText.classList.add('animate__fadeInUp');
        }, 500);
    }, 3000);

    hamburger.addEventListener('click', () => {
        const isOpen = navMobile.style.display === 'flex';
        navMobile.style.display = isOpen ? 'none' : 'flex';
        hamburger.querySelector('i').classList.toggle('fa-bars', !isOpen);
        hamburger.querySelector('i').classList.toggle('fa-times', isOpen);
    });
});

function showAlert() {
    Swal.fire({
        title: '¡Únete a Cluvia!',
        text: 'Regístrate ahora y transforma tu futuro.',
        icon: 'success',
        confirmButtonText: '¡Entendido!',
        confirmButtonColor: '#2563EB',
        background: '#F3F4F6',
        customClass: { title: 'text-azul-cluvia', content: 'text-gris-oscuro' },
    });
}

function submitContactForm() {
    const form = document.getElementById('contact-form');
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        Swal.fire({
            title: '¡Campos incompletos!',
            text: 'Por favor, llena todos los campos para continuar.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#2563EB',
        });
    } else if (!email.includes('@') || !email.includes('.')) {
        Swal.fire({
            title: '¡Correo inválido!',
            text: 'El correo debe incluir "@" y un dominio (ej. nombre@dominio.com).',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#2563EB',
        });
    } else {
        Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarnos. Te responderemos pronto.',
            icon: 'success',
            confirmButtonText: '¡Genial!',
            confirmButtonColor: '#2563EB',
        }).then(() => {
            form.reset();
        });
    }
}

function submitResourcesForm() {
    const form = document.getElementById('resources-form');
    const email = form.querySelector('input[type="email"]').value.trim();

    if (!email) {
        Swal.fire({
            title: '¡Campo vacío!',
            text: 'Por favor, ingresa tu correo electrónico.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#2563EB',
        });
    } else if (!email.includes('@') || !email.includes('.')) {
        Swal.fire({
            title: '¡Correo inválido!',
            text: 'El correo debe incluir "@" y un dominio (ej. nombre@dominio.com).',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#2563EB',
        });
    } else {
        Swal.fire({
            title: '¡Gracias!',
            text: 'Te enviaremos la guía pronto.',
            icon: 'success',
            confirmButtonText: '¡Genial!',
            confirmButtonColor: '#2563EB',
        }).then(() => {
            form.reset();
        });
    }
}

const style = document.createElement('style');
style.innerHTML = `
    .text-azul-cluvia { color: #2563EB !important; }
    .text-gris-oscuro { color: #4B5E6F !important; }
    .scroll-top-btn { opacity: 0; pointerEvents: none; transition: opacity 0.3s ease; }
`;
document.head.appendChild(style);
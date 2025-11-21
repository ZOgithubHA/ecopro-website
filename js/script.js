// CAROUSEL FUNCTIONALITY

(function() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.querySelector('.nav.prev');
    const nextBtn = document.querySelector('.nav.next');
    const indicatorsWrap = document.querySelector('.indicators');
    let idx = 0;
    let interval = null;
    const delay = 10000; // ms между слайдами

    // Создаём индикаторы
    slides.forEach((s, i) => {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => goTo(i));
        indicatorsWrap.appendChild(btn);
    });

    const indicators = Array.from(indicatorsWrap.children);

    function update() {
        slides.forEach(s => s.classList.remove('active'));
        indicators.forEach(i => i.classList.remove('active'));
        slides[idx].classList.add('active');
        indicators[idx].classList.add('active');
    }

    function next() {
        idx = (idx + 1) % slides.length;
        update();
    }

    function prev() {
        idx = (idx - 1 + slides.length) % slides.length;
        update();
    }

    function goTo(i) {
        idx = i;
        update();
        resetTimer();
    }

    prevBtn.addEventListener('click', () => {
        prev();
        resetTimer();
    });

    nextBtn.addEventListener('click', () => {
        next();
        resetTimer();
    });

    // Автоплей
    function startTimer() {
        interval = setInterval(next, delay);
    }

    function stopTimer() {
        clearInterval(interval);
        interval = null;
    }

    function resetTimer() {
        stopTimer();
        startTimer();
    }

    // Пауза при наведении
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    // Старт
    update();
    startTimer();
})();


// SMOOTH SCROLLING FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// FORM SUBMISSION HANDLER
// ==========================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Show success message
    alert('Спасибо за вашу заявку, ' + name + '! Мы свяжемся с вами в ближайшее время по номеру ' + phone);
    
    // Reset form
    this.reset();
});

// ==========================================
// SCROLL ANIMATION FOR SERVICE CARDS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .feature-item').forEach(card => {
    observer.observe(card);
});
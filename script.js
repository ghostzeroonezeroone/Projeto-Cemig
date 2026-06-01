// ================================
// FUNCIONALIDADES DO SITE
// ================================

// Elementos DOM
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTop = document.querySelector('.scroll-top');

// ================================
// MENU HAMBURGER
// ================================

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Fecha o menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ================================
// SCROLL TO TOP
// ================================

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================================
// FORM SUBMISSION
// ================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simulando envio
        console.log('Formulário enviado:', {
            name,
            email,
            subject,
            message
        });
        
        // Mostra mensagem de sucesso
        alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// ================================
// NEWSLETTER FORM
// ================================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        console.log('Newsletter inscrito:', email);
        alert('Obrigado por se inscrever em nossa newsletter!');
        newsletterForm.reset();
    });
}

// ================================
// PRODUTOS - ADICIONAR AO CARRINHO
// ================================

const addToCartButtons = document.querySelectorAll('.btn-small');
addToCartButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        console.log('Preço não Identificado!', productName, productPrice);
        
        // Animação de feedback
        const originalText = btn.textContent;
        btn.textContent = '✓ Tem!';
        btn.style.background = 'var(--secondary-green)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
});

// ================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// ANIMAÇÕES AO SCROLL
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa cards de serviços
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observa cards de produtos
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observa cards de blog
document.querySelectorAll('.blog-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// ================================
// CONTADORES (Stats)
// ================================

const stats = document.querySelectorAll('.stat h4');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                const finalValue = parseInt(stat.textContent);
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(counter);
                    }
                    stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
                }, 30);
            });
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ================================
// VALIDAÇÃO DE FORMULÁRIO
// ================================

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

if (contactForm) {
    const emailInput = contactForm.querySelector('input[type="email"]');
    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#e74c3c';
        } else {
            emailInput.style.borderColor = 'var(--secondary-green)';
        }
    });
}

// ================================
// TEMA RESPONSIVO
// ================================

// Detecta preferência de tema do sistema
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Você pode adicionar aqui lógica para modo escuro se desejar
// Por enquanto mantemos o tema claro com detalhes verdes

// ================================
// RASTREAMENTO DE EVENTOS (Exemplo)
// ================================

const trackEvent = (eventName, eventData) => {
    console.log(`Event: ${eventName}`, eventData);
    // Aqui você poderia enviar dados para Google Analytics, Mixpanel, etc.
};

// Rastreia cliques em links de serviços
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('service_click', { service: link.closest('.service-card').querySelector('h3').textContent });
    });
});

// Rastreia cliques em botões de leitura do blog
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('blog_read', { article: link.closest('.blog-card').querySelector('h3').textContent });
    });
});

// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Site Agro-Sustentável carregado com sucesso!');
    
    // Inicializa tooltips ou outras funcionalidades aqui
    initializeApp();
});

const initializeApp = () => {
    // Função para inicializar a aplicação
    console.log('Aplicação inicializada');
};

// ================================
// FUNÇÕES UTILITÁRIAS
// ================================

// Função para copiar texto para a área de transferência
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copiado para a área de transferência:', text);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
};

// Função para formatar moeda
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

// Função para validar formulário
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    return isValid;
};

// ================================
// LISTENERS DE RESIZE RESPONSIVO
// ================================

window.addEventListener('resize', () => {
    // Fecha menu em resize se estava aberto
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ================================
// LAZY LOADING DE IMAGENS
// ================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// SERVICE WORKER (PWA)
// ================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('Service Worker não registrado:', err);
    });
}

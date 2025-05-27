// script.js

// 1. Menu hamburger responsive
const nav = document.querySelector('nav');
const menuBtn = document.createElement('button');
menuBtn.textContent = '☰ Menu';
menuBtn.id = 'menu-btn';
menuBtn.style.cssText = `
  font-size: 1.5rem; 
  background: none; 
  border: none; 
  cursor: pointer; 
  color: #a46b5b; 
  display: none;
  margin-bottom: 15px;
`;

nav.parentNode.insertBefore(menuBtn, nav);

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
});

// Affichage du bouton menu sur petits écrans
function handleResize() {
  if (window.innerWidth <= 600) {
    menuBtn.style.display = 'block';
    nav.style.display = nav.classList.contains('show') ? 'block' : 'none';
  } else {
    menuBtn.style.display = 'none';
    nav.style.display = 'block';
    nav.classList.remove('show');
  }
}
window.addEventListener('resize', handleResize);
handleResize();

// 2. Formulaire popup/modal contact
const contactBtn = document.querySelector('a[href^="mailto"]');
contactBtn.addEventListener('click', function(e) {
  e.preventDefault();
  showModal();
});

function showModal() {
  if(document.getElementById('modal')) return; // éviter doublons

  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.style.cssText = `
    position: fixed; top:0; left:0; width: 100vw; height: 100vh; 
    background: rgba(0,0,0,0.5); display: flex; 
    justify-content: center; align-items: center; z-index: 9999;
  `;

  modal.innerHTML = `
    <div style="background: #fff; padding: 30px; border-radius: 10px; max-width: 400px; width: 90%; box-shadow: 0 0 15px rgba(0,0,0,0.3); position: relative;">
      <button id="close-modal" style="position:absolute; top:10px; right:15px; border:none; background:none; font-size:1.5rem; cursor:pointer;">&times;</button>
      <h2>Contactez-nous</h2>
      <form id="contact-form" novalidate>
        <label for="name">Nom :</label><br/>
        <input type="text" id="name" name="name" required style="width:100%; padding:8px; margin-bottom:10px;"/>
        <label for="email">Email :</label><br/>
        <input type="email" id="email" name="email" required style="width:100%; padding:8px; margin-bottom:10px;"/>
        <label for="message">Message :</label><br/>
        <textarea id="message" name="message" required rows="4" style="width:100%; padding:8px; margin-bottom:10px;"></textarea>
        <button type="submit" style="background:#a46b5b; color:#fff; padding:10px 20px; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">Envoyer</button>
      </form>
      <p id="form-message" style="color:red; font-weight:bold;"></p>
    </div>
  `;

  document.body.appendChild(modal);

  // Fermer modal
  document.getElementById('close-modal').addEventListener('click', () => {
    modal.remove();
  });

  // Validation et envoi fictif formulaire
  document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const formMessage = document.getElementById('form-message');

    if(!name || !email || !message) {
      formMessage.textContent = "Tous les champs sont obligatoires.";
      return;
    }

    if(!validateEmail(email)) {
      formMessage.textContent = "Veuillez entrer un email valide.";
      return;
    }

    formMessage.style.color = 'green';
    formMessage.textContent = "Merci pour votre message ! Nous vous répondrons bientôt.";
    
    // Ici tu pourrais envoyer via AJAX si tu veux

    this.reset();

    setTimeout(() => {
      modal.remove();
    }, 2500);
  });
}

// Validation email simple
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// 3. Animation au scroll (fade-in)
const fadeEls = document.querySelectorAll('h1, h2, h3, p, ul, img');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  observer.observe(el);
});

// 4. Effet logo au clic
const logo = document.querySelector('img[alt="Logo Setima"]');
if(logo){
  logo.style.cursor = 'pointer';
  logo.addEventListener('click', () => {
    logo.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' }
    ], { duration: 400 });
  });
}
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('active');
});

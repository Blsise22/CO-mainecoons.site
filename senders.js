//header  

function toggleMenu() {  
    const menu = document.getElementById("mobileMenu");  
    const closeBtn = document.getElementById("closeBtn");  
    const hamburgerBtn = document.getElementById("hamburgerBtn");  

    menu.classList.toggle("show");  
    const isOpen = menu.classList.contains("show");  

    closeBtn.style.display = isOpen ? "block" : "none";  
    hamburgerBtn.style.display = isOpen ? "none" : "flex";  
}  

//header end  

const TELEGRAM_BOT_TOKEN = '7928873064:AAFM-C77NTLnycfyglY_7hbfesmjRRYHHxw';  
const TELEGRAM_CHAT_ID = '8096756104';  

const kittens = [  
  {  
    id: 'kitten1',  
    images: ['ac.jpg','a.jpg','a.jpg','a.jpg'],  
    status: 'available',  
    statusText: 'Available',  
    info: 'Sex: Female<br>Age: 3 months<br>Vaccination: Up to date<br>Litter Box Trained: Yes<br>Temperament: Friendly',  
    kittenId: 'KID001',  
    price: `$${Math.floor(Math.random() * (1200 - 700 + 1)) + 700}`  
  },  
  { id: 'kitten2', images: ['a.jpg','ac.jpg'], status: 'reserved', statusText: 'Reserved', info: 'Sex: Male<br>Age: 4 months<br>Vaccination: First dose<br>Litter Box Trained: In progress<br>Temperament: Playful', kittenId: 'KID002', price: '$850' },  
  { id: 'kitten3', images: ['https://via.placeholder.com/750x500','a.jpg'], status: 'optional', statusText: 'Optional', info: 'Sex: Female<br>Age: 2 months<br>Vaccination: Not yet<br>Litter Box Trained: No<br>Temperament: Shy', kittenId: 'KID003', price: '$600' },  
  { id: 'kitten4', images: ['a.jpg','ac.jpg'], status: 'adopted', statusText: 'Adopted', info: 'Sex: Male<br>Age: 6 months<br>Vaccination: Complete<br>Litter Box Trained: Yes<br>Temperament: Gentle', kittenId: 'KID004', price: '$0' },  
  { id: 'kitten5', images: ['ac.jpg','a.jpg'], status: 'observation', statusText: 'Under Observation', info: 'Sex: Female<br>Age: 5 weeks<br>Vaccination: Ongoing<br>Litter Box Trained: Not started<br>Temperament: Curious', kittenId: 'KID005', price: '$720' },  
  { id: 'kitten6', images: ['https://via.placeholder.com/750x500', 'https://via.placeholder.com/750x500'], status: 'available', statusText: 'Available', info: 'Sex: Male<br>Age: 3 months<br>Vaccination: Up to date<br>Litter Box Trained: Yes<br>Temperament: Friendly', kittenId: 'KID006', price: '$930' },  
  { id: 'kitten7', images: ['https://via.placeholder.com/750x500', 'https://via.placeholder.com/750x500'], status: 'available', statusText: 'Available', info: 'Sex: Female<br>Age: 4 months<br>Vaccination: First dose<br>Litter Box Trained: In progress<br>Temperament: Playful', kittenId: 'KID007', price: '$880' },  
  { id: 'kitten8', images: ['https://via.placeholder.com/750x500', 'https://via.placeholder.com/750x500'], status: 'available', statusText: 'Available', info: 'Sex: Male<br>Age: 5 months<br>Vaccination: Complete<br>Litter Box Trained: Yes<br>Temperament: Gentle', kittenId: 'KID008', price: '$950' },  
  { id: 'kitten9', images: ['a.jpg','ac.jpg'], status: 'adopted', statusText: 'Adopted', info: 'Sex: Male<br>Age: 6 months<br>Vaccination: Complete<br>Litter Box Trained: Yes<br>Temperament: Gentle', kittenId: 'KID009', price: '$0' }  
];  

const container = document.getElementById('kittens-container');  
const state = {};  
const intervals = {};  

function renderKittens(filter = 'all') {  
  container.innerHTML = '';  
  kittens.forEach(k => {  
    if (filter !== 'all' && k.status !== filter) return;  
 
 //remove order here under kittes status here
 
    let showInfo = k.status !== 'reserved' && k.status !== 'adopted' && k.status !== 'observation';
    
    
    const html = `  
      <div class="container fade-in-slide" id="${k.id}" data-status="${k.status}">  
        <div class="slider fade-in-slide">  
          <div class="slides"  
               onmouseenter="pauseSlider('${k.id}')"  
               onmouseleave="resumeSlider('${k.id}')">  
            ${k.images.map(src => `<div class="slide"><img src="${src}" alt="${k.id} image"/></div>`).join('')}  
          </div>  
          <button class="nav-button prev" onclick="showSlide('${k.id}', -1)">❮</button>  
          <button class="nav-button next" onclick="showSlide('${k.id}', 1)">❯</button>  
        </div>  
        <div class="status ${k.status} fade-in-slide">Kitten Status: ${k.statusText}</div>  
        ${showInfo ? `<div class="kitten-info fade-in-slide">  
          <h3>Kitten Details</h3>  
          <p>${k.info}</p>  
          ${k.price ? `<p style="color: green; font-weight: bold;">Price: ${k.price}</p>` : ''}  
        </div>` : ''}  
        ${showInfo ? `<div class="button-container fade-in-slide">  
          <div class="button" onclick="openModal('${k.statusText}', \`${k.info}\`, '${k.kittenId}')">ORDER HERE!</div>  
        </div>` : ''}  
      </div>  
    `;  
    container.innerHTML += html;  
  });  

  animateKittens();  

  kittens.forEach(k => {  
    if (filter !== 'all' && k.status !== filter) return;  
    state[k.id] = 0;  
    startSlider(k.id);  
  });  
}  

function animateKittens() {  
  const fadeEls = document.querySelectorAll('.fade-in-slide');  
  const observer = new IntersectionObserver(entries => {  
    entries.forEach(e => {  
      if (e.isIntersecting) {  
        e.target.classList.add('visible');  
      } else {  
        e.target.classList.remove('visible');  
      }  
    });  
  }, { threshold: 0.5 });  
  fadeEls.forEach(el => observer.observe(el));  
}  

function filterKittens(status) {  
  document.querySelectorAll('.filter-button')  
    .forEach(btn => btn.classList.remove('active'));  
  const btn = [...document.querySelectorAll('.filter-button')].find(b => b.innerText.toLowerCase() === status.toLowerCase() || status === 'all' && b.innerText === 'All');  
  if (btn) btn.classList.add('active');  
  renderKittens(status);  
}  

function showSlide(cardId, dir) {  
  const card = document.getElementById(cardId);  
  if (!card) return;  
  const slides = card.querySelector('.slides');  
  if (!slides) return;  

  const total = slides.children.length;  
  state[cardId] = (state[cardId] + dir + total) % total;  
  slides.style.transform = `translateX(-${state[cardId] * 100}%)`;  
}  

function startSlider(cardId) {  
  clearInterval(intervals[cardId]);  
  intervals[cardId] = setInterval(() => showSlide(cardId, 1), 4000);  
}  

function pauseSlider(cardId) {  
  clearInterval(intervals[cardId]);  
}  

function resumeSlider(cardId) {  
  startSlider(cardId);  
}  

function openModal(title, desc, kittenId) {  
  document.getElementById('modalTitle').innerText = title;  
  document.getElementById('modalDescription').innerHTML = desc;  
  document.getElementById('kittenId').value = kittenId;  
  document.getElementById('myModal').style.display = 'block';  
}  

function closeModal() {  
  document.getElementById('myModal').style.display = 'none';  
}  

window.onclick = e => {  
  if (e.target === document.getElementById('myModal')) closeModal();  
};  

document.getElementById('orderForm').onsubmit = async e => {  
  e.preventDefault();  

  const formData = Array.from(e.target.querySelectorAll('input, textarea')).map(el => el.value.trim());  
  const [name, address, whatsapp, email, country, stateField, reason] = formData;  
  const kittenId = document.getElementById('kittenId').value;  

  const message = `  
🐾 *New Kitten Order Request* 🐾  

*Kitten ID:* ${kittenId}  
*Name:* ${name}  
*Address:* ${address}  
*WhatsApp:* ${whatsapp}  
*Email:* ${email}  
*Country:* ${country}  
*State:* ${stateField}  
*Reason:* ${reason}  
`.trim();  

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;  

  try {  
    const response = await fetch(url);  
    if (response.ok) {  
      alert('Your adoption request has been sent successfully!.<br> we will contact you via Email & Whatsapp.');  
      e.target.reset();  
      closeModal();  
    } else {  
      alert('Failed to send request. Please try again.');  
    }  
  } catch (error) {  
    console.error('Telegram Error:', error);  
    alert('An error occurred. Please try again.');  
  }  
};  

window.addEventListener('scroll', animateKittens);  

// Initial render  
renderKittens('all');
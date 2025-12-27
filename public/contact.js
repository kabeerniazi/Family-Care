document.addEventListener('DOMContentLoaded', function() {
  const imgs = document.querySelectorAll('img.lazy, img[data-src]');
  const opts = { root: null, rootMargin: '120px', threshold: 0.05 };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { 
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.onload = () => { img.style.opacity = '1'; };
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, opts);
    imgs.forEach(i => io.observe(i));
  } else {
    imgs.forEach(img => {
      const src = img.getAttribute('data-src');
      if (src) img.src = src;
      img.style.opacity = 1;
    });
  }
});

(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;

  function setError(el, msg){
    const err = el.parentElement.querySelector('.error');
    if (err) err.textContent = msg;
    el.classList.add('invalid');
  }
  function clearError(el){
    const err = el.parentElement.querySelector('.error');
    if (err) err.textContent = '';
    el.classList.remove('invalid');
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const message = document.getElementById('message');

    if (!name.value.trim() || name.value.trim().length < 2) {
      setError(name, 'Enter full name');
      valid = false;
    } else clearError(name);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
      setError(email, 'Enter valid email');
      valid = false;
    } else clearError(email);

    const digits = phone.value.replace(/\D/g,'');
    if (!digits || digits.length < 9) {
      setError(phone, 'Enter valid contact number');
      valid = false;
    } else clearError(phone);

    if (!service.value.trim()) {
      setError(service, 'Enter type of service');
      valid = false;
    } else clearError(service);

    if (!message.value.trim() || message.value.trim().length < 6) {
      setError(message, 'Please describe your issue');
      valid = false;
    } else clearError(message);

    if (!valid) {
      const first = form.querySelector('.invalid');
      if (first) first.focus();
      return;
    }

    const formData = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.replace(/\D/g,''),
        service: service.value.trim(),
        message: message.value.trim()
    };

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Appointment requested successfully!');
            form.reset();
        } else {
            alert('Failed to book appointment.');
        }
    } catch (err) {
        alert('Server error.');
    }
    form.reset();
  });
})();
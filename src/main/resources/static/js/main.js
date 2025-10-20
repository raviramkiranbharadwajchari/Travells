// Main JS for Travel Explorer
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  navToggle && navToggle.addEventListener('click', () => {
    if (navMenu.style.display === 'flex') {
      navMenu.style.display = '';
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
    }
  });

  // Dropdown click toggle for mobile
  document.querySelectorAll('.dropdown > a').forEach(a => {
    a.addEventListener('click', (e) => {
      const width = window.innerWidth;
      if (width <= 900) {
        e.preventDefault();
        const parent = a.parentElement;
        const content = parent.querySelector('.dropdown-content');
        content.style.display = content.style.display === 'block' ? '' : 'block';
      }
    });
  });

  // Visit [Country] auto-change animation
  const countries = ['USA','India','France','Germany'];
  let idx = 0;
  const countryEl = document.getElementById('country');
  if (countryEl) {
    setInterval(() => {
      idx = (idx + 1) % countries.length;
      // simple fade-out/fade-in
      countryEl.style.opacity = 0;
      setTimeout(() => {
        countryEl.textContent = countries[idx];
        countryEl.style.opacity = 1;
      }, 300);
    }, 2200);
  }

  // Booking form validation
  const bookingForm = document.getElementById('booking-form');
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');
  const persons = document.getElementById('persons');
  const desc = document.getElementById('description');
  const whereTo = document.getElementById('whereTo');

  function setDateMins() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth()+1).padStart(2,'0');
    const dd = String(today.getDate()).padStart(2,'0');
    const min = `${yyyy}-${mm}-${dd}`;
    if (startDate) startDate.setAttribute('min', min);
  }
  setDateMins();

  if (startDate) startDate.addEventListener('change', () => {
    if (startDate.value) {
      endDate.setAttribute('min', startDate.value);
      if (endDate.value && endDate.value <= startDate.value) endDate.value = '';
    }
  });

  bookingForm && bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const errors = [];
    const todayStr = new Date().toISOString().split('T')[0];
    if (!whereTo.value) errors.push('Please select destination.');
    if (!persons.value || Number(persons.value) < 1) errors.push('Enter valid number of persons.');
    if (!startDate.value) errors.push('Start date is required.');
    else if (startDate.value < todayStr) errors.push('Start date cannot be in the past.');
    if (!endDate.value) errors.push('End date is required.');
    else if (startDate.value && endDate.value <= startDate.value) errors.push('End date must be after start date.');
    if (!desc.value || desc.value.length < 50) errors.push('Description must be at least 50 characters.');
    if (desc.value && desc.value.length > 500) errors.push('Description must be less than 500 characters.');

    if (errors.length) {
      alert('Please fix the following:\n' + errors.join('\n'));
      return;
    }

    // success: show booking summary
    const summary = `Booking confirmed!\nDestination: ${whereTo.value}\nPersons: ${persons.value}\nFrom: ${startDate.value}\nTo: ${endDate.value}`;
    alert(summary);
    bookingForm.reset();
  });

  // Simple client-side validations for login/register pages (delegated)
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('[name="email"]').value;
      const pwd = loginForm.querySelector('[name="password"]').value;
      if (!email || !pwd) return alert('Enter email and password.');
      alert('Login simulated.');
      loginForm.reset();
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = registerForm.querySelector('[name="fullname"]').value.trim();
      const contact = registerForm.querySelector('[name="contact"]').value.trim();
      const dob = registerForm.querySelector('[name="dob"]').value;
      const email = registerForm.querySelector('[name="email"]').value.trim();
      const password = registerForm.querySelector('[name="password"]').value;
      const gender = registerForm.querySelector('[name="gender"]').value;
      const today = new Date().toISOString().split('T')[0];

      if (!name || !contact || !dob || !email || !password) {
        return alert('Please fill all required fields.');
      }
      if (dob > today) return alert('DOB cannot be in the future.');
      if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Enter a valid email.');
      if (password.length < 6) return alert('Password must be at least 6 characters.');

      alert('Registration successful (simulated). Please login.');
      registerForm.reset();
      window.location.href = '/login.html';
    });
  }
});


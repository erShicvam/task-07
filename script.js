const API_URL = 'https://jsonplaceholder.typicode.com/users';
const container = document.getElementById('user-container');
const errorBox = document.getElementById('error-message');
const reloadBtn = document.getElementById('reload-btn');

async function loadUsers() {
  container.innerHTML = '';
  errorBox.textContent = '';

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    data.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>City:</strong> ${user.address.city}</p>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    errorBox.textContent = '⚠️ Could not load user data. Check your connection and try again.';
    console.error('Fetch error:', err.message);
  }
}

reloadBtn.addEventListener('click', loadUsers);
window.addEventListener('DOMContentLoaded', loadUsers);

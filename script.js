function search() {
    const query = document.getElementById('search').value.toLowerCase();
    const articles = document.querySelectorAll('#articles li');
    articles.forEach(article => {
        const text = article.textContent.toLowerCase();
        if (text.includes(query)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

// Account management
let currentUser = null;

function init() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        showUserInfo();
    }
}

function showUserInfo() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('userInfo').style.display = 'inline';
    document.getElementById('username').textContent = currentUser.username;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    document.getElementById('auth').style.display = 'block';
    document.getElementById('userInfo').style.display = 'none';
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event listeners
document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));
document.getElementById('signupBtn').addEventListener('click', () => openModal('signupModal'));
document.getElementById('profileBtn').addEventListener('click', () => openProfileModal());
document.getElementById('chatBtn').addEventListener('click', () => openChatModal());

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showUserInfo();
        closeModal('loginModal');
        alert('Login successful!');
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const email = document.getElementById('signupEmail').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
        alert('Username already exists');
        return;
    }
    
    const newUser = { username, password, email, bio: '' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showUserInfo();
    closeModal('signupModal');
    alert('Account created successfully!');
});

document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('profileEmail').value;
    const bio = document.getElementById('profileBio').value;
    
    currentUser.email = email;
    currentUser.bio = bio || '';
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Profile updated!');
    closeModal('profileModal');
});

document.getElementById('chatForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('chatInput').value;
    const timestamp = new Date().toLocaleString();
    
    const chatMessage = {
        username: currentUser.username,
        message: message,
        timestamp: timestamp
    };
    
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    messages.push(chatMessage);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    
    displayMessages();
    document.getElementById('chatInput').value = '';
});

function openProfileModal() {
    document.getElementById('profileUsername').value = currentUser.username;
    document.getElementById('profileEmail').value = currentUser.email || '';
    document.getElementById('profileBio').value = currentUser.bio || '';
    openModal('profileModal');
}

function openChatModal() {
    displayMessages();
    openModal('chatModal');
}

function displayMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const chatMessagesDiv = document.getElementById('chatMessages');
    chatMessagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = `<strong>${msg.username}</strong> [${msg.timestamp}]: ${msg.message}`;
        chatMessagesDiv.appendChild(msgDiv);
    });
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

init();
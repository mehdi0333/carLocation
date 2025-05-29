// Data
const contacts = [
    {
        id: 1,
        name: "malik",
        lastMessage: "Bonjour, est-ce que la voiture est disponible ce weekend ?",
        time: "14:30",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        unread: 2,
        status: "En ligne"
    },
    {
        id: 2,
        name: "Marlene lepene",
        lastMessage: "Merci pour la location, tout s'est bien passé.",
        time: "Hier",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 3,
        name: "jean hmida",
        lastMessage: "À quelle heure puis-je récupérer les clés ?",
        time: "Lun",
        avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
        id: 4,
        name: "Sarah louache",
        lastMessage: "Je serai un peu en retard, environ 15 minutes.",
        time: "27/04",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        id: 5,
        name: "bilal",
        lastMessage: "Est-ce que le plein d'essence est fait ?",
        time: "25/04",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    }
];

const conversations = {
    1: [
        {
            id: 1,
            sender: "Malik",
            content: "Bonjour, est-ce que la voiture est disponible ce weekend ?",
            time: "14:30",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 2,
            sender: "You",
            content: "Bonjour malik ! Oui, la voiture est disponible. Quelles dates vous intéressent exactement ?",
            time: "14:32",
            isCurrentUser: true,
            avatar: "https://randomuser.me/api/portraits/men/41.jpg"
        },
        {
            id: 3,
            sender: "Malik",
            content: "Je voudrais la louer du vendredi 18h au dimanche 20h.",
            time: "14:35",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 4,
            sender: "Malik",
            content: "Est-ce que c'est possible ?",
            time: "14:35",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 5,
            sender: "You",
            content: "Oui, ces dates sont disponibles. Le tarif serait de 16000 DA pour tout le weekend, assurance incluse.",
            time: "14:40",
            isCurrentUser: true,
            avatar: "https://randomuser.me/api/portraits/men/41.jpg"
        },
        {
            id: 6,
            sender: "Malik",
            content: "Parfait ! Je vais faire la réservation tout de suite alors.",
            time: "14:42",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 7,
            sender: "You",
            content: "Super ! N'hésitez pas si vous avez d'autres questions.",
            time: "14:45",
            isCurrentUser: true,
            avatar: "https://randomuser.me/api/portraits/men/41.jpg"
        }
    ],
    2: [
        {
            id: 1,
            sender: "Marlene lepene",
            content: "Bonjour, je voulais vous remercier pour la location.",
            time: "Hier",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            sender: "You",
            content: "Bonjour Marlene ! Je vous en prie, tout s'est bien passé de votre côté ?",
            time: "Hier",
            isCurrentUser: true,
            avatar: "https://randomuser.me/api/portraits/men/41.jpg"
        },
        {
            id: 3,
            sender: "Marlene lepene",
            content: "Merci pour la location, tout s'est bien passé.",
            time: "Hier",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        }
    ],
    3: [
        {
            id: 1,
            sender: "jean hmida",
            content: "Bonjour, j'ai réservé votre voiture pour demain.",
            time: "Lun",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        {
            id: 2,
            sender: "You",
            content: "Bonjour Jean ! Oui, je vois votre réservation.",
            time: "Lun",
            isCurrentUser: true,
            avatar: "https://randomuser.me/api/portraits/men/41.jpg"
        },
        {
            id: 3,
            sender: "jean hmida",
            content: "À quelle heure puis-je récupérer les clés ?",
            time: "Lun",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/men/46.jpg"
        }
    ],
    4: [
        {
            id: 1,
            sender: "Sarah louache",
            content: "Bonjour, je suis en route pour récupérer la voiture.",
            time: "27/04",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        {
            id: 2,
            sender: "Sarah louache",
            content: "Je serai un peu en retard, environ 15 minutes.",
            time: "27/04",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/women/65.jpg"
        }
    ],
    5: [
        {
            id: 1,
            sender: "bilal",
            content: "Bonjour, j'ai une question concernant la voiture.",
            time: "25/04",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        },
        {
            id: 2,
            sender: "bilal",
            content: "Est-ce que le plein d'essence est fait ?",
            time: "25/04",
            isCurrentUser: false,
            avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        }
    ]
};

// DOM Elements
const contactsList = document.getElementById('contacts-list');
const chatHeader = document.getElementById('chat-header');
const messagesContainer = document.getElementById('messages-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Current active contact
let activeContactId = 1;

// Initialize the chat interface
function initChat() {
    renderContacts();
    setActiveContact(activeContactId);
    
    // Event listeners
    messageForm.addEventListener('submit', handleSendMessage);
}

// Render the contacts list
function renderContacts() {
    contactsList.innerHTML = '';
    
    contacts.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = `contact-item ${contact.id === activeContactId ? 'active' : ''}`;
        contactElement.dataset.id = contact.id;
        
        contactElement.innerHTML = `
            <img src="${contact.avatar}" alt="${contact.name}" class="contact-avatar">
            <div class="contact-info">
                <div class="contact-header">
                    <span class="contact-name">${contact.name}</span>
                    <span class="contact-time">${contact.time}</span>
                </div>
                <p class="contact-message">${contact.lastMessage}</p>
            </div>
            ${contact.unread ? `<div class="unread-badge">${contact.unread}</div>` : ''}
        `;
        
        contactElement.addEventListener('click', () => {
            setActiveContact(contact.id);
        });
        
        contactsList.appendChild(contactElement);
    });
}

// Set the active contact and render the conversation
function setActiveContact(contactId) {
    activeContactId = contactId;
    
    // Update active state in contacts list
    document.querySelectorAll('.contact-item').forEach(item => {
        if (parseInt(item.dataset.id) === contactId) {
            item.classList.add('active');
            // Remove unread badge
            const badge = item.querySelector('.unread-badge');
            if (badge) {
                badge.remove();
            }
        } else {
            item.classList.remove('active');
        }
    });
    
    // Find the contact
    const contact = contacts.find(c => c.id === contactId);
    
    // Update chat header
    renderChatHeader(contact);
    
    // Render messages
    renderMessages(contactId);
    
    // Scroll to bottom of messages
    scrollToBottom();
}

// Render the chat header
function renderChatHeader(contact) {
    chatHeader.innerHTML = `
        <div class="chat-header-left">
            <img src="${contact.avatar}" alt="${contact.name}" class="chat-header-avatar">
            <div class="chat-header-info">
                <h3>${contact.name}</h3>
                ${contact.status ? `<p class="chat-header-status">${contact.status}</p>` : ''}
            </div>
        </div>
        <div class="chat-header-actions">
            <button class="btn-icon"><i class="fas fa-phone"></i></button>
            <button class="btn-icon"><i class="fas fa-video"></i></button>
            <button class="btn-icon"><i class="fas fa-info-circle"></i></button>
        </div>
    `;
}

// Render messages for a conversation
function renderMessages(contactId) {
    messagesContainer.innerHTML = '';
    
    const messages = conversations[contactId] || [];
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.isCurrentUser ? 'outgoing' : 'incoming'}`;
        
        if (!message.isCurrentUser) {
            messageElement.innerHTML = `
                <img src="${message.avatar}" alt="${message.sender}" class="message-avatar">
                <div class="message-content">
                    <div class="message-bubble">${message.content}</div>
                    <span class="message-time">${message.time}</span>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">${message.content}</div>
                    <span class="message-time">${message.time}</span>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageElement);
    });
}

// Handle sending a message
function handleSendMessage(e) {
    e.preventDefault();
    
    const content = messageInput.value.trim();
    if (!content) return;
    
    // Create new message
    const newMessage = {
        id: Date.now(),
        sender: "You",
        content: content,
        time: getCurrentTime(),
        isCurrentUser: true,
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
    };
    
    // Add to conversation
    if (!conversations[activeContactId]) {
        conversations[activeContactId] = [];
    }
    conversations[activeContactId].push(newMessage);
    
    // Update last message for contact
    const contactIndex = contacts.findIndex(c => c.id === activeContactId);
    if (contactIndex !== -1) {
        contacts[contactIndex].lastMessage = content;
        contacts[contactIndex].time = getCurrentTime();
    }
    
    // Clear input
    messageInput.value = '';
    
    // Render updated conversation
    renderMessages(activeContactId);
    renderContacts();
    
    // Scroll to bottom
    scrollToBottom();
    
    // Simulate response for Malik
    if (activeContactId === 1) {
        setTimeout(() => {
            const responseMessage = {
                id: Date.now() + 1,
                sender: "Malik",
                content: "Merci pour votre réponse rapide !",
                time: getCurrentTime(),
                isCurrentUser: false,
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            };
            
            conversations[activeContactId].push(responseMessage);
            renderMessages(activeContactId);
            scrollToBottom();
            
            // Update last message for contact
            contacts[0].lastMessage = responseMessage.content;
            contacts[0].time = responseMessage.time;
            renderContacts();
        }, 1000 + Math.random() * 2000);
    }
}

// Get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
}

// Scroll to bottom of messages container
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialize the chat when the DOM is loaded
document.addEventListener('DOMContentLoaded', initChat);
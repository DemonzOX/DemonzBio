// Background particles animation
const canvas = document.getElementById('particles-js');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

const colors = ['#ffffff']; // Light white color

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 6000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * (innerWidth - size * 2)) + size;
        let y = (Math.random() * (innerHeight - size * 2)) + size;
        let directionX = (Math.random() * 4) - 2;
        let directionY = (Math.random() * 4) - 2;
        let color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();

// Visitor count and like button functionality
let visitorCount = localStorage.getItem('visitorCount') || 0;
let likeCount = localStorage.getItem('likeCount') || 0;
let hasLiked = localStorage.getItem('hasLiked') === 'true';

document.getElementById('visitor-count').textContent = visitorCount;
document.getElementById('like-count').textContent = likeCount;

visitorCount++;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById('visitor-count').textContent = visitorCount;

document.getElementById('like-button').addEventListener('click', function() {
    if (!hasLiked) {
        likeCount++;
        localStorage.setItem('likeCount', likeCount);
        localStorage.setItem('hasLiked', 'true');
        document.getElementById('like-count').textContent = likeCount;
        hasLiked = true;
    }
});

// Theme changer functionality
const themeButton = document.getElementById('theme-button');
const themeIcon = document.getElementById('theme-icon');
const themeOptions = document.querySelector('.theme-options');
const dayTheme = document.getElementById('day-theme');
const darkTheme = document.getElementById('dark-theme');

const setTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('day-theme');
        themeIcon.src = '../Images/Moon.png';
    } else {
        document.body.classList.add('day-theme');
        document.body.classList.remove('dark-theme');
        themeIcon.src = '../Images/Sun.png';
    }
    localStorage.setItem('theme', theme);
};

themeButton.addEventListener('click', () => {
    themeOptions.style.display = themeOptions.style.display === 'flex' ? 'none' : 'flex';
});

dayTheme.addEventListener('click', () => {
    setTheme('day');
    themeOptions.style.display = 'none';
});

darkTheme.addEventListener('click', () => {
    setTheme('dark');
    themeOptions.style.display = 'none';
});

// Set the initial theme
document.addEventListener("DOMContentLoaded", function() {
    const savedTheme = localStorage.getItem('theme') || 'day';
    setTheme(savedTheme);
});

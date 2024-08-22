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
let hasLiked = localStorage.getItem('hasLiked') || false;

document.getElementById('visitor-count').textContent = visitorCount;
document.getElementById('like-count').textContent = likeCount;

visitorCount++;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById('visitor-count').textContent = visitorCount;

document.getElementById('like-button').addEventListener('click', () => {
    if (!hasLiked) {
        likeCount++;
        localStorage.setItem('likeCount', likeCount);
        document.getElementById('like-count').textContent = likeCount;
        localStorage.setItem('hasLiked', true);
    }
});

// Theme toggling logic
document.getElementById('theme-button').addEventListener('click', () => {
    const themeOptions = document.querySelector('.theme-options');
    themeOptions.classList.toggle('visible');
});

document.getElementById('day-theme').addEventListener('click', () => {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    document.getElementById('theme-icon').src = '../Images/Moon.png';
    document.querySelector('.container').style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
});

document.getElementById('dark-theme').addEventListener('click', () => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
    document.getElementById('theme-icon').src = '../Images/Sun.png';
    document.querySelector('.container').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
});

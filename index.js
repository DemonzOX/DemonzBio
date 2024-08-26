document.addEventListener('DOMContentLoaded', () => {
    const themeIcon = document.getElementById('theme-icon');
    const themeButton = document.getElementById('theme-button');
    const themeOptions = document.querySelector('.theme-options');
    const storedTheme = localStorage.getItem('theme') || 'day';

    const setParticleColors = (theme) => {
        const colors = theme === 'dark' ? ['#ffffff'] : ['#000000']; // White for dark, black for day

        // Assuming particles.js is set up and particlesArray is accessible
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": colors
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#000000",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    };

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
        setParticleColors(theme); // Update particle colors
    };

    // Initialize the theme on page load
    setTheme(storedTheme);

    // Handle theme button click
    themeButton.addEventListener('click', () => {
        themeOptions.style.display = themeOptions.style.display === 'none' ? 'flex' : 'none';
    });

    // Handle theme option selection
    themeOptions.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            const selectedTheme = e.target.getAttribute('data-theme');
            setTheme(selectedTheme);
            themeOptions.style.display = 'none'; // Close the theme options
        }
    });

    // Hide theme options when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!themeButton.contains(e.target) && !themeOptions.contains(e.target)) {
            themeOptions.style.display = 'none';
        }
    });
});

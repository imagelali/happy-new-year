window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var particles = [];

    function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1;
        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * 6 - 3;
        this.alpha = 1;
        this.decay = Math.random() * 0.03 + 0.01;
    }

    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(' + this.color + ', ' + this.alpha + ')';
        ctx.fill();
    };

    function createFirework(x, y) {
        var colors = ['255, 0, 0', '0, 255, 0', '0, 0, 255', '255, 255, 0', '255, 0, 255', '0, 255, 255'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        for (var i = 0; i < 100; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = particles.length - 1; i >= 0; i--) {
            var particle = particles[i];
            particle.update();
            particle.draw();
            if (particle.alpha <= 0) {
                particles.splice(i, 1);
            }
        }
        requestAnimFrame(animate);
    }

    
    createFirework(canvas.width / 2, canvas.height / 2);

    
    setInterval(function () {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        createFirework(x, y);
    }, 100);

    animate();
});

  
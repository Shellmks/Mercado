function mostrarPremio() {
    document.getElementById("telaInicial").classList.add("hidden");
    document.getElementById("telaPremio").classList.remove("hidden");
    iniciarConfetti();
}

function iniciarConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetes = [];

    for (let i = 0; i < 150; i++) {
        confetes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 100,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.floor(Math.random() * 10) - 10
        });
    }

    function desenhar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetes.forEach(c => {
            ctx.beginPath();
            ctx.fillStyle = c.color;
            ctx.fillRect(c.x, c.y, c.r, c.r);
        });

        atualizar();
    }

    function atualizar() {
        confetes.forEach(c => {
            c.y += Math.cos(c.d) + 2;
            c.x += Math.sin(c.d);

            if (c.y > canvas.height) {
                c.y = 0;
                c.x = Math.random() * canvas.width;
            }
        });
    }

    setInterval(desenhar, 20);
}
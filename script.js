function seleccionar(eleccion) {
    limpiarEstados();
    document.getElementById('e_' + eleccion).classList.add('activo-jugador');
    
    // Mostrar la selección del jugador
    document.getElementById('jugador-eleccion').innerHTML = `<i class="fas fa-hand-${eleccion}"></i> ${eleccion}`;

    let opciones = ['piedra', 'papel', 'tijera'];
    let maquina = opciones[Math.floor(Math.random() * 3)];

    setTimeout(() => {
        document.getElementById('e_' + maquina).classList.add('activo-maquina');
        
        // Mostrar la selección de la máquina
        document.getElementById('maquina-eleccion').innerHTML = `<i class="fas fa-hand-${maquina}"></i> ${maquina}`;

        let resultado = determinarGanador(eleccion, maquina);
        document.getElementById('e_' + resultado).classList.add('activo-jugador');
        document.getElementById('resultado').innerText = `Máquina eligió ${maquina}. Resultado: ${resultado.replace('_', ' ')}`;

        // Lanzar confeti si el jugador gana
        if (resultado === 'gana_jugador') {
            lanzarConfeti();
        }
    }, 1000);
}

function determinarGanador(jugador, maquina) {
    if (jugador === maquina) return 'empate';
    if (
        (jugador === 'piedra' && maquina === 'tijera') ||
        (jugador === 'papel' && maquina === 'piedra') ||
        (jugador === 'tijera' && maquina === 'papel')
    ) {
        return 'gana_jugador';
    }
    return 'gana_maquina';
}

function limpiarEstados() {
    document.querySelectorAll('.estado').forEach(e => {
        e.classList.remove('activo-jugador', 'activo-maquina');
    });
}

function lanzarConfeti() {
    confetti({
        particleCount: 100, // Número de partículas de confeti
        spread: 70, // Ángulo de dispersión
        origin: { y: 0.6 } // Origen del confeti (0.6 = 60% desde la parte superior)
    });
}
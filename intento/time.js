class Tiempo {
    constructor(juego) {
        this.juego = juego;

        // Crear el contenedor para el contador
        this.container = new PIXI.Container();

        // Crear el estilo del texto
        this.texto = new PIXI.Text('00:30', {
            fontFamily: 'Arial',
            fontSize: 26,
            fill: 'white', // Color del texto
            align: 'center',
            stroke: 'black', // Color del reborde
            strokeThickness: 4 // Grosor del reborde
        });

        // Posicionar el texto manualmente
        this.texto.anchor.set(0.5, 0.5); // Ajustar anclaje para centrar
        this.texto.x = 0; // Centrado dentro del contenedor
        this.texto.y = 0; // Centrado dentro del contenedor
        this.container.addChild(this.texto);

        // Posicionar el contenedor en el centro superior
        this.container.x = this.juego.app.renderer.width / 2;
        this.container.y = 50;

        this.container.zIndex = 100;
        this.juego.app.stage.sortableChildren = true;

        // Inicializar variables del contador
        this.tiempoRestante = 30; // En segundos
        this.intervalo = null;

        // Añadir el contenedor al stage
        this.juego.app.stage.addChild(this.container);

        // Iniciar el contador inicialmente
        this.iniciarContador();
    }

    iniciarContador() {
        this.intervalo = setInterval(() => {
            // Si el tiempo es 0, cambiar color y esperar 2 segundos
            if (this.tiempoRestante === 0) {
                this.juego.contadorDeTiburones.finalizarRonda()
                this.texto.style.fill = 'red';

                // Detener el contador temporalmente
                clearInterval(this.intervalo);

                // Pausa de 2 segundos
                setTimeout(() => {
                    // Después de 2 segundos, reiniciar el contador
                    this.tiempoRestante = 30;
                    this.texto.style.fill = 'white';
                    this.iniciarContador(); // Reiniciar el contador
                }, 2000);
            } else {
                this.juego.contadorDeTiburones.modificarRonda(true)
                // Actualizar el tiempo
                this.tiempoRestante--;

                // Actualizar el texto del contador
                const minutos = Math.floor(this.tiempoRestante / 60).toString().padStart(2, '0');
                const segundos = (this.tiempoRestante % 60).toString().padStart(2, '0');
                this.texto.text = `${minutos}:${segundos}`;
            }
        }, 1000); // Actualizar cada segundo
    }

    // Método de actualización que actualiza la posición y el texto
    update() {
        // Asegurarse de que el contenedor se haya inicializado
        if (!this.container) {
            console.error("El contenedor no está inicializado.");
            return;
        }

        // Calcular el centro del juego
        const centro = this.juego.calcularCentro();

        // Actualizar la posición del contenedor
        this.container.x = centro.x - (this.juego.app.renderer.width / 2) + 700;
        this.container.y = centro.y - (this.juego.app.renderer.height / 2) + 40;

        // Calcular el ancho del texto y ajustar su posición
        const textoAncho = this.texto.width;
        this.texto.x = (this.container.width - textoAncho) / 2;
    }

    destruir() {
        // Limpiar el intervalo y eliminar el contenedor del escenario
        if (this.intervalo) {
            clearInterval(this.intervalo);
        }
        this.juego.app.stage.removeChild(this.container);
    }
}

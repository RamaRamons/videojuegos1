class BarraVida {
    constructor(juego, maximo, listaObjetos) {
        this.juego = juego;
        this.maximo = maximo;
        this.listaObjetos = listaObjetos;

        // Crear el contenedor para la barra de vida
        this.container = new PIXI.Container();
        console.log('Contenedor creado:', this.container);

        // Crear la barra de fondo (gris)
        this.fondo = new PIXI.Graphics();
        this.fondo.beginFill(0x333333); // Gris oscuro
        this.fondo.drawRect(0, 0, 300, 35); // Ancho y alto de la barra
        this.fondo.endFill();

        // Crear la barra de vida (verde)
        this.vida = new PIXI.Graphics();
        this.vida.beginFill(0x00ff00); // Verde
        this.vida.drawRect(0, 0, 300, 35); // Ancho y alto de la barra
        this.vida.endFill();

        // Crear el texto de la vida
        this.textoVida = new PIXI.Text('', { fontSize: 16, fill: 0xffffff, align: 'center' });
        this.textoVida.x = 150; // Posicionar el texto en el centro de la barra de vida
        this.textoVida.y = 7;   // Ajustar la posición vertical para que quede centrado en la barra

        // Añadir los gráficos al contenedor
        this.container.addChild(this.fondo);
        this.container.addChild(this.vida);
        this.container.addChild(this.textoVida);

        // Añadir el contenedor al escenario
        this.juego.app.stage.addChild(this.container);
        console.log('Contenedor agregado al stage:', this.container);

        this.imagenDecorativa = new PIXI.Sprite.from('sprites/barradevida/BarraDeVida.png');  // Ruta de la imagen
        this.container.addChild(this.imagenDecorativa);
        this.imagenDecorativa.scale.x = 0.6;
        this.imagenDecorativa.scale.y = 0.51;

        this.imagenDecorativa.x = -10
        this.imagenDecorativa.y = -10
        
        this.container.x = 20; // Desplazamiento horizontal
        this.container.y = 20; // Desplazamiento vertical
    }

    actualizarVida() {
        if (!this.vida) {
            console.error("La barra de vida no está definida.");
            return;
        }

        const vidaActual = this.listaObjetos.length;
        const vidaPorcentaje = vidaActual / this.maximo; // Relación entre lo que hay y el máximo

        this.vida.clear();
        this.vida.beginFill(0x00ff00); // Verde
        this.vida.drawRect(0, 0, 300 * vidaPorcentaje, 35); // Tamaño proporcional a la vida actual
        this.vida.endFill();

        this.textoVida.text = `${vidaActual} / ${this.maximo}`; // Muestra la vida actual y el máximo
    }

    update() {
        if (!this.vida) {
            console.error("La barra de vida no está inicializada.");
            return;
        }

        this.actualizarVida();

        const centro = this.juego.calcularCentro(); // Esto debe devolverte la posición de la cámara, como el centro de la vista


        this.container.x = centro.x - (this.juego.app.renderer.width / 2) + 20;  // Ajuste proporcional con respecto a la cámara
        this.container.y = centro.y - (this.juego.app.renderer.height / 2) + 20;  // Ajuste proporcional con respecto a la cámara

        const vidaAncho = this.fondo.width; // Ancho actual de la barra de vida (dependiendo de la vida)
        const textoAncho = this.textoVida.width; // Ancho del texto

        

        this.textoVida.x = (vidaAncho - textoAncho) / 2; // Centrar el texto dentro de la barra

    }
}
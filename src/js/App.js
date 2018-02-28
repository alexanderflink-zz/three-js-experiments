import {Scene, PerspectiveCamera, WebGLRenderer} from "three";
// import EffectComposer from "three/examples/js/postprocessing/EffectComposer.js";
import {TweenMax} from "gsap";
import Mandala from "./Mandala/Mandala.js";
import utils from "./utils.js";


class App {
	constructor() {

		// set up scene
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new WebGLRenderer({antialias: true, canvas: document.getElementById("three-canvas")});
		this.renderer.setSize(window.innerWidth, window.innerHeight);


		let mandala = new Mandala();
		this.scene.add(mandala);

		// add event listeners
		TweenMax.ticker.addEventListener("tick", this.render, this);

		window.addEventListener("mousemove", this.onMouseMove.bind(this));
	}

	onMouseMove(e) {
		this.mouseX = e.clientX / window.innerWidth;
		this.mouseY = e.clientY / window.innerHeight;
	}

	render() {
		this.camera.position.z -= 0.15;
		this.camera.position.x = utils.map(this.mouseX, 0, 1, -0.5, 0.5);
		this.camera.position.y = utils.map(this.mouseY, 0, 1, 0.5, -0.5);

		this.camera.lookAt(0, 0, this.camera.position.z - 1);
		if (this.camera.position.z < -7.9) this.camera.position.z = 0;
		this.renderer.render(this.scene, this.camera);
	}
}

export default App;

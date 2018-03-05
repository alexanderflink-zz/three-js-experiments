import {Scene, PerspectiveCamera, WebGLRenderer} from "three";
// import EffectComposer from "three/examples/js/postprocessing/EffectComposer.js";
import {TweenMax} from "gsap";
import Mandala from "./Mandala/Mandala.js";
import LineWaves from "./LineWaves/LineWaves.js";
import utils from "./utils.js";


class App {
	constructor() {

		// set up scene
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new WebGLRenderer({antialias: true, canvas: document.getElementById("three-canvas")});
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		// add event listeners
		TweenMax.ticker.addEventListener("tick", this.render, this);

		let wave = new LineWaves();
		this.scene.add(wave);

		// this.camera.position.z = 5;
		this.camera.position.y = 6;

		window.addEventListener("mousemove", this.onMouseMove.bind(this));
	}

	onMouseMove(e) {
		this.mouseX = e.clientX / window.innerWidth;
		this.mouseY = e.clientY / window.innerHeight;
	}

	render() {
		this.camera.position.z -= 0.1;
		this.camera.position.x = utils.map(this.mouseX, 0, 1, -1, 1);
		this.camera.position.y = utils.map(this.mouseY, 0, 1, 6, 5);
		// this.camera.lookAt(0, this.camera.position.y, this.camera.position.z - 10);
		// if (this.camera.position.z < -7.9) this.camera.position.z = 0;

		this.renderer.render(this.scene, this.camera);
	}
}

export default App;

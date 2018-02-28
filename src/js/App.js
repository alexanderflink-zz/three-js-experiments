import {Scene} from "three";
import {PerspectiveCamera} from "three";
import {WebGLRenderer} from "three";
import {TweenMax} from "gsap";
import Mandala from "./Mandala/Mandala.js";


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
	}

	render() {
		this.camera.position.z -= 0.05;
		if (this.camera.position.z < -10) this.camera.position.z = 0;
		this.renderer.render(this.scene, this.camera);
	}
}

export default App;

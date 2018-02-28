import {Object3D, LineBasicMaterial, Geometry, Vector3, Line} from "three";
import {TweenMax} from "gsap";
import Oval from "./Oval.js";

class Mandala extends Object3D {
	constructor() {
		super();

		let numOvals = 500;

		for (var i = 0; i < numOvals; i++) {
			let oval = new Oval(i % 2 == 0 ? 0xffffff : 0x000000);
			oval.setRotationFromAxisAngle(new Vector3(0, 0, 1), ((Math.PI) * numOvals / 3) * (i / numOvals));
			this.add(oval);
			oval.position.set(0, 0, -numOvals / 3 + (i / 3));
		}

		this.update = this.update.bind(this);
		requestAnimationFrame(this.update);
	}

	update() {
		this.rotation.z += 0.002;
		requestAnimationFrame(this.update);
	}
}

export default Mandala;

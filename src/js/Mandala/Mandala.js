import {Object3D, LineBasicMaterial, Geometry, Vector3, Line} from "three";
import {TweenMax} from "gsap";
import Oval from "./Oval.js";

class Mandala extends Object3D {
	constructor() {
		super();

		let numOvals = 10000;

		for (var i = 0; i < numOvals; i++) {
			let oval = new Oval();
			oval.setRotationFromAxisAngle(new Vector3(0, 0, 1), ((Math.PI) * numOvals / 3) * (i / numOvals));
			this.add(oval);
			oval.position.set(0, 0, -numOvals + (i));
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

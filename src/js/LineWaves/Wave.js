import {Object3D, LineBasicMaterial, Geometry, Vector3, Line} from "three";
import randomColor from "randomcolor";

class Wave extends Object3D {
	constructor() {
		super();

		let material = new LineBasicMaterial({color: 0xffffff, linewidth: 100, opacity: 0.5, transparent: true});
		let geometry = new Geometry();

		let length = 50;
		let numVertices = 100;
		let a = Math.random() * 100;
		let magnitude = 0.5;

		// create vertices
		for (var i = 0; i < numVertices; i++) {
			a += 1;
			geometry.vertices.push(new Vector3((i / numVertices) * length, Math.sin(a) * magnitude, 0));
		}

		this.line = new Line(geometry, material);
		this.add(this.line);
	}
}

export default Wave;

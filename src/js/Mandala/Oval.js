import {Object3D, LineBasicMaterial, Geometry, Vector3, LineLoop} from "three";
import randomColor from "randomcolor";

class Oval extends Object3D {
	constructor(color) {
		super();

		let material = new LineBasicMaterial({color: color, linewidth: 100, opacity: 0.5, transparent: true});
		let geometry = new Geometry();

		let numVertices = 50;
		let radius = 2;

		// create vertices
		for (var i = 0; i < numVertices; i++) {
			let theta = (i / numVertices) * Math.PI * 2;
			geometry.vertices.push(new Vector3(Math.cos(i) * radius, Math.sin(i) * radius * 1.5, 0));
		}

		this.line = new LineLoop(geometry, material);
		this.add(this.line);
	}
}

export default Oval;

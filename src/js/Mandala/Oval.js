import {Object3D, LineBasicMaterial, Geometry, Vector3, Line} from "three";

class Oval extends Object3D {
	constructor() {
		super();

		let material = new LineBasicMaterial({color: 0xffffff, linewidth: 100});
		let geometry = new Geometry();

		let numVertices = 100;

		// create vertices
		for (var i = 0; i < numVertices; i++) {
			geometry.vertices.push(new Vector3(Math.cos(i) * 1, Math.sin(i) * 1.5));
		}

		this.line = new Line(geometry, material);
		this.add(this.line);
	}
}

export default Oval;

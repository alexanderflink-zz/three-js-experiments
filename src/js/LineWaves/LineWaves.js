import {Object3D, LineBasicMaterial, Geometry, Vector3, Line, TextureLoader} from "three";
import {TweenMax} from "gsap";
import utils from "../utils.js";
import Wave from "./Wave.js";

class LineWaves extends Object3D {
	constructor() {
		super();


		this.onNoiseLoaded = this.onNoiseLoaded.bind(this);
		this.noiseTexture = new TextureLoader().load("../assets/images/noise.png", this.onNoiseLoaded);
	}

	onNoiseLoaded() {
		// create canvas and draw noise texture on it to extract pixels
		let noiseImage = this.noiseTexture.image;
		let noiseCanvas = document.createElement("canvas");
		noiseCanvas.width = noiseImage.width;
		noiseCanvas.height = noiseImage.height;
		let noiseCtx = noiseCanvas.getContext("2d");
		noiseCtx.drawImage(noiseImage, 0, 0);
		let noiseData = noiseCtx.getImageData(0, 0, noiseImage.width, noiseImage.height);

		let numWaves = 500;
		let length = 100;
		let numVertices = 200;
		let magnitude = 0.7;
		let material = new LineBasicMaterial({color: 0xffffff, linewidth: 100, opacity: 0.3, transparent: true});

		for (let z = 0; z < numWaves; z++) {

			let a = Math.random() * 100;
			let geometry = new Geometry();

			// create vertices
			for (let x = 0; x < numVertices; x++) {
				a += 1;
				let xValue = (x / numVertices) * length;
				let noiseValue = this.getPixel(noiseData, Math.round(utils.map(xValue, 0, length, 0, noiseData.width)), Math.round(utils.map(z, 0, numWaves, 0, noiseData.height)));
				geometry.vertices.push(new Vector3(xValue, utils.map(noiseValue[0], 0, 255, -5, 5), 0));
			}

			let line = new Line(geometry, material);
			this.add(line);
			line.position.z = -numWaves + z;
			line.position.x = -length / 2;
		}

		this.update = this.update.bind(this);
		requestAnimationFrame(this.update);
	}

	getPixel(imageData, x, y) {
		let data = imageData.data;
		let red = y * (imageData.width * 4) + x * 4;
		let indices = [red, red + 1, red + 2, red + 3];
		return [data[indices[0]], data[indices[1]], data[indices[2]], data[indices[3]]];
	}

	update() {
		// this.rotation.z += 0.002;
		requestAnimationFrame(this.update);
	}
}

export default LineWaves;

import {Object3D, LineBasicMaterial, Geometry, Vector3, Line, TextureLoader} from "three";
import {TweenMax} from "gsap";
import utils from "../utils.js";
import Wave from "./Wave.js";
import noisejs from "noisejs";

class LineWaves extends Object3D {
	constructor() {
		super();

		this.zAnimation = 0;
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
		// let noiseData = noiseCtx.getImageData(0, 0, noiseImage.width, noiseImage.height);

		this.numWaves = 200;
		this.lineLength = 140;
		this.numVertices = 100;
		this.magnitude = 1;
		this.lineMaterial = new LineBasicMaterial({color: 0xffffff, linewidth: 1, opacity: 0.1, transparent: true});
		this.noise = new noisejs.Noise(Math.random());
		this.lineGeometry = [];

		new TimelineMax({repeat: -1, yoyo: true})
		.to(this, 0.5, {magnitude: 6, ease: RoughEase.ease.config({ template:  Power2.easeInOut, strength: 1, points: 20, taper: "none", randomize:  true, clamp: true})})
		.to(this, 0.5, {magnitude: 0.5, ease: RoughEase.ease.config({ template:  Power2.easeInOut, strength: 1, points: 20, taper: "none", randomize:  true, clamp: true})}, "+=0.5")
		.to(this, 0.5, {magnitude: 5, ease: RoughEase.ease.config({ template:  Power2.easeInOut, strength: 1, points: 20, taper: "none", randomize:  true, clamp: true})}, "+=2")

		// create line geometries
		for (let z = 0; z < this.numWaves; z++) {
			let geometry = new Geometry();
			this.lineGeometry.push(geometry);
			let line = new Line(geometry, this.lineMaterial);
			this.add(line);
			line.position.z = (-this.numWaves / 2) + (z / 2);
			line.position.x = -this.lineLength / 2;
		}

		this.updateGeometry();

		this.update = this.update.bind(this);
		requestAnimationFrame(this.update);
	}

	updateGeometry() {
		for (let z = 0; z < this.numWaves; z++) {

			let geometry = this.lineGeometry[z];
			geometry.vertices = [];
			// create vertices
			for (let x = 0; x < this.numVertices; x++) {
				let xValue = (x / this.numVertices) * this.lineLength;
				// let noiseValue = this.getPixel(noiseData, Math.round(utils.map(xValue, 0, this.lineLength, 0, noiseData.width)), Math.round(utils.map(z, 0, this.numWaves, 0, noiseData.height)));
				// console.log(Math.round(xValue), Math.z);
				let noiseValue = this.noise.perlin2(((xValue) / 10), (z + this.zAnimation) / 10);
				geometry.vertices.push(new Vector3(xValue, utils.map(noiseValue, -1, 1, -this.magnitude, this.magnitude), 0));
			}

			geometry.verticesNeedUpdate = true;
		}
	}

	getPixel(imageData, x, y) {
		let data = imageData.data;
		let red = y * (imageData.width * 4) + x * 4;
		let indices = [red, red + 1, red + 2, red + 3];
		return [data[indices[0]], data[indices[1]], data[indices[2]], data[indices[3]]];
	}

	update() {
		this.zAnimation -= 0.3;
		this.updateGeometry();
		requestAnimationFrame(this.update);
	}
}

export default LineWaves;

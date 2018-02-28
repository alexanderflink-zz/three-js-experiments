import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

export default {
	input: "src/js/main.js",
	output: {
		file: "dist/js/bundle.js",
		format: "iife",
		name: "main",
		sourcemap: true
	},
	plugins: [
		resolve(),
		commonjs({
			namedExports: { "gsap/TweenMax.js": ["TweenMax"] },
		}),
		babel({
			exclude: "node_modules/**", // only transpile our source code
		}),
	]
};

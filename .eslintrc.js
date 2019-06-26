module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		//not going to implement all of the suggested changes,
		//because I don't like them...
		"eqeqeq": "error",
		"no-trailing-spaces": "error",
		"arrow-spacing": [
			"error", {"before": true, "after": true}
		],
		"no-console": 0
	}
}
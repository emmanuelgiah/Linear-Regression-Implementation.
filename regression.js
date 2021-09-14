//arrays of x and y values
let xvalues = [];
let yvalues = [];
//variables for our linear function
let m, b;

const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

function setup() {
	createCanvas(600, 400);
	//assign random tensor scalar variables
	m = tf.variable(tf.scalar(random(1)));
	b = tf.variable(tf.scalar(random(1)));
}

function loss(pred, labels) {
	return pred.sub(labels).square().mean();
}

function predict(xs) {
	const tensorXValues = tf.tensor1d(xs);
	//y = mx + b;
	const outputY = tensorXValues.mul(m).add(b);
	return outputY;
}

function mousePressed() {
	//adds mouse x and y position to separate arrays
	let x = map(mouseX, 0, width, 0, 1);
	let y = map(mouseY, 0, height, 1, 0);

	xvalues.push(x);
	yvalues.push(y);
	console.log("clicked");
}

function draw() {
	if (xvalues.length > 0) {
		const tensorYValues = tf.tensor1d(yvalues);
		optimizer.minimize(() => loss(predict(xvalues), tensorYValues));
	}
	//looks
	background(0);
	stroke(255);
	strokeWeight(10);
	//draw the points on the canvas
	for (let i = 0; i < xvalues.length; i++) {
		let px = map(xvalues[i], 0, 1, 0, width);
		let py = map(yvalues[i], 0, 1, height, 0);
		line(px, py, px, py);
	}
	//draw the line
	const xs = [0, 1];
	const ys = predict(xs);

	let x1 = map(xs[0], 0, 1, 0, width);
	let x2 = map(xs[1], 0, 1, 0, width);

	
	let liney = ys.dataSync();
	let y1 = map(liney[0], 0, 1, height, 0);
	let y2 = map(liney[1], 0, 1, height, 0);
	//draw line
	stroke(255);
	strokeWeight(1);
	line(x1, y1, x2, y2);
}
function setup() {
}

function draw() {
	//create numbers
	const nums = [];
	for (let i = 0; i < 150000; i++) {
		nums[i] = (random(0, 100));
	}
	//set the shape
	const shape = [500, 300];
	//create tensor
	const a = tf.tensor(nums, shape, 'int32');
	const b = tf.tensor(nums, shape, 'int32');
	const bb = b.transpose();
	const c = a.matMul(bb);
	//memory management
	a.dispose();
	b.dispose();
	c.dispose();
	b_t.dispose();

}
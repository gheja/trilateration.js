var trilaterate = require("./trilateration");

var assert = require('assert');
describe('Normal cases', function() {
	describe('Two results', function() {
		it('First test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 100 };
			p2 = { x: 100, y: 0, z: 0, r: 100 };
			p3 = { x: 0, y: 100, z: 0, r: 100 };
			
			p4 = trilaterate(p1, p2, p3);
			
			assert.strictEqual(p4[0].x, 50);
			assert.strictEqual(p4[0].y, 50);
			assert.strictEqual(p4[0].z, 70.71067811865476);
			
			assert.strictEqual(p4[1].x, 50);
			assert.strictEqual(p4[1].y, 50);
			assert.strictEqual(p4[1].z, -70.71067811865476);
		});
		
		it('Second test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 100 };
			p2 = { x: 100, y: 0, z: 0, r: 100 };
			p3 = { x: 0, y: 100, z: 50, r: 100 };
			
			p4 = trilaterate(p1, p2, p3);
			
			assert.strictEqual(p4[0].x, 50);
			assert.strictEqual(p4[0].y, 20.419601084501917);
			assert.strictEqual(p4[0].z, 84.16079783099616);
			
			assert.strictEqual(p4[1].x, 50);
			assert.strictEqual(p4[1].y, 79.58039891549808);
			assert.strictEqual(p4[1].z, -34.16079783099617);
		});
	});
	
	describe('One result', function() {
		it('First test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 100 };
			p2 = { x: 100, y: 0, z: 0, r: 100 };
			p3 = { x: 0, y: 100, z: 50, r: 100 };
			
			p4 = trilaterate(p1, p2, p3, true);
			
			assert.strictEqual(p4.x, 50);
			assert.strictEqual(p4.y, 50);
			assert.strictEqual(p4.z, 25);
		});
	});
	
	describe('Zero results', function() {
		it('First test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 10 };
			p2 = { x: 100, y: 0, z: 0, r: 10 };
			p3 = { x: 0, y: 100, z: 0, r: 10 };
			
			p4 = trilaterate(p1, p2, p3);
			
			assert.strictEqual(p4, null);
		});
		
		it('Second test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 10 };
			p2 = { x: 100, y: 0, z: 0, r: 10 };
			p3 = { x: 0, y: 100, z: 0, r: 10 };
			
			p4 = trilaterate(p1, p2, p3, true);
			
			assert.strictEqual(p4, null);
		});
	});
});

describe('Edge cases', function() {
	describe('Floating point math flaw (IEEE 754)', function() {
		it('First test', function() {
			var p1, p2, p3, p4;
			
			p1 = {x:69, y:0,  r:69, z:0}
			p2 = {x:0,  y:50, r:50, z:0};
			p3 = {x:0,  y:80, r:80, z:0};
			
			p4 = trilaterate(p1, p2, p3);
			
			assert.strictEqual(p4.x, -1.5631940186722204e-13);
			assert.strictEqual(p4.y, -1.4210854715202004e-13);
			assert.strictEqual(p4.z, 0);
		});
	});
});

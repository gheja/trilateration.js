var expect = require("expect");
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
			
			expect(p4[0].x).toEqual(50);
			expect(p4[0].y).toEqual(50);
			expect(p4[0].z).toEqual(70.71067811865476);
			
			expect(p4[1].x).toEqual(50);
			expect(p4[1].y).toEqual(50);
			expect(p4[1].z).toEqual(-70.71067811865476);
		});
		
		it('Second test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 100 };
			p2 = { x: 100, y: 0, z: 0, r: 100 };
			p3 = { x: 0, y: 100, z: 50, r: 100 };
			
			p4 = trilaterate(p1, p2, p3);
			
			expect(p4[0].x).toEqual(50);
			expect(p4[0].y).toEqual(20.419601084501917);
			expect(p4[0].z).toEqual(84.16079783099616);
			
			expect(p4[1].x).toEqual(50);
			expect(p4[1].y).toEqual(79.58039891549808);
			expect(p4[1].z).toEqual(-34.16079783099617);
		});
	});
	
	describe('One result', function() {
		it('First test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 100 };
			p2 = { x: 100, y: 0, z: 0, r: 100 };
			p3 = { x: 0, y: 100, z: 50, r: 100 };
			
			p4 = trilaterate(p1, p2, p3, true);
			
			expect(p4.x).toEqual(50);
			expect(p4.y).toEqual(50);
			expect(p4.z).toEqual(25);
		});
	});
	
	describe('Zero results', function() {
		it('First test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 10 };
			p2 = { x: 100, y: 0, z: 0, r: 10 };
			p3 = { x: 0, y: 100, z: 0, r: 10 };
			
			p4 = trilaterate(p1, p2, p3);
			
			expect(p4).toEqual(null);
		});
		
		it('Second test', function() {
			var p1, p2, p3, p4;
			
			p1 = { x: 0, y: 0, z: 0, r: 10 };
			p2 = { x: 100, y: 0, z: 0, r: 10 };
			p3 = { x: 0, y: 100, z: 0, r: 10 };
			
			p4 = trilaterate(p1, p2, p3, true);
			
			expect(p4).toEqual(null);
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
			
			expect(p4.x).toEqual(-1.5631940186722204e-13);
			expect(p4.y).toEqual(-1.4210854715202004e-13);
			expect(p4.z).toEqual(0);
		});
	});
});

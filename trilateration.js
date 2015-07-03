/**
  * JavaScript implementation of Trilateration to find the position of a
  * point (P4) from three known points in 3D space (P1, P2, P3) and their
  * distance from the point in question.
  *
  * The solution used here is based on the derivation found on the Wikipedia
  * page of Trilateration: https://en.wikipedia.org/wiki/Trilateration
  *
  * This library does not need any 3rd party tools as all the non-basic
  * geometric functions needed are declared inside the trilaterate() function.
  *
  * See the GitHub page: https://github.com/gheja/trilateration.js
  */

/**
  * Calculates the coordinates of a point in 3D space from three known points
  * and the distances between those points and the point in question.
  *
  * If no solution found then null will be returned.
  *
  * If two solutions found then both will be returned, unless the fourth
  * parameter (return_middle) is set to true when the middle of the two solution
  * will be returned.
  *
  * @param {Object} p1 Point and distance: { x, y, z, r }
  * @param {Object} p2 Point and distance: { x, y, z, r }
  * @param {Object} p3 Point and distance: { x, y, z, r }
  * @param {bool} return_middle If two solution found then return the center of them
  * @return {Object|Array|null} { x, y, z } or [ { x, y, z }, { x, y, z } ] or null
  */
function trilaterate(p1, p2, p3, return_middle)
{
	// based on: https://en.wikipedia.org/wiki/Trilateration
	
	// some additional local functions declared here for
	// scalar and vector operations
	
	function sqr(a)
	{
		return a * a;
	}
	
	function norm(a)
	{
		return Math.sqrt(sqr(a.x) + sqr(a.y) + sqr(a.z));
	}
	
	function dot(a, b)
	{
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}
	
	function vector_subtract(a, b)
	{
		return {
			x: a.x - b.x,
			y: a.y - b.y,
			z: a.z - b.z
		};
	}
	
	function vector_add(a, b)
	{
		return {
			x: a.x + b.x,
			y: a.y + b.y,
			z: a.z + b.z
		};
	}
	
	function vector_divide(a, b)
	{
		return {
			x: a.x / b,
			y: a.y / b,
			z: a.z / b
		};
	}
	
	function vector_multiply(a, b)
	{
		return {
			x: a.x * b,
			y: a.y * b,
			z: a.z * b
		};
	}
	
	function vector_cross(a, b)
	{
		return {
			x: a.y * b.z - a.z * b.y,
			y: a.z * b.x - a.x * b.z,
			z: a.x * b.y - a.y * b.x
		};
	}
	
	var ex, ey, ez, i, j, d, a, x, y, z, p4;
	
	ex = vector_divide(vector_subtract(p2, p1), norm(vector_subtract(p2, p1)));
	
	i = dot(ex, vector_subtract(p3, p1));
	a = vector_subtract(vector_subtract(p3, p1), vector_multiply(ex, i));
	ey = vector_divide(a, norm(a));
	ez =  vector_cross(ex, ey);
	d = norm(vector_subtract(p2, p1));
	j = dot(ey, vector_subtract(p3, p1));
	
	x = (sqr(p1.r) - sqr(p2.r) + sqr(d)) / (2 * d);
	y = (sqr(p1.r) - sqr(p3.r) + sqr(i) + sqr(j)) / (2 * j) - (i / j) * x;
	z = Math.sqrt(sqr(p1.r) - sqr(x) - sqr(y));
	
	// no solution found
	if (isNaN(z))
	{
		return null;
	}
	
	a = vector_add(p1, vector_add(vector_multiply(ex, x), vector_multiply(ey, y)))
	p4a = vector_add(a, vector_multiply(ez, z));
	p4b = vector_subtract(a, vector_multiply(ez, z));
	
	if (z == 0 || return_middle)
	{
		return a;
	}
	else
	{
		return [ p4a, p4b ];
	}
}

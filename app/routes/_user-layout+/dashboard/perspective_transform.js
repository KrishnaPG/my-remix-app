/*
 * calculation of transform matrix taken from:
 * https://stackoverflow.com/a/36217808/387194
 * 
 * Add CDN script: https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js
 */
// Computes the matrix3d that maps src points to dst.
export default function compute_transform(src, dst) {
  // src and dst should have length 4 each
  const count = 4;
  const a = []; // (2*count) x 8 matrix
  const b = []; // (2*count) vector

  for (let i = 0; i < 2 * count; ++i) {
    a.push([0, 0, 0, 0, 0, 0, 0, 0]);
    b.push(0);
  }

  for (let i = 0; i < count; ++i) {
    const j = i + count;
    a[i][0] = a[j][3] = src[i][0];
    a[i][1] = a[j][4] = src[i][1];
    a[i][2] = a[j][5] = 1;
    a[i][3] = a[i][4] = a[i][5] =
      a[j][0] = a[j][1] = a[j][2] = 0;
    a[i][6] = -src[i][0] * dst[i][0];
    a[i][7] = -src[i][1] * dst[i][0];
    a[j][6] = -src[i][0] * dst[i][1];
    a[j][7] = -src[i][1] * dst[i][1];
    b[i] = dst[i][0];
    b[j] = dst[i][1];
  }

  const x = numeric.solve(a, b);
  // matrix3d is homogenous coords in column major!
  // the z coordinate is unused
  const m = [
    x[0], x[3], 0, x[6],
    x[1], x[4], 0, x[7],
    0, 0, 1, 0,
    x[2], x[5], 0, 1
  ];
  return "matrix3d(" + m.join(',') + ')';
}
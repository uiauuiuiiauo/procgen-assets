export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hexagonal_jigsaw_puzzle";

  const board_baseMat = new THREE.MeshStandardMaterial({
    color: 0x9b896f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const puzzle_pieceMat = new THREE.MeshStandardMaterial({
    color: 0xeee8d1,
    metalness: 0.0,
    roughness: 0.9,
  });
  const puzzle_piece_altMat = new THREE.MeshStandardMaterial({
    color: 0xe8e1cf,
    metalness: 0.0,
    roughness: 0.9,
  });
  const puzzle_piece_warmMat = new THREE.MeshStandardMaterial({
    color: 0xe5ddc5,
    metalness: 0.0,
    roughness: 0.9,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x493f31,
    metalness: 0.0,
    roughness: 0.8,
  });

  const board_baseShape = new THREE.Shape();
  board_baseShape.moveTo(-0.48, 0.80);
  board_baseShape.lineTo(0.48, 0.80);
  board_baseShape.lineTo(0.88, 0.30);
  board_baseShape.lineTo(0.82, -0.25);
  board_baseShape.lineTo(0.45, -0.80);
  board_baseShape.lineTo(-0.45, -0.80);
  board_baseShape.lineTo(-0.82, -0.25);
  board_baseShape.lineTo(-0.88, 0.30);
  board_baseShape.closePath();

  const board_baseGeom = new THREE.ExtrudeGeometry(board_baseShape, {
    depth: 0.065,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const board_base = new THREE.Mesh(board_baseGeom, board_baseMat);
  board_base.name = "board_base";
  board_base.position.z = -0.075;
  root.add(board_base);

  const puzzle_layer = new THREE.Group();
  puzzle_layer.name = "puzzle_layer";
  puzzle_layer.position.z = 0.002;
  root.add(puzzle_layer);

  const seam_layer = new THREE.Group();
  seam_layer.name = "seam_layer";
  seam_layer.position.z = 0.002;
  root.add(seam_layer);

  const top_left_pieceShape = new THREE.Shape();
  top_left_pieceShape.moveTo(-0.48, 0.79);
  top_left_pieceShape.lineTo(-0.04, 0.79);
  top_left_pieceShape.lineTo(-0.13, 0.64);
  top_left_pieceShape.bezierCurveTo(-0.17, 0.57, -0.24, 0.55, -0.30, 0.56);
  top_left_pieceShape.bezierCurveTo(-0.38, 0.57, -0.42, 0.53, -0.41, 0.47);
  top_left_pieceShape.bezierCurveTo(-0.40, 0.42, -0.35, 0.40, -0.31, 0.40);
  top_left_pieceShape.bezierCurveTo(-0.28, 0.40, -0.26, 0.41, -0.24, 0.39);
  top_left_pieceShape.bezierCurveTo(-0.20, 0.35, -0.20, 0.30, -0.24, 0.26);
  top_left_pieceShape.bezierCurveTo(-0.28, 0.22, -0.28, 0.18, -0.24, 0.15);
  top_left_pieceShape.bezierCurveTo(-0.20, 0.12, -0.18, 0.09, -0.18, 0.05);
  top_left_pieceShape.lineTo(-0.18, -0.01);
  top_left_pieceShape.lineTo(-0.28, -0.01);
  top_left_pieceShape.bezierCurveTo(-0.33, -0.01, -0.35, 0.03, -0.35, 0.08);
  top_left_pieceShape.bezierCurveTo(-0.35, 0.13, -0.38, 0.16, -0.42, 0.16);
  top_left_pieceShape.bezierCurveTo(-0.47, 0.16, -0.50, 0.12, -0.50, 0.07);
  top_left_pieceShape.bezierCurveTo(-0.50, 0.03, -0.47, 0.00, -0.45, 0.00);
  top_left_pieceShape.lineTo(-0.54, 0.00);
  top_left_pieceShape.lineTo(-0.62, 0.00);
  top_left_pieceShape.bezierCurveTo(-0.67, 0.00, -0.69, 0.04, -0.69, 0.09);
  top_left_pieceShape.bezierCurveTo(-0.69, 0.15, -0.66, 0.19, -0.61, 0.19);
  top_left_pieceShape.bezierCurveTo(-0.56, 0.19, -0.54, 0.15, -0.50, 0.14);
  top_left_pieceShape.lineTo(-0.30, 0.34);
  top_left_pieceShape.lineTo(-0.10, 0.56);
  top_left_pieceShape.lineTo(-0.20, 0.70);
  top_left_pieceShape.closePath();

  const top_left_pieceGeom = new THREE.ExtrudeGeometry(top_left_pieceShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const top_left_piece = new THREE.Mesh(top_left_pieceGeom, puzzle_pieceMat);
  top_left_piece.name = "top_left_piece";
  puzzle_layer.add(top_left_piece);

  const top_right_pieceShape = new THREE.Shape();
  top_right_pieceShape.moveTo(-0.03, 0.79);
  top_right_pieceShape.lineTo(0.48, 0.79);
  top_right_pieceShape.lineTo(0.80, 0.39);
  top_right_pieceShape.lineTo(0.43, -0.02);
  top_right_pieceShape.lineTo(0.35, -0.02);
  top_right_pieceShape.bezierCurveTo(0.30, -0.02, 0.28, -0.06, 0.28, -0.11);
  top_right_pieceShape.bezierCurveTo(0.28, -0.17, 0.24, -0.21, 0.19, -0.21);
  top_right_pieceShape.bezierCurveTo(0.14, -0.21, 0.11, -0.17, 0.11, -0.12);
  top_right_pieceShape.bezierCurveTo(0.11, -0.07, 0.08, -0.03, 0.04, -0.02);
  top_right_pieceShape.lineTo(-0.17, -0.01);
  top_right_pieceShape.lineTo(-0.18, 0.05);
  top_right_pieceShape.bezierCurveTo(-0.18, 0.09, -0.20, 0.12, -0.24, 0.15);
  top_right_pieceShape.bezierCurveTo(-0.28, 0.18, -0.28, 0.22, -0.24, 0.26);
  top_right_pieceShape.bezierCurveTo(-0.20, 0.30, -0.20, 0.35, -0.24, 0.39);
  top_right_pieceShape.bezierCurveTo(-0.26, 0.41, -0.28, 0.40, -0.31, 0.40);
  top_right_pieceShape.bezierCurveTo(-0.35, 0.40, -0.40, 0.42, -0.41, 0.47);
  top_right_pieceShape.bezierCurveTo(-0.42, 0.53, -0.38, 0.57, -0.30, 0.56);
  top_right_pieceShape.bezierCurveTo(-0.24, 0.55, -0.17, 0.57, -0.13, 0.64);
  top_right_pieceShape.lineTo(-0.04, 0.79);
  top_right_pieceShape.closePath();

  const top_right_pieceGeom = new THREE.ExtrudeGeometry(top_right_pieceShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const top_right_piece = new THREE.Mesh(top_right_pieceGeom, puzzle_piece_warmMat);
  top_right_piece.name = "top_right_piece";
  puzzle_layer.add(top_right_piece);

  const middle_left_pieceShape = new THREE.Shape();
  middle_left_pieceShape.moveTo(-0.86, 0.29);
  middle_left_pieceShape.lineTo(-0.50, 0.14);
  middle_left_pieceShape.lineTo(-0.54, 0.00);
  middle_left_pieceShape.lineTo(-0.45, 0.00);
  middle_left_pieceShape.bezierCurveTo(-0.47, 0.03, -0.50, 0.07, -0.50, 0.12);
  middle_left_pieceShape.bezierCurveTo(-0.50, 0.16, -0.47, 0.19, -0.42, 0.19);
  middle_left_pieceShape.bezierCurveTo(-0.37, 0.19, -0.34, 0.15, -0.30, 0.14);
  middle_left_pieceShape.lineTo(-0.28, -0.01);
  middle_left_pieceShape.lineTo(-0.18, -0.01);
  middle_left_pieceShape.bezierCurveTo(-0.17, -0.07, -0.18, -0.13, -0.21, -0.18);
  middle_left_pieceShape.bezierCurveTo(-0.24, -0.23, -0.21, -0.28, -0.16, -0.29);
  middle_left_pieceShape.bezierCurveTo(-0.11, -0.30, -0.08, -0.27, -0.03, -0.28);
  middle_left_pieceShape.lineTo(-0.03, -0.42);
  middle_left_pieceShape.lineTo(-0.45, -0.80);
  middle_left_pieceShape.lineTo(-0.78, -0.36);
  middle_left_pieceShape.closePath();

  const middle_left_pieceGeom = new THREE.ExtrudeGeometry(middle_left_pieceShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const middle_left_piece = new THREE.Mesh(middle_left_pieceGeom, puzzle_piece_warmMat);
  middle_left_piece.name = "middle_left_piece";
  puzzle_layer.add(middle_left_piece);

  const middle_right_pieceShape = new THREE.Shape();
  middle_right_pieceShape.moveTo(0.43, -0.02);
  middle_right_pieceShape.lineTo(0.80, 0.39);
  middle_right_pieceShape.lineTo(0.86, -0.11);
  middle_right_pieceShape.lineTo(0.56, -0.11);
  middle_right_pieceShape.bezierCurveTo(0.50, -0.11, 0.47, -0.08, 0.47, -0.03);
  middle_right_pieceShape.bezierCurveTo(0.47, 0.02, 0.49, 0.05, 0.46, 0.07);
  middle_right_pieceShape.bezierCurveTo(0.42, 0.09, 0.39, 0.07, 0.35, 0.07);
  middle_right_pieceShape.lineTo(0.30, 0.07);
  middle_right_pieceShape.bezierCurveTo(0.25, 0.07, 0.23, 0.11, 0.23, 0.16);
  middle_right_pieceShape.bezierCurveTo(0.23, 0.21, 0.26, 0.24, 0.29, 0.26);
  middle_right_pieceShape.bezierCurveTo(0.33, 0.28, 0.35, 0.31, 0.35, 0.35);
  middle_right_pieceShape.bezierCurveTo(0.35, 0.40, 0.32, 0.43, 0.29, 0.44);
  middle_right_pieceShape.bezierCurveTo(0.25, 0.45, 0.22, 0.43, 0.18, 0.43);
  middle_right_pieceShape.lineTo(0.05, 0.43);
  middle_right_pieceShape.bezierCurveTo(0.00, 0.43, -0.02, 0.40, -0.02, 0.36);
  middle_right_pieceShape.bezierCurveTo(-0.02, 0.32, -0.04, 0.29, -0.07, 0.28);
  middle_right_pieceShape.lineTo(-0.03, -0.28);
  middle_right_pieceShape.bezierCurveTo(0.02, -0.29, 0.04, -0.32, 0.04, -0.37);
  middle_right_pieceShape.bezierCurveTo(0.04, -0.42, 0.07, -0.45, 0.12, -0.45);
  middle_right_pieceShape.bezierCurveTo(0.17, -0.45, 0.20, -0.42, 0.24, -0.40);
  middle_right_pieceShape.bezierCurveTo(0.29, -0.37, 0.35, -0.37, 0.39, -0.40);
  middle_right_pieceShape.bezierCurveTo(0.43, -0.43, 0.44, -0.48, 0.42, -0.53);
  middle_right_pieceShape.bezierCurveTo(0.40, -0.58, 0.36, -0.61, 0.31, -0.61);
  middle_right_pieceShape.bezierCurveTo(0.26, -0.61, 0.23, -0.58, 0.19, -0.55);
  middle_right_pieceShape.lineTo(0.25, -0.72);
  middle_right_pieceShape.closePath();

  const middle_right_pieceGeom = new THREE.ExtrudeGeometry(middle_right_pieceShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const middle_right_piece = new THREE.Mesh(middle_right_pieceGeom, puzzle_pieceMat);
  middle_right_piece.name = "middle_right_piece";
  puzzle_layer.add(middle_right_piece);

  const bottom_left_pieceShape = new THREE.Shape();
  bottom_left_pieceShape.moveTo(-0.78, -0.35);
  bottom_left_pieceShape.lineTo(-0.03, -0.42);
  bottom_left_pieceShape.lineTo(-0.03, -0.58);
  bottom_left_pieceShape.bezierCurveTo(-0.03, -0.64, -0.06, -0.67, -0.11, -0.67);
  bottom_left_pieceShape.bezierCurveTo(-0.16, -0.67, -0.19, -0.64, -0.23, -0.62);
  bottom_left_pieceShape.bezierCurveTo(-0.28, -0.59, -0.34, -0.60, -0.37, -0.64);
  bottom_left_pieceShape.bezierCurveTo(-0.40, -0.68, -0.39, -0.73, -0.36, -0.76);
  bottom_left_pieceShape.lineTo(-0.45, -0.79);
  bottom_left_pieceShape.lineTo(-0.78, -0.35);
  bottom_left_pieceShape.closePath();

  const bottom_left_pieceGeom = new THREE.ExtrudeGeometry(bottom_left_pieceShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const bottom_left_piece = new THREE.Mesh(bottom_left_pieceGeom, puzzle_pieceMat);
  bottom_left_piece.name = "bottom_left_piece";
  puzzle_layer.add(bottom_left_piece);

  const bottom_center_pieceShape = new THREE.Shape();
  bottom_center_pieceShape.moveTo(-0.03, -0.42);
  bottom_center_pieceShape.lineTo(0.18, -0.43);
  bottom_center_pieceShape.bezierCurveTo(0.22, -0.43, 0.25, -0.40, 0.29, -0.37);
  bottom_center_pieceShape.bezierCurveTo(0.34, -0.34, 0.38, -0.35, 0.42, -0.38);
  bottom_center_pieceShape.bezierCurveTo(0.46, -0.41, 0.47, -0.45, 0.45, -0.49);
  bottom_center_pieceShape.bezierCurveTo(0.43, -0.53, 0.39, -0.55, 0.35, -0.55);
  bottom_center_pieceShape.bezierCurveTo(0.30, -0.55, 0.27, -0.58, 0.24, -0.62);
  bottom_center_pieceShape.bezierCurveTo(0.21, -0.67, 0.16, -0.69, 0.11, -0.68);
  bottom_center_pieceShape.bezierCurveTo(0.06, -0.67, 0.04, -0.64, 0.03, -0.60);
  bottom_center_pieceShape.lineTo(-0.03, -0.58);
  bottom_center_pieceShape.lineTo(-0.03, -0.42);
  bottom_center_pieceShape.closePath();

  const bottom_center_pieceGeom = new THREE.ExtrudeGeometry(bottom_center_pieceShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const bottom_center_piece = new THREE.Mesh(bottom_center_pieceGeom, puzzle_piece_altMat);
  bottom_center_piece.name = "bottom_center_piece";
  puzzle_layer.add(bottom_center_piece);

  const bottom_right_pieceShape = new THREE.Shape();
  bottom_right_pieceShape.moveTo(0.25, -0.72);
  bottom_right_pieceShape.lineTo(0.45, -0.79);
  bottom_right_pieceShape.lineTo(0.78, -0.36);
  bottom_right_pieceShape.lineTo(0.56, -0.11);
  bottom_right_pieceShape.bezierCurveTo(0.52, -0.10, 0.49, -0.08, 0.47, -0.03);
  bottom_right_pieceShape.bezierCurveTo(0.47, 0.02, 0.44, 0.05, 0.40, 0.07);
  bottom_right_pieceShape.lineTo(0.30, 0.07);
  bottom_right_pieceShape.bezierCurveTo(0.25, 0.07, 0.23, 0.11, 0.23, 0.16);
  bottom_right_pieceShape.bezierCurveTo(0.23, 0.21, 0.26, 0.24, 0.29, 0.26);
  bottom_right_pieceShape.bezierCurveTo(0.33, 0.28, 0.35, 0.31, 0.35, 0.35);
  bottom_right_pieceShape.bezierCurveTo(0.35, 0.40, 0.32, 0.43, 0.29, 0.44);
  bottom_right_pieceShape.bezierCurveTo(0.25, 0.45, 0.22, 0.43, 0.18, 0.43);
  bottom_right_pieceShape.lineTo(0.18, -0.43);
  bottom_right_pieceShape.bezierCurveTo(0.22, -0.43, 0.25, -0.40, 0.29, -0.37);
  bottom_right_pieceShape.bezierCurveTo(0.34, -0.34, 0.38, -0.35, 0.42, -0.38);
  bottom_right_pieceShape.bezierCurveTo(0.46, -0.41, 0.47, -0.45, 0.45, -0.49);
  bottom_right_pieceShape.bezierCurveTo(0.43, -0.53, 0.39, -0.55, 0.35, -0.55);
  bottom_right_pieceShape.bezierCurveTo(0.30, -0.55, 0.27, -0.58, 0.24, -0.62);
  bottom_right_pieceShape.bezierCurveTo(0.21, -0.67, 0.16, -0.69, 0.11, -0.68);
  bottom_right_pieceShape.bezierCurveTo(0.06, -0.67, 0.04, -0.64, 0.03, -0.60);
  bottom_right_pieceShape.lineTo(0.25, -0.72);
  bottom_right_pieceShape.closePath();

  const bottom_right_pieceGeom = new THREE.ExtrudeGeometry(bottom_right_pieceShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const bottom_right_piece = new THREE.Mesh(bottom_right_pieceGeom, puzzle_pieceMat);
  bottom_right_piece.name = "bottom_right_piece";
  puzzle_layer.add(bottom_right_piece);

  function createSeamGeometry(coords) {
    const points = [];
    for (let i = 0; i < coords.length; i++) {
      points.push(new THREE.Vector3(coords[i][0], coords[i][1], 0.023));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.TubeGeometry(
      curve,
      Math.max(18, (points.length - 1) * 5),
      0.0042,
      6,
      false
    );
  }

  const seam_top_centerGeom = createSeamGeometry([
    [-0.035, 0.790],
    [-0.080, 0.700],
    [-0.140, 0.620],
    [-0.230, 0.570],
    [-0.330, 0.560],
    [-0.400, 0.510],
    [-0.400, 0.440],
    [-0.340, 0.400],
    [-0.270, 0.400],
    [-0.230, 0.380],
    [-0.200, 0.320],
    [-0.240, 0.250],
    [-0.270, 0.180],
    [-0.220, 0.130],
    [-0.180, 0.050],
    [-0.180, -0.010],
  ]);
  const seam_top_center = new THREE.Mesh(seam_top_centerGeom, seamMat);
  seam_top_center.name = "seam_top_center";
  seam_layer.add(seam_top_center);

  const seam_upper_leftGeom = createSeamGeometry([
    [-0.540, 0.510],
    [-0.580, 0.460],
    [-0.620, 0.400],
    [-0.660, 0.340],
    [-0.700, 0.280],
    [-0.740, 0.220],
    [-0.780, 0.160],
    [-0.820, 0.100],
    [-0.860, 0.290],
  ]);
  const seam_upper_left = new THREE.Mesh(seam_upper_leftGeom, seamMat);
  seam_upper_left.name = "seam_upper_left";
  seam_layer.add(seam_upper_left);

  const seam_upper_rightGeom = createSeamGeometry([
    [0.430, -0.020],
    [0.490, 0.060],
    [0.550, 0.150],
    [0.610, 0.240],
    [0.670, 0.330],
    [0.730, 0.420],
    [0.790, 0.510],
    [0.800, 0.390],
  ]);
  const seam_upper_right = new THREE.Mesh(seam_upper_rightGeom, seamMat);
  seam_upper_right.name = "seam_upper_right";
  seam_layer.add(seam_upper_right);

  const seam_middle_leftGeom = createSeamGeometry([
    [-0.860, 0.290],
    [-0.780, 0.160],
    [-0.700, 0.040],
    [-0.620, -0.070],
    [-0.540, -0.010],
    [-0.460, 0.090],
    [-0.380, 0.180],
    [-0.300, 0.140],
    [-0.280, 0.050],
    [-0.280, -0.010],
  ]);
  const seam_middle_left = new THREE.Mesh(seam_middle_leftGeom, seamMat);
  seam_middle_left.name = "seam_middle_left";
  seam_layer.add(seam_middle_left);

  const seam_middle_rightGeom = createSeamGeometry([
    [0.430, -0.020],
    [0.480, -0.080],
    [0.540, -0.110],
    [0.620, -0.110],
    [0.700, -0.110],
    [0.780, -0.110],
    [0.860, -0.110],
  ]);
  const seam_middle_right = new THREE.Mesh(seam_middle_rightGeom, seamMat);
  seam_middle_right.name = "seam_middle_right";
  seam_layer.add(seam_middle_right);

  const seam_right_middleGeom = createSeamGeometry([
    [0.350, 0.070],
    [0.300, 0.070],
    [0.250, 0.100],
    [0.230, 0.160],
    [0.260, 0.230],
    [0.320, 0.270],
    [0.350, 0.330],
    [0.330, 0.400],
    [0.280, 0.440],
    [0.220, 0.430],
    [0.150, 0.430],
    [0.080, 0.430],
    [0.030, 0.410],
    [0.030, 0.350],
    [0.030, 0.280],
    [0.030, 0.200],
    [0.030, 0.120],
    [0.030, 0.040],
    [0.030, -0.020],
  ]);
  const seam_right_middle = new THREE.Mesh(seam_right_middleGeom, seamMat);
  seam_right_middle.name = "seam_right_middle";
  seam_layer.add(seam_right_middle);

  const seam_center_leftGeom = createSeamGeometry([
    [-0.180, -0.010],
    [-0.100, -0.010],
    [-0.040, -0.010],
    [-0.030, -0.080],
    [-0.030, -0.160],
    [-0.030, -0.240],
    [-0.030, -0.320],
    [-0.030, -0.420],
  ]);
  const seam_center_left = new THREE.Mesh(seam_center_leftGeom, seamMat);
  seam_center_left.name = "seam_center_left";
  seam_layer.add(seam_center_left);

  const seam_center_rightGeom = createSeamGeometry([
    [0.030, -0.020],
    [0.030, -0.100],
    [0.030, -0.180],
    [0.030, -0.260],
    [0.040, -0.320],
    [0.080, -0.350],
    [0.140, -0.350],
    [0.200, -0.320],
    [0.250, -0.280],
    [0.310, -0.280],
    [0.360, -0.320],
    [0.380, -0.380],
    [0.350, -0.430],
    [0.290, -0.440],
    [0.230, -0.420],
    [0.180, -0.430],
  ]);
  const seam_center_right = new THREE.Mesh(seam_center_rightGeom, seamMat);
  seam_center_right.name = "seam_center_right";
  seam_layer.add(seam_center_right);

  const seam_lower_leftGeom = createSeamGeometry([
    [-0.780, -0.350],
    [-0.690, -0.460],
    [-0.600, -0.570],
    [-0.510, -0.680],
    [-0.450, -0.790],
    [-0.030, -0.420],
  ]);
  const seam_lower_left = new THREE.Mesh(seam_lower_leftGeom, seamMat);
  seam_lower_left.name = "seam_lower_left";
  seam_layer.add(seam_lower_left);

  const seam_lower_centerGeom = createSeamGeometry([
    [-0.030, -0.420],
    [-0.020, -0.490],
    [-0.030, -0.580],
    [-0.020, -0.630],
    [0.020, -0.680],
    [0.100, -0.710],
    [0.180, -0.710],
    [0.250, -0.720],
    [0.350, -0.770],
    [0.450, -0.790],
  ]);
  const seam_lower_center = new THREE.Mesh(seam_lower_centerGeom, seamMat);
  seam_lower_center.name = "seam_lower_center";
  seam_layer.add(seam_lower_center);

  const seam_lower_rightGeom = createSeamGeometry([
    [0.250, -0.720],
    [0.340, -0.650],
    [0.430, -0.570],
    [0.520, -0.490],
    [0.620, -0.410],
    [0.700, -0.330],
    [0.780, -0.250],
    [0.860, -0.110],
  ]);
  const seam_lower_right = new THREE.Mesh(seam_lower_rightGeom, seamMat);
  seam_lower_right.name = "seam_lower_right";
  seam_layer.add(seam_lower_right);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}
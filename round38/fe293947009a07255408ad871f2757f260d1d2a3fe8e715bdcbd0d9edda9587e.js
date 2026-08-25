export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "delta_kite";

  const sail_group = new THREE.Group();
  sail_group.name = "sail_group";
  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  const detail_group = new THREE.Group();
  detail_group.name = "detail_group";
  root.add(sail_group, frame_group, detail_group);

  const blue_sailMat = new THREE.MeshStandardMaterial({
    color: 0x078cf1,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const white_sailMat = new THREE.MeshStandardMaterial({
    color: 0xf4f6f7,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const cyan_panelMat = new THREE.MeshStandardMaterial({
    color: 0x19b9f4,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const dark_blue_panelMat = new THREE.MeshStandardMaterial({
    color: 0x0069d4,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x171b20,
    metalness: 0.0,
    roughness: 0.8,
  });
  const reinforcementMat = new THREE.MeshStandardMaterial({
    color: 0x0a2347,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x07569c,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
  });

  function polygonShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return shape;
  }

  function tubeFromPoints(points, radius, tubularSegments, radialSegments, closed) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, closed, "centripetal");
    return new THREE.TubeGeometry(
      curve,
      tubularSegments,
      radius,
      radialSegments,
      closed
    );
  }

  const main_sailShape = new THREE.Shape();
  main_sailShape.moveTo(0, 1.35);
  main_sailShape.bezierCurveTo(-0.72, 0.86, -1.45, 0.16, -2.15, -0.39);
  main_sailShape.bezierCurveTo(-1.55, -0.30, -0.82, -0.29, 0, -0.32);
  main_sailShape.bezierCurveTo(0.82, -0.29, 1.55, -0.30, 2.15, -0.39);
  main_sailShape.bezierCurveTo(1.45, 0.16, 0.72, 0.86, 0, 1.35);
  main_sailShape.closePath();

  const main_sailGeom = new THREE.ShapeGeometry(main_sailShape, 36);
  const main_sail = new THREE.Mesh(main_sailGeom, blue_sailMat);
  main_sail.name = "main_sail";
  sail_group.add(main_sail);

  const lower_sailShape = new THREE.Shape();
  lower_sailShape.moveTo(-0.88, -0.32);
  lower_sailShape.bezierCurveTo(-0.73, -0.86, -0.34, -1.72, 0, -2.34);
  lower_sailShape.bezierCurveTo(0.34, -1.72, 0.73, -0.86, 0.88, -0.32);
  lower_sailShape.bezierCurveTo(0.55, -0.29, 0.25, -0.30, 0, -0.32);
  lower_sailShape.bezierCurveTo(-0.25, -0.30, -0.55, -0.29, -0.88, -0.32);
  lower_sailShape.closePath();

  const lower_sailGeom = new THREE.ShapeGeometry(lower_sailShape, 32);
  const lower_sail = new THREE.Mesh(lower_sailGeom, white_sailMat);
  lower_sail.name = "lower_sail";
  lower_sail.position.z = 0.006;
  sail_group.add(lower_sail);

  const center_blue_panelShape = polygonShape([
    [0, 1.33],
    [0.23, 0.72],
    [0.43, 0.34],
    [0.49, -0.31],
    [0.40, -1.29],
    [0, -2.32],
    [-0.32, -1.48],
    [-0.47, -0.31],
    [-0.37, 0.31],
    [-0.18, 0.74],
  ]);
  const center_blue_panelGeom = new THREE.ShapeGeometry(center_blue_panelShape);
  const center_blue_panel = new THREE.Mesh(center_blue_panelGeom, blue_sailMat);
  center_blue_panel.name = "center_blue_panel";
  center_blue_panel.position.z = 0.014;
  sail_group.add(center_blue_panel);

  const white_swooshShape = new THREE.Shape();
  white_swooshShape.moveTo(-1.38, -0.31);
  white_swooshShape.lineTo(1.36, -0.31);
  white_swooshShape.bezierCurveTo(1.23, 0.06, 0.91, 0.52, 0.48, 0.62);
  white_swooshShape.bezierCurveTo(0.17, 0.70, -0.15, 0.62, -0.43, 0.48);
  white_swooshShape.bezierCurveTo(-0.76, 0.31, -1.08, 0.02, -1.38, -0.18);
  white_swooshShape.closePath();

  const white_swooshHole = new THREE.Path();
  white_swooshHole.moveTo(-0.52, -0.30);
  white_swooshHole.bezierCurveTo(-0.48, 0.03, -0.31, 0.38, -0.05, 0.49);
  white_swooshHole.bezierCurveTo(0.20, 0.59, 0.48, 0.38, 0.60, 0.05);
  white_swooshHole.bezierCurveTo(0.67, -0.09, 0.67, -0.21, 0.65, -0.30);
  white_swooshHole.closePath();
  white_swooshShape.holes.push(white_swooshHole);

  const white_swooshGeom = new THREE.ShapeGeometry(white_swooshShape, 28);
  const white_swoosh = new THREE.Mesh(white_swooshGeom, white_sailMat);
  white_swoosh.name = "white_swoosh";
  white_swoosh.position.z = 0.022;
  sail_group.add(white_swoosh);

  const left_cyan_panelShape = polygonShape([
    [-1.96, -0.35],
    [-1.48, -0.28],
    [-1.18, 0.18],
    [-1.47, 0.38],
    [-1.82, 0.02],
  ]);
  const left_cyan_panelGeom = new THREE.ShapeGeometry(left_cyan_panelShape);
  const left_cyan_panel = new THREE.Mesh(left_cyan_panelGeom, cyan_panelMat);
  left_cyan_panel.name = "left_cyan_panel";
  left_cyan_panel.position.z = 0.029;
  sail_group.add(left_cyan_panel);

  const right_cyan_panelShape = polygonShape([
    [1.16, -0.28],
    [1.69, -0.35],
    [1.82, 0.02],
    [1.48, 0.42],
    [1.17, 0.18],
  ]);
  const right_cyan_panelGeom = new THREE.ShapeGeometry(right_cyan_panelShape);
  const right_cyan_panel = new THREE.Mesh(right_cyan_panelGeom, cyan_panelMat);
  right_cyan_panel.name = "right_cyan_panel";
  right_cyan_panel.position.z = 0.029;
  sail_group.add(right_cyan_panel);

  const left_tip_reinforcementShape = polygonShape([
    [-2.15, -0.39],
    [-1.78, -0.32],
    [-1.67, -0.17],
    [-1.82, 0.02],
    [-2.02, -0.20],
  ]);
  const left_tip_reinforcementGeom = new THREE.ShapeGeometry(left_tip_reinforcementShape);
  const left_tip_reinforcement = new THREE.Mesh(
    left_tip_reinforcementGeom,
    reinforcementMat
  );
  left_tip_reinforcement.name = "left_tip_reinforcement";
  left_tip_reinforcement.position.z = 0.034;
  sail_group.add(left_tip_reinforcement);

  const right_tip_reinforcementShape = polygonShape([
    [2.15, -0.39],
    [1.78, -0.32],
    [1.67, -0.17],
    [1.82, 0.02],
    [2.02, -0.20],
  ]);
  const right_tip_reinforcementGeom = new THREE.ShapeGeometry(right_tip_reinforcementShape);
  const right_tip_reinforcement = new THREE.Mesh(
    right_tip_reinforcementGeom,
    reinforcementMat
  );
  right_tip_reinforcement.name = "right_tip_reinforcement";
  right_tip_reinforcement.position.z = 0.034;
  sail_group.add(right_tip_reinforcement);

  const top_reinforcementShape = polygonShape([
    [-0.11, 1.27],
    [0, 1.35],
    [0.11, 1.27],
    [0.045, 1.15],
    [-0.045, 1.15],
  ]);
  const top_reinforcementGeom = new THREE.ShapeGeometry(top_reinforcementShape);
  const top_reinforcement = new THREE.Mesh(top_reinforcementGeom, reinforcementMat);
  top_reinforcement.name = "top_reinforcement";
  top_reinforcement.position.z = 0.036;
  sail_group.add(top_reinforcement);

  const left_leading_edgeGeom = tubeFromPoints(
    [
      new THREE.Vector3(-2.15, -0.39, 0.052),
      new THREE.Vector3(-1.67, 0.08, 0.052),
      new THREE.Vector3(-1.14, 0.51, 0.052),
      new THREE.Vector3(-0.58, 0.94, 0.052),
      new THREE.Vector3(0, 1.35, 0.052),
    ],
    0.028,
    48,
    8,
    false
  );
  const left_leading_edge = new THREE.Mesh(left_leading_edgeGeom, frameMat);
  left_leading_edge.name = "left_leading_edge";
  frame_group.add(left_leading_edge);

  const right_leading_edgeGeom = tubeFromPoints(
    [
      new THREE.Vector3(0, 1.35, 0.052),
      new THREE.Vector3(0.58, 0.94, 0.052),
      new THREE.Vector3(1.14, 0.51, 0.052),
      new THREE.Vector3(1.67, 0.08, 0.052),
      new THREE.Vector3(2.15, -0.39, 0.052),
    ],
    0.028,
    48,
    8,
    false
  );
  const right_leading_edge = new THREE.Mesh(right_leading_edgeGeom, frameMat);
  right_leading_edge.name = "right_leading_edge";
  frame_group.add(right_leading_edge);

  const left_lower_edgeGeom = tubeFromPoints(
    [
      new THREE.Vector3(-2.15, -0.39, 0.042),
      new THREE.Vector3(-1.45, -0.31, 0.042),
      new THREE.Vector3(-0.72, -0.30, 0.042),
      new THREE.Vector3(0, -0.32, 0.042),
    ],
    0.012,
    28,
    6,
    false
  );
  const left_lower_edge = new THREE.Mesh(left_lower_edgeGeom, dark_blue_panelMat);
  left_lower_edge.name = "left_lower_edge";
  frame_group.add(left_lower_edge);

  const right_lower_edgeGeom = tubeFromPoints(
    [
      new THREE.Vector3(0, -0.32, 0.042),
      new THREE.Vector3(0.72, -0.30, 0.042),
      new THREE.Vector3(1.45, -0.31, 0.042),
      new THREE.Vector3(2.15, -0.39, 0.042),
    ],
    0.012,
    28,
    6,
    false
  );
  const right_lower_edge = new THREE.Mesh(right_lower_edgeGeom, dark_blue_panelMat);
  right_lower_edge.name = "right_lower_edge";
  frame_group.add(right_lower_edge);

  const lower_left_edgeGeom = tubeFromPoints(
    [
      new THREE.Vector3(-0.88, -0.32, 0.039),
      new THREE.Vector3(-0.67, -0.91, 0.039),
      new THREE.Vector3(-0.34, -1.72, 0.039),
      new THREE.Vector3(0, -2.34, 0.039),
    ],
    0.011,
    30,
    6,
    false
  );
  const lower_left_edge = new THREE.Mesh(lower_left_edgeGeom, reinforcementMat);
  lower_left_edge.name = "lower_left_edge";
  frame_group.add(lower_left_edge);

  const lower_right_edgeGeom = tubeFromPoints(
    [
      new THREE.Vector3(0, -2.34, 0.039),
      new THREE.Vector3(0.34, -1.72, 0.039),
      new THREE.Vector3(0.67, -0.91, 0.039),
      new THREE.Vector3(0.88, -0.32, 0.039),
    ],
    0.011,
    30,
    6,
    false
  );
  const lower_right_edge = new THREE.Mesh(lower_right_edgeGeom, reinforcementMat);
  lower_right_edge.name = "lower_right_edge";
  frame_group.add(lower_right_edge);

  const center_spineGeom = tubeFromPoints(
    [
      new THREE.Vector3(0, 1.35, 0.066),
      new THREE.Vector3(0, -0.32, 0.066),
      new THREE.Vector3(0, -2.34, 0.066),
    ],
    0.017,
    52,
    8,
    false
  );
  const center_spine = new THREE.Mesh(center_spineGeom, frameMat);
  center_spine.name = "center_spine";
  frame_group.add(center_spine);

  const center_spacerGeom = new THREE.BoxGeometry(0.065, 0.28, 0.038);
  const center_spacer = new THREE.Mesh(center_spacerGeom, frameMat);
  center_spacer.name = "center_spacer";
  center_spacer.position.set(0, -0.10, 0.073);
  frame_group.add(center_spacer);

  const cross_spreaderGeom = tubeFromPoints(
    [
      new THREE.Vector3(-1.76, -0.31, 0.057),
      new THREE.Vector3(0, -0.32, 0.057),
      new THREE.Vector3(1.76, -0.31, 0.057),
    ],
    0.010,
    36,
    6,
    false
  );
  const cross_spreader = new THREE.Mesh(cross_spreaderGeom, seamMat);
  cross_spreader.name = "cross_spreader";
  frame_group.add(cross_spreader);

  const left_radial_seamGeom = tubeFromPoints(
    [
      new THREE.Vector3(-1.52, 0.12, 0.045),
      new THREE.Vector3(-1.05, 0.26, 0.045),
      new THREE.Vector3(-0.66, 0.57, 0.045),
      new THREE.Vector3(-0.29, 0.96, 0.045),
    ],
    0.005,
    24,
    5,
    false
  );
  const left_radial_seam = new THREE.Mesh(left_radial_seamGeom, seamMat);
  left_radial_seam.name = "left_radial_seam";
  detail_group.add(left_radial_seam);

  const right_radial_seamGeom = tubeFromPoints(
    [
      new THREE.Vector3(1.52, 0.12, 0.045),
      new THREE.Vector3(1.05, 0.26, 0.045),
      new THREE.Vector3(0.66, 0.57, 0.045),
      new THREE.Vector3(0.29, 0.96, 0.045),
    ],
    0.005,
    24,
    5,
    false
  );
  const right_radial_seam = new THREE.Mesh(right_radial_seamGeom, seamMat);
  right_radial_seam.name = "right_radial_seam";
  detail_group.add(right_radial_seam);

  const left_inner_seamGeom = tubeFromPoints(
    [
      new THREE.Vector3(-1.03, -0.27, 0.046),
      new THREE.Vector3(-0.88, 0.02, 0.046),
      new THREE.Vector3(-0.68, 0.38, 0.046),
      new THREE.Vector3(-0.46, 0.70, 0.046),
    ],
    0.0045,
    22,
    5,
    false
  );
  const left_inner_seam = new THREE.Mesh(left_inner_seamGeom, seamMat);
  left_inner_seam.name = "left_inner_seam";
  detail_group.add(left_inner_seam);

  const right_inner_seamGeom = tubeFromPoints(
    [
      new THREE.Vector3(1.03, -0.27, 0.046),
      new THREE.Vector3(0.88, 0.02, 0.046),
      new THREE.Vector3(0.68, 0.38, 0.046),
      new THREE.Vector3(0.46, 0.70, 0.046),
    ],
    0.0045,
    22,
    5,
    false
  );
  const right_inner_seam = new THREE.Mesh(right_inner_seamGeom, seamMat);
  right_inner_seam.name = "right_inner_seam";
  detail_group.add(right_inner_seam);

  const lower_left_panel_seamGeom = tubeFromPoints(
    [
      new THREE.Vector3(-0.77, -0.32, 0.047),
      new THREE.Vector3(-0.63, -0.82, 0.047),
      new THREE.Vector3(-0.38, -1.55, 0.047),
    ],
    0.0045,
    20,
    5,
    false
  );
  const lower_left_panel_seam = new THREE.Mesh(lower_left_panel_seamGeom, seamMat);
  lower_left_panel_seam.name = "lower_left_panel_seam";
  detail_group.add(lower_left_panel_seam);

  const lower_right_panel_seamGeom = tubeFromPoints(
    [
      new THREE.Vector3(0.77, -0.32, 0.047),
      new THREE.Vector3(0.63, -0.82, 0.047),
      new THREE.Vector3(0.38, -1.55, 0.047),
    ],
    0.0045,
    20,
    5,
    false
  );
  const lower_right_panel_seam = new THREE.Mesh(lower_right_panel_seamGeom, seamMat);
  lower_right_panel_seam.name = "lower_right_panel_seam";
  detail_group.add(lower_right_panel_seam);

  const lower_cross_seamGeom = tubeFromPoints(
    [
      new THREE.Vector3(-0.49, -1.25, 0.049),
      new THREE.Vector3(0, -1.30, 0.049),
      new THREE.Vector3(0.49, -1.25, 0.049),
    ],
    0.0045,
    18,
    5,
    false
  );
  const lower_cross_seam = new THREE.Mesh(lower_cross_seamGeom, seamMat);
  lower_cross_seam.name = "lower_cross_seam";
  detail_group.add(lower_cross_seam);

  const left_wingtip_capGeom = new THREE.BoxGeometry(0.14, 0.065, 0.055);
  const left_wingtip_cap = new THREE.Mesh(left_wingtip_capGeom, frameMat);
  left_wingtip_cap.name = "left_wingtip_cap";
  left_wingtip_cap.position.set(-2.12, -0.38, 0.055);
  left_wingtip_cap.rotation.z = -0.58;
  frame_group.add(left_wingtip_cap);

  const right_wingtip_capGeom = new THREE.BoxGeometry(0.14, 0.065, 0.055);
  const right_wingtip_cap = new THREE.Mesh(right_wingtip_capGeom, frameMat);
  right_wingtip_cap.name = "right_wingtip_cap";
  right_wingtip_cap.position.set(2.12, -0.38, 0.055);
  right_wingtip_cap.rotation.z = 0.58;
  frame_group.add(right_wingtip_cap);

  const left_wingtip_tetherGeom = tubeFromPoints(
    [
      new THREE.Vector3(-2.14, -0.40, 0.052),
      new THREE.Vector3(-2.20, -0.49, 0.052),
      new THREE.Vector3(-2.20, -0.60, 0.052),
      new THREE.Vector3(-2.28, -0.66, 0.052),
      new THREE.Vector3(-2.35, -0.62, 0.052),
    ],
    0.012,
    24,
    6,
    false
  );
  const left_wingtip_tether = new THREE.Mesh(left_wingtip_tetherGeom, frameMat);
  left_wingtip_tether.name = "left_wingtip_tether";
  frame_group.add(left_wingtip_tether);

  const right_wingtip_tetherGeom = tubeFromPoints(
    [
      new THREE.Vector3(2.14, -0.40, 0.052),
      new THREE.Vector3(2.20, -0.50, 0.052),
      new THREE.Vector3(2.23, -0.65, 0.052),
      new THREE.Vector3(2.28, -0.79, 0.052),
    ],
    0.012,
    22,
    6,
    false
  );
  const right_wingtip_tether = new THREE.Mesh(right_wingtip_tetherGeom, frameMat);
  right_wingtip_tether.name = "right_wingtip_tether";
  frame_group.add(right_wingtip_tether);

  const bottom_reinforcementShape = polygonShape([
    [-0.10, -2.24],
    [0.10, -2.24],
    [0.065, -2.43],
    [0, -2.49],
    [-0.065, -2.43],
  ]);
  const bottom_reinforcementGeom = new THREE.ShapeGeometry(bottom_reinforcementShape);
  const bottom_reinforcement = new THREE.Mesh(
    bottom_reinforcementGeom,
    reinforcementMat
  );
  bottom_reinforcement.name = "bottom_reinforcement";
  bottom_reinforcement.position.z = 0.055;
  sail_group.add(bottom_reinforcement);

  const bottom_connectorGeom = new THREE.BoxGeometry(0.09, 0.16, 0.05);
  const bottom_connector = new THREE.Mesh(bottom_connectorGeom, frameMat);
  bottom_connector.name = "bottom_connector";
  bottom_connector.position.set(0, -2.42, 0.058);
  frame_group.add(bottom_connector);

  const bottom_loopGeom = tubeFromPoints(
    [
      new THREE.Vector3(0, -2.46, 0.058),
      new THREE.Vector3(-0.075, -2.58, 0.058),
      new THREE.Vector3(-0.075, -2.76, 0.058),
      new THREE.Vector3(0, -2.85, 0.058),
      new THREE.Vector3(0.075, -2.76, 0.058),
      new THREE.Vector3(0.075, -2.58, 0.058),
    ],
    0.012,
    36,
    7,
    true
  );
  const bottom_loop = new THREE.Mesh(bottom_loopGeom, frameMat);
  bottom_loop.name = "bottom_loop";
  frame_group.add(bottom_loop);

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
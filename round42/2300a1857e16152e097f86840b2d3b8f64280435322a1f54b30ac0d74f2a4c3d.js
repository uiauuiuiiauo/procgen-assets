export default function generate(THREE) {
  const root = new THREE.Group();
  const sole_group = new THREE.Group();
  const upper_group = new THREE.Group();
  const hardware_group = new THREE.Group();
  root.add(sole_group, upper_group, hardware_group);

  const outsoleMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.8,
  });
  const midsoleMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.7,
  });
  const footbedMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.7,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.7,
  });
  const patterned_upperMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const white_zebraMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1e9,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function createFootprintShape() {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1.62);
    shape.bezierCurveTo(-0.34, -1.62, -0.50, -1.54, -0.52, -1.38);
    shape.bezierCurveTo(-0.50, -1.05, -0.46, -0.72, -0.44, -0.48);
    shape.bezierCurveTo(-0.42, -0.10, -0.50, 0.48, -0.58, 0.92);
    shape.bezierCurveTo(-0.63, 1.22, -0.57, 1.46, -0.36, 1.57);
    shape.bezierCurveTo(-0.18, 1.67, 0.18, 1.67, 0.36, 1.57);
    shape.bezierCurveTo(0.57, 1.46, 0.63, 1.22, 0.58, 0.92);
    shape.bezierCurveTo(0.50, 0.48, 0.42, -0.10, 0.44, -0.48);
    shape.bezierCurveTo(0.46, -0.72, 0.50, -1.05, 0.52, -1.38);
    shape.bezierCurveTo(0.50, -1.54, 0.34, -1.62, 0, -1.62);
    shape.closePath();
    return shape;
  }

  function createRoundedRectShape(width, length, radius) {
    const x = width / 2;
    const z = length / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-x + radius, -z);
    shape.lineTo(x - radius, -z);
    shape.quadraticCurveTo(x, -z, x, -z + radius);
    shape.lineTo(x, z - radius);
    shape.quadraticCurveTo(x, z, x - radius, z);
    shape.lineTo(-x + radius, z);
    shape.quadraticCurveTo(-x, z, -x, z - radius);
    shape.lineTo(-x, -z + radius);
    shape.quadraticCurveTo(-x, -z, -x + radius, -z);
    shape.closePath();
    return shape;
  }

  function createTube(points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 8, false),
      material
    );
  }

  const footprintShape = createFootprintShape();

  const outsoleGeom = new THREE.ExtrudeGeometry(footprintShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const outsole = new THREE.Mesh(outsoleGeom, outsoleMat);
  outsole.rotation.x = Math.PI / 2;
  outsole.position.y = 0.14;
  sole_group.add(outsole);

  const midsoleGeom = new THREE.ExtrudeGeometry(footprintShape, {
    depth: 0.11,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const midsole = new THREE.Mesh(midsoleGeom, midsoleMat);
  midsole.rotation.x = Math.PI / 2;
  midsole.position.y = 0.25;
  midsole.scale.set(0.985, 0.985, 1);
  sole_group.add(midsole);

  const footbedGeom = new THREE.ExtrudeGeometry(footprintShape, {
    depth: 0.08,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const footbed = new THREE.Mesh(footbedGeom, footbedMat);
  footbed.rotation.x = Math.PI / 2;
  footbed.position.y = 0.33;
  footbed.scale.set(0.94, 0.97, 1);
  sole_group.add(footbed);

  const footbed_rim = createTube([
    new THREE.Vector3(0, 0.35, -1.58),
    new THREE.Vector3(-0.42, 0.35, -1.53),
    new THREE.Vector3(-0.50, 0.35, -1.28),
    new THREE.Vector3(-0.43, 0.35, -0.45),
    new THREE.Vector3(-0.52, 0.35, 0.45),
    new THREE.Vector3(-0.58, 0.35, 1.22),
    new THREE.Vector3(-0.35, 0.35, 1.54),
    new THREE.Vector3(0, 0.35, 1.62),
    new THREE.Vector3(0.35, 0.35, 1.54),
    new THREE.Vector3(0.58, 0.35, 1.22),
    new THREE.Vector3(0.52, 0.35, 0.45),
    new THREE.Vector3(0.43, 0.35, -0.45),
    new THREE.Vector3(0.50, 0.35, -1.28),
    new THREE.Vector3(0.42, 0.35, -1.53),
  ], 0.025, trimMat, 72);
  sole_group.add(footbed_rim);

  const sole_seam = createTube([
    new THREE.Vector3(0, 0.245, -1.61),
    new THREE.Vector3(-0.48, 0.245, -1.54),
    new THREE.Vector3(-0.51, 0.245, -1.25),
    new THREE.Vector3(-0.44, 0.245, -0.40),
    new THREE.Vector3(-0.52, 0.245, 0.55),
    new THREE.Vector3(-0.58, 0.245, 1.35),
    new THREE.Vector3(0, 0.245, 1.64),
    new THREE.Vector3(0.58, 0.245, 1.35),
    new THREE.Vector3(0.52, 0.245, 0.55),
    new THREE.Vector3(0.44, 0.245, -0.40),
    new THREE.Vector3(0.51, 0.245, -1.25),
    new THREE.Vector3(0.48, 0.245, -1.54),
  ], 0.012, trimMat, 64);
  sole_group.add(sole_seam);

  const heel_logoGeom = new THREE.ExtrudeGeometry(
    createRoundedRectShape(0.42, 0.20, 0.075),
    {
      depth: 0.008,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.006,
      bevelSegments: 2,
      curveSegments: 10,
    }
  );
  const heel_logo = new THREE.Mesh(heel_logoGeom, trimMat);
  heel_logo.rotation.x = Math.PI / 2;
  heel_logo.position.set(0, 0.365, -1.08);
  sole_group.add(heel_logo);

  const heel_logo_markGeom = new THREE.TorusGeometry(0.055, 0.009, 6, 18);
  const heel_logo_left_mark = new THREE.Mesh(heel_logo_markGeom, midsoleMat);
  heel_logo_left_mark.rotation.x = Math.PI / 2;
  heel_logo_left_mark.scale.set(1.35, 0.65, 1);
  heel_logo_left_mark.position.set(-0.075, 0.374, -1.08);
  sole_group.add(heel_logo_left_mark);

  const heel_logo_right_mark = new THREE.Mesh(heel_logo_markGeom, midsoleMat);
  heel_logo_right_mark.rotation.x = Math.PI / 2;
  heel_logo_right_mark.scale.set(1.35, 0.65, 1);
  heel_logo_right_mark.position.set(0.075, 0.374, -1.08);
  sole_group.add(heel_logo_right_mark);

  const upperShape = new THREE.Shape();
  upperShape.moveTo(-0.82, 0.34);
  upperShape.lineTo(0.78, 0.34);
  upperShape.lineTo(0.76, 0.56);
  upperShape.bezierCurveTo(0.72, 0.82, 0.48, 1.20, 0.22, 1.38);
  upperShape.bezierCurveTo(0.12, 1.46, -0.02, 1.46, -0.13, 1.39);
  upperShape.bezierCurveTo(-0.40, 1.19, -0.68, 0.78, -0.82, 0.50);
  upperShape.closePath();

  const patterned_upperGeom = new THREE.ExtrudeGeometry(upperShape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 16,
  });
  patterned_upperGeom.translate(0, 0, -0.03);

  const left_patterned_upper = new THREE.Mesh(
    patterned_upperGeom,
    patterned_upperMat
  );
  left_patterned_upper.rotation.y = Math.PI / 2;
  left_patterned_upper.position.x = -0.40;
  upper_group.add(left_patterned_upper);

  const right_patterned_upper = new THREE.Mesh(
    patterned_upperGeom,
    patterned_upperMat
  );
  right_patterned_upper.rotation.y = Math.PI / 2;
  right_patterned_upper.position.x = 0.40;
  upper_group.add(right_patterned_upper);

  const zebraStripeShapes = [];

  function addZebraStripe(x0, y0, x1, y1, width0, width1) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + nx * width0, y0 + ny * width0);
    shape.lineTo(x1 + nx * width1, y1 + ny * width1);
    shape.lineTo(x1 - nx * width1, y1 - ny * width1);
    shape.lineTo(x0 - nx * width0, y0 - ny * width0);
    shape.closePath();
    zebraStripeShapes.push(shape);
  }

  addZebraStripe(-0.70, 0.39, -0.57, 1.02, 0.075, 0.105);
  addZebraStripe(-0.48, 0.35, -0.31, 1.25, 0.100, 0.075);
  addZebraStripe(-0.20, 0.35, -0.07, 1.39, 0.090, 0.110);
  addZebraStripe(0.10, 0.35, 0.17, 1.36, 0.110, 0.080);
  addZebraStripe(0.39, 0.35, 0.48, 1.13, 0.095, 0.075);
  addZebraStripe(0.68, 0.38, 0.61, 0.78, 0.080, 0.100);
  addZebraStripe(-0.12, 0.54, 0.25, 0.80, 0.065, 0.085);
  addZebraStripe(-0.30, 0.90, 0.05, 1.12, 0.055, 0.070);

  const zebra_stripesGeom = new THREE.ShapeGeometry(zebraStripeShapes, 12);
  zebra_stripesGeom.rotateY(Math.PI / 2);

  const left_zebra_stripes = new THREE.Mesh(
    zebra_stripesGeom,
    white_zebraMat
  );
  left_zebra_stripes.position.x = -0.449;
  upper_group.add(left_zebra_stripes);

  const right_zebra_stripes = new THREE.Mesh(
    zebra_stripesGeom,
    white_zebraMat
  );
  right_zebra_stripes.position.x = 0.449;
  upper_group.add(right_zebra_stripes);

  const left_lower_trim = createTube([
    new THREE.Vector3(-0.452, 0.38, -0.78),
    new THREE.Vector3(-0.452, 0.43, -0.42),
    new THREE.Vector3(-0.452, 0.40, 0.00),
    new THREE.Vector3(-0.452, 0.43, 0.42),
    new THREE.Vector3(-0.452, 0.38, 0.75),
  ], 0.018, trimMat, 28);
  upper_group.add(left_lower_trim);

  const right_lower_trim = createTube([
    new THREE.Vector3(0.452, 0.38, -0.78),
    new THREE.Vector3(0.452, 0.43, -0.42),
    new THREE.Vector3(0.452, 0.40, 0.00),
    new THREE.Vector3(0.452, 0.43, 0.42),
    new THREE.Vector3(0.452, 0.38, 0.75),
  ], 0.018, trimMat, 28);
  upper_group.add(right_lower_trim);

  const left_outer_trim = createTube([
    new THREE.Vector3(-0.452, 0.48, -0.80),
    new THREE.Vector3(-0.452, 0.76, -0.67),
    new THREE.Vector3(-0.452, 1.12, -0.42),
    new THREE.Vector3(-0.452, 1.38, -0.13),
    new THREE.Vector3(-0.452, 1.44, 0.02),
    new THREE.Vector3(-0.452, 1.34, 0.25),
    new THREE.Vector3(-0.452, 0.95, 0.58),
    new THREE.Vector3(-0.452, 0.57, 0.75),
  ], 0.025, trimMat, 40);
  upper_group.add(left_outer_trim);

  const right_outer_trim = createTube([
    new THREE.Vector3(0.452, 0.48, -0.80),
    new THREE.Vector3(0.452, 0.76, -0.67),
    new THREE.Vector3(0.452, 1.12, -0.42),
    new THREE.Vector3(0.452, 1.38, -0.13),
    new THREE.Vector3(0.452, 1.44, 0.02),
    new THREE.Vector3(0.452, 1.34, 0.25),
    new THREE.Vector3(0.452, 0.95, 0.58),
    new THREE.Vector3(0.452, 0.57, 0.75),
  ], 0.025, trimMat, 40);
  upper_group.add(right_outer_trim);

  const zipperPath = [
    new THREE.Vector3(0, 0.57, 0.72),
    new THREE.Vector3(0, 0.79, 0.55),
    new THREE.Vector3(0, 1.08, 0.34),
    new THREE.Vector3(0, 1.34, 0.08),
    new THREE.Vector3(0, 1.42, -0.06),
    new THREE.Vector3(0, 1.34, -0.20),
    new THREE.Vector3(0, 1.10, -0.42),
    new THREE.Vector3(0, 0.76, -0.65),
    new THREE.Vector3(0, 0.55, -0.76),
  ];

  const left_zipper_tape = createTube(
    zipperPath.map((point) => new THREE.Vector3(point.x - 0.052, point.y, point.z)),
    0.038,
    white_zebraMat,
    48
  );
  upper_group.add(left_zipper_tape);

  const right_zipper_tape = createTube(
    zipperPath.map((point) => new THREE.Vector3(point.x + 0.052, point.y, point.z)),
    0.038,
    white_zebraMat,
    48
  );
  upper_group.add(right_zipper_tape);

  const left_zipper_track = createTube(
    zipperPath.map((point) => new THREE.Vector3(point.x - 0.052, point.y, point.z)),
    0.012,
    silverMat,
    48
  );
  hardware_group.add(left_zipper_track);

  const right_zipper_track = createTube(
    zipperPath.map((point) => new THREE.Vector3(point.x + 0.052, point.y, point.z)),
    0.012,
    silverMat,
    48
  );
  hardware_group.add(right_zipper_track);

  const zipperCurve = new THREE.CatmullRomCurve3(
    zipperPath,
    false,
    "centripetal"
  );
  const zipper_teethGeom = new THREE.BoxGeometry(0.115, 0.026, 0.043);
  const zipper_teeth = new THREE.InstancedMesh(
    zipper_teethGeom,
    silverMat,
    30
  );
  const toothTransform = new THREE.Object3D();
  for (let i = 0; i < 30; i++) {
    const t = 0.025 + (i / 29) * 0.95;
    const point = zipperCurve.getPoint(t);
    const tangent = zipperCurve.getTangent(t).normalize();
    toothTransform.position.copy(point);
    toothTransform.rotation.set(
      -Math.atan2(tangent.z, tangent.y),
      0,
      0
    );
    toothTransform.scale.set(1, 1, 1);
    toothTransform.updateMatrix();
    zipper_teeth.setMatrixAt(i, toothTransform.matrix);
  }
  zipper_teeth.instanceMatrix.needsUpdate = true;
  hardware_group.add(zipper_teeth);

  const zipper_sliderGeom = new THREE.BoxGeometry(0.19, 0.075, 0.13);
  const zipper_slider = new THREE.Mesh(zipper_sliderGeom, silverMat);
  zipper_slider.position.set(0, 1.405, -0.035);
  zipper_slider.rotation.x = -0.12;
  hardware_group.add(zipper_slider);

  const zipper_pull_connector = createTube([
    new THREE.Vector3(0.02, 1.43, -0.04),
    new THREE.Vector3(0.10, 1.48, -0.035),
    new THREE.Vector3(0.18, 1.47, -0.025),
  ], 0.018, silverMat, 12);
  hardware_group.add(zipper_pull_connector);

  const zipper_pull_ringGeom = new THREE.TorusGeometry(0.065, 0.014, 8, 20);
  const zipper_pull_ring = new THREE.Mesh(zipper_pull_ringGeom, silverMat);
  zipper_pull_ring.rotation.y = Math.PI / 2;
  zipper_pull_ring.scale.set(0.72, 1.18, 1);
  zipper_pull_ring.position.set(0.19, 1.45, -0.025);
  hardware_group.add(zipper_pull_ring);

  const zipper_pull_tabGeom = new THREE.BoxGeometry(0.035, 0.045, 0.15);
  const zipper_pull_tab = new THREE.Mesh(zipper_pull_tabGeom, silverMat);
  zipper_pull_tab.position.set(0.205, 1.36, 0.015);
  zipper_pull_tab.rotation.x = -0.35;
  hardware_group.add(zipper_pull_tab);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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
}
export default function generate(THREE) {
  const root = new THREE.Group();
  const feather = new THREE.Group();
  feather.name = "feather";
  feather.rotation.z = -0.36;
  root.add(feather);

  const vaneMat = new THREE.MeshStandardMaterial({
    color: 0xf1f0ec,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const barbMat = new THREE.LineBasicMaterial({
    color: 0xb8b5ad,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });

  const downMat = new THREE.LineBasicMaterial({
    color: 0xc8c5bd,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
  });

  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xded9cc,
    metalness: 0.0,
    roughness: 0.7,
  });

  const shaftHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xf3efe5,
    metalness: 0.0,
    roughness: 0.7,
  });

  const cutMat = new THREE.MeshStandardMaterial({
    color: 0x665b4d,
    metalness: 0.0,
    roughness: 0.8,
  });

  const vaneShape = new THREE.Shape();
  vaneShape.moveTo(-0.015, -0.55);
  vaneShape.bezierCurveTo(-0.12, -0.50, -0.25, -0.28, -0.30, 0.04);
  vaneShape.bezierCurveTo(-0.36, 0.40, -0.34, 0.82, -0.25, 1.15);
  vaneShape.bezierCurveTo(-0.18, 1.40, -0.05, 1.57, 0.09, 1.60);
  vaneShape.bezierCurveTo(0.22, 1.60, 0.34, 1.45, 0.37, 1.22);
  vaneShape.bezierCurveTo(0.40, 0.94, 0.37, 0.63, 0.31, 0.34);
  vaneShape.bezierCurveTo(0.25, 0.06, 0.14, -0.34, -0.015, -0.55);
  vaneShape.closePath();

  const vaneGeom = new THREE.ShapeGeometry(vaneShape, 36);
  const vane = new THREE.Mesh(vaneGeom, vaneMat);
  vane.name = "vane";
  vane.position.z = -0.008;
  vane.renderOrder = 0;
  feather.add(vane);

  function shaftX(y) {
    const t = Math.max(0, Math.min(1, (y + 0.55) / 2.15));
    return -0.015 + 0.11 * t + 0.018 * Math.sin(Math.PI * t);
  }

  function vaneHalfWidth(y) {
    const t = Math.max(0, Math.min(1, (y + 0.55) / 2.15));
    const envelope = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.68);
    return 0.025 + 0.355 * envelope * (0.88 + 0.18 * t);
  }

  const barbPoints = [];
  const barbCount = 78;
  for (let i = 0; i < barbCount; i++) {
    const y = -0.42 + (i / (barbCount - 1)) * 1.91;
    const edgeY = Math.min(1.54, y + 0.075 + 0.055 * (1 - i / barbCount));
    const leftX = shaftX(y) - vaneHalfWidth(edgeY) * 0.97;
    const rightX = shaftX(edgeY) + vaneHalfWidth(edgeY) * 0.97;

    barbPoints.push(
      new THREE.Vector3(shaftX(y) - 0.006, y, 0.012),
      new THREE.Vector3(leftX, edgeY, 0.012),
      new THREE.Vector3(shaftX(y) + 0.006, y, 0.012),
      new THREE.Vector3(rightX, edgeY, 0.012)
    );
  }

  const barbLinesGeom = new THREE.BufferGeometry().setFromPoints(barbPoints);
  const barb_lines = new THREE.LineSegments(barbLinesGeom, barbMat);
  barb_lines.name = "barb_lines";
  barb_lines.renderOrder = 1;
  feather.add(barb_lines);

  const downPoints = [];
  const downCount = 18;
  for (let i = 0; i < downCount; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const y = -0.54 + (i / (downCount - 1)) * 0.34;
    const reach = 0.18 + 0.12 * (0.5 + 0.5 * Math.sin(i * 2.17));
    const endY = y - 0.10 + 0.17 * Math.sin(i * 1.31);
    const start = new THREE.Vector3(shaftX(y), y, 0.004);
    const middle = new THREE.Vector3(
      shaftX(y) + side * reach * 0.48,
      y - 0.015 + 0.055 * Math.sin(i * 0.83),
      0.004
    );
    const end = new THREE.Vector3(
      shaftX(y) + side * reach,
      endY,
      0.004
    );
    downPoints.push(start, middle, middle.clone(), end);
  }

  const downyBarbsGeom = new THREE.BufferGeometry().setFromPoints(downPoints);
  const downy_barbs = new THREE.LineSegments(downyBarbsGeom, downMat);
  downy_barbs.name = "downy_barbs";
  downy_barbs.renderOrder = 1;
  feather.add(downy_barbs);

  const shaft = new THREE.Group();
  shaft.name = "shaft";
  feather.add(shaft);

  function makeShaftSegment(name, y0, y1, radius0, radius1) {
    const length = y1 - y0;
    const geometry = new THREE.CylinderGeometry(
      radius1,
      radius0,
      length,
      16,
      1,
      false
    );
    const mesh = new THREE.Mesh(geometry, shaftMat);
    mesh.name = name;
    mesh.position.set(
      (shaftX(y0) + shaftX(y1)) * 0.5,
      (y0 + y1) * 0.5,
      0.025
    );
    shaft.add(mesh);
    return mesh;
  }

  const shaft_base = makeShaftSegment(
    "shaft_base",
    -1.70,
    -1.18,
    0.018,
    0.023
  );
  const shaft_lower = makeShaftSegment(
    "shaft_lower",
    -1.18,
    -0.63,
    0.023,
    0.029
  );
  const shaft_mid = makeShaftSegment(
    "shaft_mid",
    -0.63,
    -0.08,
    0.029,
    0.031
  );
  const shaft_upper = makeShaftSegment(
    "shaft_upper",
    -0.08,
    0.52,
    0.031,
    0.026
  );
  const shaft_rachis = makeShaftSegment(
    "shaft_rachis",
    0.52,
    1.08,
    0.026,
    0.016
  );
  const shaft_tip = makeShaftSegment(
    "shaft_tip",
    1.08,
    1.59,
    0.016,
    0.005
  );

  const highlightPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(shaftX(-1.68) - 0.004, -1.68, 0.044),
      new THREE.Vector3(shaftX(-1.18) - 0.006, -1.18, 0.050),
      new THREE.Vector3(shaftX(-0.63) - 0.007, -0.63, 0.056),
      new THREE.Vector3(shaftX(-0.08) - 0.007, -0.08, 0.057),
      new THREE.Vector3(shaftX(0.52) - 0.006, 0.52, 0.052),
      new THREE.Vector3(shaftX(1.08) - 0.004, 1.08, 0.042),
      new THREE.Vector3(shaftX(1.56) - 0.002, 1.56, 0.030),
    ],
    false,
    "centripetal"
  );

  const shaftHighlightGeom = new THREE.TubeGeometry(
    highlightPath,
    64,
    0.0035,
    6,
    false
  );
  const shaft_highlight = new THREE.Mesh(
    shaftHighlightGeom,
    shaftHighlightMat
  );
  shaft_highlight.name = "shaft_highlight";
  shaft.add(shaft_highlight);

  const quill_cutGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.012,
    16
  );
  const quill_cut = new THREE.Mesh(quill_cutGeom, cutMat);
  quill_cut.name = "quill_cut";
  quill_cut.position.set(shaftX(-1.70), -1.704, 0.025);
  shaft.add(quill_cut);

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
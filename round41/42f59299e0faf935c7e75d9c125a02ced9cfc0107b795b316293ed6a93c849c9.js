export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "burgundy_fedora_hat";

  const feltMat = new THREE.MeshStandardMaterial({
    color: 0x7d1731,
    metalness: 0.0,
    roughness: 0.95,
  });
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0x71152d,
    metalness: 0.0,
    roughness: 0.95,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x651226,
    metalness: 0.0,
    roughness: 0.95,
  });
  const creaseMat = new THREE.MeshStandardMaterial({
    color: 0x591020,
    metalness: 0.0,
    roughness: 0.95,
  });
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0x21171b,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const featherShaftMat = new THREE.MeshStandardMaterial({
    color: 0xb9a49a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const eyeletMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8,
  });

  const brim_group = new THREE.Group();
  brim_group.name = "brim_group";
  root.add(brim_group);

  const brimShape = new THREE.Shape();
  brimShape.moveTo(0, 0.78);
  brimShape.bezierCurveTo(0.62, 0.80, 1.08, 0.57, 1.20, 0.16);
  brimShape.bezierCurveTo(1.29, -0.18, 1.04, -0.52, 0.56, -0.64);
  brimShape.bezierCurveTo(0.20, -0.70, -0.20, -0.70, -0.56, -0.64);
  brimShape.bezierCurveTo(-1.04, -0.52, -1.29, -0.18, -1.20, 0.16);
  brimShape.bezierCurveTo(-1.08, 0.57, -0.62, 0.80, 0, 0.78);
  brimShape.closePath();

  const brimGeom = new THREE.ExtrudeGeometry(brimShape, {
    depth: 0.055,
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const brim = new THREE.Mesh(brimGeom, feltMat);
  brim.name = "brim";
  brim.rotation.x = Math.PI / 2;
  brim.position.y = 0.08;
  brim_group.add(brim);

  const brimEdgePoints = [];
  for (let i = 0; i < 48; i++) {
    const angle = i / 48 * Math.PI * 2;
    const sideLift = 0.012 * Math.abs(Math.cos(angle));
    const frontLift = 0.006 * Math.max(0, Math.sin(angle));
    brimEdgePoints.push(new THREE.Vector3(
      Math.cos(angle) * 1.20,
      0.065 + sideLift + frontLift,
      Math.sin(angle) * 0.70
    ));
  }
  const brim_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(brimEdgePoints, true, "centripetal"),
    96,
    0.024,
    8,
    true
  );
  const brim_edge = new THREE.Mesh(brim_edgeGeom, edgeMat);
  brim_edge.name = "brim_edge";
  brim_group.add(brim_edge);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  root.add(crown_group);

  const crownProfile = [
    new THREE.Vector2(0.00, 0.08),
    new THREE.Vector2(0.62, 0.08),
    new THREE.Vector2(0.68, 0.12),
    new THREE.Vector2(0.68, 0.22),
    new THREE.Vector2(0.66, 0.40),
    new THREE.Vector2(0.62, 0.60),
    new THREE.Vector2(0.56, 0.75),
    new THREE.Vector2(0.46, 0.83),
    new THREE.Vector2(0.34, 0.86),
    new THREE.Vector2(0.22, 0.82),
    new THREE.Vector2(0.10, 0.74),
    new THREE.Vector2(0.00, 0.70),
  ];
  const crownGeom = new THREE.LatheGeometry(crownProfile, 64);
  const crown = new THREE.Mesh(crownGeom, feltMat);
  crown.name = "crown";
  crown.scale.z = 0.82;
  crown_group.add(crown);

  const crown_top_creaseGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.30, 0.835, 0),
      new THREE.Vector3(-0.16, 0.785, 0),
      new THREE.Vector3(0.00, 0.715, 0),
      new THREE.Vector3(0.16, 0.785, 0),
      new THREE.Vector3(0.30, 0.835, 0),
    ], false, "centripetal"),
    28,
    0.014,
    7,
    false
  );
  const crown_top_crease = new THREE.Mesh(crown_top_creaseGeom, creaseMat);
  crown_top_crease.name = "crown_top_crease";
  crown_group.add(crown_top_crease);

  const hatbandGeom = new THREE.CylinderGeometry(0.665, 0.695, 0.25, 64, 1, true);
  const hatband = new THREE.Mesh(hatbandGeom, bandMat);
  hatband.name = "hatband";
  hatband.position.y = 0.245;
  hatband.scale.z = 0.82;
  crown_group.add(hatband);

  const hatband_top_edgeGeom = new THREE.TorusGeometry(0.663, 0.009, 7, 64);
  const hatband_top_edge = new THREE.Mesh(hatband_top_edgeGeom, edgeMat);
  hatband_top_edge.name = "hatband_top_edge";
  hatband_top_edge.rotation.x = Math.PI / 2;
  hatband_top_edge.position.y = 0.37;
  hatband_top_edge.scale.y = 0.82;
  crown_group.add(hatband_top_edge);

  const hatband_bottom_edgeGeom = new THREE.TorusGeometry(0.69, 0.010, 7, 64);
  const hatband_bottom_edge = new THREE.Mesh(hatband_bottom_edgeGeom, edgeMat);
  hatband_bottom_edge.name = "hatband_bottom_edge";
  hatband_bottom_edge.rotation.x = Math.PI / 2;
  hatband_bottom_edge.position.y = 0.12;
  hatband_bottom_edge.scale.y = 0.82;
  crown_group.add(hatband_bottom_edge);

  const bow_group = new THREE.Group();
  bow_group.name = "bow_group";
  const bowAngle = 0.68;
  const bowNormal = new THREE.Vector3(
    Math.cos(bowAngle),
    0,
    Math.sin(bowAngle)
  ).normalize();
  bow_group.position.set(
    Math.cos(bowAngle) * 0.705,
    0.25,
    Math.sin(bowAngle) * 0.575
  );
  bow_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    bowNormal
  );
  crown_group.add(bow_group);

  const bowLeftShape = new THREE.Shape();
  bowLeftShape.moveTo(-0.015, 0.025);
  bowLeftShape.bezierCurveTo(-0.12, 0.09, -0.34, 0.09, -0.41, 0.025);
  bowLeftShape.bezierCurveTo(-0.39, -0.07, -0.13, -0.08, -0.015, -0.025);
  bowLeftShape.closePath();

  const bow_rightShape = new THREE.Shape();
  bow_rightShape.moveTo(0.015, 0.025);
  bow_rightShape.bezierCurveTo(0.12, 0.085, 0.31, 0.075, 0.37, 0.01);
  bow_rightShape.bezierCurveTo(0.34, -0.075, 0.12, -0.075, 0.015, -0.025);
  bow_rightShape.closePath();

  const bowExtrudeOptions = {
    depth: 0.026,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  };

  const bow_leftGeom = new THREE.ExtrudeGeometry(bowLeftShape, bowExtrudeOptions);
  const bow_left = new THREE.Mesh(bow_leftGeom, bandMat);
  bow_left.name = "bow_left";
  bow_group.add(bow_left);

  const bow_rightGeom = new THREE.ExtrudeGeometry(bow_rightShape, bowExtrudeOptions);
  const bow_right = new THREE.Mesh(bow_rightGeom, bandMat);
  bow_right.name = "bow_right";
  bow_group.add(bow_right);

  const bow_tailGeom = new THREE.BoxGeometry(0.17, 0.045, 0.024);
  const bow_tail = new THREE.Mesh(bow_tailGeom, bandMat);
  bow_tail.name = "bow_tail";
  bow_tail.position.set(0.11, -0.045, 0.018);
  bow_tail.rotation.z = -0.18;
  bow_group.add(bow_tail);

  const bow_knotGeom = new THREE.SphereGeometry(1, 20, 12);
  const bow_knot = new THREE.Mesh(bow_knotGeom, bandMat);
  bow_knot.name = "bow_knot";
  bow_knot.position.set(0, 0, 0.045);
  bow_knot.scale.set(0.075, 0.085, 0.052);
  bow_group.add(bow_knot);

  const feather_group = new THREE.Group();
  feather_group.name = "feather_group";
  feather_group.position.set(0.35, 0.27, 0.55);
  feather_group.rotation.set(-0.08, 0, -0.35);
  crown_group.add(feather_group);

  const featherShape = new THREE.Shape();
  featherShape.moveTo(0.00, 0.00);
  featherShape.bezierCurveTo(0.025, 0.13, 0.045, 0.25, 0.065, 0.36);
  featherShape.bezierCurveTo(0.095, 0.52, 0.145, 0.72, 0.18, 0.84);
  featherShape.bezierCurveTo(0.12, 0.77, 0.075, 0.69, 0.045, 0.59);
  featherShape.bezierCurveTo(0.018, 0.48, -0.005, 0.29, 0.00, 0.00);
  featherShape.closePath();

  const feather_vaneGeom = new THREE.ShapeGeometry(featherShape, 28);
  const feather_vane = new THREE.Mesh(feather_vaneGeom, featherMat);
  feather_vane.name = "feather_vane";
  feather_group.add(feather_vane);

  const feather_shaftGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.00, -0.035, 0.012),
      new THREE.Vector3(0.025, 0.18, 0.012),
      new THREE.Vector3(0.065, 0.39, 0.012),
      new THREE.Vector3(0.11, 0.62, 0.012),
      new THREE.Vector3(0.18, 0.84, 0.012),
    ], false, "centripetal"),
    32,
    0.008,
    7,
    false
  );
  const feather_shaft = new THREE.Mesh(feather_shaftGeom, featherShaftMat);
  feather_shaft.name = "feather_shaft";
  feather_group.add(feather_shaft);

  const featherBarbPairs = [
    [0.025, 0.14, 0.005, 0.17],
    [0.038, 0.23, 0.085, 0.28],
    [0.052, 0.32, 0.002, 0.37],
    [0.075, 0.43, 0.135, 0.49],
    [0.098, 0.54, 0.055, 0.61],
    [0.125, 0.65, 0.185, 0.72],
    [0.150, 0.75, 0.125, 0.81],
  ];
  const feather_barbsGeom = new THREE.CylinderGeometry(0.003, 0.003, 1, 6);
  const feather_barbs = new THREE.InstancedMesh(
    feather_barbsGeom,
    featherShaftMat,
    featherBarbPairs.length
  );
  feather_barbs.name = "feather_barbs";
  const barbUp = new THREE.Vector3(0, 1, 0);
  const barbMatrix = new THREE.Matrix4();
  for (let i = 0; i < featherBarbPairs.length; i++) {
    const pair = featherBarbPairs[i];
    const start = new THREE.Vector3(pair[0], pair[1], 0.016);
    const end = new THREE.Vector3(pair[2], pair[3], 0.016);
    const direction = end.clone().sub(start);
    const length = direction.length();
    const midpoint = start.clone().add(end).multiplyScalar(0.5);
    const rotation = new THREE.Quaternion().setFromUnitVectors(
      barbUp,
      direction.normalize()
    );
    barbMatrix.compose(
      midpoint,
      rotation,
      new THREE.Vector3(1, length, 1)
    );
    feather_barbs.setMatrixAt(i, barbMatrix);
  }
  feather_barbs.instanceMatrix.needsUpdate = true;
  feather_group.add(feather_barbs);

  const feather_clipGeom = new THREE.BoxGeometry(0.12, 0.055, 0.055);
  const feather_clip = new THREE.Mesh(feather_clipGeom, bandMat);
  feather_clip.name = "feather_clip";
  feather_clip.position.set(0.015, 0.025, 0.018);
  feather_clip.rotation.z = -0.28;
  feather_group.add(feather_clip);

  const eyelet_group = new THREE.Group();
  eyelet_group.name = "eyelet_group";
  const eyeletAngle = 0.92;
  const eyeletNormal = new THREE.Vector3(
    Math.cos(eyeletAngle),
    0,
    Math.sin(eyeletAngle)
  ).normalize();
  eyelet_group.position.set(
    Math.cos(eyeletAngle) * 0.615,
    0.54,
    Math.sin(eyeletAngle) * 0.50
  );
  eyelet_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    eyeletNormal
  );
  crown_group.add(eyelet_group);

  const eyelet_holeGeom = new THREE.CircleGeometry(0.024, 20);
  const eyelet_hole = new THREE.Mesh(eyelet_holeGeom, holeMat);
  eyelet_hole.name = "eyelet_hole";
  eyelet_hole.position.z = 0.002;
  eyelet_group.add(eyelet_hole);

  const eyelet_ringGeom = new THREE.TorusGeometry(0.031, 0.008, 8, 24);
  const eyelet_ring = new THREE.Mesh(eyelet_ringGeom, eyeletMat);
  eyelet_ring.name = "eyelet_ring";
  eyelet_ring.position.z = 0.008;
  eyelet_group.add(eyelet_ring);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}
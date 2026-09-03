export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "denim_baseball_cap";

  const crownMat = new THREE.MeshStandardMaterial({
    color: 0x285b9d,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x173f76,
    metalness: 0.0,
    roughness: 0.95,
  });
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x6f96c5,
    metalness: 0.0,
    roughness: 0.95,
  });
  const darkFabricMat = new THREE.MeshStandardMaterial({
    color: 0x111820,
    metalness: 0.0,
    roughness: 0.95,
  });
  const whiteFabricMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1e9,
    metalness: 0.0,
    roughness: 0.95,
  });

  const crownRX = 0.56;
  const crownRY = 0.56;
  const crownRZ = 0.46;
  const crownCY = 0.10;
  const crownCZ = -0.08;

  const brimShape = new THREE.Shape();
  brimShape.moveTo(-0.46, 0.02);
  brimShape.bezierCurveTo(-0.24, 0.09, 0.24, 0.09, 0.46, 0.02);
  brimShape.bezierCurveTo(0.58, 0.15, 0.64, 0.46, 0.50, 0.70);
  brimShape.bezierCurveTo(0.32, 0.83, -0.32, 0.83, -0.50, 0.70);
  brimShape.bezierCurveTo(-0.64, 0.46, -0.58, 0.15, -0.46, 0.02);
  brimShape.closePath();

  const brimGeom = new THREE.ExtrudeGeometry(brimShape, {
    depth: 0.038,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.014,
    bevelSegments: 3,
  });
  const brimMat = crownMat;
  const brim = new THREE.Mesh(brimGeom, brimMat);
  brim.name = "brim";
  brim.rotation.x = Math.PI / 2;
  brim.position.y = 0.075;
  root.add(brim);

  function brimLift(x, z) {
    const t = Math.max(0, Math.min(1, (z - 0.02) / 0.81));
    const side = Math.min(1, Math.abs(x) / 0.62);
    return 0.018 * t * t + 0.030 * side * side * t;
  }

  function brimUndersideY(x, z) {
    return 0.037 + brimLift(x, z);
  }

  const brim_undersideGeom = new THREE.ShapeGeometry(brimShape, 24);
  brim_undersideGeom.computeVertexNormals();
  const brim_undersideMat = new THREE.MeshStandardMaterial({
    color: 0x142f54,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const brim_underside = new THREE.Mesh(brim_undersideGeom, brim_undersideMat);
  brim_underside.name = "brim_underside";
  brim_underside.rotation.x = Math.PI / 2;
  brim_underside.position.y = brimUndersideY(0, 0);
  root.add(brim_underside);

  const brim_edgePoints = [];
  for (let i = 0; i <= 24; i++) {
    const angle = Math.PI - (i / 24) * Math.PI;
    const x = 0.50 * Math.cos(angle);
    const z = 0.08 + 0.72 * Math.sin(angle);
    brim_edgePoints.push(
      new THREE.Vector3(x, 0.075 + brimLift(x, z), z)
    );
  }
  const brim_edgeCurve = new THREE.CatmullRomCurve3(
    brim_edgePoints,
    false,
    "centripetal"
  );
  const brim_edgeGeom = new THREE.TubeGeometry(
    brim_edgeCurve,
    64,
    0.017,
    8,
    false
  );
  const brim_edgeMat = seamMat;
  const brim_edge = new THREE.Mesh(brim_edgeGeom, brim_edgeMat);
  brim_edge.name = "brim_edge";
  root.add(brim_edge);

  const brim_stitching = new THREE.Group();
  brim_stitching.name = "brim_stitching";
  for (let row = 0; row < 3; row++) {
    const rowPoints = [];
    const rowWidth = 0.47 - row * 0.018;
    const outerZ = 0.72 - row * 0.055;

    for (let i = 0; i <= 20; i++) {
      const u = -1 + (i / 20) * 2;
      const x = rowWidth * u;
      const z =
        0.08 +
        (outerZ - 0.08) * Math.sqrt(Math.max(0, 1 - u * u));
      rowPoints.push(
        new THREE.Vector3(x, 0.084 + brimLift(x, z), z)
      );
    }

    const rowCurve = new THREE.CatmullRomCurve3(
      rowPoints,
      false,
      "centripetal"
    );
    const rowGeom = new THREE.TubeGeometry(rowCurve, 48, 0.0032, 6, false);
    const rowMesh = new THREE.Mesh(rowGeom, stitchMat);
    rowMesh.name = "brim_stitch_row_" + row;
    brim_stitching.add(rowMesh);
  }
  root.add(brim_stitching);

  const crownGeom = new THREE.SphereGeometry(
    1,
    64,
    28,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const crown = new THREE.Mesh(crownGeom, crownMat);
  crown.name = "crown";
  crown.scale.set(crownRX, crownRY, crownRZ);
  crown.position.set(0, crownCY, crownCZ);
  root.add(crown);

  function crownSurface(angle, theta, offset) {
    const sinTheta = Math.sin(theta);
    const x = crownRX * sinTheta * Math.sin(angle);
    const y = crownCY + crownRY * Math.cos(theta);
    const z = crownCZ + crownRZ * sinTheta * Math.cos(angle);
    const normal = new THREE.Vector3(
      x / (crownRX * crownRX),
      (y - crownCY) / (crownRY * crownRY),
      (z - crownCZ) / (crownRZ * crownRZ)
    ).normalize();
    const pos = new THREE.Vector3(x, y, z).addScaledVector(normal, offset);
    return { pos, normal };
  }

  const crown_seams = new THREE.Group();
  crown_seams.name = "crown_seams";
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const seamPoints = [];
    for (let j = 0; j <= 18; j++) {
      const theta = 0.07 + (j / 18) * 1.45;
      seamPoints.push(crownSurface(angle, theta, 0.008).pos);
    }
    const seamCurve = new THREE.CatmullRomCurve3(
      seamPoints,
      false,
      "centripetal"
    );
    const seamGeom = new THREE.TubeGeometry(seamCurve, 36, 0.008, 7, false);
    const seam = new THREE.Mesh(seamGeom, seamMat);
    seam.name = "crown_seam_" + i;
    crown_seams.add(seam);
  }
  root.add(crown_seams);

  const crown_stitchesGeom = new THREE.BoxGeometry(0.026, 0.006, 0.006);
  const crown_stitchesMat = stitchMat;
  const crown_stitches = new THREE.InstancedMesh(
    crown_stitchesGeom,
    crown_stitchesMat,
    60
  );
  crown_stitches.name = "crown_stitches";
  const crown_stitchDummy = new THREE.Object3D();
  const localXAxis = new THREE.Vector3(1, 0, 0);
  let crownStitchIndex = 0;

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    for (let j = 0; j < 10; j++) {
      const theta = 0.18 + j * 0.13;
      const sample = crownSurface(angle, theta, 0.015);
      const before = crownSurface(angle, theta - 0.015, 0).pos;
      const after = crownSurface(angle, theta + 0.015, 0).pos;
      const tangent = after.sub(before).normalize();

      crown_stitchDummy.position.copy(sample.pos);
      crown_stitchDummy.quaternion.setFromUnitVectors(localXAxis, tangent);
      crown_stitchDummy.scale.set(1, 1, 1);
      crown_stitchDummy.updateMatrix();
      crown_stitches.setMatrixAt(crownStitchIndex, crown_stitchDummy.matrix);
      crownStitchIndex++;
    }
  }
  crown_stitches.instanceMatrix.needsUpdate = true;
  root.add(crown_stitches);

  const crown_bandPoints = [];
  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2;
    crown_bandPoints.push(crownSurface(angle, 1.515, 0.006).pos);
  }
  const crown_bandCurve = new THREE.CatmullRomCurve3(
    crown_bandPoints,
    true,
    "centripetal"
  );
  const crown_bandGeom = new THREE.TubeGeometry(
    crown_bandCurve,
    80,
    0.012,
    8,
    true
  );
  const crown_bandMat = seamMat;
  const crown_band = new THREE.Mesh(crown_bandGeom, crown_bandMat);
  crown_band.name = "crown_band";
  root.add(crown_band);

  const top_buttonGeom = new THREE.SphereGeometry(1, 24, 12);
  const top_buttonMat = crownMat;
  const top_button = new THREE.Mesh(top_buttonGeom, top_buttonMat);
  top_button.name = "top_button";
  top_button.scale.set(0.072, 0.025, 0.072);
  top_button.position.set(0, crownCY + crownRY + 0.012, crownCZ);
  root.add(top_button);

  const eyeletsGeom = new THREE.TorusGeometry(0.018, 0.005, 7, 18);
  const eyeletsMat = darkFabricMat;
  const eyelets = new THREE.InstancedMesh(eyeletsGeom, eyeletsMat, 6);
  eyelets.name = "eyelets";

  const eyelet_holesGeom = new THREE.CircleGeometry(0.013, 16);
  const eyelet_holesMat = darkFabricMat;
  const eyelet_holes = new THREE.InstancedMesh(
    eyelet_holesGeom,
    eyelet_holesMat,
    6
  );
  eyelet_holes.name = "eyelet_holes";

  const eyeletDummy = new THREE.Object3D();
  const eyeletHoleDummy = new THREE.Object3D();
  const localZAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 6 + (i / 6) * Math.PI * 2;
    const ringSample = crownSurface(angle, 0.62, 0.010);
    eyeletDummy.position.copy(ringSample.pos);
    eyeletDummy.quaternion.setFromUnitVectors(localZAxis, ringSample.normal);
    eyeletDummy.scale.set(1, 1, 1);
    eyeletDummy.updateMatrix();
    eyelets.setMatrixAt(i, eyeletDummy.matrix);

    const holeSample = crownSurface(angle, 0.62, 0.006);
    eyeletHoleDummy.position.copy(holeSample.pos);
    eyeletHoleDummy.quaternion.setFromUnitVectors(
      localZAxis,
      holeSample.normal
    );
    eyeletHoleDummy.scale.set(1, 1, 1);
    eyeletHoleDummy.updateMatrix();
    eyelet_holes.setMatrixAt(i, eyeletHoleDummy.matrix);
  }
  eyelets.instanceMatrix.needsUpdate = true;
  eyelet_holes.instanceMatrix.needsUpdate = true;
  root.add(eyelet_holes);
  root.add(eyelets);

  const rear_adjustment_strapGeom = new THREE.BoxGeometry(0.31, 0.075, 0.026);
  const rear_adjustment_strapMat = darkFabricMat;
  const rear_adjustment_strap = new THREE.Mesh(
    rear_adjustment_strapGeom,
    rear_adjustment_strapMat
  );
  rear_adjustment_strap.name = "rear_adjustment_strap";
  rear_adjustment_strap.position.set(0, 0.075, -0.548);
  root.add(rear_adjustment_strap);

  const rear_adjustment_tabGeom = new THREE.BoxGeometry(0.13, 0.105, 0.032);
  const rear_adjustment_tabMat = darkFabricMat;
  const rear_adjustment_tab = new THREE.Mesh(
    rear_adjustment_tabGeom,
    rear_adjustment_tabMat
  );
  rear_adjustment_tab.name = "rear_adjustment_tab";
  rear_adjustment_tab.position.set(0, 0.075, -0.565);
  root.add(rear_adjustment_tab);

  const logo_group = new THREE.Group();
  logo_group.name = "logo_group";
  const logoAngle = -0.34;
  const logoTheta = 1.02;
  const logoSurface = crownSurface(logoAngle, logoTheta, 0.009);
  logo_group.position.copy(logoSurface.pos);
  logo_group.quaternion.setFromUnitVectors(localZAxis, logoSurface.normal);
  root.add(logo_group);

  const logo_black_baseShape = new THREE.Shape();
  logo_black_baseShape.moveTo(-0.155, -0.030);
  logo_black_baseShape.bezierCurveTo(-0.125, -0.085, 0.060, -0.105, 0.160, -0.045);
  logo_black_baseShape.lineTo(0.145, 0.018);
  logo_black_baseShape.bezierCurveTo(0.045, -0.012, -0.075, -0.012, -0.150, 0.025);
  logo_black_baseShape.closePath();
  const logo_black_baseGeom = new THREE.ExtrudeGeometry(logo_black_baseShape, {
    depth: 0.009,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const logo_black_baseMat = darkFabricMat;
  const logo_black_base = new THREE.Mesh(
    logo_black_baseGeom,
    logo_black_baseMat
  );
  logo_black_base.name = "logo_black_base";
  logo_group.add(logo_black_base);

  const logo_black_loopShape = new THREE.Shape();
  logo_black_loopShape.moveTo(-0.020, 0.025);
  logo_black_loopShape.bezierCurveTo(-0.020, 0.105, 0.020, 0.155, 0.075, 0.150);
  logo_black_loopShape.bezierCurveTo(0.125, 0.145, 0.140, 0.095, 0.105, 0.055);
  logo_black_loopShape.lineTo(0.070, 0.020);
  logo_black_loopShape.closePath();

  const logo_black_loopHole = new THREE.Path();
  logo_black_loopHole.moveTo(0.020, 0.055);
  logo_black_loopHole.bezierCurveTo(0.040, 0.105, 0.075, 0.115, 0.090, 0.090);
  logo_black_loopHole.bezierCurveTo(0.100, 0.070, 0.080, 0.050, 0.020, 0.055);
  logo_black_loopHole.closePath();
  logo_black_loopShape.holes.push(logo_black_loopHole);

  const logo_black_loopGeom = new THREE.ExtrudeGeometry(logo_black_loopShape, {
    depth: 0.009,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.0025,
    bevelSize: 0.0025,
    bevelSegments: 2,
  });
  const logo_black_loopMat = darkFabricMat;
  const logo_black_loop = new THREE.Mesh(
    logo_black_loopGeom,
    logo_black_loopMat
  );
  logo_black_loop.name = "logo_black_loop";
  logo_black_loop.position.z = 0.002;
  logo_group.add(logo_black_loop);

  const logo_white_sailShape = new THREE.Shape();
  logo_white_sailShape.moveTo(-0.115, -0.005);
  logo_white_sailShape.lineTo(-0.105, 0.105);
  logo_white_sailShape.lineTo(-0.025, 0.090);
  logo_white_sailShape.lineTo(0.010, -0.010);
  logo_white_sailShape.closePath();
  const logo_white_sailGeom = new THREE.ExtrudeGeometry(logo_white_sailShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 2,
  });
  const logo_white_sailMat = whiteFabricMat;
  const logo_white_sail = new THREE.Mesh(
    logo_white_sailGeom,
    logo_white_sailMat
  );
  logo_white_sail.name = "logo_white_sail";
  logo_white_sail.position.z = 0.008;
  logo_group.add(logo_white_sail);

  const logo_white_sail_rightShape = new THREE.Shape();
  logo_white_sail_rightShape.moveTo(0.018, -0.005);
  logo_white_sail_rightShape.lineTo(0.052, 0.110);
  logo_white_sail_rightShape.lineTo(0.105, 0.070);
  logo_white_sail_rightShape.lineTo(0.115, -0.012);
  logo_white_sail_rightShape.closePath();
  const logo_white_sail_rightGeom = new THREE.ExtrudeGeometry(
    logo_white_sail_rightShape,
    {
      depth: 0.008,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.002,
      bevelSegments: 2,
    }
  );
  const logo_white_sail_rightMat = whiteFabricMat;
  const logo_white_sail_right = new THREE.Mesh(
    logo_white_sail_rightGeom,
    logo_white_sail_rightMat
  );
  logo_white_sail_right.name = "logo_white_sail_right";
  logo_white_sail_right.position.z = 0.008;
  logo_group.add(logo_white_sail_right);

  const logo_white_mastGeom = new THREE.BoxGeometry(0.017, 0.155, 0.010);
  const logo_white_mastMat = whiteFabricMat;
  const logo_white_mast = new THREE.Mesh(
    logo_white_mastGeom,
    logo_white_mastMat
  );
  logo_white_mast.name = "logo_white_mast";
  logo_white_mast.position.set(0.005, 0.045, 0.018);
  logo_white_mast.rotation.z = -0.12;
  logo_group.add(logo_white_mast);

  const logo_white_boomGeom = new THREE.BoxGeometry(0.205, 0.018, 0.011);
  const logo_white_boomMat = whiteFabricMat;
  const logo_white_boom = new THREE.Mesh(
    logo_white_boomGeom,
    logo_white_boomMat
  );
  logo_white_boom.name = "logo_white_boom";
  logo_white_boom.position.set(-0.010, 0.018, 0.019);
  logo_white_boom.rotation.z = 0.04;
  logo_group.add(logo_white_boom);

  const logo_white_hullGeom = logo_white_sailGeom;
  const logo_white_hullMat = whiteFabricMat;
  const logo_white_hull = new THREE.Mesh(
    logo_white_hullGeom,
    logo_white_hullMat
  );
  logo_white_hull.name = "logo_white_hull";
  logo_white_hull.scale.set(1.35, 0.34, 1);
  logo_white_hull.position.set(0.005, -0.030, 0.018);
  logo_group.add(logo_white_hull);

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

  fitToUnitCube(THREE, root);
  return root;
}
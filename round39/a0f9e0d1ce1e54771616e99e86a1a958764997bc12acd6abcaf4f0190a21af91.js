export default function generate(THREE) {
  const root = new THREE.Group();
  const basket = new THREE.Group();
  const lamp = new THREE.Group();
  root.add(basket, lamp);

  const sphereR = 0.46;
  const sphereY = 0.02;
  const frontOpeningR = 0.405;
  const ribCount = 15;
  const ribPlaneAngle = 0.18;

  const bambooMat = new THREE.MeshStandardMaterial({
    color: 0xc9a66b,
    metalness: 0.0,
    roughness: 0.9
  });
  const inner_bambooMat = new THREE.MeshStandardMaterial({
    color: 0xd18a38,
    metalness: 0.0,
    roughness: 0.9
  });
  const bindingMat = new THREE.MeshStandardMaterial({
    color: 0x3b3027,
    metalness: 0.0,
    roughness: 0.9
  });
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0x65462f,
    metalness: 0.0,
    roughness: 0.9
  });
  const waxMat = new THREE.MeshStandardMaterial({
    color: 0xffe7a3,
    metalness: 0.0,
    roughness: 0.7
  });
  const flame_outerMat = new THREE.MeshStandardMaterial({
    color: 0xffa52f,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xffa52f,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide
  });
  const flame_innerMat = new THREE.MeshStandardMaterial({
    color: 0xffffdf,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xffffdf,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.94,
    side: THREE.DoubleSide
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x241a14,
    metalness: 0.0,
    roughness: 0.9
  });

  function openingAngleAt(phi) {
    return frontOpeningR / sphereR *
      (1 + 0.025 * Math.cos(phi * 2 + 0.35));
  }

  function spherePoint(phi, theta, radius) {
    const sinTheta = Math.sin(theta);
    return new THREE.Vector3(
      radius * sinTheta * Math.cos(phi),
      sphereY + radius * Math.cos(theta),
      radius * sinTheta * Math.sin(phi)
    );
  }

  function meridianPoint(phi, theta, radius) {
    const offset = openingAngleAt(phi);
    const sinTheta = Math.sin(theta);
    return new THREE.Vector3(
      radius * sinTheta * Math.cos(phi + offset),
      sphereY + radius * Math.cos(theta),
      radius * sinTheta * Math.sin(phi + offset)
    );
  }

  function makeMeridianGeometry(radius, tubeRadius) {
    const points = [];
    const samples = 28;
    for (let i = 0; i <= samples; i++) {
      const theta = Math.PI * i / samples;
      points.push(meridianPoint(0, theta, radius));
    }
    const path = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(path, 64, tubeRadius, 8, false);
  }

  function makeOpeningLoopGeometry(theta, radius, tubeRadius) {
    const points = [];
    const segments = 56;
    for (let i = 0; i < segments; i++) {
      const phi = Math.PI * 2 * i / segments;
      points.push(meridianPoint(phi, theta, radius));
    }
    const path = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(path, 112, tubeRadius, 10, true);
  }

  function makeLatitudeGeometry(theta, radius, tubeRadius) {
    const points = [];
    const segments = 64;
    for (let i = 0; i < segments; i++) {
      const phi = Math.PI * 2 * i / segments;
      points.push(spherePoint(phi, theta, radius));
    }
    const path = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(path, 96, tubeRadius, 8, true);
  }

  const longitudinal_ribsGeom = makeMeridianGeometry(sphereR, 0.0115);
  const longitudinal_ribs = new THREE.InstancedMesh(
    longitudinal_ribsGeom,
    bambooMat,
    ribCount
  );
  const instanceMatrix = new THREE.Matrix4();
  for (let i = 0; i < ribCount; i++) {
    const phi = Math.PI * 2 * i / ribCount;
    instanceMatrix.makeRotationY(phi);
    longitudinal_ribs.setMatrixAt(i, instanceMatrix);
  }
  longitudinal_ribs.instanceMatrix.needsUpdate = true;
  basket.add(longitudinal_ribs);

  const inner_longitudinal_ribsGeom = makeMeridianGeometry(0.438, 0.008);
  const inner_longitudinal_ribs = new THREE.InstancedMesh(
    inner_longitudinal_ribsGeom,
    inner_bambooMat,
    ribCount
  );
  for (let i = 0; i < ribCount; i++) {
    const phi = Math.PI * 2 * (i + 0.5) / ribCount;
    instanceMatrix.makeRotationY(phi);
    inner_longitudinal_ribs.setMatrixAt(i, instanceMatrix);
  }
  inner_longitudinal_ribs.instanceMatrix.needsUpdate = true;
  basket.add(inner_longitudinal_ribs);

  const openingTheta = Math.acos(frontOpeningR / sphereR);

  const front_opening_rimGeom = makeOpeningLoopGeometry(
    openingTheta,
    sphereR,
    0.020
  );
  const front_opening_rim = new THREE.Mesh(
    front_opening_rimGeom,
    bambooMat
  );
  basket.add(front_opening_rim);

  const front_inner_rimGeom = makeOpeningLoopGeometry(
    openingTheta,
    0.438,
    0.012
  );
  const front_inner_rim = new THREE.Mesh(
    front_inner_rimGeom,
    inner_bambooMat
  );
  basket.add(front_inner_rim);

  const rear_polar_capGeom = new THREE.SphereGeometry(0.032, 18, 10);
  const rear_polar_cap = new THREE.Mesh(rear_polar_capGeom, bambooMat);
  rear_polar_cap.position.set(0, sphereY, -0.458);
  basket.add(rear_polar_cap);

  const latitude_rings = new THREE.Group();
  const latitudeAngles = [0.58, 1.02, 2.10, 2.56];
  for (let i = 0; i < latitudeAngles.length; i++) {
    const latitude_ringGeom = makeLatitudeGeometry(
      latitudeAngles[i],
      0.444,
      0.009
    );
    const latitude_ring = new THREE.Mesh(
      latitude_ringGeom,
      inner_bambooMat
    );
    latitude_ring.rotation.y = 0.035 * (i - 1.5);
    latitude_rings.add(latitude_ring);
  }
  basket.add(latitude_rings);

  const equatorTheta = Math.acos(frontOpeningR / 0.468);
  const equator_bandGeom = makeLatitudeGeometry(
    equatorTheta,
    0.468,
    0.011
  );
  const equator_band = new THREE.Mesh(equator_bandGeom, bambooMat);
  basket.add(equator_band);

  const equator_bindingGeom = makeLatitudeGeometry(
    equatorTheta,
    0.477,
    0.0045
  );
  const equator_binding = new THREE.Mesh(
    equator_bindingGeom,
    bindingMat
  );
  basket.add(equator_binding);

  const base_ringGeom = new THREE.TorusGeometry(0.19, 0.029, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, bambooMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = -0.463;
  basket.add(base_ring);

  const base_bindingGeom = new THREE.TorusGeometry(0.19, 0.0045, 8, 64);
  const base_binding = new THREE.Mesh(base_bindingGeom, bindingMat);
  base_binding.rotation.x = Math.PI / 2;
  base_binding.position.y = -0.436;
  basket.add(base_binding);

  const rib_node_marksGeom = new THREE.TorusGeometry(
    0.0122,
    0.0016,
    6,
    16
  );
  const rib_node_marks = new THREE.InstancedMesh(
    rib_node_marksGeom,
    nodeMat,
    ribCount * 2
  );
  const localAxis = new THREE.Vector3(0, 0, 1);
  const unitScale = new THREE.Vector3(1, 1, 1);
  let nodeIndex = 0;
  for (let i = 0; i < ribCount; i++) {
    const phi = Math.PI * 2 * i / ribCount;
    for (let j = 0; j < 2; j++) {
      const theta = 0.62 + 0.28 * ((i + j) % 4) + j * 0.16;
      const position = meridianPoint(phi, theta, sphereR);
      const before = meridianPoint(
        phi,
        Math.max(0.01, theta - 0.012),
        sphereR
      );
      const after = meridianPoint(
        phi,
        Math.min(Math.PI - 0.01, theta + 0.012),
        sphereR
      );
      const tangent = after.sub(before).normalize();
      const orientation = new THREE.Quaternion().setFromUnitVectors(
        localAxis,
        tangent
      );
      instanceMatrix.compose(position, orientation, unitScale);
      rib_node_marks.setMatrixAt(nodeIndex++, instanceMatrix);
    }
  }
  rib_node_marks.instanceMatrix.needsUpdate = true;
  basket.add(rib_node_marks);

  const rim_bindingsGeom = new THREE.TorusGeometry(
    0.0215,
    0.0042,
    8,
    18
  );
  const rim_bindings = new THREE.InstancedMesh(
    rim_bindingsGeom,
    bindingMat,
    8
  );
  for (let i = 0; i < 8; i++) {
    const phi = Math.PI * 2 * i / 8 + 0.10;
    const position = meridianPoint(
      phi,
      openingTheta,
      sphereR
    );
    const before = meridianPoint(
      phi,
      Math.max(0.01, openingTheta - 0.014),
      sphereR
    );
    const after = meridianPoint(
      phi,
      Math.min(Math.PI, openingTheta + 0.014),
      sphereR
    );
    const tangent = after.sub(before).normalize();
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      localAxis,
      tangent
    );
    instanceMatrix.compose(position, orientation, unitScale);
    rim_bindings.setMatrixAt(i, instanceMatrix);
  }
  rim_bindings.instanceMatrix.needsUpdate = true;
  basket.add(rim_bindings);

  const base_bindingsGeom = new THREE.TorusGeometry(
    0.0305,
    0.004,
    8,
    18
  );
  const base_bindings = new THREE.InstancedMesh(
    base_bindingsGeom,
    bindingMat,
    5
  );
  for (let i = 0; i < 5; i++) {
    const phi = Math.PI * 2 * i / 5 + 0.28;
    const position = new THREE.Vector3(
      0.19 * Math.cos(phi),
      -0.463,
      0.19 * Math.sin(phi)
    );
    const tangent = new THREE.Vector3(
      -Math.sin(phi),
      0,
      Math.cos(phi)
    );
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      localAxis,
      tangent
    );
    instanceMatrix.compose(position, orientation, unitScale);
    base_bindings.setMatrixAt(i, instanceMatrix);
  }
  base_bindings.instanceMatrix.needsUpdate = true;
  basket.add(base_bindings);

  const base_supportsGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.10,
    10
  );
  const base_supports = new THREE.InstancedMesh(
    base_supportsGeom,
    bambooMat,
    3
  );
  const supportPositions = [
    [-0.11, -0.414, -0.015],
    [0.11, -0.414, -0.015],
    [0.00, -0.414, 0.095]
  ];
  for (let i = 0; i < supportPositions.length; i++) {
    const p = supportPositions[i];
    instanceMatrix.makeTranslation(p[0], p[1], p[2]);
    base_supports.setMatrixAt(i, instanceMatrix);
  }
  base_supports.instanceMatrix.needsUpdate = true;
  basket.add(base_supports);

  const candle_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.050, 0.000),
    new THREE.Vector2(0.072, 0.020),
    new THREE.Vector2(0.080, 0.065),
    new THREE.Vector2(0.078, 0.115),
    new THREE.Vector2(0.068, 0.150),
    new THREE.Vector2(0.046, 0.170),
    new THREE.Vector2(0.000, 0.170)
  ];
  const candle_bodyGeom = new THREE.LatheGeometry(
    candle_bodyProfile,
    32
  );
  const candle_body = new THREE.Mesh(candle_bodyGeom, waxMat);
  candle_body.position.set(0, -0.395, 0.04);
  lamp.add(candle_body);

  const wickGeom = new THREE.CylinderGeometry(
    0.0045,
    0.0045,
    0.045,
    10
  );
  const wick = new THREE.Mesh(wickGeom, wickMat);
  wick.position.set(0, -0.205, 0.04);
  lamp.add(wick);

  const flame_outerProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.020, 0.006),
    new THREE.Vector2(0.041, 0.034),
    new THREE.Vector2(0.047, 0.064),
    new THREE.Vector2(0.037, 0.094),
    new THREE.Vector2(0.022, 0.122),
    new THREE.Vector2(0.014, 0.158),
    new THREE.Vector2(0.000, 0.190)
  ];
  const flame_outerGeom = new THREE.LatheGeometry(
    flame_outerProfile,
    28
  );
  const flame_outer = new THREE.Mesh(
    flame_outerGeom,
    flame_outerMat
  );
  flame_outer.position.set(0, -0.218, 0.04);
  lamp.add(flame_outer);

  const flame_innerProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.014, 0.005),
    new THREE.Vector2(0.026, 0.029),
    new THREE.Vector2(0.025, 0.054),
    new THREE.Vector2(0.017, 0.079),
    new THREE.Vector2(0.009, 0.105),
    new THREE.Vector2(0.000, 0.132)
  ];
  const flame_innerGeom = new THREE.LatheGeometry(
    flame_innerProfile,
    24
  );
  const flame_inner = new THREE.Mesh(
    flame_innerGeom,
    flame_innerMat
  );
  flame_inner.position.set(0, -0.214, 0.04);
  lamp.add(flame_inner);

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
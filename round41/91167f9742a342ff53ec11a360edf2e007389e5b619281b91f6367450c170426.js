export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "stand_mixer";

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0x9a5f4d,
    metalness: 0.5,
    roughness: 0.5,
  });
  const darkCopperMat = new THREE.MeshStandardMaterial({
    color: 0x754033,
    metalness: 0.5,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x251916,
    metalness: 0.0,
    roughness: 0.7,
  });

  function makeRoundedFrustumGeometry(levels, segments, exponent) {
    const positions = [];
    const indices = [];
    const power = 2 / exponent;

    for (let levelIndex = 0; levelIndex < levels.length; levelIndex++) {
      const level = levels[levelIndex];
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const x = level.hx * (cosine < 0 ? -1 : 1) *
          Math.pow(Math.abs(cosine), power);
        const z = level.hz * (sine < 0 ? -1 : 1) *
          Math.pow(Math.abs(sine), power);
        positions.push(x, level.y, z);
      }
    }

    for (let levelIndex = 0; levelIndex < levels.length - 1; levelIndex++) {
      const lowerStart = levelIndex * segments;
      const upperStart = (levelIndex + 1) * segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const lower = lowerStart + i;
        const lowerNext = lowerStart + next;
        const upper = upperStart + i;
        const upperNext = upperStart + next;
        indices.push(lower, upper, upperNext);
        indices.push(lower, upperNext, lowerNext);
      }
    }

    const bottomCenter = positions.length / 3;
    positions.push(0, levels[0].y, 0);
    const topCenter = positions.length / 3;
    positions.push(0, levels[levels.length - 1].y, 0);
    const topStart = (levels.length - 1) * segments;

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(bottomCenter, i, next);
      indices.push(topCenter, topStart + next, topStart + i);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function makeRoundedRectShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const halfWidth = width / 2;
    const halfDepth = depth / 2;

    shape.moveTo(-halfWidth + radius, -halfDepth);
    shape.lineTo(halfWidth - radius, -halfDepth);
    shape.quadraticCurveTo(
      halfWidth,
      -halfDepth,
      halfWidth,
      -halfDepth + radius
    );
    shape.lineTo(halfWidth, halfDepth - radius);
    shape.quadraticCurveTo(
      halfWidth,
      halfDepth,
      halfWidth - radius,
      halfDepth
    );
    shape.lineTo(-halfWidth + radius, halfDepth);
    shape.quadraticCurveTo(
      -halfWidth,
      halfDepth,
      -halfWidth,
      halfDepth - radius
    );
    shape.lineTo(-halfWidth, -halfDepth + radius);
    shape.quadraticCurveTo(
      -halfWidth,
      -halfDepth,
      -halfWidth + radius,
      -halfDepth
    );
    shape.closePath();
    return shape;
  }

  function makeRoundedRectTubeGeometry(width, depth, radius, tubeRadius) {
    const points = [];
    const halfWidth = width / 2;
    const halfDepth = depth / 2;
    const cornerSegments = 6;
    const corners = [
      [halfWidth - radius, halfDepth - radius, 0],
      [-halfWidth + radius, halfDepth - radius, Math.PI / 2],
      [-halfWidth + radius, -halfDepth + radius, Math.PI],
      [halfWidth - radius, -halfDepth + radius, Math.PI * 1.5],
    ];

    for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
      const corner = corners[cornerIndex];
      for (let i = 0; i < cornerSegments; i++) {
        const angle = corner[2] + i / cornerSegments * Math.PI / 2;
        points.push(
          new THREE.Vector3(
            corner[0] + Math.cos(angle) * radius,
            0,
            corner[1] + Math.sin(angle) * radius
          )
        );
      }
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(
      curve,
      72,
      tubeRadius,
      10,
      true
    );
  }

  const base_plinthGeom = makeRoundedFrustumGeometry(
    [
      { y: 0.06, hx: 0.45, hz: 0.34 },
      { y: 0.08, hx: 0.48, hz: 0.37 },
      { y: 0.14, hx: 0.49, hz: 0.38 },
      { y: 0.20, hx: 0.47, hz: 0.36 },
      { y: 0.23, hx: 0.44, hz: 0.34 },
    ],
    40,
    5
  );
  const base_plinth = new THREE.Mesh(base_plinthGeom, copperMat);
  base_plinth.name = "base_plinth";
  root.add(base_plinth);

  const base_trimGeom = makeRoundedFrustumGeometry(
    [
      { y: 0.19, hx: 0.43, hz: 0.33 },
      { y: 0.22, hx: 0.45, hz: 0.35 },
      { y: 0.25, hx: 0.42, hz: 0.32 },
    ],
    40,
    5
  );
  const base_trim = new THREE.Mesh(base_trimGeom, darkCopperMat);
  base_trim.name = "base_trim";
  root.add(base_trim);

  const feetGeom = new THREE.CylinderGeometry(0.055, 0.06, 0.08, 16);
  const feet = new THREE.InstancedMesh(feetGeom, rubberMat, 4);
  feet.name = "feet";
  const footPositions = [
    [-0.36, 0.02, 0.27],
    [0.36, 0.02, 0.27],
    [-0.36, 0.02, -0.27],
    [0.36, 0.02, -0.27],
  ];
  const instanceMatrix = new THREE.Matrix4();
  for (let i = 0; i < footPositions.length; i++) {
    instanceMatrix.makeTranslation(
      footPositions[i][0],
      footPositions[i][1],
      footPositions[i][2]
    );
    feet.setMatrixAt(i, instanceMatrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const bowl_bodyGeom = makeRoundedFrustumGeometry(
    [
      { y: 0.20, hx: 0.37, hz: 0.29 },
      { y: 0.25, hx: 0.40, hz: 0.31 },
      { y: 0.36, hx: 0.42, hz: 0.33 },
      { y: 0.82, hx: 0.46, hz: 0.37 },
      { y: 0.98, hx: 0.49, hz: 0.40 },
    ],
    40,
    5
  );
  const bowl_body = new THREE.Mesh(bowl_bodyGeom, copperMat);
  bowl_body.name = "bowl_body";
  root.add(bowl_body);

  const bowl_interiorGeom = new THREE.ShapeGeometry(
    makeRoundedRectShape(0.82, 0.68, 0.13),
    24
  );
  const bowl_interior = new THREE.Mesh(bowl_interiorGeom, darkMat);
  bowl_interior.name = "bowl_interior";
  bowl_interior.rotation.x = -Math.PI / 2;
  bowl_interior.position.y = 0.987;
  root.add(bowl_interior);

  const bowl_rimGeom = makeRoundedRectTubeGeometry(
    1.02,
    0.88,
    0.15,
    0.028
  );
  const bowl_rim = new THREE.Mesh(bowl_rimGeom, chromeMat);
  bowl_rim.name = "bowl_rim";
  bowl_rim.position.y = 1.005;
  root.add(bowl_rim);

  const rear_columnGeom = makeRoundedFrustumGeometry(
    [
      { y: 0.96, hx: 0.11, hz: 0.12 },
      { y: 1.02, hx: 0.15, hz: 0.16 },
      { y: 1.48, hx: 0.16, hz: 0.17 },
      { y: 1.56, hx: 0.15, hz: 0.16 },
    ],
    28,
    4
  );
  const rear_column = new THREE.Mesh(rear_columnGeom, darkCopperMat);
  rear_column.name = "rear_column";
  rear_column.position.set(0, 0, -0.34);
  root.add(rear_column);

  const head_supportGeom = new THREE.BoxGeometry(0.34, 0.09, 0.24);
  const head_support = new THREE.Mesh(head_supportGeom, darkCopperMat);
  head_support.name = "head_support";
  head_support.position.set(0, 1.50, -0.19);
  root.add(head_support);

  const motor_headGeom = makeRoundedFrustumGeometry(
    [
      { y: 1.48, hx: 0.43, hz: 0.35 },
      { y: 1.52, hx: 0.42, hz: 0.34 },
      { y: 1.95, hx: 0.37, hz: 0.30 },
      { y: 2.08, hx: 0.34, hz: 0.27 },
      { y: 2.15, hx: 0.30, hz: 0.23 },
      { y: 2.18, hx: 0.25, hz: 0.18 },
    ],
    40,
    5
  );
  const motor_head = new THREE.Mesh(motor_headGeom, copperMat);
  motor_head.name = "motor_head";
  motor_head.position.z = -0.10;
  root.add(motor_head);

  const head_undersideGeom = new THREE.BoxGeometry(0.58, 0.025, 0.34);
  const head_underside = new THREE.Mesh(head_undersideGeom, darkMat);
  head_underside.name = "head_underside";
  head_underside.position.set(0, 1.475, -0.01);
  root.add(head_underside);

  const planetary_collarGeom = new THREE.CylinderGeometry(
    0.16,
    0.16,
    0.13,
    32
  );
  const planetary_collar = new THREE.Mesh(
    planetary_collarGeom,
    silverMat
  );
  planetary_collar.name = "planetary_collar";
  planetary_collar.position.set(0, 1.42, 0.08);
  root.add(planetary_collar);

  const collar_shadowGeom = new THREE.TorusGeometry(
    0.145,
    0.011,
    8,
    32
  );
  const collar_shadow = new THREE.Mesh(collar_shadowGeom, darkMat);
  collar_shadow.name = "collar_shadow";
  collar_shadow.rotation.x = Math.PI / 2;
  collar_shadow.position.set(0, 1.36, 0.08);
  root.add(collar_shadow);

  const drive_hubGeom = new THREE.CylinderGeometry(
    0.075,
    0.08,
    0.18,
    24
  );
  const drive_hub = new THREE.Mesh(drive_hubGeom, chromeMat);
  drive_hub.name = "drive_hub";
  drive_hub.position.set(0, 1.28, 0.08);
  root.add(drive_hub);

  const hub_bandGeom = new THREE.CylinderGeometry(
    0.083,
    0.083,
    0.045,
    24
  );
  const hub_band = new THREE.Mesh(hub_bandGeom, darkMat);
  hub_band.name = "hub_band";
  hub_band.position.set(0, 1.235, 0.08);
  root.add(hub_band);

  const whisk_couplerGeom = new THREE.CylinderGeometry(
    0.052,
    0.058,
    0.07,
    20
  );
  const whisk_coupler = new THREE.Mesh(whisk_couplerGeom, silverMat);
  whisk_coupler.name = "whisk_coupler";
  whisk_coupler.position.set(0, 1.19, 0.08);
  root.add(whisk_coupler);

  const whiskWirePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.035, 0.00, 0),
      new THREE.Vector3(0.11, -0.05, 0),
      new THREE.Vector3(0.22, -0.16, 0),
      new THREE.Vector3(0.24, -0.27, 0),
      new THREE.Vector3(0.18, -0.38, 0),
      new THREE.Vector3(0.045, -0.43, 0),
    ],
    false,
    "centripetal"
  );
  const whisk_wiresGeom = new THREE.TubeGeometry(
    whiskWirePath,
    28,
    0.009,
    8,
    false
  );
  const whisk_wires = new THREE.InstancedMesh(
    whisk_wiresGeom,
    chromeMat,
    8
  );
  whisk_wires.name = "whisk_wires";
  whisk_wires.position.set(0, 1.20, 0.08);
  const whiskRotation = new THREE.Quaternion();
  for (let i = 0; i < 8; i++) {
    whiskRotation.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      i / 8 * Math.PI * 2
    );
    instanceMatrix.compose(
      new THREE.Vector3(0, 0, 0),
      whiskRotation,
      new THREE.Vector3(1, 1, 1)
    );
    whisk_wires.setMatrixAt(i, instanceMatrix);
  }
  whisk_wires.instanceMatrix.needsUpdate = true;
  root.add(whisk_wires);

  const whisk_bottom_pinGeom = new THREE.SphereGeometry(
    0.035,
    16,
    10
  );
  const whisk_bottom_pin = new THREE.Mesh(
    whisk_bottom_pinGeom,
    chromeMat
  );
  whisk_bottom_pin.name = "whisk_bottom_pin";
  whisk_bottom_pin.position.set(0, 0.77, 0.08);
  root.add(whisk_bottom_pin);

  const controlNormal = new THREE.Vector3(-0.55, 0, 0.84).normalize();
  const controlQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    controlNormal
  );
  const controlPosition = new THREE.Vector3(-0.205, 1.79, 0.19);

  const control_knobGeom = new THREE.CylinderGeometry(
    0.065,
    0.065,
    0.045,
    28
  );
  const control_knob = new THREE.Mesh(control_knobGeom, silverMat);
  control_knob.name = "control_knob";
  control_knob.quaternion.copy(controlQuaternion);
  control_knob.position
    .copy(controlPosition)
    .addScaledVector(controlNormal, 0.025);
  root.add(control_knob);

  const control_faceGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.009,
    28
  );
  const control_face = new THREE.Mesh(control_faceGeom, chromeMat);
  control_face.name = "control_face";
  control_face.quaternion.copy(controlQuaternion);
  control_face.position
    .copy(controlPosition)
    .addScaledVector(controlNormal, 0.052);
  root.add(control_face);

  const control_tabGeom = new THREE.SphereGeometry(1, 18, 12);
  const control_tab = new THREE.Mesh(control_tabGeom, silverMat);
  control_tab.name = "control_tab";
  control_tab.scale.set(0.025, 0.045, 0.012);
  control_tab.quaternion.copy(controlQuaternion);
  control_tab.position
    .copy(controlPosition)
    .addScaledVector(controlNormal, 0.045)
    .add(new THREE.Vector3(0, 0.065, 0).applyQuaternion(controlQuaternion));
  root.add(control_tab);

  const control_indicatorGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    0.006,
    12
  );
  const control_indicator = new THREE.Mesh(
    control_indicatorGeom,
    darkMat
  );
  control_indicator.name = "control_indicator";
  control_indicator.quaternion.copy(controlQuaternion);
  control_indicator.position
    .copy(controlPosition)
    .addScaledVector(controlNormal, 0.059);
  root.add(control_indicator);

  const side_control_baseGeom = new THREE.CylinderGeometry(
    0.09,
    0.09,
    0.055,
    28
  );
  const side_control_base = new THREE.Mesh(
    side_control_baseGeom,
    rubberMat
  );
  side_control_base.name = "side_control_base";
  side_control_base.rotation.z = Math.PI / 2;
  side_control_base.position.set(0.405, 1.78, -0.20);
  root.add(side_control_base);

  const side_control_knobGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.07,
    28
  );
  const side_control_knob = new THREE.Mesh(
    side_control_knobGeom,
    darkMat
  );
  side_control_knob.name = "side_control_knob";
  side_control_knob.rotation.z = Math.PI / 2;
  side_control_knob.position.set(0.445, 1.78, -0.20);
  root.add(side_control_knob);

  const head_screwGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.018,
    18
  );
  const head_screw = new THREE.Mesh(head_screwGeom, silverMat);
  head_screw.name = "head_screw";
  head_screw.rotation.x = Math.PI / 2;
  head_screw.position.set(0.18, 1.42, 0.115);
  root.add(head_screw);

  const head_screw_slotGeom = new THREE.BoxGeometry(
    0.028,
    0.005,
    0.006
  );
  const head_screw_slot = new THREE.Mesh(
    head_screw_slotGeom,
    darkMat
  );
  head_screw_slot.name = "head_screw_slot";
  head_screw_slot.position.set(0.18, 1.42, 0.127);
  root.add(head_screw_slot);

  const top_indicatorGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.006,
    16
  );
  const top_indicator = new THREE.Mesh(top_indicatorGeom, darkMat);
  top_indicator.name = "top_indicator";
  top_indicator.position.set(-0.08, 2.185, -0.12);
  root.add(top_indicator);

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
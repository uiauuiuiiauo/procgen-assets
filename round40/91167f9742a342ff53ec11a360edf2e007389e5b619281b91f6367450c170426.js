export default function generate(THREE) {
  const root = new THREE.Group();

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb8735c,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x181514,
    metalness: 0.0,
    roughness: 0.8,
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x291714,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedRectPoints(width, depth, radius, y, segments) {
    const points = [];
    const cx = width / 2 - radius;
    const cz = depth / 2 - radius;
    const corners = [
      [cx, cz, 0],
      [-cx, cz, Math.PI / 2],
      [-cx, -cz, Math.PI],
      [cx, -cz, Math.PI * 1.5],
    ];
    for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
      const corner = corners[cornerIndex];
      for (let i = 0; i <= segments; i++) {
        const angle = corner[2] + (i / segments) * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  function makeRoundedRectTube(width, depth, radius, y, tubeRadius, material) {
    const points = roundedRectPoints(width, depth, radius, y, 6);
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 96, tubeRadius, 12, true),
      material
    );
  }

  const feetGeom = new THREE.CylinderGeometry(0.068, 0.075, 0.09, 18);
  const feet = new THREE.InstancedMesh(feetGeom, darkMat, 4);
  const feetDummy = new THREE.Object3D();
  const feetPositions = [
    [-0.47, 0.045, 0.34],
    [0.47, 0.045, 0.34],
    [-0.47, 0.045, -0.34],
    [0.47, 0.045, -0.34],
  ];
  for (let i = 0; i < feetPositions.length; i++) {
    feetDummy.position.set(
      feetPositions[i][0],
      feetPositions[i][1],
      feetPositions[i][2]
    );
    feetDummy.updateMatrix();
    feet.setMatrixAt(i, feetDummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const base_plinthProfile = [
    new THREE.Vector2(0.00, 0.08),
    new THREE.Vector2(0.51, 0.08),
    new THREE.Vector2(0.57, 0.10),
    new THREE.Vector2(0.61, 0.14),
    new THREE.Vector2(0.625, 0.20),
    new THREE.Vector2(0.615, 0.27),
    new THREE.Vector2(0.575, 0.31),
    new THREE.Vector2(0.52, 0.33),
    new THREE.Vector2(0.00, 0.33),
  ];
  const base_plinthGeom = new THREE.LatheGeometry(base_plinthProfile, 64);
  const base_plinth = new THREE.Mesh(base_plinthGeom, copperMat);
  base_plinth.scale.set(1.05, 1, 0.82);
  root.add(base_plinth);

  const base_trim = makeRoundedRectTube(
    1.17, 0.91, 0.15, 0.305, 0.014, copperMat
  );
  root.add(base_trim);

  const bowl_bodyProfile = [
    new THREE.Vector2(0.00, 0.28),
    new THREE.Vector2(0.43, 0.28),
    new THREE.Vector2(0.49, 0.32),
    new THREE.Vector2(0.525, 0.40),
    new THREE.Vector2(0.55, 0.58),
    new THREE.Vector2(0.578, 0.88),
    new THREE.Vector2(0.605, 1.18),
    new THREE.Vector2(0.62, 1.34),
    new THREE.Vector2(0.615, 1.39),
    new THREE.Vector2(0.585, 1.415),
    new THREE.Vector2(0.545, 1.39),
    new THREE.Vector2(0.535, 1.31),
    new THREE.Vector2(0.515, 1.08),
    new THREE.Vector2(0.49, 0.76),
    new THREE.Vector2(0.455, 0.50),
    new THREE.Vector2(0.39, 0.39),
    new THREE.Vector2(0.00, 0.39),
  ];
  const bowl_bodyGeom = new THREE.LatheGeometry(bowl_bodyProfile, 64);
  const bowl_body = new THREE.Mesh(bowl_bodyGeom, copperMat);
  bowl_body.scale.set(1.05, 1, 0.84);
  root.add(bowl_body);

  const bowl_interiorGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.018, 64);
  const bowl_interior = new THREE.Mesh(bowl_interiorGeom, shadowMat);
  bowl_interior.position.y = 1.335;
  bowl_interior.scale.set(1.05, 1, 0.84);
  root.add(bowl_interior);

  const bowl_rim = makeRoundedRectTube(
    1.29, 1.03, 0.17, 1.405, 0.034, silverMat
  );
  root.add(bowl_rim);

  const support_columnGeom = new THREE.BoxGeometry(0.34, 1.04, 0.25);
  const support_column = new THREE.Mesh(support_columnGeom, copperMat);
  support_column.position.set(0.20, 1.82, -0.34);
  root.add(support_column);

  const support_seamGeom = new THREE.BoxGeometry(0.012, 0.78, 0.012);
  const support_seam = new THREE.Mesh(support_seamGeom, shadowMat);
  support_seam.position.set(0.35, 1.83, -0.205);
  root.add(support_seam);

  const support_screwGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.012, 20);
  const support_screw = new THREE.Mesh(support_screwGeom, silverMat);
  support_screw.rotation.x = Math.PI / 2;
  support_screw.position.set(0.285, 2.19, -0.202);
  root.add(support_screw);

  const support_screw_slotGeom = new THREE.BoxGeometry(0.026, 0.005, 0.006);
  const support_screw_slot = new THREE.Mesh(support_screw_slotGeom, darkMat);
  support_screw_slot.position.set(0.285, 2.19, -0.193);
  support_screw_slot.rotation.z = -0.45;
  root.add(support_screw_slot);

  const motor_housingShape = new THREE.Shape();
  motor_housingShape.moveTo(-0.50, 0.00);
  motor_housingShape.lineTo(0.50, 0.00);
  motor_housingShape.bezierCurveTo(0.51, 0.20, 0.50, 0.54, 0.46, 0.67);
  motor_housingShape.bezierCurveTo(0.43, 0.76, 0.36, 0.80, 0.25, 0.82);
  motor_housingShape.bezierCurveTo(0.08, 0.85, -0.16, 0.85, -0.28, 0.83);
  motor_housingShape.bezierCurveTo(-0.39, 0.81, -0.45, 0.77, -0.47, 0.67);
  motor_housingShape.bezierCurveTo(-0.50, 0.51, -0.51, 0.20, -0.50, 0.00);
  motor_housingShape.closePath();

  const motor_housingGeom = new THREE.ExtrudeGeometry(motor_housingShape, {
    depth: 0.62,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 4,
    curveSegments: 16,
  });
  const motor_housing = new THREE.Mesh(motor_housingGeom, copperMat);
  motor_housing.position.set(0, 2.08, -0.40);
  root.add(motor_housing);

  const lower_housing_trim = makeRoundedRectTube(
    1.01, 0.64, 0.045, 2.085, 0.011, shadowMat
  );
  root.add(lower_housing_trim);

  const top_indicatorGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.008, 18);
  const top_indicator = new THREE.Mesh(top_indicatorGeom, darkMat);
  top_indicator.position.set(-0.13, 2.945, -0.08);
  top_indicator.scale.set(1.5, 1, 0.45);
  root.add(top_indicator);

  const speed_control_ringGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 32);
  const speed_control_ring = new THREE.Mesh(speed_control_ringGeom, darkMat);
  speed_control_ring.rotation.z = Math.PI / 2;
  speed_control_ring.position.set(0.525, 2.50, -0.12);
  root.add(speed_control_ring);

  const speed_control_knobGeom = new THREE.CylinderGeometry(0.087, 0.097, 0.105, 28);
  const speed_control_knob = new THREE.Mesh(speed_control_knobGeom, darkMat);
  speed_control_knob.rotation.z = Math.PI / 2;
  speed_control_knob.position.set(0.575, 2.50, -0.12);
  root.add(speed_control_knob);

  const speed_control_capGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.012, 28);
  const speed_control_cap = new THREE.Mesh(speed_control_capGeom, shadowMat);
  speed_control_cap.rotation.z = Math.PI / 2;
  speed_control_cap.position.set(0.632, 2.50, -0.12);
  root.add(speed_control_cap);

  const front_control_backGeom = new THREE.CylinderGeometry(0.088, 0.088, 0.025, 28);
  const front_control_back = new THREE.Mesh(front_control_backGeom, darkMat);
  front_control_back.rotation.x = Math.PI / 2;
  front_control_back.position.set(-0.285, 2.47, 0.245);
  root.add(front_control_back);

  const front_control_dialGeom = new THREE.CylinderGeometry(0.072, 0.082, 0.034, 28);
  const front_control_dial = new THREE.Mesh(front_control_dialGeom, silverMat);
  front_control_dial.rotation.x = Math.PI / 2;
  front_control_dial.position.set(-0.285, 2.455, 0.263);
  root.add(front_control_dial);

  const front_control_tabShape = new THREE.Shape();
  front_control_tabShape.moveTo(-0.025, 0.00);
  front_control_tabShape.lineTo(-0.038, 0.075);
  front_control_tabShape.bezierCurveTo(-0.050, 0.115, -0.035, 0.155, -0.012, 0.158);
  front_control_tabShape.bezierCurveTo(0.015, 0.160, 0.030, 0.125, 0.025, 0.085);
  front_control_tabShape.lineTo(0.020, 0.00);
  front_control_tabShape.closePath();
  const front_control_tabGeom = new THREE.ExtrudeGeometry(front_control_tabShape, {
    depth: 0.024,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  const front_control_tab = new THREE.Mesh(front_control_tabGeom, silverMat);
  front_control_tab.position.set(-0.285, 2.47, 0.255);
  root.add(front_control_tab);

  const front_control_markerGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.006, 14);
  const front_control_marker = new THREE.Mesh(front_control_markerGeom, darkMat);
  front_control_marker.rotation.x = Math.PI / 2;
  front_control_marker.position.set(-0.285, 2.455, 0.286);
  root.add(front_control_marker);

  const planetary_collarGeom = new THREE.CylinderGeometry(0.225, 0.225, 0.15, 48);
  const planetary_collar = new THREE.Mesh(planetary_collarGeom, silverMat);
  planetary_collar.position.set(0, 2.035, 0.04);
  root.add(planetary_collar);

  const collar_shadowGeom = new THREE.TorusGeometry(0.19, 0.018, 10, 48);
  const collar_shadow = new THREE.Mesh(collar_shadowGeom, darkMat);
  collar_shadow.rotation.x = Math.PI / 2;
  collar_shadow.position.set(0, 1.963, 0.04);
  root.add(collar_shadow);

  const drive_shaftGeom = new THREE.CylinderGeometry(0.074, 0.074, 0.19, 32);
  const drive_shaft = new THREE.Mesh(drive_shaftGeom, silverMat);
  drive_shaft.position.set(0, 1.875, 0.04);
  root.add(drive_shaft);

  const shaft_dark_bandGeom = new THREE.TorusGeometry(0.067, 0.011, 8, 32);
  const shaft_dark_band = new THREE.Mesh(shaft_dark_bandGeom, darkMat);
  shaft_dark_band.rotation.x = Math.PI / 2;
  shaft_dark_band.position.set(0, 1.805, 0.04);
  root.add(shaft_dark_band);

  const whisk_hubGeom = new THREE.CylinderGeometry(0.064, 0.073, 0.075, 28);
  const whisk_hub = new THREE.Mesh(whisk_hubGeom, silverMat);
  whisk_hub.position.set(0, 1.765, 0.04);
  root.add(whisk_hub);

  const whisk_neck_ringGeom = new THREE.TorusGeometry(0.062, 0.010, 8, 32);
  const whisk_neck_ring = new THREE.Mesh(whisk_neck_ringGeom, silverMat);
  whisk_neck_ring.rotation.x = Math.PI / 2;
  whisk_neck_ring.position.set(0, 1.735, 0.04);
  root.add(whisk_neck_ring);

  const whiskWirePath = [
    new THREE.Vector3(0.035, 0.00, 0),
    new THREE.Vector3(0.12, -0.055, 0),
    new THREE.Vector3(0.255, -0.18, 0),
    new THREE.Vector3(0.31, -0.39, 0),
    new THREE.Vector3(0.245, -0.61, 0),
    new THREE.Vector3(0.045, -0.735, 0),
  ];
  const whiskWireCurve = new THREE.CatmullRomCurve3(
    whiskWirePath,
    false,
    "centripetal"
  );
  const whisk_wiresGeom = new THREE.TubeGeometry(
    whiskWireCurve,
    32,
    0.010,
    7,
    false
  );
  const whisk_wires = new THREE.InstancedMesh(whisk_wiresGeom, silverMat, 8);
  const whiskWireDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    whiskWireDummy.position.set(0, 1.765, 0.04);
    whiskWireDummy.rotation.set(0, (i / 8) * Math.PI * 2, 0);
    whiskWireDummy.updateMatrix();
    whisk_wires.setMatrixAt(i, whiskWireDummy.matrix);
  }
  whisk_wires.instanceMatrix.needsUpdate = true;
  root.add(whisk_wires);

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
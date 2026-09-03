export default function generate(THREE) {
  const root = new THREE.Group();

  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x1b1b1b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panel_blackMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.8,
  });
  const edge_blackMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.8,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeRoundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  function makeCapsuleShape(width, length) {
    const radius = width / 2;
    const halfLength = length / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-radius, -halfLength + radius);
    shape.quadraticCurveTo(-radius, -halfLength, 0, -halfLength);
    shape.quadraticCurveTo(radius, -halfLength, radius, -halfLength + radius);
    shape.lineTo(radius, halfLength - radius);
    shape.quadraticCurveTo(radius, halfLength, 0, halfLength);
    shape.quadraticCurveTo(-radius, halfLength, -radius, halfLength - radius);
    shape.lineTo(-radius, -halfLength + radius);
    return shape;
  }

  function makeCapsuleBorderShape(outerWidth, outerLength, innerWidth, innerLength) {
    const shape = makeCapsuleShape(outerWidth, outerLength);
    const innerRadius = innerWidth / 2;
    const innerHalfLength = innerLength / 2;
    const hole = new THREE.Path();
    hole.moveTo(-innerRadius, -innerHalfLength + innerRadius);
    hole.lineTo(-innerRadius, innerHalfLength - innerRadius);
    hole.quadraticCurveTo(
      -innerRadius,
      innerHalfLength,
      0,
      innerHalfLength
    );
    hole.quadraticCurveTo(
      innerRadius,
      innerHalfLength,
      innerRadius,
      innerHalfLength - innerRadius
    );
    hole.lineTo(innerRadius, -innerHalfLength + innerRadius);
    hole.quadraticCurveTo(
      innerRadius,
      -innerHalfLength,
      0,
      -innerHalfLength
    );
    hole.quadraticCurveTo(
      -innerRadius,
      -innerHalfLength,
      -innerRadius,
      -innerHalfLength + innerRadius
    );
    shape.holes.push(hole);
    return shape;
  }

  const rear_clip = new THREE.Group();
  rear_clip.position.set(0.12, -0.08, -0.08);
  rear_clip.rotation.set(-0.82, -0.18, -0.08);
  root.add(rear_clip);

  const rear_clip_bodyShape = makeCapsuleShape(0.38, 0.88);
  const rear_clip_bodyGeom = new THREE.ExtrudeGeometry(
    rear_clip_bodyShape,
    {
      depth: 0.13,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 4,
      curveSegments: 16,
    }
  );
  const rear_clip_body = new THREE.Mesh(
    rear_clip_bodyGeom,
    black_plasticMat
  );
  rear_clip_body.position.z = -0.065;
  rear_clip.add(rear_clip_body);

  const rear_clip_panelShape = makeCapsuleShape(0.25, 0.68);
  const rear_clip_panelGeom = new THREE.ExtrudeGeometry(
    rear_clip_panelShape,
    {
      depth: 0.01,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 2,
      curveSegments: 14,
    }
  );
  const rear_clip_panel = new THREE.Mesh(
    rear_clip_panelGeom,
    panel_blackMat
  );
  rear_clip_panel.position.z = 0.074;
  rear_clip.add(rear_clip_panel);

  const rear_clip_borderShape = makeCapsuleBorderShape(
    0.30,
    0.74,
    0.25,
    0.68
  );
  const rear_clip_borderGeom = new THREE.ExtrudeGeometry(
    rear_clip_borderShape,
    {
      depth: 0.008,
      steps: 1,
      bevelEnabled: false,
      curveSegments: 16,
    }
  );
  const rear_clip_border = new THREE.Mesh(
    rear_clip_borderGeom,
    edge_blackMat
  );
  rear_clip_border.position.z = 0.079;
  rear_clip.add(rear_clip_border);

  const rear_clip_markingGeom = new THREE.BoxGeometry(0.012, 0.052, 0.006);
  const rear_clip_markings = new THREE.InstancedMesh(
    rear_clip_markingGeom,
    recessMat,
    6
  );
  const marking_dummy = new THREE.Object3D();
  const marking_heights = [0.65, 1.0, 0.78, 0.92, 0.62, 0.86];
  for (let i = 0; i < 6; i++) {
    marking_dummy.position.set(-0.055 + i * 0.022, 0.015, 0.093);
    marking_dummy.scale.set(1, marking_heights[i], 1);
    marking_dummy.updateMatrix();
    rear_clip_markings.setMatrixAt(i, marking_dummy.matrix);
  }
  rear_clip_markings.instanceMatrix.needsUpdate = true;
  rear_clip.add(rear_clip_markings);

  const rear_clip_hinge_pinGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    0.43,
    18
  );
  const rear_clip_hinge_pin = new THREE.Mesh(
    rear_clip_hinge_pinGeom,
    black_plasticMat
  );
  rear_clip_hinge_pin.rotation.z = Math.PI / 2;
  rear_clip_hinge_pin.position.set(0, 0.22, -0.015);
  rear_clip.add(rear_clip_hinge_pin);

  const support_braceShape = makeRoundedRectShape(0.12, 0.46, 0.025);
  const support_braceGeom = new THREE.ExtrudeGeometry(
    support_braceShape,
    {
      depth: 0.09,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 3,
      curveSegments: 8,
    }
  );
  const support_brace = new THREE.Mesh(
    support_braceGeom,
    black_plasticMat
  );
  support_brace.position.set(0.14, -0.36, -0.10);
  support_brace.rotation.z = -0.28;
  root.add(support_brace);

  const support_hingeGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.13,
    18
  );
  const support_hinge = new THREE.Mesh(
    support_hingeGeom,
    black_plasticMat
  );
  support_hinge.rotation.x = Math.PI / 2;
  support_hinge.position.set(0.11, -0.17, -0.075);
  root.add(support_hinge);

  const central_housingGeom = new THREE.CylinderGeometry(
    0.235,
    0.235,
    0.12,
    40
  );
  const central_housing = new THREE.Mesh(
    central_housingGeom,
    black_plasticMat
  );
  central_housing.rotation.x = Math.PI / 2;
  central_housing.position.set(0, 0, 0.055);
  root.add(central_housing);

  const central_rimGeom = new THREE.TorusGeometry(
    0.205,
    0.022,
    10,
    40
  );
  const central_rim = new THREE.Mesh(central_rimGeom, edge_blackMat);
  central_rim.position.set(0, 0, 0.119);
  root.add(central_rim);

  const hub_windowShape = makeRoundedRectShape(0.12, 0.10, 0.018);
  const hub_windowGeom = new THREE.ExtrudeGeometry(hub_windowShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: false,
    curveSegments: 8,
  });
  const hub_window = new THREE.Mesh(hub_windowGeom, recessMat);
  hub_window.position.set(0.045, 0.012, 0.116);
  root.add(hub_window);

  const hub_latchShape = makeRoundedRectShape(0.075, 0.105, 0.014);
  const hub_latchGeom = new THREE.ExtrudeGeometry(hub_latchShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 8,
  });
  const hub_latch = new THREE.Mesh(hub_latchGeom, black_plasticMat);
  hub_latch.position.set(-0.052, 0.067, 0.121);
  hub_latch.rotation.z = -0.28;
  root.add(hub_latch);

  const handle_socketGeom = new THREE.CylinderGeometry(
    0.071,
    0.087,
    0.18,
    24
  );
  const handle_socket = new THREE.Mesh(
    handle_socketGeom,
    black_plasticMat
  );
  handle_socket.rotation.x = Math.PI / 2;
  handle_socket.position.set(0, 0, 0.18);
  root.add(handle_socket);

  const handle_shaftGeom = new THREE.CylinderGeometry(
    0.061,
    0.061,
    0.54,
    24
  );
  const handle_shaft = new THREE.Mesh(
    handle_shaftGeom,
    black_plasticMat
  );
  handle_shaft.rotation.x = Math.PI / 2;
  handle_shaft.position.set(0, 0, 0.48);
  root.add(handle_shaft);

  const handle_grip_bandGeom = new THREE.TorusGeometry(
    0.061,
    0.006,
    8,
    28
  );
  const handle_grip_band = new THREE.Mesh(
    handle_grip_bandGeom,
    edge_blackMat
  );
  handle_grip_band.position.set(0, 0, 0.69);
  root.add(handle_grip_band);

  const handle_tipGeom = new THREE.SphereGeometry(0.074, 24, 14);
  const handle_tip = new THREE.Mesh(handle_tipGeom, black_plasticMat);
  handle_tip.position.set(0, 0, 0.77);
  handle_tip.scale.set(1, 1, 1.15);
  root.add(handle_tip);

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
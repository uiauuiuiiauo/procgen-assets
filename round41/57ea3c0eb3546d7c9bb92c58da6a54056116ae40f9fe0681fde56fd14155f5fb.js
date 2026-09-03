export default function generate(THREE) {
  const root = new THREE.Group();

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const front_end_capMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const rear_socketMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.000, -1.560),
    new THREE.Vector2(0.150, -1.560),
    new THREE.Vector2(0.205, -1.548),
    new THREE.Vector2(0.245, -1.515),
    new THREE.Vector2(0.266, -1.462),
    new THREE.Vector2(0.272, -1.395),
    new THREE.Vector2(0.272, 1.345),
    new THREE.Vector2(0.268, 1.405),
    new THREE.Vector2(0.252, 1.455),
    new THREE.Vector2(0.218, 1.495),
    new THREE.Vector2(0.170, 1.520),
    new THREE.Vector2(0.000, 1.520),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.rotation.x = Math.PI / 2;
  root.add(main_body);

  const front_end_capGeom = new THREE.CylinderGeometry(0.171, 0.171, 0.018, 48);
  const front_end_cap = new THREE.Mesh(front_end_capGeom, front_end_capMat);
  front_end_cap.rotation.x = Math.PI / 2;
  front_end_cap.position.z = 1.524;
  root.add(front_end_cap);

  const front_edge_ringGeom = new THREE.TorusGeometry(0.165, 0.006, 8, 48);
  const front_edge_ring = new THREE.Mesh(front_edge_ringGeom, front_end_capMat);
  front_edge_ring.position.z = 1.535;
  root.add(front_edge_ring);

  const shaft_collarGeom = new THREE.CylinderGeometry(0.074, 0.074, 0.042, 32);
  const shaft_collar = new THREE.Mesh(shaft_collarGeom, shaftMat);
  shaft_collar.rotation.x = Math.PI / 2;
  shaft_collar.position.z = 1.550;
  root.add(shaft_collar);

  const shaft_baseGeom = new THREE.CylinderGeometry(0.047, 0.069, 0.180, 32);
  const shaft_base = new THREE.Mesh(shaft_baseGeom, shaftMat);
  shaft_base.rotation.x = Math.PI / 2;
  shaft_base.position.z = 1.640;
  root.add(shaft_base);

  const shaftGeom = new THREE.CylinderGeometry(0.047, 0.047, 0.340, 32);
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.rotation.x = Math.PI / 2;
  shaft.position.z = 1.880;
  root.add(shaft);

  const shaft_tipGeom = new THREE.SphereGeometry(0.049, 32, 16);
  const shaft_tip = new THREE.Mesh(shaft_tipGeom, shaftMat);
  shaft_tip.position.z = 2.050;
  root.add(shaft_tip);

  const rear_socketGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.014, 40);
  const rear_socket = new THREE.Mesh(rear_socketGeom, rear_socketMat);
  rear_socket.rotation.x = Math.PI / 2;
  rear_socket.position.z = -1.566;
  root.add(rear_socket);

  const rear_socket_rimGeom = new THREE.TorusGeometry(0.091, 0.018, 10, 48);
  const rear_socket_rim = new THREE.Mesh(rear_socket_rimGeom, front_end_capMat);
  rear_socket_rim.position.z = -1.575;
  root.add(rear_socket_rim);

  const rear_socket_innerGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.010, 32);
  const rear_socket_inner = new THREE.Mesh(rear_socket_innerGeom, rear_socketMat);
  rear_socket_inner.rotation.x = Math.PI / 2;
  rear_socket_inner.position.z = -1.579;
  root.add(rear_socket_inner);

  const body_engraving = new THREE.Group();
  body_engraving.position.set(0, 0.275, 0.120);
  root.add(body_engraving);

  const engraving_strokeGeom = new THREE.BoxGeometry(1, 0.003, 0.008);
  const engraving_strokes = [];
  const glyphW = 0.066;
  const glyphD = 0.088;
  const glyphGap = 0.018;

  function addGlyphStroke(cx, cz, x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    engraving_strokes.push({
      x: cx + (x1 + x2) * 0.5,
      z: cz + (z1 + z2) * 0.5,
      length: Math.sqrt(dx * dx + dz * dz),
      angle: Math.atan2(-dz, dx),
    });
  }

  for (let i = 0; i < 3; i++) {
    const cz = (i - 1) * (glyphD + glyphGap);
    const cx = i === 1 ? 0.008 : 0;

    if (i === 0) {
      addGlyphStroke(cx, cz, -glyphW / 2, -glyphD / 2, -glyphW / 2, glyphD / 2);
      addGlyphStroke(cx, cz, -glyphW / 2, -glyphD / 2, glyphW / 2, -glyphD / 2);
      addGlyphStroke(cx, cz, -glyphW / 2, 0, glyphW * 0.35, 0);
      addGlyphStroke(cx, cz, -glyphW / 2, glyphD / 2, glyphW / 2, glyphD / 2);
    } else if (i === 1) {
      addGlyphStroke(cx, cz, -glyphW / 2, -glyphD / 2, glyphW / 2, -glyphD / 2);
      addGlyphStroke(cx, cz, -glyphW / 2, -glyphD / 2, -glyphW / 2, 0);
      addGlyphStroke(cx, cz, -glyphW / 2, 0, glyphW / 2, 0);
      addGlyphStroke(cx, cz, glyphW / 2, 0, glyphW / 2, glyphD / 2);
      addGlyphStroke(cx, cz, -glyphW / 2, glyphD / 2, glyphW / 2, glyphD / 2);
    } else {
      addGlyphStroke(cx, cz, -glyphW / 2, -glyphD / 2, -glyphW / 2, glyphD / 2);
      addGlyphStroke(cx, cz, glyphW / 2, -glyphD / 2, glyphW / 2, glyphD / 2);
      addGlyphStroke(cx, cz, -glyphW / 2, -glyphD / 2, glyphW / 2, -glyphD / 2);
      addGlyphStroke(cx, cz, -glyphW / 2, glyphD / 2, glyphW / 2, glyphD / 2);
    }
  }

  const engraved_measurement_marks = new THREE.InstancedMesh(
    engraving_strokeGeom,
    engravingMat,
    engraving_strokes.length
  );
  const engraving_dummy = new THREE.Object3D();
  for (let i = 0; i < engraving_strokes.length; i++) {
    const stroke = engraving_strokes[i];
    engraving_dummy.position.set(stroke.x, 0, stroke.z);
    engraving_dummy.rotation.set(0, stroke.angle, 0);
    engraving_dummy.scale.set(stroke.length, 1, 1);
    engraving_dummy.updateMatrix();
    engraved_measurement_marks.setMatrixAt(i, engraving_dummy.matrix);
  }
  engraved_measurement_marks.instanceMatrix.needsUpdate = true;
  body_engraving.add(engraved_measurement_marks);

  const arrowCX = 0.018;
  const arrowCZ = -0.620;
  const arrow_strokes = [
    [-0.040, -0.032, 0.040, 0.000],
    [0.040, 0.000, -0.040, -0.032],
    [0.040, 0.000, 0.012, 0.042],
  ];
  const engraved_arrow = new THREE.InstancedMesh(
    engraving_strokeGeom,
    engravingMat,
    arrow_strokes.length
  );
  const arrow_dummy = new THREE.Object3D();
  for (let i = 0; i < arrow_strokes.length; i++) {
    const stroke = arrow_strokes[i];
    const dx = stroke[2] - stroke[0];
    const dz = stroke[3] - stroke[1];
    arrow_dummy.position.set(
      arrowCX + (stroke[0] + stroke[2]) * 0.5,
      0,
      arrowCZ + (stroke[1] + stroke[3]) * 0.5
    );
    arrow_dummy.rotation.set(0, Math.atan2(-dz, dx), 0);
    arrow_dummy.scale.set(Math.sqrt(dx * dx + dz * dz), 1, 1);
    arrow_dummy.updateMatrix();
    engraved_arrow.setMatrixAt(i, arrow_dummy.matrix);
  }
  engraved_arrow.instanceMatrix.needsUpdate = true;
  body_engraving.add(engraved_arrow);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}
export default function generate(THREE) {
  const root = new THREE.Group();

  const castMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const machinedMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const blackRubberMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.8,
  });
  const polishedMetalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  function roundedRectShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -depth / 2;
    const y1 = depth / 2;
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

  function roundedExtrudeGeometry(width, depth, thickness, radius, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, depth, radius),
      {
        depth: thickness,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2,
      }
    );
  }

  const base_assembly = new THREE.Group();
  root.add(base_assembly);

  const base_plateGeom = roundedExtrudeGeometry(2.75, 1.55, 0.22, 0.16, 0.035);
  const base_plate = new THREE.Mesh(base_plateGeom, castMat);
  base_plate.rotation.x = -Math.PI / 2;
  base_plate.position.set(0.15, 0.04, 0);
  base_assembly.add(base_plate);

  const mounting_holesGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.025, 24);
  const mounting_holes = new THREE.InstancedMesh(mounting_holesGeom, recessMat, 4);
  const mounting_hole_positions = [
    [-0.98, 0.276, -0.55],
    [1.28, 0.276, -0.55],
    [-0.98, 0.276, 0.55],
    [1.28, 0.276, 0.55],
  ];
  const mounting_hole_dummy = new THREE.Object3D();
  for (let i = 0; i < mounting_hole_positions.length; i++) {
    const p = mounting_hole_positions[i];
    mounting_hole_dummy.position.set(p[0], p[1], p[2]);
    mounting_hole_dummy.rotation.set(0, 0, 0);
    mounting_hole_dummy.updateMatrix();
    mounting_holes.setMatrixAt(i, mounting_hole_dummy.matrix);
  }
  mounting_holes.instanceMatrix.needsUpdate = true;
  base_assembly.add(mounting_holes);

  const mounting_hole_rimsGeom = new THREE.TorusGeometry(0.13, 0.025, 8, 24);
  const mounting_hole_rims = new THREE.InstancedMesh(
    mounting_hole_rimsGeom,
    darkMetalMat,
    4
  );
  const mounting_hole_rim_dummy = new THREE.Object3D();
  for (let i = 0; i < mounting_hole_positions.length; i++) {
    const p = mounting_hole_positions[i];
    mounting_hole_rim_dummy.position.set(p[0], 0.288, p[2]);
    mounting_hole_rim_dummy.rotation.set(Math.PI / 2, 0, 0);
    mounting_hole_rim_dummy.updateMatrix();
    mounting_hole_rims.setMatrixAt(i, mounting_hole_rim_dummy.matrix);
  }
  mounting_hole_rims.instanceMatrix.needsUpdate = true;
  base_assembly.add(mounting_hole_rims);

  const supportShape = new THREE.Shape();
  supportShape.moveTo(-0.38, 0.23);
  supportShape.lineTo(0.78, 0.23);
  supportShape.bezierCurveTo(0.72, 0.42, 0.57, 0.82, 0.48, 1.08);
  supportShape.bezierCurveTo(0.39, 1.35, 0.31, 1.52, 0.16, 1.58);
  supportShape.lineTo(-0.04, 1.58);
  supportShape.bezierCurveTo(-0.04, 1.31, -0.12, 0.72, -0.38, 0.23);

  const support_bracketGeom = new THREE.ExtrudeGeometry(supportShape, {
    depth: 0.42,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 2,
  });
  const support_bracket = new THREE.Mesh(support_bracketGeom, castMat);
  support_bracket.rotation.y = Math.PI / 2;
  support_bracket.position.set(0.27, 0, 0);
  root.add(support_bracket);

  const housing_assembly = new THREE.Group();
  housing_assembly.position.y = 1.5;
  root.add(housing_assembly);

  const main_housingGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.86, 48);
  const main_housing = new THREE.Mesh(main_housingGeom, castMat);
  main_housing.rotation.x = Math.PI / 2;
  main_housing.position.z = -0.08;
  housing_assembly.add(main_housing);

  const housing_seamGeom = new THREE.TorusGeometry(0.992, 0.012, 6, 64);
  const housing_seam = new THREE.Mesh(housing_seamGeom, darkMetalMat);
  housing_seam.position.z = 0.08;
  housing_assembly.add(housing_seam);

  const rear_housing_edgeGeom = new THREE.TorusGeometry(0.94, 0.045, 10, 48);
  const rear_housing_edge = new THREE.Mesh(rear_housing_edgeGeom, castMat);
  rear_housing_edge.position.z = -0.51;
  housing_assembly.add(rear_housing_edge);

  const front_cast_rimGeom = new THREE.CylinderGeometry(0.94, 0.94, 0.12, 48);
  const front_cast_rim = new THREE.Mesh(front_cast_rimGeom, castMat);
  front_cast_rim.rotation.x = Math.PI / 2;
  front_cast_rim.position.z = 0.38;
  housing_assembly.add(front_cast_rim);

  const front_faceGeom = new THREE.CylinderGeometry(0.88, 0.88, 0.045, 48);
  const front_face = new THREE.Mesh(front_faceGeom, machinedMat);
  front_face.rotation.x = Math.PI / 2;
  front_face.position.z = 0.455;
  housing_assembly.add(front_face);

  const front_outer_edgeGeom = new THREE.TorusGeometry(0.875, 0.035, 10, 64);
  const front_outer_edge = new THREE.Mesh(front_outer_edgeGeom, machinedMat);
  front_outer_edge.position.z = 0.48;
  housing_assembly.add(front_outer_edge);

  const front_bearing_recessGeom = new THREE.CylinderGeometry(0.69, 0.69, 0.035, 48);
  const front_bearing_recess = new THREE.Mesh(front_bearing_recessGeom, recessMat);
  front_bearing_recess.rotation.x = Math.PI / 2;
  front_bearing_recess.position.z = 0.49;
  housing_assembly.add(front_bearing_recess);

  const front_bearing_ringGeom = new THREE.TorusGeometry(0.61, 0.075, 12, 64);
  const front_bearing_ring = new THREE.Mesh(front_bearing_ringGeom, darkMetalMat);
  front_bearing_ring.position.z = 0.515;
  housing_assembly.add(front_bearing_ring);

  const front_bolt_recessesGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.026,
    18
  );
  const front_bolt_recesses = new THREE.InstancedMesh(
    front_bolt_recessesGeom,
    recessMat,
    4
  );
  const front_bolt_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    front_bolt_dummy.position.set(
      Math.cos(angle) * 0.78,
      Math.sin(angle) * 0.78,
      0.505
    );
    front_bolt_dummy.rotation.set(Math.PI / 2, 0, 0);
    front_bolt_dummy.updateMatrix();
    front_bolt_recesses.setMatrixAt(i, front_bolt_dummy.matrix);
  }
  front_bolt_recesses.instanceMatrix.needsUpdate = true;
  housing_assembly.add(front_bolt_recesses);

  const spindle_base_collarGeom = new THREE.CylinderGeometry(
    0.57,
    0.57,
    0.18,
    48
  );
  const spindle_base_collar = new THREE.Mesh(
    spindle_base_collarGeom,
    darkMetalMat
  );
  spindle_base_collar.rotation.x = Math.PI / 2;
  spindle_base_collar.position.z = 0.57;
  housing_assembly.add(spindle_base_collar);

  const spindle_collar_ringGeom = new THREE.TorusGeometry(0.5, 0.045, 10, 48);
  const spindle_collar_ring = new THREE.Mesh(
    spindle_collar_ringGeom,
    machinedMat
  );
  spindle_collar_ring.position.z = 0.67;
  housing_assembly.add(spindle_collar_ring);

  const spindleGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.82, 48);
  const spindle = new THREE.Mesh(spindleGeom, machinedMat);
  spindle.rotation.x = Math.PI / 2;
  spindle.position.z = 1.03;
  housing_assembly.add(spindle);

  const spindle_noseGeom = new THREE.CylinderGeometry(0.5, 0.46, 0.25, 48);
  const spindle_nose = new THREE.Mesh(spindle_noseGeom, machinedMat);
  spindle_nose.rotation.x = Math.PI / 2;
  spindle_nose.position.z = 1.555;
  housing_assembly.add(spindle_nose);

  const spindle_front_faceGeom = new THREE.CylinderGeometry(
    0.5,
    0.5,
    0.035,
    48
  );
  const spindle_front_face = new THREE.Mesh(
    spindle_front_faceGeom,
    machinedMat
  );
  spindle_front_face.rotation.x = Math.PI / 2;
  spindle_front_face.position.z = 1.695;
  housing_assembly.add(spindle_front_face);

  const spindle_boreGeom = new THREE.CylinderGeometry(0.245, 0.245, 0.018, 32);
  const spindle_bore = new THREE.Mesh(spindle_boreGeom, recessMat);
  spindle_bore.rotation.x = Math.PI / 2;
  spindle_bore.position.z = 1.718;
  housing_assembly.add(spindle_bore);

  const spindle_bore_rimGeom = new THREE.TorusGeometry(0.245, 0.025, 8, 32);
  const spindle_bore_rim = new THREE.Mesh(
    spindle_bore_rimGeom,
    polishedMetalMat
  );
  spindle_bore_rim.position.z = 1.729;
  housing_assembly.add(spindle_bore_rim);

  const spindle_bore_threadsGeom = new THREE.TorusGeometry(0.21, 0.008, 6, 32);
  const spindle_bore_threads = new THREE.InstancedMesh(
    spindle_bore_threadsGeom,
    darkMetalMat,
    3
  );
  const spindle_thread_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    spindle_thread_dummy.position.set(0, 0, 1.726 - i * 0.002);
    spindle_thread_dummy.rotation.set(0, 0, 0);
    spindle_thread_dummy.scale.setScalar(1 - i * 0.13);
    spindle_thread_dummy.updateMatrix();
    spindle_bore_threads.setMatrixAt(i, spindle_thread_dummy.matrix);
  }
  spindle_bore_threads.instanceMatrix.needsUpdate = true;
  housing_assembly.add(spindle_bore_threads);

  const spindle_face_holesGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    0.02,
    16
  );
  const spindle_face_holes = new THREE.InstancedMesh(
    spindle_face_holesGeom,
    recessMat,
    3
  );
  const spindle_hole_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    const angle = 0.35 + i * Math.PI * 2 / 3;
    spindle_hole_dummy.position.set(
      Math.cos(angle) * 0.39,
      Math.sin(angle) * 0.39,
      1.72
    );
    spindle_hole_dummy.rotation.set(Math.PI / 2, 0, 0);
    spindle_hole_dummy.scale.setScalar(1);
    spindle_hole_dummy.updateMatrix();
    spindle_face_holes.setMatrixAt(i, spindle_hole_dummy.matrix);
  }
  spindle_face_holes.instanceMatrix.needsUpdate = true;
  housing_assembly.add(spindle_face_holes);

  const drive_assembly = new THREE.Group();
  root.add(drive_assembly);

  const drive_bushingGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.22, 32);
  const drive_bushing = new THREE.Mesh(drive_bushingGeom, machinedMat);
  drive_bushing.rotation.z = -Math.PI / 2;
  drive_bushing.position.set(1.0, 1.5, -0.18);
  drive_assembly.add(drive_bushing);

  const drive_gasketGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 32);
  const drive_gasket = new THREE.Mesh(drive_gasketGeom, blackRubberMat);
  drive_gasket.rotation.z = -Math.PI / 2;
  drive_gasket.position.set(1.12, 1.5, -0.18);
  drive_assembly.add(drive_gasket);

  const drive_housingGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.5, 10);
  const drive_housing = new THREE.Mesh(drive_housingGeom, castMat);
  drive_housing.rotation.z = -Math.PI / 2;
  drive_housing.position.set(1.39, 1.5, -0.18);
  drive_assembly.add(drive_housing);

  const drive_end_capGeom = new THREE.CylinderGeometry(0.44, 0.44, 0.055, 10);
  const drive_end_cap = new THREE.Mesh(drive_end_capGeom, machinedMat);
  drive_end_cap.rotation.z = -Math.PI / 2;
  drive_end_cap.position.set(1.665, 1.5, -0.18);
  drive_assembly.add(drive_end_cap);

  const crank_socketGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.25, 24);
  const crank_socket = new THREE.Mesh(crank_socketGeom, machinedMat);
  crank_socket.rotation.z = -Math.PI / 2;
  crank_socket.position.set(1.76, 1.5, -0.18);
  drive_assembly.add(crank_socket);

  const adjustment_stemGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.4, 16);
  const adjustment_stem = new THREE.Mesh(adjustment_stemGeom, machinedMat);
  adjustment_stem.position.set(0.78, 2.04, -0.28);
  drive_assembly.add(adjustment_stem);

  const adjustment_knobGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.22, 6);
  const adjustment_knob = new THREE.Mesh(adjustment_knobGeom, machinedMat);
  adjustment_knob.position.set(0.78, 2.32, -0.28);
  drive_assembly.add(adjustment_knob);

  const adjustment_knob_topGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    0.012,
    16
  );
  const adjustment_knob_top = new THREE.Mesh(
    adjustment_knob_topGeom,
    recessMat
  );
  adjustment_knob_top.position.set(0.78, 2.436, -0.28);
  drive_assembly.add(adjustment_knob_top);

  const crank_assembly = new THREE.Group();
  root.add(crank_assembly);

  const crank_arm_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.82, 1.5, -0.18),
    new THREE.Vector3(1.98, 1.52, -0.18),
    new THREE.Vector3(2.18, 1.68, -0.17),
    new THREE.Vector3(2.36, 1.96, -0.15),
    new THREE.Vector3(2.48, 2.28, -0.13),
  ]);
  const crank_armGeom = new THREE.TubeGeometry(
    crank_arm_path,
    32,
    0.075,
    10,
    false
  );
  const crank_arm = new THREE.Mesh(crank_armGeom, polishedMetalMat);
  crank_assembly.add(crank_arm);

  const handle_ferruleGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.18, 24);
  const handle_ferrule = new THREE.Mesh(handle_ferruleGeom, machinedMat);
  handle_ferrule.position.set(2.48, 2.28, -0.13);
  crank_assembly.add(handle_ferrule);

  const crank_handle_profile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.13, 0.0),
    new THREE.Vector2(0.14, 0.12),
    new THREE.Vector2(0.17, 0.25),
    new THREE.Vector2(0.22, 0.42),
    new THREE.Vector2(0.29, 0.56),
    new THREE.Vector2(0.32, 0.68),
    new THREE.Vector2(0.29, 0.8),
    new THREE.Vector2(0.22, 0.89),
    new THREE.Vector2(0.1, 0.95),
    new THREE.Vector2(0.0, 0.97),
  ];
  const crank_handleGeom = new THREE.LatheGeometry(crank_handle_profile, 32);
  const crank_handle = new THREE.Mesh(crank_handleGeom, blackRubberMat);
  crank_handle.position.set(2.48, 2.28, -0.13);
  crank_assembly.add(crank_handle);

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
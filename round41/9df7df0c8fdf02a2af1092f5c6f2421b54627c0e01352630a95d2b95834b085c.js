export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rusted_lantern";

  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x6b3a28,
    metalness: 0.25,
    roughness: 0.9,
  });
  const darkRustMat = new THREE.MeshStandardMaterial({
    color: 0x38231c,
    metalness: 0.2,
    roughness: 0.95,
  });
  const orangeRustMat = new THREE.MeshStandardMaterial({
    color: 0x984d2d,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde5df,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x211713,
    metalness: 0.0,
    roughness: 0.9,
  });

  const base_footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.40, 0.00),
    new THREE.Vector2(0.45, 0.012),
    new THREE.Vector2(0.47, 0.038),
    new THREE.Vector2(0.46, 0.065),
    new THREE.Vector2(0.43, 0.095),
    new THREE.Vector2(0.41, 0.145),
    new THREE.Vector2(0.38, 0.225),
    new THREE.Vector2(0.32, 0.300),
    new THREE.Vector2(0.25, 0.345),
    new THREE.Vector2(0.00, 0.360),
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile, 48);
  const base_foot = new THREE.Mesh(base_footGeom, rustMat);
  base_foot.name = "base_foot";
  root.add(base_foot);

  const base_rimGeom = new THREE.TorusGeometry(0.445, 0.018, 10, 48);
  const base_rim = new THREE.Mesh(base_rimGeom, darkRustMat);
  base_rim.name = "base_rim";
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.035;
  root.add(base_rim);

  const base_neckGeom = new THREE.CylinderGeometry(0.205, 0.225, 0.16, 40);
  const base_neck = new THREE.Mesh(base_neckGeom, rustMat);
  base_neck.name = "base_neck";
  base_neck.position.y = 0.415;
  root.add(base_neck);

  const base_neck_rimGeom = new THREE.TorusGeometry(0.215, 0.012, 8, 40);
  const base_neck_rim = new THREE.Mesh(base_neck_rimGeom, darkRustMat);
  base_neck_rim.name = "base_neck_rim";
  base_neck_rim.rotation.x = Math.PI / 2;
  base_neck_rim.position.y = 0.485;
  root.add(base_neck_rim);

  const lower_glass_bandGeom = new THREE.CylinderGeometry(0.275, 0.27, 0.11, 40);
  const lower_glass_band = new THREE.Mesh(lower_glass_bandGeom, rustMat);
  lower_glass_band.name = "lower_glass_band";
  lower_glass_band.position.y = 0.535;
  root.add(lower_glass_band);

  const lower_glass_rimGeom = new THREE.TorusGeometry(0.268, 0.014, 8, 40);
  const lower_glass_rim = new THREE.Mesh(lower_glass_rimGeom, darkRustMat);
  lower_glass_rim.name = "lower_glass_rim";
  lower_glass_rim.rotation.x = Math.PI / 2;
  lower_glass_rim.position.y = 0.585;
  root.add(lower_glass_rim);

  const glass_chamberProfile = [
    new THREE.Vector2(0.238, 0.575),
    new THREE.Vector2(0.252, 0.595),
    new THREE.Vector2(0.278, 0.740),
    new THREE.Vector2(0.300, 0.950),
    new THREE.Vector2(0.312, 1.120),
    new THREE.Vector2(0.304, 1.180),
  ];
  const glass_chamberGeom = new THREE.LatheGeometry(glass_chamberProfile, 48);
  const glass_chamber = new THREE.Mesh(glass_chamberGeom, glassMat);
  glass_chamber.name = "glass_chamber";
  root.add(glass_chamber);

  const burner_baseGeom = new THREE.CylinderGeometry(0.17, 0.19, 0.065, 32);
  const burner_base = new THREE.Mesh(burner_baseGeom, darkRustMat);
  burner_base.name = "burner_base";
  burner_base.position.y = 0.61;
  root.add(burner_base);

  const wick_tubeGeom = new THREE.CylinderGeometry(0.052, 0.065, 0.31, 24);
  const wick_tube = new THREE.Mesh(wick_tubeGeom, darkRustMat);
  wick_tube.name = "wick_tube";
  wick_tube.position.y = 0.765;
  root.add(wick_tube);

  const wick_openingGeom = new THREE.BoxGeometry(0.09, 0.045, 0.025);
  const wick_opening = new THREE.Mesh(wick_openingGeom, wickMat);
  wick_opening.name = "wick_opening";
  wick_opening.position.set(0, 0.925, 0.055);
  root.add(wick_opening);

  const upper_glass_bandGeom = new THREE.CylinderGeometry(0.335, 0.325, 0.14, 40);
  const upper_glass_band = new THREE.Mesh(upper_glass_bandGeom, rustMat);
  upper_glass_band.name = "upper_glass_band";
  upper_glass_band.position.y = 1.18;
  root.add(upper_glass_band);

  const upper_glass_rimGeom = new THREE.TorusGeometry(0.326, 0.014, 8, 40);
  const upper_glass_rim = new THREE.Mesh(upper_glass_rimGeom, darkRustMat);
  upper_glass_rim.name = "upper_glass_rim";
  upper_glass_rim.rotation.x = Math.PI / 2;
  upper_glass_rim.position.y = 1.115;
  root.add(upper_glass_rim);

  const frame_strutsShape = new THREE.Shape();
  frame_strutsShape.moveTo(-0.026, -0.34);
  frame_strutsShape.lineTo(0.026, -0.34);
  frame_strutsShape.lineTo(0.021, 0.34);
  frame_strutsShape.lineTo(-0.021, 0.34);
  frame_strutsShape.closePath();

  const frame_strutsGeom = new THREE.ExtrudeGeometry(frame_strutsShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  frame_strutsGeom.translate(0, 0, -0.0175);

  const frame_struts = new THREE.InstancedMesh(frame_strutsGeom, rustMat, 4);
  frame_struts.name = "frame_struts";
  const frame_dummy = new THREE.Object3D();
  const frame_angles = [
    Math.PI * 0.25,
    Math.PI * 0.75,
    Math.PI * 1.25,
    Math.PI * 1.75,
  ];
  for (let i = 0; i < frame_angles.length; i++) {
    const angle = frame_angles[i];
    frame_dummy.position.set(
      Math.cos(angle) * 0.34,
      0.83,
      Math.sin(angle) * 0.34
    );
    frame_dummy.rotation.set(0.22, Math.PI / 2 - angle, 0);
    frame_dummy.scale.set(1, 1, 1);
    frame_dummy.updateMatrix();
    frame_struts.setMatrixAt(i, frame_dummy.matrix);
  }
  frame_struts.instanceMatrix.needsUpdate = true;
  root.add(frame_struts);

  const frame_rivetsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 14);
  const frame_rivets = new THREE.InstancedMesh(frame_rivetsGeom, darkRustMat, 4);
  frame_rivets.name = "frame_rivets";
  const rivet_dummy = new THREE.Object3D();
  const up_axis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < frame_angles.length; i++) {
    const angle = frame_angles[i];
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    rivet_dummy.position.set(normal.x * 0.375, 0.69, normal.z * 0.375);
    rivet_dummy.quaternion.setFromUnitVectors(up_axis, normal);
    rivet_dummy.scale.set(1, 1, 1);
    rivet_dummy.updateMatrix();
    frame_rivets.setMatrixAt(i, rivet_dummy.matrix);
  }
  frame_rivets.instanceMatrix.needsUpdate = true;
  root.add(frame_rivets);

  const hood_domeProfile = [
    new THREE.Vector2(0.00, 1.235),
    new THREE.Vector2(0.34, 1.235),
    new THREE.Vector2(0.36, 1.255),
    new THREE.Vector2(0.35, 1.300),
    new THREE.Vector2(0.33, 1.370),
    new THREE.Vector2(0.29, 1.450),
    new THREE.Vector2(0.23, 1.520),
    new THREE.Vector2(0.17, 1.555),
    new THREE.Vector2(0.00, 1.560),
  ];
  const hood_domeGeom = new THREE.LatheGeometry(hood_domeProfile, 48);
  const hood_dome = new THREE.Mesh(hood_domeGeom, rustMat);
  hood_dome.name = "hood_dome";
  root.add(hood_dome);

  const hood_brimGeom = new THREE.CylinderGeometry(0.37, 0.44, 0.045, 48);
  const hood_brim = new THREE.Mesh(hood_brimGeom, rustMat);
  hood_brim.name = "hood_brim";
  hood_brim.position.y = 1.225;
  root.add(hood_brim);

  const hood_edgeGeom = new THREE.TorusGeometry(0.425, 0.014, 8, 48);
  const hood_edge = new THREE.Mesh(hood_edgeGeom, darkRustMat);
  hood_edge.name = "hood_edge";
  hood_edge.rotation.x = Math.PI / 2;
  hood_edge.position.y = 1.205;
  root.add(hood_edge);

  const vent_neckGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.18, 40);
  const vent_neck = new THREE.Mesh(vent_neckGeom, rustMat);
  vent_neck.name = "vent_neck";
  vent_neck.position.y = 1.64;
  root.add(vent_neck);

  const vent_lower_rimGeom = new THREE.TorusGeometry(0.168, 0.011, 8, 40);
  const vent_lower_rim = new THREE.Mesh(vent_lower_rimGeom, darkRustMat);
  vent_lower_rim.name = "vent_lower_rim";
  vent_lower_rim.rotation.x = Math.PI / 2;
  vent_lower_rim.position.y = 1.555;
  root.add(vent_lower_rim);

  const vent_slotsGeom = new THREE.BoxGeometry(0.072, 0.038, 0.014);
  const vent_slots = new THREE.InstancedMesh(vent_slotsGeom, wickMat, 4);
  vent_slots.name = "vent_slots";
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * Math.PI * 2;
    vent_dummy.position.set(
      Math.cos(angle) * 0.172,
      1.685,
      Math.sin(angle) * 0.172
    );
    vent_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    vent_dummy.scale.set(1, 1, 1);
    vent_dummy.updateMatrix();
    vent_slots.setMatrixAt(i, vent_dummy.matrix);
  }
  vent_slots.instanceMatrix.needsUpdate = true;
  root.add(vent_slots);

  const top_capProfile = [
    new THREE.Vector2(0.00, 1.715),
    new THREE.Vector2(0.215, 1.715),
    new THREE.Vector2(0.24, 1.730),
    new THREE.Vector2(0.22, 1.755),
    new THREE.Vector2(0.17, 1.790),
    new THREE.Vector2(0.09, 1.825),
    new THREE.Vector2(0.00, 1.835),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 48);
  const top_cap = new THREE.Mesh(top_capGeom, rustMat);
  top_cap.name = "top_cap";
  root.add(top_cap);

  const top_cap_brimGeom = new THREE.CylinderGeometry(0.22, 0.27, 0.03, 48);
  const top_cap_brim = new THREE.Mesh(top_cap_brimGeom, rustMat);
  top_cap_brim.name = "top_cap_brim";
  top_cap_brim.position.y = 1.72;
  root.add(top_cap_brim);

  const top_cap_edgeGeom = new THREE.TorusGeometry(0.255, 0.011, 8, 48);
  const top_cap_edge = new THREE.Mesh(top_cap_edgeGeom, darkRustMat);
  top_cap_edge.name = "top_cap_edge";
  top_cap_edge.rotation.x = Math.PI / 2;
  top_cap_edge.position.y = 1.707;
  root.add(top_cap_edge);

  const handle_mountsGeom = new THREE.CylinderGeometry(0.034, 0.038, 0.075, 16);
  const handle_mounts = new THREE.InstancedMesh(handle_mountsGeom, darkRustMat, 2);
  handle_mounts.name = "handle_mounts";
  const handle_mount_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    handle_mount_dummy.position.set(i === 0 ? -0.12 : 0.12, 1.825, 0);
    handle_mount_dummy.rotation.set(0, 0, 0);
    handle_mount_dummy.scale.set(1, 1, 1);
    handle_mount_dummy.updateMatrix();
    handle_mounts.setMatrixAt(i, handle_mount_dummy.matrix);
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(handle_mounts);

  const handle_loopGeom = new THREE.TorusGeometry(0.19, 0.026, 12, 56);
  const handle_loop = new THREE.Mesh(handle_loopGeom, rustMat);
  handle_loop.name = "handle_loop";
  handle_loop.position.set(0, 1.99, 0);
  handle_loop.scale.set(1, 1.22, 1);
  root.add(handle_loop);

  const side_latch_path = [
    new THREE.Vector3(0.35, 1.23, -0.05),
    new THREE.Vector3(0.405, 1.10, -0.04),
    new THREE.Vector3(0.415, 0.90, -0.02),
    new THREE.Vector3(0.385, 0.70, 0.01),
    new THREE.Vector3(0.33, 0.57, 0.05),
  ];
  const side_latchGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(side_latch_path, false, "centripetal"),
    32,
    0.012,
    8,
    false
  );
  const side_latch = new THREE.Mesh(side_latchGeom, darkRustMat);
  side_latch.name = "side_latch";
  root.add(side_latch);

  const front_lift_loop_path = [
    new THREE.Vector3(0.105, 0.68, 0.35),
    new THREE.Vector3(0.095, 0.58, 0.365),
    new THREE.Vector3(0.045, 0.49, 0.37),
    new THREE.Vector3(-0.025, 0.48, 0.365),
    new THREE.Vector3(-0.095, 0.56, 0.35),
    new THREE.Vector3(-0.105, 0.67, 0.34),
  ];
  const front_lift_loopGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(front_lift_loop_path, false, "centripetal"),
    32,
    0.014,
    8,
    false
  );
  const front_lift_loop = new THREE.Mesh(front_lift_loopGeom, rustMat);
  front_lift_loop.name = "front_lift_loop";
  root.add(front_lift_loop);

  const base_latch_path = [
    new THREE.Vector3(0.18, 0.50, 0.22),
    new THREE.Vector3(0.24, 0.48, 0.235),
    new THREE.Vector3(0.29, 0.50, 0.22),
    new THREE.Vector3(0.31, 0.535, 0.20),
  ];
  const base_latchGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(base_latch_path, false, "centripetal"),
    20,
    0.009,
    7,
    false
  );
  const base_latch = new THREE.Mesh(base_latchGeom, darkRustMat);
  base_latch.name = "base_latch";
  root.add(base_latch);

  const base_latch_knobGeom = new THREE.SphereGeometry(0.018, 12, 8);
  const base_latch_knob = new THREE.Mesh(base_latch_knobGeom, rustMat);
  base_latch_knob.name = "base_latch_knob";
  base_latch_knob.position.set(0.31, 0.535, 0.20);
  root.add(base_latch_knob);

  const internal_braces = new THREE.Group();
  internal_braces.name = "internal_braces";

  const internal_brace_aGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.19, 1.10, 0.17),
      new THREE.Vector3(0.19, 0.62, 0.17)
    ),
    1,
    0.008,
    6,
    false
  );
  const internal_brace_a = new THREE.Mesh(internal_brace_aGeom, darkRustMat);
  internal_brace_a.name = "internal_brace_a";
  internal_braces.add(internal_brace_a);

  const internal_brace_bGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.19, 1.10, 0.16),
      new THREE.Vector3(-0.19, 0.62, 0.16)
    ),
    1,
    0.008,
    6,
    false
  );
  const internal_brace_b = new THREE.Mesh(internal_brace_bGeom, darkRustMat);
  internal_brace_b.name = "internal_brace_b";
  internal_braces.add(internal_brace_b);
  root.add(internal_braces);

  const rust_patchesGeom = new THREE.CircleGeometry(0.026, 10);
  const rust_patches = new THREE.InstancedMesh(rust_patchesGeom, orangeRustMat, 18);
  rust_patches.name = "rust_patches";
  const patch_dummy = new THREE.Object3D();
  const patch_normal_axis = new THREE.Vector3(0, 0, 1);

  function setPatch(index, position, normal, sx, sy, rotation) {
    const outward = normal.clone().normalize();
    patch_dummy.position.copy(position).addScaledVector(outward, 0.004);
    patch_dummy.quaternion.setFromUnitVectors(patch_normal_axis, outward);
    patch_dummy.rotateZ(rotation);
    patch_dummy.scale.set(sx, sy, 1);
    patch_dummy.updateMatrix();
    rust_patches.setMatrixAt(index, patch_dummy.matrix);
  }

  for (let i = 0; i < 7; i++) {
    const angle = 0.35 + i * 2.399;
    const y = 0.075 + (i % 4) * 0.055;
    const radius = 0.445 - Math.max(0, y - 0.06) * 0.48;
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0.42,
      Math.sin(angle)
    ).normalize();
    setPatch(
      i,
      new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
      normal,
      0.7 + (i % 3) * 0.22,
      0.45 + ((i + 1) % 3) * 0.16,
      i * 0.73
    );
  }

  for (let i = 0; i < 7; i++) {
    const angle = 0.55 + i * 2.15;
    const y = 1.285 + (i % 4) * 0.06;
    const radius = 0.405 - Math.max(0, y - 1.25) * 0.62;
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0.55,
      Math.sin(angle)
    ).normalize();
    setPatch(
      7 + i,
      new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
      normal,
      0.55 + (i % 3) * 0.18,
      0.38 + ((i + 2) % 3) * 0.15,
      i * 0.61
    );
  }

  for (let i = 0; i < 4; i++) {
    const angle = 0.4 + i * 1.55;
    const y = 0.63 + i * 0.14;
    const radius = 0.36;
    const normal = new THREE.Vector3(
      Math.cos(angle),
      -0.2,
      Math.sin(angle)
    ).normalize();
    setPatch(
      14 + i,
      new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
      normal,
      0.42 + i * 0.08,
      0.75 + (i % 2) * 0.25,
      -0.35 + i * 0.45
    );
  }

  rust_patches.instanceMatrix.needsUpdate = true;
  root.add(rust_patches);

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
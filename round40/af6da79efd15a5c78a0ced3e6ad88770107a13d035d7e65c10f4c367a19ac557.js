export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_cylindrical_holder";

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0x8a5038,
    metalness: 0.5,
    roughness: 0.58,
    side: THREE.DoubleSide,
  });
  const inner_copperMat = new THREE.MeshStandardMaterial({
    color: 0x432a24,
    metalness: 0.35,
    roughness: 0.78,
    side: THREE.DoubleSide,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xc89b45,
    metalness: 0.6,
    roughness: 0.28,
    side: THREE.DoubleSide,
  });
  const dark_brassMat = new THREE.MeshStandardMaterial({
    color: 0x80602f,
    metalness: 0.5,
    roughness: 0.5,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x34352f,
    metalness: 0.15,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0x6b3d2e,
    metalness: 0.25,
    roughness: 0.82,
    side: THREE.DoubleSide,
  });

  const bodyLength = 0.84;
  const rearRadius = 0.285;
  const frontRadius = 0.345;
  const bodySlope = (frontRadius - rearRadius) / bodyLength;

  function radiusAt(z) {
    const t = (z + bodyLength * 0.5) / bodyLength;
    return rearRadius + (frontRadius - rearRadius) * t;
  }

  function surfaceFrame(angle, z, offset) {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const axis = new THREE.Vector3(cosine * bodySlope, sine * bodySlope, 1).normalize();
    const tangent = new THREE.Vector3(-sine, cosine, 0).normalize();
    const normal = new THREE.Vector3(cosine, sine, -bodySlope).normalize();
    const radius = radiusAt(z);
    const position = new THREE.Vector3(cosine * radius, sine * radius, z);
    position.addScaledVector(normal, offset);
    const basis = new THREE.Matrix4().makeBasis(tangent, axis, normal);
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(basis);
    return { position, quaternion, normal };
  }

  const body_shellGeom = new THREE.CylinderGeometry(
    frontRadius,
    rearRadius,
    bodyLength,
    48,
    1,
    true
  );
  const body_shell = new THREE.Mesh(body_shellGeom, copperMat);
  body_shell.name = "body_shell";
  body_shell.rotation.x = Math.PI / 2;
  root.add(body_shell);

  const inner_liningGeom = new THREE.CylinderGeometry(
    frontRadius - 0.025,
    rearRadius - 0.022,
    bodyLength - 0.025,
    48,
    1,
    true
  );
  const inner_lining = new THREE.Mesh(inner_liningGeom, inner_copperMat);
  inner_lining.name = "inner_lining";
  inner_lining.rotation.x = Math.PI / 2;
  root.add(inner_lining);

  const rear_capGeom = new THREE.CylinderGeometry(
    rearRadius - 0.008,
    rearRadius - 0.008,
    0.032,
    48
  );
  const rear_cap = new THREE.Mesh(rear_capGeom, copperMat);
  rear_cap.name = "rear_cap";
  rear_cap.rotation.x = Math.PI / 2;
  rear_cap.position.z = -0.425;
  root.add(rear_cap);

  const rear_brass_bandGeom = new THREE.CylinderGeometry(
    rearRadius + 0.016,
    rearRadius + 0.016,
    0.058,
    48,
    1,
    true
  );
  const rear_brass_band = new THREE.Mesh(rear_brass_bandGeom, brassMat);
  rear_brass_band.name = "rear_brass_band";
  rear_brass_band.rotation.x = Math.PI / 2;
  rear_brass_band.position.z = -0.407;
  root.add(rear_brass_band);

  const rear_rimGeom = new THREE.TorusGeometry(
    rearRadius - 0.006,
    0.022,
    12,
    48
  );
  const rear_rim = new THREE.Mesh(rear_rimGeom, brassMat);
  rear_rim.name = "rear_rim";
  rear_rim.position.z = -0.438;
  root.add(rear_rim);

  const front_brass_bandGeom = new THREE.CylinderGeometry(
    frontRadius + 0.012,
    frontRadius + 0.004,
    0.075,
    48,
    1,
    true
  );
  const front_brass_band = new THREE.Mesh(front_brass_bandGeom, brassMat);
  front_brass_band.name = "front_brass_band";
  front_brass_band.rotation.x = Math.PI / 2;
  front_brass_band.position.z = 0.397;
  root.add(front_brass_band);

  const front_rimGeom = new THREE.TorusGeometry(
    frontRadius - 0.007,
    0.034,
    14,
    56
  );
  const front_rim = new THREE.Mesh(front_rimGeom, brassMat);
  front_rim.name = "front_rim";
  front_rim.position.z = 0.437;
  root.add(front_rim);

  const inner_front_ringGeom = new THREE.TorusGeometry(
    frontRadius - 0.045,
    0.012,
    10,
    48
  );
  const inner_front_ring = new THREE.Mesh(inner_front_ringGeom, dark_brassMat);
  inner_front_ring.name = "inner_front_ring";
  inner_front_ring.position.z = 0.421;
  root.add(inner_front_ring);

  const front_guard_points = [];
  const guardStart = 0.72;
  const guardEnd = Math.PI * 2 - 0.72;
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const angle = guardStart + (guardEnd - guardStart) * t;
    const radius = frontRadius + 0.052;
    front_guard_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.348
      )
    );
  }
  const front_guard_curve = new THREE.CatmullRomCurve3(
    front_guard_points,
    false,
    "centripetal"
  );
  const front_guard_railGeom = new THREE.TubeGeometry(
    front_guard_curve,
    48,
    0.017,
    8,
    false
  );
  const front_guard_rail = new THREE.Mesh(front_guard_railGeom, brassMat);
  front_guard_rail.name = "front_guard_rail";
  root.add(front_guard_rail);

  const seamAngle = 0.72;
  const body_split_points = [];
  for (let i = 0; i <= 10; i++) {
    const z = -0.37 + (0.71 * i) / 10;
    const radius = radiusAt(z) + 0.006;
    body_split_points.push(
      new THREE.Vector3(
        Math.cos(seamAngle) * radius,
        Math.sin(seamAngle) * radius,
        z
      )
    );
  }
  const body_split_curve = new THREE.CatmullRomCurve3(
    body_split_points,
    false,
    "centripetal"
  );
  const body_split_seamGeom = new THREE.TubeGeometry(
    body_split_curve,
    24,
    0.006,
    6,
    false
  );
  const body_split_seam = new THREE.Mesh(body_split_seamGeom, patinaMat);
  body_split_seam.name = "body_split_seam";
  root.add(body_split_seam);

  const seam_highlight_points = [];
  const highlightAngle = seamAngle - 0.018;
  for (let i = 0; i <= 10; i++) {
    const z = -0.36 + (0.69 * i) / 10;
    const radius = radiusAt(z) + 0.011;
    seam_highlight_points.push(
      new THREE.Vector3(
        Math.cos(highlightAngle) * radius,
        Math.sin(highlightAngle) * radius,
        z
      )
    );
  }
  const seam_highlight_curve = new THREE.CatmullRomCurve3(
    seam_highlight_points,
    false,
    "centripetal"
  );
  const seam_highlightGeom = new THREE.TubeGeometry(
    seam_highlight_curve,
    24,
    0.004,
    6,
    false
  );
  const seam_highlight = new THREE.Mesh(seam_highlightGeom, brassMat);
  seam_highlight.name = "seam_highlight";
  root.add(seam_highlight);

  const front_guard_terminalsGeom = new THREE.SphereGeometry(0.021, 12, 8);
  const front_guard_terminals = new THREE.InstancedMesh(
    front_guard_terminalsGeom,
    brassMat,
    2
  );
  front_guard_terminals.name = "front_guard_terminals";
  const terminal_dummy = new THREE.Object3D();
  const terminalAngles = [guardStart, guardEnd];
  for (let i = 0; i < terminalAngles.length; i++) {
    const angle = terminalAngles[i];
    const radius = frontRadius + 0.052;
    terminal_dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.348
    );
    terminal_dummy.updateMatrix();
    front_guard_terminals.setMatrixAt(i, terminal_dummy.matrix);
  }
  front_guard_terminals.instanceMatrix.needsUpdate = true;
  root.add(front_guard_terminals);

  const axle_mountGeom = new THREE.CylinderGeometry(0.055, 0.07, 0.045, 24);
  const axle_mount = new THREE.Mesh(axle_mountGeom, dark_brassMat);
  axle_mount.name = "axle_mount";
  axle_mount.rotation.x = Math.PI / 2;
  axle_mount.position.z = -0.452;
  root.add(axle_mount);

  const axle_rodGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.49, 16);
  const axle_rod = new THREE.Mesh(axle_rodGeom, brassMat);
  axle_rod.name = "axle_rod";
  axle_rod.rotation.x = Math.PI / 2;
  axle_rod.position.z = -0.69;
  root.add(axle_rod);

  const axle_endGeom = new THREE.SphereGeometry(0.025, 16, 10);
  const axle_end = new THREE.Mesh(axle_endGeom, brassMat);
  axle_end.name = "axle_end";
  axle_end.position.z = -0.945;
  root.add(axle_end);

  const inner_pivot_stemGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.36,
    16
  );
  const inner_pivot_stem = new THREE.Mesh(inner_pivot_stemGeom, dark_brassMat);
  inner_pivot_stem.name = "inner_pivot_stem";
  inner_pivot_stem.rotation.x = Math.PI / 2;
  inner_pivot_stem.position.z = 0.235;
  root.add(inner_pivot_stem);

  const inner_pivot_capGeom = new THREE.CylinderGeometry(
    0.066,
    0.066,
    0.038,
    28
  );
  const inner_pivot_cap = new THREE.Mesh(inner_pivot_capGeom, brassMat);
  inner_pivot_cap.name = "inner_pivot_cap";
  inner_pivot_cap.rotation.x = Math.PI / 2;
  inner_pivot_cap.position.z = 0.407;
  root.add(inner_pivot_cap);

  const inner_pivot_faceGeom = new THREE.SphereGeometry(0.064, 24, 12);
  const inner_pivot_face = new THREE.Mesh(inner_pivot_faceGeom, brassMat);
  inner_pivot_face.name = "inner_pivot_face";
  inner_pivot_face.scale.set(1, 1, 0.28);
  inner_pivot_face.position.z = 0.431;
  root.add(inner_pivot_face);

  const patina_spotsGeom = new THREE.CircleGeometry(0.018, 12);
  const patina_spots = new THREE.InstancedMesh(
    patina_spotsGeom,
    patinaMat,
    28
  );
  patina_spots.name = "patina_spots";
  const patina_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = (((i * 11) % 28) / 28) * Math.PI * 2;
    const z = -0.35 + (((i * 9) % 27) / 26) * 0.68;
    const frame = surfaceFrame(angle, z, 0.004);
    const sx = 0.38 + ((i * 7) % 9) * 0.105;
    const sy = 0.28 + ((i * 5) % 7) * 0.08;
    patina_dummy.position.copy(frame.position);
    patina_dummy.quaternion.copy(frame.quaternion);
    patina_dummy.scale.set(sx, sy, 1);
    patina_dummy.updateMatrix();
    patina_spots.setMatrixAt(i, patina_dummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  root.add(patina_spots);

  const wear_marksGeom = new THREE.CircleGeometry(0.014, 10);
  const wear_marks = new THREE.InstancedMesh(wear_marksGeom, wearMat, 18);
  wear_marks.name = "wear_marks";
  const wear_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = 0.18 + (((i * 7) % 18) / 17) * 2.75;
    const z = -0.31 + (((i * 5) % 17) / 16) * 0.61;
    const frame = surfaceFrame(angle, z, 0.0045);
    const sx = 0.45 + ((i * 3) % 8) * 0.13;
    const sy = 0.18 + ((i * 4) % 6) * 0.055;
    wear_dummy.position.copy(frame.position);
    wear_dummy.quaternion.copy(frame.quaternion);
    wear_dummy.scale.set(sx, sy, 1);
    wear_dummy.updateMatrix();
    wear_marks.setMatrixAt(i, wear_dummy.matrix);
  }
  wear_marks.instanceMatrix.needsUpdate = true;
  root.add(wear_marks);

  const scratch_marksGeom = new THREE.BoxGeometry(0.006, 0.065, 0.002);
  const scratch_marks = new THREE.InstancedMesh(
    scratch_marksGeom,
    patinaMat,
    16
  );
  scratch_marks.name = "scratch_marks";
  const scratch_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = 0.25 + (((i * 5) % 16) / 15) * 2.55;
    const z = -0.3 + (((i * 7) % 15) / 14) * 0.6;
    const frame = surfaceFrame(angle, z, 0.005);
    scratch_dummy.position.copy(frame.position);
    scratch_dummy.quaternion.copy(frame.quaternion);
    scratch_dummy.rotateZ(-0.42 + (i % 5) * 0.18);
    scratch_dummy.scale.set(
      0.65 + (i % 3) * 0.22,
      0.45 + ((i * 3) % 6) * 0.12,
      1
    );
    scratch_dummy.updateMatrix();
    scratch_marks.setMatrixAt(i, scratch_dummy.matrix);
  }
  scratch_marks.instanceMatrix.needsUpdate = true;
  root.add(scratch_marks);

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
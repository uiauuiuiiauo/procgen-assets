export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "paint_kit";

  const bucket_group = new THREE.Group();
  bucket_group.name = "bucket_group";
  bucket_group.position.set(0.2, 0, -0.15);
  root.add(bucket_group);

  const bucket_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa9c3dc,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bucket_innerMat = new THREE.MeshStandardMaterial({
    color: 0xaab8c6,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const bucket_rimMat = new THREE.MeshStandardMaterial({
    color: 0xdce4eb,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bucket_bottom_rimMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const bucket_seamMat = new THREE.MeshStandardMaterial({
    color: 0x7f98ad,
    metalness: 0.0,
    roughness: 0.7,
  });
  const handle_mountMat = new THREE.MeshStandardMaterial({
    color: 0xd8e0e7,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blue_handleMat = new THREE.MeshStandardMaterial({
    color: 0x2455b6,
    metalness: 0.0,
    roughness: 0.3,
  });
  const handle_holeMat = new THREE.MeshStandardMaterial({
    color: 0x071d54,
    metalness: 0.0,
    roughness: 0.8,
  });

  const bucket_bodyGeom = new THREE.CylinderGeometry(
    0.62,
    0.6,
    1.0,
    64,
    1,
    true
  );
  const bucket_body = new THREE.Mesh(bucket_bodyGeom, bucket_bodyMat);
  bucket_body.name = "bucket_body";
  bucket_body.position.y = 0.5;
  bucket_group.add(bucket_body);

  const bucket_inner_wallGeom = new THREE.CylinderGeometry(
    0.585,
    0.565,
    0.94,
    64,
    1,
    true
  );
  const bucket_inner_wall = new THREE.Mesh(
    bucket_inner_wallGeom,
    bucket_innerMat
  );
  bucket_inner_wall.name = "bucket_inner_wall";
  bucket_inner_wall.position.y = 0.51;
  bucket_group.add(bucket_inner_wall);

  const bucket_inner_bottomGeom = new THREE.CircleGeometry(0.565, 64);
  const bucket_inner_bottom = new THREE.Mesh(
    bucket_inner_bottomGeom,
    bucket_innerMat
  );
  bucket_inner_bottom.name = "bucket_inner_bottom";
  bucket_inner_bottom.rotation.x = -Math.PI / 2;
  bucket_inner_bottom.position.y = 0.045;
  bucket_group.add(bucket_inner_bottom);

  const bucket_bottomGeom = new THREE.CylinderGeometry(
    0.602,
    0.602,
    0.025,
    64
  );
  const bucket_bottom = new THREE.Mesh(bucket_bottomGeom, bucket_bodyMat);
  bucket_bottom.name = "bucket_bottom";
  bucket_bottom.position.y = 0.0125;
  bucket_group.add(bucket_bottom);

  const bucket_bottom_rimGeom = new THREE.TorusGeometry(
    0.596,
    0.018,
    10,
    64
  );
  const bucket_bottom_rim = new THREE.Mesh(
    bucket_bottom_rimGeom,
    bucket_bottom_rimMat
  );
  bucket_bottom_rim.name = "bucket_bottom_rim";
  bucket_bottom_rim.rotation.x = Math.PI / 2;
  bucket_bottom_rim.position.y = 0.02;
  bucket_group.add(bucket_bottom_rim);

  const bucket_top_flangeGeom = new THREE.CylinderGeometry(
    0.625,
    0.618,
    0.05,
    64,
    1,
    true
  );
  const bucket_top_flange = new THREE.Mesh(
    bucket_top_flangeGeom,
    bucket_rimMat
  );
  bucket_top_flange.name = "bucket_top_flange";
  bucket_top_flange.position.y = 0.985;
  bucket_group.add(bucket_top_flange);

  const bucket_top_rimGeom = new THREE.TorusGeometry(
    0.602,
    0.027,
    12,
    64
  );
  const bucket_top_rim = new THREE.Mesh(bucket_top_rimGeom, bucket_rimMat);
  bucket_top_rim.name = "bucket_top_rim";
  bucket_top_rim.rotation.x = Math.PI / 2;
  bucket_top_rim.position.y = 1.01;
  bucket_group.add(bucket_top_rim);

  const bucket_inner_rimGeom = new THREE.TorusGeometry(
    0.572,
    0.009,
    8,
    64
  );
  const bucket_inner_rim = new THREE.Mesh(
    bucket_inner_rimGeom,
    bucket_innerMat
  );
  bucket_inner_rim.name = "bucket_inner_rim";
  bucket_inner_rim.rotation.x = Math.PI / 2;
  bucket_inner_rim.position.y = 0.992;
  bucket_group.add(bucket_inner_rim);

  const bucket_seamGeom = new THREE.CylinderGeometry(
    0.004,
    0.004,
    0.89,
    8
  );
  const bucket_seam = new THREE.Mesh(bucket_seamGeom, bucket_seamMat);
  bucket_seam.name = "bucket_seam";
  bucket_seam.position.set(0.23, 0.49, 0.558);
  bucket_group.add(bucket_seam);

  const handle_mountGeom = new THREE.SphereGeometry(1, 24, 14);
  const handle_mount = new THREE.Mesh(handle_mountGeom, handle_mountMat);
  handle_mount.name = "handle_mount";
  handle_mount.scale.set(0.075, 0.14, 0.16);
  handle_mount.position.set(0.61, 0.78, -0.02);
  bucket_group.add(handle_mount);

  const blue_handleShape = new THREE.Shape();
  blue_handleShape.moveTo(0.53, 0.68);
  blue_handleShape.bezierCurveTo(0.67, 0.72, 0.78, 0.8, 0.91, 0.86);
  blue_handleShape.bezierCurveTo(1.08, 0.94, 1.27, 0.99, 1.41, 1.01);
  blue_handleShape.bezierCurveTo(1.47, 1.02, 1.5, 1.055, 1.49, 1.1);
  blue_handleShape.bezierCurveTo(1.48, 1.15, 1.44, 1.175, 1.38, 1.17);
  blue_handleShape.bezierCurveTo(1.2, 1.14, 1.02, 1.08, 0.86, 1.0);
  blue_handleShape.bezierCurveTo(0.74, 0.94, 0.64, 0.9, 0.53, 0.88);
  blue_handleShape.closePath();

  const blue_handleGeom = new THREE.ExtrudeGeometry(blue_handleShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
  });
  blue_handleGeom.translate(0, 0, -0.07);

  const blue_handle = new THREE.Mesh(blue_handleGeom, blue_handleMat);
  blue_handle.name = "blue_handle";
  blue_handle.position.z = -0.02;
  bucket_group.add(blue_handle);

  const handle_holeGeom = new THREE.CircleGeometry(0.043, 24);
  const handle_hole = new THREE.Mesh(handle_holeGeom, handle_holeMat);
  handle_hole.name = "handle_hole";
  handle_hole.scale.set(1.25, 0.62, 1);
  handle_hole.position.set(1.39, 1.105, 0.073);
  bucket_group.add(handle_hole);

  const handle_hole_rimGeom = new THREE.TorusGeometry(
    0.043,
    0.007,
    8,
    24
  );
  const handle_hole_rim = new THREE.Mesh(
    handle_hole_rimGeom,
    blue_handleMat
  );
  handle_hole_rim.name = "handle_hole_rim";
  handle_hole_rim.scale.set(1.25, 0.62, 1);
  handle_hole_rim.position.set(1.39, 1.105, 0.076);
  bucket_group.add(handle_hole_rim);

  const roller_group = new THREE.Group();
  roller_group.name = "roller_group";
  roller_group.position.set(-0.73, 0.2, 0.42);
  roller_group.rotation.y = -0.28;
  root.add(roller_group);

  const roller_coreMat = new THREE.MeshStandardMaterial({
    color: 0xe5d5ae,
    metalness: 0.0,
    roughness: 0.95,
  });
  const roller_fibersMat = new THREE.MeshStandardMaterial({
    color: 0xf5efd8,
    metalness: 0.0,
    roughness: 0.95,
  });
  const roller_frameMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const roller_hubMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const roller_axleMat = new THREE.MeshStandardMaterial({
    color: 0x55595c,
    metalness: 0.5,
    roughness: 0.5,
  });

  const roller_coreGeom = new THREE.CylinderGeometry(
    0.17,
    0.17,
    0.62,
    32
  );
  const roller_core = new THREE.Mesh(roller_coreGeom, roller_coreMat);
  roller_core.name = "roller_core";
  roller_core.rotation.z = Math.PI / 2;
  roller_group.add(roller_core);

  const roller_end_capGeom = new THREE.SphereGeometry(0.17, 24, 14);

  const roller_left_end_cap = new THREE.Mesh(
    roller_end_capGeom,
    roller_coreMat
  );
  roller_left_end_cap.name = "roller_left_end_cap";
  roller_left_end_cap.scale.x = 0.34;
  roller_left_end_cap.position.x = -0.31;
  roller_group.add(roller_left_end_cap);

  const roller_right_end_cap = new THREE.Mesh(
    roller_end_capGeom,
    roller_coreMat
  );
  roller_right_end_cap.name = "roller_right_end_cap";
  roller_right_end_cap.scale.x = 0.34;
  roller_right_end_cap.position.x = 0.31;
  roller_group.add(roller_right_end_cap);

  const roller_fibersGeom = new THREE.ConeGeometry(0.006, 0.04, 5);
  const roller_fibers = new THREE.InstancedMesh(
    roller_fibersGeom,
    roller_fibersMat,
    120
  );
  roller_fibers.name = "roller_fibers";

  const fiber_dummy = new THREE.Object3D();
  const fiber_up = new THREE.Vector3(0, 1, 0);
  const fiber_normal = new THREE.Vector3();

  for (let i = 0; i < 120; i++) {
    const ring = Math.floor(i / 12);
    const spoke = i % 12;
    const x = -0.275 + ring * (0.55 / 11);
    const angle =
      (spoke / 12) * Math.PI * 2 + (ring % 2) * (Math.PI / 12);
    const lengthScale = 0.82 + ((i * 7) % 5) * 0.045;

    fiber_normal.set(0, Math.cos(angle), Math.sin(angle)).normalize();
    fiber_dummy.position.set(
      x,
      fiber_normal.y * 0.182,
      fiber_normal.z * 0.182
    );
    fiber_dummy.quaternion.setFromUnitVectors(fiber_up, fiber_normal);
    fiber_dummy.scale.set(1, lengthScale, 1);
    fiber_dummy.updateMatrix();
    roller_fibers.setMatrixAt(i, fiber_dummy.matrix);
  }
  roller_fibers.instanceMatrix.needsUpdate = true;
  roller_group.add(roller_fibers);

  const roller_end_fibers = new THREE.InstancedMesh(
    roller_fibersGeom,
    roller_fibersMat,
    48
  );
  roller_end_fibers.name = "roller_end_fibers";

  for (let i = 0; i < 48; i++) {
    const side = i < 24 ? -1 : 1;
    const j = i % 24;
    const ring = Math.floor(j / 6);
    const spoke = j % 6;
    const angle =
      (spoke / 6) * Math.PI * 2 + ring * (Math.PI / 6);
    const radial = 0.045 + ring * 0.04;
    const lengthScale = 0.84 + ((i * 5) % 4) * 0.05;

    fiber_normal.set(side, Math.cos(angle), Math.sin(angle)).normalize();
    fiber_dummy.position.set(
      side * 0.365 + fiber_normal.x * 0.012,
      fiber_normal.y * radial,
      fiber_normal.z * radial
    );
    fiber_dummy.quaternion.setFromUnitVectors(fiber_up, fiber_normal);
    fiber_dummy.scale.set(1, lengthScale, 1);
    fiber_dummy.updateMatrix();
    roller_end_fibers.setMatrixAt(i, fiber_dummy.matrix);
  }
  roller_end_fibers.instanceMatrix.needsUpdate = true;
  roller_group.add(roller_end_fibers);

  const roller_hubGeom = new THREE.CylinderGeometry(
    0.064,
    0.064,
    0.027,
    24
  );
  const roller_hub = new THREE.Mesh(roller_hubGeom, roller_hubMat);
  roller_hub.name = "roller_hub";
  roller_hub.rotation.z = Math.PI / 2;
  roller_hub.position.x = 0.375;
  roller_group.add(roller_hub);

  const roller_axleGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.11,
    16
  );
  const roller_axle = new THREE.Mesh(roller_axleGeom, roller_axleMat);
  roller_axle.name = "roller_axle";
  roller_axle.rotation.z = Math.PI / 2;
  roller_axle.position.x = 0.425;
  roller_group.add(roller_axle);

  const roller_axle_tipGeom = new THREE.ConeGeometry(0.024, 0.06, 16);
  const roller_axle_tip = new THREE.Mesh(
    roller_axle_tipGeom,
    roller_axleMat
  );
  roller_axle_tip.name = "roller_axle_tip";
  roller_axle_tip.rotation.z = -Math.PI / 2;
  roller_axle_tip.position.x = 0.49;
  roller_group.add(roller_axle_tip);

  const roller_framePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.36, -0.045, 0.02),
      new THREE.Vector3(0.3, -0.1, 0.02),
      new THREE.Vector3(0.08, -0.135, 0.02),
      new THREE.Vector3(-0.25, -0.14, 0.02),
      new THREE.Vector3(-0.38, -0.105, 0.02),
      new THREE.Vector3(-0.42, -0.045, 0.02),
      new THREE.Vector3(-0.39, 0.015, 0.02),
      new THREE.Vector3(-0.34, 0.03, 0.02),
    ],
    false,
    "centripetal"
  );
  const roller_frameGeom = new THREE.TubeGeometry(
    roller_framePath,
    40,
    0.018,
    8,
    false
  );
  const roller_frame = new THREE.Mesh(
    roller_frameGeom,
    roller_frameMat
  );
  roller_frame.name = "roller_frame";
  roller_group.add(roller_frame);

  const roller_frame_connectorGeom = new THREE.CylinderGeometry(
    0.026,
    0.026,
    0.12,
    12
  );
  const roller_frame_connector = new THREE.Mesh(
    roller_frame_connectorGeom,
    roller_frameMat
  );
  roller_frame_connector.name = "roller_frame_connector";
  roller_frame_connector.rotation.z = Math.PI / 2;
  roller_frame_connector.position.set(0.34, -0.045, 0.02);
  roller_group.add(roller_frame_connector);

  fitToUnitCube(THREE, root);
  return root;

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
}
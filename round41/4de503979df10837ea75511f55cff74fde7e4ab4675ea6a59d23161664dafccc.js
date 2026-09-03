export default function generate(THREE) {
  const root = new THREE.Group();
  const flute = new THREE.Group();
  flute.name = "flute";
  root.add(flute);

  const bodyRadius = 0.12;
  const bodyLength = 3.58;

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd2a84b,
    metalness: 0.6,
    roughness: 0.2,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const bodyGeom = new THREE.CylinderGeometry(
    bodyRadius,
    bodyRadius,
    bodyLength,
    48
  );
  const body = new THREE.Mesh(bodyGeom, silverMat);
  body.name = "body";
  flute.add(body);

  const foot_socketGeom = new THREE.CylinderGeometry(
    bodyRadius,
    0.145,
    0.3,
    48
  );
  const foot_socket = new THREE.Mesh(foot_socketGeom, silverMat);
  foot_socket.name = "foot_socket";
  foot_socket.position.y = -1.93;
  flute.add(foot_socket);

  const foot_end_capGeom = new THREE.SphereGeometry(0.145, 32, 16);
  const foot_end_cap = new THREE.Mesh(foot_end_capGeom, silverMat);
  foot_end_cap.name = "foot_end_cap";
  foot_end_cap.position.y = -2.075;
  foot_end_cap.scale.set(1, 0.32, 1);
  flute.add(foot_end_cap);

  const head_capGeom = new THREE.CylinderGeometry(0.145, 0.135, 0.18, 48);
  const head_cap = new THREE.Mesh(head_capGeom, silverMat);
  head_cap.name = "head_cap";
  head_cap.position.y = 1.87;
  flute.add(head_cap);

  const foot_openingGeom = new THREE.CircleGeometry(0.098, 32);
  const foot_opening = new THREE.Mesh(foot_openingGeom, holeMat);
  foot_opening.name = "foot_opening";
  foot_opening.rotation.x = Math.PI / 2;
  foot_opening.position.y = -2.122;
  flute.add(foot_opening);

  const foot_lipGeom = new THREE.TorusGeometry(0.116, 0.014, 10, 36);
  const foot_lip = new THREE.Mesh(foot_lipGeom, silverMat);
  foot_lip.name = "foot_lip";
  foot_lip.rotation.x = Math.PI / 2;
  foot_lip.position.y = -2.119;
  flute.add(foot_lip);

  const foot_gold_bandGeom = new THREE.CylinderGeometry(
    0.132,
    0.132,
    0.038,
    48
  );
  const foot_gold_band = new THREE.Mesh(foot_gold_bandGeom, goldMat);
  foot_gold_band.name = "foot_gold_band";
  foot_gold_band.position.y = -1.78;
  flute.add(foot_gold_band);

  const foot_gold_beadGeom = new THREE.TorusGeometry(0.128, 0.009, 8, 36);
  const foot_gold_bead = new THREE.Mesh(foot_gold_beadGeom, goldMat);
  foot_gold_bead.name = "foot_gold_bead";
  foot_gold_bead.rotation.x = Math.PI / 2;
  foot_gold_bead.position.y = -1.78;
  flute.add(foot_gold_bead);

  const head_gold_bandGeom = new THREE.TorusGeometry(0.139, 0.012, 10, 40);
  const head_gold_band = new THREE.Mesh(head_gold_bandGeom, goldMat);
  head_gold_band.name = "head_gold_band";
  head_gold_band.rotation.x = Math.PI / 2;
  head_gold_band.position.y = 1.82;
  flute.add(head_gold_band);

  const head_gold_collarGeom = new THREE.CylinderGeometry(
    0.146,
    0.143,
    0.052,
    48
  );
  const head_gold_collar = new THREE.Mesh(head_gold_collarGeom, goldMat);
  head_gold_collar.name = "head_gold_collar";
  head_gold_collar.position.y = 1.965;
  flute.add(head_gold_collar);

  const head_gold_beadGeom = new THREE.TorusGeometry(0.14, 0.014, 10, 40);
  const head_gold_bead = new THREE.Mesh(head_gold_beadGeom, goldMat);
  head_gold_bead.name = "head_gold_bead";
  head_gold_bead.rotation.x = Math.PI / 2;
  head_gold_bead.position.y = 1.99;
  flute.add(head_gold_bead);

  const head_end_ringGeom = new THREE.TorusGeometry(0.126, 0.011, 10, 36);
  const head_end_ring = new THREE.Mesh(head_end_ringGeom, goldMat);
  head_end_ring.name = "head_end_ring";
  head_end_ring.rotation.x = Math.PI / 2;
  head_end_ring.position.y = 2.018;
  flute.add(head_end_ring);

  const fingerHolePositions = [-1.5, -0.82, 0.17, 0.55];
  const finger_holesGeom = new THREE.CircleGeometry(0.064, 28);
  const finger_holes = new THREE.InstancedMesh(
    finger_holesGeom,
    holeMat,
    fingerHolePositions.length
  );
  finger_holes.name = "finger_holes";

  const finger_hole_rimsGeom = new THREE.TorusGeometry(0.064, 0.006, 8, 28);
  const finger_hole_rims = new THREE.InstancedMesh(
    finger_hole_rimsGeom,
    silverMat,
    fingerHolePositions.length
  );
  finger_hole_rims.name = "finger_hole_rims";

  const holeDummy = new THREE.Object3D();
  for (let i = 0; i < fingerHolePositions.length; i++) {
    holeDummy.position.set(0, fingerHolePositions[i], bodyRadius + 0.004);
    holeDummy.rotation.set(0, 0, 0);
    holeDummy.scale.set(1, 1, 1);
    holeDummy.updateMatrix();
    finger_holes.setMatrixAt(i, holeDummy.matrix);

    holeDummy.position.set(0, fingerHolePositions[i], bodyRadius + 0.005);
    holeDummy.updateMatrix();
    finger_hole_rims.setMatrixAt(i, holeDummy.matrix);
  }
  finger_holes.instanceMatrix.needsUpdate = true;
  finger_hole_rims.instanceMatrix.needsUpdate = true;
  flute.add(finger_holes, finger_hole_rims);

  const central_ornament = new THREE.Group();
  central_ornament.name = "central_ornament";
  central_ornament.position.y = -0.27;
  flute.add(central_ornament);

  const ornament_backplateGeom = new THREE.CylinderGeometry(
    0.16,
    0.16,
    0.022,
    40
  );
  const ornament_backplate = new THREE.Mesh(ornament_backplateGeom, goldMat);
  ornament_backplate.name = "ornament_backplate";
  ornament_backplate.rotation.x = Math.PI / 2;
  ornament_backplate.position.z = 0.131;
  central_ornament.add(ornament_backplate);

  const ornament_inlayGeom = new THREE.CylinderGeometry(
    0.126,
    0.126,
    0.012,
    40
  );
  const ornament_inlay = new THREE.Mesh(ornament_inlayGeom, silverMat);
  ornament_inlay.name = "ornament_inlay";
  ornament_inlay.rotation.x = Math.PI / 2;
  ornament_inlay.position.z = 0.149;
  central_ornament.add(ornament_inlay);

  const ornament_outer_ringGeom = new THREE.TorusGeometry(
    0.141,
    0.012,
    10,
    40
  );
  const ornament_outer_ring = new THREE.Mesh(
    ornament_outer_ringGeom,
    goldMat
  );
  ornament_outer_ring.name = "ornament_outer_ring";
  ornament_outer_ring.position.z = 0.158;
  central_ornament.add(ornament_outer_ring);

  const ornament_inner_borderGeom = new THREE.TorusGeometry(
    0.112,
    0.007,
    8,
    36
  );
  const ornament_inner_border = new THREE.Mesh(
    ornament_inner_borderGeom,
    goldMat
  );
  ornament_inner_border.name = "ornament_inner_border";
  ornament_inner_border.position.z = 0.16;
  central_ornament.add(ornament_inner_border);

  const spiralPoints = [];
  const spiralCount = 42;
  for (let i = 0; i < spiralCount; i++) {
    const t = i / (spiralCount - 1);
    const angle = t * Math.PI * 5.2;
    const radius = 0.006 + t * 0.101;
    spiralPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.164
      )
    );
  }
  const ornament_spiralGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(spiralPoints),
    64,
    0.008,
    8,
    false
  );
  const ornament_spiral = new THREE.Mesh(ornament_spiralGeom, goldMat);
  ornament_spiral.name = "ornament_spiral";
  central_ornament.add(ornament_spiral);

  const ornament_centerGeom = new THREE.SphereGeometry(0.014, 16, 10);
  const ornament_center = new THREE.Mesh(ornament_centerGeom, goldMat);
  ornament_center.name = "ornament_center";
  ornament_center.position.z = 0.166;
  ornament_center.scale.z = 0.5;
  central_ornament.add(ornament_center);

  const leftLeafShape = new THREE.Shape();
  leftLeafShape.moveTo(-0.13, 0.045);
  leftLeafShape.bezierCurveTo(-0.18, 0.025, -0.25, -0.035, -0.31, -0.08);
  leftLeafShape.bezierCurveTo(-0.25, -0.075, -0.19, -0.045, -0.145, -0.005);
  leftLeafShape.bezierCurveTo(-0.13, 0.01, -0.125, 0.03, -0.13, 0.045);

  const ornament_left_leafGeom = new THREE.ExtrudeGeometry(leftLeafShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const ornament_left_leaf = new THREE.Mesh(
    ornament_left_leafGeom,
    goldMat
  );
  ornament_left_leaf.name = "ornament_left_leaf";
  ornament_left_leaf.position.z = 0.143;
  central_ornament.add(ornament_left_leaf);

  const rightLeafShape = new THREE.Shape();
  rightLeafShape.moveTo(0.13, 0.045);
  rightLeafShape.bezierCurveTo(0.18, 0.025, 0.25, -0.035, 0.31, -0.08);
  rightLeafShape.bezierCurveTo(0.25, -0.075, 0.19, -0.045, 0.145, -0.005);
  rightLeafShape.bezierCurveTo(0.13, 0.01, 0.125, 0.03, 0.13, 0.045);

  const ornament_right_leafGeom = new THREE.ExtrudeGeometry(rightLeafShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const ornament_right_leaf = new THREE.Mesh(
    ornament_right_leafGeom,
    goldMat
  );
  ornament_right_leaf.name = "ornament_right_leaf";
  ornament_right_leaf.position.z = 0.143;
  central_ornament.add(ornament_right_leaf);

  const leftVeinCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.145, 0.025, 0.162),
    new THREE.Vector3(-0.2, -0.005, 0.162),
    new THREE.Vector3(-0.285, -0.064, 0.162),
  ]);
  const ornament_left_veinGeom = new THREE.TubeGeometry(
    leftVeinCurve,
    16,
    0.004,
    6,
    false
  );
  const ornament_left_vein = new THREE.Mesh(
    ornament_left_veinGeom,
    goldMat
  );
  ornament_left_vein.name = "ornament_left_vein";
  central_ornament.add(ornament_left_vein);

  const rightVeinCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.145, 0.025, 0.162),
    new THREE.Vector3(0.2, -0.005, 0.162),
    new THREE.Vector3(0.285, -0.064, 0.162),
  ]);
  const ornament_right_veinGeom = new THREE.TubeGeometry(
    rightVeinCurve,
    16,
    0.004,
    6,
    false
  );
  const ornament_right_vein = new THREE.Mesh(
    ornament_right_veinGeom,
    goldMat
  );
  ornament_right_vein.name = "ornament_right_vein";
  central_ornament.add(ornament_right_vein);

  flute.rotation.z = -0.68;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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
export default function generate(THREE) {
  const root = new THREE.Group();
  const instrument = new THREE.Group();
  instrument.name = "wooden_keyed_flute";
  instrument.rotation.set(-0.30, 0, -0.78);
  root.add(instrument);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8b421f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4b1d0d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x5c240f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const foot_jointProfile = [
    new THREE.Vector2(0.245, -2.62),
    new THREE.Vector2(0.252, -2.54),
    new THREE.Vector2(0.232, -2.34),
    new THREE.Vector2(0.214, -1.75),
    new THREE.Vector2(0.205, -1.15),
    new THREE.Vector2(0.197, -0.55),
    new THREE.Vector2(0.192, 0.12),
  ];
  const foot_jointGeom = new THREE.LatheGeometry(foot_jointProfile, 48);
  const foot_joint = new THREE.Mesh(foot_jointGeom, woodMat);
  foot_joint.name = "foot_joint";
  instrument.add(foot_joint);

  const middle_jointProfile = [
    new THREE.Vector2(0.198, 0.05),
    new THREE.Vector2(0.190, 0.30),
    new THREE.Vector2(0.181, 0.72),
    new THREE.Vector2(0.174, 1.08),
    new THREE.Vector2(0.178, 1.30),
  ];
  const middle_jointGeom = new THREE.LatheGeometry(middle_jointProfile, 48);
  const middle_joint = new THREE.Mesh(middle_jointGeom, woodMat);
  middle_joint.name = "middle_joint";
  instrument.add(middle_joint);

  const head_jointProfile = [
    new THREE.Vector2(0.178, 1.22),
    new THREE.Vector2(0.173, 1.55),
    new THREE.Vector2(0.177, 2.15),
    new THREE.Vector2(0.188, 2.47),
    new THREE.Vector2(0.202, 2.60),
    new THREE.Vector2(0.190, 2.69),
    new THREE.Vector2(0.135, 2.76),
    new THREE.Vector2(0.055, 2.80),
    new THREE.Vector2(0.000, 2.81),
  ];
  const head_jointGeom = new THREE.LatheGeometry(head_jointProfile, 48);
  const head_joint = new THREE.Mesh(head_jointGeom, woodMat);
  head_joint.name = "head_joint";
  instrument.add(head_joint);

  const lower_ferruleGeom = new THREE.CylinderGeometry(0.211, 0.211, 0.14, 40);
  const lower_ferrule = new THREE.Mesh(lower_ferruleGeom, brushedMat);
  lower_ferrule.name = "lower_ferrule";
  lower_ferrule.position.y = 0.12;
  instrument.add(lower_ferrule);

  const upper_ferruleGeom = new THREE.CylinderGeometry(0.190, 0.190, 0.14, 40);
  const upper_ferrule = new THREE.Mesh(upper_ferruleGeom, brushedMat);
  upper_ferrule.name = "upper_ferrule";
  upper_ferrule.position.y = 1.30;
  instrument.add(upper_ferrule);

  const crown_ferruleGeom = new THREE.CylinderGeometry(0.198, 0.198, 0.13, 40);
  const crown_ferrule = new THREE.Mesh(crown_ferruleGeom, brushedMat);
  crown_ferrule.name = "crown_ferrule";
  crown_ferrule.position.y = 2.18;
  instrument.add(crown_ferrule);

  const ferrule_edge_ringsGeom = new THREE.TorusGeometry(1, 0.035, 8, 40);
  const ferrule_edge_rings = new THREE.InstancedMesh(
    ferrule_edge_ringsGeom,
    silverMat,
    6
  );
  ferrule_edge_rings.name = "ferrule_edge_rings";
  const ferruleRingData = [
    [0.05, 0.211],
    [0.19, 0.211],
    [1.23, 0.190],
    [1.37, 0.190],
    [2.115, 0.198],
    [2.245, 0.198],
  ];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < ferruleRingData.length; i++) {
    const data = ferruleRingData[i];
    dummy.position.set(0, data[0], 0);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.setScalar(data[1]);
    dummy.updateMatrix();
    ferrule_edge_rings.setMatrixAt(i, dummy.matrix);
  }
  ferrule_edge_rings.instanceMatrix.needsUpdate = true;
  instrument.add(ferrule_edge_rings);

  const bell_rimGeom = new THREE.TorusGeometry(0.222, 0.027, 12, 48);
  const bell_rim = new THREE.Mesh(bell_rimGeom, darkWoodMat);
  bell_rim.name = "bell_rim";
  bell_rim.rotation.x = Math.PI / 2;
  bell_rim.position.y = -2.62;
  instrument.add(bell_rim);

  const bell_openingGeom = new THREE.CircleGeometry(0.194, 40);
  const bell_opening = new THREE.Mesh(bell_openingGeom, holeMat);
  bell_opening.name = "bell_opening";
  bell_opening.rotation.x = Math.PI / 2;
  bell_opening.position.y = -2.626;
  instrument.add(bell_opening);

  function bodyRadiusAt(y) {
    if (y < -2.45) return 0.245;
    if (y < -1.25) return 0.245 - (y + 2.45) * 0.029;
    if (y < 0.12) return 0.210 - (y + 1.25) * 0.013;
    if (y < 1.30) return 0.192 - (y - 0.12) * 0.017;
    if (y < 2.18) return 0.170 + (y - 1.30) * 0.010;
    return 0.185 + (y - 2.18) * 0.025;
  }

  const wood_grain = new THREE.Group();
  wood_grain.name = "wood_grain";
  const grainSpecs = [
    [0.72, -2.42, 0.03, 0.0],
    [1.18, -2.30, 0.12, 1.1],
    [1.72, -2.43, -0.04, 2.0],
    [2.24, -2.18, 0.08, 0.5],
    [2.76, -1.95, 0.05, 1.7],
    [3.28, -2.36, -0.07, 2.6],
    [3.82, -0.90, 0.04, 0.8],
    [4.34, 0.35, -0.03, 1.9],
    [4.86, 1.48, 0.05, 2.8],
    [5.38, 0.70, -0.05, 0.3],
    [5.88, -1.65, 0.03, 1.4],
    [0.15, 1.62, 0.06, 2.3],
    [2.50, 1.72, -0.04, 0.9],
    [4.05, 1.82, 0.03, 1.8],
  ];

  for (let i = 0; i < grainSpecs.length; i++) {
    const spec = grainSpecs[i];
    const points = [];
    for (let j = 0; j <= 8; j++) {
      const t = j / 8;
      const y = spec[1] + (spec[2] - spec[1]) * t;
      const angle =
        spec[0] +
        Math.sin(t * Math.PI * 2 + spec[3]) * 0.018 +
        (t - 0.5) * 0.025;
      const radius = bodyRadiusAt(y) + 0.003;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }
    const grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      24,
      0.0035,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grain_lineGeom, grainMat);
    grain_line.name = "wood_grain_line_" + i;
    wood_grain.add(grain_line);
  }
  instrument.add(wood_grain);

  const keyData = [
    [-1.82, 0.20, 0.92],
    [-1.48, -0.18, 1.08],
    [-1.15, 0.20, 0.94],
    [-0.82, -0.16, 1.10],
    [-0.49, 0.18, 1.02],
    [-0.16, -0.14, 0.96],
    [0.17, 0.16, 1.08],
    [0.48, -0.12, 0.96],
    [0.76, 0.14, 0.88],
  ];

  const key_cupsGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.034, 28);
  const key_cups = new THREE.InstancedMesh(key_cupsGeom, silverMat, keyData.length);
  key_cups.name = "key_cups";

  const key_holesGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.012, 24);
  const key_holes = new THREE.InstancedMesh(key_holesGeom, holeMat, keyData.length);
  key_holes.name = "key_holes";

  const key_armsGeom = new THREE.CylinderGeometry(0.014, 0.014, 1, 10);
  const key_arms = new THREE.InstancedMesh(key_armsGeom, silverMat, keyData.length);
  key_arms.name = "key_arms";

  const key_postsGeom = new THREE.SphereGeometry(0.027, 14, 8);
  const key_posts = new THREE.InstancedMesh(key_postsGeom, silverMat, keyData.length);
  key_posts.name = "key_posts";

  const yAxis = new THREE.Vector3(0, 1, 0);
  const zAxis = new THREE.Vector3(0, 0, 1);
  const normal = new THREE.Vector3();
  const radialQuat = new THREE.Quaternion();
  const instanceQuat = new THREE.Quaternion();
  const keyCenter = new THREE.Vector3();
  const postPos = new THREE.Vector3();
  const armDirection = new THREE.Vector3();
  const armMidpoint = new THREE.Vector3();

  for (let i = 0; i < keyData.length; i++) {
    const y = keyData[i][0];
    const angle = keyData[i][1];
    const scale = keyData[i][2];
    const radius = bodyRadiusAt(y);

    normal.set(Math.sin(angle), 0, Math.cos(angle));
    radialQuat.setFromUnitVectors(yAxis, normal);

    keyCenter.copy(normal).multiplyScalar(radius + 0.038);
    keyCenter.y = y;
    dummy.position.copy(keyCenter);
    dummy.quaternion.copy(radialQuat);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    key_cups.setMatrixAt(i, dummy.matrix);

    dummy.position.copy(normal).multiplyScalar(radius + 0.059);
    dummy.position.y = y;
    dummy.quaternion.copy(radialQuat);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    key_holes.setMatrixAt(i, dummy.matrix);

    postPos.set(0.095, y + 0.045, radius + 0.018);
    armDirection.set(keyCenter.x - postPos.x, 0, keyCenter.z - postPos.z);
    const armLength = armDirection.length();
    armDirection.normalize();
    armMidpoint.copy(postPos).add(keyCenter).multiplyScalar(0.5);

    instanceQuat.setFromUnitVectors(yAxis, armDirection);
    dummy.position.copy(armMidpoint);
    dummy.quaternion.copy(instanceQuat);
    dummy.scale.set(1, armLength, 1);
    dummy.updateMatrix();
    key_arms.setMatrixAt(i, dummy.matrix);

    dummy.position.copy(postPos);
    dummy.quaternion.identity();
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    key_posts.setMatrixAt(i, dummy.matrix);
  }

  key_cups.instanceMatrix.needsUpdate = true;
  key_holes.instanceMatrix.needsUpdate = true;
  key_arms.instanceMatrix.needsUpdate = true;
  key_posts.instanceMatrix.needsUpdate = true;
  instrument.add(key_cups, key_holes, key_arms, key_posts);

  const main_key_rodGeom = new THREE.CylinderGeometry(0.016, 0.016, 2.32, 12);
  const main_key_rod = new THREE.Mesh(main_key_rodGeom, silverMat);
  main_key_rod.name = "main_key_rod";
  main_key_rod.position.set(0.095, -0.58, 0.226);
  instrument.add(main_key_rod);

  const secondary_key_rodGeom = new THREE.CylinderGeometry(0.011, 0.011, 1.72, 10);
  const secondary_key_rod = new THREE.Mesh(secondary_key_rodGeom, silverMat);
  secondary_key_rod.name = "secondary_key_rod";
  secondary_key_rod.position.set(0.145, -0.36, 0.205);
  instrument.add(secondary_key_rod);

  const rod_hingesGeom = new THREE.SphereGeometry(0.029, 14, 8);
  const rod_hinges = new THREE.InstancedMesh(rod_hingesGeom, silverMat, 6);
  rod_hinges.name = "rod_hinges";
  const hingeHeights = [-1.68, -1.23, -0.78, -0.33, 0.12, 0.57];
  for (let i = 0; i < hingeHeights.length; i++) {
    dummy.position.set(0.095, hingeHeights[i], 0.226);
    dummy.quaternion.identity();
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    rod_hinges.setMatrixAt(i, dummy.matrix);
  }
  rod_hinges.instanceMatrix.needsUpdate = true;
  instrument.add(rod_hinges);

  const lower_leverGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.42, 12);
  const lower_lever = new THREE.Mesh(lower_leverGeom, silverMat);
  lower_lever.name = "lower_lever";
  lower_lever.rotation.z = Math.PI / 2;
  lower_lever.position.set(-0.075, -1.76, 0.235);
  instrument.add(lower_lever);

  const lower_lever_paddleGeom = new THREE.SphereGeometry(0.055, 18, 10);
  const lower_lever_paddle = new THREE.Mesh(lower_lever_paddleGeom, silverMat);
  lower_lever_paddle.name = "lower_lever_paddle";
  lower_lever_paddle.scale.set(1.0, 0.45, 0.28);
  lower_lever_paddle.position.set(-0.285, -1.76, 0.235);
  instrument.add(lower_lever_paddle);

  const upper_leverGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.34, 12);
  const upper_lever = new THREE.Mesh(upper_leverGeom, silverMat);
  upper_lever.name = "upper_lever";
  upper_lever.rotation.z = Math.PI / 2;
  upper_lever.position.set(-0.02, 0.73, 0.220);
  instrument.add(upper_lever);

  const upper_lever_paddleGeom = new THREE.SphereGeometry(0.050, 18, 10);
  const upper_lever_paddle = new THREE.Mesh(upper_lever_paddleGeom, silverMat);
  upper_lever_paddle.name = "upper_lever_paddle";
  upper_lever_paddle.scale.set(1.0, 0.42, 0.26);
  upper_lever_paddle.position.set(-0.195, 0.73, 0.220);
  instrument.add(upper_lever_paddle);

  const side_key_plateGeom = new THREE.SphereGeometry(0.10, 24, 12);
  const side_key_plate = new THREE.Mesh(side_key_plateGeom, silverMat);
  side_key_plate.name = "side_key_plate";
  side_key_plate.scale.set(0.55, 1.35, 0.20);
  side_key_plate.position.set(0.142, -0.02, 0.184);
  instrument.add(side_key_plate);

  const side_key_holeGeom = new THREE.CircleGeometry(0.026, 20);
  const side_key_hole = new THREE.Mesh(side_key_holeGeom, holeMat);
  side_key_hole.name = "side_key_hole";
  side_key_hole.rotation.y = 0.55;
  side_key_hole.position.set(0.169, -0.01, 0.207);
  instrument.add(side_key_hole);

  const screw_headsGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.014, 18);
  const screw_heads = new THREE.InstancedMesh(screw_headsGeom, silverMat, 3);
  screw_heads.name = "screw_heads";
  const screwData = [
    [1.08, 0.38],
    [1.48, -0.28],
    [1.88, 0.22],
  ];
  for (let i = 0; i < screwData.length; i++) {
    const y = screwData[i][0];
    const angle = screwData[i][1];
    const radius = bodyRadiusAt(y) + 0.008;
    normal.set(Math.sin(angle), 0, Math.cos(angle));
    radialQuat.setFromUnitVectors(yAxis, normal);
    dummy.position.set(normal.x * radius, y, normal.z * radius);
    dummy.quaternion.copy(radialQuat);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    screw_heads.setMatrixAt(i, dummy.matrix);
  }
  screw_heads.instanceMatrix.needsUpdate = true;
  instrument.add(screw_heads);

  const rod_endcapsGeom = new THREE.SphereGeometry(0.025, 14, 8);
  const rod_endcaps = new THREE.InstancedMesh(rod_endcapsGeom, silverMat, 4);
  rod_endcaps.name = "rod_endcaps";
  const endcapPositions = [
    [0.095, -1.74, 0.226],
    [0.095, 0.58, 0.226],
    [0.145, -1.22, 0.205],
    [0.145, 0.50, 0.205],
  ];
  for (let i = 0; i < endcapPositions.length; i++) {
    const p = endcapPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.quaternion.identity();
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    rod_endcaps.setMatrixAt(i, dummy.matrix);
  }
  rod_endcaps.instanceMatrix.needsUpdate = true;
  instrument.add(rod_endcaps);

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
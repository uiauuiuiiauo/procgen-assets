export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_flute";

  const flute_assembly = new THREE.Group();
  flute_assembly.name = "flute_assembly";
  flute_assembly.rotation.set(-0.16, 0, -1.02);
  root.add(flute_assembly);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const keyMat = new THREE.MeshStandardMaterial({
    color: 0xc9aa62,
    metalness: 0.5,
    roughness: 0.25,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x11110f,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x292824,
    metalness: 0.35,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });

  const foot_jointGeom = new THREE.CylinderGeometry(0.125, 0.145, 0.64, 32);
  const foot_joint = new THREE.Mesh(foot_jointGeom, bodyMat);
  foot_joint.name = "foot_joint";
  foot_joint.position.y = -2.06;
  flute_assembly.add(foot_joint);

  const main_bodyGeom = new THREE.CylinderGeometry(0.122, 0.122, 2.52, 32);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  main_body.position.y = -0.46;
  flute_assembly.add(main_body);

  const head_jointGeom = new THREE.CylinderGeometry(0.16, 0.122, 1.55, 32);
  const head_joint = new THREE.Mesh(head_jointGeom, bodyMat);
  head_joint.name = "head_joint";
  head_joint.position.y = 1.585;
  flute_assembly.add(head_joint);

  const foot_openingGeom = new THREE.CircleGeometry(0.111, 32);
  const foot_opening = new THREE.Mesh(foot_openingGeom, holeMat);
  foot_opening.name = "foot_opening";
  foot_opening.rotation.x = Math.PI / 2;
  foot_opening.position.y = -2.386;
  flute_assembly.add(foot_opening);

  const foot_inner_wallGeom = new THREE.CylinderGeometry(
    0.112,
    0.112,
    0.1,
    32,
    1,
    true
  );
  const foot_inner_wall = new THREE.Mesh(foot_inner_wallGeom, innerMat);
  foot_inner_wall.name = "foot_inner_wall";
  foot_inner_wall.position.y = -2.335;
  flute_assembly.add(foot_inner_wall);

  const foot_rimGeom = new THREE.TorusGeometry(0.128, 0.018, 10, 32);
  const foot_rim = new THREE.Mesh(foot_rimGeom, trimMat);
  foot_rim.name = "foot_rim";
  foot_rim.rotation.x = -Math.PI / 2;
  foot_rim.position.y = -2.385;
  flute_assembly.add(foot_rim);

  const crown_flareGeom = new THREE.CylinderGeometry(0.184, 0.16, 0.18, 32);
  const crown_flare = new THREE.Mesh(crown_flareGeom, bodyMat);
  crown_flare.name = "crown_flare";
  crown_flare.position.y = 2.44;
  flute_assembly.add(crown_flare);

  const crown_lipGeom = new THREE.CylinderGeometry(0.192, 0.184, 0.06, 32);
  const crown_lip = new THREE.Mesh(crown_lipGeom, trimMat);
  crown_lip.name = "crown_lip";
  crown_lip.position.y = 2.55;
  flute_assembly.add(crown_lip);

  const crown_rimGeom = new THREE.TorusGeometry(0.178, 0.018, 10, 32);
  const crown_rim = new THREE.Mesh(crown_rimGeom, trimMat);
  crown_rim.name = "crown_rim";
  crown_rim.rotation.x = -Math.PI / 2;
  crown_rim.position.y = 2.58;
  flute_assembly.add(crown_rim);

  const crown_faceGeom = new THREE.CircleGeometry(0.178, 32);
  const crown_face = new THREE.Mesh(crown_faceGeom, bodyMat);
  crown_face.name = "crown_face";
  crown_face.rotation.x = -Math.PI / 2;
  crown_face.position.y = 2.582;
  flute_assembly.add(crown_face);

  const joint_sleevesGeom = new THREE.CylinderGeometry(
    0.139,
    0.139,
    0.075,
    32
  );
  const joint_sleeves = new THREE.InstancedMesh(
    joint_sleevesGeom,
    trimMat,
    3
  );
  joint_sleeves.name = "joint_sleeves";
  const sleeve_positions = [-1.75, 0.17, 0.84];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < sleeve_positions.length; i++) {
    dummy.position.set(0, sleeve_positions[i], 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    joint_sleeves.setMatrixAt(i, dummy.matrix);
  }
  joint_sleeves.instanceMatrix.needsUpdate = true;
  flute_assembly.add(joint_sleeves);

  const joint_ringsGeom = new THREE.TorusGeometry(0.137, 0.011, 8, 32);
  const joint_rings = new THREE.InstancedMesh(joint_ringsGeom, keyMat, 6);
  joint_rings.name = "joint_rings";
  let ring_index = 0;
  for (const sleeve_position of sleeve_positions) {
    for (const offset of [-0.038, 0.038]) {
      dummy.position.set(0, sleeve_position + offset, 0);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      joint_rings.setMatrixAt(ring_index++, dummy.matrix);
    }
  }
  joint_rings.instanceMatrix.needsUpdate = true;
  flute_assembly.add(joint_rings);

  const embouchureShape = new THREE.Shape();
  const embouchure_half_length = 0.13;
  const embouchure_half_width = 0.041;
  embouchureShape.moveTo(
    -embouchure_half_length + embouchure_half_width,
    -embouchure_half_width
  );
  embouchureShape.lineTo(
    embouchure_half_length - embouchure_half_width,
    -embouchure_half_width
  );
  embouchureShape.bezierCurveTo(
    embouchure_half_length,
    -embouchure_half_width,
    embouchure_half_length,
    embouchure_half_width,
    embouchure_half_length - embouchure_half_width,
    embouchure_half_width
  );
  embouchureShape.lineTo(
    -embouchure_half_length + embouchure_half_width,
    embouchure_half_width
  );
  embouchureShape.bezierCurveTo(
    -embouchure_half_length,
    embouchure_half_width,
    -embouchure_half_length,
    -embouchure_half_width,
    -embouchure_half_length + embouchure_half_width,
    -embouchure_half_width
  );

  const embouchure_rimGeom = new THREE.ShapeGeometry(embouchureShape, 20);
  const embouchure_rim = new THREE.Mesh(embouchure_rimGeom, keyMat);
  embouchure_rim.name = "embouchure_rim";
  embouchure_rim.position.set(0, -2.06, 0.141);
  flute_assembly.add(embouchure_rim);

  const embouchure_holeGeom = new THREE.ShapeGeometry(embouchureShape, 20);
  const embouchure_hole = new THREE.Mesh(embouchure_holeGeom, holeMat);
  embouchure_hole.name = "embouchure_hole";
  embouchure_hole.scale.set(0.84, 0.68, 1);
  embouchure_hole.position.set(0, -2.06, 0.145);
  flute_assembly.add(embouchure_hole);

  const tone_hole_data = [
    [-1.38, 0.128, 0.073],
    [-0.55, 0.124, 0.071],
    [-0.08, 0.124, 0.071],
    [1.25, 0.143, 0.074],
    [1.72, 0.151, 0.076],
  ];

  const tone_holesGeom = new THREE.CircleGeometry(1, 28);
  const tone_holes = new THREE.InstancedMesh(
    tone_holesGeom,
    holeMat,
    tone_hole_data.length
  );
  tone_holes.name = "tone_holes";

  const tone_hole_rimsGeom = new THREE.TorusGeometry(1, 0.09, 8, 28);
  const tone_hole_rims = new THREE.InstancedMesh(
    tone_hole_rimsGeom,
    trimMat,
    tone_hole_data.length
  );
  tone_hole_rims.name = "tone_hole_rims";

  for (let i = 0; i < tone_hole_data.length; i++) {
    const y = tone_hole_data[i][0];
    const radius = tone_hole_data[i][1];
    const hole_radius = tone_hole_data[i][2];

    dummy.position.set(0, y, radius + 0.004);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(hole_radius, hole_radius, 1);
    dummy.updateMatrix();
    tone_holes.setMatrixAt(i, dummy.matrix);

    dummy.position.set(0, y, radius + 0.007);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(hole_radius * 1.08, hole_radius * 1.08, 1);
    dummy.updateMatrix();
    tone_hole_rims.setMatrixAt(i, dummy.matrix);
  }
  tone_holes.instanceMatrix.needsUpdate = true;
  tone_hole_rims.instanceMatrix.needsUpdate = true;
  flute_assembly.add(tone_holes, tone_hole_rims);

  const key_rodGeom = new THREE.CylinderGeometry(0.011, 0.011, 1.18, 10);
  const key_rod = new THREE.Mesh(key_rodGeom, keyMat);
  key_rod.name = "key_rod";
  key_rod.position.set(0.105, 0.61, 0.145);
  flute_assembly.add(key_rod);

  const key_rod_capsGeom = new THREE.SphereGeometry(0.019, 12, 8);
  const key_rod_caps = new THREE.InstancedMesh(key_rod_capsGeom, keyMat, 2);
  key_rod_caps.name = "key_rod_caps";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(0.105, i === 0 ? 0.02 : 1.2, 0.145);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    key_rod_caps.setMatrixAt(i, dummy.matrix);
  }
  key_rod_caps.instanceMatrix.needsUpdate = true;
  flute_assembly.add(key_rod_caps);

  const key_positions = [0.17, 0.47, 0.77, 1.06];

  const key_leversGeom = new THREE.BoxGeometry(0.13, 0.024, 0.018);
  const key_levers = new THREE.InstancedMesh(
    key_leversGeom,
    keyMat,
    key_positions.length
  );
  key_levers.name = "key_levers";
  for (let i = 0; i < key_positions.length; i++) {
    dummy.position.set(0.055, key_positions[i], 0.143);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    key_levers.setMatrixAt(i, dummy.matrix);
  }
  key_levers.instanceMatrix.needsUpdate = true;
  flute_assembly.add(key_levers);

  const key_cupsGeom = new THREE.CylinderGeometry(0.044, 0.044, 0.018, 20);
  const key_cups = new THREE.InstancedMesh(
    key_cupsGeom,
    keyMat,
    key_positions.length
  );
  key_cups.name = "key_cups";
  for (let i = 0; i < key_positions.length; i++) {
    dummy.position.set(-0.024, key_positions[i], 0.145);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    key_cups.setMatrixAt(i, dummy.matrix);
  }
  key_cups.instanceMatrix.needsUpdate = true;
  flute_assembly.add(key_cups);

  const key_touchpiecesGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    0.019,
    18
  );
  const key_touchpieces = new THREE.InstancedMesh(
    key_touchpiecesGeom,
    keyMat,
    key_positions.length
  );
  key_touchpieces.name = "key_touchpieces";
  for (let i = 0; i < key_positions.length; i++) {
    dummy.position.set(0.105, key_positions[i], 0.16);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    key_touchpieces.setMatrixAt(i, dummy.matrix);
  }
  key_touchpieces.instanceMatrix.needsUpdate = true;
  flute_assembly.add(key_touchpieces);

  const key_postsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.05, 10);
  const key_posts = new THREE.InstancedMesh(
    key_postsGeom,
    keyMat,
    key_positions.length
  );
  key_posts.name = "key_posts";
  for (let i = 0; i < key_positions.length; i++) {
    dummy.position.set(0.105, key_positions[i], 0.132);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    key_posts.setMatrixAt(i, dummy.matrix);
  }
  key_posts.instanceMatrix.needsUpdate = true;
  flute_assembly.add(key_posts);

  const trill_key_barGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.22,
    10
  );
  const trill_key_bar = new THREE.Mesh(trill_key_barGeom, keyMat);
  trill_key_bar.name = "trill_key_bar";
  trill_key_bar.rotation.z = Math.PI / 2;
  trill_key_bar.position.set(0.01, 1.19, 0.16);
  flute_assembly.add(trill_key_bar);

  const trill_key_cupsGeom = new THREE.CylinderGeometry(
    0.032,
    0.032,
    0.017,
    18
  );
  const trill_key_cups = new THREE.InstancedMesh(
    trill_key_cupsGeom,
    keyMat,
    2
  );
  trill_key_cups.name = "trill_key_cups";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.075 : 0.075, 1.19, 0.16);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    trill_key_cups.setMatrixAt(i, dummy.matrix);
  }
  trill_key_cups.instanceMatrix.needsUpdate = true;
  flute_assembly.add(trill_key_cups);

  const side_key_cupGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.018,
    20
  );
  const side_key_cup = new THREE.Mesh(side_key_cupGeom, keyMat);
  side_key_cup.name = "side_key_cup";
  side_key_cup.rotation.x = Math.PI / 2;
  side_key_cup.position.set(0.132, 0.98, 0.145);
  flute_assembly.add(side_key_cup);

  const side_key_leverGeom = new THREE.BoxGeometry(0.025, 0.17, 0.018);
  const side_key_lever = new THREE.Mesh(side_key_leverGeom, keyMat);
  side_key_lever.name = "side_key_lever";
  side_key_lever.position.set(0.132, 0.9, 0.143);
  side_key_lever.rotation.z = -0.12;
  flute_assembly.add(side_key_lever);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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
}
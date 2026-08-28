export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_robot";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xc99a63,
    metalness: 0.0,
    roughness: 0.6,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xd8ad76,
    metalness: 0.0,
    roughness: 0.6,
  });
  const endGrainMat = new THREE.MeshStandardMaterial({
    color: 0xb77d49,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x936039,
    metalness: 0.0,
    roughness: 0.9,
  });
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.3,
  });
  const eyeSocketMat = new THREE.MeshStandardMaterial({
    color: 0x55351f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const jointMat = new THREE.MeshStandardMaterial({
    color: 0x4b4740,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createRoundedBoxGeometry(width, height, depth, radius, bevel) {
    const halfW = width / 2;
    const halfH = height / 2;
    const r = Math.min(radius, halfW, halfH);
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + r, -halfH);
    shape.lineTo(halfW - r, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + r);
    shape.lineTo(halfW, halfH - r);
    shape.quadraticCurveTo(halfW, halfH, halfW - r, halfH);
    shape.lineTo(-halfW + r, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - r);
    shape.lineTo(-halfW, -halfH + r);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + r, -halfH);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createTaperedLegGeometry(topWidth, bottomWidth, height, depth) {
    const topW = topWidth / 2;
    const bottomW = bottomWidth / 2;
    const halfH = height / 2;
    const radius = Math.min(0.055, bottomW * 0.4, height * 0.12);
    const shape = new THREE.Shape();

    shape.moveTo(-bottomW + radius, -halfH);
    shape.lineTo(bottomW - radius, -halfH);
    shape.quadraticCurveTo(bottomW, -halfH, bottomW, -halfH + radius);
    shape.lineTo(topW, halfH - radius);
    shape.quadraticCurveTo(topW, halfH, topW - radius, halfH);
    shape.lineTo(-topW + radius, halfH);
    shape.quadraticCurveTo(-topW, halfH, -topW, halfH - radius);
    shape.lineTo(-bottomW, -halfH + radius);
    shape.quadraticCurveTo(-bottomW, -halfH, -bottomW + radius, -halfH);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 7,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function orientBetween(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
  }

  function createCylinderBetween(start, end, radius, material, segments) {
    const length = start.distanceTo(end);
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments
    );
    const mesh = new THREE.Mesh(geometry, material);
    orientBetween(mesh, start, end);
    return mesh;
  }

  const baseGeom = createRoundedBoxGeometry(1.08, 0.25, 0.82, 0.1, 0.025);
  const base = new THREE.Mesh(baseGeom, woodMat);
  base.name = "base";
  base.position.set(0, 0.15, 0);
  root.add(base);

  const base_seamGeom = new THREE.BoxGeometry(0.012, 0.006, 0.7);
  const base_seam = new THREE.Mesh(base_seamGeom, grainMat);
  base_seam.name = "base_seam";
  base_seam.position.set(0, 0.307, 0);
  root.add(base_seam);

  const base_grainGeom = new THREE.BoxGeometry(0.18, 0.004, 0.006);
  const base_grain = new THREE.InstancedMesh(base_grainGeom, grainMat, 5);
  base_grain.name = "base_grain";
  const base_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    base_grain_dummy.position.set(
      -0.36 + i * 0.18,
      0.1 + (i % 3) * 0.052,
      0.446
    );
    base_grain_dummy.rotation.set(0, 0, (i - 2) * 0.012);
    base_grain_dummy.scale.set(0.75 + (i % 2) * 0.25, 1, 1);
    base_grain_dummy.updateMatrix();
    base_grain.setMatrixAt(i, base_grain_dummy.matrix);
  }
  base_grain.instanceMatrix.needsUpdate = true;
  root.add(base_grain);

  const lower_body = new THREE.Group();
  lower_body.name = "lower_body";
  root.add(lower_body);

  const torsoGeom = createRoundedBoxGeometry(0.78, 1.0, 0.5, 0.105, 0.025);
  const torso = new THREE.Mesh(torsoGeom, woodMat);
  torso.name = "torso";
  torso.position.set(0, 1.76, 0);
  lower_body.add(torso);

  const torso_grainGeom = new THREE.BoxGeometry(0.007, 0.15, 0.006);
  const torso_grain = new THREE.InstancedMesh(torso_grainGeom, grainMat, 7);
  torso_grain.name = "torso_grain";
  const torso_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    torso_grain_dummy.position.set(
      -0.29 + i * 0.096,
      1.43 + (i % 4) * 0.19,
      0.283
    );
    torso_grain_dummy.rotation.set(0, 0, ((i % 3) - 1) * 0.025);
    torso_grain_dummy.scale.set(1, 0.55 + (i % 4) * 0.16, 1);
    torso_grain_dummy.updateMatrix();
    torso_grain.setMatrixAt(i, torso_grain_dummy.matrix);
  }
  torso_grain.instanceMatrix.needsUpdate = true;
  lower_body.add(torso_grain);

  const neckGeom = new THREE.CylinderGeometry(0.17, 0.18, 0.16, 24);
  const neck = new THREE.Mesh(neckGeom, endGrainMat);
  neck.name = "neck";
  neck.position.set(0, 2.3, 0);
  root.add(neck);

  const neck_collarGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.055, 24);
  const neck_collar = new THREE.Mesh(neck_collarGeom, endGrainMat);
  neck_collar.name = "neck_collar";
  neck_collar.position.set(0, 2.245, 0);
  root.add(neck_collar);

  const head_group = new THREE.Group();
  head_group.name = "head_group";
  head_group.position.set(0, 2.84, 0);
  root.add(head_group);

  const headGeom = createRoundedBoxGeometry(1.08, 0.9, 0.82, 0.13, 0.03);
  const head = new THREE.Mesh(headGeom, woodMat);
  head.name = "head";
  head_group.add(head);

  const head_grainGeom = new THREE.BoxGeometry(0.006, 0.15, 0.006);
  const head_grain = new THREE.InstancedMesh(head_grainGeom, grainMat, 8);
  head_grain.name = "head_grain";
  const head_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    head_grain_dummy.position.set(
      -0.43 + i * 0.123,
      -0.29 + (i % 4) * 0.19,
      0.452
    );
    head_grain_dummy.rotation.set(0, 0, ((i % 3) - 1) * 0.02);
    head_grain_dummy.scale.set(1, 0.45 + (i % 4) * 0.14, 1);
    head_grain_dummy.updateMatrix();
    head_grain.setMatrixAt(i, head_grain_dummy.matrix);
  }
  head_grain.instanceMatrix.needsUpdate = true;
  head_group.add(head_grain);

  const eye_rimGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.018, 24);
  const eyeGeom = new THREE.SphereGeometry(0.071, 24, 14);

  const left_eye_rim = new THREE.Mesh(eye_rimGeom, eyeSocketMat);
  left_eye_rim.name = "left_eye_rim";
  left_eye_rim.rotation.x = Math.PI / 2;
  left_eye_rim.position.set(-0.245, 0.115, 0.456);
  head_group.add(left_eye_rim);

  const right_eye_rim = new THREE.Mesh(eye_rimGeom, eyeSocketMat);
  right_eye_rim.name = "right_eye_rim";
  right_eye_rim.rotation.x = Math.PI / 2;
  right_eye_rim.position.set(0.245, 0.115, 0.456);
  head_group.add(right_eye_rim);

  const left_eye = new THREE.Mesh(eyeGeom, eyeMat);
  left_eye.name = "left_eye";
  left_eye.scale.set(1, 1, 0.36);
  left_eye.position.set(-0.245, 0.115, 0.477);
  head_group.add(left_eye);

  const right_eye = new THREE.Mesh(eyeGeom, eyeMat);
  right_eye.name = "right_eye";
  right_eye.scale.set(1, 1, 0.36);
  right_eye.position.set(0.245, 0.115, 0.477);
  head_group.add(right_eye);

  const smilePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.22, -0.105, 0.462),
      new THREE.Vector3(-0.16, -0.18, 0.462),
      new THREE.Vector3(0, -0.235, 0.462),
      new THREE.Vector3(0.16, -0.18, 0.462),
      new THREE.Vector3(0.22, -0.105, 0.462),
    ],
    false,
    "centripetal"
  );
  const smileGeom = new THREE.TubeGeometry(smilePath, 28, 0.014, 8, false);
  const smile = new THREE.Mesh(smileGeom, eyeMat);
  smile.name = "smile";
  head_group.add(smile);

  const head_side_discGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.075, 32);
  const head_side_disc = new THREE.Mesh(head_side_discGeom, endGrainMat);
  head_side_disc.name = "head_side_disc";
  head_side_disc.rotation.z = Math.PI / 2;
  head_side_disc.position.set(0.595, 0.035, 0.015);
  head_group.add(head_side_disc);

  const head_side_centerGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.082, 32);
  const head_side_center = new THREE.Mesh(head_side_centerGeom, lightWoodMat);
  head_side_center.name = "head_side_center";
  head_side_center.rotation.z = Math.PI / 2;
  head_side_center.position.set(0.607, 0.035, 0.015);
  head_group.add(head_side_center);

  const head_side_ringGeom = new THREE.TorusGeometry(0.185, 0.009, 8, 32);
  const head_side_ring = new THREE.Mesh(head_side_ringGeom, grainMat);
  head_side_ring.name = "head_side_ring";
  head_side_ring.rotation.y = Math.PI / 2;
  head_side_ring.position.set(0.651, 0.035, 0.015);
  head_group.add(head_side_ring);

  const left_arm = new THREE.Group();
  left_arm.name = "left_arm";
  root.add(left_arm);

  const right_arm = new THREE.Group();
  right_arm.name = "right_arm";
  root.add(right_arm);

  const shoulderJointGeom = new THREE.CylinderGeometry(0.112, 0.112, 0.09, 24);
  const shoulderCapGeom = new THREE.SphereGeometry(1, 24, 16);

  const left_shoulder_joint = new THREE.Mesh(shoulderJointGeom, jointMat);
  left_shoulder_joint.name = "left_shoulder_joint";
  left_shoulder_joint.rotation.z = Math.PI / 2;
  left_shoulder_joint.position.set(-0.445, 2.06, 0.015);
  left_arm.add(left_shoulder_joint);

  const right_shoulder_joint = new THREE.Mesh(shoulderJointGeom, jointMat);
  right_shoulder_joint.name = "right_shoulder_joint";
  right_shoulder_joint.rotation.z = Math.PI / 2;
  right_shoulder_joint.position.set(0.445, 2.06, 0.015);
  right_arm.add(right_shoulder_joint);

  const left_shoulder_cap = new THREE.Mesh(shoulderCapGeom, lightWoodMat);
  left_shoulder_cap.name = "left_shoulder_cap";
  left_shoulder_cap.scale.set(0.13, 0.18, 0.16);
  left_shoulder_cap.position.set(-0.47, 2.06, 0.015);
  left_arm.add(left_shoulder_cap);

  const right_shoulder_cap = new THREE.Mesh(shoulderCapGeom, lightWoodMat);
  right_shoulder_cap.name = "right_shoulder_cap";
  right_shoulder_cap.scale.set(0.13, 0.18, 0.16);
  right_shoulder_cap.position.set(0.47, 2.06, 0.015);
  right_arm.add(right_shoulder_cap);

  const leftShoulderPoint = new THREE.Vector3(-0.52, 2.05, 0.015);
  const leftElbowPoint = new THREE.Vector3(-0.64, 1.57, 0.035);
  const leftWristPoint = new THREE.Vector3(-0.73, 1.18, 0.055);

  const left_upper_armGeom = createTaperedLegGeometry(0.29, 0.23, 0.54, 0.24);
  const left_upper_arm = new THREE.Mesh(left_upper_armGeom, lightWoodMat);
  left_upper_arm.name = "left_upper_arm";
  orientBetween(left_upper_arm, leftElbowPoint, leftShoulderPoint);
  left_arm.add(left_upper_arm);

  const left_forearmGeom = createTaperedLegGeometry(0.23, 0.19, 0.48, 0.22);
  const left_forearm = new THREE.Mesh(left_forearmGeom, woodMat);
  left_forearm.name = "left_forearm";
  orientBetween(left_forearm, leftWristPoint, leftElbowPoint);
  left_arm.add(left_forearm);

  const rightShoulderPoint = new THREE.Vector3(0.52, 2.05, 0.015);
  const rightElbowPoint = new THREE.Vector3(0.64, 1.57, 0.035);
  const rightWristPoint = new THREE.Vector3(0.72, 1.18, 0.055);

  const right_upper_armGeom = createTaperedLegGeometry(0.29, 0.23, 0.54, 0.24);
  const right_upper_arm = new THREE.Mesh(right_upper_armGeom, lightWoodMat);
  right_upper_arm.name = "right_upper_arm";
  orientBetween(right_upper_arm, rightElbowPoint, rightShoulderPoint);
  right_arm.add(right_upper_arm);

  const right_forearmGeom = createTaperedLegGeometry(0.23, 0.19, 0.48, 0.22);
  const right_forearm = new THREE.Mesh(right_forearmGeom, woodMat);
  right_forearm.name = "right_forearm";
  orientBetween(right_forearm, rightWristPoint, rightElbowPoint);
  right_arm.add(right_forearm);

  const elbowPinGeom = new THREE.CylinderGeometry(0.066, 0.066, 0.29, 20);

  const left_elbow_pin = new THREE.Mesh(elbowPinGeom, endGrainMat);
  left_elbow_pin.name = "left_elbow_pin";
  left_elbow_pin.rotation.x = Math.PI / 2;
  left_elbow_pin.position.copy(leftElbowPoint);
  left_arm.add(left_elbow_pin);

  const right_elbow_pin = new THREE.Mesh(elbowPinGeom, endGrainMat);
  right_elbow_pin.name = "right_elbow_pin";
  right_elbow_pin.rotation.x = Math.PI / 2;
  right_elbow_pin.position.copy(rightElbowPoint);
  right_arm.add(right_elbow_pin);

  const wristPinGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.24, 20);

  const left_wrist_pin = new THREE.Mesh(wristPinGeom, endGrainMat);
  left_wrist_pin.name = "left_wrist_pin";
  left_wrist_pin.rotation.x = Math.PI / 2;
  left_wrist_pin.position.copy(leftWristPoint);
  left_arm.add(left_wrist_pin);

  const right_wrist_pin = new THREE.Mesh(wristPinGeom, endGrainMat);
  right_wrist_pin.name = "right_wrist_pin";
  right_wrist_pin.rotation.x = Math.PI / 2;
  right_wrist_pin.position.copy(rightWristPoint);
  right_arm.add(right_wrist_pin);

  const handGeom = new THREE.SphereGeometry(1, 24, 16);

  const left_hand = new THREE.Mesh(handGeom, lightWoodMat);
  left_hand.name = "left_hand";
  left_hand.scale.set(0.145, 0.18, 0.135);
  left_hand.position.set(-0.77, 0.99, 0.06);
  left_hand.rotation.z = -0.28;
  left_arm.add(left_hand);

  const right_hand = new THREE.Mesh(handGeom, lightWoodMat);
  right_hand.name = "right_hand";
  right_hand.scale.set(0.145, 0.18, 0.135);
  right_hand.position.set(0.76, 0.99, 0.06);
  right_hand.rotation.z = 0.28;
  right_arm.add(right_hand);

  const right_thumbGeom = new THREE.SphereGeometry(1, 20, 14);
  const right_thumb = new THREE.Mesh(right_thumbGeom, lightWoodMat);
  right_thumb.name = "right_thumb";
  right_thumb.scale.set(0.075, 0.105, 0.075);
  right_thumb.position.set(0.645, 1.09, 0.11);
  right_thumb.rotation.z = -0.55;
  right_arm.add(right_thumb);

  const legs_and_feet = new THREE.Group();
  legs_and_feet.name = "legs_and_feet";
  root.add(legs_and_feet);

  const hipJointGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.09, 24);

  const left_hip_joint = new THREE.Mesh(hipJointGeom, jointMat);
  left_hip_joint.name = "left_hip_joint";
  left_hip_joint.rotation.z = Math.PI / 2;
  left_hip_joint.position.set(-0.25, 1.36, 0.015);
  legs_and_feet.add(left_hip_joint);

  const right_hip_joint = new THREE.Mesh(hipJointGeom, jointMat);
  right_hip_joint.name = "right_hip_joint";
  right_hip_joint.rotation.z = Math.PI / 2;
  right_hip_joint.position.set(0.25, 1.36, 0.015);
  legs_and_feet.add(right_hip_joint);

  const left_thigh = createCylinderBetween(
    new THREE.Vector3(-0.27, 1.08, 0.015),
    new THREE.Vector3(-0.25, 1.36, 0.015),
    0.135,
    woodMat,
    20
  );
  left_thigh.name = "left_thigh";
  legs_and_feet.add(left_thigh);

  const right_thigh = createCylinderBetween(
    new THREE.Vector3(0.27, 1.08, 0.015),
    new THREE.Vector3(0.25, 1.36, 0.015),
    0.135,
    woodMat,
    20
  );
  right_thigh.name = "right_thigh";
  legs_and_feet.add(right_thigh);

  const kneePinGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.3, 22);

  const left_knee_pin = new THREE.Mesh(kneePinGeom, endGrainMat);
  left_knee_pin.name = "left_knee_pin";
  left_knee_pin.rotation.x = Math.PI / 2;
  left_knee_pin.position.set(-0.27, 1.08, 0.015);
  legs_and_feet.add(left_knee_pin);

  const right_knee_pin = new THREE.Mesh(kneePinGeom, endGrainMat);
  right_knee_pin.name = "right_knee_pin";
  right_knee_pin.rotation.x = Math.PI / 2;
  right_knee_pin.position.set(0.27, 1.08, 0.015);
  legs_and_feet.add(right_knee_pin);

  const left_shin = createCylinderBetween(
    new THREE.Vector3(-0.27, 0.54, 0.025),
    new THREE.Vector3(-0.27, 1.06, 0.015),
    0.115,
    lightWoodMat,
    20
  );
  left_shin.name = "left_shin";
  legs_and_feet.add(left_shin);

  const right_shin = createCylinderBetween(
    new THREE.Vector3(0.27, 0.54, 0.025),
    new THREE.Vector3(0.27, 1.06, 0.015),
    0.115,
    lightWoodMat,
    20
  );
  right_shin.name = "right_shin";
  legs_and_feet.add(right_shin);

  const footGeom = createRoundedBoxGeometry(0.36, 0.36, 0.4, 0.075, 0.022);

  const left_foot = new THREE.Mesh(footGeom, woodMat);
  left_foot.name = "left_foot";
  left_foot.position.set(-0.27, 0.4, 0.055);
  legs_and_feet.add(left_foot);

  const right_foot = new THREE.Mesh(footGeom, woodMat);
  right_foot.name = "right_foot";
  right_foot.position.set(0.27, 0.4, 0.055);
  legs_and_feet.add(right_foot);

  fitToUnitCube(root);
  return root;

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
}
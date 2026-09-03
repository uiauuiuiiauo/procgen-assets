export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "corner_sectional_sofa";

  const upholsteryMat = new THREE.MeshStandardMaterial({
    color: 0xa5a5a5,
    metalness: 0.0,
    roughness: 0.95,
  });
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x989898,
    metalness: 0.0,
    roughness: 0.95,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x707070,
    metalness: 0.0,
    roughness: 0.95,
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    metalness: 0.0,
    roughness: 0.95,
  });
  const footMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const halfW = width / 2;
    const halfH = height / 2;
    const r = Math.min(radius, halfW * 0.95, halfH * 0.95);
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
    shape.closePath();

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
    return geometry;
  }

  function roundedOutlineGeometry(width, height, z, radius, tubeRadius) {
    const halfW = width / 2;
    const halfH = height / 2;
    const r = Math.min(radius, halfW * 0.95, halfH * 0.95);
    const points = [
      new THREE.Vector3(-halfW + r, -halfH, z),
      new THREE.Vector3(halfW - r, -halfH, z),
      new THREE.Vector3(halfW, -halfH + r, z),
      new THREE.Vector3(halfW, halfH - r, z),
      new THREE.Vector3(halfW - r, halfH, z),
      new THREE.Vector3(-halfW + r, halfH, z),
      new THREE.Vector3(-halfW, halfH - r, z),
      new THREE.Vector3(-halfW, -halfH + r, z),
    ];
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 64, tubeRadius, 6, true);
  }

  const rear_baseGeom = roundedBoxGeometry(2.78, 0.46, 0.82, 0.07, 0.025);
  const rear_base = new THREE.Mesh(rear_baseGeom, baseMat);
  rear_base.name = "rear_base";
  rear_base.position.set(-0.08, 0.31, -0.43);
  root.add(rear_base);

  const right_baseGeom = roundedBoxGeometry(0.82, 0.46, 1.62, 0.07, 0.025);
  const right_base = new THREE.Mesh(right_baseGeom, baseMat);
  right_base.name = "right_base";
  right_base.position.set(0.98, 0.31, 0.02);
  root.add(right_base);

  const rear_base_seamGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.36, 8);
  const rear_base_seam = new THREE.Mesh(rear_base_seamGeom, seamMat);
  rear_base_seam.name = "rear_base_seam";
  rear_base_seam.position.set(0.55, 0.30, -0.002);
  root.add(rear_base_seam);

  const rear_seat_cushionGeom = roundedBoxGeometry(2.08, 0.25, 0.86, 0.10, 0.03);
  const rear_seat_cushion = new THREE.Mesh(rear_seat_cushionGeom, upholsteryMat);
  rear_seat_cushion.name = "rear_seat_cushion";
  rear_seat_cushion.position.set(-0.27, 0.65, -0.39);
  root.add(rear_seat_cushion);

  const right_seat_cushionGeom = roundedBoxGeometry(0.88, 0.25, 1.55, 0.10, 0.03);
  const right_seat_cushion = new THREE.Mesh(right_seat_cushionGeom, upholsteryMat);
  right_seat_cushion.name = "right_seat_cushion";
  right_seat_cushion.position.set(0.98, 0.65, 0.04);
  root.add(right_seat_cushion);

  const rear_seat_pipingGeom = roundedOutlineGeometry(2.02, 0.21, 0.46, 0.09, 0.008);
  const rear_seat_piping = new THREE.Mesh(rear_seat_pipingGeom, seamMat);
  rear_seat_piping.name = "rear_seat_piping";
  rear_seat_piping.position.copy(rear_seat_cushion.position);
  root.add(rear_seat_piping);

  const right_seat_pipingGeom = roundedOutlineGeometry(0.82, 0.21, 0.80, 0.09, 0.008);
  const right_seat_piping = new THREE.Mesh(right_seat_pipingGeom, seamMat);
  right_seat_piping.name = "right_seat_piping";
  right_seat_piping.position.copy(right_seat_cushion.position);
  root.add(right_seat_piping);

  const seat_center_seamGeom = new THREE.CylinderGeometry(0.007, 0.007, 0.72, 8);
  const seat_center_seam = new THREE.Mesh(seat_center_seamGeom, seamMat);
  seat_center_seam.name = "seat_center_seam";
  seat_center_seam.rotation.x = Math.PI / 2;
  seat_center_seam.position.set(0.55, 0.795, -0.39);
  root.add(seat_center_seam);

  const backrestGeom = roundedBoxGeometry(2.82, 1.02, 0.25, 0.16, 0.035);
  const backrest = new THREE.Mesh(backrestGeom, upholsteryMat);
  backrest.name = "backrest";
  backrest.position.set(-0.08, 1.00, -0.79);
  root.add(backrest);

  const backrest_top_rollGeom = new THREE.CylinderGeometry(0.16, 0.16, 2.72, 24);
  const backrest_top_roll = new THREE.Mesh(backrest_top_rollGeom, upholsteryMat);
  backrest_top_roll.name = "backrest_top_roll";
  backrest_top_roll.rotation.z = Math.PI / 2;
  backrest_top_roll.position.set(-0.08, 1.47, -0.75);
  root.add(backrest_top_roll);

  const right_armGeom = roundedBoxGeometry(0.34, 1.18, 1.84, 0.13, 0.035);
  const right_arm = new THREE.Mesh(right_armGeom, upholsteryMat);
  right_arm.name = "right_arm";
  right_arm.position.set(1.43, 0.82, 0.00);
  root.add(right_arm);

  const left_armGeom = roundedBoxGeometry(0.34, 1.12, 0.92, 0.13, 0.035);
  const left_arm = new THREE.Mesh(left_armGeom, upholsteryMat);
  left_arm.name = "left_arm";
  left_arm.position.set(-1.43, 0.80, -0.40);
  root.add(left_arm);

  const right_arm_front_panelGeom = roundedBoxGeometry(0.32, 0.88, 0.16, 0.13, 0.025);
  const right_arm_front_panel = new THREE.Mesh(right_arm_front_panelGeom, upholsteryMat);
  right_arm_front_panel.name = "right_arm_front_panel";
  right_arm_front_panel.position.set(1.43, 0.98, 0.88);
  root.add(right_arm_front_panel);

  const left_arm_front_panelGeom = roundedBoxGeometry(0.32, 0.84, 0.16, 0.13, 0.025);
  const left_arm_front_panel = new THREE.Mesh(left_arm_front_panelGeom, upholsteryMat);
  left_arm_front_panel.name = "left_arm_front_panel";
  left_arm_front_panel.position.set(-1.43, 0.96, 0.08);
  root.add(left_arm_front_panel);

  const right_arm_inner_cushionGeom = roundedBoxGeometry(1.48, 0.56, 0.16, 0.16, 0.025);
  const right_arm_inner_cushion = new THREE.Mesh(right_arm_inner_cushionGeom, upholsteryMat);
  right_arm_inner_cushion.name = "right_arm_inner_cushion";
  right_arm_inner_cushion.rotation.y = Math.PI / 2;
  right_arm_inner_cushion.position.set(1.22, 1.22, 0.02);
  root.add(right_arm_inner_cushion);

  const left_arm_inner_cushionGeom = roundedBoxGeometry(0.58, 0.56, 0.16, 0.16, 0.025);
  const left_arm_inner_cushion = new THREE.Mesh(left_arm_inner_cushionGeom, upholsteryMat);
  left_arm_inner_cushion.name = "left_arm_inner_cushion";
  left_arm_inner_cushion.rotation.y = Math.PI / 2;
  left_arm_inner_cushion.position.set(-1.22, 1.22, -0.42);
  root.add(left_arm_inner_cushion);

  const right_arm_top_rollGeom = new THREE.CylinderGeometry(0.16, 0.16, 1.72, 24);
  const right_arm_top_roll = new THREE.Mesh(right_arm_top_rollGeom, upholsteryMat);
  right_arm_top_roll.name = "right_arm_top_roll";
  right_arm_top_roll.rotation.x = Math.PI / 2;
  right_arm_top_roll.position.set(1.43, 1.39, 0.00);
  root.add(right_arm_top_roll);

  const left_arm_top_rollGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.82, 24);
  const left_arm_top_roll = new THREE.Mesh(left_arm_top_rollGeom, upholsteryMat);
  left_arm_top_roll.name = "left_arm_top_roll";
  left_arm_top_roll.rotation.x = Math.PI / 2;
  left_arm_top_roll.position.set(-1.43, 1.35, -0.40);
  root.add(left_arm_top_roll);

  const right_arm_top_seamGeom = new THREE.CylinderGeometry(0.007, 0.007, 1.58, 8);
  const right_arm_top_seam = new THREE.Mesh(right_arm_top_seamGeom, seamMat);
  right_arm_top_seam.name = "right_arm_top_seam";
  right_arm_top_seam.rotation.x = Math.PI / 2;
  right_arm_top_seam.position.set(1.27, 1.54, 0.00);
  root.add(right_arm_top_seam);

  const left_arm_top_seamGeom = new THREE.CylinderGeometry(0.007, 0.007, 0.68, 8);
  const left_arm_top_seam = new THREE.Mesh(left_arm_top_seamGeom, seamMat);
  left_arm_top_seam.name = "left_arm_top_seam";
  left_arm_top_seam.rotation.x = Math.PI / 2;
  left_arm_top_seam.position.set(-1.27, 1.50, -0.40);
  root.add(left_arm_top_seam);

  const right_arm_front_pipingGeom = roundedOutlineGeometry(0.29, 0.80, 0.09, 0.11, 0.007);
  const right_arm_front_piping = new THREE.Mesh(right_arm_front_pipingGeom, seamMat);
  right_arm_front_piping.name = "right_arm_front_piping";
  right_arm_front_piping.position.set(1.43, 0.98, 0.88);
  root.add(right_arm_front_piping);

  const left_arm_front_pipingGeom = roundedOutlineGeometry(0.29, 0.76, 0.09, 0.11, 0.007);
  const left_arm_front_piping = new THREE.Mesh(left_arm_front_pipingGeom, seamMat);
  left_arm_front_piping.name = "left_arm_front_piping";
  left_arm_front_piping.position.set(-1.43, 0.96, 0.08);
  root.add(left_arm_front_piping);

  const back_tuft_puffGeom = new THREE.SphereGeometry(1, 20, 12);
  const back_tuft_puffs = new THREE.InstancedMesh(
    back_tuft_puffGeom,
    upholsteryMat,
    20
  );
  back_tuft_puffs.name = "back_tuft_puffs";

  const dummy = new THREE.Object3D();
  let puffIndex = 0;
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 5; column++) {
      dummy.position.set(
        -0.96 + column * 0.44,
        0.70 + row * 0.24,
        -0.60
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.255, 0.15, 0.075);
      dummy.updateMatrix();
      back_tuft_puffs.setMatrixAt(puffIndex, dummy.matrix);
      puffIndex++;
    }
  }
  back_tuft_puffs.instanceMatrix.needsUpdate = true;
  root.add(back_tuft_puffs);

  const back_tuft_buttonGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.022, 16);
  const back_tuft_buttons = new THREE.InstancedMesh(
    back_tuft_buttonGeom,
    buttonMat,
    16
  );
  back_tuft_buttons.name = "back_tuft_buttons";

  const backButtonPositions = [];
  let backButtonIndex = 0;
  for (let row = 0; row < 4; row++) {
    const y = 0.82 + row * 0.24;
    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 2) {
      const x = rowOffset * 0.22 + row * 0.06;
      backButtonPositions.push(new THREE.Vector3(x, y, -0.505));
      dummy.position.set(x, y, -0.505);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      back_tuft_buttons.setMatrixAt(backButtonIndex, dummy.matrix);
      backButtonIndex++;
    }
  }
  back_tuft_buttons.instanceMatrix.needsUpdate = true;
  root.add(back_tuft_buttons);

  const back_tuft_creaseGeom = new THREE.CylinderGeometry(0.006, 0.006, 1, 6);
  const back_tuft_creases = new THREE.InstancedMesh(
    back_tuft_creaseGeom,
    seamMat,
    backButtonPositions.length * 4
  );
  back_tuft_creases.name = "back_tuft_creases";

  const up = new THREE.Vector3(0, 1, 0);
  let backCreaseIndex = 0;
  for (const buttonPosition of backButtonPositions) {
    for (let i = 0; i < 4; i++) {
      const angle = Math.PI / 4 + i * Math.PI / 2;
      const direction = new THREE.Vector3(
        Math.cos(angle),
        Math.sin(angle),
        0
      );
      const creaseCenter = buttonPosition
        .clone()
        .addScaledVector(direction, 0.105);
      creaseCenter.z = -0.514;

      dummy.position.copy(creaseCenter);
      dummy.quaternion.setFromUnitVectors(up, direction);
      dummy.scale.set(1, 0.21, 1);
      dummy.updateMatrix();
      back_tuft_creases.setMatrixAt(backCreaseIndex, dummy.matrix);
      backCreaseIndex++;
    }
  }
  back_tuft_creases.instanceMatrix.needsUpdate = true;
  root.add(back_tuft_creases);

  const right_arm_tuft_puffs = new THREE.InstancedMesh(
    back_tuft_puffGeom,
    upholsteryMat,
    12
  );
  right_arm_tuft_puffs.name = "right_arm_tuft_puffs";

  puffIndex = 0;
  for (let row = 0; row < 2; row++) {
    for (let column = 0; column < 6; column++) {
      dummy.position.set(
        1.105,
        1.10 + row * 0.24,
        -0.55 + column * 0.22
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.07, 0.15, 0.13);
      dummy.updateMatrix();
      right_arm_tuft_puffs.setMatrixAt(puffIndex, dummy.matrix);
      puffIndex++;
    }
  }
  right_arm_tuft_puffs.instanceMatrix.needsUpdate = true;
  root.add(right_arm_tuft_puffs);

  const left_arm_tuft_puffs = new THREE.InstancedMesh(
    back_tuft_puffGeom,
    upholsteryMat,
    4
  );
  left_arm_tuft_puffs.name = "left_arm_tuft_puffs";

  puffIndex = 0;
  for (let row = 0; row < 2; row++) {
    for (let column = 0; column < 2; column++) {
      dummy.position.set(
        -1.105,
        1.10 + row * 0.24,
        -0.55 + column * 0.24
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.07, 0.15, 0.14);
      dummy.updateMatrix();
      left_arm_tuft_puffs.setMatrixAt(puffIndex, dummy.matrix);
      puffIndex++;
    }
  }
  left_arm_tuft_puffs.instanceMatrix.needsUpdate = true;
  root.add(left_arm_tuft_puffs);

  const armButtonTransforms = [];
  for (let row = 0; row < 3; row++) {
    const y = 1.10 + row * 0.24;
    for (let column = 0; column < 5; column++) {
      armButtonTransforms.push({
        position: new THREE.Vector3(
          0.995,
          y,
          -0.44 + column * 0.22
        ),
        direction: new THREE.Vector3(-1, 0, 0),
      });
    }
  }
  for (let row = 0; row < 3; row++) {
    const y = 1.10 + row * 0.24;
    for (let column = 0; column < 2; column++) {
      armButtonTransforms.push({
        position: new THREE.Vector3(
          -0.995,
          y,
          -0.56 + column * 0.24
        ),
        direction: new THREE.Vector3(1, 0, 0),
      });
    }
  }

  const arm_tuft_buttonGeom = new THREE.CylinderGeometry(0.028, 0.028, 0.022, 14);
  const arm_tuft_buttons = new THREE.InstancedMesh(
    arm_tuft_buttonGeom,
    buttonMat,
    armButtonTransforms.length
  );
  arm_tuft_buttons.name = "arm_tuft_buttons";

  for (let i = 0; i < armButtonTransforms.length; i++) {
    const transform = armButtonTransforms[i];
    dummy.position.copy(transform.position);
    dummy.quaternion.setFromUnitVectors(up, transform.direction);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    arm_tuft_buttons.setMatrixAt(i, dummy.matrix);
  }
  arm_tuft_buttons.instanceMatrix.needsUpdate = true;
  root.add(arm_tuft_buttons);

  const arm_tuft_creaseGeom = new THREE.CylinderGeometry(0.0055, 0.0055, 1, 6);
  const arm_tuft_creases = new THREE.InstancedMesh(
    arm_tuft_creaseGeom,
    seamMat,
    armButtonTransforms.length * 4
  );
  arm_tuft_creases.name = "arm_tuft_creases";

  let armCreaseIndex = 0;
  for (const transform of armButtonTransforms) {
    for (let i = 0; i < 4; i++) {
      const angle = Math.PI / 4 + i * Math.PI / 2;
      const direction = new THREE.Vector3(
        transform.direction.x,
        Math.sin(angle),
        Math.cos(angle)
      ).normalize();
      const creaseCenter = transform.position
        .clone()
        .addScaledVector(direction, 0.09);
      creaseCenter.x += transform.direction.x * 0.006;

      dummy.position.copy(creaseCenter);
      dummy.quaternion.setFromUnitVectors(up, direction);
      dummy.scale.set(1, 0.18, 1);
      dummy.updateMatrix();
      arm_tuft_creases.setMatrixAt(armCreaseIndex, dummy.matrix);
      armCreaseIndex++;
    }
  }
  arm_tuft_creases.instanceMatrix.needsUpdate = true;
  root.add(arm_tuft_creases);

  const feetGeom = new THREE.CylinderGeometry(0.075, 0.10, 0.12, 12);
  const feet = new THREE.InstancedMesh(feetGeom, footMat, 6);
  feet.name = "feet";

  const footPositions = [
    new THREE.Vector3(-1.28, 0.06, -0.68),
    new THREE.Vector3(0.55, 0.06, -0.68),
    new THREE.Vector3(-1.28, 0.06, 0.02),
    new THREE.Vector3(0.55, 0.06, 0.02),
    new THREE.Vector3(0.62, 0.06, 0.72),
    new THREE.Vector3(1.30, 0.06, 0.72),
  ];

  for (let i = 0; i < footPositions.length; i++) {
    dummy.position.copy(footPositions[i]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    feet.setMatrixAt(i, dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

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
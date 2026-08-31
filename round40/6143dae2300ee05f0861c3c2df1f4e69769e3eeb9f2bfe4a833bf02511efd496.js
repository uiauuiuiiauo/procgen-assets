export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "corner_sectional_sofa";

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x929292,
    metalness: 0.0,
    roughness: 0.95,
  });
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x858585,
    metalness: 0.0,
    roughness: 0.95,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x626262,
    metalness: 0.0,
    roughness: 0.95,
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x343434,
    metalness: 0.0,
    roughness: 0.95,
  });
  const feetMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);
    const shape = new THREE.Shape();

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);

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

  function roundedLoopXYGeometry(width, height, z, radius, tubeRadius) {
    const x = width / 2;
    const y = height / 2;
    const r = radius;
    const points = [
      new THREE.Vector3(-x + r, -y, z),
      new THREE.Vector3(x - r, -y, z),
      new THREE.Vector3(x, -y + r, z),
      new THREE.Vector3(x, y - r, z),
      new THREE.Vector3(x - r, y, z),
      new THREE.Vector3(-x + r, y, z),
      new THREE.Vector3(-x, y - r, z),
      new THREE.Vector3(-x, -y + r, z),
    ];
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 48, tubeRadius, 6, true);
  }

  function roundedLoopXZGeometry(width, depth, y, radius, tubeRadius) {
    const x = width / 2;
    const z = depth / 2;
    const r = radius;
    const points = [
      new THREE.Vector3(-x + r, y, -z),
      new THREE.Vector3(x - r, y, -z),
      new THREE.Vector3(x, y, -z + r),
      new THREE.Vector3(x, y, z - r),
      new THREE.Vector3(x - r, y, z),
      new THREE.Vector3(-x + r, y, z),
      new THREE.Vector3(-x, y, z - r),
      new THREE.Vector3(-x, y, -z + r),
    ];
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 48, tubeRadius, 6, true);
  }

  const cushionH = 0.22;
  const cushionY = 0.66;
  const cushionTopY = cushionY + cushionH / 2;

  const left_module = new THREE.Group();
  left_module.name = "left_module";
  root.add(left_module);

  const left_baseGeom = roundedBoxGeometry(1.38, 0.42, 0.72, 0.08, 0.025);
  const left_base = new THREE.Mesh(left_baseGeom, baseMat);
  left_base.name = "left_base";
  left_base.position.set(-0.43, 0.29, 0.14);
  left_module.add(left_base);

  const left_shadow_gapGeom = new THREE.BoxGeometry(1.34, 0.035, 0.66);
  const left_shadow_gap = new THREE.Mesh(left_shadow_gapGeom, shadowMat);
  left_shadow_gap.name = "left_shadow_gap";
  left_shadow_gap.position.set(-0.43, 0.515, 0.14);
  left_module.add(left_shadow_gap);

  const left_seat_cushionGeom = roundedBoxGeometry(
    1.4,
    cushionH,
    0.76,
    0.085,
    0.025
  );
  const left_seat_cushion = new THREE.Mesh(left_seat_cushionGeom, fabricMat);
  left_seat_cushion.name = "left_seat_cushion";
  left_seat_cushion.position.set(-0.43, cushionY, 0.14);
  left_module.add(left_seat_cushion);

  const left_cushion_pipingGeom = roundedLoopXZGeometry(
    1.34,
    0.7,
    0,
    0.075,
    0.007
  );
  const left_cushion_piping = new THREE.Mesh(
    left_cushion_pipingGeom,
    seamMat
  );
  left_cushion_piping.name = "left_cushion_piping";
  left_cushion_piping.position.set(-0.43, cushionTopY + 0.006, 0.14);
  left_module.add(left_cushion_piping);

  const left_base_front_seamGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    0.34,
    8
  );
  const left_base_front_seam = new THREE.Mesh(
    left_base_front_seamGeom,
    seamMat
  );
  left_base_front_seam.name = "left_base_front_seam";
  left_base_front_seam.position.set(-0.43, 0.29, 0.522);
  left_module.add(left_base_front_seam);

  const right_module = new THREE.Group();
  right_module.name = "right_module";
  root.add(right_module);

  const right_baseGeom = roundedBoxGeometry(1.18, 0.42, 0.72, 0.08, 0.025);
  const right_base = new THREE.Mesh(right_baseGeom, baseMat);
  right_base.name = "right_base";
  right_base.position.set(0.48, 0.29, -0.18);
  right_module.add(right_base);

  const right_shadow_gapGeom = new THREE.BoxGeometry(1.14, 0.035, 0.66);
  const right_shadow_gap = new THREE.Mesh(right_shadow_gapGeom, shadowMat);
  right_shadow_gap.name = "right_shadow_gap";
  right_shadow_gap.position.set(0.48, 0.515, -0.18);
  right_module.add(right_shadow_gap);

  const right_seat_cushionGeom = roundedBoxGeometry(
    1.2,
    cushionH,
    0.76,
    0.085,
    0.025
  );
  const right_seat_cushion = new THREE.Mesh(right_seat_cushionGeom, fabricMat);
  right_seat_cushion.name = "right_seat_cushion";
  right_seat_cushion.position.set(0.48, cushionY, -0.18);
  right_module.add(right_seat_cushion);

  const right_cushion_pipingGeom = roundedLoopXZGeometry(
    1.14,
    0.7,
    0,
    0.075,
    0.007
  );
  const right_cushion_piping = new THREE.Mesh(
    right_cushion_pipingGeom,
    seamMat
  );
  right_cushion_piping.name = "right_cushion_piping";
  right_cushion_piping.position.set(0.48, cushionTopY + 0.006, -0.18);
  right_module.add(right_cushion_piping);

  const right_base_front_seamGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    0.34,
    8
  );
  const right_base_front_seam = new THREE.Mesh(
    right_base_front_seamGeom,
    seamMat
  );
  right_base_front_seam.name = "right_base_front_seam";
  right_base_front_seam.position.set(0.48, 0.29, 0.202);
  right_module.add(right_base_front_seam);

  const back_module = new THREE.Group();
  back_module.name = "back_module";
  root.add(back_module);

  const back_supportGeom = roundedBoxGeometry(2.1, 0.76, 0.2, 0.1, 0.025);
  const back_support = new THREE.Mesh(back_supportGeom, baseMat);
  back_support.name = "back_support";
  back_support.position.set(0, 0.8, -0.46);
  back_module.add(back_support);

  const backrest_panelShape = new THREE.Shape();
  backrest_panelShape.moveTo(-0.98, -0.36);
  backrest_panelShape.lineTo(0.98, -0.36);
  backrest_panelShape.lineTo(0.98, 0.2);
  backrest_panelShape.bezierCurveTo(0.98, 0.34, 0.88, 0.43, 0.72, 0.45);
  backrest_panelShape.bezierCurveTo(0.3, 0.5, -0.3, 0.5, -0.72, 0.45);
  backrest_panelShape.bezierCurveTo(-0.88, 0.43, -0.98, 0.34, -0.98, 0.2);
  backrest_panelShape.lineTo(-0.98, -0.36);

  const backrest_panelGeom = new THREE.ExtrudeGeometry(backrest_panelShape, {
    depth: 0.2,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 4,
  });
  backrest_panelGeom.translate(0, 0, -0.1);

  const backrest_panel = new THREE.Mesh(backrest_panelGeom, fabricMat);
  backrest_panel.name = "backrest_panel";
  backrest_panel.position.set(0, 0.96, -0.46);
  back_module.add(backrest_panel);

  const back_tuft_puffGeom = new THREE.SphereGeometry(1, 20, 12);
  const backTuftPositions = [
    [-0.82, 1.17],
    [-0.41, 1.17],
    [0, 1.17],
    [0.41, 1.17],
    [0.82, 1.17],
    [-0.62, 0.87],
    [-0.2, 0.87],
    [0.22, 0.87],
    [0.64, 0.87],
  ];
  const back_tuft_puffs = new THREE.InstancedMesh(
    back_tuft_puffGeom,
    fabricMat,
    backTuftPositions.length
  );
  back_tuft_puffs.name = "back_tuft_puffs";

  const tuftDummy = new THREE.Object3D();
  for (let i = 0; i < backTuftPositions.length; i++) {
    const position = backTuftPositions[i];
    tuftDummy.position.set(position[0], position[1], -0.292);
    tuftDummy.rotation.set(0, 0, 0);
    tuftDummy.scale.set(0.24, 0.205, 0.055);
    tuftDummy.updateMatrix();
    back_tuft_puffs.setMatrixAt(i, tuftDummy.matrix);
  }
  back_tuft_puffs.instanceMatrix.needsUpdate = true;
  back_module.add(back_tuft_puffs);

  const backButtonPositions = [
    [-0.62, 1.02],
    [-0.2, 1.02],
    [0.22, 1.02],
    [0.64, 1.02],
  ];

  const back_tuft_dimpleGeom = new THREE.SphereGeometry(1, 16, 8);
  const back_tuft_dimples = new THREE.InstancedMesh(
    back_tuft_dimpleGeom,
    seamMat,
    backButtonPositions.length
  );
  back_tuft_dimples.name = "back_tuft_dimples";

  for (let i = 0; i < backButtonPositions.length; i++) {
    const position = backButtonPositions[i];
    tuftDummy.position.set(position[0], position[1], -0.226);
    tuftDummy.rotation.set(0, 0, 0);
    tuftDummy.scale.set(0.038, 0.038, 0.012);
    tuftDummy.updateMatrix();
    back_tuft_dimples.setMatrixAt(i, tuftDummy.matrix);
  }
  back_tuft_dimples.instanceMatrix.needsUpdate = true;
  back_module.add(back_tuft_dimples);

  const back_tuft_buttonGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.018,
    16
  );
  const back_tuft_buttons = new THREE.InstancedMesh(
    back_tuft_buttonGeom,
    seamMat,
    backButtonPositions.length
  );
  back_tuft_buttons.name = "back_tuft_buttons";

  for (let i = 0; i < backButtonPositions.length; i++) {
    const position = backButtonPositions[i];
    tuftDummy.position.set(position[0], position[1], -0.211);
    tuftDummy.rotation.set(Math.PI / 2, 0, 0);
    tuftDummy.scale.set(1, 1, 1);
    tuftDummy.updateMatrix();
    back_tuft_buttons.setMatrixAt(i, tuftDummy.matrix);
  }
  back_tuft_buttons.instanceMatrix.needsUpdate = true;
  back_module.add(back_tuft_buttons);

  const back_tuft_creaseGeom = new THREE.CylinderGeometry(
    0.0055,
    0.0055,
    0.12,
    6
  );
  const back_tuft_creases = new THREE.InstancedMesh(
    back_tuft_creaseGeom,
    seamMat,
    backButtonPositions.length * 4
  );
  back_tuft_creases.name = "back_tuft_creases";

  let creaseIndex = 0;
  for (let i = 0; i < backButtonPositions.length; i++) {
    const position = backButtonPositions[i];
    for (let j = 0; j < 4; j++) {
      const angle = Math.PI / 4 + j * Math.PI / 2;
      tuftDummy.position.set(
        position[0] + Math.cos(angle) * 0.067,
        position[1] + Math.sin(angle) * 0.067,
        -0.222
      );
      tuftDummy.rotation.set(0, 0, angle - Math.PI / 2);
      tuftDummy.scale.set(1, 1, 1);
      tuftDummy.updateMatrix();
      back_tuft_creases.setMatrixAt(creaseIndex, tuftDummy.matrix);
      creaseIndex++;
    }
  }
  back_tuft_creases.instanceMatrix.needsUpdate = true;
  back_module.add(back_tuft_creases);

  const back_top_pipingGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    1.76,
    8
  );
  const back_top_piping = new THREE.Mesh(back_top_pipingGeom, seamMat);
  back_top_piping.name = "back_top_piping";
  back_top_piping.rotation.z = Math.PI / 2;
  back_top_piping.position.set(0, 1.39, -0.335);
  back_module.add(back_top_piping);

  const left_module_wrap_backGeom = roundedBoxGeometry(
    0.22,
    0.72,
    0.2,
    0.09,
    0.025
  );
  const left_module_wrap_back = new THREE.Mesh(
    left_module_wrap_backGeom,
    fabricMat
  );
  left_module_wrap_back.name = "left_module_wrap_back";
  left_module_wrap_back.position.set(-0.96, 0.96, -0.46);
  back_module.add(left_module_wrap_back);

  const right_module_wrap_backGeom = roundedBoxGeometry(
    0.22,
    0.72,
    0.2,
    0.09,
    0.025
  );
  const right_module_wrap_back = new THREE.Mesh(
    right_module_wrap_backGeom,
    fabricMat
  );
  right_module_wrap_back.name = "right_module_wrap_back";
  right_module_wrap_back.position.set(0.96, 0.96, -0.46);
  back_module.add(right_module_wrap_back);

  const left_arm_module = new THREE.Group();
  left_arm_module.name = "left_arm_module";
  root.add(left_arm_module);

  const left_armGeom = roundedBoxGeometry(0.24, 1.08, 1.0, 0.11, 0.03);
  const left_arm = new THREE.Mesh(left_armGeom, fabricMat);
  left_arm.name = "left_arm";
  left_arm.position.set(-1.12, 0.61, 0.02);
  left_arm_module.add(left_arm);

  const left_arm_top_cushionGeom = new THREE.CapsuleGeometry(
    0.13,
    0.7,
    8,
    16
  );
  const left_arm_top_cushion = new THREE.Mesh(
    left_arm_top_cushionGeom,
    fabricMat
  );
  left_arm_top_cushion.name = "left_arm_top_cushion";
  left_arm_top_cushion.rotation.x = Math.PI / 2;
  left_arm_top_cushion.position.set(-1.025, 1.095, 0.02);
  left_arm_module.add(left_arm_top_cushion);

  const left_arm_outer_panelGeom = new THREE.BoxGeometry(0.018, 0.82, 0.8);
  const left_arm_outer_panel = new THREE.Mesh(
    left_arm_outer_panelGeom,
    fabricMat
  );
  left_arm_outer_panel.name = "left_arm_outer_panel";
  left_arm_outer_panel.position.set(-1.255, 0.61, 0.02);
  left_arm_module.add(left_arm_outer_panel);

  const left_arm_outer_pipingGeom = roundedLoopXYGeometry(
    0.82,
    0.94,
    0,
    0.1,
    0.006
  );
  const left_arm_outer_piping = new THREE.Mesh(
    left_arm_outer_pipingGeom,
    seamMat
  );
  left_arm_outer_piping.name = "left_arm_outer_piping";
  left_arm_outer_piping.rotation.y = Math.PI / 2;
  left_arm_outer_piping.position.set(-1.268, 0.62, 0.02);
  left_arm_module.add(left_arm_outer_piping);

  const left_arm_front_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.82,
    8
  );
  const left_arm_front_seam = new THREE.Mesh(
    left_arm_front_seamGeom,
    seamMat
  );
  left_arm_front_seam.name = "left_arm_front_seam";
  left_arm_front_seam.position.set(-1.269, 0.61, 0.49);
  left_arm_module.add(left_arm_front_seam);

  const left_arm_tuft_puffGeom = new THREE.SphereGeometry(1, 20, 12);
  const left_arm_tuft_puff = new THREE.Mesh(
    left_arm_tuft_puffGeom,
    fabricMat
  );
  left_arm_tuft_puff.name = "left_arm_tuft_puff";
  left_arm_tuft_puff.scale.set(0.055, 0.22, 0.23);
  left_arm_tuft_puff.position.set(-0.95, 0.99, 0.12);
  left_arm_module.add(left_arm_tuft_puff);

  const left_arm_tuft_buttonGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.018,
    16
  );
  const left_arm_tuft_button = new THREE.Mesh(
    left_arm_tuft_buttonGeom,
    seamMat
  );
  left_arm_tuft_button.name = "left_arm_tuft_button";
  left_arm_tuft_button.rotation.z = Math.PI / 2;
  left_arm_tuft_button.position.set(-0.89, 0.99, 0.12);
  left_arm_module.add(left_arm_tuft_button);

  const left_arm_tuft_creaseGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    0.1,
    6
  );
  const left_arm_tuft_creases = new THREE.InstancedMesh(
    left_arm_tuft_creaseGeom,
    seamMat,
    4
  );
  left_arm_tuft_creases.name = "left_arm_tuft_creases";

  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    tuftDummy.position.set(
      -0.892,
      0.99 + Math.sin(angle) * 0.06,
      0.12 + Math.cos(angle) * 0.06
    );
    tuftDummy.rotation.set(angle, 0, 0);
    tuftDummy.scale.set(1, 1, 1);
    tuftDummy.updateMatrix();
    left_arm_tuft_creases.setMatrixAt(i, tuftDummy.matrix);
  }
  left_arm_tuft_creases.instanceMatrix.needsUpdate = true;
  left_arm_module.add(left_arm_tuft_creases);

  const right_arm_module = new THREE.Group();
  right_arm_module.name = "right_arm_module";
  root.add(right_arm_module);

  const right_armGeom = roundedBoxGeometry(0.24, 1.08, 1.0, 0.11, 0.03);
  const right_arm = new THREE.Mesh(right_armGeom, fabricMat);
  right_arm.name = "right_arm";
  right_arm.position.set(1.12, 0.61, 0.02);
  right_arm_module.add(right_arm);

  const right_arm_top_cushionGeom = new THREE.CapsuleGeometry(
    0.13,
    0.7,
    8,
    16
  );
  const right_arm_top_cushion = new THREE.Mesh(
    right_arm_top_cushionGeom,
    fabricMat
  );
  right_arm_top_cushion.name = "right_arm_top_cushion";
  right_arm_top_cushion.rotation.x = Math.PI / 2;
  right_arm_top_cushion.position.set(1.025, 1.095, 0.02);
  right_arm_module.add(right_arm_top_cushion);

  const right_arm_outer_panelGeom = new THREE.BoxGeometry(0.018, 0.82, 0.8);
  const right_arm_outer_panel = new THREE.Mesh(
    right_arm_outer_panelGeom,
    fabricMat
  );
  right_arm_outer_panel.name = "right_arm_outer_panel";
  right_arm_outer_panel.position.set(1.255, 0.61, 0.02);
  right_arm_module.add(right_arm_outer_panel);

  const right_arm_outer_pipingGeom = roundedLoopXYGeometry(
    0.82,
    0.94,
    0,
    0.1,
    0.006
  );
  const right_arm_outer_piping = new THREE.Mesh(
    right_arm_outer_pipingGeom,
    seamMat
  );
  right_arm_outer_piping.name = "right_arm_outer_piping";
  right_arm_outer_piping.rotation.y = Math.PI / 2;
  right_arm_outer_piping.position.set(1.268, 0.62, 0.02);
  right_arm_module.add(right_arm_outer_piping);

  const right_arm_front_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.82,
    8
  );
  const right_arm_front_seam = new THREE.Mesh(
    right_arm_front_seamGeom,
    seamMat
  );
  right_arm_front_seam.name = "right_arm_front_seam";
  right_arm_front_seam.position.set(1.269, 0.61, 0.49);
  right_arm_module.add(right_arm_front_seam);

  const right_arm_tuft_puffGeom = new THREE.SphereGeometry(1, 20, 12);
  const right_arm_tuft_puff = new THREE.Mesh(
    right_arm_tuft_puffGeom,
    fabricMat
  );
  right_arm_tuft_puff.name = "right_arm_tuft_puff";
  right_arm_tuft_puff.scale.set(0.055, 0.22, 0.23);
  right_arm_tuft_puff.position.set(0.95, 0.99, 0.12);
  right_arm_module.add(right_arm_tuft_puff);

  const right_arm_tuft_buttonGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.018,
    16
  );
  const right_arm_tuft_button = new THREE.Mesh(
    right_arm_tuft_buttonGeom,
    seamMat
  );
  right_arm_tuft_button.name = "right_arm_tuft_button";
  right_arm_tuft_button.rotation.z = Math.PI / 2;
  right_arm_tuft_button.position.set(0.89, 0.99, 0.12);
  right_arm_module.add(right_arm_tuft_button);

  const right_arm_tuft_creaseGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    0.1,
    6
  );
  const right_arm_tuft_creases = new THREE.InstancedMesh(
    right_arm_tuft_creaseGeom,
    seamMat,
    4
  );
  right_arm_tuft_creases.name = "right_arm_tuft_creases";

  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    tuftDummy.position.set(
      0.892,
      0.99 + Math.sin(angle) * 0.06,
      0.12 + Math.cos(angle) * 0.06
    );
    tuftDummy.rotation.set(angle, 0, 0);
    tuftDummy.scale.set(1, 1, 1);
    tuftDummy.updateMatrix();
    right_arm_tuft_creases.setMatrixAt(i, tuftDummy.matrix);
  }
  right_arm_tuft_creases.instanceMatrix.needsUpdate = true;
  right_arm_module.add(right_arm_tuft_creases);

  const feetGeom = new THREE.CylinderGeometry(0.055, 0.07, 0.1, 12);
  const footPositions = [
    [-1.05, 0.05, 0.43],
    [0.18, 0.05, 0.43],
    [1.05, 0.05, 0.36],
    [-1.05, 0.05, -0.38],
    [1.05, 0.05, -0.38],
    [0.05, 0.05, -0.4],
  ];
  const feet = new THREE.InstancedMesh(
    feetGeom,
    feetMat,
    footPositions.length
  );
  feet.name = "feet";

  for (let i = 0; i < footPositions.length; i++) {
    const position = footPositions[i];
    tuftDummy.position.set(position[0], position[1], position[2]);
    tuftDummy.rotation.set(0, 0, 0);
    tuftDummy.scale.set(1, 1, 1);
    tuftDummy.updateMatrix();
    feet.setMatrixAt(i, tuftDummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

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

  fitToUnitCube(THREE, root);
  return root;
}
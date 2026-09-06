export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "log_cabin";

  const cabinW = 3.6;
  const cabinD = 2.7;
  const wallBottom = 0.14;
  const wallH = 1.72;
  const wallTop = wallBottom + wallH;
  const eaveY = 1.98;
  const ridgeY = 3.25;
  const roofRun = 1.65;
  const roofRise = ridgeY - eaveY;
  const roofSlope = Math.sqrt(roofRun * roofRun + roofRise * roofRise);
  const roofAngle = Math.atan2(roofRise, roofRun);
  const roofW = 4.15;
  const frontZ = cabinD / 2;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x87502f,
    metalness: 0.0,
    roughness: 0.9
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x56301d,
    metalness: 0.0,
    roughness: 0.9
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xa66a3c,
    metalness: 0.0,
    roughness: 0.9
  });
  const thatchMat = new THREE.MeshStandardMaterial({
    color: 0xb58a55,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const thatchLightMat = new THREE.MeshStandardMaterial({
    color: 0xc49a62,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const thatchMidMat = new THREE.MeshStandardMaterial({
    color: 0x9b7a55,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const thatchDarkMat = new THREE.MeshStandardMaterial({
    color: 0x75634d,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const thatchEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x806044,
    metalness: 0.0,
    roughness: 0.95
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x253238,
    metalness: 0.0,
    roughness: 0.3
  });
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x8d8578,
    metalness: 0.0,
    roughness: 0.9
  });
  const brickMat = new THREE.MeshStandardMaterial({
    color: 0x8e513d,
    metalness: 0.0,
    roughness: 0.9
  });
  const mortarMat = new THREE.MeshStandardMaterial({
    color: 0x55483f,
    metalness: 0.0,
    roughness: 0.9
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb8862d,
    metalness: 0.5,
    roughness: 0.25
  });
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xffc46b,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffc46b,
    emissiveIntensity: 1.0
  });
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x34372c,
    metalness: 0.0,
    roughness: 0.9
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x61733a,
    metalness: 0.0,
    roughness: 0.95
  });
  const mossLightMat = new THREE.MeshStandardMaterial({
    color: 0x89904c,
    metalness: 0.0,
    roughness: 0.95
  });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function makeBeamBetween(name, p1, p2, thickness, mat) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, length, thickness),
      mat
    );
    mesh.name = name;
    mesh.position.copy(p1).add(p2).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    root.add(mesh);
    return mesh;
  }

  function createWindow(name, width, height, x, y, z, rotY) {
    const windowGroup = new THREE.Group();
    windowGroup.name = name;
    windowGroup.position.set(x, y, z);
    windowGroup.rotation.y = rotY;

    const window_glass = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, 0.025),
      glassMat
    );
    window_glass.name = name + "_glass";
    window_glass.position.z = 0.015;
    windowGroup.add(window_glass);

    const frameT = 0.075;
    const frameDepth = 0.075;
    const left_frame = new THREE.Mesh(
      new THREE.BoxGeometry(frameT, height + frameT * 1.6, frameDepth),
      darkWoodMat
    );
    left_frame.position.set(-width / 2 - frameT / 2, 0, 0.045);
    windowGroup.add(left_frame);

    const right_frame = left_frame.clone();
    right_frame.position.x = width / 2 + frameT / 2;
    windowGroup.add(right_frame);

    const top_frame = new THREE.Mesh(
      new THREE.BoxGeometry(width + frameT * 1.8, frameT, frameDepth),
      darkWoodMat
    );
    top_frame.position.set(0, height / 2 + frameT / 2, 0.045);
    windowGroup.add(top_frame);

    const bottom_frame = top_frame.clone();
    bottom_frame.position.y = -height / 2 - frameT / 2;
    windowGroup.add(bottom_frame);

    const vertical_mullion = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, height, 0.06),
      woodMat
    );
    vertical_mullion.position.z = 0.055;
    windowGroup.add(vertical_mullion);

    const horizontal_mullion = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.045, 0.06),
      woodMat
    );
    horizontal_mullion.position.z = 0.055;
    windowGroup.add(horizontal_mullion);

    root.add(windowGroup);
    return windowGroup;
  }

  const ground_baseGeom = new THREE.BoxGeometry(4.35, 0.08, 3.55);
  const ground_base = new THREE.Mesh(ground_baseGeom, groundMat);
  ground_base.name = "ground_base";
  ground_base.position.y = 0.04;
  root.add(ground_base);

  const moss_bedGeom = new THREE.BoxGeometry(4.18, 0.065, 3.38);
  const moss_bed = new THREE.Mesh(moss_bedGeom, mossMat);
  moss_bed.name = "moss_bed";
  moss_bed.position.y = 0.102;
  root.add(moss_bed);

  const foundation_front = addBox(
    "foundation_front", 3.72, 0.13, 0.14, darkWoodMat,
    0, 0.19, frontZ + 0.015
  );
  const foundation_back = addBox(
    "foundation_back", 3.72, 0.13, 0.14, darkWoodMat,
    0, 0.19, -frontZ - 0.015
  );
  const foundation_left = addBox(
    "foundation_left", 0.14, 0.13, 2.72, darkWoodMat,
    -cabinW / 2 - 0.015, 0.19, 0
  );
  const foundation_right = addBox(
    "foundation_right", 0.14, 0.13, 2.72, darkWoodMat,
    cabinW / 2 + 0.015, 0.19, 0
  );

  const front_wallGeom = new THREE.BoxGeometry(cabinW, wallH, 0.12);
  const front_wall = new THREE.Mesh(front_wallGeom, woodMat);
  front_wall.name = "front_wall";
  front_wall.position.set(0, wallBottom + wallH / 2, frontZ);
  root.add(front_wall);

  const rear_wall = new THREE.Mesh(front_wallGeom, woodMat);
  rear_wall.name = "rear_wall";
  rear_wall.position.set(0, wallBottom + wallH / 2, -frontZ);
  root.add(rear_wall);

  const side_wallGeom = new THREE.BoxGeometry(0.12, wallH, cabinD);
  const left_wall = new THREE.Mesh(side_wallGeom, woodMat);
  left_wall.name = "left_wall";
  left_wall.position.set(-cabinW / 2, wallBottom + wallH / 2, 0);
  root.add(left_wall);

  const right_wall = new THREE.Mesh(side_wallGeom, woodMat);
  right_wall.name = "right_wall";
  right_wall.position.set(cabinW / 2, wallBottom + wallH / 2, 0);
  root.add(right_wall);

  const courseCount = 9;
  const courseSpacing = wallH / courseCount;
  const wall_courseGeom = new THREE.BoxGeometry(cabinW - 0.12, 0.072, 0.075);
  const front_wall_courses = new THREE.InstancedMesh(
    wall_courseGeom, darkWoodMat, courseCount
  );
  front_wall_courses.name = "front_wall_courses";
  const rear_wall_courses = new THREE.InstancedMesh(
    wall_courseGeom, darkWoodMat, courseCount
  );
  rear_wall_courses.name = "rear_wall_courses";

  const dummy = new THREE.Object3D();
  for (let i = 0; i < courseCount; i++) {
    const y = wallBottom + (i + 0.5) * courseSpacing;
    dummy.position.set(0, y, frontZ + 0.086);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_wall_courses.setMatrixAt(i, dummy.matrix);

    dummy.position.set(0, y, -frontZ - 0.086);
    dummy.updateMatrix();
    rear_wall_courses.setMatrixAt(i, dummy.matrix);
  }
  front_wall_courses.instanceMatrix.needsUpdate = true;
  rear_wall_courses.instanceMatrix.needsUpdate = true;
  root.add(front_wall_courses, rear_wall_courses);

  const side_courseGeom = new THREE.BoxGeometry(0.075, 0.072, cabinD - 0.12);
  const side_wall_courses = new THREE.InstancedMesh(
    side_courseGeom, darkWoodMat, courseCount * 2
  );
  side_wall_courses.name = "side_wall_courses";
  let sideCourseIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < courseCount; i++) {
      dummy.position.set(
        side * (cabinW / 2 + 0.086),
        wallBottom + (i + 0.5) * courseSpacing,
        0
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_wall_courses.setMatrixAt(sideCourseIndex++, dummy.matrix);
    }
  }
  side_wall_courses.instanceMatrix.needsUpdate = true;
  root.add(side_wall_courses);

  const corner_postGeom = new THREE.BoxGeometry(0.18, wallH + 0.08, 0.18);
  const corner_posts = new THREE.InstancedMesh(corner_postGeom, darkWoodMat, 4);
  corner_posts.name = "corner_posts";
  const cornerPositions = [
    [-cabinW / 2 - 0.02, wallBottom + wallH / 2, frontZ + 0.02],
    [cabinW / 2 + 0.02, wallBottom + wallH / 2, frontZ + 0.02],
    [-cabinW / 2 - 0.02, wallBottom + wallH / 2, -frontZ - 0.02],
    [cabinW / 2 + 0.02, wallBottom + wallH / 2, -frontZ - 0.02]
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    const p = cornerPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    corner_posts.setMatrixAt(i, dummy.matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  root.add(corner_posts);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-cabinD / 2, 0);
  gableShape.lineTo(cabinD / 2, 0);
  gableShape.lineTo(0, ridgeY - wallTop);
  gableShape.lineTo(-cabinD / 2, 0);

  const gableGeom = new THREE.ExtrudeGeometry(gableShape, {
    depth: 0.1,
    steps: 1,
    bevelEnabled: false
  });
  gableGeom.translate(0, 0, -0.05);

  const left_gable = new THREE.Mesh(gableGeom, woodMat);
  left_gable.name = "left_gable";
  left_gable.rotation.y = Math.PI / 2;
  left_gable.position.set(-cabinW / 2, wallTop, 0);
  root.add(left_gable);

  const right_gable = new THREE.Mesh(gableGeom, woodMat);
  right_gable.name = "right_gable";
  right_gable.rotation.y = Math.PI / 2;
  right_gable.position.set(cabinW / 2, wallTop, 0);
  root.add(right_gable);

  const gableCourseGeom = new THREE.BoxGeometry(0.075, 0.06, 1);
  const gable_courses = new THREE.InstancedMesh(gableCourseGeom, darkWoodMat, 14);
  gable_courses.name = "gable_courses";
  let gableCourseIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const t = (i + 0.5) / 7;
      const widthAtT = cabinD * (1 - t);
      dummy.position.set(
        side * (cabinW / 2 + 0.067),
        wallTop + t * roofRise,
        0
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, widthAtT);
      dummy.updateMatrix();
      gable_courses.setMatrixAt(gableCourseIndex++, dummy.matrix);
    }
  }
  gable_courses.instanceMatrix.needsUpdate = true;
  root.add(gable_courses);

  const left_gable_front_trim = makeBeamBetween(
    "left_gable_front_trim",
    new THREE.Vector3(-cabinW / 2 - 0.1, wallTop, frontZ / 2),
    new THREE.Vector3(-cabinW / 2 - 0.1, ridgeY, 0),
    0.105,
    darkWoodMat
  );
  const left_gable_rear_trim = makeBeamBetween(
    "left_gable_rear_trim",
    new THREE.Vector3(-cabinW / 2 - 0.1, ridgeY, 0),
    new THREE.Vector3(-cabinW / 2 - 0.1, wallTop, -frontZ / 2),
    0.105,
    darkWoodMat
  );
  const right_gable_front_trim = makeBeamBetween(
    "right_gable_front_trim",
    new THREE.Vector3(cabinW / 2 + 0.1, wallTop, frontZ / 2),
    new THREE.Vector3(cabinW / 2 + 0.1, ridgeY, 0),
    0.105,
    darkWoodMat
  );
  const right_gable_rear_trim = makeBeamBetween(
    "right_gable_rear_trim",
    new THREE.Vector3(cabinW / 2 + 0.1, ridgeY, 0),
    new THREE.Vector3(cabinW / 2 + 0.1, wallTop, -frontZ / 2),
    0.105,
    darkWoodMat
  );

  const roof_panelGeom = new THREE.BoxGeometry(roofW, 0.11, roofSlope);
  const roof_front_panel = new THREE.Mesh(roof_panelGeom, thatchMat);
  roof_front_panel.name = "roof_front_panel";
  roof_front_panel.position.set(0, (ridgeY + eaveY) / 2, roofRun / 2);
  roof_front_panel.rotation.x = roofAngle;
  root.add(roof_front_panel);

  const roof_rear_panel = new THREE.Mesh(roof_panelGeom, thatchMat);
  roof_rear_panel.name = "roof_rear_panel";
  roof_rear_panel.position.set(0, (ridgeY + eaveY) / 2, -roofRun / 2);
  roof_rear_panel.rotation.x = -roofAngle;
  root.add(roof_rear_panel);

  const roof_patchGeom = new THREE.BoxGeometry(1, 0.025, 1);
  const roof_thatch_patches = new THREE.InstancedMesh(
    roof_patchGeom, thatchDarkMat, 12
  );
  roof_thatch_patches.name = "roof_thatch_patches";
  let patchIndex = 0;
  for (const side of [1, -1]) {
    for (let i = 0; i < 6; i++) {
      const t = 0.18 + i * 0.14;
      const z = side * t * roofRun;
      const y = ridgeY - t * roofRise + 0.075;
      dummy.position.set(-0.48 + (i % 3) * 0.42, y, z);
      dummy.rotation.set(side * roofAngle, 0, 0);
      dummy.scale.set(0.55 + (i % 2) * 0.25, 1, 0.28 + (i % 3) * 0.08);
      dummy.updateMatrix();
      roof_thatch_patches.setMatrixAt(patchIndex++, dummy.matrix);
    }
  }
  roof_thatch_patches.instanceMatrix.needsUpdate = true;
  root.add(roof_thatch_patches);

  const strawGeom = new THREE.CylinderGeometry(0.007, 0.011, 0.31, 5);
  const strawLightTransforms = [];
  const strawMidTransforms = [];
  const strawDarkTransforms = [];

  function queueStraw(target, x, y, z, rx, ry, rz, sx, sy, sz) {
    target.push({ x, y, z, rx, ry, rz, sx, sy, sz });
  }

  for (const side of [1, -1]) {
    for (let ix = 0; ix < 23; ix++) {
      for (let iz = 0; iz < 15; iz++) {
        const x = -roofW / 2 + 0.1 + ix * ((roofW - 0.2) / 22) +
          Math.sin((ix + 1) * (iz + 2)) * 0.025;
        const t = 0.06 + iz * 0.065;
        const z = side * t * roofRun;
        const y = ridgeY - t * roofRise + 0.07;
        const variation = ((ix * 7 + iz * 3) % 5 - 2) * 0.018;
        const target = (ix + iz * 2) % 3 === 0
          ? strawLightTransforms
          : (ix + iz) % 3 === 0
            ? strawDarkTransforms
            : strawMidTransforms;
        queueStraw(
          target,
          x, y, z,
          side * roofAngle + variation,
          0,
          Math.sin(ix * 2 + iz) * 0.06,
          1,
          0.82 + ((ix + iz) % 4) * 0.08,
          1
        );
      }
    }
  }

  for (const side of [-1, 1]) {
    for (let ix = 0; ix < 22; ix++) {
      for (let iy = 0; iy < 5; iy++) {
        const x = -roofW / 2 + 0.09 + ix * ((roofW - 0.18) / 21);
        const y = eaveY - 0.02 + (iy - 2) * 0.045 +
          Math.sin(ix + iy) * 0.018;
        const z = side * (roofRun + 0.035);
        const target = (ix + iy) % 3 === 0
          ? strawLightTransforms
          : (ix - iy + 12) % 3 === 0
            ? strawDarkTransforms
            : strawMidTransforms;
        queueStraw(
          target,
          x, y, z,
          Math.PI / 2 + Math.sin(ix * 0.7 + iy) * 0.12,
          0,
          Math.sin(ix + iy * 2) * 0.08,
          1,
          0.72 + ((ix + iy) % 4) * 0.09,
          1
        );
      }
    }
  }

  for (const side of [-1, 1]) {
    for (let iz = 0; iz < 13; iz++) {
      for (let iy = 0; iy < 6; iy++) {
        const t = 0.07 + iz * 0.069;
        const z = t * roofRun;
        const y = ridgeY - t * roofRise + 0.055;
        const x = side * (roofW / 2 + 0.025);
        const target = (iz + iy) % 3 === 0
          ? strawMidTransforms
          : (iz - iy + 16) % 3 === 0
            ? strawLightTransforms
            : strawDarkTransforms;
        queueStraw(
          target,
          x, y, z,
          Math.atan2(roofRise, roofW / 2) +
            Math.sin(iz + iy) * 0.1,
          0,
          side * 0.08,
          1,
          0.78 + ((iz + iy) % 4) * 0.08,
          1
        );
      }
    }
  }

  function createStrawInstances(name, transforms, mat) {
    const mesh = new THREE.InstancedMesh(strawGeom, mat, transforms.length);
    mesh.name = name;
    for (let i = 0; i < transforms.length; i++) {
      const t = transforms[i];
      dummy.position.set(t.x, t.y, t.z);
      dummy.rotation.set(t.rx, t.ry, t.rz);
      dummy.scale.set(t.sx, t.sy, t.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    root.add(mesh);
    return mesh;
  }

  const roof_straw_light = createStrawInstances(
    "roof_straw_light", strawLightTransforms, thatchLightMat
  );
  const roof_straw_mid = createStrawInstances(
    "roof_straw_mid", strawMidTransforms, thatchMat
  );
  const roof_straw_dark = createStrawInstances(
    "roof_straw_dark", strawDarkTransforms, thatchDarkMat
  );

  const ridge_rollGeom = new THREE.CylinderGeometry(0.15, 0.15, roofW + 0.08, 12);
  const ridge_roll = new THREE.Mesh(ridge_rollGeom, thatchEdgeMat);
  ridge_roll.name = "ridge_roll";
  ridge_roll.rotation.z = Math.PI / 2;
  ridge_roll.position.set(0, ridgeY + 0.06, 0);
  root.add(ridge_roll);

  const ridge_bindingGeom = new THREE.TorusGeometry(0.15, 0.018, 6, 14);
  const ridge_bindings = new THREE.InstancedMesh(
    ridge_bindingGeom, thatchDarkMat, 7
  );
  ridge_bindings.name = "ridge_bindings";
  for (let i = 0; i < 7; i++) {
    dummy.position.set(-roofW / 2 + 0.28 + i * ((roofW - 0.56) / 6), ridgeY + 0.06, 0);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    ridge_bindings.setMatrixAt(i, dummy.matrix);
  }
  ridge_bindings.instanceMatrix.needsUpdate = true;
  root.add(ridge_bindings);

  const eave_bindingGeom = new THREE.CylinderGeometry(0.045, 0.045, roofW, 8);
  const front_eave_binding = new THREE.Mesh(eave_bindingGeom, thatchEdgeMat);
  front_eave_binding.name = "front_eave_binding";
  front_eave_binding.rotation.z = Math.PI / 2;
  front_eave_binding.position.set(0, eaveY - 0.02, roofRun + 0.035);
  root.add(front_eave_binding);

  const rear_eave_binding = new THREE.Mesh(eave_bindingGeom, thatchEdgeMat);
  rear_eave_binding.name = "rear_eave_binding";
  rear_eave_binding.rotation.z = Math.PI / 2;
  rear_eave_binding.position.set(0, eaveY - 0.02, -roofRun - 0.035);
  root.add(rear_eave_binding);

  const roof_edgeGeom = new THREE.CylinderGeometry(0.055, 0.055, roofSlope, 8);
  const roof_edge_bundles = new THREE.InstancedMesh(
    roof_edgeGeom, thatchEdgeMat, 4
  );
  roof_edge_bundles.name = "roof_edge_bundles";
  let edgeIndex = 0;
  for (const xSide of [-1, 1]) {
    for (const zSide of [-1, 1]) {
      const p1 = new THREE.Vector3(xSide * roofW / 2, ridgeY, 0);
      const p2 = new THREE.Vector3(
        xSide * roofW / 2,
        eaveY,
        zSide * roofRun
      );
      const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
      dummy.position.copy(p1).add(p2).multiplyScalar(0.5);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      roof_edge_bundles.setMatrixAt(edgeIndex++, dummy.matrix);
    }
  }
  roof_edge_bundles.instanceMatrix.needsUpdate = true;
  root.add(roof_edge_bundles);

  const chimney_stackGeom = new THREE.BoxGeometry(0.42, 0.72, 0.38);
  const chimney_stack = new THREE.Mesh(chimney_stackGeom, brickMat);
  chimney_stack.name = "chimney_stack";
  chimney_stack.position.set(0.98, 3.25, -0.56);
  root.add(chimney_stack);

  const chimney_cap = addBox(
    "chimney_cap", 0.5, 0.12, 0.46, brickMat,
    0.98, 3.66, -0.56
  );
  const chimney_opening = addBox(
    "chimney_opening", 0.31, 0.025, 0.25, mortarMat,
    0.98, 3.73, -0.56
  );

  const chimney_mortar_lines = new THREE.Group();
  chimney_mortar_lines.name = "chimney_mortar_lines";
  for (let i = 0; i < 4; i++) {
    const mortar_line = new THREE.Mesh(
      new THREE.BoxGeometry(0.43, 0.025, 0.39),
      mortarMat
    );
    mortar_line.position.set(0.98, 3.0 + i * 0.17, -0.56);
    chimney_mortar_lines.add(mortar_line);
  }
  root.add(chimney_mortar_lines);

  const doorGeom = new THREE.BoxGeometry(0.66, 1.4, 0.08);
  const front_door = new THREE.Mesh(doorGeom, lightWoodMat);
  front_door.name = "front_door";
  front_door.position.set(0.52, wallBottom + 0.04 + 0.7, frontZ + 0.105);
  root.add(front_door);

  const door_left_frame = addBox(
    "door_left_frame", 0.11, 1.54, 0.12, darkWoodMat,
    0.13, 0.82, frontZ + 0.145
  );
  const door_right_frame = addBox(
    "door_right_frame", 0.11, 1.54, 0.12, darkWoodMat,
    0.91, 0.82, frontZ + 0.145
  );
  const door_top_frame = addBox(
    "door_top_frame", 0.89, 0.11, 0.12, darkWoodMat,
    0.52, 1.59, frontZ + 0.145
  );

  const door_upper_glass = addBox(
    "door_upper_glass", 0.39, 0.34, 0.025, glassMat,
    0.52, 1.27, frontZ + 0.155
  );
  const door_window_left = addBox(
    "door_window_left", 0.045, 0.39, 0.045, darkWoodMat,
    0.315, 1.27, frontZ + 0.175
  );
  const door_window_right = addBox(
    "door_window_right", 0.045, 0.39, 0.045, darkWoodMat,
    0.725, 1.27, frontZ + 0.175
  );
  const door_window_crossbar = addBox(
    "door_window_crossbar", 0.45, 0.045, 0.045, darkWoodMat,
    0.52, 1.27, frontZ + 0.175
  );

  const door_panel_positions = [
    [0.36, 0.43], [0.68, 0.43],
    [0.36, 0.73], [0.68, 0.73],
    [0.36, 1.02], [0.68, 1.02]
  ];
  const door_panelGeom = new THREE.BoxGeometry(0.22, 0.23, 0.025);
  const door_panels = new THREE.InstancedMesh(
    door_panelGeom, darkWoodMat, door_panel_positions.length
  );
  door_panels.name = "door_panels";
  const door_panel_insets = new THREE.InstancedMesh(
    door_panelGeom, woodMat, door_panel_positions.length
  );
  door_panel_insets.name = "door_panel_insets";
  for (let i = 0; i < door_panel_positions.length; i++) {
    const p = door_panel_positions[i];
    dummy.position.set(p[0], p[1], frontZ + 0.157);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    door_panels.setMatrixAt(i, dummy.matrix);

    dummy.position.set(p[0], p[1], frontZ + 0.177);
    dummy.scale.set(0.72, 0.68, 1);
    dummy.updateMatrix();
    door_panel_insets.setMatrixAt(i, dummy.matrix);
  }
  door_panels.instanceMatrix.needsUpdate = true;
  door_panel_insets.instanceMatrix.needsUpdate = true;
  root.add(door_panels, door_panel_insets);

  const door_handle_plate = addBox(
    "door_handle_plate", 0.065, 0.13, 0.035, metalMat,
    0.79, 0.82, frontZ + 0.205
  );
  const door_handleGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.07, 12);
  const door_handle = new THREE.Mesh(door_handleGeom, brassMat);
  door_handle.name = "door_handle";
  door_handle.rotation.x = Math.PI / 2;
  door_handle.position.set(0.79, 0.82, frontZ + 0.245);
  root.add(door_handle);

  const doorstepGeom = new THREE.BoxGeometry(0.98, 0.22, 0.56);
  const doorstep = new THREE.Mesh(doorstepGeom, stoneMat);
  doorstep.name = "doorstep";
  doorstep.position.set(0.52, 0.19, frontZ + 0.38);
  root.add(doorstep);

  const doorstep_top = addBox(
    "doorstep_top", 0.9, 0.045, 0.49, stoneMat,
    0.52, 0.32, frontZ + 0.38
  );

  const front_window = createWindow(
    "front_window", 0.64, 0.72, -1.08, 1.02, frontZ + 0.105, 0
  );

  const left_side_window = createWindow(
    "left_side_window", 0.62, 0.72,
    -cabinW / 2 - 0.105, 1.03, 0.38, -Math.PI / 2
  );
  const right_side_window = createWindow(
    "right_side_window", 0.62, 0.72,
    cabinW / 2 + 0.105, 1.03, 0.38, Math.PI / 2
  );

  const left_attic_window = createWindow(
    "left_attic_window", 0.5, 0.56,
    -cabinW / 2 - 0.105, 2.36, 0, -Math.PI / 2
  );
  const right_attic_window = createWindow(
    "right_attic_window", 0.5, 0.56,
    cabinW / 2 + 0.105, 2.36, 0, Math.PI / 2
  );

  const wall_lantern = new THREE.Group();
  wall_lantern.name = "wall_lantern";
  wall_lantern.position.set(0.02, 1.35, frontZ + 0.16);

  const lantern_mount = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.18, 0.06),
    darkWoodMat
  );
  lantern_mount.name = "lantern_mount";
  lantern_mount.position.set(0, 0.02, -0.035);
  wall_lantern.add(lantern_mount);

  const lantern_arm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.18, 8),
    metalMat
  );
  lantern_arm.name = "lantern_arm";
  lantern_arm.rotation.x = Math.PI / 2;
  lantern_arm.position.set(0, 0.12, 0.06);
  wall_lantern.add(lantern_arm);

  const lantern_globe = new THREE.Mesh(
    new THREE.SphereGeometry(0.105, 16, 10),
    lampMat
  );
  lantern_globe.name = "lantern_globe";
  lantern_globe.scale.set(0.85, 1.12, 0.85);
  lantern_globe.position.set(0, -0.01, 0.17);
  wall_lantern.add(lantern_globe);

  const lantern_top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.115, 0.07, 12),
    metalMat
  );
  lantern_top.name = "lantern_top";
  lantern_top.position.set(0, 0.115, 0.17);
  wall_lantern.add(lantern_top);

  const lantern_bottom = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.065, 0.055, 12),
    metalMat
  );
  lantern_bottom.name = "lantern_bottom";
  lantern_bottom.position.set(0, -0.13, 0.17);
  wall_lantern.add(lantern_bottom);

  root.add(wall_lantern);

  const moss_clumpGeom = new THREE.IcosahedronGeometry(0.09, 1);
  const moss_clumps = new THREE.InstancedMesh(moss_clumpGeom, mossLightMat, 32);
  moss_clumps.name = "moss_clumps";
  for (let i = 0; i < 32; i++) {
    let x;
    let z;
    if (i < 12) {
      x = -2.0 + (i % 6) * 0.78;
      z = 1.56 + Math.sin(i * 1.7) * 0.08;
    } else if (i < 20) {
      x = -2.02 + Math.sin((i - 12) * 1.3) * 0.08;
      z = -1.35 + (i - 12) * 0.38;
    } else {
      x = 2.02 + Math.sin((i - 20) * 1.4) * 0.08;
      z = -1.35 + (i - 20) * 0.38;
    }
    dummy.position.set(x, 0.17, z);
    dummy.rotation.set(0, i * 0.73, 0);
    dummy.scale.set(
      0.75 + (i % 3) * 0.22,
      0.35 + (i % 2) * 0.16,
      0.7 + ((i + 1) % 3) * 0.18
    );
    dummy.updateMatrix();
    moss_clumps.setMatrixAt(i, dummy.matrix);
  }
  moss_clumps.instanceMatrix.needsUpdate = true;
  root.add(moss_clumps);

  const front_left_boulderGeom = new THREE.DodecahedronGeometry(0.18, 0);
  const front_left_boulder = new THREE.Mesh(front_left_boulderGeom, stoneMat);
  front_left_boulder.name = "front_left_boulder";
  front_left_boulder.position.set(-1.28, 0.22, 1.62);
  front_left_boulder.rotation.set(0.25, 0.4, 0.1);
  front_left_boulder.scale.set(1.25, 0.75, 0.9);
  root.add(front_left_boulder);

  const front_center_stoneGeom = new THREE.DodecahedronGeometry(0.12, 0);
  const front_center_stone = new THREE.Mesh(front_center_stoneGeom, stoneMat);
  front_center_stone.name = "front_center_stone";
  front_center_stone.position.set(-0.18, 0.19, 1.67);
  front_center_stone.rotation.set(0.1, 0.7, 0.2);
  front_center_stone.scale.set(1.2, 0.65, 0.8);
  root.add(front_center_stone);

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
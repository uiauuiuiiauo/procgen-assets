export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_compass_key";

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb99752,
    metalness: 0.6,
    roughness: 0.32,
  });
  const polishedBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd1b66f,
    metalness: 0.6,
    roughness: 0.22,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x765b2d,
    metalness: 0.5,
    roughness: 0.45,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x49391f,
    metalness: 0.35,
    roughness: 0.6,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const medallion = new THREE.Group();
  medallion.name = "medallion";
  root.add(medallion);

  const case_bodyGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.16, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, brassMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  medallion.add(case_body);

  const front_plateGeom = new THREE.CylinderGeometry(0.91, 0.91, 0.035, 64);
  const front_plate = new THREE.Mesh(front_plateGeom, brassMat);
  front_plate.name = "front_plate";
  front_plate.rotation.x = Math.PI / 2;
  front_plate.position.z = 0.083;
  medallion.add(front_plate);

  const outer_rimGeom = new THREE.TorusGeometry(0.945, 0.055, 14, 64);
  const outer_rim = new THREE.Mesh(outer_rimGeom, polishedBrassMat);
  outer_rim.name = "outer_rim";
  outer_rim.position.z = 0.105;
  medallion.add(outer_rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.835, 0.014, 10, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, polishedBrassMat);
  inner_rim.name = "inner_rim";
  inner_rim.position.z = 0.116;
  medallion.add(inner_rim);

  const case_seamGeom = new THREE.TorusGeometry(0.974, 0.012, 8, 64);
  const case_seam = new THREE.Mesh(case_seamGeom, darkBrassMat);
  case_seam.name = "case_seam";
  case_seam.position.z = -0.045;
  medallion.add(case_seam);

  const engraved_borderGeom = new THREE.TorusGeometry(0.765, 0.006, 6, 64);
  const engraved_border = new THREE.Mesh(engraved_borderGeom, engravingMat);
  engraved_border.name = "engraved_border";
  engraved_border.position.z = 0.108;
  medallion.add(engraved_border);

  const flower = new THREE.Group();
  flower.name = "engraved_flower";
  medallion.add(flower);

  const petalCount = 12;
  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0.11);
  petalShape.bezierCurveTo(-0.025, 0.17, -0.105, 0.29, -0.11, 0.39);
  petalShape.bezierCurveTo(-0.105, 0.48, -0.04, 0.57, 0, 0.65);
  petalShape.bezierCurveTo(0.04, 0.57, 0.105, 0.48, 0.11, 0.39);
  petalShape.bezierCurveTo(0.105, 0.29, 0.025, 0.17, 0, 0.11);

  const petalGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });

  const flower_petals = new THREE.InstancedMesh(
    petalGeom,
    darkBrassMat,
    petalCount
  );
  flower_petals.name = "flower_petals";

  const petal_inlays = new THREE.InstancedMesh(
    petalGeom,
    brassMat,
    petalCount
  );
  petal_inlays.name = "petal_inlays";

  const petal_veinGeom = new THREE.BoxGeometry(0.012, 0.34, 0.006);
  const petal_veins = new THREE.InstancedMesh(
    petal_veinGeom,
    engravingMat,
    petalCount
  );
  petal_veins.name = "petal_veins";

  const petal_side_veinGeom = new THREE.BoxGeometry(0.007, 0.15, 0.006);
  const petal_side_veins = new THREE.InstancedMesh(
    petal_side_veinGeom,
    engravingMat,
    petalCount * 4
  );
  petal_side_veins.name = "petal_side_veins";

  const petalTransform = new THREE.Object3D();
  let sideVeinIndex = 0;

  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;

    petalTransform.position.set(0, 0, 0.105);
    petalTransform.rotation.set(0, 0, angle);
    petalTransform.scale.set(1, 1, 1);
    petalTransform.updateMatrix();
    flower_petals.setMatrixAt(i, petalTransform.matrix);

    petalTransform.position.set(0, 0, 0.119);
    petalTransform.rotation.set(0, 0, angle);
    petalTransform.scale.set(0.78, 0.91, 0.55);
    petalTransform.updateMatrix();
    petal_inlays.setMatrixAt(i, petalTransform.matrix);

    petalTransform.position.set(
      -Math.sin(angle) * 0.39,
      Math.cos(angle) * 0.39,
      0.139
    );
    petalTransform.rotation.set(0, 0, angle);
    petalTransform.scale.set(1, 1, 1);
    petalTransform.updateMatrix();
    petal_veins.setMatrixAt(i, petalTransform.matrix);

    for (let level = 0; level < 2; level++) {
      const radius = 0.34 + level * 0.13;
      for (const side of [-1, 1]) {
        const localX = side * (0.035 + level * 0.012);
        const localY = radius;
        const x = -Math.sin(angle) * localY + Math.cos(angle) * localX;
        const y = Math.cos(angle) * localY + Math.sin(angle) * localX;

        petalTransform.position.set(x, y, 0.14);
        petalTransform.rotation.set(
          0,
          0,
          angle - side * (0.74 - level * 0.08)
        );
        petalTransform.scale.set(1, 1, 1);
        petalTransform.updateMatrix();
        petal_side_veins.setMatrixAt(sideVeinIndex, petalTransform.matrix);
        sideVeinIndex++;
      }
    }
  }

  flower_petals.instanceMatrix.needsUpdate = true;
  petal_inlays.instanceMatrix.needsUpdate = true;
  petal_veins.instanceMatrix.needsUpdate = true;
  petal_side_veins.instanceMatrix.needsUpdate = true;
  flower.add(flower_petals, petal_inlays, petal_veins, petal_side_veins);

  const needle_assembly = new THREE.Group();
  needle_assembly.name = "needle_assembly";
  medallion.add(needle_assembly);

  const left_needleShape = new THREE.Shape();
  left_needleShape.moveTo(-0.025, 0.1);
  left_needleShape.lineTo(-1.34, -0.018);
  left_needleShape.lineTo(-1.43, -0.055);
  left_needleShape.lineTo(-1.34, -0.082);
  left_needleShape.lineTo(-0.025, -0.1);
  left_needleShape.closePath();

  const left_needleGeom = new THREE.ExtrudeGeometry(left_needleShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.009,
    bevelSegments: 3,
  });
  const left_needle = new THREE.Mesh(left_needleGeom, polishedBrassMat);
  left_needle.name = "left_needle";
  left_needle.position.z = 0.145;
  left_needle.rotation.z = 0.6;
  needle_assembly.add(left_needle);

  const right_needleShape = new THREE.Shape();
  right_needleShape.moveTo(0.025, 0.11);
  right_needleShape.lineTo(1.24, 0.065);
  right_needleShape.bezierCurveTo(1.31, 0.06, 1.35, 0.02, 1.35, -0.025);
  right_needleShape.bezierCurveTo(1.35, -0.075, 1.31, -0.11, 1.24, -0.115);
  right_needleShape.lineTo(0.025, -0.11);
  right_needleShape.closePath();

  const right_needleGeom = new THREE.ExtrudeGeometry(right_needleShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.009,
    bevelSegments: 3,
  });
  const right_needle = new THREE.Mesh(right_needleGeom, polishedBrassMat);
  right_needle.name = "right_needle";
  right_needle.position.z = 0.145;
  right_needle.rotation.z = -0.68;
  needle_assembly.add(right_needle);

  const pivot_baseGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.075, 32);
  const pivot_base = new THREE.Mesh(pivot_baseGeom, darkBrassMat);
  pivot_base.name = "pivot_base";
  pivot_base.rotation.x = Math.PI / 2;
  pivot_base.position.z = 0.16;
  needle_assembly.add(pivot_base);

  const pivot_capGeom = new THREE.CylinderGeometry(0.155, 0.17, 0.065, 32);
  const pivot_cap = new THREE.Mesh(pivot_capGeom, polishedBrassMat);
  pivot_cap.name = "pivot_cap";
  pivot_cap.rotation.x = Math.PI / 2;
  pivot_cap.position.z = 0.215;
  needle_assembly.add(pivot_cap);

  const pivot_screwGeom = new THREE.SphereGeometry(0.075, 24, 12);
  const pivot_screw = new THREE.Mesh(pivot_screwGeom, silverMat);
  pivot_screw.name = "pivot_screw";
  pivot_screw.scale.set(1, 1, 0.45);
  pivot_screw.position.z = 0.275;
  needle_assembly.add(pivot_screw);

  const loop_assembly = new THREE.Group();
  loop_assembly.name = "loop_assembly";
  root.add(loop_assembly);

  const loop_socketGeom = new THREE.CylinderGeometry(0.105, 0.145, 0.28, 32);
  const loop_socket = new THREE.Mesh(loop_socketGeom, brassMat);
  loop_socket.name = "loop_socket";
  loop_socket.position.set(0, 1.075, 0);
  loop_assembly.add(loop_socket);

  const lower_collarGeom = new THREE.TorusGeometry(0.14, 0.024, 10, 32);
  const lower_collar = new THREE.Mesh(lower_collarGeom, polishedBrassMat);
  lower_collar.name = "lower_collar";
  lower_collar.rotation.x = Math.PI / 2;
  lower_collar.position.set(0, 1.16, 0);
  loop_assembly.add(lower_collar);

  const knurled_collarGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.17, 32);
  const knurled_collar = new THREE.Mesh(knurled_collarGeom, brassMat);
  knurled_collar.name = "knurled_collar";
  knurled_collar.position.set(0, 1.27, 0);
  loop_assembly.add(knurled_collar);

  const knurled_ridgeGeom = new THREE.BoxGeometry(0.018, 0.145, 0.026);
  const knurled_ridges = new THREE.InstancedMesh(
    knurled_ridgeGeom,
    polishedBrassMat,
    24
  );
  knurled_ridges.name = "knurled_ridges";

  const ridgeTransform = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    ridgeTransform.position.set(
      Math.cos(angle) * 0.184,
      1.27,
      Math.sin(angle) * 0.184
    );
    ridgeTransform.rotation.set(0, Math.PI / 2 - angle, 0);
    ridgeTransform.scale.set(1, 1, 1);
    ridgeTransform.updateMatrix();
    knurled_ridges.setMatrixAt(i, ridgeTransform.matrix);
  }
  knurled_ridges.instanceMatrix.needsUpdate = true;
  loop_assembly.add(knurled_ridges);

  const upper_collarGeom = new THREE.TorusGeometry(0.16, 0.023, 10, 32);
  const upper_collar = new THREE.Mesh(upper_collarGeom, polishedBrassMat);
  upper_collar.name = "upper_collar";
  upper_collar.rotation.x = Math.PI / 2;
  upper_collar.position.set(0, 1.37, 0);
  loop_assembly.add(upper_collar);

  const connector_bulbGeom = new THREE.SphereGeometry(0.145, 32, 16);
  const connector_bulb = new THREE.Mesh(connector_bulbGeom, polishedBrassMat);
  connector_bulb.name = "connector_bulb";
  connector_bulb.scale.set(0.95, 1.1, 0.9);
  connector_bulb.position.set(0, 1.49, 0);
  loop_assembly.add(connector_bulb);

  const hanging_loopGeom = new THREE.TorusGeometry(0.31, 0.055, 14, 64);
  const hanging_loop = new THREE.Mesh(hanging_loopGeom, polishedBrassMat);
  hanging_loop.name = "hanging_loop";
  hanging_loop.position.set(0, 1.83, 0);
  loop_assembly.add(hanging_loop);

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
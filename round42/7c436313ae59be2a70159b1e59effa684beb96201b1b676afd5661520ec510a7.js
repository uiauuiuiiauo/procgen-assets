export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "lemonade_kiosk";

  const cabinet_group = new THREE.Group();
  cabinet_group.name = "cabinet_group";
  root.add(cabinet_group);

  const countertop_group = new THREE.Group();
  countertop_group.name = "countertop_group";
  root.add(countertop_group);

  const canopy_group = new THREE.Group();
  canopy_group.name = "canopy_group";
  root.add(canopy_group);

  const lemon_display_group = new THREE.Group();
  lemon_display_group.name = "lemon_display_group";
  root.add(lemon_display_group);

  const cabinet_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffd91a,
    metalness: 0.0,
    roughness: 0.3
  });
  const cabinet_front_panelMat = new THREE.MeshStandardMaterial({
    color: 0xffe329,
    metalness: 0.0,
    roughness: 0.3
  });
  const cabinet_side_panelMat = new THREE.MeshStandardMaterial({
    color: 0xffdf18,
    metalness: 0.0,
    roughness: 0.3
  });
  const cabinet_trimMat = new THREE.MeshStandardMaterial({
    color: 0xe9b900,
    metalness: 0.0,
    roughness: 0.3
  });
  const countertopMat = new THREE.MeshStandardMaterial({
    color: 0xf23b49,
    metalness: 0.0,
    roughness: 0.3
  });
  const countertop_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xe62e3e,
    metalness: 0.0,
    roughness: 0.3
  });
  const serving_wellMat = new THREE.MeshStandardMaterial({
    color: 0x9f1020,
    metalness: 0.0,
    roughness: 0.8
  });
  const support_postsMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1e9,
    metalness: 0.0,
    roughness: 0.3
  });
  const canopy_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffd900,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const canopy_whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf8f8f2,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const canopy_limeMat = new THREE.MeshStandardMaterial({
    color: 0xd4ed57,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const canopy_pale_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffec79,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const rubber_feetMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.8
  });
  const lemon_rindMat = new THREE.MeshStandardMaterial({
    color: 0xffc400,
    metalness: 0.0,
    roughness: 0.55
  });
  const lemon_fleshMat = new THREE.MeshStandardMaterial({
    color: 0xffe77a,
    metalness: 0.0,
    roughness: 0.65
  });
  const lemon_membraneMat = new THREE.MeshStandardMaterial({
    color: 0xfff4bd,
    metalness: 0.0,
    roughness: 0.75
  });
  const green_strawMat = new THREE.MeshStandardMaterial({
    color: 0x68b820,
    metalness: 0.0,
    roughness: 0.8
  });
  const orange_strawMat = new THREE.MeshStandardMaterial({
    color: 0xd97913,
    metalness: 0.0,
    roughness: 0.8
  });
  const blue_strawMat = new THREE.MeshStandardMaterial({
    color: 0x168bd0,
    metalness: 0.0,
    roughness: 0.8
  });

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const halfW = width * 0.5;
    const halfH = height * 0.5;
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
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 8
    });
    geometry.translate(0, 0, -depth * 0.5);
    return geometry;
  }

  function makeScallopedGeometry(width, drop, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(-width * 0.5, 0.035);
    shape.lineTo(width * 0.5, 0.035);
    shape.lineTo(width * 0.5, -drop * 0.56);
    shape.bezierCurveTo(
      width * 0.5,
      -drop * 0.86,
      width * 0.28,
      -drop,
      0,
      -drop
    );
    shape.bezierCurveTo(
      -width * 0.28,
      -drop,
      -width * 0.5,
      -drop * 0.86,
      -width * 0.5,
      -drop * 0.56
    );
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
      curveSegments: 10
    });
    geometry.translate(0, 0, -depth * 0.5);
    return geometry;
  }

  function makeRodBetween(start, end, radius, material, segments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  const cabinet_bodyGeom = roundedBoxGeometry(
    1.94,
    0.98,
    1.54,
    0.055,
    0.025
  );
  const cabinet_body = new THREE.Mesh(cabinet_bodyGeom, cabinet_bodyMat);
  cabinet_body.name = "cabinet_body";
  cabinet_body.position.set(0, 0.53, 0);
  cabinet_group.add(cabinet_body);

  const cabinet_front_panelGeom = new THREE.BoxGeometry(1.78, 0.84, 0.018);
  const cabinet_front_panel = new THREE.Mesh(
    cabinet_front_panelGeom,
    cabinet_front_panelMat
  );
  cabinet_front_panel.name = "cabinet_front_panel";
  cabinet_front_panel.position.set(0, 0.54, 0.802);
  cabinet_group.add(cabinet_front_panel);

  const cabinet_side_panelGeom = new THREE.BoxGeometry(0.018, 0.84, 1.36);
  const cabinet_left_panel = new THREE.Mesh(
    cabinet_side_panelGeom,
    cabinet_side_panelMat
  );
  cabinet_left_panel.name = "cabinet_left_panel";
  cabinet_left_panel.position.set(-0.997, 0.54, 0);
  cabinet_group.add(cabinet_left_panel);

  const cabinet_right_panel = new THREE.Mesh(
    cabinet_side_panelGeom,
    cabinet_side_panelMat
  );
  cabinet_right_panel.name = "cabinet_right_panel";
  cabinet_right_panel.position.set(0.997, 0.54, 0);
  cabinet_group.add(cabinet_right_panel);

  const cabinet_corner_trimsGeom = new THREE.BoxGeometry(0.055, 0.91, 0.055);
  const cabinet_corner_trims = new THREE.InstancedMesh(
    cabinet_corner_trimsGeom,
    cabinet_trimMat,
    4
  );
  cabinet_corner_trims.name = "cabinet_corner_trims";
  const cabinet_corner_dummy = new THREE.Object3D();
  const cabinet_corner_positions = [
    [-0.965, 0.53, -0.755],
    [0.965, 0.53, -0.755],
    [-0.965, 0.53, 0.755],
    [0.965, 0.53, 0.755]
  ];
  for (let i = 0; i < cabinet_corner_positions.length; i++) {
    const p = cabinet_corner_positions[i];
    cabinet_corner_dummy.position.set(p[0], p[1], p[2]);
    cabinet_corner_dummy.updateMatrix();
    cabinet_corner_trims.setMatrixAt(i, cabinet_corner_dummy.matrix);
  }
  cabinet_corner_trims.instanceMatrix.needsUpdate = true;
  cabinet_group.add(cabinet_corner_trims);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.055, 0.06, 0.05, 12);
  const rubber_feet = new THREE.InstancedMesh(
    rubber_feetGeom,
    rubber_feetMat,
    4
  );
  rubber_feet.name = "rubber_feet";
  const rubber_feet_dummy = new THREE.Object3D();
  const rubber_feet_positions = [
    [-0.86, 0.015, -0.66],
    [0.86, 0.015, -0.66],
    [-0.86, 0.015, 0.66],
    [0.86, 0.015, 0.66]
  ];
  for (let i = 0; i < rubber_feet_positions.length; i++) {
    const p = rubber_feet_positions[i];
    rubber_feet_dummy.position.set(p[0], p[1], p[2]);
    rubber_feet_dummy.updateMatrix();
    rubber_feet.setMatrixAt(i, rubber_feet_dummy.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  cabinet_group.add(rubber_feet);

  const countertopGeom = roundedBoxGeometry(
    2.14,
    0.12,
    1.76,
    0.055,
    0.018
  );
  const countertop = new THREE.Mesh(countertopGeom, countertopMat);
  countertop.name = "countertop";
  countertop.position.set(0, 1.08, 0);
  countertop_group.add(countertop);

  const countertop_front_edgeGeom = roundedBoxGeometry(
    2.15,
    0.065,
    0.055,
    0.025,
    0.008
  );
  const countertop_front_edge = new THREE.Mesh(
    countertop_front_edgeGeom,
    countertop_edgeMat
  );
  countertop_front_edge.name = "countertop_front_edge";
  countertop_front_edge.position.set(0, 1.045, 0.865);
  countertop_group.add(countertop_front_edge);

  const countertop_side_edgeGeom = roundedBoxGeometry(
    0.055,
    0.065,
    1.69,
    0.022,
    0.007
  );
  const countertop_left_edge = new THREE.Mesh(
    countertop_side_edgeGeom,
    countertop_edgeMat
  );
  countertop_left_edge.name = "countertop_left_edge";
  countertop_left_edge.position.set(-1.045, 1.045, 0);
  countertop_group.add(countertop_left_edge);

  const countertop_right_edge = new THREE.Mesh(
    countertop_side_edgeGeom,
    countertop_edgeMat
  );
  countertop_right_edge.name = "countertop_right_edge";
  countertop_right_edge.position.set(1.045, 1.045, 0);
  countertop_group.add(countertop_right_edge);

  const serving_wellGeom = new THREE.BoxGeometry(1.12, 0.025, 0.62);
  const serving_well = new THREE.Mesh(serving_wellGeom, serving_wellMat);
  serving_well.name = "serving_well";
  serving_well.position.set(-0.19, 1.16, -0.25);
  countertop_group.add(serving_well);

  const well_back_rimGeom = new THREE.BoxGeometry(1.2, 0.055, 0.065);
  const well_back_rim = new THREE.Mesh(well_back_rimGeom, countertopMat);
  well_back_rim.name = "well_back_rim";
  well_back_rim.position.set(-0.19, 1.185, -0.59);
  countertop_group.add(well_back_rim);

  const well_side_rimGeom = new THREE.BoxGeometry(0.065, 0.055, 0.66);
  const well_left_rim = new THREE.Mesh(well_side_rimGeom, countertopMat);
  well_left_rim.name = "well_left_rim";
  well_left_rim.position.set(-0.79, 1.185, -0.25);
  countertop_group.add(well_left_rim);

  const well_right_rim = new THREE.Mesh(well_side_rimGeom, countertopMat);
  well_right_rim.name = "well_right_rim";
  well_right_rim.position.set(0.41, 1.185, -0.25);
  countertop_group.add(well_right_rim);

  const support_postsGeom = new THREE.CylinderGeometry(
    0.043,
    0.047,
    1.54,
    20
  );
  const support_posts = new THREE.InstancedMesh(
    support_postsGeom,
    support_postsMat,
    4
  );
  support_posts.name = "support_posts";
  const support_posts_dummy = new THREE.Object3D();
  const support_posts_positions = [
    [-0.84, 1.93, -0.66],
    [0.84, 1.93, -0.66],
    [-0.84, 1.93, 0.66],
    [0.84, 1.93, 0.66]
  ];
  for (let i = 0; i < support_posts_positions.length; i++) {
    const p = support_posts_positions[i];
    support_posts_dummy.position.set(p[0], p[1], p[2]);
    support_posts_dummy.updateMatrix();
    support_posts.setMatrixAt(i, support_posts_dummy.matrix);
  }
  support_posts.instanceMatrix.needsUpdate = true;
  canopy_group.add(support_posts);

  const post_base_collarsGeom = new THREE.CylinderGeometry(
    0.062,
    0.062,
    0.055,
    20
  );
  const post_base_collars = new THREE.InstancedMesh(
    post_base_collarsGeom,
    support_postsMat,
    4
  );
  post_base_collars.name = "post_base_collars";
  const post_base_collars_dummy = new THREE.Object3D();
  for (let i = 0; i < support_posts_positions.length; i++) {
    const p = support_posts_positions[i];
    post_base_collars_dummy.position.set(p[0], 1.18, p[2]);
    post_base_collars_dummy.updateMatrix();
    post_base_collars.setMatrixAt(i, post_base_collars_dummy.matrix);
  }
  post_base_collars.instanceMatrix.needsUpdate = true;
  canopy_group.add(post_base_collars);

  const canopyW = 2.5;
  const canopyD = 1.94;
  const canopyEdgeY = 2.68;
  const canopyRise = 0.25;
  const canopySlope = canopyRise / (canopyD * 0.5);

  function roofYAt(z) {
    return canopyEdgeY + canopyRise * (1 - Math.abs(z) / (canopyD * 0.5));
  }

  function makeRoofStripGeometry(x0, x1) {
    const vertices = [
      x0, roofYAt(-canopyD * 0.5), -canopyD * 0.5,
      x1, roofYAt(-canopyD * 0.5), -canopyD * 0.5,
      x1, roofYAt(canopyD * 0.5), canopyD * 0.5,
      x0, roofYAt(canopyD * 0.5), canopyD * 0.5
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex([0, 2, 1, 0, 3, 2]);
    geometry.computeVertexNormals();
    return geometry;
  }

  const canopy_stripe_01Geom = makeRoofStripGeometry(-1.25, -1.0417);
  const canopy_stripe_01 = new THREE.Mesh(
    canopy_stripe_01Geom,
    canopy_yellowMat
  );
  canopy_stripe_01.name = "canopy_stripe_01";
  canopy_group.add(canopy_stripe_01);

  const canopy_stripe_02Geom = makeRoofStripGeometry(-1.0417, -0.8333);
  const canopy_stripe_02 = new THREE.Mesh(
    canopy_stripe_02Geom,
    canopy_whiteMat
  );
  canopy_stripe_02.name = "canopy_stripe_02";
  canopy_group.add(canopy_stripe_02);

  const canopy_stripe_03Geom = makeRoofStripGeometry(-0.8333, -0.625);
  const canopy_stripe_03 = new THREE.Mesh(
    canopy_stripe_03Geom,
    canopy_yellowMat
  );
  canopy_stripe_03.name = "canopy_stripe_03";
  canopy_group.add(canopy_stripe_03);

  const canopy_stripe_04Geom = makeRoofStripGeometry(-0.625, -0.4167);
  const canopy_stripe_04 = new THREE.Mesh(
    canopy_stripe_04Geom,
    canopy_whiteMat
  );
  canopy_stripe_04.name = "canopy_stripe_04";
  canopy_group.add(canopy_stripe_04);

  const canopy_stripe_05Geom = makeRoofStripGeometry(-0.4167, -0.2083);
  const canopy_stripe_05 = new THREE.Mesh(
    canopy_stripe_05Geom,
    canopy_limeMat
  );
  canopy_stripe_05.name = "canopy_stripe_05";
  canopy_group.add(canopy_stripe_05);

  const canopy_stripe_06Geom = makeRoofStripGeometry(-0.2083, 0);
  const canopy_stripe_06 = new THREE.Mesh(
    canopy_stripe_06Geom,
    canopy_whiteMat
  );
  canopy_stripe_06.name = "canopy_stripe_06";
  canopy_group.add(canopy_stripe_06);

  const canopy_stripe_07Geom = makeRoofStripGeometry(0, 0.2083);
  const canopy_stripe_07 = new THREE.Mesh(
    canopy_stripe_07Geom,
    canopy_yellowMat
  );
  canopy_stripe_07.name = "canopy_stripe_07";
  canopy_group.add(canopy_stripe_07);

  const canopy_stripe_08Geom = makeRoofStripGeometry(0.2083, 0.4167);
  const canopy_stripe_08 = new THREE.Mesh(
    canopy_stripe_08Geom,
    canopy_whiteMat
  );
  canopy_stripe_08.name = "canopy_stripe_08";
  canopy_group.add(canopy_stripe_08);

  const canopy_stripe_09Geom = makeRoofStripGeometry(0.4167, 0.625);
  const canopy_stripe_09 = new THREE.Mesh(
    canopy_stripe_09Geom,
    canopy_limeMat
  );
  canopy_stripe_09.name = "canopy_stripe_09";
  canopy_group.add(canopy_stripe_09);

  const canopy_stripe_10Geom = makeRoofStripGeometry(0.625, 0.8333);
  const canopy_stripe_10 = new THREE.Mesh(
    canopy_stripe_10Geom,
    canopy_whiteMat
  );
  canopy_stripe_10.name = "canopy_stripe_10";
  canopy_group.add(canopy_stripe_10);

  const canopy_stripe_11Geom = makeRoofStripGeometry(0.8333, 1.0417);
  const canopy_stripe_11 = new THREE.Mesh(
    canopy_stripe_11Geom,
    canopy_yellowMat
  );
  canopy_stripe_11.name = "canopy_stripe_11";
  canopy_group.add(canopy_stripe_11);

  const canopy_stripe_12Geom = makeRoofStripGeometry(1.0417, 1.25);
  const canopy_stripe_12 = new THREE.Mesh(
    canopy_stripe_12Geom,
    canopy_pale_yellowMat
  );
  canopy_stripe_12.name = "canopy_stripe_12";
  canopy_group.add(canopy_stripe_12);

  const frontValanceCount = 12;
  const frontValanceWidth = canopyW / frontValanceCount;
  const canopy_front_valanceGeom = makeScallopedGeometry(
    frontValanceWidth * 0.985,
    0.22,
    0.052
  );

  function populateValance(instanced, colorIndex) {
    const dummy = new THREE.Object3D();
    let instanceIndex = 0;
    for (let i = colorIndex; i < frontValanceCount; i += 4) {
      const x = -canopyW * 0.5 + frontValanceWidth * (i + 0.5);
      dummy.position.set(x, roofYAt(canopyD * 0.5) - 0.006, canopyD * 0.5);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      instanced.setMatrixAt(instanceIndex, dummy.matrix);
      instanceIndex++;
    }
    instanced.instanceMatrix.needsUpdate = true;
  }

  const canopy_front_yellow_valance = new THREE.InstancedMesh(
    canopy_front_valanceGeom,
    canopy_yellowMat,
    3
  );
  canopy_front_yellow_valance.name = "canopy_front_yellow_valance";
  populateValance(canopy_front_yellow_valance, 0);
  canopy_group.add(canopy_front_yellow_valance);

  const canopy_front_white_valance = new THREE.InstancedMesh(
    canopy_front_valanceGeom,
    canopy_whiteMat,
    3
  );
  canopy_front_white_valance.name = "canopy_front_white_valance";
  populateValance(canopy_front_white_valance, 1);
  canopy_group.add(canopy_front_white_valance);

  const canopy_front_lime_valance = new THREE.InstancedMesh(
    canopy_front_valanceGeom,
    canopy_limeMat,
    3
  );
  canopy_front_lime_valance.name = "canopy_front_lime_valance";
  populateValance(canopy_front_lime_valance, 2);
  canopy_group.add(canopy_front_lime_valance);

  const canopy_front_pale_yellow_valance = new THREE.InstancedMesh(
    canopy_front_valanceGeom,
    canopy_pale_yellowMat,
    3
  );
  canopy_front_pale_yellow_valance.name = "canopy_front_pale_yellow_valance";
  populateValance(canopy_front_pale_yellow_valance, 3);
  canopy_group.add(canopy_front_pale_yellow_valance);

  const sideValanceCount = 10;
  const sideValanceWidth = canopyD / sideValanceCount;
  const canopy_side_valanceGeom = makeScallopedGeometry(
    sideValanceWidth * 0.985,
    0.22,
    0.052
  );

  function populateSideValance(instanced, colorIndex, side) {
    const dummy = new THREE.Object3D();
    let instanceIndex = 0;
    for (let i = colorIndex; i < sideValanceCount; i += 4) {
      const z = -canopyD * 0.5 + sideValanceWidth * (i + 0.5);
      dummy.position.set(
        side * canopyW * 0.5,
        roofYAt(z) - 0.006,
        z
      );
      dummy.rotation.set(0, side < 0 ? -Math.PI / 2 : Math.PI / 2, 0);
      dummy.updateMatrix();
      instanced.setMatrixAt(instanceIndex, dummy.matrix);
      instanceIndex++;
    }
    instanced.instanceMatrix.needsUpdate = true;
  }

  const canopy_left_yellow_valance = new THREE.InstancedMesh(
    canopy_side_valanceGeom,
    canopy_yellowMat,
    3
  );
  canopy_left_yellow_valance.name = "canopy_left_yellow_valance";
  populateSideValance(canopy_left_yellow_valance, 0, -1);
  canopy_group.add(canopy_left_yellow_valance);

  const canopy_left_white_valance = new THREE.InstancedMesh(
    canopy_side_valanceGeom,
    canopy_whiteMat,
    3
  );
  canopy_left_white_valance.name = "canopy_left_white_valance";
  populateSideValance(canopy_left_white_valance, 1, -1);
  canopy_group.add(canopy_left_white_valance);

  const canopy_left_lime_valance = new THREE.InstancedMesh(
    canopy_side_valanceGeom,
    canopy_limeMat,
    2
  );
  canopy_left_lime_valance.name = "canopy_left_lime_valance";
  populateSideValance(canopy_left_lime_valance, 2, -1);
  canopy_group.add(canopy_left_lime_valance);

  const canopy_left_pale_yellow_valance = new THREE.InstancedMesh(
    canopy_side_valanceGeom,
    canopy_pale_yellowMat,
    2
  );
  canopy_left_pale_yellow_valance.name = "canopy_left_pale_yellow_valance";
  populateSideValance(canopy_left_pale_yellow_valance, 3, -1);
  canopy_group.add(canopy_left_pale_yellow_valance);

  const canopy_right_yellow_valance = new THREE.InstancedMesh(
    canopy_side_valanceGeom,
    canopy_yellowMat,
    3
  );
  canopy_right_yellow_valance.name = "canopy_right_yellow_valance";
  populateSideValance(canopy_right_yellow_valance, 0, 1);
  canopy_group.add(canopy_right_yellow_valance);

  const canopy_right_white_valance = new THREE.InstancedMesh(
    canopy_side_valanceGeom,
    canopy_whiteMat,
    3
  );
  canopy_right_white_valance.name = "canopy_right_white_valance";
  populateSideValance(canopy_right_white_valance, 1, 1);
  canopy_group.add(canopy_right_white_valance);

  const canopy_right_lime_valance = new THREE.InstancedMesh(
    canopy_side_valanceGeom,
    canopy_limeMat,
    2
  );
  canopy_right_lime_valance.name = "canopy_right_lime_valance";
  populateSideValance(canopy_right_lime_valance, 2, 1);
  canopy_group.add(canopy_right_lime_valance);

  const canopy_right_pale_yellow_valance = new THREE.InstancedMesh(
    canopy_side_valanceGeom,
    canopy_pale_yellowMat,
    2
  );
  canopy_right_pale_yellow_valance.name = "canopy_right_pale_yellow_valance";
  populateSideValance(canopy_right_pale_yellow_valance, 3, 1);
  canopy_group.add(canopy_right_pale_yellow_valance);

  const front_left_roof_edge = makeRodBetween(
    new THREE.Vector3(-canopyW * 0.5, canopyEdgeY, canopyD * 0.5),
    new THREE.Vector3(0, roofYAt(canopyD * 0.5), canopyD * 0.5),
    0.026,
    canopy_pale_yellowMat,
    12
  );
  front_left_roof_edge.name = "front_left_roof_edge";
  canopy_group.add(front_left_roof_edge);

  const front_right_roof_edge = makeRodBetween(
    new THREE.Vector3(0, roofYAt(canopyD * 0.5), canopyD * 0.5),
    new THREE.Vector3(canopyW * 0.5, canopyEdgeY, canopyD * 0.5),
    0.026,
    canopy_yellowMat,
    12
  );
  front_right_roof_edge.name = "front_right_roof_edge";
  canopy_group.add(front_right_roof_edge);

  const rear_left_roof_edge = makeRodBetween(
    new THREE.Vector3(-canopyW * 0.5, canopyEdgeY, -canopyD * 0.5),
    new THREE.Vector3(0, roofYAt(-canopyD * 0.5), -canopyD * 0.5),
    0.026,
    canopy_yellowMat,
    12
  );
  rear_left_roof_edge.name = "rear_left_roof_edge";
  canopy_group.add(rear_left_roof_edge);

  const rear_right_roof_edge = makeRodBetween(
    new THREE.Vector3(0, roofYAt(-canopyD * 0.5), -canopyD * 0.5),
    new THREE.Vector3(canopyW * 0.5, canopyEdgeY, -canopyD * 0.5),
    0.026,
    canopy_pale_yellowMat,
    12
  );
  rear_right_roof_edge.name = "rear_right_roof_edge";
  canopy_group.add(rear_right_roof_edge);

  const left_canopy_ridge = makeRodBetween(
    new THREE.Vector3(-canopyW * 0.5, roofYAt(-canopyD * 0.5), -canopyD * 0.5),
    new THREE.Vector3(-canopyW * 0.5, roofYAt(canopyD * 0.5), canopyD * 0.5),
    0.023,
    canopy_yellowMat,
    12
  );
  left_canopy_ridge.name = "left_canopy_ridge";
  canopy_group.add(left_canopy_ridge);

  const right_canopy_ridge = makeRodBetween(
    new THREE.Vector3(canopyW * 0.5, roofYAt(-canopyD * 0.5), -canopyD * 0.5),
    new THREE.Vector3(canopyW * 0.5, roofYAt(canopyD * 0.5), canopyD * 0.5),
    0.023,
    canopy_pale_yellowMat,
    12
  );
  right_canopy_ridge.name = "right_canopy_ridge";
  canopy_group.add(right_canopy_ridge);

  const center_canopy_ridge = makeRodBetween(
    new THREE.Vector3(0, roofYAt(-canopyD * 0.5), -canopyD * 0.5),
    new THREE.Vector3(0, roofYAt(canopyD * 0.5), canopyD * 0.5),
    0.018,
    canopy_whiteMat,
    12
  );
  center_canopy_ridge.name = "center_canopy_ridge";
  canopy_group.add(center_canopy_ridge);

  const lemon_rindGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.035, 32);
  const lemon_fleshGeom = new THREE.CylinderGeometry(0.164, 0.164, 0.012, 32);
  const lemon_outer_ringGeom = new THREE.TorusGeometry(0.171, 0.008, 8, 32);
  const lemon_centerGeom = new THREE.CylinderGeometry(0.019, 0.019, 0.008, 16);
  const lemon_membraneGeom = new THREE.BoxGeometry(0.008, 0.007, 0.145);

  function createLemonSlice(partName) {
    const slice = new THREE.Group();
    slice.name = partName;

    const rind = new THREE.Mesh(lemon_rindGeom, lemon_rindMat);
    rind.name = partName + "_rind";
    slice.add(rind);

    const flesh = new THREE.Mesh(lemon_fleshGeom, lemon_fleshMat);
    flesh.name = partName + "_flesh";
    flesh.position.y = 0.021;
    slice.add(flesh);

    const outer_ring = new THREE.Mesh(lemon_outer_ringGeom, lemon_membraneMat);
    outer_ring.name = partName + "_outer_ring";
    outer_ring.rotation.x = -Math.PI / 2;
    outer_ring.position.y = 0.03;
    slice.add(outer_ring);

    const membranes = new THREE.InstancedMesh(
      lemon_membraneGeom,
      lemon_membraneMat,
      8
    );
    membranes.name = partName + "_membranes";
    const membrane_dummy = new THREE.Object3D();
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      membrane_dummy.position.set(
        Math.sin(angle) * 0.073,
        0.032,
        Math.cos(angle) * 0.073
      );
      membrane_dummy.rotation.set(0, angle, 0);
      membrane_dummy.updateMatrix();
      membranes.setMatrixAt(i, membrane_dummy.matrix);
    }
    membranes.instanceMatrix.needsUpdate = true;
    slice.add(membranes);

    const center = new THREE.Mesh(lemon_centerGeom, lemon_membraneMat);
    center.name = partName + "_center";
    center.position.y = 0.033;
    slice.add(center);

    return slice;
  }

  const lemon_slice_front = createLemonSlice("lemon_slice_front");
  lemon_slice_front.position.set(-0.47, 1.17, 0.59);
  lemon_slice_front.rotation.set(0.14, -0.08, -0.05);
  lemon_slice_front.scale.setScalar(1.06);
  lemon_display_group.add(lemon_slice_front);

  const lemon_slice_middle_left = createLemonSlice("lemon_slice_middle_left");
  lemon_slice_middle_left.position.set(0.02, 1.17, 0.31);
  lemon_slice_middle_left.rotation.set(0.1, 0.08, 0.03);
  lemon_slice_middle_left.scale.setScalar(0.9);
  lemon_display_group.add(lemon_slice_middle_left);

  const lemon_slice_middle = createLemonSlice("lemon_slice_middle");
  lemon_slice_middle.position.set(0.34, 1.178, 0.3);
  lemon_slice_middle.rotation.set(0.12, -0.05, -0.02);
  lemon_slice_middle.scale.setScalar(0.96);
  lemon_display_group.add(lemon_slice_middle);

  const lemon_slice_back_left = createLemonSlice("lemon_slice_back_left");
  lemon_slice_back_left.position.set(0.52, 1.174, 0.04);
  lemon_slice_back_left.rotation.set(0.08, 0.06, 0.04);
  lemon_slice_back_left.scale.setScalar(0.94);
  lemon_display_group.add(lemon_slice_back_left);

  const lemon_slice_back = createLemonSlice("lemon_slice_back");
  lemon_slice_back.position.set(0.75, 1.17, -0.19);
  lemon_slice_back.rotation.set(0.11, -0.08, -0.03);
  lemon_slice_back.scale.setScalar(0.98);
  lemon_display_group.add(lemon_slice_back);

  const green_straw = makeRodBetween(
    new THREE.Vector3(0.02, 1.18, 0.31),
    new THREE.Vector3(0.01, 1.62, 0.29),
    0.014,
    green_strawMat,
    12
  );
  green_straw.name = "green_straw";
  lemon_display_group.add(green_straw);

  const orange_straw = makeRodBetween(
    new THREE.Vector3(0.52, 1.18, 0.04),
    new THREE.Vector3(0.5, 1.67, 0.01),
    0.014,
    orange_strawMat,
    12
  );
  orange_straw.name = "orange_straw";
  lemon_display_group.add(orange_straw);

  const blue_straw = makeRodBetween(
    new THREE.Vector3(0.75, 1.18, -0.19),
    new THREE.Vector3(0.72, 1.69, -0.22),
    0.014,
    blue_strawMat,
    12
  );
  blue_straw.name = "blue_straw";
  lemon_display_group.add(blue_straw);

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
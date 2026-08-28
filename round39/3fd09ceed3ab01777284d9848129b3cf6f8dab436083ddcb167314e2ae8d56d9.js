export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bed";

  const bed_frame = new THREE.Group();
  bed_frame.name = "bed_frame";
  root.add(bed_frame);

  const sleeping_surface = new THREE.Group();
  sleeping_surface.name = "sleeping_surface";
  root.add(sleeping_surface);

  const bedW = 1.55;
  const bedL = 2.10;
  const postW = 0.11;
  const postX = bedW / 2 - postW / 2;
  const headZ = -bedL / 2 + postW / 2;
  const footZ = bedL / 2 - postW / 2;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb58b63,
    metalness: 0.0,
    roughness: 0.6
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x765039,
    metalness: 0.0,
    roughness: 0.6
  });
  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x78a8cf,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x527fa9,
    metalness: 0.0,
    roughness: 0.95
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x241b16,
    metalness: 0.0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  function roundedBoxGeometry(w, h, d, radius, bevel) {
    const b = Math.min(bevel, w * 0.2, h * 0.2, d * 0.2);
    const sw = w - b * 2;
    const sh = h - b * 2;
    const sd = d - b * 2;
    const r = Math.min(
      Math.max(0.001, radius - b),
      sw * 0.5,
      sh * 0.5
    );
    const x0 = -sw * 0.5;
    const x1 = sw * 0.5;
    const y0 = -sh * 0.5;
    const y1 = sh * 0.5;

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
      depth: sd,
      steps: 1,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: b,
      bevelSize: b,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -sd * 0.5);
    return geometry;
  }

  function roundedLoopGeometry(w, h, z, radius, tubeRadius) {
    const hw = w * 0.5;
    const hh = h * 0.5;
    const r = Math.min(radius, hw, hh);
    const points = [
      new THREE.Vector3(-hw + r, -hh, z),
      new THREE.Vector3(hw - r, -hh, z),
      new THREE.Vector3(hw, -hh + r, z),
      new THREE.Vector3(hw, hh - r, z),
      new THREE.Vector3(hw - r, hh, z),
      new THREE.Vector3(-hw + r, hh, z),
      new THREE.Vector3(-hw, hh - r, z),
      new THREE.Vector3(-hw, -hh + r, z)
    ];
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 64, tubeRadius, 8, true);
  }

  const head_postGeom = roundedBoxGeometry(
    postW,
    1.47,
    postW,
    0.018,
    0.006
  );

  const head_left_post = new THREE.Mesh(head_postGeom, woodMat);
  head_left_post.name = "head_left_post";
  head_left_post.position.set(-postX, 0.735, headZ);
  bed_frame.add(head_left_post);

  const head_right_post = new THREE.Mesh(head_postGeom, woodMat);
  head_right_post.name = "head_right_post";
  head_right_post.position.set(postX, 0.735, headZ);
  bed_frame.add(head_right_post);

  const headboard_panelGeom = roundedBoxGeometry(
    1.28,
    0.82,
    0.05,
    0.025,
    0.006
  );
  const headboard_panel = new THREE.Mesh(headboard_panelGeom, woodMat);
  headboard_panel.name = "headboard_panel";
  headboard_panel.position.set(0, 0.96, headZ + 0.01);
  bed_frame.add(headboard_panel);

  const headboard_top_railGeom = roundedBoxGeometry(
    1.42,
    0.075,
    0.095,
    0.018,
    0.006
  );
  const headboard_top_rail = new THREE.Mesh(
    headboard_top_railGeom,
    woodMat
  );
  headboard_top_rail.name = "headboard_top_rail";
  headboard_top_rail.position.set(0, 1.405, headZ);
  bed_frame.add(headboard_top_rail);

  const headboard_lower_railGeom = roundedBoxGeometry(
    1.34,
    0.075,
    0.075,
    0.014,
    0.005
  );
  const headboard_lower_rail = new THREE.Mesh(
    headboard_lower_railGeom,
    woodMat
  );
  headboard_lower_rail.name = "headboard_lower_rail";
  headboard_lower_rail.position.set(0, 0.535, headZ + 0.005);
  bed_frame.add(headboard_lower_rail);

  const headboard_bracketGeom = new THREE.BoxGeometry(
    0.17,
    0.045,
    0.018
  );
  const headboard_brackets = new THREE.InstancedMesh(
    headboard_bracketGeom,
    silverMat,
    2
  );
  headboard_brackets.name = "headboard_brackets";
  const bracket_dummy = new THREE.Object3D();
  const bracketYs = [0.86, 1.10];
  for (let i = 0; i < bracketYs.length; i++) {
    bracket_dummy.position.set(-0.62, bracketYs[i], headZ + 0.047);
    bracket_dummy.updateMatrix();
    headboard_brackets.setMatrixAt(i, bracket_dummy.matrix);
  }
  headboard_brackets.instanceMatrix.needsUpdate = true;
  bed_frame.add(headboard_brackets);

  const foot_postGeom = roundedBoxGeometry(
    postW,
    0.69,
    postW,
    0.018,
    0.006
  );

  const foot_left_post = new THREE.Mesh(foot_postGeom, woodMat);
  foot_left_post.name = "foot_left_post";
  foot_left_post.position.set(-postX, 0.345, footZ);
  bed_frame.add(foot_left_post);

  const foot_right_post = new THREE.Mesh(foot_postGeom, woodMat);
  foot_right_post.name = "foot_right_post";
  foot_right_post.position.set(postX, 0.345, footZ);
  bed_frame.add(foot_right_post);

  const side_railGeom = roundedBoxGeometry(
    0.095,
    0.34,
    1.90,
    0.018,
    0.006
  );

  const left_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-postX, 0.40, 0);
  bed_frame.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(postX, 0.40, 0);
  bed_frame.add(right_side_rail);

  const side_top_capGeom = roundedBoxGeometry(
    0.125,
    0.055,
    1.92,
    0.018,
    0.006
  );

  const left_side_top_cap = new THREE.Mesh(side_top_capGeom, woodMat);
  left_side_top_cap.name = "left_side_top_cap";
  left_side_top_cap.position.set(-postX, 0.585, 0);
  bed_frame.add(left_side_top_cap);

  const right_side_top_cap = new THREE.Mesh(side_top_capGeom, woodMat);
  right_side_top_cap.name = "right_side_top_cap";
  right_side_top_cap.position.set(postX, 0.585, 0);
  bed_frame.add(right_side_top_cap);

  const footboard_panelGeom = roundedBoxGeometry(
    1.34,
    0.36,
    0.085,
    0.025,
    0.007
  );
  const footboard_panel = new THREE.Mesh(footboard_panelGeom, woodMat);
  footboard_panel.name = "footboard_panel";
  footboard_panel.position.set(0, 0.35, footZ - 0.005);
  bed_frame.add(footboard_panel);

  const footboard_top_railGeom = roundedBoxGeometry(
    1.40,
    0.065,
    0.115,
    0.018,
    0.006
  );
  const footboard_top_rail = new THREE.Mesh(
    footboard_top_railGeom,
    woodMat
  );
  footboard_top_rail.name = "footboard_top_rail";
  footboard_top_rail.position.set(0, 0.565, footZ);
  bed_frame.add(footboard_top_rail);

  const drawer_openingGeom = roundedBoxGeometry(
    0.98,
    0.065,
    0.025,
    0.012,
    0.003
  );
  const drawer_opening = new THREE.Mesh(drawer_openingGeom, shadowMat);
  drawer_opening.name = "drawer_opening";
  drawer_opening.position.set(-0.17, 0.455, footZ + 0.052);
  bed_frame.add(drawer_opening);

  const drawer_frontGeom = roundedBoxGeometry(
    0.94,
    0.27,
    0.07,
    0.022,
    0.007
  );
  const drawer_front = new THREE.Mesh(drawer_frontGeom, woodMat);
  drawer_front.name = "drawer_front";
  drawer_front.position.set(-0.17, 0.29, footZ + 0.085);
  bed_frame.add(drawer_front);

  const drawer_side_gapGeom = new THREE.BoxGeometry(
    0.014,
    0.27,
    0.012
  );
  const drawer_side_gaps = new THREE.InstancedMesh(
    drawer_side_gapGeom,
    shadowMat,
    2
  );
  drawer_side_gaps.name = "drawer_side_gaps";
  const gap_dummy = new THREE.Object3D();
  const gapXs = [-0.655, 0.315];
  for (let i = 0; i < gapXs.length; i++) {
    gap_dummy.position.set(gapXs[i], 0.29, footZ + 0.126);
    gap_dummy.updateMatrix();
    drawer_side_gaps.setMatrixAt(i, gap_dummy.matrix);
  }
  drawer_side_gaps.instanceMatrix.needsUpdate = true;
  bed_frame.add(drawer_side_gaps);

  const drawer_bottom_gapGeom = new THREE.BoxGeometry(
    0.94,
    0.012,
    0.012
  );
  const drawer_bottom_gap = new THREE.Mesh(
    drawer_bottom_gapGeom,
    shadowMat
  );
  drawer_bottom_gap.name = "drawer_bottom_gap";
  drawer_bottom_gap.position.set(-0.17, 0.148, footZ + 0.126);
  bed_frame.add(drawer_bottom_gap);

  const frame_boltGeom = new THREE.CylinderGeometry(
    0.013,
    0.013,
    0.009,
    16
  );
  const frame_bolts = new THREE.InstancedMesh(
    frame_boltGeom,
    silverMat,
    6
  );
  frame_bolts.name = "frame_bolts";
  const bolt_dummy = new THREE.Object3D();
  const boltPositions = [
    [-postX, 0.39, footZ + 0.064],
    [-postX, 0.52, footZ + 0.064],
    [postX, 0.39, footZ + 0.064],
    [postX, 0.52, footZ + 0.064],
    [-postX, 0.48, headZ + 0.064],
    [postX, 0.48, headZ + 0.064]
  ];
  for (let i = 0; i < boltPositions.length; i++) {
    bolt_dummy.position.set(
      boltPositions[i][0],
      boltPositions[i][1],
      boltPositions[i][2]
    );
    bolt_dummy.rotation.set(Math.PI / 2, 0, 0);
    bolt_dummy.updateMatrix();
    frame_bolts.setMatrixAt(i, bolt_dummy.matrix);
  }
  frame_bolts.instanceMatrix.needsUpdate = true;
  bed_frame.add(frame_bolts);

  const mattress_supportGeom = roundedBoxGeometry(
    1.34,
    0.05,
    1.91,
    0.025,
    0.006
  );
  const mattress_support = new THREE.Mesh(
    mattress_supportGeom,
    woodDarkMat
  );
  mattress_support.name = "mattress_support";
  mattress_support.position.set(0, 0.515, -0.01);
  bed_frame.add(mattress_support);

  const mattress_gapGeom = new THREE.BoxGeometry(
    0.014,
    0.035,
    1.86
  );
  const mattress_side_gaps = new THREE.InstancedMesh(
    mattress_gapGeom,
    shadowMat,
    2
  );
  mattress_side_gaps.name = "mattress_side_gaps";
  const mattress_gap_dummy = new THREE.Object3D();
  const mattressGapXs = [-0.674, 0.674];
  for (let i = 0; i < mattressGapXs.length; i++) {
    mattress_gap_dummy.position.set(mattressGapXs[i], 0.535, -0.01);
    mattress_gap_dummy.updateMatrix();
    mattress_side_gaps.setMatrixAt(i, mattress_gap_dummy.matrix);
  }
  mattress_side_gaps.instanceMatrix.needsUpdate = true;
  bed_frame.add(mattress_side_gaps);

  const mattress_front_gapGeom = new THREE.BoxGeometry(
    1.29,
    0.025,
    0.018
  );
  const mattress_front_gap = new THREE.Mesh(
    mattress_front_gapGeom,
    shadowMat
  );
  mattress_front_gap.name = "mattress_front_gap";
  mattress_front_gap.position.set(0, 0.53, 0.948);
  bed_frame.add(mattress_front_gap);

  const mattressGeom = roundedBoxGeometry(
    1.35,
    0.22,
    1.88,
    0.095,
    0.035
  );
  const mattress = new THREE.Mesh(mattressGeom, fabricMat);
  mattress.name = "mattress";
  mattress.position.set(0, 0.65, -0.01);
  sleeping_surface.add(mattress);

  const mattress_pipingGeom = roundedLoopGeometry(
    1.30,
    1.82,
    0,
    0.085,
    0.006
  );
  const mattress_piping = new THREE.Mesh(
    mattress_pipingGeom,
    seamMat
  );
  mattress_piping.name = "mattress_piping";
  mattress_piping.rotation.x = Math.PI / 2;
  mattress_piping.position.set(0, 0.764, -0.01);
  sleeping_surface.add(mattress_piping);

  const mattress_front_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    1.25,
    10
  );
  const mattress_front_seam = new THREE.Mesh(
    mattress_front_seamGeom,
    seamMat
  );
  mattress_front_seam.name = "mattress_front_seam";
  mattress_front_seam.rotation.z = Math.PI / 2;
  mattress_front_seam.position.set(0, 0.57, 0.934);
  sleeping_surface.add(mattress_front_seam);

  const mattress_corner_seamGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    0.14,
    8
  );
  const mattress_corner_seams = new THREE.InstancedMesh(
    mattress_corner_seamGeom,
    seamMat,
    2
  );
  mattress_corner_seams.name = "mattress_corner_seams";
  const corner_dummy = new THREE.Object3D();
  const cornerXs = [-0.655, 0.655];
  for (let i = 0; i < cornerXs.length; i++) {
    corner_dummy.position.set(cornerXs[i], 0.64, 0.934);
    corner_dummy.updateMatrix();
    mattress_corner_seams.setMatrixAt(i, corner_dummy.matrix);
  }
  mattress_corner_seams.instanceMatrix.needsUpdate = true;
  sleeping_surface.add(mattress_corner_seams);

  const back_cushion_group = new THREE.Group();
  back_cushion_group.name = "back_cushion_group";
  back_cushion_group.position.set(0, 1.00, -0.91);
  back_cushion_group.rotation.x = -0.10;
  sleeping_surface.add(back_cushion_group);

  const back_cushionGeom = roundedBoxGeometry(
    1.28,
    0.64,
    0.14,
    0.075,
    0.025
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, fabricMat);
  back_cushion.name = "back_cushion";
  back_cushion_group.add(back_cushion);

  const back_cushion_pipingGeom = roundedLoopGeometry(
    1.22,
    0.58,
    0.076,
    0.065,
    0.006
  );
  const back_cushion_piping = new THREE.Mesh(
    back_cushion_pipingGeom,
    seamMat
  );
  back_cushion_piping.name = "back_cushion_piping";
  back_cushion_group.add(back_cushion_piping);

  const wood_grain_points = [];

  function appendWoodGrain(x0, x1, y0, z, phase) {
    const segments = 12;
    for (let i = 0; i < segments; i++) {
      const t0 = i / segments;
      const t1 = (i + 1) / segments;
      const xa = x0 + (x1 - x0) * t0;
      const xb = x0 + (x1 - x0) * t1;
      const ya = y0 + Math.sin(t0 * Math.PI * 3 + phase) * 0.010;
      const yb = y0 + Math.sin(t1 * Math.PI * 3 + phase) * 0.010;
      wood_grain_points.push(
        new THREE.Vector3(xa, ya, z),
        new THREE.Vector3(xb, yb, z)
      );
    }
  }

  function appendDrawerGrain(x0, x1, y0, z, phase) {
    const segments = 10;
    for (let i = 0; i < segments; i++) {
      const t0 = i / segments;
      const t1 = (i + 1) / segments;
      const xa = x0 + (x1 - x0) * t0;
      const xb = x0 + (x1 - x0) * t1;
      const ya = y0 + Math.sin(t0 * Math.PI * 2.5 + phase) * 0.008;
      const yb = y0 + Math.sin(t1 * Math.PI * 2.5 + phase) * 0.008;
      wood_grain_points.push(
        new THREE.Vector3(xa, ya, z),
        new THREE.Vector3(xb, yb, z)
      );
    }
  }

  function appendSideGrain(x, z0, z1, yBase, phase) {
    const segments = 14;
    for (let i = 0; i < segments; i++) {
      const t0 = i / segments;
      const t1 = (i + 1) / segments;
      const za = z0 + (z1 - z0) * t0;
      const zb = z0 + (z1 - z0) * t1;
      const ya = yBase + Math.sin(t0 * Math.PI * 3 + phase) * 0.009;
      const yb = yBase + Math.sin(t1 * Math.PI * 3 + phase) * 0.009;
      wood_grain_points.push(
        new THREE.Vector3(x, ya, za),
        new THREE.Vector3(x, yb, zb)
      );
    }
  }

  const footboardGrainYs = [0.235, 0.305, 0.375, 0.445];
  for (let i = 0; i < footboardGrainYs.length; i++) {
    appendWoodGrain(
      -0.63,
      0.63,
      footboardGrainYs[i],
      footZ + 0.041,
      i * 0.8
    );
  }

  const drawerGrainYs = [0.215, 0.275, 0.335, 0.395];
  for (let i = 0; i < drawerGrainYs.length; i++) {
    appendDrawerGrain(
      -0.61,
      0.27,
      drawerGrainYs[i],
      footZ + 0.127,
      i * 0.7
    );
  }

  const headboardGrainYs = [0.72, 0.82, 1.00, 1.10, 1.20, 1.30];
  for (let i = 0; i < headboardGrainYs.length; i++) {
    appendWoodGrain(
      -0.60,
      0.60,
      headboardGrainYs[i],
      headZ + 0.039,
      i * 0.65
    );
  }

  appendSideGrain(-0.781, -0.86, 0.86, 0.325, 0.2);
  appendSideGrain(-0.781, -0.86, 0.86, 0.405, 1.1);
  appendSideGrain(-0.781, -0.86, 0.86, 0.485, 2.0);
  appendSideGrain(0.781, -0.86, 0.86, 0.325, 0.7);
  appendSideGrain(0.781, -0.86, 0.86, 0.405, 1.6);
  appendSideGrain(0.781, -0.86, 0.86, 0.485, 2.5);

  const wood_grainGeom = new THREE.BufferGeometry().setFromPoints(
    wood_grain_points
  );
  const wood_grainMat = new THREE.LineBasicMaterial({
    color: 0x876247,
    transparent: true,
    opacity: 0.28
  });
  const wood_grain = new THREE.LineSegments(
    wood_grainGeom,
    wood_grainMat
  );
  wood_grain.name = "wood_grain";
  bed_frame.add(wood_grain);

  const wood_knotGeom = new THREE.TorusGeometry(
    0.052,
    0.0025,
    6,
    32
  );
  const wood_knots = new THREE.InstancedMesh(
    wood_knotGeom,
    woodDarkMat,
    4
  );
  wood_knots.name = "wood_knots";
  const knot_dummy = new THREE.Object3D();
  const knotTransforms = [
    {
      x: 0.39,
      y: 0.36,
      z: footZ + 0.043,
      sx: 1.35,
      sy: 0.55
    },
    {
      x: -0.38,
      y: 0.29,
      z: footZ + 0.130,
      sx: 1.10,
      sy: 0.48
    },
    {
      x: 0.36,
      y: 0.98,
      z: headZ + 0.042,
      sx: 1.20,
      sy: 0.52
    },
    {
      x: -0.27,
      y: 1.22,
      z: headZ + 0.042,
      sx: 0.90,
      sy: 0.45
    }
  ];
  for (let i = 0; i < knotTransforms.length; i++) {
    const transform = knotTransforms[i];
    knot_dummy.position.set(transform.x, transform.y, transform.z);
    knot_dummy.scale.set(transform.sx, transform.sy, 1);
    knot_dummy.rotation.set(0, 0, 0);
    knot_dummy.updateMatrix();
    wood_knots.setMatrixAt(i, knot_dummy.matrix);
  }
  wood_knots.instanceMatrix.needsUpdate = true;
  bed_frame.add(wood_knots);

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
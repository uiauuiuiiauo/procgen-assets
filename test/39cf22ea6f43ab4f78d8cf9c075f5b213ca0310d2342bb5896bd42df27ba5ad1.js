export default function generate(THREE) {
  const root = new THREE.Group();

  const gear_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const recessed_faceMat = new THREE.MeshStandardMaterial({
    color: 0x303030,
    metalness: 0.6,
    roughness: 0.5,
  });
  const machined_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x505050,
    metalness: 0.6,
    roughness: 0.5,
  });
  const cavityMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.8,
  });
  const threadMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.5,
    roughness: 0.5,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x070707,
    metalness: 0.0,
    roughness: 0.8,
  });

  const tooth_count = 32;
  const root_radius = 0.93;
  const tip_radius = 1.04;
  const body_thickness = 0.22;

  function makeCircularShape(radius, segments) {
    const shape = new THREE.Shape();
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }

  function addCircularHole(shape, radius, segments) {
    const hole = new THREE.Path();
    for (let i = 0; i < segments; i++) {
      const angle = -i / segments * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) hole.moveTo(x, y);
      else hole.lineTo(x, y);
    }
    hole.closePath();
    shape.holes.push(hole);
  }

  const gear_bodyShape = new THREE.Shape();
  for (let i = 0; i < tooth_count; i++) {
    const center_angle = i / tooth_count * Math.PI * 2;
    const samples = [
      [center_angle - 0.050, root_radius],
      [center_angle - 0.032, root_radius],
      [center_angle - 0.014, tip_radius],
      [center_angle + 0.014, tip_radius],
      [center_angle + 0.032, root_radius],
      [center_angle + 0.050, root_radius],
    ];
    for (let j = 0; j < samples.length; j++) {
      const angle = samples[j][0];
      const radius = samples[j][1];
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0 && j === 0) gear_bodyShape.moveTo(x, y);
      else gear_bodyShape.lineTo(x, y);
    }
  }
  gear_bodyShape.closePath();
  addCircularHole(gear_bodyShape, 0.235, 64);

  const gear_bodyGeom = new THREE.ExtrudeGeometry(gear_bodyShape, {
    depth: body_thickness,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.014,
    bevelSegments: 2,
    curveSegments: 1,
  });
  gear_bodyGeom.translate(0, 0, -body_thickness / 2);
  gear_bodyGeom.rotateX(Math.PI / 2);
  const gear_body = new THREE.Mesh(gear_bodyGeom, gear_bodyMat);
  root.add(gear_body);

  const recessed_faceProfile = [
    new THREE.Vector2(0.235, 0.000),
    new THREE.Vector2(0.620, 0.000),
    new THREE.Vector2(0.620, 0.010),
    new THREE.Vector2(0.590, 0.013),
    new THREE.Vector2(0.360, 0.015),
    new THREE.Vector2(0.315, 0.020),
    new THREE.Vector2(0.275, 0.034),
    new THREE.Vector2(0.235, 0.034),
    new THREE.Vector2(0.235, 0.000),
  ];
  const recessed_faceGeom = new THREE.LatheGeometry(recessed_faceProfile, 64);
  const recessed_face = new THREE.Mesh(recessed_faceGeom, recessed_faceMat);
  recessed_face.position.y = 0.105;
  root.add(recessed_face);

  const recess_borderGeom = new THREE.TorusGeometry(0.615, 0.008, 8, 96);
  const recess_border = new THREE.Mesh(recess_borderGeom, machined_edgeMat);
  recess_border.rotation.x = Math.PI / 2;
  recess_border.position.y = 0.119;
  root.add(recess_border);

  const inner_step_ringGeom = new THREE.TorusGeometry(0.305, 0.007, 8, 64);
  const inner_step_ring = new THREE.Mesh(inner_step_ringGeom, machined_edgeMat);
  inner_step_ring.rotation.x = Math.PI / 2;
  inner_step_ring.position.y = 0.126;
  root.add(inner_step_ring);

  const center_collarShape = makeCircularShape(0.31, 64);
  addCircularHole(center_collarShape, 0.235, 64);
  const center_collarGeom = new THREE.ExtrudeGeometry(center_collarShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 1,
  });
  center_collarGeom.translate(0, 0, -0.035);
  center_collarGeom.rotateX(Math.PI / 2);
  const center_collar = new THREE.Mesh(center_collarGeom, machined_edgeMat);
  center_collar.position.y = 0.155;
  root.add(center_collar);

  const collar_outer_bevelGeom = new THREE.TorusGeometry(0.302, 0.009, 8, 64);
  const collar_outer_bevel = new THREE.Mesh(collar_outer_bevelGeom, machined_edgeMat);
  collar_outer_bevel.rotation.x = Math.PI / 2;
  collar_outer_bevel.position.y = 0.19;
  root.add(collar_outer_bevel);

  const bore_bevelGeom = new THREE.TorusGeometry(0.244, 0.009, 8, 64);
  const bore_bevel = new THREE.Mesh(bore_bevelGeom, machined_edgeMat);
  bore_bevel.rotation.x = Math.PI / 2;
  bore_bevel.position.y = 0.19;
  root.add(bore_bevel);

  const keyway_angle = -0.58;
  const keyway_radius = 0.275;
  const keyway_width = 0.105;
  const keyway_length = 0.15;
  const keyway_depth = 0.014;
  const keywayShape = new THREE.Shape();
  const half_width = keyway_width / 2;
  const half_length = keyway_length / 2;
  keywayShape.moveTo(-half_width, -half_length);
  keywayShape.lineTo(half_width, -half_length);
  keywayShape.lineTo(half_width, half_length);
  keywayShape.lineTo(-half_width, half_length);
  keywayShape.closePath();

  const keywayGeom = new THREE.ExtrudeGeometry(keywayShape, {
    depth: keyway_depth,
    steps: 1,
    bevelEnabled: false,
  });
  keywayGeom.translate(0, 0, -keyway_depth / 2);
  keywayGeom.rotateX(Math.PI / 2);
  const keyway = new THREE.Mesh(keywayGeom, cavityMat);
  keyway.position.set(
    Math.cos(keyway_angle) * keyway_radius,
    0.199,
    Math.sin(keyway_angle) * keyway_radius
  );
  keyway.rotation.y = -keyway_angle;
  root.add(keyway);

  const mounting_hole_positions = [
    new THREE.Vector3(-0.69, 0, 0.46),
    new THREE.Vector3(0.69, 0, -0.46),
  ];
  const mounting_hole_count = mounting_hole_positions.length;
  const mounting_holesGeom = new THREE.CylinderGeometry(0.058, 0.058, 0.012, 32);
  const mounting_holes = new THREE.InstancedMesh(
    mounting_holesGeom,
    cavityMat,
    mounting_hole_count
  );
  const mounting_hole_rimsGeom = new THREE.TorusGeometry(0.067, 0.011, 8, 32);
  const mounting_hole_rims = new THREE.InstancedMesh(
    mounting_hole_rimsGeom,
    machined_edgeMat,
    mounting_hole_count
  );
  const thread_ringsGeom = new THREE.TorusGeometry(0.039, 0.004, 6, 24);
  const thread_rings = new THREE.InstancedMesh(
    thread_ringsGeom,
    threadMat,
    mounting_hole_count * 3
  );

  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < mounting_hole_count; i++) {
    const position = mounting_hole_positions[i];

    instance_dummy.position.set(position.x, 0.117, position.z);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    mounting_holes.setMatrixAt(i, instance_dummy.matrix);

    instance_dummy.position.set(position.x, 0.123, position.z);
    instance_dummy.rotation.set(Math.PI / 2, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    mounting_hole_rims.setMatrixAt(i, instance_dummy.matrix);

    for (let j = 0; j < 3; j++) {
      const thread_scale = 1 - j * 0.16;
      instance_dummy.position.set(position.x, 0.124 + j * 0.001, position.z);
      instance_dummy.rotation.set(Math.PI / 2, 0, 0);
      instance_dummy.scale.set(thread_scale, thread_scale, thread_scale);
      instance_dummy.updateMatrix();
      thread_rings.setMatrixAt(i * 3 + j, instance_dummy.matrix);
    }
  }
  mounting_holes.instanceMatrix.needsUpdate = true;
  mounting_hole_rims.instanceMatrix.needsUpdate = true;
  thread_rings.instanceMatrix.needsUpdate = true;
  root.add(mounting_holes, mounting_hole_rims, thread_rings);

  const glyphs = {
    G: [
      [0.82, 0.88, 0.65, 1.00],
      [0.65, 1.00, 0.18, 1.00],
      [0.18, 1.00, 0.00, 0.82],
      [0.00, 0.82, 0.00, 0.18],
      [0.00, 0.18, 0.18, 0.00],
      [0.18, 0.00, 0.78, 0.00],
      [0.78, 0.00, 0.78, 0.46],
      [0.78, 0.46, 0.48, 0.46],
    ],
    E: [
      [0.00, 0.00, 0.00, 1.00],
      [0.00, 1.00, 0.82, 1.00],
      [0.00, 0.50, 0.68, 0.50],
      [0.00, 0.00, 0.82, 0.00],
    ],
    A: [
      [0.00, 0.00, 0.40, 1.00],
      [0.40, 1.00, 0.82, 0.00],
      [0.17, 0.43, 0.65, 0.43],
    ],
    R: [
      [0.00, 0.00, 0.00, 1.00],
      [0.00, 1.00, 0.62, 1.00],
      [0.62, 1.00, 0.80, 0.82],
      [0.80, 0.82, 0.80, 0.60],
      [0.80, 0.60, 0.62, 0.48],
      [0.62, 0.48, 0.00, 0.48],
      [0.46, 0.48, 0.84, 0.00],
    ],
    S: [
      [0.80, 0.90, 0.64, 1.00],
      [0.64, 1.00, 0.18, 1.00],
      [0.18, 1.00, 0.00, 0.80],
      [0.00, 0.80, 0.16, 0.54],
      [0.16, 0.54, 0.66, 0.46],
      [0.66, 0.46, 0.82, 0.20],
      [0.82, 0.20, 0.64, 0.00],
      [0.64, 0.00, 0.12, 0.00],
    ],
    I: [
      [0.04, 1.00, 0.78, 1.00],
      [0.41, 1.00, 0.41, 0.00],
      [0.04, 0.00, 0.78, 0.00],
    ],
    N: [
      [0.00, 0.00, 0.00, 1.00],
      [0.00, 1.00, 0.82, 0.00],
      [0.82, 0.00, 0.82, 1.00],
    ],
    T: [
      [0.00, 1.00, 0.84, 1.00],
      [0.42, 1.00, 0.42, 0.00],
    ],
  };

  const engraving_segments = [];

  function appendArcText(text, start_angle, end_angle, radius, font_height, inward) {
    const direction = end_angle >= start_angle ? 1 : -1;
    const denominator = Math.max(1, text.length - 1);
    const advance = font_height * 0.86;

    for (let i = 0; i < text.length; i++) {
      const angle = start_angle + (end_angle - start_angle) * (i / denominator);
      const radial_x = Math.cos(angle);
      const radial_z = Math.sin(angle);
      const tangent_x = direction * -Math.sin(angle);
      const tangent_z = direction * Math.cos(angle);
      const base_x = radial_x * radius;
      const base_z = radial_z * radius;
      const strokes = glyphs[text[i]] || [];

      for (let j = 0; j < strokes.length; j++) {
        const stroke = strokes[j];
        const u1 = (stroke[0] - 0.4) * font_height;
        const v1 = stroke[1] * font_height;
        const u2 = (stroke[2] - 0.4) * font_height;
        const v2 = stroke[3] * font_height;
        const du = u2 - u1;
        const dv = v2 - v1;
        const radial_offset = inward ? -(v1 + v2) * 0.5 : (v1 + v2) * 0.5;
        const x1 = base_x + tangent_x * u1 + radial_x * radial_offset;
        const z1 = base_z + tangent_z * u1 + radial_z * radial_offset;
        const x2 = base_x + tangent_x * u2 + radial_x * radial_offset;
        const z2 = base_z + tangent_z * u2 + radial_z * radial_offset;
        engraving_segments.push({
          x1,
          z1,
          x2,
          z2,
          width: font_height * 0.075,
        });
      }
    }
  }

  appendArcText("GEARSIINT", 2.48, 0.66, 0.755, 0.145, true);
  appendArcText("JAPAN", 3.83, 2.84, 0.77, 0.14, false);

  const engravingGeom = new THREE.BoxGeometry(1, 1, 1);
  const engraving = new THREE.InstancedMesh(
    engravingGeom,
    engravingMat,
    engraving_segments.length
  );
  for (let i = 0; i < engraving_segments.length; i++) {
    const segment = engraving_segments[i];
    const dx = segment.x2 - segment.x1;
    const dz = segment.z2 - segment.z1;
    const length = Math.sqrt(dx * dx + dz * dz);
    instance_dummy.position.set(
      (segment.x1 + segment.x2) * 0.5,
      0.121,
      (segment.z1 + segment.z2) * 0.5
    );
    instance_dummy.rotation.set(0, Math.atan2(-dz, dx), 0);
    instance_dummy.scale.set(length, 0.004, segment.width);
    instance_dummy.updateMatrix();
    engraving.setMatrixAt(i, instance_dummy.matrix);
  }
  engraving.instanceMatrix.needsUpdate = true;
  root.add(engraving);

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
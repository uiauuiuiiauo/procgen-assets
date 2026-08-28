export default function generate(THREE) {
  const barn = new THREE.Group();
  barn.name = "barn";

  const wall_structure = new THREE.Group();
  wall_structure.name = "wall_structure";
  barn.add(wall_structure);

  const roof_group = new THREE.Group();
  roof_group.name = "roof_group";
  barn.add(roof_group);

  const front_details = new THREE.Group();
  front_details.name = "front_details";
  barn.add(front_details);

  const width = 3.0;
  const depth = 4.0;
  const half_width = width / 2;
  const half_depth = depth / 2;
  const wall_height = 1.65;
  const ridge_height = 2.82;
  const roof_eave_y = 1.58;
  const roof_run = 1.82;
  const roof_depth = 4.56;
  const roof_rise = ridge_height - roof_eave_y;
  const roof_angle = Math.atan2(roof_rise, roof_run);
  const roof_slope_length = Math.sqrt(roof_run * roof_run + roof_rise * roof_rise);

  const wall_planksMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.9
  });
  const wall_backingMat = new THREE.MeshStandardMaterial({
    color: 0x542521,
    metalness: 0.0,
    roughness: 0.9
  });
  const wall_seamsMat = new THREE.MeshStandardMaterial({
    color: 0x351b19,
    metalness: 0.0,
    roughness: 0.9
  });
  const weathered_woodMat = new THREE.MeshStandardMaterial({
    color: 0x81796d,
    metalness: 0.0,
    roughness: 0.9
  });
  const faded_trimMat = new THREE.MeshStandardMaterial({
    color: 0x918b7e,
    metalness: 0.0,
    roughness: 0.9
  });
  const foundationMat = new THREE.MeshStandardMaterial({
    color: 0x66543e,
    metalness: 0.0,
    roughness: 0.9
  });
  const doorMat = new THREE.MeshStandardMaterial({
    color: 0x98423e,
    metalness: 0.0,
    roughness: 0.9
  });
  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x422723,
    metalness: 0.0,
    roughness: 0.9
  });
  const roof_thatchMat = new THREE.MeshStandardMaterial({
    color: 0x9e7d4d,
    metalness: 0.0,
    roughness: 0.95
  });
  const roof_strawMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.95
  });
  const window_recessMat = new THREE.MeshStandardMaterial({
    color: 0x171413,
    metalness: 0.0,
    roughness: 0.8
  });
  const hingeMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.5
  });
  const knobMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.25
  });

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx, ry, rz);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  function addBox(name, parent, w, h, d, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addFrontBeam(name, parent, x1, y1, x2, y2, z, thickness, material) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(length, thickness, thickness),
      material
    );
    mesh.name = name;
    mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    mesh.rotation.z = Math.atan2(dy, dx);
    parent.add(mesh);
    return mesh;
  }

  const wall_backingGeom = new THREE.BoxGeometry(width, wall_height, depth);
  const wall_backing = new THREE.Mesh(wall_backingGeom, wall_backingMat);
  wall_backing.name = "wall_backing";
  wall_backing.position.y = wall_height / 2;
  wall_structure.add(wall_backing);

  const gable_backingShape = new THREE.Shape();
  gable_backingShape.moveTo(-half_width, wall_height);
  gable_backingShape.lineTo(half_width, wall_height);
  gable_backingShape.lineTo(0, ridge_height);
  gable_backingShape.lineTo(-half_width, wall_height);
  const gable_backingGeom = new THREE.ShapeGeometry(gable_backingShape);

  const front_gable_backing = new THREE.Mesh(gable_backingGeom, wall_backingMat);
  front_gable_backing.name = "front_gable_backing";
  front_gable_backing.position.z = half_depth + 0.002;
  wall_structure.add(front_gable_backing);

  const rear_gable_backing = new THREE.Mesh(gable_backingGeom, wall_backingMat);
  rear_gable_backing.name = "rear_gable_backing";
  rear_gable_backing.position.z = -half_depth - 0.002;
  wall_structure.add(rear_gable_backing);

  const wall_planksGeom = new THREE.BoxGeometry(1, 1, 1);
  const wall_palette = [
    0x9b433f,
    0xa84e49,
    0x8d3836,
    0xb15a52,
    0x93403d,
    0xa24743
  ];
  const wall_color = new THREE.Color();

  const front_plank_count = 15;
  const front_plank_pitch = width / front_plank_count;
  const front_wall_planks = new THREE.InstancedMesh(
    wall_planksGeom,
    wall_planksMat,
    front_plank_count
  );
  front_wall_planks.name = "front_wall_planks";
  for (let i = 0; i < front_plank_count; i++) {
    const x = -half_width + front_plank_pitch * (i + 0.5);
    wall_color.setHex(wall_palette[(i * 5 + 1) % wall_palette.length]);
    instance_dummy.position.set(x, wall_height / 2, half_depth + 0.025);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(front_plank_pitch - 0.018, wall_height, 0.05);
    instance_dummy.updateMatrix();
    front_wall_planks.setMatrixAt(i, instance_dummy.matrix);
    front_wall_planks.setColorAt(i, wall_color);
  }
  front_wall_planks.instanceMatrix.needsUpdate = true;
  if (front_wall_planks.instanceColor) front_wall_planks.instanceColor.needsUpdate = true;
  wall_structure.add(front_wall_planks);

  const rear_wall_planks = new THREE.InstancedMesh(
    wall_planksGeom,
    wall_planksMat,
    front_plank_count
  );
  rear_wall_planks.name = "rear_wall_planks";
  for (let i = 0; i < front_plank_count; i++) {
    const x = -half_width + front_plank_pitch * (i + 0.5);
    wall_color.setHex(wall_palette[(i * 3 + 2) % wall_palette.length]);
    instance_dummy.position.set(x, wall_height / 2, -half_depth - 0.025);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(front_plank_pitch - 0.018, wall_height, 0.05);
    instance_dummy.updateMatrix();
    rear_wall_planks.setMatrixAt(i, instance_dummy.matrix);
    rear_wall_planks.setColorAt(i, wall_color);
  }
  rear_wall_planks.instanceMatrix.needsUpdate = true;
  if (rear_wall_planks.instanceColor) rear_wall_planks.instanceColor.needsUpdate = true;
  wall_structure.add(rear_wall_planks);

  const side_plank_count = 20;
  const side_plank_pitch = depth / side_plank_count;
  const side_wall_planks = new THREE.InstancedMesh(
    wall_planksGeom,
    wall_planksMat,
    side_plank_count * 2
  );
  side_wall_planks.name = "side_wall_planks";
  let side_plank_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < side_plank_count; i++) {
      const z = -half_depth + side_plank_pitch * (i + 0.5);
      wall_color.setHex(wall_palette[(i * 4 + (side > 0 ? 2 : 0)) % wall_palette.length]);
      instance_dummy.position.set(
        side * (half_width + 0.025),
        wall_height / 2,
        z
      );
      instance_dummy.rotation.set(0, 0, 0);
      instance_dummy.scale.set(0.05, wall_height, side_plank_pitch - 0.018);
      instance_dummy.updateMatrix();
      side_wall_planks.setMatrixAt(side_plank_index, instance_dummy.matrix);
      side_wall_planks.setColorAt(side_plank_index, wall_color);
      side_plank_index++;
    }
  }
  side_wall_planks.instanceMatrix.needsUpdate = true;
  if (side_wall_planks.instanceColor) side_wall_planks.instanceColor.needsUpdate = true;
  wall_structure.add(side_wall_planks);

  const gable_planks = new THREE.InstancedMesh(
    wall_planksGeom,
    wall_planksMat,
    front_plank_count * 2
  );
  gable_planks.name = "gable_planks";
  let gable_plank_index = 0;
  for (const end of [-1, 1]) {
    for (let i = 0; i < front_plank_count; i++) {
      const x = -half_width + front_plank_pitch * (i + 0.5);
      const top_y = ridge_height - Math.abs(x) / half_width * (ridge_height - wall_height);
      const plank_height = Math.max(0.06, top_y - wall_height);
      wall_color.setHex(wall_palette[(i * 5 + (end > 0 ? 1 : 3)) % wall_palette.length]);
      instance_dummy.position.set(
        x,
        wall_height + plank_height / 2,
        end * (half_depth + 0.027)
      );
      instance_dummy.rotation.set(0, 0, 0);
      instance_dummy.scale.set(front_plank_pitch - 0.018, plank_height, 0.05);
      instance_dummy.updateMatrix();
      gable_planks.setMatrixAt(gable_plank_index, instance_dummy.matrix);
      gable_planks.setColorAt(gable_plank_index, wall_color);
      gable_plank_index++;
    }
  }
  gable_planks.instanceMatrix.needsUpdate = true;
  if (gable_planks.instanceColor) gable_planks.instanceColor.needsUpdate = true;
  wall_structure.add(gable_planks);

  const front_wall_seamsGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_wall_seams = new THREE.InstancedMesh(
    front_wall_seamsGeom,
    wall_seamsMat,
    front_plank_count - 1
  );
  front_wall_seams.name = "front_wall_seams";
  for (let i = 1; i < front_plank_count; i++) {
    setInstance(
      front_wall_seams,
      i - 1,
      -half_width + front_plank_pitch * i,
      wall_height / 2,
      half_depth + 0.053,
      0, 0, 0,
      0.012, wall_height * 0.985, 0.008
    );
  }
  front_wall_seams.instanceMatrix.needsUpdate = true;
  wall_structure.add(front_wall_seams);

  const side_wall_seams = new THREE.InstancedMesh(
    front_wall_seamsGeom,
    wall_seamsMat,
    side_plank_count * 2
  );
  side_wall_seams.name = "side_wall_seams";
  let side_seam_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 1; i < side_plank_count; i++) {
      setInstance(
        side_wall_seams,
        side_seam_index++,
        side * (half_width + 0.053),
        wall_height / 2,
        -half_depth + side_plank_pitch * i,
        0, 0, 0,
        0.008, wall_height * 0.985, 0.012
      );
    }
  }
  side_wall_seams.instanceMatrix.needsUpdate = true;
  wall_structure.add(side_wall_seams);

  const gable_seams = new THREE.InstancedMesh(
    front_wall_seamsGeom,
    wall_seamsMat,
    front_plank_count - 1
  );
  gable_seams.name = "gable_seams";
  for (let i = 1; i < front_plank_count; i++) {
    const x = -half_width + front_plank_pitch * i;
    const top_y = ridge_height - Math.abs(x) / half_width * (ridge_height - wall_height);
    const seam_height = Math.max(0.04, top_y - wall_height);
    setInstance(
      gable_seams,
      i - 1,
      x,
      wall_height + seam_height / 2,
      half_depth + 0.055,
      0, 0, 0,
      0.012, seam_height, 0.008
    );
  }
  gable_seams.instanceMatrix.needsUpdate = true;
  wall_structure.add(gable_seams);

  const front_eave_beam = addBox(
    "front_eave_beam", wall_structure,
    width + 0.08, 0.08, 0.09, dark_woodMat,
    0, wall_height - 0.015, half_depth + 0.075
  );
  const rear_eave_beam = addBox(
    "rear_eave_beam", wall_structure,
    width + 0.08, 0.08, 0.09, dark_woodMat,
    0, wall_height - 0.015, -half_depth - 0.075
  );

  const front_left_corner_post = addBox(
    "front_left_corner_post", wall_structure,
    0.11, wall_height + 0.03, 0.11, weathered_woodMat,
    -half_width + 0.025, wall_height / 2, half_depth + 0.065
  );
  const front_right_corner_post = addBox(
    "front_right_corner_post", wall_structure,
    0.11, wall_height + 0.03, 0.11, weathered_woodMat,
    half_width - 0.025, wall_height / 2, half_depth + 0.065
  );
  const rear_left_corner_post = addBox(
    "rear_left_corner_post", wall_structure,
    0.11, wall_height + 0.03, 0.11, weathered_woodMat,
    -half_width + 0.025, wall_height / 2, -half_depth - 0.065
  );
  const rear_right_corner_post = addBox(
    "rear_right_corner_post", wall_structure,
    0.11, wall_height + 0.03, 0.11, weathered_woodMat,
    half_width - 0.025, wall_height / 2, -half_depth - 0.065
  );

  const front_foundation = addBox(
    "front_foundation", wall_structure,
    width + 0.14, 0.13, 0.15, foundationMat,
    0, 0.065, half_depth + 0.07
  );
  const rear_foundation = addBox(
    "rear_foundation", wall_structure,
    width + 0.14, 0.13, 0.15, foundationMat,
    0, 0.065, -half_depth - 0.07
  );
  const left_foundation = addBox(
    "left_foundation", wall_structure,
    0.15, 0.13, depth + 0.12, foundationMat,
    -half_width - 0.07, 0.065, 0
  );
  const right_foundation = addBox(
    "right_foundation", wall_structure,
    0.15, 0.13, depth + 0.12, foundationMat,
    half_width + 0.07, 0.065, 0
  );

  const front_gable_base_beam = addBox(
    "front_gable_base_beam", wall_structure,
    width + 0.03, 0.075, 0.095, dark_woodMat,
    0, wall_height, half_depth + 0.08
  );

  const front_left_gable_trim = addFrontBeam(
    "front_left_gable_trim", wall_structure,
    -half_width, wall_height, 0, ridge_height,
    half_depth + 0.09, 0.095, dark_woodMat
  );
  const front_right_gable_trim = addFrontBeam(
    "front_right_gable_trim", wall_structure,
    0, ridge_height, half_width, wall_height,
    half_depth + 0.09, 0.095, dark_woodMat
  );
  const rear_left_gable_trim = addFrontBeam(
    "rear_left_gable_trim", wall_structure,
    -half_width, wall_height, 0, ridge_height,
    -half_depth - 0.09, 0.095, dark_woodMat
  );
  const rear_right_gable_trim = addFrontBeam(
    "rear_right_gable_trim", wall_structure,
    0, ridge_height, half_width, wall_height,
    -half_depth - 0.09, 0.095, dark_woodMat
  );

  const front_weatheringGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_weathering = new THREE.InstancedMesh(
    front_weatheringGeom,
    faded_trimMat,
    18
  );
  front_weathering.name = "front_weathering";
  for (let i = 0; i < 18; i++) {
    const x = -half_width + front_plank_pitch * (i + 0.5);
    const y = 0.22 + ((i * 7) % 13) / 13 * 1.18;
    const stripe_width = 0.012 + (i % 3) * 0.005;
    const stripe_height = 0.14 + (i % 5) * 0.045;
    setInstance(
      front_weathering, i,
      x + ((i % 2) * 2 - 1) * 0.025,
      y,
      half_depth + 0.056,
      0, 0, 0,
      stripe_width, stripe_height, 0.006
    );
  }
  front_weathering.instanceMatrix.needsUpdate = true;
  wall_structure.add(front_weathering);

  const side_weathering = new THREE.InstancedMesh(
    front_weatheringGeom,
    faded_trimMat,
    24
  );
  side_weathering.name = "side_weathering";
  let side_weathering_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 12; i++) {
      const z = -half_depth + side_plank_pitch * (i + 0.5);
      const y = 0.20 + ((i * 5 + 2) % 11) / 11 * 1.2;
      setInstance(
        side_weathering,
        side_weathering_index++,
        side * (half_width + 0.057),
        y,
        z + ((i % 2) * 2 - 1) * 0.025,
        0, 0, 0,
        0.006,
        0.16 + (i % 4) * 0.05,
        0.014
      );
    }
  }
  side_weathering.instanceMatrix.needsUpdate = true;
  wall_structure.add(side_weathering);

  const wood_knotsGeom = new THREE.TorusGeometry(0.034, 0.007, 6, 14);
  const wood_knots = new THREE.InstancedMesh(wood_knotsGeom, dark_woodMat, 10);
  wood_knots.name = "wood_knots";
  const front_knot_x = [-1.22, -0.88, -0.48, 0.35, 0.76, 1.17];
  const front_knot_y = [0.36, 1.18, 0.67, 0.42, 1.05, 0.72];
  for (let i = 0; i < 6; i++) {
    setInstance(
      wood_knots, i,
      front_knot_x[i], front_knot_y[i], half_depth + 0.061,
      0, 0, 0,
      1 + (i % 2) * 0.25, 1.25, 1
    );
  }
  const side_knot_z = [1.55, 0.95, 0.33, -0.35, -1.02, -1.6];
  const side_knot_y = [0.48, 1.03, 0.7, 1.24, 0.4, 0.88];
  for (let i = 0; i < 4; i++) {
    setInstance(
      wood_knots, i + 6,
      half_width + 0.061, side_knot_y[i + 1], side_knot_z[i + 1],
      0, Math.PI / 2, 0,
      1.15, 1.3, 1
    );
  }
  wood_knots.instanceMatrix.needsUpdate = true;
  wall_structure.add(wood_knots);

  const door_width = 0.82;
  const door_height = 1.30;
  const door_x = -0.30;
  const door_bottom = 0.11;
  const door_center_y = door_bottom + door_height / 2;

  const door_recess = addBox(
    "door_recess", front_details,
    door_width + 0.06, door_height + 0.05, 0.035,
    wall_seamsMat,
    door_x, door_center_y, half_depth + 0.066
  );

  const door_planksGeom = new THREE.BoxGeometry(1, 1, 1);
  const door_planks = new THREE.InstancedMesh(door_planksGeom, doorMat, 4);
  door_planks.name = "door_planks";
  const door_plank_pitch = door_width / 4;
  for (let i = 0; i < 4; i++) {
    setInstance(
      door_planks, i,
      door_x - door_width / 2 + door_plank_pitch * (i + 0.5),
      door_center_y,
      half_depth + 0.091,
      0, 0, 0,
      door_plank_pitch - 0.014, door_height, 0.035
    );
  }
  door_planks.instanceMatrix.needsUpdate = true;
  front_details.add(door_planks);

  const door_left_frame = addBox(
    "door_left_frame", front_details,
    0.09, door_height + 0.14, 0.07,
    weathered_woodMat,
    door_x - door_width / 2 - 0.015,
    door_center_y + 0.015,
    half_depth + 0.125
  );
  const door_right_frame = addBox(
    "door_right_frame", front_details,
    0.09, door_height + 0.14, 0.07,
    weathered_woodMat,
    door_x + door_width / 2 + 0.015,
    door_center_y + 0.015,
    half_depth + 0.125
  );
  const door_top_frame = addBox(
    "door_top_frame", front_details,
    door_width + 0.18, 0.10, 0.07,
    weathered_woodMat,
    door_x,
    door_bottom + door_height + 0.04,
    half_depth + 0.125
  );
  const door_threshold = addBox(
    "door_threshold", front_details,
    door_width + 0.16, 0.075, 0.09,
    foundationMat,
    door_x,
    door_bottom - 0.005,
    half_depth + 0.13
  );

  const door_diagonal_left_to_right = addFrontBeam(
    "door_diagonal_left_to_right", front_details,
    door_x - door_width / 2 + 0.07, door_bottom + 0.10,
    door_x + door_width / 2 - 0.07, door_bottom + door_height - 0.10,
    half_depth + 0.139, 0.065, faded_trimMat
  );
  const door_diagonal_right_to_left = addFrontBeam(
    "door_diagonal_right_to_left", front_details,
    door_x + door_width / 2 - 0.07, door_bottom + 0.10,
    door_x - door_width / 2 + 0.07, door_bottom + door_height - 0.10,
    half_depth + 0.141, 0.065, faded_trimMat
  );

  const door_hingesGeom = new THREE.BoxGeometry(0.17, 0.038, 0.025);
  const door_hinges = new THREE.InstancedMesh(door_hingesGeom, hingeMat, 2);
  door_hinges.name = "door_hinges";
  setInstance(
    door_hinges, 0,
    door_x - door_width / 2 + 0.015, 0.42, half_depth + 0.151,
    0, 0, 0, 1, 1, 1
  );
  setInstance(
    door_hinges, 1,
    door_x - door_width / 2 + 0.015, 1.02, half_depth + 0.151,
    0, 0, 0, 1, 1, 1
  );
  door_hinges.instanceMatrix.needsUpdate = true;
  front_details.add(door_hinges);

  const door_knobGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.04, 14);
  const door_knob = new THREE.Mesh(door_knobGeom, knobMat);
  door_knob.name = "door_knob";
  door_knob.rotation.x = Math.PI / 2;
  door_knob.position.set(
    door_x - 0.27,
    0.73,
    half_depth + 0.165
  );
  front_details.add(door_knob);

  const window_width = 0.42;
  const window_height = 0.58;
  const window_x = -0.28;
  const window_y = 2.08;

  const window_recess = addBox(
    "window_recess", front_details,
    window_width + 0.04, window_height + 0.04, 0.035,
    window_recessMat,
    window_x, window_y, half_depth + 0.067
  );

  const window_left_trim = addBox(
    "window_left_trim", front_details,
    0.075, window_height + 0.16, 0.065,
    weathered_woodMat,
    window_x - window_width / 2 - 0.025,
    window_y,
    half_depth + 0.112
  );
  const window_right_trim = addBox(
    "window_right_trim", front_details,
    0.075, window_height + 0.16, 0.065,
    weathered_woodMat,
    window_x + window_width / 2 + 0.025,
    window_y,
    half_depth + 0.112
  );
  const window_top_trim = addBox(
    "window_top_trim", front_details,
    window_width + 0.19, 0.075, 0.065,
    weathered_woodMat,
    window_x,
    window_y + window_height / 2 + 0.025,
    half_depth + 0.112
  );
  const window_bottom_trim = addBox(
    "window_bottom_trim", front_details,
    window_width + 0.19, 0.075, 0.065,
    weathered_woodMat,
    window_x,
    window_y - window_height / 2 - 0.025,
    half_depth + 0.112
  );
  const window_vertical_muntin = addBox(
    "window_vertical_muntin", front_details,
    0.045, window_height, 0.055,
    dark_woodMat,
    window_x,
    window_y,
    half_depth + 0.126
  );
  const window_horizontal_muntin = addBox(
    "window_horizontal_muntin", front_details,
    window_width, 0.045, 0.055,
    dark_woodMat,
    window_x,
    window_y,
    half_depth + 0.127
  );

  const roof_thatchGeom = new THREE.BoxGeometry(
    roof_slope_length,
    0.16,
    roof_depth
  );

  const roof_left_thatch = new THREE.Mesh(roof_thatchGeom, roof_thatchMat);
  roof_left_thatch.name = "roof_left_thatch";
  roof_left_thatch.position.set(
    -roof_run / 2,
    (ridge_height + roof_eave_y) / 2,
    0
  );
  roof_left_thatch.rotation.z = roof_angle;
  roof_group.add(roof_left_thatch);

  const roof_right_thatch = new THREE.Mesh(roof_thatchGeom, roof_thatchMat);
  roof_right_thatch.name = "roof_right_thatch";
  roof_right_thatch.position.set(
    roof_run / 2,
    (ridge_height + roof_eave_y) / 2,
    0
  );
  roof_right_thatch.rotation.z = -roof_angle;
  roof_group.add(roof_right_thatch);

  const roof_strawsGeom = new THREE.CylinderGeometry(0.006, 0.006, 1, 5);
  const straw_palette = [
    0xb6935d,
    0x9d7948,
    0xc3a16b,
    0x87673f,
    0xa88450,
    0x755b3b
  ];
  const straw_color = new THREE.Color();

  const roof_straw_rows = 16;
  const roof_straw_columns = 24;
  const roof_straws = new THREE.InstancedMesh(
    roof_strawsGeom,
    roof_strawMat,
    roof_straw_rows * roof_straw_columns * 2
  );
  roof_straws.name = "roof_straws";
  let roof_straw_index = 0;
  for (const side of [-1, 1]) {
    for (let row = 0; row < roof_straw_rows; row++) {
      for (let column = 0; column < roof_straw_columns; column++) {
        const code = column * 13 + row * 7 + (side > 0 ? 3 : 0);
        const slope_distance =
          0.07 + row / (roof_straw_rows - 1) * (roof_slope_length - 0.14) +
          ((code % 5) - 2) * 0.008;
        const x = side * (
          slope_distance * Math.cos(roof_angle) +
          Math.sin(roof_angle) * 0.095
        );
        const y =
          ridge_height -
          slope_distance * Math.sin(roof_angle) +
          Math.cos(roof_angle) * 0.095;
        const z =
          -roof_depth / 2 +
          0.08 +
          column / (roof_straw_columns - 1) * (roof_depth - 0.16) +
          ((code % 7) - 3) * 0.012;
        const length = 0.19 + (code % 6) * 0.018;
        const rotation_z =
          -side * roof_angle +
          ((code % 11) - 5) * 0.012;
        const rotation_x = ((code % 7) - 3) * 0.014;

        setInstance(
          roof_straws,
          roof_straw_index,
          x, y, z,
          rotation_x, 0, rotation_z,
          1, length, 1
        );
        straw_color.setHex(
          straw_palette[(code * 3) % straw_palette.length]
        );
        roof_straws.setColorAt(roof_straw_index, straw_color);
        roof_straw_index++;
      }
    }
  }
  roof_straws.instanceMatrix.needsUpdate = true;
  if (roof_straws.instanceColor) roof_straws.instanceColor.needsUpdate = true;
  roof_group.add(roof_straws);

  const roof_edge_fringe_count = 120;
  const roof_edge_fringe = new THREE.InstancedMesh(
    roof_strawsGeom,
    roof_strawMat,
    roof_edge_fringe_count
  );
  roof_edge_fringe.name = "roof_edge_fringe";
  let fringe_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < roof_edge_fringe_count / 2; i++) {
      const t = i / (roof_edge_fringe_count / 2 - 1);
      const z = -roof_depth / 2 + t * roof_depth + ((i % 5) - 2) * 0.012;
      const length = 0.16 + (i % 7) * 0.014;
      setInstance(
        roof_edge_fringe,
        fringe_index++,
        side * (roof_run + length * 0.22),
        roof_eave_y - 0.045 + ((i % 3) - 1) * 0.012,
        z,
        0, 0, -side * Math.PI / 2,
        1, length, 1
      );
    }
  }
  roof_edge_fringe.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_edge_fringe);

  const roof_ridge_capGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    roof_depth + 0.08,
    10
  );
  const roof_ridge_cap = new THREE.Mesh(roof_ridge_capGeom, roof_thatchMat);
  roof_ridge_cap.name = "roof_ridge_cap";
  roof_ridge_cap.rotation.x = Math.PI / 2;
  roof_ridge_cap.position.set(0, ridge_height + 0.09, 0);
  roof_group.add(roof_ridge_cap);

  const roof_ridge_tiesGeom = new THREE.TorusGeometry(0.062, 0.009, 6, 14);
  const roof_ridge_ties = new THREE.InstancedMesh(
    roof_ridge_tiesGeom,
    dark_woodMat,
    9
  );
  roof_ridge_ties.name = "roof_ridge_ties";
  for (let i = 0; i < 9; i++) {
    setInstance(
      roof_ridge_ties,
      i,
      0,
      ridge_height + 0.09,
      -roof_depth / 2 + 0.24 + i * (roof_depth - 0.48) / 8,
      0, 0, 0,
      1, 1, 1
    );
  }
  roof_ridge_ties.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_ridge_ties);

  const roof_left_gable_edge = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(0, ridge_height + 0.06, roof_depth / 2 + 0.015),
        new THREE.Vector3(-roof_run, roof_eave_y + 0.035, roof_depth / 2 + 0.015)
      ),
      1,
      0.043,
      7,
      false
    ),
    roof_thatchMat
  );
  roof_left_gable_edge.name = "roof_left_gable_edge";
  roof_group.add(roof_left_gable_edge);

  const roof_right_gable_edge = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(0, ridge_height + 0.06, roof_depth / 2 + 0.015),
        new THREE.Vector3(roof_run, roof_eave_y + 0.035, roof_depth / 2 + 0.015)
      ),
      1,
      0.043,
      7,
      false
    ),
    roof_thatchMat
  );
  roof_right_gable_edge.name = "roof_right_gable_edge";
  roof_group.add(roof_right_gable_edge);

  const roof_left_rear_edge = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(0, ridge_height + 0.06, -roof_depth / 2 - 0.015),
        new THREE.Vector3(-roof_run, roof_eave_y + 0.035, -roof_depth / 2 - 0.015)
      ),
      1,
      0.043,
      7,
      false
    ),
    roof_thatchMat
  );
  roof_left_rear_edge.name = "roof_left_rear_edge";
  roof_group.add(roof_left_rear_edge);

  const roof_right_rear_edge = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(0, ridge_height + 0.06, -roof_depth / 2 - 0.015),
        new THREE.Vector3(roof_run, roof_eave_y + 0.035, -roof_depth / 2 - 0.015)
      ),
      1,
      0.043,
      7,
      false
    ),
    roof_thatchMat
  );
  roof_right_rear_edge.name = "roof_right_rear_edge";
  roof_group.add(roof_right_rear_edge);

  function fitToUnitCube(root) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    root.scale.setScalar(scale);
    root.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(barn);
  return barn;
}
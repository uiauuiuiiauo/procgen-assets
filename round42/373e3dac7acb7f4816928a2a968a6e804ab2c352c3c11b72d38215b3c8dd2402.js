export default function generate(THREE) {
  const target_board = new THREE.Group();
  target_board.name = "target_board";

  const board_body = new THREE.Group();
  board_body.name = "board_body";
  target_board.add(board_body);

  const target_markings = new THREE.Group();
  target_markings.name = "target_markings";
  target_board.add(target_markings);

  const metal_frame = new THREE.Group();
  metal_frame.name = "metal_frame";
  target_board.add(metal_frame);

  const board_backingMat = new THREE.MeshStandardMaterial({
    color: 0x17352e,
    metalness: 0.0,
    roughness: 0.8
  });

  const target_faceMat = new THREE.MeshStandardMaterial({
    color: 0x16302a,
    metalness: 0.0,
    roughness: 0.95
  });

  const green_scoring_fieldMat = new THREE.MeshStandardMaterial({
    color: 0x147a4a,
    metalness: 0.0,
    roughness: 0.95
  });

  const green_field_borderMat = new THREE.MeshStandardMaterial({
    color: 0xe8eeee,
    metalness: 0.0,
    roughness: 0.7
  });

  const red_bullseyeMat = new THREE.MeshStandardMaterial({
    color: 0xe00020,
    metalness: 0.0,
    roughness: 0.95
  });

  const outer_metal_rimMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const rim_clipsMat = outer_metal_rimMat;

  const rim_collar_sleevesMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const board_backingGeom = new THREE.CylinderGeometry(
    0.966,
    0.966,
    0.055,
    96
  );
  const board_backing = new THREE.Mesh(
    board_backingGeom,
    board_backingMat
  );
  board_backing.name = "board_backing";
  board_backing.rotation.x = Math.PI / 2;
  board_backing.position.z = -0.002;
  board_body.add(board_backing);

  const target_faceGeom = new THREE.CircleGeometry(0.958, 128);
  const target_face = new THREE.Mesh(target_faceGeom, target_faceMat);
  target_face.name = "target_face";
  target_face.position.z = 0.027;
  board_body.add(target_face);

  const green_scoring_fieldGeom = new THREE.CircleGeometry(0.755, 128);
  const green_scoring_field = new THREE.Mesh(
    green_scoring_fieldGeom,
    green_scoring_fieldMat
  );
  green_scoring_field.name = "green_scoring_field";
  green_scoring_field.position.z = 0.031;
  target_markings.add(green_scoring_field);

  const green_field_borderGeom = new THREE.RingGeometry(
    0.744,
    0.765,
    128
  );
  const green_field_border = new THREE.Mesh(
    green_field_borderGeom,
    green_field_borderMat
  );
  green_field_border.name = "green_field_border";
  green_field_border.position.z = 0.035;
  target_markings.add(green_field_border);

  const outer_scoring_ringMat = green_field_borderMat;
  const outer_scoring_ringGeom = new THREE.RingGeometry(
    0.545,
    0.558,
    128
  );
  const outer_scoring_ring = new THREE.Mesh(
    outer_scoring_ringGeom,
    outer_scoring_ringMat
  );
  outer_scoring_ring.name = "outer_scoring_ring";
  outer_scoring_ring.position.z = 0.036;
  target_markings.add(outer_scoring_ring);

  const inner_scoring_ringMat = green_field_borderMat;
  const inner_scoring_ringGeom = new THREE.RingGeometry(
    0.355,
    0.368,
    128
  );
  const inner_scoring_ring = new THREE.Mesh(
    inner_scoring_ringGeom,
    inner_scoring_ringMat
  );
  inner_scoring_ring.name = "inner_scoring_ring";
  inner_scoring_ring.position.z = 0.036;
  target_markings.add(inner_scoring_ring);

  const red_bullseye_borderMat = green_field_borderMat;
  const red_bullseye_borderGeom = new THREE.RingGeometry(
    0.177,
    0.188,
    96
  );
  const red_bullseye_border = new THREE.Mesh(
    red_bullseye_borderGeom,
    red_bullseye_borderMat
  );
  red_bullseye_border.name = "red_bullseye_border";
  red_bullseye_border.position.z = 0.037;
  target_markings.add(red_bullseye_border);

  const red_bullseyeGeom = new THREE.CircleGeometry(0.178, 96);
  const red_bullseye = new THREE.Mesh(
    red_bullseyeGeom,
    red_bullseyeMat
  );
  red_bullseye.name = "red_bullseye";
  red_bullseye.position.z = 0.039;
  target_markings.add(red_bullseye);

  const guide_lineMat = green_scoring_fieldMat;

  const top_guide_lineGeom = new THREE.BoxGeometry(
    0.012,
    0.205,
    0.004
  );
  const top_guide_line = new THREE.Mesh(
    top_guide_lineGeom,
    guide_lineMat
  );
  top_guide_line.name = "top_guide_line";
  top_guide_line.position.set(0, 0.855, 0.034);
  target_markings.add(top_guide_line);

  const bottom_guide_lineGeom = top_guide_lineGeom;
  const bottom_guide_line = new THREE.Mesh(
    bottom_guide_lineGeom,
    guide_lineMat
  );
  bottom_guide_line.name = "bottom_guide_line";
  bottom_guide_line.position.set(0, -0.855, 0.034);
  target_markings.add(bottom_guide_line);

  const left_guide_lineGeom = new THREE.BoxGeometry(
    0.205,
    0.012,
    0.004
  );
  const left_guide_line = new THREE.Mesh(
    left_guide_lineGeom,
    guide_lineMat
  );
  left_guide_line.name = "left_guide_line";
  left_guide_line.position.set(-0.855, 0, 0.034);
  target_markings.add(left_guide_line);

  const right_guide_lineGeom = left_guide_lineGeom;
  const right_guide_line = new THREE.Mesh(
    right_guide_lineGeom,
    guide_lineMat
  );
  right_guide_line.name = "right_guide_line";
  right_guide_line.position.set(0.855, 0, 0.034);
  target_markings.add(right_guide_line);

  const scoring_swooshMat = green_field_borderMat;
  const scoring_swooshPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.285, 0.185, 0.039),
      new THREE.Vector3(0.335, 0.105, 0.039),
      new THREE.Vector3(0.375, -0.015, 0.039),
      new THREE.Vector3(0.397, -0.145, 0.039),
      new THREE.Vector3(0.425, -0.255, 0.039)
    ],
    false,
    "centripetal"
  );
  const scoring_swooshGeom = new THREE.TubeGeometry(
    scoring_swooshPath,
    24,
    0.0045,
    6,
    false
  );
  const scoring_swoosh = new THREE.Mesh(
    scoring_swooshGeom,
    scoring_swooshMat
  );
  scoring_swoosh.name = "scoring_swoosh";
  target_markings.add(scoring_swoosh);

  const scoring_numbersMat = green_field_borderMat;
  const scoring_numbers = new THREE.Group();
  scoring_numbers.name = "scoring_numbers";
  target_markings.add(scoring_numbers);

  const number_horizontal_strokeGeom = new THREE.BoxGeometry(
    0.044,
    0.009,
    0.006
  );
  const number_vertical_strokeGeom = new THREE.BoxGeometry(
    0.009,
    0.047,
    0.006
  );
  const number_diagonal_strokeGeom = new THREE.BoxGeometry(
    0.009,
    0.052,
    0.006
  );
  const number_top_barGeom = new THREE.BoxGeometry(
    0.052,
    0.009,
    0.006
  );
  const number_bottom_barGeom = new THREE.BoxGeometry(
    0.047,
    0.009,
    0.006
  );

  function addNumberStroke(
    parent,
    geometry,
    x,
    y,
    rotation,
    lengthScale
  ) {
    const stroke = new THREE.Mesh(
      geometry,
      scoring_numbersMat
    );
    stroke.position.set(x, y, 0);
    stroke.rotation.z = rotation;
    stroke.scale.y = lengthScale;
    parent.add(stroke);
    return stroke;
  }

  const number_one = new THREE.Group();
  number_one.name = "number_one";
  number_one.position.set(0, 0.645, 0.043);
  scoring_numbers.add(number_one);

  const number_one_stem = addNumberStroke(
    number_one,
    number_vertical_strokeGeom,
    0.006,
    0,
    0,
    2.0
  );
  number_one_stem.name = "number_one_stem";

  const number_one_top = addNumberStroke(
    number_one,
    number_diagonal_strokeGeom,
    -0.008,
    0.047,
    -0.58,
    0.52
  );
  number_one_top.name = "number_one_top";

  const number_one_base = addNumberStroke(
    number_one,
    number_horizontal_strokeGeom,
    0.004,
    -0.101,
    0,
    1.0
  );
  number_one_base.name = "number_one_base";

  const number_two = new THREE.Group();
  number_two.name = "number_two";
  number_two.position.set(0, 0.455, 0.043);
  scoring_numbers.add(number_two);

  const number_two_top = addNumberStroke(
    number_two,
    number_top_barGeom,
    0,
    0.052,
    0,
    1.0
  );
  number_two_top.name = "number_two_top";

  const number_two_upper_right = addNumberStroke(
    number_two,
    number_vertical_strokeGeom,
    0.022,
    0.028,
    0,
    0.9
  );
  number_two_upper_right.name = "number_two_upper_right";

  const number_two_diagonal = addNumberStroke(
    number_two,
    number_diagonal_strokeGeom,
    0,
    0.002,
    -0.78,
    0.95
  );
  number_two_diagonal.name = "number_two_diagonal";

  const number_two_bottom = addNumberStroke(
    number_two,
    number_bottom_barGeom,
    0,
    -0.055,
    0,
    1.0
  );
  number_two_bottom.name = "number_two_bottom";

  const number_three = new THREE.Group();
  number_three.name = "number_three";
  number_three.position.set(0, -0.475, 0.043);
  scoring_numbers.add(number_three);

  const number_three_top = addNumberStroke(
    number_three,
    number_top_barGeom,
    0,
    0.052,
    0,
    1.0
  );
  number_three_top.name = "number_three_top";

  const number_three_middle = addNumberStroke(
    number_three,
    number_horizontal_strokeGeom,
    0.003,
    0,
    0,
    0.95
  );
  number_three_middle.name = "number_three_middle";

  const number_three_bottom = addNumberStroke(
    number_three,
    number_bottom_barGeom,
    0,
    -0.052,
    0,
    1.0
  );
  number_three_bottom.name = "number_three_bottom";

  const number_three_upper_right = addNumberStroke(
    number_three,
    number_vertical_strokeGeom,
    0.022,
    0.027,
    0,
    0.9
  );
  number_three_upper_right.name = "number_three_upper_right";

  const number_three_lower_right = addNumberStroke(
    number_three,
    number_vertical_strokeGeom,
    0.022,
    -0.027,
    0,
    0.9
  );
  number_three_lower_right.name = "number_three_lower_right";

  const number_zeroGeom = new THREE.TorusGeometry(
    0.035,
    0.006,
    8,
    32
  );
  const number_zero = new THREE.Mesh(
    number_zeroGeom,
    scoring_numbersMat
  );
  number_zero.name = "number_zero";
  number_zero.position.set(0, -0.675, 0.043);
  number_zero.scale.set(0.72, 1.72, 1);
  scoring_numbers.add(number_zero);

  const outer_metal_rimGeom = new THREE.TorusGeometry(
    0.985,
    0.014,
    12,
    128
  );
  const outer_metal_rim = new THREE.Mesh(
    outer_metal_rimGeom,
    outer_metal_rimMat
  );
  outer_metal_rim.name = "outer_metal_rim";
  outer_metal_rim.position.z = 0.038;
  metal_frame.add(outer_metal_rim);

  const rim_clipsGeom = new THREE.TorusGeometry(
    0.033,
    0.0055,
    8,
    24
  );
  const rim_clip_angles = [
    0.02,
    0.68,
    1.47,
    2.38,
    3.12,
    3.82,
    4.55,
    5.48
  ];
  const rim_clips = new THREE.InstancedMesh(
    rim_clipsGeom,
    rim_clipsMat,
    rim_clip_angles.length
  );
  rim_clips.name = "rim_clips";

  const rim_clip_dummy = new THREE.Object3D();
  for (let i = 0; i < rim_clip_angles.length; i++) {
    const angle = rim_clip_angles[i];
    rim_clip_dummy.position.set(
      Math.cos(angle) * 0.985,
      Math.sin(angle) * 0.985,
      0.044
    );
    rim_clip_dummy.rotation.set(
      0,
      0,
      angle - Math.PI / 2
    );
    rim_clip_dummy.scale.set(0.62, 1.15, 1);
    rim_clip_dummy.updateMatrix();
    rim_clips.setMatrixAt(i, rim_clip_dummy.matrix);
  }
  rim_clips.instanceMatrix.needsUpdate = true;
  metal_frame.add(rim_clips);

  const rim_collar_sleevesGeom = new THREE.CylinderGeometry(
    0.019,
    0.019,
    0.075,
    12
  );
  const rim_collar_indices = [0, 2, 3, 5, 6, 7];
  const rim_collar_sleeves = new THREE.InstancedMesh(
    rim_collar_sleevesGeom,
    rim_collar_sleevesMat,
    rim_collar_indices.length
  );
  rim_collar_sleeves.name = "rim_collar_sleeves";

  const rim_collar_dummy = new THREE.Object3D();
  const collar_axis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < rim_collar_indices.length; i++) {
    const angle = rim_clip_angles[rim_collar_indices[i]];
    const tangent = new THREE.Vector3(
      -Math.sin(angle),
      Math.cos(angle),
      0
    );
    rim_collar_dummy.position.set(
      Math.cos(angle) * 0.985,
      Math.sin(angle) * 0.985,
      0.041
    );
    rim_collar_dummy.quaternion.setFromUnitVectors(
      collar_axis,
      tangent
    );
    rim_collar_dummy.scale.set(1, 1, 1);
    rim_collar_dummy.updateMatrix();
    rim_collar_sleeves.setMatrixAt(
      i,
      rim_collar_dummy.matrix
    );
  }
  rim_collar_sleeves.instanceMatrix.needsUpdate = true;
  metal_frame.add(rim_collar_sleeves);

  function fitToUnitCube(THREE, root) {
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

  fitToUnitCube(THREE, target_board);
  return target_board;
}
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "analog_dial_gauge";

  const casing_group = new THREE.Group();
  casing_group.name = "casing_group";
  root.add(casing_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const pointer_group = new THREE.Group();
  pointer_group.name = "pointer_group";
  root.add(pointer_group);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.6,
    roughness: 0.5
  });
  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xc6a35a,
    metalness: 0.6,
    roughness: 0.2
  });
  const dark_brassMat = new THREE.MeshStandardMaterial({
    color: 0x725326,
    metalness: 0.5,
    roughness: 0.5
  });
  const dial_faceMat = new THREE.MeshStandardMaterial({
    color: 0x101216,
    metalness: 0.0,
    roughness: 0.8
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0eb,
    metalness: 0.0,
    roughness: 0.7
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const dark_detailMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    depthWrite: false
  });

  const casing_bodyGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.24, 64);
  const casing_body = new THREE.Mesh(casing_bodyGeom, brassMat);
  casing_body.name = "casing_body";
  casing_body.rotation.x = Math.PI / 2;
  casing_body.position.z = -0.02;
  casing_group.add(casing_body);

  const rear_capGeom = new THREE.CylinderGeometry(0.96, 0.96, 0.035, 64);
  const rear_cap = new THREE.Mesh(rear_capGeom, dark_brassMat);
  rear_cap.name = "rear_cap";
  rear_cap.rotation.x = Math.PI / 2;
  rear_cap.position.z = -0.147;
  casing_group.add(rear_cap);

  const casing_side_bandGeom = new THREE.TorusGeometry(0.965, 0.035, 12, 64);
  const casing_side_band = new THREE.Mesh(casing_side_bandGeom, dark_brassMat);
  casing_side_band.name = "casing_side_band";
  casing_side_band.position.z = -0.105;
  casing_group.add(casing_side_band);

  const bezel_faceGeom = new THREE.RingGeometry(0.855, 1.0, 64);
  const bezel_face = new THREE.Mesh(bezel_faceGeom, polished_brassMat);
  bezel_face.name = "bezel_face";
  bezel_face.position.z = 0.108;
  casing_group.add(bezel_face);

  const outer_bezelGeom = new THREE.TorusGeometry(0.94, 0.065, 16, 64);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, polished_brassMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.11;
  casing_group.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.872, 0.018, 12, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, dark_brassMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.135;
  casing_group.add(inner_bezel);

  const dial_faceGeom = new THREE.CylinderGeometry(0.86, 0.86, 0.025, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dial_faceMat);
  dial_face.name = "dial_face";
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.105;
  dial_group.add(dial_face);

  const minor_ticksGeom = new THREE.BoxGeometry(0.011, 0.075, 0.008);
  const minor_ticks = new THREE.InstancedMesh(minor_ticksGeom, markingMat, 48);
  minor_ticks.name = "minor_ticks";

  const medium_ticksGeom = new THREE.BoxGeometry(0.014, 0.115, 0.008);
  const medium_ticks = new THREE.InstancedMesh(medium_ticksGeom, markingMat, 12);
  medium_ticks.name = "medium_ticks";

  const major_ticksGeom = new THREE.BoxGeometry(0.026, 0.18, 0.009);
  const major_ticks = new THREE.InstancedMesh(major_ticksGeom, markingMat, 12);
  major_ticks.name = "major_ticks";

  const tick_dummy = new THREE.Object3D();
  let minor_index = 0;
  let medium_index = 0;
  let major_index = 0;

  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    let mesh;
    let index;
    let length;

    if (i % 6 === 0) {
      mesh = major_ticks;
      index = major_index++;
      length = 0.18;
    } else if (i % 3 === 0) {
      mesh = medium_ticks;
      index = medium_index++;
      length = 0.115;
    } else {
      mesh = minor_ticks;
      index = minor_index++;
      length = 0.075;
    }

    const radius = 0.80 - length / 2;
    tick_dummy.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.124
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, 1, 1);
    tick_dummy.updateMatrix();
    mesh.setMatrixAt(index, tick_dummy.matrix);
  }

  minor_ticks.instanceMatrix.needsUpdate = true;
  medium_ticks.instanceMatrix.needsUpdate = true;
  major_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ticks, medium_ticks, major_ticks);

  const digit_horizontalGeom = new THREE.BoxGeometry(0.068, 0.014, 0.008);
  const digit_verticalGeom = new THREE.BoxGeometry(0.014, 0.055, 0.008);

  const segment_positions = {
    a: [0, 0.058, false],
    b: [0.036, 0.029, true],
    c: [0.036, -0.029, true],
    d: [0, -0.058, false],
    e: [-0.036, -0.029, true],
    f: [-0.036, 0.029, true],
    g: [0, 0, false]
  };

  const digit_segments = {
    1: ["b", "c"],
    2: ["a", "b", "g", "e", "d"],
    3: ["a", "b", "g", "c", "d"]
  };

  function createDigit(value, name) {
    const digit = new THREE.Group();
    digit.name = name;
    const active_segments = digit_segments[value];

    for (const segment_name of active_segments) {
      const spec = segment_positions[segment_name];
      const digit_segment = new THREE.Mesh(
        spec[2] ? digit_verticalGeom : digit_horizontalGeom,
        markingMat
      );
      digit_segment.name = name + "_" + segment_name;
      digit_segment.position.set(spec[0], spec[1], 0);
      digit.add(digit_segment);
    }
    return digit;
  }

  function placeLabel(label, angle) {
    const radius = 0.66;
    label.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.13
    );
    label.rotation.z = -angle;
    dial_group.add(label);
  }

  const top_right_digit_1 = createDigit(1, "top_right_digit_1");
  const top_right_digit_2 = createDigit(2, "top_right_digit_2");
  const top_right_label_12 = new THREE.Group();
  top_right_label_12.name = "top_right_label_12";
  top_right_digit_1.position.x = -0.048;
  top_right_digit_2.position.x = 0.048;
  top_right_label_12.add(top_right_digit_1, top_right_digit_2);
  placeLabel(top_right_label_12, 0.34);

  const right_digit_3 = createDigit(3, "right_digit_3");
  const right_label_3 = new THREE.Group();
  right_label_3.name = "right_label_3";
  right_label_3.add(right_digit_3);
  placeLabel(right_label_3, 0.88);

  const bottom_digit_2 = createDigit(2, "bottom_digit_2");
  const bottom_label_2 = new THREE.Group();
  bottom_label_2.name = "bottom_label_2";
  bottom_label_2.add(bottom_digit_2);
  placeLabel(bottom_label_2, -0.32);

  const left_digit_1 = createDigit(1, "left_digit_1");
  const left_digit_6 = createDigit(3, "left_digit_6");
  left_digit_6.scale.set(1, -1, 1);
  const left_label_16 = new THREE.Group();
  left_label_16.name = "left_label_16";
  left_digit_1.position.x = -0.048;
  left_digit_6.position.x = 0.048;
  left_label_16.add(left_digit_1, left_digit_6);
  placeLabel(left_label_16, -0.92);

  const long_needleShape = new THREE.Shape();
  long_needleShape.moveTo(-0.038, -0.045);
  long_needleShape.lineTo(0.038, -0.045);
  long_needleShape.lineTo(0.027, 0.43);
  long_needleShape.lineTo(0.014, 0.70);
  long_needleShape.lineTo(0, 0.79);
  long_needleShape.lineTo(-0.014, 0.70);
  long_needleShape.lineTo(-0.027, 0.43);
  long_needleShape.closePath();

  const long_needleGeom = new THREE.ExtrudeGeometry(long_needleShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.003,
    bevelSegments: 2
  });
  const long_needle = new THREE.Mesh(long_needleGeom, silverMat);
  long_needle.name = "long_needle";
  long_needle.position.z = 0.133;
  long_needle.rotation.z = 2.28;
  pointer_group.add(long_needle);

  const short_counterweightShape = new THREE.Shape();
  short_counterweightShape.moveTo(-0.032, -0.035);
  short_counterweightShape.lineTo(0.032, -0.035);
  short_counterweightShape.lineTo(0.038, 0.27);
  short_counterweightShape.quadraticCurveTo(0.04, 0.31, 0.085, 0.33);
  short_counterweightShape.lineTo(0.13, 0.37);
  short_counterweightShape.quadraticCurveTo(0.15, 0.41, 0.11, 0.45);
  short_counterweightShape.lineTo(0.04, 0.49);
  short_counterweightShape.quadraticCurveTo(0, 0.52, -0.04, 0.49);
  short_counterweightShape.lineTo(-0.11, 0.45);
  short_counterweightShape.quadraticCurveTo(-0.15, 0.41, -0.13, 0.37);
  short_counterweightShape.lineTo(-0.085, 0.33);
  short_counterweightShape.quadraticCurveTo(-0.04, 0.31, -0.038, 0.27);
  short_counterweightShape.closePath();

  const short_counterweight_hole = new THREE.Path();
  short_counterweight_hole.absellipse(
    0,
    0.405,
    0.045,
    0.032,
    0,
    Math.PI * 2,
    true,
    0
  );
  short_counterweightShape.holes.push(short_counterweight_hole);

  const short_counterweightGeom = new THREE.ExtrudeGeometry(
    short_counterweightShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.003,
      bevelSegments: 2
    }
  );
  const short_counterweight = new THREE.Mesh(
    short_counterweightGeom,
    silverMat
  );
  short_counterweight.name = "short_counterweight";
  short_counterweight.position.z = 0.134;
  short_counterweight.rotation.z = -0.72;
  pointer_group.add(short_counterweight);

  const center_hub_baseGeom = new THREE.CylinderGeometry(
    0.105,
    0.105,
    0.032,
    32
  );
  const center_hub_base = new THREE.Mesh(
    center_hub_baseGeom,
    dark_detailMat
  );
  center_hub_base.name = "center_hub_base";
  center_hub_base.rotation.x = Math.PI / 2;
  center_hub_base.position.z = 0.151;
  pointer_group.add(center_hub_base);

  const center_hubGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.026, 32);
  const center_hub = new THREE.Mesh(center_hubGeom, polished_silverMat);
  center_hub.name = "center_hub";
  center_hub.rotation.x = Math.PI / 2;
  center_hub.position.z = 0.168;
  pointer_group.add(center_hub);

  const center_hub_ringGeom = new THREE.TorusGeometry(0.068, 0.009, 10, 32);
  const center_hub_ring = new THREE.Mesh(
    center_hub_ringGeom,
    dark_detailMat
  );
  center_hub_ring.name = "center_hub_ring";
  center_hub_ring.position.z = 0.184;
  pointer_group.add(center_hub_ring);

  const center_pinGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.022, 24);
  const center_pin = new THREE.Mesh(center_pinGeom, polished_silverMat);
  center_pin.name = "center_pin";
  center_pin.rotation.x = Math.PI / 2;
  center_pin.position.z = 0.19;
  pointer_group.add(center_pin);

  const glass_coverGeom = new THREE.CylinderGeometry(
    0.846,
    0.846,
    0.006,
    64
  );
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.rotation.x = Math.PI / 2;
  glass_cover.position.z = 0.207;
  casing_group.add(glass_cover);

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
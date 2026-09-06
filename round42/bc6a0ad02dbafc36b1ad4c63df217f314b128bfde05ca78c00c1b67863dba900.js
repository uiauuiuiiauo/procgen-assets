export default function generate(THREE) {
  const root = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a32,
    metalness: 0.6,
    roughness: 0.2,
  });
  const aged_brassMat = new THREE.MeshStandardMaterial({
    color: 0x806426,
    metalness: 0.5,
    roughness: 0.45,
  });
  const brushed_steelMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.35,
  });
  const black_printMat = new THREE.MeshStandardMaterial({
    color: 0x171713,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dial_faceMat = new THREE.MeshStandardMaterial({
    color: 0xe8e0bd,
    metalness: 0.0,
    roughness: 0.9,
  });
  const dial_stainMat = new THREE.MeshStandardMaterial({
    color: 0xb49b58,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.14,
    side: THREE.DoubleSide,
  });
  const red_indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x7d1117,
    metalness: 0.0,
    roughness: 0.3,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7eeee,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });

  const base_plateGeom = new THREE.CylinderGeometry(0.82, 0.85, 0.12, 64);
  const base_plate = new THREE.Mesh(base_plateGeom, aged_brassMat);
  base_plate.position.y = 0.06;
  root.add(base_plate);

  const base_topGeom = new THREE.CylinderGeometry(0.78, 0.81, 0.055, 64);
  const base_top = new THREE.Mesh(base_topGeom, brassMat);
  base_top.position.y = 0.145;
  root.add(base_top);

  const base_edgeGeom = new THREE.TorusGeometry(0.81, 0.025, 10, 64);
  const base_edge = new THREE.Mesh(base_edgeGeom, brassMat);
  base_edge.rotation.x = Math.PI / 2;
  base_edge.position.y = 0.07;
  root.add(base_edge);

  const support_footGeom = new THREE.CylinderGeometry(0.34, 0.37, 0.12, 48);
  const support_foot = new THREE.Mesh(support_footGeom, dark_metalMat);
  support_foot.position.y = 0.22;
  root.add(support_foot);

  const support_ringGeom = new THREE.TorusGeometry(0.32, 0.025, 10, 48);
  const support_ring = new THREE.Mesh(support_ringGeom, brassMat);
  support_ring.rotation.x = Math.PI / 2;
  support_ring.position.y = 0.275;
  root.add(support_ring);

  const gauge_bodyGeom = new THREE.CylinderGeometry(0.60, 0.60, 0.18, 64);
  const gauge_body = new THREE.Mesh(gauge_bodyGeom, aged_brassMat);
  gauge_body.rotation.x = Math.PI / 2;
  gauge_body.position.y = 0.76;
  root.add(gauge_body);

  const gauge_back_ringGeom = new THREE.TorusGeometry(0.535, 0.065, 12, 64);
  const gauge_back_ring = new THREE.Mesh(gauge_back_ringGeom, aged_brassMat);
  gauge_back_ring.position.set(0, 0.76, -0.055);
  root.add(gauge_back_ring);

  const dial_faceGeom = new THREE.CircleGeometry(0.49, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dial_faceMat);
  dial_face.position.set(0, 0.76, 0.101);
  root.add(dial_face);

  const outer_bezelGeom = new THREE.TorusGeometry(0.535, 0.062, 14, 64);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, brassMat);
  outer_bezel.position.set(0, 0.76, 0.13);
  root.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.474, 0.012, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, aged_brassMat);
  inner_bezel.position.set(0, 0.76, 0.126);
  root.add(inner_bezel);

  const dial_stainGeom = new THREE.CircleGeometry(0.022, 12);
  const dial_stains = new THREE.InstancedMesh(dial_stainGeom, dial_stainMat, 8);
  const stain_positions = [
    [-0.29, 0.20, 1.0, 0.55],
    [0.25, 0.25, 0.65, 1.15],
    [-0.31, -0.12, 0.75, 0.45],
    [0.28, -0.19, 1.15, 0.60],
    [-0.13, -0.31, 0.55, 0.85],
    [0.12, 0.08, 0.45, 0.45],
    [0.08, 0.35, 0.60, 0.35],
    [-0.05, 0.27, 0.35, 0.65],
  ];
  const stain_dummy = new THREE.Object3D();
  for (let i = 0; i < stain_positions.length; i++) {
    const spec = stain_positions[i];
    stain_dummy.position.set(spec[0], 0.76 + spec[1], 0.106);
    stain_dummy.scale.set(spec[2], spec[3], 1);
    stain_dummy.updateMatrix();
    dial_stains.setMatrixAt(i, stain_dummy.matrix);
  }
  dial_stains.instanceMatrix.needsUpdate = true;
  root.add(dial_stains);

  const dial_scale_ringGeom = new THREE.RingGeometry(0.438, 0.444, 64);
  const dial_scale_ring = new THREE.Mesh(dial_scale_ringGeom, black_printMat);
  dial_scale_ring.position.set(0, 0.76, 0.109);
  root.add(dial_scale_ring);

  const minor_ticksGeom = new THREE.BoxGeometry(0.006, 0.038, 0.004);
  const minor_ticks = new THREE.InstancedMesh(minor_ticksGeom, black_printMat, 50);
  const major_ticksGeom = new THREE.BoxGeometry(0.012, 0.070, 0.005);
  const major_ticks = new THREE.InstancedMesh(major_ticksGeom, black_printMat, 10);
  const tick_dummy = new THREE.Object3D();
  let minor_index = 0;
  let major_index = 0;

  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    const is_major = i % 6 === 0;
    const radius = is_major ? 0.425 : 0.443;
    tick_dummy.position.set(
      Math.sin(angle) * radius,
      0.76 + Math.cos(angle) * radius,
      0.113
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, 1, 1);
    tick_dummy.updateMatrix();
    if (is_major) {
      major_ticks.setMatrixAt(major_index++, tick_dummy.matrix);
    } else {
      minor_ticks.setMatrixAt(minor_index++, tick_dummy.matrix);
    }
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  major_ticks.instanceMatrix.needsUpdate = true;
  root.add(minor_ticks, major_ticks);

  const digit_segments = [
    [0, 1, 2, 3, 4, 5],
    [1, 2],
    [0, 1, 6, 4, 3],
    [0, 1, 2, 3, 6],
    [5, 6, 1, 2],
    [0, 5, 6, 2, 3],
    [0, 5, 6, 4, 3, 2],
    [0, 1, 2],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 5, 6],
  ];
  const segment_defs = [
    [0, 0.026, 0],
    [0.014, 0.013, Math.PI / 2],
    [0.014, -0.013, Math.PI / 2],
    [0, -0.026, 0],
    [-0.014, -0.013, Math.PI / 2],
    [-0.014, 0.013, Math.PI / 2],
    [0, 0, 0],
  ];
  const label_values = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45];
  const numeral_specs = [];

  for (let i = 0; i < label_values.length; i++) {
    const angle = i / label_values.length * Math.PI * 2;
    const center_x = Math.sin(angle) * 0.335;
    const center_y = 0.76 + Math.cos(angle) * 0.335;
    const text = String(label_values[i]);

    for (let d = 0; d < text.length; d++) {
      const digit = Number(text[d]);
      const digit_x = center_x + (d - (text.length - 1) / 2) * 0.039;
      const active_segments = digit_segments[digit];
      for (let s = 0; s < active_segments.length; s++) {
        const def = segment_defs[active_segments[s]];
        numeral_specs.push([
          digit_x + def[0],
          center_y + def[1],
          def[2],
        ]);
      }
    }
  }

  const dial_numeralsGeom = new THREE.BoxGeometry(0.025, 0.0045, 0.004);
  const dial_numerals = new THREE.InstancedMesh(
    dial_numeralsGeom,
    black_printMat,
    numeral_specs.length
  );
  const numeral_dummy = new THREE.Object3D();
  for (let i = 0; i < numeral_specs.length; i++) {
    const spec = numeral_specs[i];
    numeral_dummy.position.set(spec[0], spec[1], 0.114);
    numeral_dummy.rotation.set(0, 0, spec[2]);
    numeral_dummy.updateMatrix();
    dial_numerals.setMatrixAt(i, numeral_dummy.matrix);
  }
  dial_numerals.instanceMatrix.needsUpdate = true;
  root.add(dial_numerals);

  const red_indicatorGeom = new THREE.SphereGeometry(0.026, 20, 12);
  const red_indicator = new THREE.Mesh(red_indicatorGeom, red_indicatorMat);
  red_indicator.position.set(0.018, 1.005, 0.126);
  red_indicator.scale.set(1, 1, 0.35);
  root.add(red_indicator);

  const maker_markGeom = new THREE.BoxGeometry(0.055, 0.007, 0.004);
  const maker_mark = new THREE.Mesh(maker_markGeom, red_indicatorMat);
  maker_mark.position.set(0.105, 0.995, 0.116);
  root.add(maker_mark);

  const lower_screwGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.014, 20);
  const lower_screw = new THREE.Mesh(lower_screwGeom, black_printMat);
  lower_screw.rotation.x = Math.PI / 2;
  lower_screw.position.set(0.01, 0.48, 0.12);
  root.add(lower_screw);

  const needleShape = new THREE.Shape();
  needleShape.moveTo(-0.016, -0.045);
  needleShape.lineTo(0.016, -0.045);
  needleShape.lineTo(0.010, 0.285);
  needleShape.lineTo(0, 0.355);
  needleShape.lineTo(-0.010, 0.285);
  needleShape.lineTo(-0.016, -0.045);

  const gauge_needleGeom = new THREE.ShapeGeometry(needleShape);
  const gauge_needle = new THREE.Mesh(gauge_needleGeom, black_printMat);
  const needle_angle = 2.25;
  gauge_needle.position.set(0, 0.76, 0.124);
  gauge_needle.rotation.z = -needle_angle;
  root.add(gauge_needle);

  const needle_hubGeom = new THREE.CylinderGeometry(0.066, 0.066, 0.026, 28);
  const needle_hub = new THREE.Mesh(needle_hubGeom, dark_metalMat);
  needle_hub.rotation.x = Math.PI / 2;
  needle_hub.position.set(0, 0.76, 0.132);
  root.add(needle_hub);

  const needle_hub_capGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.031, 24);
  const needle_hub_cap = new THREE.Mesh(needle_hub_capGeom, brassMat);
  needle_hub_cap.rotation.x = Math.PI / 2;
  needle_hub_cap.position.set(0, 0.76, 0.141);
  root.add(needle_hub_cap);

  const needle_hub_pinGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.035, 16);
  const needle_hub_pin = new THREE.Mesh(needle_hub_pinGeom, polished_metalMat);
  needle_hub_pin.rotation.x = Math.PI / 2;
  needle_hub_pin.position.set(0, 0.76, 0.148);
  root.add(needle_hub_pin);

  const dial_glassGeom = new THREE.CircleGeometry(0.465, 64);
  const dial_glass = new THREE.Mesh(dial_glassGeom, glassMat);
  dial_glass.position.set(0, 0.76, 0.157);
  root.add(dial_glass);

  const stem_base_flangeGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.07, 40);
  const stem_base_flange = new THREE.Mesh(stem_base_flangeGeom, brassMat);
  stem_base_flange.position.y = 1.365;
  root.add(stem_base_flange);

  const stem_base_ringGeom = new THREE.TorusGeometry(0.105, 0.022, 10, 40);
  const stem_base_ring = new THREE.Mesh(stem_base_ringGeom, aged_brassMat);
  stem_base_ring.rotation.x = Math.PI / 2;
  stem_base_ring.position.y = 1.405;
  root.add(stem_base_ring);

  const lower_glass_tubeGeom = new THREE.CylinderGeometry(0.052, 0.052, 1.18, 32);
  const lower_glass_tube = new THREE.Mesh(lower_glass_tubeGeom, glassMat);
  lower_glass_tube.position.y = 1.96;
  root.add(lower_glass_tube);

  const lower_tube_highlightGeom = new THREE.CylinderGeometry(0.006, 0.006, 1.10, 8);
  const lower_tube_highlight = new THREE.Mesh(lower_tube_highlightGeom, polished_metalMat);
  lower_tube_highlight.position.set(-0.032, 1.96, 0.035);
  root.add(lower_tube_highlight);

  const lower_tube_dustGeom = new THREE.CylinderGeometry(0.009, 0.014, 0.10, 10);
  const lower_tube_dust = new THREE.Mesh(lower_tube_dustGeom, aged_brassMat);
  lower_tube_dust.position.y = 1.47;
  root.add(lower_tube_dust);

  const stem_transition_collarGeom = new THREE.CylinderGeometry(0.061, 0.061, 0.055, 28);
  const stem_transition_collar = new THREE.Mesh(stem_transition_collarGeom, polished_metalMat);
  stem_transition_collar.position.y = 2.545;
  root.add(stem_transition_collar);

  const upper_metal_stemGeom = new THREE.CylinderGeometry(0.047, 0.047, 1.65, 32);
  const upper_metal_stem = new THREE.Mesh(upper_metal_stemGeom, brushed_steelMat);
  upper_metal_stem.position.y = 3.365;
  root.add(upper_metal_stem);

  const upper_stem_reflectionGeom = new THREE.CylinderGeometry(0.005, 0.005, 1.55, 8);
  const upper_stem_reflection = new THREE.Mesh(upper_stem_reflectionGeom, polished_metalMat);
  upper_stem_reflection.position.set(-0.027, 3.365, 0.039);
  root.add(upper_stem_reflection);

  const stem_top_collarGeom = new THREE.CylinderGeometry(0.035, 0.075, 0.14, 28);
  const stem_top_collar = new THREE.Mesh(stem_top_collarGeom, dark_metalMat);
  stem_top_collar.position.y = 4.19;
  root.add(stem_top_collar);

  const probe_glass_tubeGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.70, 28);
  const probe_glass_tube = new THREE.Mesh(probe_glass_tubeGeom, glassMat);
  probe_glass_tube.position.y = 4.59;
  root.add(probe_glass_tube);

  const probe_tube_highlightGeom = new THREE.CylinderGeometry(0.004, 0.004, 0.64, 8);
  const probe_tube_highlight = new THREE.Mesh(probe_tube_highlightGeom, polished_metalMat);
  probe_tube_highlight.position.set(-0.014, 4.59, 0.023);
  root.add(probe_tube_highlight);

  const probe_inner_wireGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.18, 8);
  const probe_inner_wire = new THREE.Mesh(probe_inner_wireGeom, dark_metalMat);
  probe_inner_wire.position.y = 4.84;
  root.add(probe_inner_wire);

  const probe_tipGeom = new THREE.SphereGeometry(0.032, 20, 12);
  const probe_tip = new THREE.Mesh(probe_tipGeom, polished_metalMat);
  probe_tip.position.y = 4.94;
  probe_tip.scale.set(0.9, 1.2, 0.9);
  root.add(probe_tip);

  const probe_tip_openingGeom = new THREE.SphereGeometry(0.010, 12, 8);
  const probe_tip_opening = new THREE.Mesh(probe_tip_openingGeom, black_printMat);
  probe_tip_opening.position.set(0, 4.95, 0.029);
  probe_tip_opening.scale.set(0.8, 1.1, 0.35);
  root.add(probe_tip_opening);

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
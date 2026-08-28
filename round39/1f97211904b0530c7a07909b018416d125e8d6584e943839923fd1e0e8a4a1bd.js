export default function generate(THREE) {
  const root = new THREE.Group();
  const compass_assembly = new THREE.Group();
  root.add(compass_assembly);

  const aged_brassMat = new THREE.MeshStandardMaterial({
    color: 0xb6a16f,
    metalness: 0.5,
    roughness: 0.5,
  });
  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xc9b88a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_brassMat = new THREE.MeshStandardMaterial({
    color: 0x74684d,
    metalness: 0.5,
    roughness: 0.5,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xe8e9e2,
    metalness: 0.0,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const scale_bandMat = new THREE.MeshStandardMaterial({
    color: 0xdeddd0,
    metalness: 0.0,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x252a2c,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const gray_inkMat = new THREE.MeshStandardMaterial({
    color: 0x777b79,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const red_paintMat = new THREE.MeshStandardMaterial({
    color: 0xa63d45,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const glass_coverMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde7e8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const outer_caseGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.18, 64);
  const outer_case = new THREE.Mesh(outer_caseGeom, aged_brassMat);
  outer_case.rotation.x = Math.PI / 2;
  outer_case.position.z = -0.04;
  compass_assembly.add(outer_case);

  const rear_backplateGeom = new THREE.CylinderGeometry(0.965, 0.965, 0.055, 64);
  const rear_backplate = new THREE.Mesh(rear_backplateGeom, dark_brassMat);
  rear_backplate.rotation.x = Math.PI / 2;
  rear_backplate.position.z = -0.135;
  compass_assembly.add(rear_backplate);

  const rear_edgeGeom = new THREE.TorusGeometry(0.93, 0.055, 12, 64);
  const rear_edge = new THREE.Mesh(rear_edgeGeom, dark_brassMat);
  rear_edge.position.z = -0.13;
  compass_assembly.add(rear_edge);

  const dial_faceGeom = new THREE.CircleGeometry(0.868, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.position.z = 0.056;
  compass_assembly.add(dial_face);

  const degree_bandGeom = new THREE.RingGeometry(0.685, 0.842, 64);
  const degree_band = new THREE.Mesh(degree_bandGeom, scale_bandMat);
  degree_band.position.z = 0.064;
  compass_assembly.add(degree_band);

  const inner_scale_bandGeom = new THREE.RingGeometry(0.602, 0.674, 64);
  const inner_scale_band = new THREE.Mesh(inner_scale_bandGeom, dialMat);
  inner_scale_band.position.z = 0.067;
  compass_assembly.add(inner_scale_band);

  const front_bezelGeom = new THREE.TorusGeometry(0.925, 0.085, 16, 64);
  const front_bezel = new THREE.Mesh(front_bezelGeom, aged_brassMat);
  front_bezel.position.z = 0.072;
  compass_assembly.add(front_bezel);

  const bezel_highlightGeom = new THREE.TorusGeometry(0.925, 0.026, 12, 64);
  const bezel_highlight = new THREE.Mesh(bezel_highlightGeom, polished_brassMat);
  bezel_highlight.position.z = 0.145;
  compass_assembly.add(bezel_highlight);

  const inner_bezelGeom = new THREE.TorusGeometry(0.858, 0.018, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, dark_brassMat);
  inner_bezel.position.z = 0.118;
  compass_assembly.add(inner_bezel);

  const glass_coverGeom = new THREE.CircleGeometry(0.842, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glass_coverMat);
  glass_cover.position.z = 0.158;
  compass_assembly.add(glass_cover);

  const outer_scale_ringGeom = new THREE.RingGeometry(0.837, 0.844, 64);
  const outer_scale_ring = new THREE.Mesh(outer_scale_ringGeom, inkMat);
  outer_scale_ring.position.z = 0.078;
  compass_assembly.add(outer_scale_ring);

  const middle_scale_ringGeom = new THREE.RingGeometry(0.676, 0.682, 64);
  const middle_scale_ring = new THREE.Mesh(middle_scale_ringGeom, gray_inkMat);
  middle_scale_ring.position.z = 0.079;
  compass_assembly.add(middle_scale_ring);

  const inner_scale_ringGeom = new THREE.RingGeometry(0.602, 0.608, 64);
  const inner_scale_ring = new THREE.Mesh(inner_scale_ringGeom, gray_inkMat);
  inner_scale_ring.position.z = 0.08;
  compass_assembly.add(inner_scale_ring);

  const dummy = new THREE.Object3D();

  const outer_tick_marksGeom = new THREE.BoxGeometry(0.008, 0.055, 0.006);
  const outer_tick_marks = new THREE.InstancedMesh(outer_tick_marksGeom, inkMat, 72);
  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    const major = i % 6 === 0;
    const medium = !major && i % 3 === 0;
    const radius = major ? 0.801 : medium ? 0.811 : 0.817;
    dummy.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, 0.083);
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(major ? 1.35 : 0.72, major ? 1.55 : medium ? 1.1 : 0.78, 1);
    dummy.updateMatrix();
    outer_tick_marks.setMatrixAt(i, dummy.matrix);
  }
  outer_tick_marks.instanceMatrix.needsUpdate = true;
  compass_assembly.add(outer_tick_marks);

  const inner_tick_marksGeom = new THREE.BoxGeometry(0.006, 0.043, 0.005);
  const inner_tick_marks = new THREE.InstancedMesh(inner_tick_marksGeom, gray_inkMat, 36);
  for (let i = 0; i < 36; i++) {
    const angle = i / 36 * Math.PI * 2;
    const major = i % 3 === 0;
    const radius = major ? 0.629 : 0.638;
    dummy.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, 0.084);
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(major ? 1.25 : 0.7, major ? 1.25 : 0.72, 1);
    dummy.updateMatrix();
    inner_tick_marks.setMatrixAt(i, dummy.matrix);
  }
  inner_tick_marks.instanceMatrix.needsUpdate = true;
  compass_assembly.add(inner_tick_marks);

  const radial_guidesGeom = new THREE.BoxGeometry(0.004, 0.55, 0.003);
  const radial_guides = new THREE.InstancedMesh(radial_guidesGeom, gray_inkMat, 8);
  for (let i = 0; i < 8; i++) {
    const angle = (i + 0.5) / 8 * Math.PI * 2;
    dummy.position.set(Math.sin(angle) * 0.325, Math.cos(angle) * 0.325, 0.071);
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    radial_guides.setMatrixAt(i, dummy.matrix);
  }
  radial_guides.instanceMatrix.needsUpdate = true;
  compass_assembly.add(radial_guides);

  const rose_darkShape = new THREE.Shape();
  rose_darkShape.moveTo(-0.043, 0.035);
  rose_darkShape.lineTo(0, 0.595);
  rose_darkShape.lineTo(0.043, 0.035);
  rose_darkShape.lineTo(0, 0.105);
  rose_darkShape.closePath();
  const rose_dark_pointsGeom = new THREE.ShapeGeometry(rose_darkShape);
  const rose_dark_points = new THREE.InstancedMesh(rose_dark_pointsGeom, inkMat, 8);
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    dummy.position.set(0, 0, 0.075);
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rose_dark_points.setMatrixAt(i, dummy.matrix);
  }
  rose_dark_points.instanceMatrix.needsUpdate = true;
  compass_assembly.add(rose_dark_points);

  const rose_lightShape = new THREE.Shape();
  rose_lightShape.moveTo(-0.035, 0.04);
  rose_lightShape.lineTo(0, 0.485);
  rose_lightShape.lineTo(0.035, 0.04);
  rose_lightShape.lineTo(0, 0.105);
  rose_lightShape.closePath();
  const rose_light_pointsGeom = new THREE.ShapeGeometry(rose_lightShape);
  const rose_light_points = new THREE.InstancedMesh(rose_light_pointsGeom, dialMat, 8);
  for (let i = 0; i < 8; i++) {
    const angle = (i + 0.5) / 8 * Math.PI * 2;
    dummy.position.set(0, 0, 0.077);
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rose_light_points.setMatrixAt(i, dummy.matrix);
  }
  rose_light_points.instanceMatrix.needsUpdate = true;
  compass_assembly.add(rose_light_points);

  const north_needleShape = new THREE.Shape();
  north_needleShape.moveTo(-0.052, 0.025);
  north_needleShape.lineTo(0, 0.535);
  north_needleShape.lineTo(0.052, 0.025);
  north_needleShape.lineTo(0, 0.11);
  north_needleShape.closePath();
  const north_needleGeom = new THREE.ShapeGeometry(north_needleShape);
  const north_needle = new THREE.Mesh(north_needleGeom, red_paintMat);
  north_needle.position.z = 0.08;
  compass_assembly.add(north_needle);

  const east_needleShape = new THREE.Shape();
  east_needleShape.moveTo(0.025, -0.046);
  east_needleShape.lineTo(0.52, 0);
  east_needleShape.lineTo(0.025, 0.046);
  east_needleShape.lineTo(0.11, 0);
  east_needleShape.closePath();
  const east_needleGeom = new THREE.ShapeGeometry(east_needleShape);
  const east_needle = new THREE.Mesh(east_needleGeom, red_paintMat);
  east_needle.position.z = 0.081;
  compass_assembly.add(east_needle);

  const letter_barGeom = new THREE.BoxGeometry(1, 0.018, 0.006);

  function addLetterBar(group, x1, y1, x2, y2, width) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const bar = new THREE.Mesh(letter_barGeom, inkMat);
    bar.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
    bar.rotation.z = Math.atan2(dy, dx);
    bar.scale.set(length, width / 0.018, 1);
    group.add(bar);
  }

  const north_label = new THREE.Group();
  north_label.position.set(0, 0.585, 0.088);
  addLetterBar(north_label, -0.048, -0.068, -0.048, 0.068, 0.017);
  addLetterBar(north_label, 0.048, -0.068, 0.048, 0.068, 0.017);
  addLetterBar(north_label, -0.048, -0.068, 0.048, 0.068, 0.017);
  compass_assembly.add(north_label);

  const south_label = new THREE.Group();
  south_label.position.set(0, -0.585, 0.088);
  addLetterBar(south_label, -0.046, 0.066, 0.046, 0.066, 0.017);
  addLetterBar(south_label, -0.046, 0.066, -0.052, 0.012, 0.017);
  addLetterBar(south_label, -0.052, 0.012, 0.043, -0.006, 0.017);
  addLetterBar(south_label, 0.043, -0.006, 0.048, -0.064, 0.017);
  addLetterBar(south_label, -0.046, -0.066, 0.046, -0.066, 0.017);
  compass_assembly.add(south_label);

  const east_label = new THREE.Group();
  east_label.position.set(0.585, 0, 0.088);
  addLetterBar(east_label, -0.046, -0.068, -0.046, 0.068, 0.017);
  addLetterBar(east_label, -0.046, 0.066, 0.046, 0.066, 0.017);
  addLetterBar(east_label, -0.046, 0, 0.032, 0, 0.017);
  addLetterBar(east_label, -0.046, -0.066, 0.046, -0.066, 0.017);
  compass_assembly.add(east_label);

  const west_label = new THREE.Group();
  west_label.position.set(-0.585, 0, 0.088);
  addLetterBar(west_label, -0.057, 0.066, -0.032, -0.066, 0.017);
  addLetterBar(west_label, -0.032, -0.066, 0, 0.018, 0.017);
  addLetterBar(west_label, 0, 0.018, 0.032, -0.066, 0.017);
  addLetterBar(west_label, 0.032, -0.066, 0.057, 0.066, 0.017);
  compass_assembly.add(west_label);

  const digitMap = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "c", "d", "g"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };
  const digitW = 0.044;
  const digitH = 0.078;
  const digitBar = 0.008;
  const segmentData = {
    a: [0, digitH / 2, digitW, 0],
    b: [digitW / 2, digitH / 4, digitH / 2, Math.PI / 2],
    c: [digitW / 2, -digitH / 4, digitH / 2, Math.PI / 2],
    d: [0, -digitH / 2, digitW, 0],
    e: [-digitW / 2, -digitH / 4, digitH / 2, Math.PI / 2],
    f: [-digitW / 2, digitH / 4, digitH / 2, Math.PI / 2],
    g: [0, 0, digitW, 0],
  };
  const degreeValues = ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
  const numeralTransforms = [];

  for (let labelIndex = 0; labelIndex < degreeValues.length; labelIndex++) {
    const value = degreeValues[labelIndex];
    const angle = labelIndex / degreeValues.length * Math.PI * 2;
    const radialX = Math.sin(angle);
    const radialY = Math.cos(angle);
    const rightX = Math.cos(angle);
    const rightY = -Math.sin(angle);
    const labelRadius = 0.746;

    for (let digitIndex = 0; digitIndex < value.length; digitIndex++) {
      const digit = value[digitIndex];
      const digitOffset = (digitIndex - (value.length - 1) / 2) * 0.056;
      const segments = digitMap[digit];
      for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
        const data = segmentData[segments[segmentIndex]];
        const localX = digitOffset + data[0];
        const localY = data[1];
        numeralTransforms.push({
          x: radialX * labelRadius + rightX * localX + radialX * localY,
          y: radialY * labelRadius + rightY * localX + radialY * localY,
          rotation: -angle + data[3],
          length: data[2],
        });
      }
    }
  }

  const degree_numeralsGeom = new THREE.BoxGeometry(1, 1, 1);
  const degree_numerals = new THREE.InstancedMesh(
    degree_numeralsGeom,
    inkMat,
    numeralTransforms.length
  );
  for (let i = 0; i < numeralTransforms.length; i++) {
    const transform = numeralTransforms[i];
    dummy.position.set(transform.x, transform.y, 0.087);
    dummy.rotation.set(0, 0, transform.rotation);
    dummy.scale.set(transform.length, digitBar, 0.005);
    dummy.updateMatrix();
    degree_numerals.setMatrixAt(i, dummy.matrix);
  }
  degree_numerals.instanceMatrix.needsUpdate = true;
  compass_assembly.add(degree_numerals);

  const pivot_shadowGeom = new THREE.CylinderGeometry(0.135, 0.135, 0.025, 32);
  const pivot_shadow = new THREE.Mesh(pivot_shadowGeom, dark_brassMat);
  pivot_shadow.rotation.x = Math.PI / 2;
  pivot_shadow.position.z = 0.093;
  compass_assembly.add(pivot_shadow);

  const pivot_baseGeom = new THREE.CylinderGeometry(0.12, 0.13, 0.07, 32);
  const pivot_base = new THREE.Mesh(pivot_baseGeom, aged_brassMat);
  pivot_base.rotation.x = Math.PI / 2;
  pivot_base.position.z = 0.125;
  compass_assembly.add(pivot_base);

  const pivot_capGeom = new THREE.SphereGeometry(0.105, 32, 16);
  const pivot_cap = new THREE.Mesh(pivot_capGeom, polished_brassMat);
  pivot_cap.scale.set(1, 1, 0.45);
  pivot_cap.position.z = 0.176;
  compass_assembly.add(pivot_cap);

  const pivot_ringGeom = new THREE.TorusGeometry(0.101, 0.012, 10, 32);
  const pivot_ring = new THREE.Mesh(pivot_ringGeom, dark_brassMat);
  pivot_ring.position.z = 0.198;
  compass_assembly.add(pivot_ring);

  const top_adjustment_knobGeom = new THREE.SphereGeometry(0.065, 24, 12);
  const top_adjustment_knob = new THREE.Mesh(top_adjustment_knobGeom, aged_brassMat);
  top_adjustment_knob.scale.set(1, 0.48, 0.7);
  top_adjustment_knob.position.set(0, 1.012, -0.035);
  compass_assembly.add(top_adjustment_knob);

  const top_adjustment_slotGeom = new THREE.BoxGeometry(0.055, 0.008, 0.012);
  const top_adjustment_slot = new THREE.Mesh(top_adjustment_slotGeom, dark_brassMat);
  top_adjustment_slot.position.set(0, 1.032, -0.026);
  compass_assembly.add(top_adjustment_slot);

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(THREE, root);
  return root;
}
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_round_table";

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0x603522,
    metalness: 0.0,
    roughness: 0.6,
  });
  const apronMat = new THREE.MeshStandardMaterial({
    color: 0x713919,
    metalness: 0.0,
    roughness: 0.6,
  });
  const legMat = new THREE.MeshStandardMaterial({
    color: 0x572b18,
    metalness: 0.0,
    roughness: 0.6,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x3d1c0e,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x44271d,
    metalness: 0.0,
    roughness: 0.6,
  });

  const tabletopProfile = [
    new THREE.Vector2(0.00, 2.42),
    new THREE.Vector2(1.47, 2.42),
    new THREE.Vector2(1.57, 2.44),
    new THREE.Vector2(1.64, 2.49),
    new THREE.Vector2(1.68, 2.55),
    new THREE.Vector2(1.67, 2.61),
    new THREE.Vector2(1.62, 2.66),
    new THREE.Vector2(1.54, 2.70),
    new THREE.Vector2(0.00, 2.70),
  ];
  const tabletopGeom = new THREE.LatheGeometry(tabletopProfile, 64);
  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.name = "tabletop";
  root.add(tabletop);

  const tabletop_edge_beadGeom = new THREE.TorusGeometry(1.62, 0.045, 12, 64);
  const tabletop_edge_bead = new THREE.Mesh(tabletop_edge_beadGeom, trimMat);
  tabletop_edge_bead.name = "tabletop_edge_bead";
  tabletop_edge_bead.rotation.x = Math.PI / 2;
  tabletop_edge_bead.position.y = 2.50;
  root.add(tabletop_edge_bead);

  const tabletop_inlayGeom = new THREE.TorusGeometry(1.56, 0.009, 8, 64);
  const tabletop_inlay = new THREE.Mesh(tabletop_inlayGeom, trimMat);
  tabletop_inlay.name = "tabletop_inlay";
  tabletop_inlay.rotation.x = Math.PI / 2;
  tabletop_inlay.position.y = 2.704;
  root.add(tabletop_inlay);

  const top_grain = new THREE.Group();
  top_grain.name = "top_grain";
  for (let i = 0; i < 7; i++) {
    const z0 = -1.02 + i * 0.34;
    const xLimit = Math.sqrt(Math.max(0.1, 1.42 * 1.42 - z0 * z0));
    const points = [];
    for (let j = 0; j <= 5; j++) {
      const t = j / 5;
      const x = -xLimit + xLimit * 2 * t;
      const z = z0 + Math.sin(t * Math.PI * 2 + i * 0.73) * 0.025;
      points.push(new THREE.Vector3(x, 2.706, z));
    }
    const grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      18,
      0.0035,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grain_lineGeom, grainMat);
    grain_line.name = "grain_line_" + i;
    top_grain.add(grain_line);
  }
  root.add(top_grain);

  const apronGeom = new THREE.CylinderGeometry(1.48, 1.43, 0.36, 64, 1, false);
  const apron = new THREE.Mesh(apronGeom, apronMat);
  apron.name = "apron";
  apron.position.y = 2.24;
  root.add(apron);

  const apron_upper_bandGeom = new THREE.TorusGeometry(1.48, 0.045, 10, 64);
  const apron_upper_band = new THREE.Mesh(apron_upper_bandGeom, trimMat);
  apron_upper_band.name = "apron_upper_band";
  apron_upper_band.rotation.x = Math.PI / 2;
  apron_upper_band.position.y = 2.42;
  root.add(apron_upper_band);

  const apron_lower_bandGeom = new THREE.TorusGeometry(1.43, 0.043, 10, 64);
  const apron_lower_band = new THREE.Mesh(apron_lower_bandGeom, trimMat);
  apron_lower_band.name = "apron_lower_band";
  apron_lower_band.rotation.x = Math.PI / 2;
  apron_lower_band.position.y = 2.06;
  root.add(apron_lower_band);

  const apron_lower_trimGeom = new THREE.TorusGeometry(1.39, 0.022, 8, 64);
  const apron_lower_trim = new THREE.Mesh(apron_lower_trimGeom, trimMat);
  apron_lower_trim.name = "apron_lower_trim";
  apron_lower_trim.rotation.x = Math.PI / 2;
  apron_lower_trim.position.y = 2.01;
  root.add(apron_lower_trim);

  const apron_support_blocksGeom = new THREE.BoxGeometry(0.36, 0.35, 0.16);
  const apron_support_blocks = new THREE.InstancedMesh(
    apron_support_blocksGeom,
    apronMat,
    4
  );
  apron_support_blocks.name = "apron_support_blocks";
  const placement = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    placement.position.set(Math.sin(angle) * 1.37, 2.23, Math.cos(angle) * 1.37);
    placement.rotation.set(0, angle, 0);
    placement.scale.set(1, 1, 1);
    placement.updateMatrix();
    apron_support_blocks.setMatrixAt(i, placement.matrix);
  }
  apron_support_blocks.instanceMatrix.needsUpdate = true;
  root.add(apron_support_blocks);

  const apron_seamsGeom = new THREE.BoxGeometry(0.026, 0.31, 0.022);
  const apron_seams = new THREE.InstancedMesh(apron_seamsGeom, trimMat, 4);
  apron_seams.name = "apron_seams";
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    placement.position.set(Math.sin(angle) * 1.485, 2.24, Math.cos(angle) * 1.485);
    placement.rotation.set(0, angle, 0);
    placement.scale.set(1, 1, 1);
    placement.updateMatrix();
    apron_seams.setMatrixAt(i, placement.matrix);
  }
  apron_seams.instanceMatrix.needsUpdate = true;
  root.add(apron_seams);

  const legsProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.10, 0.00),
    new THREE.Vector2(0.16, 0.03),
    new THREE.Vector2(0.18, 0.10),
    new THREE.Vector2(0.17, 0.17),
    new THREE.Vector2(0.12, 0.22),
    new THREE.Vector2(0.10, 0.30),
    new THREE.Vector2(0.12, 0.42),
    new THREE.Vector2(0.14, 0.65),
    new THREE.Vector2(0.15, 0.90),
    new THREE.Vector2(0.17, 1.12),
    new THREE.Vector2(0.22, 1.24),
    new THREE.Vector2(0.27, 1.34),
    new THREE.Vector2(0.28, 1.43),
    new THREE.Vector2(0.25, 1.51),
    new THREE.Vector2(0.18, 1.56),
    new THREE.Vector2(0.15, 1.59),
    new THREE.Vector2(0.19, 1.62),
    new THREE.Vector2(0.20, 1.67),
    new THREE.Vector2(0.17, 1.71),
    new THREE.Vector2(0.15, 1.75),
    new THREE.Vector2(0.18, 1.78),
    new THREE.Vector2(0.18, 1.82),
    new THREE.Vector2(0.14, 1.86),
    new THREE.Vector2(0.14, 1.90),
    new THREE.Vector2(0.00, 1.90),
  ];
  const legsGeom = new THREE.LatheGeometry(legsProfile, 32);
  const legs = new THREE.InstancedMesh(legsGeom, legMat, 4);
  legs.name = "legs";
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    placement.position.set(Math.sin(angle) * 1.14, 0, Math.cos(angle) * 1.14);
    placement.rotation.set(0, angle, 0);
    placement.scale.set(1, 1, 1);
    placement.updateMatrix();
    legs.setMatrixAt(i, placement.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  root.add(legs);

  const leg_collarsGeom = new THREE.TorusGeometry(0.17, 0.022, 8, 24);
  const leg_collars = new THREE.InstancedMesh(leg_collarsGeom, trimMat, 8);
  leg_collars.name = "leg_collars";
  let collarIndex = 0;
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    const lx = Math.sin(angle) * 1.14;
    const lz = Math.cos(angle) * 1.14;
    for (const y of [1.65, 1.80]) {
      placement.position.set(lx, y, lz);
      placement.rotation.set(Math.PI / 2, 0, 0);
      placement.scale.set(1, 1, 1);
      placement.updateMatrix();
      leg_collars.setMatrixAt(collarIndex++, placement.matrix);
    }
  }
  leg_collars.instanceMatrix.needsUpdate = true;
  root.add(leg_collars);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -0.18);
  leafShape.bezierCurveTo(-0.04, -0.11, -0.09, 0.02, -0.07, 0.10);
  leafShape.bezierCurveTo(-0.05, 0.15, -0.02, 0.18, 0, 0.20);
  leafShape.bezierCurveTo(0.02, 0.18, 0.05, 0.15, 0.07, 0.10);
  leafShape.bezierCurveTo(0.09, 0.02, 0.04, -0.11, 0, -0.18);
  leafShape.closePath();

  const leaf_carvingsGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const leaf_carvings = new THREE.InstancedMesh(leaf_carvingsGeom, trimMat, 20);
  leaf_carvings.name = "leaf_carvings";
  const yAxis = new THREE.Vector3(0, 1, 0);
  const zAxis = new THREE.Vector3(0, 0, 1);
  const radialQuat = new THREE.Quaternion();
  const tiltQuat = new THREE.Quaternion();
  let leafIndex = 0;

  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    const lx = Math.sin(angle) * 1.14;
    const lz = Math.cos(angle) * 1.14;
    radialQuat.setFromAxisAngle(yAxis, angle);

    for (let j = -2; j <= 2; j++) {
      const tilt = -j * 0.27;
      tiltQuat.setFromAxisAngle(zAxis, tilt);
      placement.quaternion.copy(radialQuat).multiply(tiltQuat);
      placement.position.set(lx + j * 0.032, 1.38, lz + 0.266);
      const outerScale = Math.abs(j) === 2 ? 0.86 : 1.0;
      placement.scale.set(outerScale, 1.0, 1.0);
      placement.updateMatrix();
      leaf_carvings.setMatrixAt(leafIndex++, placement.matrix);
    }

    for (const side of [-1, 1]) {
      tiltQuat.setFromAxisAngle(zAxis, side * 0.82);
      placement.quaternion.copy(radialQuat).multiply(tiltQuat);
      placement.position.set(lx + side * 0.13, 1.34, lz + 0.245);
      placement.scale.set(0.72, 0.92, 1.0);
      placement.updateMatrix();
      leaf_carvings.setMatrixAt(leafIndex++, placement.matrix);
    }
  }
  leaf_carvings.instanceMatrix.needsUpdate = true;
  root.add(leaf_carvings);

  const scrollPoints = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const radius = 0.105 * (1 - t) + 0.012;
    const theta = t * Math.PI * 1.75;
    scrollPoints.push(
      new THREE.Vector3(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        0
      )
    );
  }
  const scroll_carvingsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(scrollPoints, false, "centripetal"),
    24,
    0.012,
    6,
    false
  );
  const scroll_carvings = new THREE.InstancedMesh(scroll_carvingsGeom, trimMat, 8);
  scroll_carvings.name = "scroll_carvings";
  let scrollIndex = 0;
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    const lx = Math.sin(angle) * 1.14;
    const lz = Math.cos(angle) * 1.14;
    radialQuat.setFromAxisAngle(yAxis, angle);

    for (const side of [-1, 1]) {
      placement.position.set(lx + side * 0.135, 1.43, lz + 0.258);
      placement.quaternion.copy(radialQuat);
      placement.scale.set(side, 1, 1);
      placement.updateMatrix();
      scroll_carvings.setMatrixAt(scrollIndex++, placement.matrix);
    }
  }
  scroll_carvings.instanceMatrix.needsUpdate = true;
  root.add(scroll_carvings);

  const toe_scrollsGeom = new THREE.TorusGeometry(
    0.058,
    0.014,
    7,
    20,
    Math.PI * 1.65
  );
  const toe_scrolls = new THREE.InstancedMesh(toe_scrollsGeom, trimMat, 8);
  toe_scrolls.name = "toe_scrolls";
  let toeIndex = 0;
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    const lx = Math.sin(angle) * 1.14;
    const lz = Math.cos(angle) * 1.14;
    radialQuat.setFromAxisAngle(yAxis, angle);

    for (const side of [-1, 1]) {
      placement.position.set(lx + side * 0.09, 0.13, lz + 0.178);
      placement.quaternion.copy(radialQuat);
      placement.scale.set(side < 0 ? -1 : 1, 1, 1);
      placement.updateMatrix();
      toe_scrolls.setMatrixAt(toeIndex++, placement.matrix);
    }
  }
  toe_scrolls.instanceMatrix.needsUpdate = true;
  root.add(toe_scrolls);

  const toe_knobsGeom = new THREE.SphereGeometry(0.048, 12, 8);
  const toe_knobs = new THREE.InstancedMesh(toe_knobsGeom, legMat, 8);
  toe_knobs.name = "toe_knobs";
  let knobIndex = 0;
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    const lx = Math.sin(angle) * 1.14;
    const lz = Math.cos(angle) * 1.14;
    radialQuat.setFromAxisAngle(yAxis, angle);

    for (const side of [-1, 1]) {
      placement.position.set(lx + side * 0.09, 0.13, lz + 0.181);
      placement.quaternion.copy(radialQuat);
      placement.scale.set(0.82, 0.82, 0.58);
      placement.updateMatrix();
      toe_knobs.setMatrixAt(knobIndex++, placement.matrix);
    }
  }
  toe_knobs.instanceMatrix.needsUpdate = true;
  root.add(toe_knobs);

  const stretchersShape = new THREE.Shape();
  stretchersShape.moveTo(0.00, -0.075);
  stretchersShape.bezierCurveTo(0.28, -0.075, 0.40, -0.12, 0.62, -0.14);
  stretchersShape.bezierCurveTo(0.82, -0.15, 0.98, -0.11, 1.16, -0.09);
  stretchersShape.lineTo(1.16, 0.09);
  stretchersShape.bezierCurveTo(0.96, 0.11, 0.80, 0.15, 0.62, 0.14);
  stretchersShape.bezierCurveTo(0.40, 0.12, 0.28, 0.075, 0.00, 0.075);
  stretchersShape.closePath();

  const stretchersGeom = new THREE.ExtrudeGeometry(stretchersShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.014,
    bevelSegments: 2,
  });
  stretchersGeom.translate(0, 0, -0.07);
  stretchersGeom.rotateX(-Math.PI / 2);

  const stretchers = new THREE.InstancedMesh(stretchersGeom, legMat, 4);
  stretchers.name = "stretchers";
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    placement.position.set(0, 0.43, 0);
    placement.rotation.set(0, angle - Math.PI / 2, 0);
    placement.scale.set(1, 1, 1);
    placement.updateMatrix();
    stretchers.setMatrixAt(i, placement.matrix);
  }
  stretchers.instanceMatrix.needsUpdate = true;
  root.add(stretchers);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}
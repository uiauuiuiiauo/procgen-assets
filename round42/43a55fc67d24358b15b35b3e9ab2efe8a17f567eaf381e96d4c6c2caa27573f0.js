export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "root";

  const brooch = new THREE.Group();
  brooch.name = "brooch";
  root.add(brooch);

  const decorative_face = new THREE.Group();
  decorative_face.name = "decorative_face";
  brooch.add(decorative_face);

  const clasp_mechanism = new THREE.Group();
  clasp_mechanism.name = "clasp_mechanism";
  brooch.add(clasp_mechanism);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8a83e,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brightGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf0c75c,
    metalness: 0.6,
    roughness: 0.2,
  });
  const inset_panelMat = new THREE.MeshStandardMaterial({
    color: 0x9b641b,
    metalness: 0.5,
    roughness: 0.35,
  });
  const gemstonesMat = new THREE.MeshPhysicalMaterial({
    color: 0xdcecff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const gemstone_tablesMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function makeCapsuleShape(length, width) {
    const shape = new THREE.Shape();
    const radius = width * 0.5;
    const halfStraight = length * 0.5 - radius;
    const k = 0.55228475;

    shape.moveTo(-halfStraight, -radius);
    shape.lineTo(halfStraight, -radius);
    shape.bezierCurveTo(
      halfStraight + k * radius, -radius,
      halfStraight + radius, -k * radius,
      halfStraight + radius, 0
    );
    shape.bezierCurveTo(
      halfStraight + radius, k * radius,
      halfStraight + k * radius, radius,
      halfStraight, radius
    );
    shape.lineTo(-halfStraight, radius);
    shape.bezierCurveTo(
      -halfStraight - k * radius, radius,
      -halfStraight - radius, k * radius,
      -halfStraight - radius, 0
    );
    shape.bezierCurveTo(
      -halfStraight - radius, -k * radius,
      -halfStraight - k * radius, -radius,
      -halfStraight, -radius
    );
    shape.closePath();
    return shape;
  }

  function makeCapsuleGeometry(length, width, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(
      makeCapsuleShape(length, width),
      {
        depth,
        steps: 1,
        curveSegments: 16,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize,
        bevelThickness,
      }
    );
    geometry.translate(0, 0, -depth * 0.5);
    return geometry;
  }

  function makeCapsulePath(length, width, z) {
    const points = [];
    const radius = width * 0.5;
    const halfStraight = length * 0.5 - radius;
    const arcSteps = 10;
    const lineSteps = 8;

    for (let i = 0; i <= arcSteps; i++) {
      const angle = -Math.PI * 0.5 + Math.PI * i / arcSteps;
      points.push(new THREE.Vector3(
        halfStraight + Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
      ));
    }
    for (let i = 1; i <= lineSteps; i++) {
      points.push(new THREE.Vector3(
        halfStraight - 2 * halfStraight * i / lineSteps,
        radius,
        z
      ));
    }
    for (let i = 1; i <= arcSteps; i++) {
      const angle = Math.PI * 0.5 + Math.PI * i / arcSteps;
      points.push(new THREE.Vector3(
        -halfStraight + Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
      ));
    }
    for (let i = 1; i < lineSteps; i++) {
      points.push(new THREE.Vector3(
        -halfStraight + 2 * halfStraight * i / lineSteps,
        -radius,
        z
      ));
    }
    return points;
  }

  const outer_bodyGeom = makeCapsuleGeometry(5.2, 0.84, 0.16, 0.035, 0.035);
  const outer_body = new THREE.Mesh(outer_bodyGeom, goldMat);
  outer_body.name = "outer_body";
  decorative_face.add(outer_body);

  const inset_panelGeom = makeCapsuleGeometry(4.94, 0.68, 0.026, 0.012, 0.008);
  const inset_panel = new THREE.Mesh(inset_panelGeom, inset_panelMat);
  inset_panel.name = "inset_panel";
  inset_panel.position.z = 0.116;
  decorative_face.add(inset_panel);

  const outer_rimPath = new THREE.CatmullRomCurve3(
    makeCapsulePath(5.08, 0.79, 0.145),
    true,
    "centripetal"
  );
  const outer_rimGeom = new THREE.TubeGeometry(
    outer_rimPath,
    112,
    0.052,
    8,
    true
  );
  const outer_rim = new THREE.Mesh(outer_rimGeom, brightGoldMat);
  outer_rim.name = "outer_rim";
  decorative_face.add(outer_rim);

  const inner_borderPath = new THREE.CatmullRomCurve3(
    makeCapsulePath(4.84, 0.65, 0.151),
    true,
    "centripetal"
  );
  const inner_borderGeom = new THREE.TubeGeometry(
    inner_borderPath,
    104,
    0.018,
    7,
    true
  );
  const inner_border = new THREE.Mesh(inner_borderGeom, brightGoldMat);
  inner_border.name = "inner_border";
  decorative_face.add(inner_border);

  const gemstoneData = [];
  const rowCounts = [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3];
  const rowSpan = 2.08;

  for (let row = 0; row < rowCounts.length; row++) {
    const count = rowCounts[row];
    const x = -2.16 + 2 * rowSpan * row / (rowCounts.length - 1);
    for (let column = 0; column < count; column++) {
      const y = count === 3
        ? (column - 1) * 0.18
        : (column - 1.5) * 0.135;
      const scale = 0.93 + ((row + column * 2) % 3) * 0.035;
      gemstoneData.push({ x, y, scale });
    }
  }

  const gemstoneSettingsGeom = new THREE.CylinderGeometry(
    0.092,
    0.092,
    0.024,
    16
  );
  const gemstone_settings = new THREE.InstancedMesh(
    gemstoneSettingsGeom,
    goldMat,
    gemstoneData.length
  );
  gemstone_settings.name = "gemstone_settings";

  const gemstonesGeom = new THREE.CylinderGeometry(
    0.052,
    0.078,
    0.055,
    12,
    1,
    false
  );
  const gemstones = new THREE.InstancedMesh(
    gemstonesGeom,
    gemstonesMat,
    gemstoneData.length
  );
  gemstones.name = "gemstones";

  const gemstoneTablesGeom = new THREE.CircleGeometry(0.046, 12);
  const gemstone_tables = new THREE.InstancedMesh(
    gemstoneTablesGeom,
    gemstone_tablesMat,
    gemstoneData.length
  );
  gemstone_tables.name = "gemstone_tables";

  const dummy = new THREE.Object3D();

  for (let i = 0; i < gemstoneData.length; i++) {
    const data = gemstoneData[i];

    dummy.position.set(data.x, data.y, 0.153);
    dummy.rotation.set(Math.PI * 0.5, 0, 0);
    dummy.scale.setScalar(data.scale);
    dummy.updateMatrix();
    gemstone_settings.setMatrixAt(i, dummy.matrix);

    dummy.position.set(data.x, data.y, 0.181);
    dummy.rotation.set(Math.PI * 0.5, 0, 0);
    dummy.scale.setScalar(data.scale);
    dummy.updateMatrix();
    gemstones.setMatrixAt(i, dummy.matrix);

    dummy.position.set(data.x, data.y, 0.211);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(data.scale);
    dummy.updateMatrix();
    gemstone_tables.setMatrixAt(i, dummy.matrix);
  }

  gemstone_settings.instanceMatrix.needsUpdate = true;
  gemstones.instanceMatrix.needsUpdate = true;
  gemstone_tables.instanceMatrix.needsUpdate = true;
  decorative_face.add(gemstone_settings, gemstones, gemstone_tables);

  const prongPositions = [];
  for (let i = 0; i < gemstoneData.length; i++) {
    const data = gemstoneData[i];
    for (let p = 0; p < 3; p++) {
      const angle = Math.PI * 0.15 + p * Math.PI * 2 / 3;
      prongPositions.push(new THREE.Vector3(
        data.x + Math.cos(angle) * 0.078 * data.scale,
        data.y + Math.sin(angle) * 0.078 * data.scale,
        0.198
      ));
    }
  }

  const prongsGeom = new THREE.SphereGeometry(0.027, 10, 6);
  const prongs = new THREE.InstancedMesh(
    prongsGeom,
    brightGoldMat,
    prongPositions.length
  );
  prongs.name = "prongs";

  for (let i = 0; i < prongPositions.length; i++) {
    const position = prongPositions[i];
    dummy.position.copy(position);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    prongs.setMatrixAt(i, dummy.matrix);
  }
  prongs.instanceMatrix.needsUpdate = true;
  decorative_face.add(prongs);

  const accentData = [];
  for (let i = 0; i < gemstoneData.length - 1; i++) {
    const current = gemstoneData[i];
    const next = gemstoneData[i + 1];
    const deltaX = next.x - current.x;
    const deltaY = next.y - current.y;
    if (deltaX * deltaY > 0.02) {
      accentData.push({
        x: (current.x + next.x) * 0.5,
        y: (current.y + next.y) * 0.5,
      });
    }
  }

  const accent_beadsGeom = new THREE.SphereGeometry(0.021, 9, 6);
  const accent_beads = new THREE.InstancedMesh(
    accent_beadsGeom,
    brightGoldMat,
    accentData.length
  );
  accent_beads.name = "accent_beads";

  for (let i = 0; i < accentData.length; i++) {
    dummy.position.set(accentData[i].x, accentData[i].y, 0.177);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    accent_beads.setMatrixAt(i, dummy.matrix);
  }
  accent_beads.instanceMatrix.needsUpdate = true;
  decorative_face.add(accent_beads);

  const lower_clasp_armPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.32, -0.015, -0.145),
    new THREE.Vector3(-1.72, -0.055, -0.185),
    new THREE.Vector3(-0.55, -0.075, -0.205),
    new THREE.Vector3(0.75, -0.065, -0.195),
    new THREE.Vector3(1.92, -0.025, -0.145),
  ], false, "centripetal");
  const lower_clasp_armGeom = new THREE.TubeGeometry(
    lower_clasp_armPath,
    56,
    0.055,
    8,
    false
  );
  const lower_clasp_arm = new THREE.Mesh(lower_clasp_armGeom, goldMat);
  lower_clasp_arm.name = "lower_clasp_arm";
  clasp_mechanism.add(lower_clasp_arm);

  const clasp_pinPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.28, 0.015, -0.182),
    new THREE.Vector3(-1.55, 0.005, -0.218),
    new THREE.Vector3(-0.35, -0.005, -0.225),
    new THREE.Vector3(0.9, 0.0, -0.215),
    new THREE.Vector3(2.02, 0.015, -0.175),
  ], false, "centripetal");
  const clasp_pinGeom = new THREE.TubeGeometry(
    clasp_pinPath,
    52,
    0.032,
    8,
    false
  );
  const clasp_pin = new THREE.Mesh(clasp_pinGeom, brightGoldMat);
  clasp_pin.name = "clasp_pin";
  clasp_mechanism.add(clasp_pin);

  const hinge_barrelsGeom = new THREE.CylinderGeometry(
    0.115,
    0.115,
    0.22,
    18
  );
  const hinge_barrels = new THREE.InstancedMesh(
    hinge_barrelsGeom,
    goldMat,
    2
  );
  hinge_barrels.name = "hinge_barrels";

  for (let i = 0; i < 2; i++) {
    dummy.position.set(-2.34, 0, i === 0 ? -0.105 : -0.205);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    hinge_barrels.setMatrixAt(i, dummy.matrix);
  }
  hinge_barrels.instanceMatrix.needsUpdate = true;
  clasp_mechanism.add(hinge_barrels);

  const hinge_capsGeom = new THREE.SphereGeometry(0.118, 16, 10);
  const hinge_caps = new THREE.InstancedMesh(hinge_capsGeom, brightGoldMat, 2);
  hinge_caps.name = "hinge_caps";

  for (let i = 0; i < 2; i++) {
    dummy.position.set(-2.34, 0, i === 0 ? -0.225 : -0.085);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.72, 1, 1);
    dummy.updateMatrix();
    hinge_caps.setMatrixAt(i, dummy.matrix);
  }
  hinge_caps.instanceMatrix.needsUpdate = true;
  clasp_mechanism.add(hinge_caps);

  const clasp_catchGeom = new THREE.CylinderGeometry(
    0.135,
    0.135,
    0.23,
    18
  );
  const clasp_catch = new THREE.Mesh(clasp_catchGeom, goldMat);
  clasp_catch.name = "clasp_catch";
  clasp_catch.position.set(2.28, 0, -0.15);
  clasp_mechanism.add(clasp_catch);

  const clasp_catch_capGeom = new THREE.SphereGeometry(0.137, 16, 10);
  const clasp_catch_cap = new THREE.Mesh(clasp_catch_capGeom, brightGoldMat);
  clasp_catch_cap.name = "clasp_catch_cap";
  clasp_catch_cap.position.set(2.28, 0, -0.275);
  clasp_catch_cap.scale.set(0.72, 1, 1);
  clasp_mechanism.add(clasp_catch_cap);

  const clasp_release_tabsGeom = new THREE.SphereGeometry(0.14, 16, 10);
  const clasp_release_tabs = new THREE.InstancedMesh(
    clasp_release_tabsGeom,
    goldMat,
    2
  );
  clasp_release_tabs.name = "clasp_release_tabs";

  for (let i = 0; i < 2; i++) {
    dummy.position.set(-2.17, i === 0 ? -0.19 : 0.19, -0.12);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1.25, 0.62, 0.72);
    dummy.updateMatrix();
    clasp_release_tabs.setMatrixAt(i, dummy.matrix);
  }
  clasp_release_tabs.instanceMatrix.needsUpdate = true;
  clasp_mechanism.add(clasp_release_tabs);

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
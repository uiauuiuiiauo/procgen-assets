export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyW = 1.0;
  const bodyH = 0.82;
  const bodyD = 0.70;
  const bodyBevel = 0.035;
  const bodyFront = bodyD / 2 + bodyBevel;

  const housingMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2f0,
    metalness: 0.0,
    roughness: 0.8,
  });
  const upper_grille_frameMat = new THREE.MeshStandardMaterial({
    color: 0x292a2d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const upper_grille_recessMat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const upper_grille_slatsMat = new THREE.MeshStandardMaterial({
    color: 0x34363a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const upper_grille_holesMat = new THREE.MeshStandardMaterial({
    color: 0x020303,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brand_badgeMat = new THREE.MeshStandardMaterial({
    color: 0x151618,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brand_markMat = new THREE.MeshStandardMaterial({
    color: 0x55585c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lower_vent_recessMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lower_vent_louversMat = new THREE.MeshStandardMaterial({
    color: 0x202225,
    metalness: 0.0,
    roughness: 0.8,
  });
  const feetMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedRectShape(width, height, radius) {
    const x = width / 2;
    const y = height / 2;
    const r = Math.min(radius, x, y);
    const shape = new THREE.Shape();
    shape.moveTo(-x + r, -y);
    shape.lineTo(x - r, -y);
    shape.quadraticCurveTo(x, -y, x, -y + r);
    shape.lineTo(x, y - r);
    shape.quadraticCurveTo(x, y, x - r, y);
    shape.lineTo(-x + r, y);
    shape.quadraticCurveTo(-x, y, -x, y - r);
    shape.lineTo(-x, -y + r);
    shape.quadraticCurveTo(-x, -y, -x + r, -y);
    shape.closePath();
    return shape;
  }

  function roundedPanelGeometry(width, height, depth, radius, bevelSize) {
    const bevel = Math.min(bevelSize, depth * 0.45, radius * 0.4);
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 10,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const housingShape = roundedRectShape(
    bodyW - bodyBevel * 2,
    bodyH - bodyBevel * 2,
    0.075
  );
  const housingGeom = new THREE.ExtrudeGeometry(housingShape, {
    depth: bodyD,
    steps: 1,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: bodyBevel,
    bevelSize: bodyBevel,
    bevelSegments: 5,
  });
  housingGeom.translate(0, 0, -bodyD / 2);
  const housing = new THREE.Mesh(housingGeom, housingMat);
  root.add(housing);

  const upper_grille_frameGeom = roundedPanelGeometry(
    0.31,
    0.43,
    0.026,
    0.055,
    0.008
  );
  const upper_grille_frame = new THREE.Mesh(
    upper_grille_frameGeom,
    upper_grille_frameMat
  );
  upper_grille_frame.position.set(0.245, 0.15, bodyFront + 0.006);
  root.add(upper_grille_frame);

  const upper_grille_recessGeom = roundedPanelGeometry(
    0.232,
    0.286,
    0.010,
    0.032,
    0.002
  );
  const upper_grille_recess = new THREE.Mesh(
    upper_grille_recessGeom,
    upper_grille_recessMat
  );
  upper_grille_recess.position.set(0.245, 0.205, bodyFront + 0.025);
  root.add(upper_grille_recess);

  const upper_grille_horizontal_slatsGeom = new THREE.BoxGeometry(
    0.205,
    0.009,
    0.007
  );
  const upper_grille_horizontal_slats = new THREE.InstancedMesh(
    upper_grille_horizontal_slatsGeom,
    upper_grille_slatsMat,
    10
  );
  const slatMatrix = new THREE.Matrix4();
  for (let i = 0; i < 10; i++) {
    const y = 0.205 - 0.117 + i * (0.234 / 9);
    slatMatrix.makeTranslation(0.245, y, bodyFront + 0.035);
    upper_grille_horizontal_slats.setMatrixAt(i, slatMatrix);
  }
  upper_grille_horizontal_slats.instanceMatrix.needsUpdate = true;
  root.add(upper_grille_horizontal_slats);

  const upper_grille_vertical_slatsGeom = new THREE.BoxGeometry(
    0.007,
    0.246,
    0.007
  );
  const upper_grille_vertical_slats = new THREE.InstancedMesh(
    upper_grille_vertical_slatsGeom,
    upper_grille_slatsMat,
    7
  );
  for (let i = 0; i < 7; i++) {
    const x = 0.245 - 0.09 + i * (0.18 / 6);
    slatMatrix.makeTranslation(x, 0.205, bodyFront + 0.036);
    upper_grille_vertical_slats.setMatrixAt(i, slatMatrix);
  }
  upper_grille_vertical_slats.instanceMatrix.needsUpdate = true;
  root.add(upper_grille_vertical_slats);

  const holeCols = 7;
  const holeRows = 10;
  const upper_grille_holesGeom = new THREE.CircleGeometry(0.0065, 10);
  const upper_grille_holes = new THREE.InstancedMesh(
    upper_grille_holesGeom,
    upper_grille_holesMat,
    holeCols * holeRows
  );
  const holePosition = new THREE.Vector3();
  const holeQuaternion = new THREE.Quaternion();
  const holeScale = new THREE.Vector3(1.0, 0.62, 1.0);
  const holeMatrix = new THREE.Matrix4();
  let holeIndex = 0;
  for (let row = 0; row < holeRows; row++) {
    const y = 0.205 - 0.117 + row * (0.234 / (holeRows - 1));
    for (let col = 0; col < holeCols; col++) {
      const x = 0.245 - 0.09 + col * (0.18 / (holeCols - 1));
      holePosition.set(x, y, bodyFront + 0.041);
      holeMatrix.compose(holePosition, holeQuaternion, holeScale);
      upper_grille_holes.setMatrixAt(holeIndex++, holeMatrix);
    }
  }
  upper_grille_holes.instanceMatrix.needsUpdate = true;
  root.add(upper_grille_holes);

  const brand_badgeGeom = roundedPanelGeometry(
    0.036,
    0.036,
    0.006,
    0.006,
    0.001
  );
  const brand_badge = new THREE.Mesh(brand_badgeGeom, brand_badgeMat);
  brand_badge.position.set(0.245, -0.005, bodyFront + 0.027);
  root.add(brand_badge);

  const brand_markGeom = new THREE.BoxGeometry(0.003, 0.014, 0.002);
  const brand_mark = new THREE.InstancedMesh(
    brand_markGeom,
    brand_markMat,
    3
  );
  for (let i = 0; i < 3; i++) {
    slatMatrix.makeTranslation(
      0.245 + (i - 1) * 0.0045,
      -0.005,
      bodyFront + 0.033
    );
    brand_mark.setMatrixAt(i, slatMatrix);
  }
  brand_mark.instanceMatrix.needsUpdate = true;
  root.add(brand_mark);

  const lower_vent_recessGeom = roundedPanelGeometry(
    0.252,
    0.31,
    0.012,
    0.045,
    0.003
  );
  const lower_vent_recess = new THREE.Mesh(
    lower_vent_recessGeom,
    lower_vent_recessMat
  );
  lower_vent_recess.position.set(0.245, -0.225, bodyFront + 0.008);
  root.add(lower_vent_recess);

  const lower_vent_louversGeom = new THREE.BoxGeometry(
    0.205,
    0.014,
    0.014
  );
  const lower_vent_louvers = new THREE.InstancedMesh(
    lower_vent_louversGeom,
    lower_vent_louversMat,
    11
  );
  const louverQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-0.12, 0, 0)
  );
  const louverScale = new THREE.Vector3(1, 1, 1);
  const louverPosition = new THREE.Vector3();
  const louverMatrix = new THREE.Matrix4();
  for (let i = 0; i < 11; i++) {
    louverPosition.set(
      0.245,
      -0.225 - 0.125 + i * (0.25 / 10),
      bodyFront + 0.023
    );
    louverMatrix.compose(
      louverPosition,
      louverQuaternion,
      louverScale
    );
    lower_vent_louvers.setMatrixAt(i, louverMatrix);
  }
  lower_vent_louvers.instanceMatrix.needsUpdate = true;
  root.add(lower_vent_louvers);

  const feetGeom = new THREE.CylinderGeometry(0.043, 0.047, 0.05, 16);
  const feet = new THREE.InstancedMesh(feetGeom, feetMat, 4);
  const footPositions = [
    [-0.34, -0.435, 0.24],
    [0.34, -0.435, 0.24],
    [-0.34, -0.435, -0.24],
    [0.34, -0.435, -0.24],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    slatMatrix.makeTranslation(p[0], p[1], p[2]);
    feet.setMatrixAt(i, slatMatrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}
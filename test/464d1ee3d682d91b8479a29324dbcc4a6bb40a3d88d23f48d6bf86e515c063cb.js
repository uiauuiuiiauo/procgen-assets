export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "combination_wrench";

  const tool = new THREE.Group();
  tool.name = "tool";
  tool.rotation.z = -0.38;
  root.add(tool);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xc89559,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x684126,
    metalness: 0.0,
    roughness: 0.9,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0xb5bdc1,
    metalness: 0.5,
    roughness: 0.25,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x181a1b,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeRoundedRectShape(width, height, radius) {
    const x = width / 2;
    const y = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    shape.closePath();
    return shape;
  }

  const wooden_handleProfile = [
    new THREE.Vector2(0.00, -2.72),
    new THREE.Vector2(0.16, -2.72),
    new THREE.Vector2(0.24, -2.69),
    new THREE.Vector2(0.29, -2.62),
    new THREE.Vector2(0.315, -2.50),
    new THREE.Vector2(0.325, -2.25),
    new THREE.Vector2(0.325, -1.80),
    new THREE.Vector2(0.315, -1.25),
    new THREE.Vector2(0.300, -0.75),
    new THREE.Vector2(0.275, -0.32),
    new THREE.Vector2(0.235, 0.02),
    new THREE.Vector2(0.17, 0.11),
    new THREE.Vector2(0.00, 0.11),
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(
    wooden_handleProfile,
    40
  );
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, woodMat);
  wooden_handle.name = "wooden_handle";
  tool.add(wooden_handle);

  function handleRadiusAt(y) {
    if (y < -2.55) return 0.29;
    if (y < -2.25) return 0.315;
    if (y < -1.25) return 0.323;
    if (y < -0.75) return 0.31;
    return 0.30 - (y + 0.75) * 0.065;
  }

  const wood_grainGeom = new THREE.BoxGeometry(0.014, 0.105, 0.006);
  const wood_grain = new THREE.InstancedMesh(
    wood_grainGeom,
    woodGrainMat,
    36
  );
  wood_grain.name = "wood_grain";
  const grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 36; i++) {
    const y = -2.48 + i * 0.074;
    const xIndex = (i * 11) % 29;
    const x = -0.21 + xIndex / 28 * 0.42;
    const radius = handleRadiusAt(y);
    const z = Math.sqrt(Math.max(0.001, radius * radius - x * x)) + 0.004;
    grain_dummy.position.set(x, y, z);
    grain_dummy.rotation.set(
      -Math.asin(x / radius),
      0,
      ((i % 7) - 3) * 0.045
    );
    grain_dummy.scale.set(
      0.55 + (i % 4) * 0.15,
      0.55 + (i % 5) * 0.16,
      1
    );
    grain_dummy.updateMatrix();
    wood_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  wood_grain.instanceMatrix.needsUpdate = true;
  tool.add(wood_grain);

  const butt_capGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.035, 32);
  const butt_cap = new THREE.Mesh(butt_capGeom, silverMat);
  butt_cap.name = "butt_cap";
  butt_cap.position.y = -2.73;
  tool.add(butt_cap);

  const butt_rimGeom = new THREE.TorusGeometry(0.18, 0.018, 8, 32);
  const butt_rim = new THREE.Mesh(butt_rimGeom, silverMat);
  butt_rim.name = "butt_rim";
  butt_rim.rotation.x = Math.PI / 2;
  butt_rim.position.y = -2.751;
  tool.add(butt_rim);

  const end_holeGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.012, 20);
  const end_hole = new THREE.Mesh(end_holeGeom, recessMat);
  end_hole.name = "end_hole";
  end_hole.position.y = -2.756;
  tool.add(end_hole);

  const metal_shankShape = new THREE.Shape();
  metal_shankShape.moveTo(-0.20, -0.04);
  metal_shankShape.bezierCurveTo(-0.22, 0.12, -0.24, 0.34, -0.26, 0.50);
  metal_shankShape.bezierCurveTo(-0.29, 0.68, -0.38, 0.83, -0.52, 0.94);
  metal_shankShape.bezierCurveTo(-0.63, 1.03, -0.69, 1.16, -0.69, 1.31);
  metal_shankShape.bezierCurveTo(-0.69, 1.45, -0.65, 1.57, -0.58, 1.66);
  metal_shankShape.lineTo(-0.31, 1.88);
  metal_shankShape.quadraticCurveTo(-0.25, 1.94, -0.20, 1.85);
  metal_shankShape.lineTo(-0.03, 1.48);
  metal_shankShape.bezierCurveTo(0.02, 1.37, 0.16, 1.35, 0.25, 1.43);
  metal_shankShape.lineTo(0.50, 1.82);
  metal_shankShape.quadraticCurveTo(0.56, 1.92, 0.62, 1.83);
  metal_shankShape.lineTo(0.80, 1.45);
  metal_shankShape.bezierCurveTo(0.87, 1.30, 0.87, 1.12, 0.79, 0.99);
  metal_shankShape.bezierCurveTo(0.69, 0.84, 0.53, 0.75, 0.42, 0.63);
  metal_shankShape.bezierCurveTo(0.31, 0.50, 0.25, 0.30, 0.22, 0.08);
  metal_shankShape.lineTo(0.19, -0.04);
  metal_shankShape.closePath();

  const metal_shankGeom = new THREE.ExtrudeGeometry(metal_shankShape, {
    depth: 0.12,
    steps: 1,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const metal_shank = new THREE.Mesh(metal_shankGeom, brushedMetalMat);
  metal_shank.name = "metal_shank";
  metal_shank.position.z = -0.06;
  tool.add(metal_shank);

  const shank_inset_borderShape = makeRoundedRectShape(0.285, 0.55, 0.075);
  const shank_inset_borderGeom = new THREE.ExtrudeGeometry(
    shank_inset_borderShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.006,
      bevelSegments: 2,
    }
  );
  const shank_inset_border = new THREE.Mesh(
    shank_inset_borderGeom,
    darkMetalMat
  );
  shank_inset_border.name = "shank_inset_border";
  shank_inset_border.position.set(0, 0.39, 0.086);
  tool.add(shank_inset_border);

  const shank_insetShape = makeRoundedRectShape(0.225, 0.46, 0.06);
  const shank_insetGeom = new THREE.ExtrudeGeometry(shank_insetShape, {
    depth: 0.01,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  const shank_inset = new THREE.Mesh(shank_insetGeom, silverMat);
  shank_inset.name = "shank_inset";
  shank_inset.position.set(0, 0.39, 0.101);
  tool.add(shank_inset);

  const adjustment_recessShape = makeRoundedRectShape(0.50, 0.38, 0.095);
  const adjustment_recessGeom = new THREE.ExtrudeGeometry(
    adjustment_recessShape,
    {
      depth: 0.014,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.008,
      bevelSegments: 2,
    }
  );
  const adjustment_recess = new THREE.Mesh(
    adjustment_recessGeom,
    recessMat
  );
  adjustment_recess.name = "adjustment_recess";
  adjustment_recess.position.set(0, 0.96, 0.086);
  tool.add(adjustment_recess);

  const worm_gearGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.42, 24);
  const worm_gear = new THREE.Mesh(worm_gearGeom, brushedMetalMat);
  worm_gear.name = "worm_gear";
  worm_gear.rotation.z = Math.PI / 2;
  worm_gear.position.set(0, 0.96, 0.135);
  tool.add(worm_gear);

  const worm_ridgesGeom = new THREE.TorusGeometry(0.096, 0.009, 8, 24);
  const worm_ridges = new THREE.InstancedMesh(
    worm_ridgesGeom,
    darkMetalMat,
    5
  );
  worm_ridges.name = "worm_ridges";
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    ridge_dummy.position.set(-0.16 + i * 0.08, 0.96, 0.135);
    ridge_dummy.rotation.set(0, Math.PI / 2, 0);
    ridge_dummy.scale.set(1, 1, 1);
    ridge_dummy.updateMatrix();
    worm_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  worm_ridges.instanceMatrix.needsUpdate = true;
  tool.add(worm_ridges);

  const worm_endGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.025, 20);
  const worm_left_end = new THREE.Mesh(worm_endGeom, silverMat);
  worm_left_end.name = "worm_left_end";
  worm_left_end.rotation.z = Math.PI / 2;
  worm_left_end.position.set(-0.22, 0.96, 0.135);
  tool.add(worm_left_end);

  const worm_right_end = new THREE.Mesh(worm_endGeom, silverMat);
  worm_right_end.name = "worm_right_end";
  worm_right_end.rotation.z = Math.PI / 2;
  worm_right_end.position.set(0.22, 0.96, 0.135);
  tool.add(worm_right_end);

  fitToUnitCube(root);
  return root;

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
}
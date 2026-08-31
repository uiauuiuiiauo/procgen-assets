export default function generate(THREE) {
  const root = new THREE.Group();

  const wooden_baseMat = new THREE.MeshStandardMaterial({
    color: 0x9a6338,
    metalness: 0.0,
    roughness: 0.6,
  });
  const base_topMat = new THREE.MeshStandardMaterial({
    color: 0xb47c49,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x654025,
    metalness: 0.0,
    roughness: 0.9,
  });
  const candle_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf2eedc,
    metalness: 0.0,
    roughness: 0.7,
  });
  const wax_poolMat = new THREE.MeshStandardMaterial({
    color: 0xffe7ad,
    metalness: 0.0,
    roughness: 0.7,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x241713,
    metalness: 0.0,
    roughness: 0.9,
  });
  const charred_wickMat = new THREE.MeshStandardMaterial({
    color: 0x6b2d13,
    metalness: 0.0,
    roughness: 0.9,
  });
  const flame_glowMat = new THREE.MeshBasicMaterial({
    color: 0xffb34d,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const outer_flameMat = new THREE.MeshStandardMaterial({
    color: 0xffb43b,
    emissive: 0xffb43b,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const inner_flameMat = new THREE.MeshStandardMaterial({
    color: 0xfff9e8,
    emissive: 0xfff9e8,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
    transparent: true,
    opacity: 0.94,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const wooden_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.67, 0.00),
    new THREE.Vector2(0.73, 0.018),
    new THREE.Vector2(0.765, 0.065),
    new THREE.Vector2(0.775, 0.14),
    new THREE.Vector2(0.775, 0.29),
    new THREE.Vector2(0.755, 0.35),
    new THREE.Vector2(0.705, 0.39),
    new THREE.Vector2(0.00, 0.39),
  ];
  const wooden_baseGeom = new THREE.LatheGeometry(wooden_baseProfile, 64);
  const wooden_base = new THREE.Mesh(wooden_baseGeom, wooden_baseMat);
  root.add(wooden_base);

  const base_topGeom = new THREE.CylinderGeometry(0.705, 0.705, 0.018, 64);
  const base_top = new THREE.Mesh(base_topGeom, base_topMat);
  base_top.position.y = 0.395;
  root.add(base_top);

  const top_grainGeom = new THREE.BoxGeometry(1, 0.004, 0.009);
  const top_grain = new THREE.InstancedMesh(top_grainGeom, wood_grainMat, 17);
  const grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 17; i++) {
    const z = -0.57 + i * 0.07;
    const halfLength = Math.sqrt(Math.max(0, 0.66 * 0.66 - z * z));
    const length = halfLength * 1.76;
    const x = ((i % 4) - 1.5) * 0.018;
    grain_dummy.position.set(x, 0.406, z);
    grain_dummy.rotation.set(0, ((i % 5) - 2) * 0.018, 0);
    grain_dummy.scale.set(length, 1, 1);
    grain_dummy.updateMatrix();
    top_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  top_grain.instanceMatrix.needsUpdate = true;
  root.add(top_grain);

  const side_grainGeom = new THREE.BoxGeometry(0.11, 0.006, 0.006);
  const side_grain = new THREE.InstancedMesh(side_grainGeom, wood_grainMat, 42);
  for (let i = 0; i < 42; i++) {
    const angle = i * 2.399963;
    const y = 0.055 + (((i * 11) % 31) / 31) * 0.255;
    const radius = 0.779;
    const lengthScale = 0.55 + ((i * 7) % 13) / 13;
    grain_dummy.position.set(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
    grain_dummy.rotation.set(0, angle, ((i % 5) - 2) * 0.035);
    grain_dummy.scale.set(lengthScale, 1, 1);
    grain_dummy.updateMatrix();
    side_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  side_grain.instanceMatrix.needsUpdate = true;
  root.add(side_grain);

  const candle_bodyProfile = [
    new THREE.Vector2(0.00, 0.385),
    new THREE.Vector2(0.235, 0.385),
    new THREE.Vector2(0.270, 0.405),
    new THREE.Vector2(0.282, 0.46),
    new THREE.Vector2(0.282, 3.61),
    new THREE.Vector2(0.278, 3.68),
    new THREE.Vector2(0.250, 3.715),
    new THREE.Vector2(0.160, 3.705),
    new THREE.Vector2(0.00, 3.685),
  ];
  const candle_bodyGeom = new THREE.LatheGeometry(candle_bodyProfile, 64);
  const candle_body = new THREE.Mesh(candle_bodyGeom, candle_bodyMat);
  root.add(candle_body);

  const wax_poolGeom = new THREE.CylinderGeometry(0.158, 0.158, 0.008, 48);
  const wax_pool = new THREE.Mesh(wax_poolGeom, wax_poolMat);
  wax_pool.position.y = 3.692;
  root.add(wax_pool);

  const wax_rimGeom = new THREE.TorusGeometry(0.225, 0.012, 8, 48);
  const wax_rim = new THREE.Mesh(wax_rimGeom, candle_bodyMat);
  wax_rim.rotation.x = Math.PI / 2;
  wax_rim.position.y = 3.706;
  root.add(wax_rim);

  const wax_dripGeom = new THREE.SphereGeometry(1, 16, 10);
  const front_wax_drip = new THREE.Mesh(wax_dripGeom, candle_bodyMat);
  front_wax_drip.position.set(-0.12, 3.48, 0.263);
  front_wax_drip.scale.set(0.052, 0.19, 0.026);
  root.add(front_wax_drip);

  const right_wax_drip = new THREE.Mesh(wax_dripGeom, candle_bodyMat);
  right_wax_drip.position.set(0.19, 3.32, 0.205);
  right_wax_drip.scale.set(0.035, 0.125, 0.022);
  root.add(right_wax_drip);

  const wickPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, 3.69, 0.015),
    new THREE.Vector3(0.018, 3.82, 0.018),
    new THREE.Vector3(-0.012, 3.93, 0.022),
    new THREE.Vector3(-0.095, 4.005, 0.026),
  ]);
  const wickGeom = new THREE.TubeGeometry(wickPath, 20, 0.023, 8, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  root.add(wick);

  const charred_wickGeom = new THREE.SphereGeometry(0.03, 12, 8);
  const charred_wick = new THREE.Mesh(charred_wickGeom, charred_wickMat);
  charred_wick.position.set(-0.098, 4.008, 0.027);
  charred_wick.scale.set(1.25, 0.75, 0.85);
  root.add(charred_wick);

  const flame_group = new THREE.Group();
  flame_group.position.set(0.012, 3.75, 0);
  flame_group.rotation.z = -0.025;
  root.add(flame_group);

  const flame_glowProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.10, 0.05),
    new THREE.Vector2(0.205, 0.25),
    new THREE.Vector2(0.19, 0.55),
    new THREE.Vector2(0.13, 0.88),
    new THREE.Vector2(0.055, 1.18),
    new THREE.Vector2(0.00, 1.34),
  ];
  const flame_glowGeom = new THREE.LatheGeometry(flame_glowProfile, 40);
  const flame_glow = new THREE.Mesh(flame_glowGeom, flame_glowMat);
  flame_glow.scale.z = 0.72;
  flame_group.add(flame_glow);

  const outer_flameProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.085, 0.035),
    new THREE.Vector2(0.175, 0.22),
    new THREE.Vector2(0.165, 0.50),
    new THREE.Vector2(0.112, 0.82),
    new THREE.Vector2(0.047, 1.10),
    new THREE.Vector2(0.00, 1.27),
  ];
  const outer_flameGeom = new THREE.LatheGeometry(outer_flameProfile, 48);
  const outer_flame = new THREE.Mesh(outer_flameGeom, outer_flameMat);
  outer_flame.scale.z = 0.76;
  flame_group.add(outer_flame);

  const inner_flameProfile = [
    new THREE.Vector2(0.00, 0.025),
    new THREE.Vector2(0.060, 0.055),
    new THREE.Vector2(0.112, 0.20),
    new THREE.Vector2(0.105, 0.42),
    new THREE.Vector2(0.070, 0.67),
    new THREE.Vector2(0.025, 0.88),
    new THREE.Vector2(0.00, 0.96),
  ];
  const inner_flameGeom = new THREE.LatheGeometry(inner_flameProfile, 48);
  const inner_flame = new THREE.Mesh(inner_flameGeom, inner_flameMat);
  inner_flame.position.y = 0.035;
  inner_flame.position.z = 0.004;
  inner_flame.scale.z = 0.72;
  flame_group.add(inner_flame);

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
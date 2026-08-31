export default function generate(THREE) {
  const root = new THREE.Group();

  const wooden_handleMat = new THREE.MeshStandardMaterial({
    color: 0xa66a35,
    metalness: 0.0,
    roughness: 0.6,
  });
  const butt_endMat = new THREE.MeshStandardMaterial({
    color: 0x93603a,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x5b301b,
    metalness: 0.0,
    roughness: 0.6,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_ringMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.0,
    roughness: 0.8,
  });

  const wooden_handleProfile = [
    new THREE.Vector2(0.000, -0.720),
    new THREE.Vector2(0.164, -0.720),
    new THREE.Vector2(0.174, -0.680),
    new THREE.Vector2(0.180, -0.610),
    new THREE.Vector2(0.182, -0.480),
    new THREE.Vector2(0.182, 0.500),
    new THREE.Vector2(0.179, 0.590),
    new THREE.Vector2(0.168, 0.660),
    new THREE.Vector2(0.145, 0.710),
    new THREE.Vector2(0.000, 0.710),
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(wooden_handleProfile, 64);
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, wooden_handleMat);
  wooden_handle.rotation.x = Math.PI / 2;
  wooden_handle.position.z = -0.66;
  root.add(wooden_handle);

  const butt_endGeom = new THREE.CylinderGeometry(0.164, 0.164, 0.008, 64);
  const butt_end = new THREE.Mesh(butt_endGeom, butt_endMat);
  butt_end.rotation.x = Math.PI / 2;
  butt_end.position.z = -1.384;
  root.add(butt_end);

  const butt_end_grooveGeom = new THREE.TorusGeometry(0.174, 0.006, 8, 64);
  const butt_end_groove = new THREE.Mesh(butt_end_grooveGeom, wood_grainMat);
  butt_end_groove.position.z = -1.285;
  root.add(butt_end_groove);

  const wood_grain = new THREE.Group();
  const grainCount = 14;
  for (let i = 0; i < grainCount; i++) {
    const points = [];
    const baseAngle = (i / grainCount) * Math.PI * 2;
    const startZ = -1.265 + (i % 3) * 0.025;
    const endZ = -0.075 - (i % 4) * 0.025;

    for (let j = 0; j <= 8; j++) {
      const t = j / 8;
      const z = startZ + (endZ - startZ) * t;
      const angle =
        baseAngle +
        Math.sin(j * 1.35 + i * 0.72) * 0.014 +
        Math.sin(t * Math.PI) * 0.018;
      const radius = 0.1835;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          z
        )
      );
    }

    const grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      24,
      0.0022 + (i % 3) * 0.00035,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grain_lineGeom, wood_grainMat);
    wood_grain.add(grain_line);
  }
  root.add(wood_grain);

  const wood_knotGeom = new THREE.CircleGeometry(0.027, 20);
  const wood_knot = new THREE.Mesh(wood_knotGeom, wood_grainMat);
  wood_knot.scale.set(1.0, 0.55, 1.0);
  wood_knot.rotation.x = -Math.PI / 2;
  wood_knot.position.set(0.018, 0.184, -0.73);
  root.add(wood_knot);

  const wood_knot_centerGeom = new THREE.CircleGeometry(0.010, 16);
  const wood_knot_center = new THREE.Mesh(wood_knot_centerGeom, dark_ringMat);
  wood_knot_center.scale.set(1.0, 0.5, 1.0);
  wood_knot_center.rotation.x = -Math.PI / 2;
  wood_knot_center.position.set(0.018, 0.185, -0.73);
  root.add(wood_knot_center);

  const butt_end_markGeom = new THREE.CircleGeometry(0.018, 16);
  const butt_end_mark = new THREE.Mesh(butt_end_markGeom, wood_grainMat);
  butt_end_mark.scale.set(0.65, 1.25, 1.0);
  butt_end_mark.rotation.y = Math.PI;
  butt_end_mark.position.set(0.025, -0.018, -1.389);
  root.add(butt_end_mark);

  const ferruleProfile = [
    new THREE.Vector2(0.000, -0.105),
    new THREE.Vector2(0.112, -0.105),
    new THREE.Vector2(0.132, -0.085),
    new THREE.Vector2(0.145, -0.040),
    new THREE.Vector2(0.145, 0.050),
    new THREE.Vector2(0.137, 0.080),
    new THREE.Vector2(0.118, 0.105),
    new THREE.Vector2(0.000, 0.105),
  ];
  const ferruleGeom = new THREE.LatheGeometry(ferruleProfile, 48);
  const ferrule = new THREE.Mesh(ferruleGeom, polished_metalMat);
  ferrule.rotation.x = Math.PI / 2;
  ferrule.position.z = 0.11;
  root.add(ferrule);

  const ferrule_shadowGeom = new THREE.TorusGeometry(0.113, 0.005, 8, 48);
  const ferrule_shadow = new THREE.Mesh(ferrule_shadowGeom, dark_ringMat);
  ferrule_shadow.position.z = 0.002;
  root.add(ferrule_shadow);

  const main_shaftGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.75, 48);
  const main_shaft = new THREE.Mesh(main_shaftGeom, polished_metalMat);
  main_shaft.rotation.x = Math.PI / 2;
  main_shaft.position.z = 0.56;
  root.add(main_shaft);

  const shaft_base_ringGeom = new THREE.TorusGeometry(0.053, 0.004, 8, 48);
  const shaft_base_ring = new THREE.Mesh(shaft_base_ringGeom, polished_metalMat);
  shaft_base_ring.position.z = 0.215;
  root.add(shaft_base_ring);

  const tip_separatorGeom = new THREE.TorusGeometry(0.055, 0.006, 8, 48);
  const tip_separator = new THREE.Mesh(tip_separatorGeom, dark_ringMat);
  tip_separator.position.z = 0.935;
  root.add(tip_separator);

  const tip_sleeveProfile = [
    new THREE.Vector2(0.000, -0.105),
    new THREE.Vector2(0.054, -0.105),
    new THREE.Vector2(0.061, -0.087),
    new THREE.Vector2(0.065, -0.055),
    new THREE.Vector2(0.065, 0.060),
    new THREE.Vector2(0.061, 0.087),
    new THREE.Vector2(0.052, 0.105),
    new THREE.Vector2(0.000, 0.105),
  ];
  const tip_sleeveGeom = new THREE.LatheGeometry(tip_sleeveProfile, 48);
  const tip_sleeve = new THREE.Mesh(tip_sleeveGeom, polished_metalMat);
  tip_sleeve.rotation.x = Math.PI / 2;
  tip_sleeve.position.z = 1.035;
  root.add(tip_sleeve);

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
export default function generate(THREE) {
  const root = new THREE.Group();
  const base_assembly = new THREE.Group();
  const light_assembly = new THREE.Group();
  const upper_assembly = new THREE.Group();
  root.add(base_assembly, light_assembly, upper_assembly);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9b622f,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x5b351b,
    metalness: 0.0,
    roughness: 0.9
  });
  const frostedGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xeadfc8,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glowHaloMat = new THREE.MeshStandardMaterial({
    color: 0xffc66f,
    metalness: 0.0,
    roughness: 0.8,
    emissive: 0xffc66f,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });
  const glowCoreMat = new THREE.MeshStandardMaterial({
    color: 0xfff1c7,
    metalness: 0.0,
    roughness: 0.8,
    emissive: 0xfff1c7,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.58,
    depthWrite: false
  });
  const innerLightMat = new THREE.MeshStandardMaterial({
    color: 0xffd58a,
    metalness: 0.0,
    roughness: 0.8,
    emissive: 0xffd58a,
    emissiveIntensity: 1.0
  });

  const base_footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.68, 0.00),
    new THREE.Vector2(0.75, 0.015),
    new THREE.Vector2(0.81, 0.055),
    new THREE.Vector2(0.84, 0.12),
    new THREE.Vector2(0.84, 0.18),
    new THREE.Vector2(0.81, 0.24),
    new THREE.Vector2(0.76, 0.30),
    new THREE.Vector2(0.69, 0.35),
    new THREE.Vector2(0.00, 0.35)
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile, 64);
  const base_foot = new THREE.Mesh(base_footGeom, woodMat);
  base_assembly.add(base_foot);

  const base_pedestalProfile = [
    new THREE.Vector2(0.00, 0.30),
    new THREE.Vector2(0.66, 0.30),
    new THREE.Vector2(0.69, 0.34),
    new THREE.Vector2(0.70, 0.39),
    new THREE.Vector2(0.68, 0.44),
    new THREE.Vector2(0.64, 0.49),
    new THREE.Vector2(0.62, 0.54),
    new THREE.Vector2(0.63, 0.59),
    new THREE.Vector2(0.67, 0.64),
    new THREE.Vector2(0.73, 0.69),
    new THREE.Vector2(0.79, 0.74),
    new THREE.Vector2(0.81, 0.78),
    new THREE.Vector2(0.79, 0.82),
    new THREE.Vector2(0.74, 0.86),
    new THREE.Vector2(0.00, 0.86)
  ];
  const base_pedestalGeom = new THREE.LatheGeometry(base_pedestalProfile, 64);
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, woodMat);
  base_assembly.add(base_pedestal);

  const base_grooveGeom = new THREE.TorusGeometry(0.685, 0.012, 8, 64);
  const base_groove = new THREE.Mesh(base_grooveGeom, darkWoodMat);
  base_groove.rotation.x = Math.PI / 2;
  base_groove.position.y = 0.355;
  base_assembly.add(base_groove);

  const base_upper_grooveGeom = new THREE.TorusGeometry(0.745, 0.009, 8, 64);
  const base_upper_groove = new THREE.Mesh(base_upper_grooveGeom, darkWoodMat);
  base_upper_groove.rotation.x = Math.PI / 2;
  base_upper_groove.position.y = 0.695;
  base_assembly.add(base_upper_groove);

  const base_rimGeom = new THREE.TorusGeometry(0.775, 0.027, 12, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, woodMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.79;
  base_assembly.add(base_rim);

  const base_shadow_ringGeom = new THREE.TorusGeometry(0.755, 0.011, 8, 64);
  const base_shadow_ring = new THREE.Mesh(base_shadow_ringGeom, darkWoodMat);
  base_shadow_ring.rotation.x = Math.PI / 2;
  base_shadow_ring.position.y = 0.818;
  base_assembly.add(base_shadow_ring);

  const inner_lightGeom = new THREE.SphereGeometry(0.38, 32, 20);
  const inner_light = new THREE.Mesh(inner_lightGeom, innerLightMat);
  inner_light.position.set(0, 1.22, 0);
  inner_light.scale.set(1.0, 1.18, 1.0);
  light_assembly.add(inner_light);

  const glow_haloGeom = new THREE.SphereGeometry(0.58, 32, 20);
  const glow_halo = new THREE.Mesh(glow_haloGeom, glowHaloMat);
  glow_halo.position.set(0, 1.25, 0);
  glow_halo.scale.set(1.0, 1.12, 1.0);
  glow_halo.renderOrder = 1;
  light_assembly.add(glow_halo);

  const glow_coreGeom = new THREE.SphereGeometry(0.27, 28, 18);
  const glow_core = new THREE.Mesh(glow_coreGeom, glowCoreMat);
  glow_core.position.set(0, 1.20, 0);
  glow_core.scale.set(1.0, 1.15, 1.0);
  glow_core.renderOrder = 1;
  light_assembly.add(glow_core);

  const glass_bodyProfile = [
    new THREE.Vector2(0.00, 0.76),
    new THREE.Vector2(0.68, 0.76),
    new THREE.Vector2(0.76, 0.78),
    new THREE.Vector2(0.83, 0.83),
    new THREE.Vector2(0.89, 0.92),
    new THREE.Vector2(0.93, 1.06),
    new THREE.Vector2(0.95, 1.25),
    new THREE.Vector2(0.95, 2.84),
    new THREE.Vector2(0.94, 3.02),
    new THREE.Vector2(0.91, 3.18),
    new THREE.Vector2(0.86, 3.32),
    new THREE.Vector2(0.79, 3.44),
    new THREE.Vector2(0.70, 3.54),
    new THREE.Vector2(0.60, 3.61),
    new THREE.Vector2(0.53, 3.65),
    new THREE.Vector2(0.50, 3.68),
    new THREE.Vector2(0.00, 3.68)
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, frostedGlassMat);
  glass_body.renderOrder = 2;
  light_assembly.add(glass_body);

  const top_collarProfile = [
    new THREE.Vector2(0.49, 3.58),
    new THREE.Vector2(0.52, 3.59),
    new THREE.Vector2(0.54, 3.63),
    new THREE.Vector2(0.545, 3.69),
    new THREE.Vector2(0.545, 3.88),
    new THREE.Vector2(0.535, 3.92),
    new THREE.Vector2(0.50, 3.94),
    new THREE.Vector2(0.43, 3.94),
    new THREE.Vector2(0.42, 3.92),
    new THREE.Vector2(0.42, 3.69),
    new THREE.Vector2(0.44, 3.63),
    new THREE.Vector2(0.47, 3.59),
    new THREE.Vector2(0.49, 3.58)
  ];
  const top_collarGeom = new THREE.LatheGeometry(top_collarProfile, 64);
  const top_collar = new THREE.Mesh(top_collarGeom, woodMat);
  upper_assembly.add(top_collar);

  const top_lipGeom = new THREE.TorusGeometry(0.475, 0.022, 10, 64);
  const top_lip = new THREE.Mesh(top_lipGeom, woodMat);
  top_lip.rotation.x = Math.PI / 2;
  top_lip.position.y = 3.925;
  upper_assembly.add(top_lip);

  const top_lower_grooveGeom = new THREE.TorusGeometry(0.522, 0.008, 8, 64);
  const top_lower_groove = new THREE.Mesh(top_lower_grooveGeom, darkWoodMat);
  top_lower_groove.rotation.x = Math.PI / 2;
  top_lower_groove.position.y = 3.625;
  upper_assembly.add(top_lower_groove);

  const wood_grain_ringsGeom = new THREE.TorusGeometry(0.5, 0.004, 6, 64);
  const grainRingSpecs = [
    [0.806, 0.055], [0.824, 0.090], [0.833, 0.125],
    [0.835, 0.160], [0.824, 0.195], [0.800, 0.230],
    [0.765, 0.270], [0.718, 0.310],
    [0.686, 0.385], [0.660, 0.445], [0.635, 0.510],
    [0.650, 0.570], [0.690, 0.630], [0.745, 0.690],
    [0.790, 0.748], [0.797, 0.785], [0.775, 0.815],
    [0.544, 3.665], [0.545, 3.710], [0.545, 3.755],
    [0.545, 3.800], [0.544, 3.845], [0.540, 3.890]
  ];
  const wood_grain_rings = new THREE.InstancedMesh(
    wood_grain_ringsGeom,
    darkWoodMat,
    grainRingSpecs.length
  );
  const grain_ring_dummy = new THREE.Object3D();
  for (let i = 0; i < grainRingSpecs.length; i++) {
    const radius = grainRingSpecs[i][0];
    const y = grainRingSpecs[i][1];
    const radialScale = radius / 0.5;
    grain_ring_dummy.position.set(0, y, 0);
    grain_ring_dummy.rotation.set(Math.PI / 2, 0, 0);
    grain_ring_dummy.scale.set(radialScale, radialScale, 1);
    grain_ring_dummy.updateMatrix();
    wood_grain_rings.setMatrixAt(i, grain_ring_dummy.matrix);
  }
  wood_grain_rings.instanceMatrix.needsUpdate = true;
  root.add(wood_grain_rings);

  const wood_specklesGeom = new THREE.CircleGeometry(0.012, 8);
  const wood_speckles = new THREE.InstancedMesh(
    wood_specklesGeom,
    darkWoodMat,
    30
  );
  const speckle_dummy = new THREE.Object3D();
  const outward_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 30; i++) {
    const angle = i * 2.399963229728653;
    const y = 0.055 + ((i * 37) % 101) / 101 * 0.72;
    let radius = 0.82;
    if (y > 0.34 && y < 0.50) radius = 0.69;
    else if (y > 0.50 && y < 0.66) radius = 0.64 + (y - 0.50) * 0.5;
    else if (y > 0.66) radius = 0.72 + (y - 0.66) * 0.75;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    speckle_dummy.position.set(
      normal.x * (radius + 0.004),
      y,
      normal.z * (radius + 0.004)
    );
    speckle_dummy.quaternion.setFromUnitVectors(outward_axis, normal);
    speckle_dummy.scale.set(
      0.45 + ((i * 7) % 9) / 10,
      0.35 + ((i * 5) % 11) / 10,
      1
    );
    speckle_dummy.updateMatrix();
    wood_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  wood_speckles.instanceMatrix.needsUpdate = true;
  base_assembly.add(wood_speckles);

  const top_wood_speckles = new THREE.InstancedMesh(
    wood_grain_ringsGeom,
    darkWoodMat,
    14
  );
  const top_speckle_dummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const angle = i * 2.17;
    const y = 3.65 + ((i * 29) % 97) / 97 * 0.245;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    top_speckle_dummy.position.set(
      normal.x * 0.549,
      y,
      normal.z * 0.549
    );
    top_speckle_dummy.rotation.set(Math.PI / 2, 0, 0);
    top_speckle_dummy.scale.set(0.004, 0.004, 0.003);
    top_speckle_dummy.updateMatrix();
    top_wood_speckles.setMatrixAt(i, top_speckle_dummy.matrix);
  }
  top_wood_speckles.instanceMatrix.needsUpdate = true;
  upper_assembly.add(top_wood_speckles);

  const top_wood_knotGeom = new THREE.CircleGeometry(0.06, 18);
  const top_wood_knot = new THREE.Mesh(top_wood_knotGeom, darkWoodMat);
  const top_knot_angle = 2.08;
  const top_knot_normal = new THREE.Vector3(
    Math.cos(top_knot_angle),
    0,
    Math.sin(top_knot_angle)
  );
  top_wood_knot.position.set(
    top_knot_normal.x * 0.55,
    3.79,
    top_knot_normal.z * 0.55
  );
  top_wood_knot.quaternion.setFromUnitVectors(outward_axis, top_knot_normal);
  top_wood_knot.scale.set(0.55, 1.25, 1);
  upper_assembly.add(top_wood_knot);

  const base_wood_knotGeom = new THREE.CircleGeometry(0.055, 18);
  const base_wood_knot = new THREE.Mesh(base_wood_knotGeom, darkWoodMat);
  const base_knot_angle = 2.02;
  const base_knot_normal = new THREE.Vector3(
    Math.cos(base_knot_angle),
    0,
    Math.sin(base_knot_angle)
  );
  base_wood_knot.position.set(
    base_knot_normal.x * 0.805,
    0.685,
    base_knot_normal.z * 0.805
  );
  base_wood_knot.quaternion.setFromUnitVectors(outward_axis, base_knot_normal);
  base_wood_knot.scale.set(0.65, 1.15, 1);
  base_assembly.add(base_wood_knot);

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
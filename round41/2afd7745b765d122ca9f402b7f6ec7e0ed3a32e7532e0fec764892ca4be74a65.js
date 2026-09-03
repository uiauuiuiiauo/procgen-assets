export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bamboo_glass_lantern";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const diffuser_assembly = new THREE.Group();
  diffuser_assembly.name = "diffuser_assembly";
  root.add(diffuser_assembly);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xa66f32,
    metalness: 0.0,
    roughness: 0.6
  });

  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x5b351a,
    metalness: 0.0,
    roughness: 0.6
  });

  const glass_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3e5c9,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });

  const inner_glowMat = new THREE.MeshStandardMaterial({
    color: 0xffc36a,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xffa43a,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.3,
    depthWrite: false
  });

  const glow_coreMat = new THREE.MeshStandardMaterial({
    color: 0xfff0c7,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xffd27a,
    emissiveIntensity: 1.0
  });

  const bottom_wood_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.86, 0.00),
    new THREE.Vector2(0.96, 0.025),
    new THREE.Vector2(1.025, 0.10),
    new THREE.Vector2(1.04, 0.22),
    new THREE.Vector2(1.00, 0.34),
    new THREE.Vector2(0.91, 0.43),
    new THREE.Vector2(0.80, 0.47),
    new THREE.Vector2(0.00, 0.47)
  ];
  const bottom_wood_baseGeom = new THREE.LatheGeometry(bottom_wood_baseProfile, 64);
  const bottom_wood_base = new THREE.Mesh(bottom_wood_baseGeom, woodMat);
  bottom_wood_base.name = "bottom_wood_base";
  base_assembly.add(bottom_wood_base);

  const middle_wood_cradleProfile = [
    new THREE.Vector2(0.00, 0.42),
    new THREE.Vector2(0.79, 0.42),
    new THREE.Vector2(0.82, 0.47),
    new THREE.Vector2(0.82, 0.55),
    new THREE.Vector2(0.88, 0.63),
    new THREE.Vector2(0.97, 0.72),
    new THREE.Vector2(1.06, 0.82),
    new THREE.Vector2(1.08, 0.90),
    new THREE.Vector2(1.04, 0.97),
    new THREE.Vector2(0.95, 1.02),
    new THREE.Vector2(0.00, 1.02)
  ];
  const middle_wood_cradleGeom = new THREE.LatheGeometry(middle_wood_cradleProfile, 64);
  const middle_wood_cradle = new THREE.Mesh(middle_wood_cradleGeom, woodMat);
  middle_wood_cradle.name = "middle_wood_cradle";
  base_assembly.add(middle_wood_cradle);

  const base_step_grooveGeom = new THREE.TorusGeometry(0.82, 0.014, 8, 64);
  const base_step_groove = new THREE.Mesh(base_step_grooveGeom, darkWoodMat);
  base_step_groove.name = "base_step_groove";
  base_step_groove.rotation.x = Math.PI / 2;
  base_step_groove.position.y = 0.47;
  base_assembly.add(base_step_groove);

  const middle_lower_grooveGeom = new THREE.TorusGeometry(0.83, 0.012, 8, 64);
  const middle_lower_groove = new THREE.Mesh(middle_lower_grooveGeom, darkWoodMat);
  middle_lower_groove.name = "middle_lower_groove";
  middle_lower_groove.rotation.x = Math.PI / 2;
  middle_lower_groove.position.y = 0.56;
  base_assembly.add(middle_lower_groove);

  const middle_upper_rimGeom = new THREE.TorusGeometry(1.015, 0.055, 12, 64);
  const middle_upper_rim = new THREE.Mesh(middle_upper_rimGeom, woodMat);
  middle_upper_rim.name = "middle_upper_rim";
  middle_upper_rim.rotation.x = Math.PI / 2;
  middle_upper_rim.position.y = 0.96;
  base_assembly.add(middle_upper_rim);

  const middle_rim_grooveGeom = new THREE.TorusGeometry(1.035, 0.012, 8, 64);
  const middle_rim_groove = new THREE.Mesh(middle_rim_grooveGeom, darkWoodMat);
  middle_rim_groove.name = "middle_rim_groove";
  middle_rim_groove.rotation.x = Math.PI / 2;
  middle_rim_groove.position.y = 0.88;
  base_assembly.add(middle_rim_groove);

  const base_grain_ringsGeom = new THREE.TorusGeometry(1, 0.006, 6, 64);
  const base_grain_rings = new THREE.InstancedMesh(
    base_grain_ringsGeom,
    darkWoodMat,
    10
  );
  base_grain_rings.name = "base_grain_rings";

  const baseRingData = [
    [0.92, 0.045],
    [0.99, 0.11],
    [1.035, 0.19],
    [1.015, 0.29],
    [0.95, 0.37],
    [0.81, 0.49],
    [0.86, 0.61],
    [0.95, 0.71],
    [1.035, 0.82],
    [1.045, 0.91]
  ];
  const horizontalQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const instanceMatrix = new THREE.Matrix4();
  for (let i = 0; i < baseRingData.length; i++) {
    const radius = baseRingData[i][0];
    const y = baseRingData[i][1];
    instanceMatrix.compose(
      new THREE.Vector3(0, y, 0),
      horizontalQuat,
      new THREE.Vector3(radius, radius, radius)
    );
    base_grain_rings.setMatrixAt(i, instanceMatrix);
  }
  base_grain_rings.instanceMatrix.needsUpdate = true;
  base_assembly.add(base_grain_rings);

  const inner_glowGeom = new THREE.SphereGeometry(1, 32, 20);
  const inner_glow = new THREE.Mesh(inner_glowGeom, inner_glowMat);
  inner_glow.name = "inner_glow";
  inner_glow.position.set(0, 1.55, 0);
  inner_glow.scale.set(0.68, 0.72, 0.68);
  diffuser_assembly.add(inner_glow);

  const glow_coreGeom = new THREE.SphereGeometry(1, 24, 16);
  const glow_core = new THREE.Mesh(glow_coreGeom, glow_coreMat);
  glow_core.name = "glow_core";
  glow_core.position.set(0, 1.43, 0.08);
  glow_core.scale.set(0.28, 0.32, 0.28);
  diffuser_assembly.add(glow_core);

  const glass_bodyProfile = [
    new THREE.Vector2(0.00, 0.88),
    new THREE.Vector2(0.90, 0.88),
    new THREE.Vector2(1.01, 0.92),
    new THREE.Vector2(1.10, 1.04),
    new THREE.Vector2(1.16, 1.25),
    new THREE.Vector2(1.18, 1.55),
    new THREE.Vector2(1.18, 3.10),
    new THREE.Vector2(1.16, 3.38),
    new THREE.Vector2(1.09, 3.62),
    new THREE.Vector2(0.97, 3.82),
    new THREE.Vector2(0.80, 3.98),
    new THREE.Vector2(0.64, 4.05),
    new THREE.Vector2(0.00, 4.05)
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glass_bodyMat);
  glass_body.name = "glass_body";
  diffuser_assembly.add(glass_body);

  const top_wood_collarProfile = [
    new THREE.Vector2(0.61, 3.97),
    new THREE.Vector2(0.68, 3.99),
    new THREE.Vector2(0.72, 4.05),
    new THREE.Vector2(0.73, 4.14),
    new THREE.Vector2(0.73, 4.35),
    new THREE.Vector2(0.70, 4.42),
    new THREE.Vector2(0.62, 4.45),
    new THREE.Vector2(0.56, 4.43),
    new THREE.Vector2(0.55, 4.37),
    new THREE.Vector2(0.55, 4.14),
    new THREE.Vector2(0.58, 4.05),
    new THREE.Vector2(0.61, 3.97)
  ];
  const top_wood_collarGeom = new THREE.LatheGeometry(top_wood_collarProfile, 64);
  const top_wood_collar = new THREE.Mesh(top_wood_collarGeom, woodMat);
  top_wood_collar.name = "top_wood_collar";
  top_assembly.add(top_wood_collar);

  const top_lipGeom = new THREE.TorusGeometry(0.64, 0.045, 12, 64);
  const top_lip = new THREE.Mesh(top_lipGeom, woodMat);
  top_lip.name = "top_lip";
  top_lip.rotation.x = Math.PI / 2;
  top_lip.position.y = 4.40;
  top_assembly.add(top_lip);

  const top_lower_grooveGeom = new THREE.TorusGeometry(0.685, 0.012, 8, 64);
  const top_lower_groove = new THREE.Mesh(top_lower_grooveGeom, darkWoodMat);
  top_lower_groove.name = "top_lower_groove";
  top_lower_groove.rotation.x = Math.PI / 2;
  top_lower_groove.position.y = 4.01;
  top_assembly.add(top_lower_groove);

  const top_grain_ringsGeom = new THREE.TorusGeometry(1, 0.006, 6, 64);
  const top_grain_rings = new THREE.InstancedMesh(
    top_grain_ringsGeom,
    darkWoodMat,
    5
  );
  top_grain_rings.name = "top_grain_rings";
  const topRingHeights = [4.07, 4.15, 4.23, 4.31, 4.38];
  for (let i = 0; i < topRingHeights.length; i++) {
    const radius = i === 4 ? 0.68 : 0.718;
    instanceMatrix.compose(
      new THREE.Vector3(0, topRingHeights[i], 0),
      horizontalQuat,
      new THREE.Vector3(radius, radius, radius)
    );
    top_grain_rings.setMatrixAt(i, instanceMatrix);
  }
  top_grain_rings.instanceMatrix.needsUpdate = true;
  top_assembly.add(top_grain_rings);

  const top_inner_shadowGeom = new THREE.CircleGeometry(0.545, 48);
  const top_inner_shadow = new THREE.Mesh(top_inner_shadowGeom, darkWoodMat);
  top_inner_shadow.name = "top_inner_shadow";
  top_inner_shadow.rotation.x = -Math.PI / 2;
  top_inner_shadow.position.y = 4.365;
  top_assembly.add(top_inner_shadow);

  const wood_scarGeom = new THREE.CircleGeometry(0.1, 20);

  function placeWoodScar(mesh, angle, y, radius, sx, sy, rotation) {
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    mesh.position.set(normal.x * radius, y, normal.z * radius);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    mesh.rotateZ(rotation);
    mesh.scale.set(sx, sy, 1);
  }

  const top_wood_scar = new THREE.Mesh(wood_scarGeom, darkWoodMat);
  top_wood_scar.name = "top_wood_scar";
  placeWoodScar(top_wood_scar, 1.96, 4.25, 0.733, 0.52, 1.18, -0.18);
  top_assembly.add(top_wood_scar);

  const middle_wood_scar = new THREE.Mesh(wood_scarGeom, darkWoodMat);
  middle_wood_scar.name = "middle_wood_scar";
  placeWoodScar(middle_wood_scar, 1.98, 0.72, 0.985, 0.48, 1.12, 0.28);
  base_assembly.add(middle_wood_scar);

  const bottom_wood_mark = new THREE.Mesh(wood_scarGeom, darkWoodMat);
  bottom_wood_mark.name = "bottom_wood_mark";
  placeWoodScar(bottom_wood_mark, 1.28, 0.18, 1.042, 0.20, 0.72, -0.12);
  base_assembly.add(bottom_wood_mark);

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
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "milk_bottle";

  const bottle_assembly = new THREE.Group();
  bottle_assembly.name = "bottle_assembly";
  root.add(bottle_assembly);

  const bottle_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8e3,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const milkMat = new THREE.MeshStandardMaterial({
    color: 0xe9e9df,
    metalness: 0.0,
    roughness: 0.7
  });

  const milk_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1e8,
    metalness: 0.0,
    roughness: 0.7
  });

  const capMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const cap_groovesMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const glass_contour = new THREE.SplineCurve([
    new THREE.Vector2(0.60, 0.00),
    new THREE.Vector2(0.70, 0.04),
    new THREE.Vector2(0.76, 0.18),
    new THREE.Vector2(0.77, 0.55),
    new THREE.Vector2(0.77, 1.65),
    new THREE.Vector2(0.76, 2.05),
    new THREE.Vector2(0.71, 2.42),
    new THREE.Vector2(0.62, 2.76),
    new THREE.Vector2(0.50, 3.10),
    new THREE.Vector2(0.39, 3.39),
    new THREE.Vector2(0.34, 3.67),
    new THREE.Vector2(0.34, 4.16),
    new THREE.Vector2(0.37, 4.27),
    new THREE.Vector2(0.42, 4.34),
    new THREE.Vector2(0.40, 4.43)
  ]).getSpacedPoints(64);

  const bottle_glassProfile = [
    new THREE.Vector2(0, 0),
    ...glass_contour
  ];
  const bottle_glassGeom = new THREE.LatheGeometry(bottle_glassProfile, 64);
  const bottle_glass = new THREE.Mesh(bottle_glassGeom, bottle_glassMat);
  bottle_glass.name = "bottle_glass";
  bottle_glass.renderOrder = 2;
  bottle_assembly.add(bottle_glass);

  const milk_contour = new THREE.SplineCurve([
    new THREE.Vector2(0.56, 0.09),
    new THREE.Vector2(0.66, 0.12),
    new THREE.Vector2(0.71, 0.25),
    new THREE.Vector2(0.72, 0.70),
    new THREE.Vector2(0.72, 1.70),
    new THREE.Vector2(0.70, 2.04),
    new THREE.Vector2(0.65, 2.38),
    new THREE.Vector2(0.57, 2.70),
    new THREE.Vector2(0.47, 3.00),
    new THREE.Vector2(0.38, 3.28)
  ]).getSpacedPoints(48);

  const milkProfile = [
    new THREE.Vector2(0, 0.09),
    ...milk_contour,
    new THREE.Vector2(0, 3.28)
  ];
  const milkGeom = new THREE.LatheGeometry(milkProfile, 56);
  const milk = new THREE.Mesh(milkGeom, milkMat);
  milk.name = "milk";
  bottle_assembly.add(milk);

  const milk_surfaceGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.012, 56);
  const milk_surface = new THREE.Mesh(milk_surfaceGeom, milk_surfaceMat);
  milk_surface.name = "milk_surface";
  milk_surface.position.y = 3.282;
  bottle_assembly.add(milk_surface);

  const bottle_base_ringGeom = new THREE.TorusGeometry(0.675, 0.035, 10, 64);
  const bottle_base_ring = new THREE.Mesh(bottle_base_ringGeom, bottle_glassMat);
  bottle_base_ring.name = "bottle_base_ring";
  bottle_base_ring.rotation.x = Math.PI / 2;
  bottle_base_ring.position.y = 0.075;
  bottle_assembly.add(bottle_base_ring);

  const base_ridgesGeom = new THREE.SphereGeometry(0.025, 8, 6);
  const base_ridges = new THREE.InstancedMesh(base_ridgesGeom, bottle_glassMat, 32);
  base_ridges.name = "base_ridges";
  const base_dummy = new THREE.Object3D();
  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    base_dummy.position.set(
      Math.cos(angle) * 0.685,
      0.025,
      Math.sin(angle) * 0.685
    );
    base_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    base_dummy.scale.set(0.65, 0.35, 1.15);
    base_dummy.updateMatrix();
    base_ridges.setMatrixAt(i, base_dummy.matrix);
  }
  base_ridges.instanceMatrix.needsUpdate = true;
  bottle_assembly.add(base_ridges);

  const neck_lower_ringGeom = new THREE.TorusGeometry(0.345, 0.018, 10, 56);
  const neck_lower_ring = new THREE.Mesh(neck_lower_ringGeom, bottle_glassMat);
  neck_lower_ring.name = "neck_lower_ring";
  neck_lower_ring.rotation.x = Math.PI / 2;
  neck_lower_ring.position.y = 4.075;
  bottle_assembly.add(neck_lower_ring);

  const neck_upper_ringGeom = new THREE.TorusGeometry(0.375, 0.025, 10, 56);
  const neck_upper_ring = new THREE.Mesh(neck_upper_ringGeom, bottle_glassMat);
  neck_upper_ring.name = "neck_upper_ring";
  neck_upper_ring.rotation.x = Math.PI / 2;
  neck_upper_ring.position.y = 4.245;
  bottle_assembly.add(neck_upper_ring);

  const neck_lipProfile = [
    new THREE.Vector2(0.35, 4.21),
    new THREE.Vector2(0.39, 4.23),
    new THREE.Vector2(0.45, 4.27),
    new THREE.Vector2(0.47, 4.33),
    new THREE.Vector2(0.45, 4.39),
    new THREE.Vector2(0.40, 4.44),
    new THREE.Vector2(0.35, 4.44),
    new THREE.Vector2(0.35, 4.21)
  ];
  const neck_lipGeom = new THREE.LatheGeometry(neck_lipProfile, 64);
  const neck_lip = new THREE.Mesh(neck_lipGeom, bottle_glassMat);
  neck_lip.name = "neck_lip";
  bottle_assembly.add(neck_lip);

  const cap_bodyProfile = [
    new THREE.Vector2(0.00, 4.43),
    new THREE.Vector2(0.42, 4.43),
    new THREE.Vector2(0.47, 4.47),
    new THREE.Vector2(0.49, 4.53),
    new THREE.Vector2(0.49, 4.64),
    new THREE.Vector2(0.46, 4.72),
    new THREE.Vector2(0.40, 4.76),
    new THREE.Vector2(0.00, 4.76)
  ];
  const cap_bodyGeom = new THREE.LatheGeometry(cap_bodyProfile, 64);
  const cap_body = new THREE.Mesh(cap_bodyGeom, capMat);
  cap_body.name = "cap_body";
  bottle_assembly.add(cap_body);

  const cap_lower_bandGeom = new THREE.CylinderGeometry(0.49, 0.49, 0.105, 64);
  const cap_lower_band = new THREE.Mesh(cap_lower_bandGeom, capMat);
  cap_lower_band.name = "cap_lower_band";
  cap_lower_band.position.y = 4.49;
  bottle_assembly.add(cap_lower_band);

  const cap_lower_rollGeom = new THREE.TorusGeometry(0.455, 0.045, 12, 64);
  const cap_lower_roll = new THREE.Mesh(cap_lower_rollGeom, capMat);
  cap_lower_roll.name = "cap_lower_roll";
  cap_lower_roll.rotation.x = Math.PI / 2;
  cap_lower_roll.position.y = 4.445;
  bottle_assembly.add(cap_lower_roll);

  const cap_top_rollGeom = new THREE.TorusGeometry(0.455, 0.035, 12, 64);
  const cap_top_roll = new THREE.Mesh(cap_top_rollGeom, capMat);
  cap_top_roll.name = "cap_top_roll";
  cap_top_roll.rotation.x = Math.PI / 2;
  cap_top_roll.position.y = 4.705;
  bottle_assembly.add(cap_top_roll);

  const cap_topGeom = new THREE.SphereGeometry(1, 40, 16);
  const cap_top = new THREE.Mesh(cap_topGeom, capMat);
  cap_top.name = "cap_top";
  cap_top.position.y = 4.755;
  cap_top.scale.set(0.43, 0.045, 0.43);
  bottle_assembly.add(cap_top);

  const cap_groovesGeom = new THREE.BoxGeometry(0.026, 0.14, 0.022);
  const cap_grooves = new THREE.InstancedMesh(cap_groovesGeom, cap_groovesMat, 24);
  cap_grooves.name = "cap_grooves";
  const groove_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    groove_dummy.position.set(
      Math.cos(angle) * 0.493,
      4.615,
      Math.sin(angle) * 0.493
    );
    groove_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    groove_dummy.scale.set(1, 1, 1);
    groove_dummy.updateMatrix();
    cap_grooves.setMatrixAt(i, groove_dummy.matrix);
  }
  cap_grooves.instanceMatrix.needsUpdate = true;
  bottle_assembly.add(cap_grooves);

  const cap_flutesGeom = new THREE.SphereGeometry(0.05, 10, 8);
  const cap_flutes = new THREE.InstancedMesh(cap_flutesGeom, capMat, 24);
  cap_flutes.name = "cap_flutes";
  const flute_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    flute_dummy.position.set(
      Math.cos(angle) * 0.49,
      4.505,
      Math.sin(angle) * 0.49
    );
    flute_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    flute_dummy.scale.set(0.72, 1.15, 0.34);
    flute_dummy.updateMatrix();
    cap_flutes.setMatrixAt(i, flute_dummy.matrix);
  }
  cap_flutes.instanceMatrix.needsUpdate = true;
  bottle_assembly.add(cap_flutes);

  function bottleRadiusAt(y) {
    if (y < 0.20) return 0.60 + y * 0.80;
    if (y < 2.00) return 0.77;
    if (y < 2.45) return 0.77 - (y - 2.00) * 0.13;
    if (y < 3.40) return 0.71 - (y - 2.45) * 0.34;
    if (y < 3.70) return 0.385 - (y - 3.40) * 0.15;
    return 0.34;
  }

  const condensation_dropletsMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4ffff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    depthWrite: false
  });
  const condensation_dropletsGeom = new THREE.SphereGeometry(0.022, 10, 8);
  const condensation_droplets = new THREE.InstancedMesh(
    condensation_dropletsGeom,
    condensation_dropletsMat,
    30
  );
  condensation_droplets.name = "condensation_droplets";
  const droplet_dummy = new THREE.Object3D();
  for (let i = 0; i < 30; i++) {
    const y = 0.30 + ((i * 47) % 101) / 100 * 3.75;
    const angle = 0.35 + ((i * 29) % 97) / 96 * 2.44;
    const radius = bottleRadiusAt(y) + 0.012;
    const size = 0.65 + ((i * 17) % 13) / 13;
    droplet_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    droplet_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    droplet_dummy.scale.set(
      0.55 * size,
      1.15 * size,
      0.28 * size
    );
    droplet_dummy.updateMatrix();
    condensation_droplets.setMatrixAt(i, droplet_dummy.matrix);
  }
  condensation_droplets.instanceMatrix.needsUpdate = true;
  condensation_droplets.renderOrder = 3;
  bottle_assembly.add(condensation_droplets);

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
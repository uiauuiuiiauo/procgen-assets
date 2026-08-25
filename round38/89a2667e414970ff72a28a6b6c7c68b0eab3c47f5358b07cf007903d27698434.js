export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "copper_pot";

  const vessel_group = new THREE.Group();
  vessel_group.name = "vessel_group";
  root.add(vessel_group);

  const liquid_group = new THREE.Group();
  liquid_group.name = "liquid_group";
  root.add(liquid_group);

  const steam_group = new THREE.Group();
  steam_group.name = "steam_group";
  root.add(steam_group);

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.2
  });

  const darkCopperMat = new THREE.MeshStandardMaterial({
    color: 0x704026,
    metalness: 0.6,
    roughness: 0.5
  });

  const innerCopperMat = new THREE.MeshStandardMaterial({
    color: 0x8a4f2c,
    metalness: 0.5,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce8e8,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.25,
    ior: 1.33,
    transparent: true,
    opacity: 0.9
  });

  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xf5f7f4,
    metalness: 0.0,
    roughness: 0.7
  });

  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.4
  });

  const steamMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.13,
    depthWrite: false
  });

  const pot_bodyProfile = [
    new THREE.Vector2(0.00, -0.46),
    new THREE.Vector2(0.23, -0.46),
    new THREE.Vector2(0.30, -0.445),
    new THREE.Vector2(0.36, -0.405),
    new THREE.Vector2(0.41, -0.34),
    new THREE.Vector2(0.45, -0.24),
    new THREE.Vector2(0.47, -0.12),
    new THREE.Vector2(0.47, -0.02),
    new THREE.Vector2(0.45, 0.08),
    new THREE.Vector2(0.41, 0.17),
    new THREE.Vector2(0.36, 0.24),
    new THREE.Vector2(0.35, 0.30),
    new THREE.Vector2(0.36, 0.345),
    new THREE.Vector2(0.39, 0.38)
  ];
  const pot_bodyGeom = new THREE.LatheGeometry(pot_bodyProfile, 64);
  const pot_body = new THREE.Mesh(pot_bodyGeom, copperMat);
  pot_body.name = "pot_body";
  vessel_group.add(pot_body);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.35,
    0.31,
    0.10,
    64,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, innerCopperMat);
  inner_wall.name = "inner_wall";
  inner_wall.position.y = 0.33;
  vessel_group.add(inner_wall);

  const rolled_rimGeom = new THREE.TorusGeometry(0.382, 0.032, 16, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, copperMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.383;
  vessel_group.add(rolled_rim);

  const inner_rim_shadowGeom = new THREE.TorusGeometry(0.348, 0.008, 10, 64);
  const inner_rim_shadow = new THREE.Mesh(inner_rim_shadowGeom, darkCopperMat);
  inner_rim_shadow.name = "inner_rim_shadow";
  inner_rim_shadow.rotation.x = Math.PI / 2;
  inner_rim_shadow.position.y = 0.374;
  vessel_group.add(inner_rim_shadow);

  const base_footGeom = new THREE.TorusGeometry(0.265, 0.012, 10, 48);
  const base_foot = new THREE.Mesh(base_footGeom, darkCopperMat);
  base_foot.name = "base_foot";
  base_foot.rotation.x = Math.PI / 2;
  base_foot.position.y = -0.455;
  vessel_group.add(base_foot);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(0.33, 0.38);
  handleShape.bezierCurveTo(0.43, 0.44, 0.61, 0.50, 0.70, 0.47);
  handleShape.bezierCurveTo(0.76, 0.45, 0.78, 0.39, 0.74, 0.34);
  handleShape.bezierCurveTo(0.68, 0.28, 0.55, 0.24, 0.46, 0.15);
  handleShape.bezierCurveTo(0.42, 0.11, 0.39, 0.12, 0.37, 0.17);
  handleShape.bezierCurveTo(0.35, 0.23, 0.34, 0.31, 0.33, 0.38);

  const handleHole = new THREE.Path();
  handleHole.moveTo(0.47, 0.31);
  handleHole.bezierCurveTo(0.52, 0.28, 0.63, 0.32, 0.68, 0.36);
  handleHole.bezierCurveTo(0.70, 0.38, 0.68, 0.40, 0.65, 0.40);
  handleHole.bezierCurveTo(0.58, 0.40, 0.50, 0.36, 0.47, 0.31);
  handleShape.holes.push(handleHole);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3
  });
  handleGeom.translate(0, 0, -0.0375);

  const handle = new THREE.Mesh(handleGeom, copperMat);
  handle.name = "handle";
  vessel_group.add(handle);

  const handle_upper_mountGeom = new THREE.CylinderGeometry(
    0.043,
    0.043,
    0.10,
    20
  );
  const handle_upper_mount = new THREE.Mesh(
    handle_upper_mountGeom,
    darkCopperMat
  );
  handle_upper_mount.name = "handle_upper_mount";
  handle_upper_mount.rotation.z = Math.PI / 2;
  handle_upper_mount.position.set(0.36, 0.35, 0);
  vessel_group.add(handle_upper_mount);

  const handle_lower_mountGeom = new THREE.CylinderGeometry(
    0.036,
    0.036,
    0.09,
    20
  );
  const handle_lower_mount = new THREE.Mesh(
    handle_lower_mountGeom,
    darkCopperMat
  );
  handle_lower_mount.name = "handle_lower_mount";
  handle_lower_mount.rotation.z = Math.PI / 2;
  handle_lower_mount.position.set(0.37, 0.17, 0);
  vessel_group.add(handle_lower_mount);

  const water_surfaceGeom = new THREE.CylinderGeometry(
    0.338,
    0.338,
    0.012,
    64
  );
  const water_surface = new THREE.Mesh(water_surfaceGeom, waterMat);
  water_surface.name = "water_surface";
  water_surface.position.y = 0.354;
  liquid_group.add(water_surface);

  const foam_layerGeom = new THREE.CylinderGeometry(
    0.326,
    0.326,
    0.008,
    64
  );
  const foam_layer = new THREE.Mesh(foam_layerGeom, foamMat);
  foam_layer.name = "foam_layer";
  foam_layer.position.y = 0.362;
  liquid_group.add(foam_layer);

  const foam_ringGeom = new THREE.TorusGeometry(0.304, 0.018, 10, 64);
  const foam_ring = new THREE.Mesh(foam_ringGeom, foamMat);
  foam_ring.name = "foam_ring";
  foam_ring.rotation.x = Math.PI / 2;
  foam_ring.position.y = 0.369;
  liquid_group.add(foam_ring);

  const foamBubbleCount = 46;
  const foam_bubblesGeom = new THREE.SphereGeometry(1, 12, 8);
  const foam_bubbles = new THREE.InstancedMesh(
    foam_bubblesGeom,
    bubbleMat,
    foamBubbleCount
  );
  foam_bubbles.name = "foam_bubbles";

  const bubbleDummy = new THREE.Object3D();
  for (let i = 0; i < foamBubbleCount; i++) {
    const angle = i * 2.399963229728653;
    const radialFraction = ((i * 17) % 47) / 46;
    const radius = 0.035 + 0.275 * Math.sqrt(radialFraction);
    const size = 0.007 + (((i * 13) % 11) / 10) * 0.010;

    bubbleDummy.position.set(
      Math.cos(angle) * radius,
      0.371 + (size - 0.012) * 0.3,
      Math.sin(angle) * radius
    );
    bubbleDummy.rotation.set(0, 0, 0);
    bubbleDummy.scale.set(size, size * 0.58, size);
    bubbleDummy.updateMatrix();
    foam_bubbles.setMatrixAt(i, bubbleDummy.matrix);
  }
  foam_bubbles.instanceMatrix.needsUpdate = true;
  liquid_group.add(foam_bubbles);

  const steam_wisp_centerPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, 0.39, 0.01),
    new THREE.Vector3(-0.05, 0.50, 0.00),
    new THREE.Vector3(0.02, 0.61, 0.02),
    new THREE.Vector3(0.06, 0.72, 0.00),
    new THREE.Vector3(0.01, 0.84, 0.01),
    new THREE.Vector3(0.04, 0.98, 0.00)
  ]);
  const steam_wisp_centerGeom = new THREE.TubeGeometry(
    steam_wisp_centerPath,
    40,
    0.009,
    7,
    false
  );
  const steam_wisp_center = new THREE.Mesh(
    steam_wisp_centerGeom,
    steamMat
  );
  steam_wisp_center.name = "steam_wisp_center";
  steam_group.add(steam_wisp_center);

  const steam_wisp_leftPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, 0.39, 0.00),
    new THREE.Vector3(-0.19, 0.49, 0.01),
    new THREE.Vector3(-0.13, 0.59, 0.00),
    new THREE.Vector3(-0.17, 0.70, 0.02),
    new THREE.Vector3(-0.11, 0.82, 0.00),
    new THREE.Vector3(-0.13, 0.93, 0.01)
  ]);
  const steam_wisp_leftGeom = new THREE.TubeGeometry(
    steam_wisp_leftPath,
    36,
    0.007,
    7,
    false
  );
  const steam_wisp_left = new THREE.Mesh(steam_wisp_leftGeom, steamMat);
  steam_wisp_left.name = "steam_wisp_left";
  steam_group.add(steam_wisp_left);

  const steam_wisp_rightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.14, 0.39, -0.01),
    new THREE.Vector3(0.19, 0.49, 0.00),
    new THREE.Vector3(0.13, 0.60, 0.01),
    new THREE.Vector3(0.18, 0.71, 0.00),
    new THREE.Vector3(0.12, 0.82, 0.01),
    new THREE.Vector3(0.16, 0.94, 0.00)
  ]);
  const steam_wisp_rightGeom = new THREE.TubeGeometry(
    steam_wisp_rightPath,
    36,
    0.007,
    7,
    false
  );
  const steam_wisp_right = new THREE.Mesh(steam_wisp_rightGeom, steamMat);
  steam_wisp_right.name = "steam_wisp_right";
  steam_group.add(steam_wisp_right);

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
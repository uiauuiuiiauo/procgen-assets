export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 1.0,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xc7e5e9,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 1.0,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const tumbler_profile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.580, 0.000),
    new THREE.Vector2(0.625, 0.006),
    new THREE.Vector2(0.655, 0.022),
    new THREE.Vector2(0.674, 0.050),
    new THREE.Vector2(0.681, 0.090),
    new THREE.Vector2(0.682, 1.475),
    new THREE.Vector2(0.680, 1.515),
    new THREE.Vector2(0.670, 1.548),
    new THREE.Vector2(0.650, 1.570),
    new THREE.Vector2(0.626, 1.575),
    new THREE.Vector2(0.608, 1.566),
    new THREE.Vector2(0.598, 1.548),
    new THREE.Vector2(0.594, 1.520),
    new THREE.Vector2(0.596, 0.170),
    new THREE.Vector2(0.588, 0.135),
    new THREE.Vector2(0.560, 0.108),
    new THREE.Vector2(0.000, 0.108)
  ];

  const tumbler_bodyGeom = new THREE.LatheGeometry(tumbler_profile, 96);
  const tumbler_body = new THREE.Mesh(tumbler_bodyGeom, glassMat);
  tumbler_body.renderOrder = 1;
  root.add(tumbler_body);

  const top_rimGeom = new THREE.TorusGeometry(0.638, 0.039, 20, 96);
  const top_rim = new THREE.Mesh(top_rimGeom, glass_edgeMat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 1.538;
  top_rim.renderOrder = 3;
  root.add(top_rim);

  const base_discGeom = new THREE.CylinderGeometry(0.585, 0.625, 0.090, 96);
  const base_disc = new THREE.Mesh(base_discGeom, glassMat);
  base_disc.position.y = 0.055;
  base_disc.renderOrder = 1;
  root.add(base_disc);

  const bottom_rimGeom = new THREE.TorusGeometry(0.625, 0.040, 16, 96);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, glass_edgeMat);
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = 0.045;
  bottom_rim.renderOrder = 3;
  root.add(bottom_rim);

  const inner_base_ringGeom = new THREE.TorusGeometry(0.535, 0.012, 10, 80);
  const inner_base_ring = new THREE.Mesh(inner_base_ringGeom, glass_edgeMat);
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.116;
  inner_base_ring.renderOrder = 2;
  root.add(inner_base_ring);

  const base_ridgesGeom = new THREE.TorusGeometry(0.660, 0.006, 8, 96);
  const base_ridges = new THREE.InstancedMesh(base_ridgesGeom, glass_edgeMat, 3);
  const ridge_transform = new THREE.Object3D();
  const ridge_heights = [0.090, 0.120, 0.150];
  for (let i = 0; i < ridge_heights.length; i++) {
    ridge_transform.position.set(0, ridge_heights[i], 0);
    ridge_transform.rotation.set(Math.PI / 2, 0, 0);
    ridge_transform.updateMatrix();
    base_ridges.setMatrixAt(i, ridge_transform.matrix);
  }
  base_ridges.instanceMatrix.needsUpdate = true;
  base_ridges.renderOrder = 2;
  root.add(base_ridges);

  const center_dimpleGeom = new THREE.TorusGeometry(0.030, 0.004, 8, 32);
  const center_dimple = new THREE.Mesh(center_dimpleGeom, glass_edgeMat);
  center_dimple.rotation.x = Math.PI / 2;
  center_dimple.position.y = 0.117;
  center_dimple.renderOrder = 2;
  root.add(center_dimple);

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
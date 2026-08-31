export default function generate(THREE) {
  const root = new THREE.Group();
  const bottle_assembly = new THREE.Group();
  root.add(bottle_assembly);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f1f3,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  const inner_glass_wallGeom = new THREE.CylinderGeometry(
    0.468, 0.405, 0.91, 48, 1, true
  );
  const inner_glass_wall = new THREE.Mesh(inner_glass_wallGeom, glassMat);
  inner_glass_wall.position.y = 0.575;
  bottle_assembly.add(inner_glass_wall);

  const inner_bottomGeom = new THREE.CylinderGeometry(0.405, 0.405, 0.025, 48);
  const inner_bottom = new THREE.Mesh(inner_bottomGeom, glassMat);
  inner_bottom.position.y = 0.135;
  bottle_assembly.add(inner_bottom);

  const glass_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.405, 0.000),
    new THREE.Vector2(0.465, 0.018),
    new THREE.Vector2(0.495, 0.065),
    new THREE.Vector2(0.505, 0.135),
    new THREE.Vector2(0.490, 0.215),
    new THREE.Vector2(0.472, 0.650),
    new THREE.Vector2(0.470, 0.980),
    new THREE.Vector2(0.455, 1.045),
    new THREE.Vector2(0.430, 1.075),
    new THREE.Vector2(0.405, 1.075),
    new THREE.Vector2(0.430, 1.015),
    new THREE.Vector2(0.445, 0.960),
    new THREE.Vector2(0.448, 0.650),
    new THREE.Vector2(0.455, 0.220),
    new THREE.Vector2(0.445, 0.155),
    new THREE.Vector2(0.405, 0.115),
    new THREE.Vector2(0.000, 0.115),
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glassMat);
  bottle_assembly.add(glass_body);

  const bottom_glass_rimGeom = new THREE.TorusGeometry(0.468, 0.022, 12, 64);
  const bottom_glass_rim = new THREE.Mesh(bottom_glass_rimGeom, glassMat);
  bottom_glass_rim.rotation.x = Math.PI / 2;
  bottom_glass_rim.position.y = 0.075;
  bottle_assembly.add(bottom_glass_rim);

  const neck_glass_rimGeom = new THREE.TorusGeometry(0.442, 0.014, 10, 64);
  const neck_glass_rim = new THREE.Mesh(neck_glass_rimGeom, glassMat);
  neck_glass_rim.rotation.x = Math.PI / 2;
  neck_glass_rim.position.y = 1.035;
  bottle_assembly.add(neck_glass_rim);

  const inner_reservoirProfile = [
    new THREE.Vector2(0.000, 0.155),
    new THREE.Vector2(0.165, 0.155),
    new THREE.Vector2(0.215, 0.180),
    new THREE.Vector2(0.242, 0.235),
    new THREE.Vector2(0.250, 0.315),
    new THREE.Vector2(0.238, 0.500),
    new THREE.Vector2(0.215, 0.760),
    new THREE.Vector2(0.185, 0.930),
    new THREE.Vector2(0.160, 1.015),
    new THREE.Vector2(0.000, 1.015),
  ];
  const inner_reservoirGeom = new THREE.LatheGeometry(inner_reservoirProfile, 48);
  const inner_reservoir = new THREE.Mesh(inner_reservoirGeom, silverMat);
  bottle_assembly.add(inner_reservoir);

  const inner_reservoir_base_ringGeom = new THREE.TorusGeometry(0.205, 0.012, 8, 48);
  const inner_reservoir_base_ring = new THREE.Mesh(
    inner_reservoir_base_ringGeom,
    polishedMat
  );
  inner_reservoir_base_ring.rotation.x = Math.PI / 2;
  inner_reservoir_base_ring.position.y = 0.195;
  bottle_assembly.add(inner_reservoir_base_ring);

  const inner_neckGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.11, 40);
  const inner_neck = new THREE.Mesh(inner_neckGeom, silverMat);
  inner_neck.position.y = 1.055;
  bottle_assembly.add(inner_neck);

  const collar_bandGeom = new THREE.CylinderGeometry(0.485, 0.460, 0.25, 64);
  const collar_band = new THREE.Mesh(collar_bandGeom, silverMat);
  collar_band.position.y = 1.125;
  bottle_assembly.add(collar_band);

  const collar_lower_trimGeom = new THREE.TorusGeometry(0.454, 0.012, 8, 64);
  const collar_lower_trim = new THREE.Mesh(collar_lower_trimGeom, polishedMat);
  collar_lower_trim.rotation.x = Math.PI / 2;
  collar_lower_trim.position.y = 1.005;
  bottle_assembly.add(collar_lower_trim);

  const cap_seamGeom = new THREE.TorusGeometry(0.478, 0.010, 8, 64);
  const cap_seam = new THREE.Mesh(cap_seamGeom, darkMetalMat);
  cap_seam.rotation.x = Math.PI / 2;
  cap_seam.position.y = 1.252;
  bottle_assembly.add(cap_seam);

  const crown_baseGeom = new THREE.CylinderGeometry(0.455, 0.480, 0.45, 64);
  const crown_base = new THREE.Mesh(crown_baseGeom, silverMat);
  crown_base.position.y = 1.475;
  bottle_assembly.add(crown_base);

  const crown_top_ringGeom = new THREE.TorusGeometry(0.445, 0.010, 8, 64);
  const crown_top_ring = new THREE.Mesh(crown_top_ringGeom, polishedMat);
  crown_top_ring.rotation.x = Math.PI / 2;
  crown_top_ring.position.y = 1.695;
  bottle_assembly.add(crown_top_ring);

  const crown_teethShape = new THREE.Shape();
  crown_teethShape.moveTo(-0.140, 0.000);
  crown_teethShape.lineTo(-0.140, 0.110);
  crown_teethShape.lineTo(-0.045, 0.300);
  crown_teethShape.lineTo(0.015, 0.340);
  crown_teethShape.lineTo(0.140, 0.075);
  crown_teethShape.lineTo(0.140, 0.000);
  crown_teethShape.closePath();

  const crown_teethGeom = new THREE.ExtrudeGeometry(crown_teethShape, {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  crown_teethGeom.translate(0, 0, -0.0375);

  const crown_teeth = new THREE.InstancedMesh(crown_teethGeom, silverMat, 8);
  const tooth_transform = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    tooth_transform.position.set(
      Math.cos(angle) * 0.405,
      1.665,
      Math.sin(angle) * 0.405
    );
    tooth_transform.rotation.set(0, Math.PI / 2 - angle, 0);
    tooth_transform.scale.set(1, 1, 1);
    tooth_transform.updateMatrix();
    crown_teeth.setMatrixAt(i, tooth_transform.matrix);
  }
  crown_teeth.instanceMatrix.needsUpdate = true;
  bottle_assembly.add(crown_teeth);

  const molded_grip_ridgesPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.255, 0.462),
    new THREE.Vector3(0, 0.330, 0.458),
    new THREE.Vector3(0, 0.610, 0.451),
    new THREE.Vector3(0, 0.785, 0.452),
    new THREE.Vector3(0, 0.835, 0.462),
  ]);
  const molded_grip_ridgesGeom = new THREE.TubeGeometry(
    molded_grip_ridgesPath,
    24,
    0.010,
    8,
    false
  );
  const molded_grip_ridges = new THREE.InstancedMesh(
    molded_grip_ridgesGeom,
    glassMat,
    2
  );
  const ridge_transform = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    ridge_transform.position.set(side * 0.325, 0, 0);
    ridge_transform.rotation.set(0, 0, 0);
    ridge_transform.scale.set(1, 1, 1);
    ridge_transform.updateMatrix();
    molded_grip_ridges.setMatrixAt(i, ridge_transform.matrix);
  }
  molded_grip_ridges.instanceMatrix.needsUpdate = true;
  bottle_assembly.add(molded_grip_ridges);

  bottle_assembly.rotation.z = 0.20;

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}
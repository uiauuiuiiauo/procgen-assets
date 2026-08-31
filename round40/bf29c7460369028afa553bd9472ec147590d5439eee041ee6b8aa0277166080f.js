export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0xe3c15b,
    metalness: 0.6,
    roughness: 0.2,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x9b741d,
    metalness: 0.5,
    roughness: 0.25,
  });

  const bodyProfile = [
    new THREE.Vector2(0.0, -0.95),
    new THREE.Vector2(0.18, -0.95),
  ];
  const bodyRadius = 1.0;
  const bodyCenterY = -0.02;
  const profileSteps = 48;

  for (let i = 1; i <= profileSteps; i++) {
    const y = -0.95 + (1.91 * i) / profileSteps;
    const dy = y - bodyCenterY;
    const radius = Math.sqrt(Math.max(0, bodyRadius * bodyRadius - dy * dy));
    bodyProfile.push(new THREE.Vector2(radius, y));
  }

  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const equatorial_bandGeom = new THREE.CylinderGeometry(
    1.014,
    1.014,
    0.028,
    64,
    1,
    true
  );
  const equatorial_band = new THREE.Mesh(equatorial_bandGeom, trimMat);
  equatorial_band.position.y = 0.002;
  root.add(equatorial_band);

  const equatorial_seamGeom = new THREE.TorusGeometry(1.006, 0.019, 12, 64);
  const equatorial_seam = new THREE.Mesh(equatorial_seamGeom, trimMat);
  equatorial_seam.rotation.x = Math.PI / 2;
  equatorial_seam.position.y = 0.018;
  root.add(equatorial_seam);

  const equatorial_lower_lineGeom = new THREE.TorusGeometry(1.002, 0.006, 8, 64);
  const equatorial_lower_line = new THREE.Mesh(
    equatorial_lower_lineGeom,
    seamMat
  );
  equatorial_lower_line.rotation.x = Math.PI / 2;
  equatorial_lower_line.position.y = -0.016;
  root.add(equatorial_lower_line);

  const neckProfile = [
    new THREE.Vector2(0.0, 0.91),
    new THREE.Vector2(0.22, 0.91),
    new THREE.Vector2(0.255, 0.925),
    new THREE.Vector2(0.27, 0.95),
    new THREE.Vector2(0.245, 0.98),
    new THREE.Vector2(0.215, 1.01),
    new THREE.Vector2(0.205, 1.04),
    new THREE.Vector2(0.205, 1.25),
    new THREE.Vector2(0.215, 1.275),
    new THREE.Vector2(0.0, 1.275),
  ];
  const neckGeom = new THREE.LatheGeometry(neckProfile, 64);
  const neck = new THREE.Mesh(neckGeom, bodyMat);
  root.add(neck);

  const neck_base_collarGeom = new THREE.TorusGeometry(0.238, 0.018, 10, 64);
  const neck_base_collar = new THREE.Mesh(neck_base_collarGeom, trimMat);
  neck_base_collar.rotation.x = Math.PI / 2;
  neck_base_collar.position.y = 0.955;
  root.add(neck_base_collar);

  const top_rimGeom = new THREE.TorusGeometry(0.215, 0.027, 12, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, trimMat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 1.285;
  root.add(top_rim);

  const top_capGeom = new THREE.CylinderGeometry(0.216, 0.216, 0.026, 64);
  const top_cap = new THREE.Mesh(top_capGeom, trimMat);
  top_cap.position.y = 1.294;
  root.add(top_cap);

  const bottom_footGeom = new THREE.BoxGeometry(0.28, 0.12, 0.18);
  const bottom_foot = new THREE.Mesh(bottom_footGeom, bodyMat);
  bottom_foot.position.set(-0.28, -0.99, -0.08);
  bottom_foot.rotation.z = -0.08;
  root.add(bottom_foot);

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
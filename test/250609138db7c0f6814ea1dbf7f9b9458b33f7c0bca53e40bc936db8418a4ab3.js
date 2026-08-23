export default function generate(THREE) {
  const root = new THREE.Group();

  const jar_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8e2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const glass_detailMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c5bf,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mouth_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x66726d,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
  });

  const jar_bodyProfile = [
    new THREE.Vector2(0.000, -0.650),
    new THREE.Vector2(0.300, -0.650),
    new THREE.Vector2(0.365, -0.642),
    new THREE.Vector2(0.410, -0.615),
    new THREE.Vector2(0.440, -0.560),
    new THREE.Vector2(0.452, -0.470),
    new THREE.Vector2(0.454, 0.240),
    new THREE.Vector2(0.449, 0.315),
    new THREE.Vector2(0.432, 0.385),
    new THREE.Vector2(0.405, 0.452),
    new THREE.Vector2(0.390, 0.485),
    new THREE.Vector2(0.390, 0.680),
    new THREE.Vector2(0.342, 0.680),
    new THREE.Vector2(0.342, 0.495),
    new THREE.Vector2(0.357, 0.458),
    new THREE.Vector2(0.386, 0.390),
    new THREE.Vector2(0.405, 0.315),
    new THREE.Vector2(0.408, 0.240),
    new THREE.Vector2(0.408, -0.455),
    new THREE.Vector2(0.400, -0.515),
    new THREE.Vector2(0.378, -0.558),
    new THREE.Vector2(0.330, -0.585),
    new THREE.Vector2(0.000, -0.585),
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(jar_bodyProfile, 64);
  const jar_body = new THREE.Mesh(jar_bodyGeom, jar_bodyMat);
  root.add(jar_body);

  const inner_neckGeom = new THREE.CylinderGeometry(
    0.344,
    0.344,
    0.195,
    64,
    1,
    true
  );
  const inner_neck = new THREE.Mesh(inner_neckGeom, glass_detailMat);
  inner_neck.position.y = 0.578;
  root.add(inner_neck);

  const lower_thread_ringGeom = new THREE.TorusGeometry(
    0.420,
    0.031,
    12,
    64
  );
  const lower_thread_ring = new THREE.Mesh(
    lower_thread_ringGeom,
    glass_detailMat
  );
  lower_thread_ring.rotation.x = Math.PI / 2;
  lower_thread_ring.position.y = 0.458;
  root.add(lower_thread_ring);

  const upper_thread_ringGeom = new THREE.TorusGeometry(
    0.405,
    0.025,
    12,
    64
  );
  const upper_thread_ring = new THREE.Mesh(
    upper_thread_ringGeom,
    glass_detailMat
  );
  upper_thread_ring.rotation.x = Math.PI / 2;
  upper_thread_ring.position.y = 0.635;
  root.add(upper_thread_ring);

  const screw_threadPoints = [];
  const screw_threadTurns = 2.15;
  const screw_threadSamples = 84;
  for (let i = 0; i <= screw_threadSamples; i++) {
    const t = i / screw_threadSamples;
    const angle = t * Math.PI * 2 * screw_threadTurns;
    const radius = 0.414;
    screw_threadPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0.477 + t * 0.157,
        Math.sin(angle) * radius
      )
    );
  }
  const screw_threadCurve = new THREE.CatmullRomCurve3(
    screw_threadPoints,
    false,
    "centripetal"
  );
  const screw_threadGeom = new THREE.TubeGeometry(
    screw_threadCurve,
    128,
    0.011,
    7,
    false
  );
  const screw_thread = new THREE.Mesh(
    screw_threadGeom,
    glass_detailMat
  );
  root.add(screw_thread);

  const top_lipGeom = new THREE.TorusGeometry(0.381, 0.032, 14, 72);
  const top_lip = new THREE.Mesh(top_lipGeom, glass_detailMat);
  top_lip.rotation.x = Math.PI / 2;
  top_lip.position.y = 0.691;
  root.add(top_lip);

  const top_lip_plateGeom = new THREE.RingGeometry(
    0.338,
    0.414,
    72
  );
  const top_lip_plate = new THREE.Mesh(
    top_lip_plateGeom,
    glass_detailMat
  );
  top_lip_plate.rotation.x = -Math.PI / 2;
  top_lip_plate.position.y = 0.697;
  root.add(top_lip_plate);

  const mouth_shadowGeom = new THREE.CircleGeometry(0.333, 64);
  const mouth_shadow = new THREE.Mesh(mouth_shadowGeom, mouth_shadowMat);
  mouth_shadow.rotation.x = -Math.PI / 2;
  mouth_shadow.position.y = 0.653;
  root.add(mouth_shadow);

  const inner_lipGeom = new THREE.TorusGeometry(0.345, 0.008, 8, 64);
  const inner_lip = new THREE.Mesh(inner_lipGeom, glass_detailMat);
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = 0.687;
  root.add(inner_lip);

  const side_flutePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.407, -0.595, 0),
      new THREE.Vector3(0.438, -0.535, 0),
      new THREE.Vector3(0.458, -0.420, 0),
      new THREE.Vector3(0.462, 0.220, 0),
      new THREE.Vector3(0.451, 0.330, 0),
      new THREE.Vector3(0.424, 0.420, 0),
    ],
    false,
    "centripetal"
  );
  const side_flutesGeom = new THREE.TubeGeometry(
    side_flutePath,
    32,
    0.007,
    6,
    false
  );
  const side_flutes = new THREE.InstancedMesh(
    side_flutesGeom,
    glass_detailMat,
    12
  );
  const side_flute_transform = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    side_flute_transform.position.set(0, 0, 0);
    side_flute_transform.rotation.set(0, -angle, 0);
    side_flute_transform.scale.set(1, 1, 1);
    side_flute_transform.updateMatrix();
    side_flutes.setMatrixAt(i, side_flute_transform.matrix);
  }
  side_flutes.instanceMatrix.needsUpdate = true;
  root.add(side_flutes);

  const base_ringGeom = new THREE.TorusGeometry(
    0.386,
    0.020,
    10,
    64
  );
  const base_ring = new THREE.Mesh(base_ringGeom, glass_detailMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = -0.628;
  root.add(base_ring);

  const inner_base_ringGeom = new THREE.TorusGeometry(
    0.315,
    0.008,
    8,
    56
  );
  const inner_base_ring = new THREE.Mesh(
    inner_base_ringGeom,
    glass_detailMat
  );
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = -0.579;
  root.add(inner_base_ring);

  const base_knurlsGeom = new THREE.ConeGeometry(
    0.011,
    0.022,
    6
  );
  const base_knurls = new THREE.InstancedMesh(
    base_knurlsGeom,
    glass_detailMat,
    48
  );
  const base_knurl_transform = new THREE.Object3D();
  for (let i = 0; i < 48; i++) {
    const angle = (i / 48) * Math.PI * 2;
    base_knurl_transform.position.set(
      Math.cos(angle) * 0.389,
      -0.656,
      Math.sin(angle) * 0.389
    );
    base_knurl_transform.rotation.set(0, -angle, Math.PI);
    base_knurl_transform.scale.set(1, 1, 1);
    base_knurl_transform.updateMatrix();
    base_knurls.setMatrixAt(i, base_knurl_transform.matrix);
  }
  base_knurls.instanceMatrix.needsUpdate = true;
  root.add(base_knurls);

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
export default function generate(THREE) {
  const root = new THREE.Group();
  const ring_assembly = new THREE.Group();
  root.add(ring_assembly);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8b66d,
    metalness: 0.6,
    roughness: 0.2,
  });

  const rubyMat = new THREE.MeshPhysicalMaterial({
    color: 0xb80f35,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.18,
    ior: 1.7,
    transparent: true,
    opacity: 0.98,
    flatShading: true,
  });

  const ruby_tableMat = new THREE.MeshStandardMaterial({
    color: 0xd9294b,
    metalness: 0.0,
    roughness: 0.2,
  });

  const ringR = 0.36;
  const bandR = 0.046;

  const bandGeom = new THREE.TorusGeometry(ringR, bandR, 20, 96);
  const band = new THREE.Mesh(bandGeom, goldMat);
  ring_assembly.add(band);

  const setting_group = new THREE.Group();
  setting_group.position.y = ringR;
  ring_assembly.add(setting_group);

  const lower_setting_mountGeom = new THREE.SphereGeometry(1, 24, 12);
  const lower_setting_mount = new THREE.Mesh(lower_setting_mountGeom, goldMat);
  lower_setting_mount.scale.set(0.078, 0.042, 0.062);
  lower_setting_mount.position.set(0, 0.004, 0);
  setting_group.add(lower_setting_mount);

  const left_shoulderGeom = new THREE.SphereGeometry(1, 24, 12);
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, goldMat);
  left_shoulder.scale.set(0.082, 0.037, 0.052);
  left_shoulder.position.set(-0.078, 0.006, 0);
  setting_group.add(left_shoulder);

  const right_shoulderGeom = left_shoulderGeom;
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, goldMat);
  right_shoulder.scale.set(0.082, 0.037, 0.052);
  right_shoulder.position.set(0.078, 0.006, 0);
  setting_group.add(right_shoulder);

  const setting_baseGeom = new THREE.CylinderGeometry(
    0.071,
    0.064,
    0.028,
    24
  );
  const setting_base = new THREE.Mesh(setting_baseGeom, goldMat);
  setting_base.position.set(0, 0.035, 0);
  setting_group.add(setting_base);

  const gemstone_seatGeom = new THREE.CylinderGeometry(
    0.061,
    0.067,
    0.014,
    24
  );
  const gemstone_seat = new THREE.Mesh(gemstone_seatGeom, goldMat);
  gemstone_seat.position.set(0, 0.052, 0);
  setting_group.add(gemstone_seat);

  const bezelGeom = new THREE.TorusGeometry(0.064, 0.009, 12, 40);
  const bezel = new THREE.Mesh(bezelGeom, goldMat);
  bezel.rotation.x = Math.PI / 2;
  bezel.position.set(0, 0.061, 0);
  setting_group.add(bezel);

  const rubyProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.043, 0.0),
    new THREE.Vector2(0.052, 0.006),
    new THREE.Vector2(0.058, 0.018),
    new THREE.Vector2(0.058, 0.026),
    new THREE.Vector2(0.048, 0.043),
    new THREE.Vector2(0.034, 0.052),
    new THREE.Vector2(0.0, 0.052),
  ];
  const rubyGeom = new THREE.LatheGeometry(rubyProfile, 12);
  const ruby = new THREE.Mesh(rubyGeom, rubyMat);
  ruby.position.set(0, 0.055, 0);
  setting_group.add(ruby);

  const ruby_tableGeom = new THREE.CircleGeometry(0.0325, 12);
  const ruby_table = new THREE.Mesh(ruby_tableGeom, ruby_tableMat);
  ruby_table.rotation.x = -Math.PI / 2;
  ruby_table.position.set(0, 0.1085, 0);
  setting_group.add(ruby_table);

  const prong_postsGeom = new THREE.CylinderGeometry(
    0.008,
    0.009,
    0.044,
    12
  );
  const prong_posts = new THREE.InstancedMesh(
    prong_postsGeom,
    goldMat,
    4
  );

  const prong_tipsGeom = new THREE.SphereGeometry(0.014, 16, 10);
  const prong_tips = new THREE.InstancedMesh(
    prong_tipsGeom,
    goldMat,
    4
  );

  const transform = new THREE.Object3D();

  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    const x = Math.cos(angle) * 0.052;
    const z = Math.sin(angle) * 0.052;

    transform.position.set(x, 0.079, z);
    transform.rotation.set(0, 0, 0);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    prong_posts.setMatrixAt(i, transform.matrix);

    transform.position.set(x, 0.101, z);
    transform.rotation.set(0, 0, 0);
    transform.scale.set(1, 0.9, 1);
    transform.updateMatrix();
    prong_tips.setMatrixAt(i, transform.matrix);
  }

  prong_posts.instanceMatrix.needsUpdate = true;
  prong_tips.instanceMatrix.needsUpdate = true;
  setting_group.add(prong_posts);
  setting_group.add(prong_tips);

  ring_assembly.rotation.set(0.95, 0.18, 0.42);

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

  fitToUnitCube(THREE, root);
  return root;
}
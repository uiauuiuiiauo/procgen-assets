export default function generate(THREE) {
  const root = new THREE.Group();
  const wooden_skewer = new THREE.Group();
  root.add(wooden_skewer);

  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xe7c98f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const pointed_tipMat = shaftMat;
  const blunt_capMat = shaftMat;

  const shaftProfile = [
    new THREE.Vector2(0.000, -1.62),
    new THREE.Vector2(0.043, -1.62),
    new THREE.Vector2(0.047, -1.50),
    new THREE.Vector2(0.048, -0.80),
    new THREE.Vector2(0.047, 0.00),
    new THREE.Vector2(0.045, 0.80),
    new THREE.Vector2(0.043, 1.50),
    new THREE.Vector2(0.042, 1.62),
    new THREE.Vector2(0.000, 1.62),
  ];
  const shaftGeom = new THREE.LatheGeometry(shaftProfile, 40);
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.rotation.z = -Math.PI / 2;
  wooden_skewer.add(shaft);

  const pointed_tipGeom = new THREE.ConeGeometry(0.043, 0.50, 40);
  const pointed_tip = new THREE.Mesh(pointed_tipGeom, pointed_tipMat);
  pointed_tip.rotation.z = Math.PI / 2;
  pointed_tip.position.x = -1.87;
  wooden_skewer.add(pointed_tip);

  const blunt_capGeom = new THREE.SphereGeometry(0.043, 32, 16);
  const blunt_cap = new THREE.Mesh(blunt_capGeom, blunt_capMat);
  blunt_cap.position.x = 1.62;
  blunt_cap.scale.set(0.55, 1, 1);
  wooden_skewer.add(blunt_cap);

  const grain_linesMat = new THREE.MeshStandardMaterial({
    color: 0xc99f61,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grain_lines = new THREE.Group();
  wooden_skewer.add(grain_lines);

  function addGrainLine(x0, x1, angle, phase) {
    const points = [];
    const radius = 0.046;
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const x = x0 + (x1 - x0) * t;
      const a = angle + Math.sin((t * 2 + phase) * Math.PI) * 0.025;
      points.push(new THREE.Vector3(
        x,
        Math.cos(a) * radius,
        Math.sin(a) * radius
      ));
    }
    const grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      24,
      0.0013,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grain_lineGeom, grain_linesMat);
    grain_lines.add(grain_line);
  }

  addGrainLine(-1.42, 1.36, 0.72, 0.0);
  addGrainLine(-1.18, 0.92, 1.02, 0.5);
  addGrainLine(-0.72, 1.46, 0.43, 0.8);

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
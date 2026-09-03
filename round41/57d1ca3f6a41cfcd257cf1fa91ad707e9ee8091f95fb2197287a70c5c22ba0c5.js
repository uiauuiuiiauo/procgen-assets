export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "gear";

  const toothCount = 12;
  const outerRadius = 1.0;
  const rootRadius = 0.78;
  const boreRadius = 0.44;
  const thickness = 0.30;

  const gear_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const inner_boreMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.BackSide,
  });

  const bore_chamferMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  const gearShape = new THREE.Shape();
  const pitch = Math.PI * 2 / toothCount;
  const samplesPerTooth = 24;
  let firstPoint = true;

  for (let i = 0; i < toothCount; i++) {
    const centerAngle = Math.PI / 2 + i * pitch;

    for (let j = 0; j < samplesPerTooth; j++) {
      const phase = j / samplesPerTooth - 0.5;
      const absolutePhase = Math.abs(phase);
      let radius;

      if (absolutePhase <= 0.18) {
        radius = outerRadius;
      } else if (absolutePhase < 0.34) {
        const t = (absolutePhase - 0.18) / 0.16;
        const smoothT = t * t * (3 - 2 * t);
        radius = outerRadius + (rootRadius - outerRadius) * smoothT;
      } else {
        radius = rootRadius;
      }

      const angle = centerAngle + phase * pitch;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (firstPoint) {
        gearShape.moveTo(x, y);
        firstPoint = false;
      } else {
        gearShape.lineTo(x, y);
      }
    }
  }
  gearShape.closePath();

  const centerHole = new THREE.Path();
  centerHole.absarc(0, 0, boreRadius, 0, Math.PI * 2, true);
  gearShape.holes.push(centerHole);

  const gear_bodyGeom = new THREE.ExtrudeGeometry(gearShape, {
    depth: thickness,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelOffset: 0,
    bevelSegments: 3,
    curveSegments: 48,
  });
  gear_bodyGeom.translate(0, 0, -thickness / 2);
  gear_bodyGeom.rotateX(-Math.PI / 2);

  const gear_body = new THREE.Mesh(gear_bodyGeom, gear_bodyMat);
  gear_body.name = "gear_body";
  root.add(gear_body);

  const inner_boreGeom = new THREE.CylinderGeometry(
    boreRadius - 0.003,
    boreRadius - 0.003,
    thickness - 0.018,
    64,
    1,
    true
  );
  const inner_bore = new THREE.Mesh(inner_boreGeom, inner_boreMat);
  inner_bore.name = "inner_bore";
  root.add(inner_bore);

  const bore_chamferGeom = new THREE.RingGeometry(
    boreRadius + 0.004,
    boreRadius + 0.034,
    64
  );

  const top_bore_chamfer = new THREE.Mesh(bore_chamferGeom, bore_chamferMat);
  top_bore_chamfer.name = "top_bore_chamfer";
  top_bore_chamfer.rotation.x = -Math.PI / 2;
  top_bore_chamfer.position.y = thickness / 2 + 0.0015;
  root.add(top_bore_chamfer);

  const bottom_bore_chamfer = new THREE.Mesh(bore_chamferGeom, bore_chamferMat);
  bottom_bore_chamfer.name = "bottom_bore_chamfer";
  bottom_bore_chamfer.rotation.x = Math.PI / 2;
  bottom_bore_chamfer.position.y = -thickness / 2 - 0.0015;
  root.add(bottom_bore_chamfer);

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
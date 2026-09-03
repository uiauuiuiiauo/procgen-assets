export default function generate(THREE) {
  const root = new THREE.Group();

  const spring_assembly = new THREE.Group();
  spring_assembly.rotation.y = 0.28;
  spring_assembly.rotation.z = 0.035;
  root.add(spring_assembly);

  const spring_coilMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const coilRadius = 0.36;
  const wireRadius = 0.052;
  const coilLength = 1.16;
  const turnCount = 8.5;
  const endTransition = 0.16;
  const pointCount = 273;
  const startPhase = -Math.PI * 0.28;
  const spring_coilPoints = [];

  function smoothStep(value) {
    return value * value * (3 - 2 * value);
  }

  for (let i = 0; i < pointCount; i++) {
    const t = i / (pointCount - 1);
    const angle = startPhase + t * turnCount * Math.PI * 2;
    let leftScale = 1;
    let rightScale = 1;

    if (t < endTransition) {
      leftScale = 0.86 + 0.14 * smoothStep(t / endTransition);
    }
    if (t > 1 - endTransition) {
      rightScale = 0.86 + 0.14 * smoothStep((1 - t) / endTransition);
    }

    const scale = leftScale * rightScale;
    spring_coilPoints.push(
      new THREE.Vector3(
        -coilLength * 0.5 + coilLength * t,
        coilRadius * scale * Math.cos(angle),
        coilRadius * scale * Math.sin(angle)
      )
    );
  }

  const spring_coilCurve = new THREE.CatmullRomCurve3(
    spring_coilPoints,
    false,
    "centripetal",
    0.5
  );
  const spring_coilGeom = new THREE.TubeGeometry(
    spring_coilCurve,
    416,
    wireRadius,
    16,
    false
  );
  const spring_coil = new THREE.Mesh(spring_coilGeom, spring_coilMat);
  spring_assembly.add(spring_coil);

  const capDepth = 0.012;
  const coil_end_capsGeom = new THREE.CylinderGeometry(
    wireRadius,
    wireRadius,
    capDepth,
    16
  );
  const coil_end_caps = new THREE.InstancedMesh(
    coil_end_capsGeom,
    spring_coilMat,
    2
  );
  const capTransform = new THREE.Object3D();
  const cylinderAxis = new THREE.Vector3(0, 1, 0);

  const startPoint = spring_coilCurve.getPoint(0);
  const startTangent = spring_coilCurve.getTangent(0).normalize();
  capTransform.position.copy(startPoint).addScaledVector(startTangent, -capDepth * 0.5);
  capTransform.quaternion.setFromUnitVectors(cylinderAxis, startTangent);
  capTransform.updateMatrix();
  coil_end_caps.setMatrixAt(0, capTransform.matrix);

  const endPoint = spring_coilCurve.getPoint(1);
  const endTangent = spring_coilCurve.getTangent(1).normalize();
  capTransform.position.copy(endPoint).addScaledVector(endTangent, capDepth * 0.5);
  capTransform.quaternion.setFromUnitVectors(cylinderAxis, endTangent);
  capTransform.updateMatrix();
  coil_end_caps.setMatrixAt(1, capTransform.matrix);

  coil_end_caps.instanceMatrix.needsUpdate = true;
  spring_assembly.add(coil_end_caps);

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
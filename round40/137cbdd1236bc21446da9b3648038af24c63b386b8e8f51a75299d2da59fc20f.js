export default function generate(THREE) {
  const root = new THREE.Group();
  const tool_assembly = new THREE.Group();
  root.add(tool_assembly);

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xa87343,
    metalness: 0.0,
    roughness: 0.6,
  });
  const handle_grainMat = new THREE.MeshStandardMaterial({
    color: 0x68401f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const handle_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x70431f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const handle = new THREE.Group();
  tool_assembly.add(handle);

  const handleProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.075, 0.006),
    new THREE.Vector2(0.135, 0.035),
    new THREE.Vector2(0.170, 0.095),
    new THREE.Vector2(0.180, 0.160),
    new THREE.Vector2(0.165, 0.250),
    new THREE.Vector2(0.145, 0.340),
    new THREE.Vector2(0.150, 0.420),
    new THREE.Vector2(0.180, 0.490),
    new THREE.Vector2(0.205, 0.560),
    new THREE.Vector2(0.220, 0.680),
    new THREE.Vector2(0.230, 0.850),
    new THREE.Vector2(0.238, 1.050),
    new THREE.Vector2(0.242, 1.250),
    new THREE.Vector2(0.238, 1.450),
    new THREE.Vector2(0.225, 1.620),
    new THREE.Vector2(0.205, 1.760),
    new THREE.Vector2(0.165, 1.860),
    new THREE.Vector2(0.105, 1.920),
    new THREE.Vector2(0.045, 1.950),
    new THREE.Vector2(0.000, 1.957),
  ];
  const handle_bodyGeom = new THREE.LatheGeometry(handleProfile, 40);
  const handle_body = new THREE.Mesh(handle_bodyGeom, handleMat);
  handle.add(handle_body);

  const handle_grooveGeom = new THREE.TorusGeometry(0.181, 0.006, 8, 40);
  const handle_groove = new THREE.Mesh(handle_grooveGeom, handle_grooveMat);
  handle_groove.rotation.x = Math.PI / 2;
  handle_groove.position.y = 0.495;
  handle.add(handle_groove);

  function handleRadiusAt(y) {
    for (let i = 2; i < handleProfile.length - 1; i++) {
      const lower = handleProfile[i - 1];
      const upper = handleProfile[i];
      if (y <= upper.y) {
        const span = upper.y - lower.y || 1;
        const t = (y - lower.y) / span;
        return lower.x + (upper.x - lower.x) * t;
      }
    }
    return 0.045;
  }

  const handle_grain = new THREE.Group();
  handle.add(handle_grain);

  for (let i = 0; i < 14; i++) {
    const grain_points = [];
    const baseAngle = i / 14 * Math.PI * 2;
    const y0 = 0.10 + (i % 4) * 0.045;
    const y1 = 1.73 - (i % 5) * 0.055;

    for (let j = 0; j <= 12; j++) {
      const t = j / 12;
      const y = y0 + (y1 - y0) * t;
      const angle =
        baseAngle +
        0.035 * Math.sin(t * Math.PI * 2 + i * 0.73) +
        0.018 * (t - 0.5) * ((i % 3) - 1);
      const radius = handleRadiusAt(y) + 0.003;
      grain_points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }

    const grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(grain_points),
      24,
      0.0027,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grain_lineGeom, handle_grainMat);
    handle_grain.add(grain_line);
  }

  for (let i = 0; i < 8; i++) {
    const short_grain_points = [];
    const baseAngle = (i + 0.42) / 8 * Math.PI * 2;
    const y0 = 0.62 + (i % 4) * 0.14;
    const y1 = y0 + 0.12 + (i % 2) * 0.045;

    for (let j = 0; j <= 5; j++) {
      const t = j / 5;
      const y = y0 + (y1 - y0) * t;
      const angle = baseAngle + 0.025 * Math.sin(t * Math.PI + i);
      const radius = handleRadiusAt(y) + 0.0035;
      short_grain_points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }

    const short_grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(short_grain_points),
      10,
      0.003,
      5,
      false
    );
    const short_grain_line = new THREE.Mesh(
      short_grain_lineGeom,
      handle_grainMat
    );
    handle_grain.add(short_grain_line);
  }

  const shaftPath = [
    new THREE.Vector3(0.000, 0.025, 0.000),
    new THREE.Vector3(-0.015, -0.350, 0.000),
    new THREE.Vector3(-0.060, -0.900, 0.001),
    new THREE.Vector3(-0.120, -1.500, 0.002),
    new THREE.Vector3(-0.190, -2.100, 0.004),
    new THREE.Vector3(-0.270, -2.650, 0.006),
    new THREE.Vector3(-0.340, -3.050, 0.008),
    new THREE.Vector3(-0.390, -3.300, 0.010),
    new THREE.Vector3(-0.425, -3.480, 0.012),
    new THREE.Vector3(-0.410, -3.680, 0.014),
    new THREE.Vector3(-0.385, -3.900, 0.016),
    new THREE.Vector3(-0.370, -4.140, 0.018),
  ];
  const shaftCurve = new THREE.CatmullRomCurve3(shaftPath);
  const shaftGeom = new THREE.TubeGeometry(
    shaftCurve,
    112,
    0.019,
    10,
    false
  );
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  tool_assembly.add(shaft);

  const tipBase = shaftPath[shaftPath.length - 1].clone();
  const tipDirection = tipBase
    .clone()
    .sub(shaftPath[shaftPath.length - 2])
    .normalize();
  const tipLength = 0.34;
  const tipEnd = tipBase.clone().addScaledVector(tipDirection, tipLength);

  const tipGeom = new THREE.CylinderGeometry(
    0.001,
    0.020,
    tipLength,
    12,
    1,
    false
  );
  const tip = new THREE.Mesh(tipGeom, shaftMat);
  tip.position.copy(tipBase).add(tipEnd).multiplyScalar(0.5);
  tip.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    tipDirection
  );
  tool_assembly.add(tip);

  tool_assembly.rotation.z = -0.65;

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
export default function generate(THREE) {
  const root = new THREE.Group();

  const vertical_woodMat = new THREE.MeshStandardMaterial({
    color: 0x7d5033,
    metalness: 0.0,
    roughness: 0.6,
  });
  const side_woodMat = new THREE.MeshStandardMaterial({
    color: 0x895a38,
    metalness: 0.0,
    roughness: 0.6,
  });
  const mallet_woodMat = new THREE.MeshStandardMaterial({
    color: 0x98643b,
    metalness: 0.0,
    roughness: 0.6,
  });
  const mallet_headMat = new THREE.MeshStandardMaterial({
    color: 0x6b351f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x4d2b1c,
    metalness: 0.0,
    roughness: 0.6,
  });

  function roundedRectGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 8,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function addGrainTube(parent, points, radius) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(10, points.length * 4),
      radius,
      5,
      false
    );
    const grain = new THREE.Mesh(geometry, grainMat);
    parent.add(grain);
    return grain;
  }

  const vertical_postGeom = roundedRectGeometry(
    0.115,
    2.0,
    0.09,
    0.025,
    0.008
  );
  const vertical_post = new THREE.Mesh(vertical_postGeom, vertical_woodMat);
  vertical_post.position.set(0.04, 0, 0);
  root.add(vertical_post);

  const side_armGeom = roundedRectGeometry(
    0.5,
    0.095,
    0.082,
    0.025,
    0.007
  );
  const side_arm = new THREE.Mesh(side_armGeom, side_woodMat);
  side_arm.position.set(-0.2, 0.5, 0.002);
  root.add(side_arm);

  const vertical_post_grain = new THREE.Group();
  root.add(vertical_post_grain);
  for (let i = 0; i < 4; i++) {
    const points = [];
    const baseX = 0.04 + (i - 1.5) * 0.021;
    for (let j = 0; j <= 6; j++) {
      const t = j / 6;
      points.push(
        new THREE.Vector3(
          baseX + Math.sin((j + i * 2) * 1.15) * 0.003,
          -0.91 + t * 1.82,
          0.055
        )
      );
    }
    addGrainTube(vertical_post_grain, points, 0.00115);
  }

  const side_arm_grain = new THREE.Group();
  root.add(side_arm_grain);
  for (let i = 0; i < 3; i++) {
    const points = [];
    const baseY = 0.5 + (i - 1) * 0.022;
    for (let j = 0; j <= 5; j++) {
      const t = j / 5;
      points.push(
        new THREE.Vector3(
          -0.435 + t * 0.455,
          baseY + Math.sin((j + i) * 1.4) * 0.0025,
          0.054
        )
      );
    }
    addGrainTube(side_arm_grain, points, 0.0011);
  }

  const mallet = new THREE.Group();
  mallet.position.set(-0.04, -0.08, 0.08);
  mallet.rotation.z = -0.6;
  root.add(mallet);

  const mallet_handleGeom = new THREE.CylinderGeometry(
    0.043,
    0.052,
    1.58,
    24,
    4
  );
  const mallet_handle = new THREE.Mesh(
    mallet_handleGeom,
    mallet_woodMat
  );
  mallet_handle.position.y = -0.15;
  mallet.add(mallet_handle);

  const handle_bottom_capGeom = new THREE.SphereGeometry(0.052, 20, 12);
  const handle_bottom_cap = new THREE.Mesh(
    handle_bottom_capGeom,
    mallet_woodMat
  );
  handle_bottom_cap.position.y = -0.94;
  handle_bottom_cap.scale.set(1, 0.72, 1);
  mallet.add(handle_bottom_cap);

  const mallet_handle_grain = new THREE.Group();
  mallet.add(mallet_handle_grain);
  for (let i = 0; i < 4; i++) {
    const points = [];
    const baseX = (i - 1.5) * 0.016;
    for (let j = 0; j <= 7; j++) {
      const t = j / 7;
      const y = -0.89 + t * 1.47;
      const radius = 0.051 - t * 0.008;
      const x =
        baseX + Math.sin((j + i * 2) * 1.05) * 0.0018;
      const z =
        Math.sqrt(Math.max(0.0001, radius * radius - x * x)) + 0.001;
      points.push(new THREE.Vector3(x, y, z));
    }
    addGrainTube(mallet_handle_grain, points, 0.0009);
  }

  const mallet_collarProfile = [
    new THREE.Vector2(0.043, 0.59),
    new THREE.Vector2(0.045, 0.62),
    new THREE.Vector2(0.061, 0.64),
    new THREE.Vector2(0.071, 0.67),
    new THREE.Vector2(0.068, 0.7),
    new THREE.Vector2(0.058, 0.72),
    new THREE.Vector2(0.061, 0.74),
  ];
  const mallet_collarGeom = new THREE.LatheGeometry(
    mallet_collarProfile,
    32
  );
  const mallet_collar = new THREE.Mesh(
    mallet_collarGeom,
    mallet_headMat
  );
  mallet.add(mallet_collar);

  const mallet_headCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.058, 0.7),
    new THREE.Vector2(0.052, 0.74),
    new THREE.Vector2(0.064, 0.78),
    new THREE.Vector2(0.098, 0.83),
    new THREE.Vector2(0.15, 0.88),
    new THREE.Vector2(0.198, 0.94),
    new THREE.Vector2(0.218, 0.99),
    new THREE.Vector2(0.207, 1.035),
    new THREE.Vector2(0.174, 1.07),
    new THREE.Vector2(0.105, 1.095),
    new THREE.Vector2(0.035, 1.105),
    new THREE.Vector2(0, 1.105),
  ]);
  const mallet_headProfile = mallet_headCurve.getSpacedPoints(40);
  const mallet_headGeom = new THREE.LatheGeometry(
    mallet_headProfile,
    48
  );
  const mallet_head = new THREE.Mesh(
    mallet_headGeom,
    mallet_headMat
  );
  mallet.add(mallet_head);

  const mallet_head_grain = new THREE.Group();
  mallet.add(mallet_head_grain);
  for (let i = 0; i < 3; i++) {
    const points = [];
    const baseX = (i - 1) * 0.038;
    for (let j = 0; j <= 6; j++) {
      const t = j / 6;
      const y = 0.8 + t * 0.245;
      const radius =
        0.085 +
        Math.sin(t * Math.PI) * 0.105 +
        t * 0.018;
      const x =
        baseX + Math.sin((j + i) * 1.25) * 0.002;
      const z =
        Math.sqrt(Math.max(0.0001, radius * radius - x * x)) + 0.0015;
      points.push(new THREE.Vector3(x, y, z));
    }
    addGrainTube(mallet_head_grain, points, 0.001);
  }

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
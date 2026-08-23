export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wicker_basket";

  const basket_body = new THREE.Group();
  basket_body.name = "basket_body";
  root.add(basket_body);

  const basket_handle = new THREE.Group();
  basket_handle.name = "basket_handle";
  root.add(basket_handle);

  const wicker_lightMat = new THREE.MeshStandardMaterial({
    color: 0xc98b50,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wicker_midMat = new THREE.MeshStandardMaterial({
    color: 0xae6d38,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wicker_darkMat = new THREE.MeshStandardMaterial({
    color: 0x80502f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const handle_wickerMat = new THREE.MeshStandardMaterial({
    color: 0xb9783e,
    metalness: 0.0,
    roughness: 0.6,
  });

  const rodGeom = new THREE.CylinderGeometry(1, 1, 1, 10);

  function createRod(name, start, end, radius, material, parent) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const mesh = new THREE.Mesh(rodGeom, material);
    mesh.name = name;
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.scale.set(radius, length, radius);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    parent.add(mesh);
    return mesh;
  }

  function createWavyRing(
    name,
    y,
    radiusX,
    radiusZ,
    waves,
    phase,
    tubeRadius,
    material
  ) {
    const points = [];
    const pointCount = 72;
    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2;
      const wave = waves * angle + phase;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radiusX * (1 + 0.006 * Math.cos(wave)),
          y + 0.012 * Math.sin(wave),
          Math.sin(angle) * radiusZ * (1 + 0.006 * Math.cos(wave))
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      144,
      tubeRadius,
      7,
      true
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    basket_body.add(mesh);
    return mesh;
  }

  function createOvalRim(
    name,
    y,
    radiusX,
    radiusZ,
    tubeRadius,
    material
  ) {
    const points = [];
    const pointCount = 72;
    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radiusX,
          y + 0.006 * Math.sin(angle * 3),
          Math.sin(angle) * radiusZ
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      144,
      tubeRadius,
      9,
      true
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    basket_body.add(mesh);
    return mesh;
  }

  const vertical_stakes = new THREE.Group();
  vertical_stakes.name = "vertical_stakes";
  basket_body.add(vertical_stakes);

  const stakeCount = 28;
  for (let i = 0; i < stakeCount; i++) {
    const angle = (i / stakeCount) * Math.PI * 2;
    const bendAngle = angle + (i % 2 === 0 ? 0.025 : -0.025);
    const points = [
      new THREE.Vector3(
        Math.cos(angle) * 1.08,
        0.12,
        Math.sin(angle) * 0.70
      ),
      new THREE.Vector3(
        Math.cos(bendAngle) * 1.12,
        0.45,
        Math.sin(bendAngle) * 0.72
      ),
      new THREE.Vector3(
        Math.cos(angle + 0.012) * 1.22,
        0.88,
        Math.sin(angle + 0.012) * 0.78
      ),
      new THREE.Vector3(
        Math.cos(bendAngle) * 1.34,
        1.34,
        Math.sin(bendAngle) * 0.87
      ),
    ];
    const stakeCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const vertical_stakeGeom = new THREE.TubeGeometry(
      stakeCurve,
      24,
      0.022,
      7,
      false
    );
    const vertical_stake = new THREE.Mesh(
      vertical_stakeGeom,
      i % 3 === 0 ? wicker_darkMat : wicker_midMat
    );
    vertical_stake.name = "vertical_stake_" + i;
    vertical_stakes.add(vertical_stake);
  }

  const bottom_rim = createOvalRim(
    "bottom_rim",
    0.075,
    1.18,
    0.75,
    0.045,
    wicker_darkMat
  );
  const bottom_weave = createWavyRing(
    "bottom_weave",
    0.15,
    1.14,
    0.71,
    10,
    0.3,
    0.035,
    wicker_midMat
  );

  const horizontal_weave = new THREE.Group();
  horizontal_weave.name = "horizontal_weave";
  basket_body.add(horizontal_weave);

  const rowCount = 15;
  for (let i = 0; i < rowCount; i++) {
    const t = i / (rowCount - 1);
    const y = 0.22 + t * 1.04;
    const radiusX = 1.11 + t * 0.23;
    const radiusZ = 0.70 + t * 0.16;
    const phase = (i % 2) * Math.PI;
    const material =
      i % 4 === 0
        ? wicker_darkMat
        : i % 4 === 1
          ? wicker_lightMat
          : wicker_midMat;
    const weave_row = createWavyRing(
      "weave_row_" + i,
      y,
      radiusX,
      radiusZ,
      14,
      phase,
      0.036,
      material
    );
    horizontal_weave.add(weave_row);
  }

  const upper_rim_support = createOvalRim(
    "upper_rim_support",
    1.275,
    1.39,
    0.89,
    0.035,
    wicker_darkMat
  );
  const upper_rim = createOvalRim(
    "upper_rim",
    1.34,
    1.43,
    0.92,
    0.052,
    wicker_lightMat
  );
  const outer_rim = createOvalRim(
    "outer_rim",
    1.385,
    1.49,
    0.96,
    0.043,
    wicker_midMat
  );

  const handlePoints = [
    new THREE.Vector3(-0.82, 1.34, -0.50),
    new THREE.Vector3(-0.80, 1.67, -0.50),
    new THREE.Vector3(-0.66, 2.04, -0.50),
    new THREE.Vector3(-0.40, 2.36, -0.50),
    new THREE.Vector3(0.00, 2.52, -0.50),
    new THREE.Vector3(0.40, 2.36, -0.50),
    new THREE.Vector3(0.66, 2.04, -0.50),
    new THREE.Vector3(0.80, 1.67, -0.50),
    new THREE.Vector3(0.82, 1.34, -0.50),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal"
  );
  const handle_coreGeom = new THREE.TubeGeometry(
    handleCurve,
    96,
    0.068,
    12,
    false
  );
  const handle_core = new THREE.Mesh(
    handle_coreGeom,
    wicker_darkMat
  );
  handle_core.name = "handle_core";
  basket_handle.add(handle_core);

  const handle_twist = new THREE.Group();
  handle_twist.name = "handle_twist";
  basket_handle.add(handle_twist);

  for (let strandIndex = 0; strandIndex < 4; strandIndex++) {
    const strandPoints = [];
    const pointCount = 64;
    for (let i = 0; i <= pointCount; i++) {
      const t = i / pointCount;
      const center = handleCurve.getPoint(t);
      const tangent = handleCurve.getTangent(t).normalize();
      const normal = new THREE.Vector3(
        -tangent.y,
        tangent.x,
        0
      ).normalize();
      const binormal = new THREE.Vector3(0, 0, 1);
      const turn = t * Math.PI * 12 + strandIndex * Math.PI * 0.5;
      center.addScaledVector(normal, Math.cos(turn) * 0.052);
      center.addScaledVector(binormal, Math.sin(turn) * 0.052);
      strandPoints.push(center);
    }
    const strandCurve = new THREE.CatmullRomCurve3(
      strandPoints,
      false,
      "centripetal"
    );
    const handle_strandGeom = new THREE.TubeGeometry(
      strandCurve,
      96,
      0.023,
      7,
      false
    );
    const handle_strand = new THREE.Mesh(
      handle_strandGeom,
      strandIndex % 2 === 0 ? handle_wickerMat : wicker_lightMat
    );
    handle_strand.name = "handle_strand_" + strandIndex;
    handle_twist.add(handle_strand);
  }

  const left_bindingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-0.845, 1.20, -0.49),
        new THREE.Vector3(-0.835, 1.34, -0.50),
        new THREE.Vector3(-0.805, 1.52, -0.50),
      ],
      false,
      "centripetal"
    ),
    20,
    0.078,
    10,
    false
  );
  const left_binding = new THREE.Mesh(
    left_bindingGeom,
    wicker_midMat
  );
  left_binding.name = "left_binding";
  basket_handle.add(left_binding);

  const right_bindingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0.845, 1.20, -0.49),
        new THREE.Vector3(0.835, 1.34, -0.50),
        new THREE.Vector3(0.805, 1.52, -0.50),
      ],
      false,
      "centripetal"
    ),
    20,
    0.078,
    10,
    false
  );
  const right_binding = new THREE.Mesh(
    right_bindingGeom,
    wicker_midMat
  );
  right_binding.name = "right_binding";
  basket_handle.add(right_binding);

  const binding_wraps = new THREE.Group();
  binding_wraps.name = "binding_wraps";
  basket_handle.add(binding_wraps);

  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      const y = 1.275 + i * 0.036;
      const radiusX = 1.445 - i * 0.012;
      const radiusZ = 0.925 - i * 0.008;
      const points = [];
      const pointCount = 48;
      for (let j = 0; j < pointCount; j++) {
        const angle = (j / pointCount) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            side * radiusX * Math.cos(angle),
            y + 0.004 * Math.cos(angle * 2),
            radiusZ * Math.sin(angle)
          )
        );
      }
      const wrapCurve = new THREE.CatmullRomCurve3(
        points,
        true,
        "centripetal"
      );
      const binding_wrapGeom = new THREE.TubeGeometry(
        wrapCurve,
        72,
        0.014,
        6,
        true
      );
      const binding_wrap = new THREE.Mesh(
        binding_wrapGeom,
        i % 2 === 0 ? wicker_lightMat : wicker_midMat
      );
      binding_wrap.name =
        (side < 0 ? "left_binding_wrap_" : "right_binding_wrap_") + i;
      binding_wraps.add(binding_wrap);
    }
  }

  const left_handle_tie = createRod(
    "left_handle_tie",
    new THREE.Vector3(-0.88, 1.29, -0.48),
    new THREE.Vector3(-0.70, 1.15, -0.35),
    0.027,
    wicker_darkMat,
    basket_handle
  );
  const right_handle_tie = createRod(
    "right_handle_tie",
    new THREE.Vector3(0.88, 1.29, -0.48),
    new THREE.Vector3(0.70, 1.15, -0.35),
    0.027,
    wicker_darkMat,
    basket_handle
  );

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
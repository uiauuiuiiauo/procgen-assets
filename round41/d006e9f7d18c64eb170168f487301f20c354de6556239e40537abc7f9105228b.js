export default function generate(THREE) {
  const root = new THREE.Group();
  const quill = new THREE.Group();
  quill.name = "quill";
  root.add(quill);

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xd9b878,
    metalness: 0.0,
    roughness: 0.6,
  });
  const handle_grainMat = new THREE.MeshStandardMaterial({
    color: 0x9a6b35,
    metalness: 0.0,
    roughness: 0.6,
  });
  const handle_ringMat = new THREE.MeshStandardMaterial({
    color: 0x77502d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const pointed_tipMat = new THREE.MeshStandardMaterial({
    color: 0x49301f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const lower_quillMat = new THREE.MeshStandardMaterial({
    color: 0x4a2a1b,
    metalness: 0.0,
    roughness: 0.6,
  });
  const left_vaneMat = new THREE.MeshStandardMaterial({
    color: 0x503326,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const right_vaneMat = new THREE.MeshStandardMaterial({
    color: 0x3d261c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const barbMat = new THREE.LineBasicMaterial({
    color: 0x241610,
    transparent: true,
    opacity: 0.72,
  });
  const highlight_barbMat = new THREE.LineBasicMaterial({
    color: 0x815b42,
    transparent: true,
    opacity: 0.42,
  });
  const downy_barbMat = new THREE.LineBasicMaterial({
    color: 0x5b3928,
    transparent: true,
    opacity: 0.82,
  });
  const downy_fiberMat = new THREE.LineBasicMaterial({
    color: 0x9a775c,
    transparent: true,
    opacity: 0.55,
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0xd8c7a8,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const handleProfile = [
    new THREE.Vector2(0.000, -2.78),
    new THREE.Vector2(0.035, -2.78),
    new THREE.Vector2(0.055, -2.65),
    new THREE.Vector2(0.085, -2.35),
    new THREE.Vector2(0.115, -1.95),
    new THREE.Vector2(0.145, -1.55),
    new THREE.Vector2(0.150, -1.43),
    new THREE.Vector2(0.165, -1.38),
    new THREE.Vector2(0.170, -0.72),
    new THREE.Vector2(0.155, -0.58),
    new THREE.Vector2(0.000, -0.58),
  ];
  const handleGeom = new THREE.LatheGeometry(handleProfile, 32);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  quill.add(handle);

  const pointed_tipGeom = new THREE.CylinderGeometry(0.035, 0.0, 0.18, 16);
  const pointed_tip = new THREE.Mesh(pointed_tipGeom, pointed_tipMat);
  pointed_tip.name = "pointed_tip";
  pointed_tip.position.y = -2.87;
  quill.add(pointed_tip);

  const handle_ringGeom = new THREE.TorusGeometry(0.153, 0.007, 8, 28);
  const handle_ring = new THREE.Mesh(handle_ringGeom, handle_ringMat);
  handle_ring.name = "handle_ring";
  handle_ring.rotation.x = Math.PI / 2;
  handle_ring.position.y = -1.43;
  quill.add(handle_ring);

  function handleRadiusAt(y) {
    if (y < -2.65) return 0.035 + (y + 2.78) * 0.154;
    if (y < -2.35) return 0.055 + (y + 2.65) * 0.10;
    if (y < -1.55) return 0.085 + (y + 2.35) * 0.075;
    if (y < -1.43) return 0.145 + (y + 1.55) * 0.042;
    return 0.165;
  }

  const handle_grain = new THREE.Group();
  handle_grain.name = "handle_grain";
  for (let i = 0; i < 6; i++) {
    const points = [];
    const baseAngle = 0.42 + i * 0.43;
    for (let j = 0; j <= 9; j++) {
      const t = j / 9;
      const y = -2.61 + t * 1.88;
      const angle = baseAngle + Math.sin(t * Math.PI * 2 + i * 0.7) * 0.035;
      const radius = handleRadiusAt(y) + 0.003;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));
    }
    const handle_grainGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      18,
      0.0028,
      5,
      false
    );
    const handle_grain_line = new THREE.Mesh(handle_grainGeom, handle_grainMat);
    handle_grain.add(handle_grain_line);
  }
  quill.add(handle_grain);

  const lower_quillPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, -0.61, 0.018),
    new THREE.Vector3(-0.07, -0.24, 0.020),
    new THREE.Vector3(-0.03, 0.12, 0.020),
    new THREE.Vector3(0.12, 0.58, 0.020),
    new THREE.Vector3(0.34, 1.10, 0.020),
    new THREE.Vector3(0.56, 1.64, 0.020),
    new THREE.Vector3(0.76, 2.17, 0.020),
    new THREE.Vector3(0.92, 2.67, 0.020),
  ], false, "centripetal");
  const lower_quillGeom = new THREE.TubeGeometry(
    lower_quillPath,
    72,
    0.055,
    10,
    false
  );
  const lower_quill = new THREE.Mesh(lower_quillGeom, lower_quillMat);
  lower_quill.name = "lower_quill";
  quill.add(lower_quill);

  function spinePoint(t) {
    return new THREE.Vector3(
      0.92 * t * t - 0.03 * Math.sin(Math.PI * t),
      -0.18 + 2.85 * t,
      0.02
    );
  }

  function vaneWidth(t, side) {
    const arch = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.68);
    const variation = 1 + 0.018 * Math.sin(t * Math.PI * 14 + (side > 0 ? 0.5 : 1.2));
    if (side < 0) return 0.78 * arch * (1 - 0.08 * t) * variation;
    return 0.55 * arch * (0.88 + 0.12 * t) * variation;
  }

  function vanePoint(t, side, u) {
    const center = spinePoint(t);
    const width = vaneWidth(t, side);
    const gap = 0.012 * Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.5);
    return new THREE.Vector3(
      center.x + side * (gap + width * u),
      center.y - 0.085 * u * u + 0.012 * Math.sin(Math.PI * u) * Math.sin(Math.PI * t),
      0
    );
  }

  function createVaneGeometry(side) {
    const shape = new THREE.Shape();
    const edgeSteps = 42;
    const innerSteps = 10;

    for (let i = 0; i <= edgeSteps; i++) {
      const t = i / edgeSteps;
      const point = vanePoint(t, side, 1);
      if (i === 0) shape.moveTo(point.x, point.y);
      else shape.lineTo(point.x, point.y);
    }

    for (let i = edgeSteps; i >= 0; i--) {
      const t = i / edgeSteps;
      const point = vanePoint(t, side, 0);
      shape.lineTo(point.x, point.y);
    }

    for (let i = 1; i <= innerSteps; i++) {
      const t = i / innerSteps;
      const point = spinePoint(-0.15 + t * 0.23);
      shape.lineTo(point.x, point.y);
    }

    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const left_vaneGeom = createVaneGeometry(-1);
  const left_vane = new THREE.Mesh(left_vaneGeom, left_vaneMat);
  left_vane.name = "left_vane";
  quill.add(left_vane);

  const right_vaneGeom = createVaneGeometry(1);
  const right_vane = new THREE.Mesh(right_vaneGeom, right_vaneMat);
  right_vane.name = "right_vane";
  quill.add(right_vane);

  function createBarbGeometry(side, offset, count, z) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const t = 0.065 + (i / (count - 1)) * 0.91;
      const start = spinePoint(t);
      const end = vanePoint(Math.min(0.995, t + 0.025), side, 0.985);
      positions.push(
        start.x + side * offset, start.y, z,
        end.x, end.y, z
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }

  const left_barbsGeom = createBarbGeometry(-1, 0.012, 58, 0.012);
  const left_barbs = new THREE.LineSegments(left_barbsGeom, barbMat);
  left_barbs.name = "left_barbs";
  quill.add(left_barbs);

  const right_barbsGeom = createBarbGeometry(1, 0.012, 58, 0.012);
  const right_barbs = new THREE.LineSegments(right_barbsGeom, barbMat);
  right_barbs.name = "right_barbs";
  quill.add(right_barbs);

  function createHighlightBarbsGeometry(side, count, z) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const t = 0.11 + (i / (count - 1)) * 0.84;
      const start = spinePoint(t);
      const end = vanePoint(Math.min(0.98, t + 0.018), side, 0.91);
      positions.push(
        start.x + side * 0.022, start.y, z,
        end.x, end.y, z
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }

  const left_highlight_barbsGeom = createHighlightBarbsGeometry(-1, 38, 0.014);
  const left_highlight_barbs = new THREE.LineSegments(left_highlight_barbsGeom, highlight_barbMat);
  left_highlight_barbs.name = "left_highlight_barbs";
  quill.add(left_highlight_barbs);

  const right_highlight_barbsGeom = createHighlightBarbsGeometry(1, 38, 0.014);
  const right_highlight_barbs = new THREE.LineSegments(right_highlight_barbsGeom, highlight_barbMat);
  right_highlight_barbs.name = "right_highlight_barbs";
  quill.add(right_highlight_barbs);

  function createEdgeTuftGeometry(side) {
    const positions = [];
    const tuftCount = 9;
    for (let i = 0; i < tuftCount; i++) {
      const t = 0.035 + i * 0.026;
      const start = spinePoint(t);
      const edge = vanePoint(t, side, 0.82);
      const length = 0.08 + 0.025 * (0.5 + 0.5 * Math.sin(i * 1.73));
      const drop = 0.045 + 0.035 * (0.5 + 0.5 * Math.sin(i * 2.17 + 0.4));
      const endX = edge.x + side * length;
      const endY = edge.y - drop;
      positions.push(edge.x, edge.y, 0.006, endX, endY, 0.006);

      if (i % 2 === 0) {
        positions.push(
          start.x + side * 0.018, start.y, 0.005,
          endX - side * length * 0.35, endY + 0.055, 0.005
        );
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }

  const left_edge_tuftsGeom = createEdgeTuftGeometry(-1);
  const left_edge_tufts = new THREE.LineSegments(left_edge_tuftsGeom, downy_barbMat);
  left_edge_tufts.name = "left_edge_tufts";
  quill.add(left_edge_tufts);

  const right_edge_tuftsGeom = createEdgeTuftGeometry(1);
  const right_edge_tufts = new THREE.LineSegments(right_edge_tuftsGeom, downy_barbMat);
  right_edge_tufts.name = "right_edge_tufts";
  quill.add(right_edge_tufts);

  function createWispPath(points) {
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      14,
      0.0045,
      5,
      false
    );
  }

  const downy_wisps = new THREE.Group();
  downy_wisps.name = "downy_wisps";
  const downy_wisp_paths = [
    [
      new THREE.Vector3(-0.01, -0.22, 0.004),
      new THREE.Vector3(-0.18, -0.12, 0.004),
      new THREE.Vector3(-0.39, -0.03, 0.004),
      new THREE.Vector3(-0.56, 0.08, 0.004),
    ],
    [
      new THREE.Vector3(-0.02, -0.24, 0.003),
      new THREE.Vector3(-0.18, -0.29, 0.003),
      new THREE.Vector3(-0.36, -0.27, 0.003),
      new THREE.Vector3(-0.50, -0.18, 0.003),
    ],
    [
      new THREE.Vector3(-0.01, -0.19, 0.005),
      new THREE.Vector3(-0.10, -0.02, 0.005),
      new THREE.Vector3(-0.19, 0.13, 0.005),
      new THREE.Vector3(-0.25, 0.25, 0.005),
    ],
    [
      new THREE.Vector3(0.00, -0.23, 0.004),
      new THREE.Vector3(0.15, -0.12, 0.004),
      new THREE.Vector3(0.33, -0.02, 0.004),
      new THREE.Vector3(0.49, 0.09, 0.004),
    ],
    [
      new THREE.Vector3(0.00, -0.25, 0.003),
      new THREE.Vector3(0.17, -0.29, 0.003),
      new THREE.Vector3(0.36, -0.23, 0.003),
      new THREE.Vector3(0.52, -0.12, 0.003),
    ],
    [
      new THREE.Vector3(0.01, -0.20, 0.005),
      new THREE.Vector3(0.10, -0.04, 0.005),
      new THREE.Vector3(0.20, 0.11, 0.005),
      new THREE.Vector3(0.28, 0.23, 0.005),
    ],
    [
      new THREE.Vector3(-0.02, -0.26, 0.002),
      new THREE.Vector3(-0.09, -0.39, 0.002),
      new THREE.Vector3(-0.18, -0.50, 0.002),
      new THREE.Vector3(-0.25, -0.57, 0.002),
    ],
    [
      new THREE.Vector3(0.01, -0.26, 0.002),
      new THREE.Vector3(0.09, -0.39, 0.002),
      new THREE.Vector3(0.16, -0.48, 0.002),
      new THREE.Vector3(0.20, -0.60, 0.002),
    ],
  ];
  for (let i = 0; i < downy_wisp_paths.length; i++) {
    const downy_wispGeom = createWispPath(downy_wisp_paths[i]);
    const downy_wisp = new THREE.Mesh(downy_wispGeom, lower_quillMat);
    downy_wisps.add(downy_wisp);
  }
  quill.add(downy_wisps);

  function createDownLineGeometry(count, phase, spread, z) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = phase + i / count * Math.PI * 2;
      const variation = 0.5 + 0.5 * Math.sin(i * 2.37 + phase);
      const length = spread * (0.55 + 0.45 * variation);
      const rootX = -0.015 + 0.025 * Math.sin(i * 1.31);
      const rootY = -0.23 + 0.025 * Math.sin(i * 0.83 + 0.6);
      const midX = rootX + Math.cos(angle) * length * 0.48;
      const midY = rootY + Math.sin(angle) * length * 0.36 + 0.035;
      const endX = rootX + Math.cos(angle) * length;
      const endY = rootY + Math.sin(angle) * length * 0.58 + 0.02 * variation;
      positions.push(
        rootX, rootY, z,
        midX, midY, z,
        midX, midY, z,
        endX, endY, z
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }

  const downy_barbsGeom = createDownLineGeometry(28, 0.2, 0.55, 0.008);
  const downy_barbs = new THREE.LineSegments(downy_barbsGeom, downy_barbMat);
  downy_barbs.name = "downy_barbs";
  quill.add(downy_barbs);

  const downy_fibersGeom = createDownLineGeometry(22, 0.67, 0.46, 0.010);
  const downy_fibers = new THREE.LineSegments(downy_fibersGeom, downy_fiberMat);
  downy_fibers.name = "downy_fibers";
  quill.add(downy_fibers);

  const wear_patchGeom = new THREE.CircleGeometry(1, 16);

  function createWearPatch(name, x, y, sx, sy, rotation) {
    const patch = new THREE.Mesh(wear_patchGeom, wearMat);
    patch.name = name;
    patch.position.set(x, y, 0.019);
    patch.scale.set(sx, sy, 1);
    patch.rotation.z = rotation;
    quill.add(patch);
    return patch;
  }

  const wear_patch_lower = createWearPatch(
    "wear_patch_lower",
    0.20,
    0.66,
    0.052,
    0.014,
    -0.48
  );
  const wear_patch_middle = createWearPatch(
    "wear_patch_middle",
    0.43,
    1.30,
    0.045,
    0.012,
    -0.38
  );
  const wear_patch_upper = createWearPatch(
    "wear_patch_upper",
    0.69,
    2.02,
    0.038,
    0.010,
    -0.55
  );

  quill.rotation.z = -0.48;

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
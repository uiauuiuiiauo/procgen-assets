export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hammer";

  const tool_group = new THREE.Group();
  tool_group.name = "tool_group";
  tool_group.rotation.set(-0.10, 0, -0.95);
  root.add(tool_group);

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xa96f36,
    metalness: 0.0,
    roughness: 0.6,
  });

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x56331f,
    metalness: 0.0,
    roughness: 0.6,
  });

  const brand_markMat = new THREE.MeshStandardMaterial({
    color: 0x28170f,
    metalness: 0.0,
    roughness: 0.7,
  });

  const headMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const striking_facesMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const head_socketMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  const head_wearMat = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    metalness: 0.0,
    roughness: 0.7,
  });

  const handleProfile = [
    new THREE.Vector2(0.000, 0.00),
    new THREE.Vector2(0.145, 0.00),
    new THREE.Vector2(0.148, 0.08),
    new THREE.Vector2(0.154, 0.25),
    new THREE.Vector2(0.165, 0.65),
    new THREE.Vector2(0.180, 1.20),
    new THREE.Vector2(0.198, 1.90),
    new THREE.Vector2(0.216, 2.60),
    new THREE.Vector2(0.232, 3.25),
    new THREE.Vector2(0.242, 3.55),
    new THREE.Vector2(0.238, 3.66),
    new THREE.Vector2(0.205, 3.75),
    new THREE.Vector2(0.130, 3.81),
    new THREE.Vector2(0.000, 3.84),
  ];
  const handleGeom = new THREE.LatheGeometry(handleProfile, 32);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  tool_group.add(handle);

  function handleRadiusAt(y) {
    if (y < 0.25) return 0.145 + y * 0.036;
    if (y < 1.20) return 0.154 + (y - 0.25) * 0.028;
    if (y < 2.60) return 0.180 + (y - 1.20) * 0.027;
    if (y < 3.55) return 0.217 + (y - 2.60) * 0.026;
    return 0.241;
  }

  const wood_grain = new THREE.Group();
  wood_grain.name = "wood_grain";
  for (let i = 0; i < 14; i++) {
    const grain_points = [];
    const grain_start = 0.22 + (i % 4) * 0.11;
    const grain_end = 3.52 - ((i * 3) % 5) * 0.10;
    const base_angle = (i / 14) * Math.PI * 2;

    for (let j = 0; j <= 10; j++) {
      const t = j / 10;
      const y = grain_start + (grain_end - grain_start) * t;
      const angle =
        base_angle +
        Math.sin(t * Math.PI * 2 + i * 0.7) * 0.022 +
        Math.sin(t * Math.PI * 5 + i * 0.3) * 0.008;
      const radius = handleRadiusAt(y) + 0.003;
      grain_points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        )
      );
    }

    const wood_grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(grain_points),
      28,
      0.004,
      5,
      false
    );
    const wood_grain_line = new THREE.Mesh(
      wood_grain_lineGeom,
      wood_grainMat
    );
    wood_grain_line.name = "wood_grain_line_" + i;
    wood_grain.add(wood_grain_line);
  }
  tool_group.add(wood_grain);

  const brand_mark = new THREE.Group();
  brand_mark.name = "brand_mark";
  const brand_markGeom = new THREE.BoxGeometry(1, 1, 1);
  const brand_surface_radius = handleRadiusAt(1.58) + 0.007;

  function addBrandStroke(x, y, width, height, rotationZ) {
    const surface_z = Math.sqrt(
      Math.max(
        0,
        brand_surface_radius * brand_surface_radius - x * x
      )
    );
    const normal = new THREE.Vector3(
      x / brand_surface_radius,
      0,
      surface_z / brand_surface_radius
    ).normalize();

    const brand_stroke = new THREE.Mesh(
      brand_markGeom,
      brand_markMat
    );
    brand_stroke.name = "brand_mark_stroke";
    brand_stroke.scale.set(width, height, 0.006);
    brand_stroke.position.set(x, y, surface_z);
    brand_stroke.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    brand_stroke.rotateZ(rotationZ);
    brand_mark.add(brand_stroke);
  }

  addBrandStroke(-0.066, 1.58, 0.014, 0.34, 0);
  addBrandStroke(0.066, 1.58, 0.014, 0.34, 0);
  addBrandStroke(0.000, 1.745, 0.145, 0.014, 0);
  addBrandStroke(0.000, 1.415, 0.145, 0.014, 0);
  addBrandStroke(-0.012, 1.585, 0.014, 0.225, 0);
  addBrandStroke(0.018, 1.655, 0.080, 0.013, 0);
  addBrandStroke(0.018, 1.515, 0.080, 0.013, 0);
  tool_group.add(brand_mark);

  const headShape = new THREE.Shape();
  headShape.moveTo(-0.48, -0.30);
  headShape.bezierCurveTo(-0.53, -0.18, -0.52, 0.18, -0.45, 0.30);
  headShape.bezierCurveTo(-0.31, 0.39, 0.24, 0.39, 0.40, 0.32);
  headShape.bezierCurveTo(0.50, 0.24, 0.51, -0.17, 0.42, -0.29);
  headShape.bezierCurveTo(0.25, -0.39, -0.33, -0.40, -0.48, -0.30);

  const headGeom = new THREE.ExtrudeGeometry(headShape, {
    depth: 0.34,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 4,
  });
  headGeom.translate(0, 0, -0.17);

  const head = new THREE.Mesh(headGeom, headMat);
  head.name = "head";
  head.position.y = -0.16;
  tool_group.add(head);

  const striking_facesGeom = new THREE.CylinderGeometry(
    0.30,
    0.30,
    0.026,
    32
  );
  const striking_faces = new THREE.InstancedMesh(
    striking_facesGeom,
    striking_facesMat,
    2
  );
  striking_faces.name = "striking_faces";

  const face_transform = new THREE.Object3D();
  const face_positions = [-0.351, 0.351];
  for (let i = 0; i < face_positions.length; i++) {
    face_transform.position.set(0, -0.16, face_positions[i]);
    face_transform.rotation.set(Math.PI / 2, 0, 0);
    face_transform.scale.set(1.40, 1, 1.08);
    face_transform.updateMatrix();
    striking_faces.setMatrixAt(i, face_transform.matrix);
  }
  striking_faces.instanceMatrix.needsUpdate = true;
  tool_group.add(striking_faces);

  const head_socketGeom = new THREE.CylinderGeometry(
    0.145,
    0.174,
    0.34,
    24
  );
  const head_socket = new THREE.Mesh(head_socketGeom, headMat);
  head_socket.name = "head_socket";
  head_socket.position.y = 0.16;
  tool_group.add(head_socket);

  const socket_seamGeom = new THREE.TorusGeometry(
    0.148,
    0.010,
    8,
    28
  );
  const socket_seam = new THREE.Mesh(
    socket_seamGeom,
    head_socketMat
  );
  socket_seam.name = "socket_seam";
  socket_seam.rotation.x = Math.PI / 2;
  socket_seam.position.y = 0.326;
  tool_group.add(socket_seam);

  const head_wearGeom = new THREE.CircleGeometry(1, 12);
  const head_wear_data = [
    [-0.25, -0.22, 0.026, 0.010, 0.20],
    [0.16, -0.08, 0.018, 0.008, -0.40],
    [-0.08, 0.08, 0.013, 0.006, 0.10],
    [0.27, 0.12, 0.020, 0.007, 0.55],
    [-0.30, 0.02, 0.012, 0.005, -0.25],
  ];
  const head_wear = new THREE.InstancedMesh(
    head_wearGeom,
    head_wearMat,
    head_wear_data.length
  );
  head_wear.name = "head_wear";

  const wear_transform = new THREE.Object3D();
  for (let i = 0; i < head_wear_data.length; i++) {
    const data = head_wear_data[i];
    wear_transform.position.set(data[0], data[1], 0.353);
    wear_transform.rotation.set(0, 0, data[4]);
    wear_transform.scale.set(data[2], data[3], 1);
    wear_transform.updateMatrix();
    head_wear.setMatrixAt(i, wear_transform.matrix);
  }
  head_wear.instanceMatrix.needsUpdate = true;
  tool_group.add(head_wear);

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
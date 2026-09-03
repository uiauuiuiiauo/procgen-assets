export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "orange_fabric_bag";

  const bag_shell = new THREE.Group();
  bag_shell.name = "bag_shell";
  root.add(bag_shell);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const bottom_assembly = new THREE.Group();
  bottom_assembly.name = "bottom_assembly";
  root.add(bottom_assembly);

  const surface_details = new THREE.Group();
  surface_details.name = "surface_details";
  root.add(surface_details);

  const textureSize = 48;
  const textureData = new Uint8Array(textureSize * textureSize * 4);
  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const index = (y * textureSize + x) * 4;
      const warp = x % 4 === 0 ? 24 : x % 4 === 2 ? 8 : 0;
      const weft = y % 4 === 1 ? 20 : y % 4 === 3 ? 6 : 0;
      const crossing = (x + y) % 8 === 0 ? 8 : 0;
      const value = 118 + warp + weft + crossing;
      textureData[index] = value;
      textureData[index + 1] = value;
      textureData[index + 2] = value;
      textureData[index + 3] = 255;
    }
  }

  const fabric_texture = new THREE.DataTexture(
    textureData,
    textureSize,
    textureSize,
    THREE.RGBAFormat
  );
  fabric_texture.wrapS = THREE.RepeatWrapping;
  fabric_texture.wrapT = THREE.RepeatWrapping;
  fabric_texture.repeat.set(10, 18);
  fabric_texture.magFilter = THREE.LinearFilter;
  fabric_texture.minFilter = THREE.LinearFilter;
  fabric_texture.needsUpdate = true;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff6818,
    metalness: 0.0,
    roughness: 0.95,
    bumpMap: fabric_texture,
    bumpScale: 0.007,
    side: THREE.DoubleSide,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xd94708,
    metalness: 0.0,
    roughness: 0.95,
  });

  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0xff9149,
    metalness: 0.0,
    roughness: 0.95,
  });

  const creaseMat = new THREE.MeshStandardMaterial({
    color: 0xe3520b,
    metalness: 0.0,
    roughness: 0.95,
  });

  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x9b2907,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.46, -0.94);
  bodyShape.bezierCurveTo(-0.51, -0.92, -0.52, -0.86, -0.50, -0.77);
  bodyShape.bezierCurveTo(-0.48, -0.63, -0.50, -0.45, -0.49, -0.28);
  bodyShape.bezierCurveTo(-0.48, -0.05, -0.50, 0.22, -0.49, 0.45);
  bodyShape.bezierCurveTo(-0.48, 0.66, -0.49, 0.81, -0.50, 0.90);
  bodyShape.bezierCurveTo(-0.34, 0.94, -0.16, 0.90, 0.00, 0.92);
  bodyShape.bezierCurveTo(0.18, 0.90, 0.37, 0.94, 0.50, 0.90);
  bodyShape.bezierCurveTo(0.49, 0.70, 0.50, 0.47, 0.49, 0.24);
  bodyShape.bezierCurveTo(0.48, 0.02, 0.51, -0.22, 0.49, -0.44);
  bodyShape.bezierCurveTo(0.48, -0.63, 0.51, -0.80, 0.50, -0.88);
  bodyShape.bezierCurveTo(0.49, -0.94, 0.45, -0.97, 0.39, -0.98);
  bodyShape.bezierCurveTo(0.18, -1.01, -0.18, -1.01, -0.39, -0.98);
  bodyShape.bezierCurveTo(-0.44, -0.97, -0.47, -0.96, -0.46, -0.94);

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.22,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.028,
    bevelSegments: 5,
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.position.z = -0.11;
  bag_shell.add(body);

  const front_panelGeom = new THREE.PlaneGeometry(0.92, 1.72, 24, 40);
  const frontPosition = front_panelGeom.attributes.position;
  for (let i = 0; i < frontPosition.count; i++) {
    const x = frontPosition.getX(i);
    const y = frontPosition.getY(i);
    const nx = x / 0.46;
    const ny = y / 0.86;
    const edgeX = Math.pow(Math.abs(nx), 3.2);
    const edgeY = Math.pow(Math.abs(ny), 3.5);
    const edgeFade = (1 - edgeX) * (1 - edgeY);
    const broadBulge = 0.048 * edgeFade;
    const softRipple =
      0.0045 *
      Math.sin(x * 15 + y * 4.5) *
      Math.sin(y * 8 - x * 3.5) *
      edgeFade;
    frontPosition.setZ(i, broadBulge + softRipple);
  }
  frontPosition.needsUpdate = true;
  front_panelGeom.computeVertexNormals();

  const front_panel = new THREE.Mesh(front_panelGeom, bodyMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, -0.01, 0.149);
  bag_shell.add(front_panel);

  const back_panel = new THREE.Mesh(front_panelGeom, bodyMat);
  back_panel.name = "back_panel";
  back_panel.position.set(0, -0.01, -0.149);
  back_panel.rotation.y = Math.PI;
  bag_shell.add(back_panel);

  const top_bandShape = new THREE.Shape();
  top_bandShape.moveTo(-0.50, 0.875);
  top_bandShape.bezierCurveTo(-0.34, 0.92, -0.16, 0.88, 0.00, 0.905);
  top_bandShape.bezierCurveTo(0.18, 0.88, 0.36, 0.925, 0.50, 0.88);
  top_bandShape.lineTo(0.48, 0.985);
  top_bandShape.bezierCurveTo(0.34, 1.015, 0.18, 0.985, 0.02, 1.005);
  top_bandShape.bezierCurveTo(-0.16, 0.98, -0.34, 1.015, -0.49, 0.99);
  top_bandShape.bezierCurveTo(-0.51, 0.965, -0.51, 0.915, -0.50, 0.875);

  const top_bandGeom = new THREE.ExtrudeGeometry(top_bandShape, {
    depth: 0.24,
    steps: 1,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const top_band = new THREE.Mesh(top_bandGeom, bodyMat);
  top_band.name = "top_band";
  top_band.position.z = -0.12;
  top_assembly.add(top_band);

  const top_openingGeom = new THREE.PlaneGeometry(0.78, 0.028);
  const top_opening = new THREE.Mesh(top_openingGeom, openingMat);
  top_opening.name = "top_opening";
  top_opening.position.set(0, 1.006, 0);
  top_opening.rotation.x = -Math.PI / 2;
  top_assembly.add(top_opening);

  const top_back_rimPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.49, 0.995, -0.132),
    new THREE.Vector3(-0.31, 1.008, -0.134),
    new THREE.Vector3(-0.12, 0.990, -0.133),
    new THREE.Vector3(0.08, 1.008, -0.134),
    new THREE.Vector3(0.30, 0.995, -0.133),
    new THREE.Vector3(0.49, 1.010, -0.131),
  ]);
  const top_back_rimGeom = new THREE.TubeGeometry(
    top_back_rimPath,
    36,
    0.009,
    8,
    false
  );
  const top_back_rim = new THREE.Mesh(top_back_rimGeom, bodyMat);
  top_back_rim.name = "top_back_rim";
  top_assembly.add(top_back_rim);

  const top_front_rimPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.50, 0.985, 0.134),
    new THREE.Vector3(-0.36, 1.003, 0.136),
    new THREE.Vector3(-0.20, 0.982, 0.137),
    new THREE.Vector3(-0.04, 0.997, 0.138),
    new THREE.Vector3(0.13, 0.980, 0.137),
    new THREE.Vector3(0.31, 1.004, 0.136),
    new THREE.Vector3(0.50, 0.990, 0.133),
  ]);
  const top_front_rimGeom = new THREE.TubeGeometry(
    top_front_rimPath,
    40,
    0.012,
    8,
    false
  );
  const top_front_rim = new THREE.Mesh(top_front_rimGeom, bodyMat);
  top_front_rim.name = "top_front_rim";
  top_assembly.add(top_front_rim);

  const top_gathersGeom = new THREE.CylinderGeometry(0.005, 0.008, 0.082, 8);
  const topGatherX = [-0.40, -0.29, -0.17, -0.05, 0.09, 0.22, 0.35, 0.45];
  const top_gathers = new THREE.InstancedMesh(
    top_gathersGeom,
    bodyMat,
    topGatherX.length
  );
  top_gathers.name = "top_gathers";
  const gatherDummy = new THREE.Object3D();
  for (let i = 0; i < topGatherX.length; i++) {
    const x = topGatherX[i];
    gatherDummy.position.set(x, 0.944, 0.153);
    gatherDummy.rotation.set(
      0.10 * Math.sin(i * 1.4),
      0,
      0.16 * Math.sin(i * 1.7)
    );
    gatherDummy.scale.set(1, 0.78 + 0.12 * Math.cos(i * 1.3), 1);
    gatherDummy.updateMatrix();
    top_gathers.setMatrixAt(i, gatherDummy.matrix);
  }
  top_gathers.instanceMatrix.needsUpdate = true;
  top_assembly.add(top_gathers);

  const top_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.46, 0.895, 0.157),
    new THREE.Vector3(-0.25, 0.908, 0.158),
    new THREE.Vector3(0.00, 0.898, 0.158),
    new THREE.Vector3(0.24, 0.910, 0.158),
    new THREE.Vector3(0.46, 0.897, 0.157),
  ]);
  const top_seamGeom = new THREE.TubeGeometry(
    top_seamPath,
    36,
    0.0045,
    7,
    false
  );
  const top_seam = new THREE.Mesh(top_seamGeom, seamMat);
  top_seam.name = "top_seam";
  top_assembly.add(top_seam);

  const top_stitchesGeom = new THREE.BoxGeometry(0.021, 0.0035, 0.004);
  const top_stitches = new THREE.InstancedMesh(top_stitchesGeom, stitchMat, 24);
  top_stitches.name = "top_stitches";
  const stitchDummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const t = i / 23;
    stitchDummy.position.set(
      -0.44 + t * 0.88,
      0.899 + Math.sin(t * Math.PI * 4) * 0.006,
      0.163
    );
    stitchDummy.rotation.set(0, 0, Math.sin(t * Math.PI * 4) * 0.08);
    stitchDummy.scale.set(1, 1, 1);
    stitchDummy.updateMatrix();
    top_stitches.setMatrixAt(i, stitchDummy.matrix);
  }
  top_stitches.instanceMatrix.needsUpdate = true;
  top_assembly.add(top_stitches);

  const bottom_bandShape = new THREE.Shape();
  bottom_bandShape.moveTo(-0.45, -0.90);
  bottom_bandShape.bezierCurveTo(-0.22, -0.92, 0.22, -0.92, 0.45, -0.90);
  bottom_bandShape.bezierCurveTo(0.48, -0.94, 0.46, -0.98, 0.39, -1.00);
  bottom_bandShape.bezierCurveTo(0.18, -1.045, -0.18, -1.045, -0.39, -1.00);
  bottom_bandShape.bezierCurveTo(-0.46, -0.98, -0.48, -0.94, -0.45, -0.90);

  const bottom_bandGeom = new THREE.ExtrudeGeometry(bottom_bandShape, {
    depth: 0.25,
    steps: 1,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const bottom_band = new THREE.Mesh(bottom_bandGeom, bodyMat);
  bottom_band.name = "bottom_band";
  bottom_band.position.z = -0.125;
  bottom_assembly.add(bottom_band);

  const bottom_front_rimPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.45, -0.905, 0.151),
    new THREE.Vector3(-0.30, -0.935, 0.153),
    new THREE.Vector3(-0.12, -0.918, 0.154),
    new THREE.Vector3(0.06, -0.938, 0.154),
    new THREE.Vector3(0.25, -0.920, 0.153),
    new THREE.Vector3(0.45, -0.905, 0.151),
  ]);
  const bottom_front_rimGeom = new THREE.TubeGeometry(
    bottom_front_rimPath,
    40,
    0.010,
    8,
    false
  );
  const bottom_front_rim = new THREE.Mesh(bottom_front_rimGeom, bodyMat);
  bottom_front_rim.name = "bottom_front_rim";
  bottom_assembly.add(bottom_front_rim);

  const bottom_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.42, -0.925, 0.158),
    new THREE.Vector3(-0.23, -0.946, 0.159),
    new THREE.Vector3(0.00, -0.932, 0.159),
    new THREE.Vector3(0.22, -0.948, 0.159),
    new THREE.Vector3(0.42, -0.926, 0.158),
  ]);
  const bottom_seamGeom = new THREE.TubeGeometry(
    bottom_seamPath,
    36,
    0.0045,
    7,
    false
  );
  const bottom_seam = new THREE.Mesh(bottom_seamGeom, seamMat);
  bottom_seam.name = "bottom_seam";
  bottom_assembly.add(bottom_seam);

  const bottom_stitchesGeom = new THREE.BoxGeometry(0.020, 0.0035, 0.004);
  const bottom_stitches = new THREE.InstancedMesh(
    bottom_stitchesGeom,
    stitchMat,
    22
  );
  bottom_stitches.name = "bottom_stitches";
  for (let i = 0; i < 22; i++) {
    const t = i / 21;
    stitchDummy.position.set(
      -0.40 + t * 0.80,
      -0.936 - Math.sin(t * Math.PI * 4) * 0.008,
      0.164
    );
    stitchDummy.rotation.set(0, 0, -Math.sin(t * Math.PI * 4) * 0.08);
    stitchDummy.scale.set(1, 1, 1);
    stitchDummy.updateMatrix();
    bottom_stitches.setMatrixAt(i, stitchDummy.matrix);
  }
  bottom_stitches.instanceMatrix.needsUpdate = true;
  bottom_assembly.add(bottom_stitches);

  const left_side_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.492, 0.84, 0.143),
    new THREE.Vector3(-0.486, 0.47, 0.145),
    new THREE.Vector3(-0.493, 0.05, 0.145),
    new THREE.Vector3(-0.486, -0.42, 0.144),
    new THREE.Vector3(-0.475, -0.84, 0.142),
  ]);
  const left_side_seamGeom = new THREE.TubeGeometry(
    left_side_seamPath,
    36,
    0.004,
    7,
    false
  );
  const left_side_seam = new THREE.Mesh(left_side_seamGeom, seamMat);
  left_side_seam.name = "left_side_seam";
  surface_details.add(left_side_seam);

  const right_side_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.492, 0.84, 0.143),
    new THREE.Vector3(0.486, 0.47, 0.145),
    new THREE.Vector3(0.493, 0.05, 0.145),
    new THREE.Vector3(0.486, -0.42, 0.144),
    new THREE.Vector3(0.475, -0.84, 0.142),
  ]);
  const right_side_seamGeom = new THREE.TubeGeometry(
    right_side_seamPath,
    36,
    0.004,
    7,
    false
  );
  const right_side_seam = new THREE.Mesh(right_side_seamGeom, seamMat);
  right_side_seam.name = "right_side_seam";
  surface_details.add(right_side_seam);

  function makeCreaseGeometry(points, radius) {
    const path = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(path, 24, radius, 6, false);
  }

  const upper_left_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(-0.43, 0.79, 0.154),
    new THREE.Vector3(-0.37, 0.71, 0.162),
    new THREE.Vector3(-0.30, 0.65, 0.166),
    new THREE.Vector3(-0.23, 0.63, 0.165),
  ], 0.0038);
  const upper_left_crease = new THREE.Mesh(upper_left_creaseGeom, creaseMat);
  upper_left_crease.name = "upper_left_crease";
  surface_details.add(upper_left_crease);

  const upper_right_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(0.43, 0.80, 0.154),
    new THREE.Vector3(0.37, 0.72, 0.162),
    new THREE.Vector3(0.30, 0.66, 0.166),
    new THREE.Vector3(0.22, 0.64, 0.165),
  ], 0.0038);
  const upper_right_crease = new THREE.Mesh(upper_right_creaseGeom, creaseMat);
  upper_right_crease.name = "upper_right_crease";
  surface_details.add(upper_right_crease);

  const center_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(0.04, 0.88, 0.158),
    new THREE.Vector3(0.02, 0.79, 0.169),
    new THREE.Vector3(0.07, 0.69, 0.174),
    new THREE.Vector3(0.04, 0.59, 0.173),
  ], 0.0032);
  const center_crease = new THREE.Mesh(center_creaseGeom, creaseMat);
  center_crease.name = "center_crease";
  surface_details.add(center_crease);

  const middle_left_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(-0.46, 0.06, 0.153),
    new THREE.Vector3(-0.38, 0.01, 0.163),
    new THREE.Vector3(-0.29, -0.02, 0.169),
    new THREE.Vector3(-0.20, -0.09, 0.168),
  ], 0.0042);
  const middle_left_crease = new THREE.Mesh(middle_left_creaseGeom, creaseMat);
  middle_left_crease.name = "middle_left_crease";
  surface_details.add(middle_left_crease);

  const middle_right_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(0.46, -0.02, 0.153),
    new THREE.Vector3(0.38, -0.08, 0.163),
    new THREE.Vector3(0.30, -0.17, 0.169),
    new THREE.Vector3(0.18, -0.20, 0.168),
  ], 0.0042);
  const middle_right_crease = new THREE.Mesh(middle_right_creaseGeom, creaseMat);
  middle_right_crease.name = "middle_right_crease";
  surface_details.add(middle_right_crease);

  const lower_right_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(0.46, -0.39, 0.153),
    new THREE.Vector3(0.37, -0.44, 0.163),
    new THREE.Vector3(0.28, -0.51, 0.169),
    new THREE.Vector3(0.17, -0.53, 0.168),
  ], 0.0040);
  const lower_right_crease = new THREE.Mesh(lower_right_creaseGeom, creaseMat);
  lower_right_crease.name = "lower_right_crease";
  surface_details.add(lower_right_crease);

  const lower_left_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(-0.45, -0.58, 0.153),
    new THREE.Vector3(-0.38, -0.63, 0.162),
    new THREE.Vector3(-0.30, -0.70, 0.166),
    new THREE.Vector3(-0.21, -0.73, 0.164),
  ], 0.0036);
  const lower_left_crease = new THREE.Mesh(lower_left_creaseGeom, creaseMat);
  lower_left_crease.name = "lower_left_crease";
  surface_details.add(lower_left_crease);

  const bottom_left_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(-0.43, -0.84, 0.154),
    new THREE.Vector3(-0.36, -0.88, 0.162),
    new THREE.Vector3(-0.28, -0.94, 0.165),
    new THREE.Vector3(-0.19, -0.96, 0.163),
  ], 0.0038);
  const bottom_left_crease = new THREE.Mesh(bottom_left_creaseGeom, creaseMat);
  bottom_left_crease.name = "bottom_left_crease";
  surface_details.add(bottom_left_crease);

  const bottom_right_creaseGeom = makeCreaseGeometry([
    new THREE.Vector3(0.43, -0.84, 0.154),
    new THREE.Vector3(0.36, -0.88, 0.162),
    new THREE.Vector3(0.28, -0.94, 0.165),
    new THREE.Vector3(0.19, -0.96, 0.163),
  ], 0.0038);
  const bottom_right_crease = new THREE.Mesh(bottom_right_creaseGeom, creaseMat);
  bottom_right_crease.name = "bottom_right_crease";
  surface_details.add(bottom_right_crease);

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
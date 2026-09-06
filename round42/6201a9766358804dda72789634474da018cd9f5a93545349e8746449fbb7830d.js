export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "weathered_cracked_mirror";

  const frame_assembly = new THREE.Group();
  frame_assembly.name = "frame_assembly";
  root.add(frame_assembly);

  const glass_assembly = new THREE.Group();
  glass_assembly.name = "glass_assembly";
  root.add(glass_assembly);

  const rear_support = new THREE.Group();
  rear_support.name = "rear_support";
  root.add(rear_support);

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x6f4a35,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const pitMat = new THREE.MeshStandardMaterial({
    color: 0x302d2a,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const backingMat = new THREE.MeshStandardMaterial({
    color: 0x171a1b,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x8fb9b6,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true
  });
  const crackMat = new THREE.MeshStandardMaterial({
    color: 0xa8fff8,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x72e6dd,
    emissiveIntensity: 1.0
  });
  const faintCrackMat = new THREE.MeshStandardMaterial({
    color: 0x78b9b7,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0x245f5d,
    emissiveIntensity: 1.0
  });
  const reflectionMat = new THREE.MeshBasicMaterial({
    color: 0x75e9df,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const outerW = 1.12;
  const outerH = 1.52;
  const innerW = 0.80;
  const innerH = 1.18;
  const outerX = outerW / 2;
  const outerY = outerH / 2;
  const innerX = innerW / 2;
  const innerY = innerH / 2;

  function createRailGeom(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.09,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 3
    });
  }

  const top_frame_railGeom = createRailGeom([
    [-innerX, innerY],
    [innerX, innerY],
    [outerX, outerY],
    [-outerX, outerY]
  ]);
  const top_frame_rail = new THREE.Mesh(top_frame_railGeom, frameMat);
  top_frame_rail.name = "top_frame_rail";
  top_frame_rail.position.z = -0.045;
  frame_assembly.add(top_frame_rail);

  const bottom_frame_railGeom = createRailGeom([
    [-outerX, -outerY],
    [outerX, -outerY],
    [innerX, -innerY],
    [-innerX, -innerY]
  ]);
  const bottom_frame_rail = new THREE.Mesh(bottom_frame_railGeom, frameMat);
  bottom_frame_rail.name = "bottom_frame_rail";
  bottom_frame_rail.position.z = -0.045;
  frame_assembly.add(bottom_frame_rail);

  const left_frame_railGeom = createRailGeom([
    [-outerX, -outerY],
    [-innerX, -innerY],
    [-innerX, innerY],
    [-outerX, outerY]
  ]);
  const left_frame_rail = new THREE.Mesh(left_frame_railGeom, frameMat);
  left_frame_rail.name = "left_frame_rail";
  left_frame_rail.position.z = -0.045;
  frame_assembly.add(left_frame_rail);

  const right_frame_railGeom = createRailGeom([
    [innerX, -innerY],
    [outerX, -outerY],
    [outerX, outerY],
    [innerX, innerY]
  ]);
  const right_frame_rail = new THREE.Mesh(right_frame_railGeom, frameMat);
  right_frame_rail.name = "right_frame_rail";
  right_frame_rail.position.z = -0.045;
  frame_assembly.add(right_frame_rail);

  const outer_horizontal_lipGeom = new THREE.CylinderGeometry(0.017, 0.017, outerW - 0.04, 14);
  const outer_top_lip = new THREE.Mesh(outer_horizontal_lipGeom, polishedMat);
  outer_top_lip.name = "outer_top_lip";
  outer_top_lip.rotation.z = Math.PI / 2;
  outer_top_lip.position.set(0, outerY - 0.018, 0.069);
  frame_assembly.add(outer_top_lip);

  const outer_bottom_lip = new THREE.Mesh(outer_horizontal_lipGeom, polishedMat);
  outer_bottom_lip.name = "outer_bottom_lip";
  outer_bottom_lip.rotation.z = Math.PI / 2;
  outer_bottom_lip.position.set(0, -outerY + 0.018, 0.069);
  frame_assembly.add(outer_bottom_lip);

  const outer_vertical_lipGeom = new THREE.CylinderGeometry(0.017, 0.017, outerH - 0.04, 14);
  const outer_left_lip = new THREE.Mesh(outer_vertical_lipGeom, polishedMat);
  outer_left_lip.name = "outer_left_lip";
  outer_left_lip.position.set(-outerX + 0.018, 0, 0.069);
  frame_assembly.add(outer_left_lip);

  const outer_right_lip = new THREE.Mesh(outer_vertical_lipGeom, polishedMat);
  outer_right_lip.name = "outer_right_lip";
  outer_right_lip.position.set(outerX - 0.018, 0, 0.069);
  frame_assembly.add(outer_right_lip);

  const middle_horizontal_ridgeGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.98, 12);
  const middle_top_ridge = new THREE.Mesh(middle_horizontal_ridgeGeom, brushedMat);
  middle_top_ridge.name = "middle_top_ridge";
  middle_top_ridge.rotation.z = Math.PI / 2;
  middle_top_ridge.position.set(0, 0.69, 0.078);
  frame_assembly.add(middle_top_ridge);

  const middle_bottom_ridge = new THREE.Mesh(middle_horizontal_ridgeGeom, brushedMat);
  middle_bottom_ridge.name = "middle_bottom_ridge";
  middle_bottom_ridge.rotation.z = Math.PI / 2;
  middle_bottom_ridge.position.set(0, -0.69, 0.078);
  frame_assembly.add(middle_bottom_ridge);

  const middle_vertical_ridgeGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.34, 12);
  const middle_left_ridge = new THREE.Mesh(middle_vertical_ridgeGeom, brushedMat);
  middle_left_ridge.name = "middle_left_ridge";
  middle_left_ridge.position.set(-0.50, 0, 0.078);
  frame_assembly.add(middle_left_ridge);

  const middle_right_ridge = new THREE.Mesh(middle_vertical_ridgeGeom, brushedMat);
  middle_right_ridge.name = "middle_right_ridge";
  middle_right_ridge.position.set(0.50, 0, 0.078);
  frame_assembly.add(middle_right_ridge);

  const inner_horizontal_bevelGeom = new THREE.CylinderGeometry(0.015, 0.015, innerW + 0.05, 12);
  const inner_top_bevel = new THREE.Mesh(inner_horizontal_bevelGeom, polishedMat);
  inner_top_bevel.name = "inner_top_bevel";
  inner_top_bevel.rotation.z = Math.PI / 2;
  inner_top_bevel.position.set(0, innerY + 0.018, 0.076);
  frame_assembly.add(inner_top_bevel);

  const inner_bottom_bevel = new THREE.Mesh(inner_horizontal_bevelGeom, polishedMat);
  inner_bottom_bevel.name = "inner_bottom_bevel";
  inner_bottom_bevel.rotation.z = Math.PI / 2;
  inner_bottom_bevel.position.set(0, -innerY - 0.018, 0.076);
  frame_assembly.add(inner_bottom_bevel);

  const inner_vertical_bevelGeom = new THREE.CylinderGeometry(0.015, 0.015, innerH + 0.05, 12);
  const inner_left_bevel = new THREE.Mesh(inner_vertical_bevelGeom, polishedMat);
  inner_left_bevel.name = "inner_left_bevel";
  inner_left_bevel.position.set(-innerX - 0.018, 0, 0.076);
  frame_assembly.add(inner_left_bevel);

  const inner_right_bevel = new THREE.Mesh(inner_vertical_bevelGeom, polishedMat);
  inner_right_bevel.name = "inner_right_bevel";
  inner_right_bevel.position.set(innerX + 0.018, 0, 0.076);
  frame_assembly.add(inner_right_bevel);

  const horizontal_grooveGeom = new THREE.BoxGeometry(0.94, 0.010, 0.008);
  const top_recess_groove = new THREE.Mesh(horizontal_grooveGeom, pitMat);
  top_recess_groove.name = "top_recess_groove";
  top_recess_groove.position.set(0, 0.625, 0.079);
  frame_assembly.add(top_recess_groove);

  const bottom_recess_groove = new THREE.Mesh(horizontal_grooveGeom, pitMat);
  bottom_recess_groove.name = "bottom_recess_groove";
  bottom_recess_groove.position.set(0, -0.625, 0.079);
  frame_assembly.add(bottom_recess_groove);

  const vertical_grooveGeom = new THREE.BoxGeometry(0.010, 1.22, 0.008);
  const left_recess_groove = new THREE.Mesh(vertical_grooveGeom, pitMat);
  left_recess_groove.name = "left_recess_groove";
  left_recess_groove.position.set(-0.445, 0, 0.079);
  frame_assembly.add(left_recess_groove);

  const right_recess_groove = new THREE.Mesh(vertical_grooveGeom, pitMat);
  right_recess_groove.name = "right_recess_groove";
  right_recess_groove.position.set(0.445, 0, 0.079);
  frame_assembly.add(right_recess_groove);

  const miterPoints = [
    [[-outerX, outerY], [-innerX, innerY], [-0.475, 0.648]],
    [[outerX, outerY], [innerX, innerY], [0.475, 0.648]],
    [[-outerX, -outerY], [-innerX, -innerY], [-0.475, -0.648]],
    [[outerX, -outerY], [innerX, -innerY], [0.475, -0.648]]
  ];
  const miter_seamsGeom = new THREE.BoxGeometry(0.006, 1, 0.005);
  const miter_seams = new THREE.InstancedMesh(miter_seamsGeom, pitMat, 4);
  miter_seams.name = "miter_seams";
  const miterDummy = new THREE.Object3D();
  for (let i = 0; i < miterPoints.length; i++) {
    const a = miterPoints[i][0];
    const b = miterPoints[i][1];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const length = Math.sqrt(dx * dx + dy * dy);
    miterDummy.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0.080);
    miterDummy.rotation.set(0, 0, Math.atan2(-dx, dy));
    miterDummy.scale.set(1, length, 1);
    miterDummy.updateMatrix();
    miter_seams.setMatrixAt(i, miterDummy.matrix);
  }
  miter_seams.instanceMatrix.needsUpdate = true;
  frame_assembly.add(miter_seams);

  const rustData = [
    [-0.38, 0.700, 0.035, 0.010, 0.20],
    [-0.12, 0.720, 0.018, 0.008, -0.40],
    [0.22, 0.690, 0.040, 0.010, 0.15],
    [0.43, 0.640, 0.024, 0.012, 0.70],
    [-0.28, -0.700, 0.032, 0.010, -0.20],
    [0.05, -0.710, 0.045, 0.011, 0.10],
    [0.36, -0.680, 0.026, 0.009, 0.50],
    [-0.500, 0.420, 0.010, 0.036, 0.10],
    [-0.520, 0.050, 0.012, 0.025, -0.30],
    [-0.490, -0.360, 0.010, 0.040, 0.20],
    [0.510, 0.480, 0.011, 0.030, -0.20],
    [0.520, 0.120, 0.012, 0.038, 0.25],
    [0.490, -0.420, 0.010, 0.030, -0.10],
    [-0.390, 0.570, 0.022, 0.009, 0.40],
    [0.300, 0.560, 0.028, 0.008, -0.30],
    [-0.330, -0.570, 0.025, 0.009, 0.20],
    [0.390, -0.560, 0.020, 0.008, -0.50],
    [-0.540, 0.610, 0.012, 0.020, 0.30]
  ];
  const rust_spotsGeom = new THREE.CircleGeometry(1, 14);
  const rust_spots = new THREE.InstancedMesh(rust_spotsGeom, rustMat, rustData.length);
  rust_spots.name = "rust_spots";
  const rustDummy = new THREE.Object3D();
  for (let i = 0; i < rustData.length; i++) {
    const d = rustData[i];
    rustDummy.position.set(d[0], d[1], 0.084);
    rustDummy.rotation.set(0, 0, d[4]);
    rustDummy.scale.set(d[2], d[3], 1);
    rustDummy.updateMatrix();
    rust_spots.setMatrixAt(i, rustDummy.matrix);
  }
  rust_spots.instanceMatrix.needsUpdate = true;
  frame_assembly.add(rust_spots);

  const pitData = [
    [-0.47, 0.735, 0.006], [-0.25, 0.665, 0.004],
    [0.02, 0.735, 0.005], [0.37, 0.720, 0.004],
    [-0.48, -0.735, 0.005], [-0.16, -0.665, 0.004],
    [0.18, -0.730, 0.006], [0.48, -0.700, 0.004],
    [-0.535, 0.300, 0.005], [-0.470, 0.180, 0.004],
    [-0.530, -0.180, 0.006], [-0.470, -0.500, 0.004],
    [0.535, 0.360, 0.005], [0.470, 0.240, 0.004],
    [0.530, -0.080, 0.006], [0.470, -0.280, 0.004],
    [-0.06, 0.585, 0.004], [0.20, 0.610, 0.005],
    [-0.22, -0.610, 0.004], [0.12, -0.585, 0.005]
  ];
  const pitting_spotsGeom = new THREE.CircleGeometry(1, 10);
  const pitting_spots = new THREE.InstancedMesh(pitting_spotsGeom, pitMat, pitData.length);
  pitting_spots.name = "pitting_spots";
  const pitDummy = new THREE.Object3D();
  for (let i = 0; i < pitData.length; i++) {
    const d = pitData[i];
    pitDummy.position.set(d[0], d[1], 0.085);
    pitDummy.rotation.set(0, 0, i * 0.37);
    pitDummy.scale.set(d[2] * 1.3, d[2], 1);
    pitDummy.updateMatrix();
    pitting_spots.setMatrixAt(i, pitDummy.matrix);
  }
  pitting_spots.instanceMatrix.needsUpdate = true;
  frame_assembly.add(pitting_spots);

  const rear_backingGeom = new THREE.BoxGeometry(0.78, 1.16, 0.035);
  const rear_backing = new THREE.Mesh(rear_backingGeom, backingMat);
  rear_backing.name = "rear_backing";
  rear_backing.position.z = -0.065;
  rear_support.add(rear_backing);

  const glass_panelGeom = new THREE.BoxGeometry(0.77, 1.14, 0.018);
  const glass_panel = new THREE.Mesh(glass_panelGeom, glassMat);
  glass_panel.name = "glass_panel";
  glass_panel.position.z = 0.020;
  glass_assembly.add(glass_panel);

  const reflectionShape = new THREE.Shape();
  reflectionShape.moveTo(-0.16, -0.28);
  reflectionShape.bezierCurveTo(-0.08, -0.10, -0.05, 0.12, 0.02, 0.31);
  reflectionShape.bezierCurveTo(0.09, 0.16, 0.18, -0.02, 0.15, -0.22);
  reflectionShape.bezierCurveTo(0.08, -0.31, -0.04, -0.34, -0.16, -0.28);
  reflectionShape.closePath();
  const glass_reflectionGeom = new THREE.ShapeGeometry(reflectionShape, 20);
  const glass_reflection = new THREE.Mesh(glass_reflectionGeom, reflectionMat);
  glass_reflection.name = "glass_reflection";
  glass_reflection.position.z = 0.031;
  glass_assembly.add(glass_reflection);

  const crackZ = 0.034;
  function addCrack(name, coordinates, radius, material) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      points.push(new THREE.Vector3(coordinates[i][0], coordinates[i][1], crackZ));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(
      curve,
      Math.max(8, (points.length - 1) * 5),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geom, material);
    mesh.name = name;
    glass_assembly.add(mesh);
    return mesh;
  }

  const upper_main_crack = addCrack("upper_main_crack", [
    [-0.375, 0.545], [-0.330, 0.465], [-0.285, 0.385],
    [-0.215, 0.305], [-0.130, 0.245], [-0.045, 0.205],
    [0.035, 0.135], [0.130, 0.165], [0.225, 0.125],
    [0.310, 0.185], [0.375, 0.305]
  ], 0.0048, crackMat);

  const upper_left_branch = addCrack("upper_left_branch", [
    [-0.285, 0.385], [-0.325, 0.315], [-0.355, 0.235],
    [-0.390, 0.155], [-0.370, 0.075]
  ], 0.0032, crackMat);

  const upper_center_branch = addCrack("upper_center_branch", [
    [-0.045, 0.205], [-0.010, 0.285], [0.025, 0.365],
    [0.005, 0.445], [-0.045, 0.520]
  ], 0.0030, crackMat);

  const upper_right_branch = addCrack("upper_right_branch", [
    [0.310, 0.185], [0.285, 0.280], [0.325, 0.375],
    [0.300, 0.470], [0.355, 0.555]
  ], 0.0035, crackMat);

  const left_fine_crack = addCrack("left_fine_crack", [
    [-0.365, 0.070], [-0.320, 0.010], [-0.345, -0.070],
    [-0.300, -0.145], [-0.325, -0.230]
  ], 0.0022, faintCrackMat);

  const center_fine_crack = addCrack("center_fine_crack", [
    [0.035, 0.135], [0.075, 0.045], [0.055, -0.055],
    [0.105, -0.145], [0.085, -0.245]
  ], 0.0023, faintCrackMat);

  const right_fine_crack = addCrack("right_fine_crack", [
    [0.370, 0.305], [0.335, 0.225], [0.355, 0.135],
    [0.320, 0.045], [0.350, -0.045]
  ], 0.0022, faintCrackMat);

  const lower_main_crack = addCrack("lower_main_crack", [
    [-0.380, -0.300], [-0.305, -0.335], [-0.235, -0.405],
    [-0.145, -0.430], [-0.065, -0.505], [0.015, -0.565],
    [0.105, -0.525], [0.190, -0.445], [0.275, -0.365],
    [0.375, -0.335]
  ], 0.0048, crackMat);

  const lower_left_branch = addCrack("lower_left_branch", [
    [-0.235, -0.405], [-0.255, -0.485], [-0.230, -0.555],
    [-0.255, -0.615], [-0.305, -0.675]
  ], 0.0032, crackMat);

  const lower_center_branch = addCrack("lower_center_branch", [
    [-0.065, -0.505], [-0.035, -0.420], [0.025, -0.355],
    [0.005, -0.275], [0.060, -0.205]
  ], 0.0030, crackMat);

  const lower_right_branch = addCrack("lower_right_branch", [
    [0.190, -0.445], [0.220, -0.525], [0.285, -0.575],
    [0.340, -0.630], [0.375, -0.675]
  ], 0.0034, crackMat);

  const bottom_fine_crack = addCrack("bottom_fine_crack", [
    [0.015, -0.565], [-0.030, -0.625], [-0.015, -0.680],
    [0.045, -0.715]
  ], 0.0023, faintCrackMat);

  const right_edge_crack = addCrack("right_edge_crack", [
    [0.375, -0.335], [0.340, -0.245], [0.365, -0.155],
    [0.335, -0.075], [0.355, 0.020]
  ], 0.0024, faintCrackMat);

  const kickstandShape = new THREE.Shape();
  kickstandShape.moveTo(-0.055, 0);
  kickstandShape.lineTo(0.055, 0);
  kickstandShape.lineTo(0.040, 0.355);
  kickstandShape.lineTo(-0.040, 0.355);
  kickstandShape.closePath();
  const rear_kickstandGeom = new THREE.ExtrudeGeometry(kickstandShape, {
    depth: 0.12,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const rear_kickstand = new THREE.Mesh(rear_kickstandGeom, brushedMat);
  rear_kickstand.name = "rear_kickstand";
  rear_kickstand.rotation.y = Math.PI / 2;
  rear_kickstand.position.set(-0.060, -0.750, -0.350);
  rear_support.add(rear_kickstand);

  const kickstand_mountGeom = new THREE.BoxGeometry(0.15, 0.10, 0.045);
  const kickstand_mount = new THREE.Mesh(kickstand_mountGeom, frameMat);
  kickstand_mount.name = "kickstand_mount";
  kickstand_mount.position.set(0, -0.405, -0.335);
  kickstand_mount.rotation.x = -0.12;
  rear_support.add(kickstand_mount);

  const kickstand_footGeom = new THREE.BoxGeometry(0.18, 0.035, 0.11);
  const kickstand_foot = new THREE.Mesh(kickstand_footGeom, backingMat);
  kickstand_foot.name = "kickstand_foot";
  kickstand_foot.position.set(0, -0.750, -0.385);
  rear_support.add(kickstand_foot);

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
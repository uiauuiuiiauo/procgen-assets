export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "leather_wrapped_hand_trowel";

  const blade_assembly = new THREE.Group();
  blade_assembly.name = "blade_assembly";
  root.add(blade_assembly);

  const shaft_assembly = new THREE.Group();
  shaft_assembly.name = "shaft_assembly";
  root.add(shaft_assembly);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  root.add(handle_assembly);

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x4d5149,
    metalness: 0.0,
    roughness: 0.7
  });
  const leatherHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x5a5f56,
    metalness: 0.0,
    roughness: 0.7
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x252824,
    metalness: 0.0,
    roughness: 0.8
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xc58f55,
    metalness: 0.0,
    roughness: 0.6
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x80552f,
    metalness: 0.0,
    roughness: 0.9
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  function makeTube(points, radius, material, closed) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, points.length * 8),
      radius,
      7,
      closed
    );
    return new THREE.Mesh(geometry, material);
  }

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.46, -0.34);
  bladeShape.bezierCurveTo(-0.49, -0.85, -0.47, -1.43, -0.31, -1.91);
  bladeShape.bezierCurveTo(-0.22, -2.17, -0.10, -2.38, 0.00, -2.46);
  bladeShape.bezierCurveTo(0.19, -2.34, 0.38, -2.04, 0.47, -1.72);
  bladeShape.bezierCurveTo(0.54, -1.27, 0.53, -0.77, 0.48, -0.34);
  bladeShape.lineTo(0.31, -0.32);
  bladeShape.bezierCurveTo(0.24, -0.32, 0.20, -0.25, 0.13, -0.22);
  bladeShape.lineTo(-0.13, -0.22);
  bladeShape.bezierCurveTo(-0.20, -0.25, -0.24, -0.32, -0.31, -0.34);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.018,
    bevelSegments: 3
  });
  const blade = new THREE.Mesh(bladeGeom, leatherMat);
  blade.name = "blade";
  blade.position.z = -0.035;
  blade_assembly.add(blade);

  const bladeEdgePoints = [
    new THREE.Vector3(-0.445, -0.37, 0.060),
    new THREE.Vector3(-0.470, -0.92, 0.060),
    new THREE.Vector3(-0.430, -1.48, 0.060),
    new THREE.Vector3(-0.300, -1.94, 0.060),
    new THREE.Vector3(-0.120, -2.34, 0.060),
    new THREE.Vector3(0.000, -2.445, 0.060),
    new THREE.Vector3(0.170, -2.30, 0.060),
    new THREE.Vector3(0.350, -2.00, 0.060),
    new THREE.Vector3(0.460, -1.68, 0.060),
    new THREE.Vector3(0.505, -1.18, 0.060),
    new THREE.Vector3(0.470, -0.37, 0.060)
  ];
  const bladeEdgeCurve = new THREE.CatmullRomCurve3(
    bladeEdgePoints,
    true,
    "centripetal"
  );
  const blade_edge_pipingGeom = new THREE.TubeGeometry(
    bladeEdgeCurve,
    96,
    0.012,
    7,
    true
  );
  const blade_edge_piping = new THREE.Mesh(blade_edge_pipingGeom, seamMat);
  blade_edge_piping.name = "blade_edge_piping";
  blade_assembly.add(blade_edge_piping);

  const bladeStitchSamples = bladeEdgeCurve.getSpacedPoints(44);
  const blade_stitchesGeom = new THREE.BoxGeometry(0.008, 0.038, 0.009);
  const blade_stitches = new THREE.InstancedMesh(
    blade_stitchesGeom,
    seamMat,
    bladeStitchSamples.length
  );
  blade_stitches.name = "blade_stitches";
  const bladeStitchDummy = new THREE.Object3D();
  for (let i = 0; i < bladeStitchSamples.length; i++) {
    const point = bladeStitchSamples[i];
    const angle = Math.atan2(-point.x, point.y);
    bladeStitchDummy.position.set(point.x, point.y, 0.078);
    bladeStitchDummy.rotation.set(0, 0, angle);
    bladeStitchDummy.scale.set(1, 1, 1);
    bladeStitchDummy.updateMatrix();
    blade_stitches.setMatrixAt(i, bladeStitchDummy.matrix);
  }
  blade_stitches.instanceMatrix.needsUpdate = true;
  blade_assembly.add(blade_stitches);

  const blade_quilt_seams = new THREE.Group();
  blade_quilt_seams.name = "blade_quilt_seams";
  const bladeQuiltLines = [
    [[-0.40, -0.43], [-0.12, -0.90], [0.25, -1.48], [0.38, -1.92]],
    [[-0.37, -0.84], [-0.08, -1.24], [0.20, -1.66], [0.12, -2.18]],
    [[-0.28, -1.42], [-0.05, -1.72], [0.18, -2.02]],
    [[0.43, -0.43], [0.15, -0.88], [-0.23, -1.43], [-0.38, -1.86]],
    [[0.40, -0.88], [0.13, -1.25], [-0.18, -1.65], [-0.20, -2.05]],
    [[0.30, -1.42], [0.08, -1.72], [-0.12, -2.00]]
  ];
  for (let i = 0; i < bladeQuiltLines.length; i++) {
    const points = [];
    for (let j = 0; j < bladeQuiltLines[i].length; j++) {
      points.push(new THREE.Vector3(
        bladeQuiltLines[i][j][0],
        bladeQuiltLines[i][j][1],
        0.061
      ));
    }
    const seam = makeTube(points, 0.0055, seamMat, false);
    seam.name = "blade_quilt_seam_" + i;
    blade_quilt_seams.add(seam);
  }
  blade_assembly.add(blade_quilt_seams);

  const blade_top_panelShape = new THREE.Shape();
  blade_top_panelShape.moveTo(-0.43, -0.37);
  blade_top_panelShape.lineTo(0.44, -0.37);
  blade_top_panelShape.lineTo(0.31, -0.335);
  blade_top_panelShape.bezierCurveTo(0.23, -0.33, 0.19, -0.25, 0.12, -0.22);
  blade_top_panelShape.lineTo(-0.12, -0.22);
  blade_top_panelShape.bezierCurveTo(-0.19, -0.25, -0.23, -0.33, -0.31, -0.34);
  blade_top_panelShape.closePath();

  const blade_top_panelGeom = new THREE.ShapeGeometry(blade_top_panelShape, 12);
  const blade_top_panel = new THREE.Mesh(
    blade_top_panelGeom,
    leatherHighlightMat
  );
  blade_top_panel.name = "blade_top_panel";
  blade_top_panel.position.z = 0.067;
  blade_assembly.add(blade_top_panel);

  const metal_shankShape = new THREE.Shape();
  metal_shankShape.moveTo(-0.14, 0.43);
  metal_shankShape.lineTo(0.14, 0.43);
  metal_shankShape.bezierCurveTo(0.13, 0.20, 0.11, -0.10, 0.13, -0.28);
  metal_shankShape.bezierCurveTo(0.14, -0.43, 0.23, -0.52, 0.34, -0.55);
  metal_shankShape.lineTo(-0.34, -0.55);
  metal_shankShape.bezierCurveTo(-0.23, -0.52, -0.14, -0.43, -0.13, -0.28);
  metal_shankShape.bezierCurveTo(-0.11, -0.10, -0.13, 0.20, -0.14, 0.43);
  metal_shankShape.closePath();

  const metal_shankGeom = new THREE.ExtrudeGeometry(metal_shankShape, {
    depth: 0.12,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.024,
    bevelSegments: 4
  });
  const metal_shank = new THREE.Mesh(metal_shankGeom, metalMat);
  metal_shank.name = "metal_shank";
  metal_shank.position.z = -0.06;
  shaft_assembly.add(metal_shank);

  const wooden_gripGeom = new THREE.CylinderGeometry(
    0.135,
    0.135,
    0.78,
    32
  );
  const wooden_grip = new THREE.Mesh(wooden_gripGeom, woodMat);
  wooden_grip.name = "wooden_grip";
  wooden_grip.position.set(0, 0.81, 0);
  shaft_assembly.add(wooden_grip);

  const wood_grain = new THREE.Group();
  wood_grain.name = "wood_grain";
  for (let i = 0; i < 7; i++) {
    const xBase = -0.09 + i * 0.03;
    const points = [];
    for (let j = 0; j < 6; j++) {
      points.push(new THREE.Vector3(
        xBase + Math.sin((i + 2) * (j + 1) * 0.72) * 0.006,
        0.47 + j * 0.135,
        0.138
      ));
    }
    const grain = makeTube(points, 0.0028, woodGrainMat, false);
    grain.name = "wood_grain_line_" + i;
    wood_grain.add(grain);
  }
  shaft_assembly.add(wood_grain);

  const lower_ferruleGeom = new THREE.CylinderGeometry(
    0.15,
    0.15,
    0.10,
    32
  );
  const lower_ferrule = new THREE.Mesh(lower_ferruleGeom, metalMat);
  lower_ferrule.name = "lower_ferrule";
  lower_ferrule.position.set(0, 1.18, 0);
  shaft_assembly.add(lower_ferrule);

  const lower_ferrule_rimGeom = new THREE.TorusGeometry(
    0.145,
    0.008,
    7,
    32
  );
  const lower_ferrule_rim = new THREE.Mesh(lower_ferrule_rimGeom, seamMat);
  lower_ferrule_rim.name = "lower_ferrule_rim";
  lower_ferrule_rim.rotation.x = Math.PI / 2;
  lower_ferrule_rim.position.set(0, 1.14, 0);
  shaft_assembly.add(lower_ferrule_rim);

  const leather_collarProfile = [
    new THREE.Vector2(0.00, 1.20),
    new THREE.Vector2(0.145, 1.20),
    new THREE.Vector2(0.160, 1.25),
    new THREE.Vector2(0.175, 1.39),
    new THREE.Vector2(0.180, 1.67),
    new THREE.Vector2(0.190, 1.84),
    new THREE.Vector2(0.205, 1.93),
    new THREE.Vector2(0.00, 1.95)
  ];
  const leather_collarGeom = new THREE.LatheGeometry(
    leather_collarProfile,
    36
  );
  const leather_collar = new THREE.Mesh(leather_collarGeom, leatherMat);
  leather_collar.name = "leather_collar";
  handle_assembly.add(leather_collar);

  const collar_bottom_pipingGeom = new THREE.TorusGeometry(
    0.155,
    0.012,
    7,
    36
  );
  const collar_bottom_piping = new THREE.Mesh(
    collar_bottom_pipingGeom,
    seamMat
  );
  collar_bottom_piping.name = "collar_bottom_piping";
  collar_bottom_piping.rotation.x = Math.PI / 2;
  collar_bottom_piping.position.y = 1.235;
  handle_assembly.add(collar_bottom_piping);

  const collar_top_pipingGeom = new THREE.TorusGeometry(
    0.198,
    0.010,
    7,
    36
  );
  const collar_top_piping = new THREE.Mesh(collar_top_pipingGeom, seamMat);
  collar_top_piping.name = "collar_top_piping";
  collar_top_piping.rotation.x = Math.PI / 2;
  collar_top_piping.position.y = 1.91;
  handle_assembly.add(collar_top_piping);

  const collarStitchCount = 20;
  const collar_stitchesGeom = new THREE.BoxGeometry(0.032, 0.007, 0.008);
  const collar_stitches = new THREE.InstancedMesh(
    collar_stitchesGeom,
    seamMat,
    collarStitchCount
  );
  collar_stitches.name = "collar_stitches";
  const collarStitchDummy = new THREE.Object3D();
  for (let i = 0; i < collarStitchCount; i++) {
    const angle = i / collarStitchCount * Math.PI * 2;
    collarStitchDummy.position.set(
      Math.cos(angle) * 0.164,
      1.252,
      Math.sin(angle) * 0.164
    );
    collarStitchDummy.rotation.set(0, -angle, 0);
    collarStitchDummy.scale.set(1, 1, 1);
    collarStitchDummy.updateMatrix();
    collar_stitches.setMatrixAt(i, collarStitchDummy.matrix);
  }
  collar_stitches.instanceMatrix.needsUpdate = true;
  handle_assembly.add(collar_stitches);

  function collarRadiusAt(y) {
    if (y < 1.39) return 0.170 + (y - 1.25) * 0.035;
    if (y < 1.68) return 0.175 + (y - 1.39) * 0.017;
    return 0.180 + (y - 1.68) * 0.12;
  }

  const collar_quilt_seams = new THREE.Group();
  collar_quilt_seams.name = "collar_quilt_seams";
  for (const direction of [-1, 1]) {
    for (let lineIndex = 0; lineIndex < 3; lineIndex++) {
      const points = [];
      const phase = lineIndex / 3 * Math.PI * 2;
      for (let j = 0; j <= 20; j++) {
        const t = j / 20;
        const y = 1.28 + t * 0.60;
        const angle = phase + direction * t * Math.PI * 1.45;
        const radius = collarRadiusAt(y) + 0.006;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ));
      }
      const seam = makeTube(points, 0.0055, seamMat, false);
      seam.name = "collar_quilt_seam_" + direction + "_" + lineIndex;
      collar_quilt_seams.add(seam);
    }
  }
  handle_assembly.add(collar_quilt_seams);

  const left_handle_strapShape = new THREE.Shape();
  left_handle_strapShape.moveTo(-0.13, 1.80);
  left_handle_strapShape.bezierCurveTo(-0.21, 1.96, -0.30, 2.18, -0.36, 2.42);
  left_handle_strapShape.bezierCurveTo(-0.43, 2.68, -0.48, 2.91, -0.44, 3.05);
  left_handle_strapShape.bezierCurveTo(-0.42, 3.14, -0.37, 3.20, -0.31, 3.20);
  left_handle_strapShape.lineTo(-0.18, 3.14);
  left_handle_strapShape.bezierCurveTo(-0.22, 2.95, -0.18, 2.73, -0.11, 2.53);
  left_handle_strapShape.bezierCurveTo(-0.04, 2.32, 0.08, 2.10, 0.15, 1.95);
  left_handle_strapShape.bezierCurveTo(0.07, 1.86, -0.04, 1.81, -0.13, 1.80);
  left_handle_strapShape.closePath();

  const left_handle_strapGeom = new THREE.ExtrudeGeometry(
    left_handle_strapShape,
    {
      depth: 0.13,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.022,
      bevelSize: 0.025,
      bevelSegments: 4
    }
  );
  const left_handle_strap = new THREE.Mesh(
    left_handle_strapGeom,
    leatherMat
  );
  left_handle_strap.name = "left_handle_strap";
  left_handle_strap.position.z = -0.065;
  handle_assembly.add(left_handle_strap);

  const right_handle_strapShape = new THREE.Shape();
  right_handle_strapShape.moveTo(0.13, 1.80);
  right_handle_strapShape.bezierCurveTo(0.21, 1.96, 0.30, 2.18, 0.36, 2.42);
  right_handle_strapShape.bezierCurveTo(0.43, 2.68, 0.48, 2.91, 0.44, 3.05);
  right_handle_strapShape.bezierCurveTo(0.42, 3.14, 0.37, 3.20, 0.31, 3.20);
  right_handle_strapShape.lineTo(0.18, 3.14);
  right_handle_strapShape.bezierCurveTo(0.22, 2.95, 0.18, 2.73, 0.11, 2.53);
  right_handle_strapShape.bezierCurveTo(0.04, 2.32, -0.08, 2.10, -0.15, 1.95);
  right_handle_strapShape.bezierCurveTo(-0.07, 1.86, 0.04, 1.81, 0.13, 1.80);
  right_handle_strapShape.closePath();

  const right_handle_strapGeom = new THREE.ExtrudeGeometry(
    right_handle_strapShape,
    {
      depth: 0.13,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.022,
      bevelSize: 0.025,
      bevelSegments: 4
    }
  );
  const right_handle_strap = new THREE.Mesh(
    right_handle_strapGeom,
    leatherMat
  );
  right_handle_strap.name = "right_handle_strap";
  right_handle_strap.position.z = -0.065;
  handle_assembly.add(right_handle_strap);

  const handle_outer_piping = makeTube([
    new THREE.Vector3(-0.13, 1.82, 0.102),
    new THREE.Vector3(-0.27, 2.12, 0.102),
    new THREE.Vector3(-0.39, 2.56, 0.102),
    new THREE.Vector3(-0.44, 2.91, 0.102),
    new THREE.Vector3(-0.39, 3.13, 0.102),
    new THREE.Vector3(-0.30, 3.19, 0.102),
    new THREE.Vector3(0.30, 3.19, 0.102),
    new THREE.Vector3(0.39, 3.13, 0.102),
    new THREE.Vector3(0.44, 2.91, 0.102),
    new THREE.Vector3(0.39, 2.56, 0.102),
    new THREE.Vector3(0.27, 2.12, 0.102),
    new THREE.Vector3(0.13, 1.82, 0.102)
  ], 0.012, seamMat, true);
  handle_outer_piping.name = "handle_outer_piping";
  handle_assembly.add(handle_outer_piping);

  const handle_inner_piping = makeTube([
    new THREE.Vector3(-0.18, 3.13, 0.103),
    new THREE.Vector3(-0.20, 2.91, 0.103),
    new THREE.Vector3(-0.13, 2.56, 0.103),
    new THREE.Vector3(-0.02, 2.27, 0.103),
    new THREE.Vector3(0.12, 2.00, 0.103),
    new THREE.Vector3(0.00, 1.84, 0.103),
    new THREE.Vector3(-0.12, 1.95, 0.103),
    new THREE.Vector3(0.12, 1.95, 0.103)
  ], 0.009, seamMat, true);
  handle_inner_piping.name = "handle_inner_piping";
  handle_assembly.add(handle_inner_piping);

  const top_gripGeom = new THREE.CapsuleGeometry(0.14, 0.50, 8, 20);
  const top_grip = new THREE.Mesh(top_gripGeom, leatherHighlightMat);
  top_grip.name = "top_grip";
  top_grip.rotation.z = Math.PI / 2;
  top_grip.position.set(0, 3.12, 0.015);
  handle_assembly.add(top_grip);

  const top_grip_end_seamsGeom = new THREE.TorusGeometry(
    0.138,
    0.007,
    7,
    32
  );
  const top_grip_end_seams = new THREE.InstancedMesh(
    top_grip_end_seamsGeom,
    seamMat,
    2
  );
  top_grip_end_seams.name = "top_grip_end_seams";
  const topSeamDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    topSeamDummy.position.set(i === 0 ? -0.26 : 0.26, 3.12, 0.015);
    topSeamDummy.rotation.set(0, Math.PI / 2, 0);
    topSeamDummy.scale.set(1, 1, 1);
    topSeamDummy.updateMatrix();
    top_grip_end_seams.setMatrixAt(i, topSeamDummy.matrix);
  }
  top_grip_end_seams.instanceMatrix.needsUpdate = true;
  handle_assembly.add(top_grip_end_seams);

  const handle_cross_seams = new THREE.Group();
  handle_cross_seams.name = "handle_cross_seams";
  const handleCrossLines = [
    [[-0.34, 2.76], [-0.17, 2.58], [0.08, 2.34]],
    [[0.34, 2.76], [0.17, 2.58], [-0.08, 2.34]],
    [[-0.28, 2.40], [-0.05, 2.20], [0.18, 2.00]],
    [[0.28, 2.40], [0.05, 2.20], [-0.18, 2.00]],
    [[-0.18, 2.12], [-0.02, 1.98], [0.13, 1.84]]
  ];
  for (let i = 0; i < handleCrossLines.length; i++) {
    const points = [];
    for (let j = 0; j < handleCrossLines[i].length; j++) {
      points.push(new THREE.Vector3(
        handleCrossLines[i][j][0],
        handleCrossLines[i][j][1],
        0.104
      ));
    }
    const crossSeam = makeTube(points, 0.0065, seamMat, false);
    crossSeam.name = "handle_cross_seam_" + i;
    handle_cross_seams.add(crossSeam);
  }
  handle_assembly.add(handle_cross_seams);

  const handleStitchSegments = [
    [-0.325, 2.67, -0.275, 2.55],
    [-0.275, 2.55, -0.225, 2.43],
    [0.325, 2.67, 0.275, 2.55],
    [0.275, 2.55, 0.225, 2.43],
    [-0.235, 2.34, -0.185, 2.23],
    [0.235, 2.34, 0.185, 2.23],
    [-0.165, 2.13, -0.115, 2.02],
    [0.165, 2.13, 0.115, 2.02]
  ];
  const handle_stitchesGeom = new THREE.BoxGeometry(0.008, 0.040, 0.009);
  const handle_stitches = new THREE.InstancedMesh(
    handle_stitchesGeom,
    seamMat,
    handleStitchSegments.length
  );
  handle_stitches.name = "handle_stitches";
  const handleStitchDummy = new THREE.Object3D();
  for (let i = 0; i < handleStitchSegments.length; i++) {
    const segment = handleStitchSegments[i];
    const dx = segment[2] - segment[0];
    const dy = segment[3] - segment[1];
    handleStitchDummy.position.set(
      (segment[0] + segment[2]) * 0.5,
      (segment[1] + segment[3]) * 0.5,
      0.108
    );
    handleStitchDummy.rotation.set(0, 0, Math.atan2(-dx, dy));
    handleStitchDummy.scale.set(1, 1, 1);
    handleStitchDummy.updateMatrix();
    handle_stitches.setMatrixAt(i, handleStitchDummy.matrix);
  }
  handle_stitches.instanceMatrix.needsUpdate = true;
  handle_assembly.add(handle_stitches);

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
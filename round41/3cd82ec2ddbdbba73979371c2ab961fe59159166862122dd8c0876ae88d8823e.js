export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_lantern";

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0x8f4f3d,
    metalness: 0.5,
    roughness: 0.45,
  });
  const copperHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.5,
    roughness: 0.35,
  });
  const darkCopperMat = new THREE.MeshStandardMaterial({
    color: 0x4a2923,
    metalness: 0.45,
    roughness: 0.6,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x11100f,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde4e1,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glassHighlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const outerFlameMat = new THREE.MeshStandardMaterial({
    color: 0xff8a24,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff6a16,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const innerFlameMat = new THREE.MeshStandardMaterial({
    color: 0xffe08a,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffbd4a,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const flameCoreMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c7,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffe7a0,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  function makeTube(name, points, radius, material, segments, radialSegments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      segments || 32,
      radius,
      radialSegments || 8,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
  }

  const base_reservoirProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(1.08, 0.00),
    new THREE.Vector2(1.18, 0.05),
    new THREE.Vector2(1.22, 0.13),
    new THREE.Vector2(1.18, 0.22),
    new THREE.Vector2(1.08, 0.28),
    new THREE.Vector2(0.96, 0.55),
    new THREE.Vector2(0.82, 0.73),
    new THREE.Vector2(0.70, 0.79),
    new THREE.Vector2(0.64, 0.90),
    new THREE.Vector2(0.60, 1.12),
    new THREE.Vector2(0.52, 1.19),
    new THREE.Vector2(0.00, 1.19),
  ];
  const base_reservoirGeom = new THREE.LatheGeometry(base_reservoirProfile, 48);
  const base_reservoir = new THREE.Mesh(base_reservoirGeom, copperMat);
  base_reservoir.name = "base_reservoir";
  root.add(base_reservoir);

  const base_foot_ringGeom = new THREE.TorusGeometry(1.13, 0.055, 10, 48);
  const base_foot_ring = new THREE.Mesh(base_foot_ringGeom, copperHighlightMat);
  base_foot_ring.name = "base_foot_ring";
  base_foot_ring.rotation.x = Math.PI / 2;
  base_foot_ring.position.y = 0.10;
  root.add(base_foot_ring);

  const reservoir_step_ringGeom = new THREE.TorusGeometry(0.82, 0.045, 10, 40);
  const reservoir_step_ring = new THREE.Mesh(reservoir_step_ringGeom, darkCopperMat);
  reservoir_step_ring.name = "reservoir_step_ring";
  reservoir_step_ring.rotation.x = Math.PI / 2;
  reservoir_step_ring.position.y = 0.72;
  root.add(reservoir_step_ring);

  const burner_collarGeom = new THREE.CylinderGeometry(0.53, 0.58, 0.24, 40);
  const burner_collar = new THREE.Mesh(burner_collarGeom, copperMat);
  burner_collar.name = "burner_collar";
  burner_collar.position.y = 1.18;
  root.add(burner_collar);

  const burner_collar_ringGeom = new THREE.TorusGeometry(0.54, 0.045, 10, 40);
  const burner_collar_ring = new THREE.Mesh(burner_collar_ringGeom, darkCopperMat);
  burner_collar_ring.name = "burner_collar_ring";
  burner_collar_ring.rotation.x = Math.PI / 2;
  burner_collar_ring.position.y = 1.28;
  root.add(burner_collar_ring);

  const burner_plateGeom = new THREE.CylinderGeometry(0.47, 0.50, 0.09, 40);
  const burner_plate = new THREE.Mesh(burner_plateGeom, darkCopperMat);
  burner_plate.name = "burner_plate";
  burner_plate.position.y = 1.34;
  root.add(burner_plate);

  const wick_holderGeom = new THREE.CylinderGeometry(0.19, 0.23, 0.13, 24);
  const wick_holder = new THREE.Mesh(wick_holderGeom, blackMat);
  wick_holder.name = "wick_holder";
  wick_holder.position.y = 1.43;
  root.add(wick_holder);

  const wickGeom = new THREE.BoxGeometry(0.13, 0.18, 0.07);
  const wick = new THREE.Mesh(wickGeom, blackMat);
  wick.name = "wick";
  wick.position.set(0, 1.53, 0);
  root.add(wick);

  const lower_globe_gasketGeom = new THREE.TorusGeometry(0.54, 0.055, 10, 40);
  const lower_globe_gasket = new THREE.Mesh(lower_globe_gasketGeom, blackMat);
  lower_globe_gasket.name = "lower_globe_gasket";
  lower_globe_gasket.rotation.x = Math.PI / 2;
  lower_globe_gasket.position.y = 1.42;
  root.add(lower_globe_gasket);

  const glass_globeProfile = [
    new THREE.Vector2(0.50, 1.40),
    new THREE.Vector2(0.62, 1.43),
    new THREE.Vector2(0.72, 1.57),
    new THREE.Vector2(0.78, 1.84),
    new THREE.Vector2(0.80, 2.25),
    new THREE.Vector2(0.80, 2.75),
    new THREE.Vector2(0.78, 3.18),
    new THREE.Vector2(0.72, 3.42),
    new THREE.Vector2(0.61, 3.54),
    new THREE.Vector2(0.51, 3.57),
  ];
  const glass_globeGeom = new THREE.LatheGeometry(glass_globeProfile, 48);
  const glass_globe = new THREE.Mesh(glass_globeGeom, glassMat);
  glass_globe.name = "glass_globe";
  root.add(glass_globe);

  const upper_globe_gasketGeom = new THREE.TorusGeometry(0.55, 0.055, 10, 40);
  const upper_globe_gasket = new THREE.Mesh(upper_globe_gasketGeom, blackMat);
  upper_globe_gasket.name = "upper_globe_gasket";
  upper_globe_gasket.rotation.x = Math.PI / 2;
  upper_globe_gasket.position.y = 3.55;
  root.add(upper_globe_gasket);

  const upper_globe_bandGeom = new THREE.CylinderGeometry(0.61, 0.58, 0.11, 40);
  const upper_globe_band = new THREE.Mesh(upper_globe_bandGeom, darkCopperMat);
  upper_globe_band.name = "upper_globe_band";
  upper_globe_band.position.y = 3.56;
  root.add(upper_globe_band);

  const upper_hoodProfile = [
    new THREE.Vector2(0.00, 3.50),
    new THREE.Vector2(0.58, 3.50),
    new THREE.Vector2(0.78, 3.53),
    new THREE.Vector2(0.91, 3.59),
    new THREE.Vector2(0.92, 3.65),
    new THREE.Vector2(0.82, 3.70),
    new THREE.Vector2(0.75, 3.95),
    new THREE.Vector2(0.66, 4.16),
    new THREE.Vector2(0.55, 4.25),
    new THREE.Vector2(0.00, 4.25),
  ];
  const upper_hoodGeom = new THREE.LatheGeometry(upper_hoodProfile, 48);
  const upper_hood = new THREE.Mesh(upper_hoodGeom, copperMat);
  upper_hood.name = "upper_hood";
  root.add(upper_hood);

  const hood_lower_rimGeom = new THREE.TorusGeometry(0.86, 0.055, 10, 48);
  const hood_lower_rim = new THREE.Mesh(hood_lower_rimGeom, copperHighlightMat);
  hood_lower_rim.name = "hood_lower_rim";
  hood_lower_rim.rotation.x = Math.PI / 2;
  hood_lower_rim.position.y = 3.61;
  root.add(hood_lower_rim);

  const vent_bandGeom = new THREE.CylinderGeometry(0.54, 0.54, 0.44, 48);
  const vent_band = new THREE.Mesh(vent_bandGeom, copperMat);
  vent_band.name = "vent_band";
  vent_band.position.y = 4.45;
  root.add(vent_band);

  const vent_lower_ringGeom = new THREE.TorusGeometry(0.54, 0.035, 8, 40);
  const vent_lower_ring = new THREE.Mesh(vent_lower_ringGeom, darkCopperMat);
  vent_lower_ring.name = "vent_lower_ring";
  vent_lower_ring.rotation.x = Math.PI / 2;
  vent_lower_ring.position.y = 4.25;
  root.add(vent_lower_ring);

  const vent_holesGeom = new THREE.CircleGeometry(0.10, 18);
  const vent_holes = new THREE.InstancedMesh(vent_holesGeom, blackMat, 10);
  vent_holes.name = "vent_holes";
  const vent_hole_dummy = new THREE.Object3D();
  const circle_normal = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 10; i++) {
    const angle = i / 10 * Math.PI * 2;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    vent_hole_dummy.position.set(normal.x * 0.548, 4.46, normal.z * 0.548);
    vent_hole_dummy.quaternion.setFromUnitVectors(circle_normal, normal);
    vent_hole_dummy.scale.set(0.78, 1.0, 1.0);
    vent_hole_dummy.updateMatrix();
    vent_holes.setMatrixAt(i, vent_hole_dummy.matrix);
  }
  vent_holes.instanceMatrix.needsUpdate = true;
  root.add(vent_holes);

  const top_capProfile = [
    new THREE.Vector2(0.00, 4.64),
    new THREE.Vector2(0.55, 4.64),
    new THREE.Vector2(0.73, 4.68),
    new THREE.Vector2(0.74, 4.72),
    new THREE.Vector2(0.61, 4.77),
    new THREE.Vector2(0.53, 4.91),
    new THREE.Vector2(0.34, 5.03),
    new THREE.Vector2(0.12, 5.08),
    new THREE.Vector2(0.00, 5.08),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 48);
  const top_cap = new THREE.Mesh(top_capGeom, copperMat);
  top_cap.name = "top_cap";
  root.add(top_cap);

  const top_cap_brimGeom = new THREE.TorusGeometry(0.69, 0.045, 10, 48);
  const top_cap_brim = new THREE.Mesh(top_cap_brimGeom, copperHighlightMat);
  top_cap_brim.name = "top_cap_brim";
  top_cap_brim.rotation.x = Math.PI / 2;
  top_cap_brim.position.y = 4.70;
  root.add(top_cap_brim);

  const top_knobGeom = new THREE.SphereGeometry(0.12, 20, 12);
  const top_knob = new THREE.Mesh(top_knobGeom, darkCopperMat);
  top_knob.name = "top_knob";
  top_knob.scale.set(1.0, 0.55, 1.0);
  top_knob.position.y = 5.11;
  root.add(top_knob);

  const side_frame_points = [
    new THREE.Vector3(0.68, 1.05, 0.00),
    new THREE.Vector3(0.94, 1.02, 0.00),
    new THREE.Vector3(1.22, 1.16, 0.00),
    new THREE.Vector3(1.38, 1.48, 0.00),
    new THREE.Vector3(1.40, 1.82, 0.00),
    new THREE.Vector3(1.34, 2.45, 0.00),
    new THREE.Vector3(1.27, 3.20, 0.00),
    new THREE.Vector3(1.18, 3.82, 0.00),
    new THREE.Vector3(1.04, 4.08, 0.00),
    new THREE.Vector3(0.82, 4.18, 0.00),
    new THREE.Vector3(0.62, 4.10, 0.00),
  ];
  const side_frame_curve = new THREE.CatmullRomCurve3(
    side_frame_points,
    false,
    "centripetal"
  );
  const side_frame_railsGeom = new THREE.TubeGeometry(
    side_frame_curve,
    64,
    0.105,
    10,
    false
  );
  const side_frame_rails = new THREE.InstancedMesh(
    side_frame_railsGeom,
    darkCopperMat,
    2
  );
  side_frame_rails.name = "side_frame_rails";
  const right_frame_matrix = new THREE.Matrix4().identity();
  const left_frame_matrix = new THREE.Matrix4().makeScale(-1, 1, 1);
  side_frame_rails.setMatrixAt(0, right_frame_matrix);
  side_frame_rails.setMatrixAt(1, left_frame_matrix);
  side_frame_rails.instanceMatrix.needsUpdate = true;
  root.add(side_frame_rails);

  const side_frame_inlay_points = [];
  for (let i = 0; i < side_frame_points.length; i++) {
    const point = side_frame_points[i];
    side_frame_inlay_points.push(
      new THREE.Vector3(point.x - 0.015, point.y, 0.096)
    );
  }
  const side_frame_inlay_curve = new THREE.CatmullRomCurve3(
    side_frame_inlay_points,
    false,
    "centripetal"
  );
  const side_frame_inlaysGeom = new THREE.TubeGeometry(
    side_frame_inlay_curve,
    64,
    0.026,
    8,
    false
  );
  const side_frame_inlays = new THREE.InstancedMesh(
    side_frame_inlaysGeom,
    copperHighlightMat,
    2
  );
  side_frame_inlays.name = "side_frame_inlays";
  side_frame_inlays.setMatrixAt(0, right_frame_matrix);
  side_frame_inlays.setMatrixAt(1, left_frame_matrix);
  side_frame_inlays.instanceMatrix.needsUpdate = true;
  root.add(side_frame_inlays);

  const side_hanging_loopsGeom = new THREE.TorusGeometry(0.15, 0.045, 10, 28);
  const side_hanging_loops = new THREE.InstancedMesh(
    side_hanging_loopsGeom,
    darkCopperMat,
    2
  );
  side_hanging_loops.name = "side_hanging_loops";
  const right_loop_matrix = new THREE.Matrix4().makeTranslation(1.25, 4.18, 0.01);
  const left_loop_matrix = new THREE.Matrix4().makeTranslation(-1.25, 4.18, 0.01);
  side_hanging_loops.setMatrixAt(0, right_loop_matrix);
  side_hanging_loops.setMatrixAt(1, left_loop_matrix);
  side_hanging_loops.instanceMatrix.needsUpdate = true;
  root.add(side_hanging_loops);

  const side_hanger_stemsGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.25, 10);
  const side_hanger_stems = new THREE.InstancedMesh(
    side_hanger_stemsGeom,
    darkCopperMat,
    2
  );
  side_hanger_stems.name = "side_hanger_stems";
  side_hanger_stems.setMatrixAt(
    0,
    new THREE.Matrix4().makeTranslation(1.16, 3.99, 0.00)
  );
  side_hanger_stems.setMatrixAt(
    1,
    new THREE.Matrix4().makeTranslation(-1.16, 3.99, 0.00)
  );
  side_hanger_stems.instanceMatrix.needsUpdate = true;
  root.add(side_hanger_stems);

  const carrying_handle_points = [
    new THREE.Vector3(-0.48, 4.70, -0.15),
    new THREE.Vector3(-0.65, 4.91, -0.15),
    new THREE.Vector3(-0.72, 5.25, -0.15),
    new THREE.Vector3(-0.62, 5.61, -0.15),
    new THREE.Vector3(-0.34, 5.87, -0.15),
    new THREE.Vector3(0.00, 5.96, -0.15),
    new THREE.Vector3(0.34, 5.87, -0.15),
    new THREE.Vector3(0.62, 5.61, -0.15),
    new THREE.Vector3(0.72, 5.25, -0.15),
    new THREE.Vector3(0.65, 4.91, -0.15),
    new THREE.Vector3(0.48, 4.70, -0.15),
  ];
  const carrying_handle = makeTube(
    "carrying_handle",
    carrying_handle_points,
    0.055,
    darkCopperMat,
    72,
    10
  );
  root.add(carrying_handle);

  const carrying_handle_highlight_points = [];
  for (let i = 0; i < carrying_handle_points.length; i++) {
    const point = carrying_handle_points[i];
    carrying_handle_highlight_points.push(
      new THREE.Vector3(point.x, point.y, point.z + 0.052)
    );
  }
  const carrying_handle_highlight = makeTube(
    "carrying_handle_highlight",
    carrying_handle_highlight_points,
    0.016,
    copperHighlightMat,
    72,
    7
  );
  root.add(carrying_handle_highlight);

  const handle_pivotsGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.10, 18);
  const handle_pivots = new THREE.InstancedMesh(
    handle_pivotsGeom,
    darkCopperMat,
    2
  );
  handle_pivots.name = "handle_pivots";
  const pivot_quaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  handle_pivots.setMatrixAt(
    0,
    new THREE.Matrix4().compose(
      new THREE.Vector3(-0.50, 4.70, -0.12),
      pivot_quaternion,
      new THREE.Vector3(1, 1, 1)
    )
  );
  handle_pivots.setMatrixAt(
    1,
    new THREE.Matrix4().compose(
      new THREE.Vector3(0.50, 4.70, -0.12),
      pivot_quaternion,
      new THREE.Vector3(1, 1, 1)
    )
  );
  handle_pivots.instanceMatrix.needsUpdate = true;
  root.add(handle_pivots);

  const outer_flameShape = new THREE.Shape();
  outer_flameShape.moveTo(0.00, 0.00);
  outer_flameShape.bezierCurveTo(-0.24, 0.18, -0.29, 0.48, -0.13, 0.75);
  outer_flameShape.bezierCurveTo(-0.02, 0.96, -0.10, 1.22, 0.04, 1.55);
  outer_flameShape.bezierCurveTo(0.19, 1.31, 0.13, 1.08, 0.25, 0.85);
  outer_flameShape.bezierCurveTo(0.38, 0.57, 0.28, 0.20, 0.00, 0.00);
  const outer_flameGeom = new THREE.ShapeGeometry(outer_flameShape, 24);
  const outer_flame = new THREE.Mesh(outer_flameGeom, outerFlameMat);
  outer_flame.name = "outer_flame";
  outer_flame.position.set(0, 1.55, 0.04);
  root.add(outer_flame);

  const outer_flame_cross = new THREE.Mesh(outer_flameGeom, outerFlameMat);
  outer_flame_cross.name = "outer_flame_cross";
  outer_flame_cross.rotation.y = Math.PI / 2;
  outer_flame_cross.position.set(0, 1.55, 0);
  root.add(outer_flame_cross);

  const inner_flameShape = new THREE.Shape();
  inner_flameShape.moveTo(0.00, 0.00);
  inner_flameShape.bezierCurveTo(-0.13, 0.18, -0.15, 0.42, -0.07, 0.61);
  inner_flameShape.bezierCurveTo(0.00, 0.78, 0.01, 0.96, 0.06, 1.08);
  inner_flameShape.bezierCurveTo(0.17, 0.83, 0.18, 0.55, 0.13, 0.34);
  inner_flameShape.bezierCurveTo(0.10, 0.16, 0.06, 0.05, 0.00, 0.00);
  const inner_flameGeom = new THREE.ShapeGeometry(inner_flameShape, 20);
  const inner_flame = new THREE.Mesh(inner_flameGeom, innerFlameMat);
  inner_flame.name = "inner_flame";
  inner_flame.position.set(0, 1.57, 0.065);
  root.add(inner_flame);

  const inner_flame_cross = new THREE.Mesh(inner_flameGeom, innerFlameMat);
  inner_flame_cross.name = "inner_flame_cross";
  inner_flame_cross.rotation.y = Math.PI / 2;
  inner_flame_cross.position.set(0, 1.57, 0);
  root.add(inner_flame_cross);

  const flame_coreShape = new THREE.Shape();
  flame_coreShape.moveTo(0.00, 0.00);
  flame_coreShape.bezierCurveTo(-0.07, 0.12, -0.07, 0.31, -0.02, 0.45);
  flame_coreShape.bezierCurveTo(0.01, 0.54, 0.02, 0.64, 0.04, 0.72);
  flame_coreShape.bezierCurveTo(0.10, 0.53, 0.09, 0.25, 0.00, 0.00);
  const flame_coreGeom = new THREE.ShapeGeometry(flame_coreShape, 16);
  const flame_core = new THREE.Mesh(flame_coreGeom, flameCoreMat);
  flame_core.name = "flame_core";
  flame_core.position.set(0, 1.58, 0.08);
  root.add(flame_core);

  const left_globe_guard_points = [
    new THREE.Vector3(-0.54, 1.43, 0.35),
    new THREE.Vector3(-0.68, 1.67, 0.45),
    new THREE.Vector3(-0.67, 2.05, 0.50),
    new THREE.Vector3(-0.48, 2.42, 0.56),
    new THREE.Vector3(-0.18, 2.78, 0.60),
    new THREE.Vector3(0.18, 3.13, 0.56),
    new THREE.Vector3(0.50, 3.48, 0.39),
  ];
  const left_globe_guard = makeTube(
    "left_globe_guard",
    left_globe_guard_points,
    0.025,
    darkCopperMat,
    40,
    7
  );
  root.add(left_globe_guard);

  const right_globe_guard_points = [
    new THREE.Vector3(0.54, 1.43, 0.35),
    new THREE.Vector3(0.68, 1.67, 0.45),
    new THREE.Vector3(0.67, 2.05, 0.50),
    new THREE.Vector3(0.48, 2.42, 0.56),
    new THREE.Vector3(0.18, 2.78, 0.60),
    new THREE.Vector3(-0.18, 3.13, 0.56),
    new THREE.Vector3(-0.50, 3.48, 0.39),
  ];
  const right_globe_guard = makeTube(
    "right_globe_guard",
    right_globe_guard_points,
    0.025,
    darkCopperMat,
    40,
    7
  );
  root.add(right_globe_guard);

  const lower_front_guard_points = [
    new THREE.Vector3(-0.55, 1.43, 0.36),
    new THREE.Vector3(-0.25, 1.34, 0.55),
    new THREE.Vector3(0.10, 1.32, 0.60),
    new THREE.Vector3(0.42, 1.40, 0.55),
    new THREE.Vector3(0.64, 1.63, 0.42),
  ];
  const lower_front_guard = makeTube(
    "lower_front_guard",
    lower_front_guard_points,
    0.024,
    darkCopperMat,
    30,
    7
  );
  root.add(lower_front_guard);

  const lower_rear_guard_points = [
    new THREE.Vector3(-0.54, 1.43, -0.28),
    new THREE.Vector3(-0.25, 1.34, -0.48),
    new THREE.Vector3(0.10, 1.32, -0.52),
    new THREE.Vector3(0.42, 1.40, -0.47),
    new THREE.Vector3(0.62, 1.62, -0.32),
  ];
  const lower_rear_guard = makeTube(
    "lower_rear_guard",
    lower_rear_guard_points,
    0.022,
    darkCopperMat,
    30,
    7
  );
  root.add(lower_rear_guard);

  const left_lower_brace_points = [
    new THREE.Vector3(-0.57, 1.15, 0.18),
    new THREE.Vector3(-0.78, 1.12, 0.22),
    new THREE.Vector3(-0.91, 1.28, 0.25),
    new THREE.Vector3(-0.82, 1.48, 0.29),
    new THREE.Vector3(-0.60, 1.55, 0.31),
  ];
  const left_lower_brace = makeTube(
    "left_lower_brace",
    left_lower_brace_points,
    0.027,
    darkCopperMat,
    28,
    7
  );
  root.add(left_lower_brace);

  const right_lower_brace_points = [
    new THREE.Vector3(0.57, 1.15, 0.18),
    new THREE.Vector3(0.78, 1.12, 0.22),
    new THREE.Vector3(0.91, 1.28, 0.25),
    new THREE.Vector3(0.82, 1.48, 0.29),
    new THREE.Vector3(0.60, 1.55, 0.31),
  ];
  const right_lower_brace = makeTube(
    "right_lower_brace",
    right_lower_brace_points,
    0.027,
    darkCopperMat,
    28,
    7
  );
  root.add(right_lower_brace);

  const fuel_fill_capGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.08, 24);
  const fuel_fill_cap = new THREE.Mesh(fuel_fill_capGeom, darkCopperMat);
  fuel_fill_cap.name = "fuel_fill_cap";
  fuel_fill_cap.rotation.x = Math.PI / 2;
  fuel_fill_cap.position.set(0, 0.88, 0.72);
  root.add(fuel_fill_cap);

  const fuel_fill_cap_ringGeom = new THREE.TorusGeometry(0.15, 0.025, 8, 28);
  const fuel_fill_cap_ring = new THREE.Mesh(
    fuel_fill_cap_ringGeom,
    copperHighlightMat
  );
  fuel_fill_cap_ring.name = "fuel_fill_cap_ring";
  fuel_fill_cap_ring.position.set(0, 0.88, 0.765);
  root.add(fuel_fill_cap_ring);

  const fuel_fill_cap_centerGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.09, 20);
  const fuel_fill_cap_center = new THREE.Mesh(
    fuel_fill_cap_centerGeom,
    blackMat
  );
  fuel_fill_cap_center.name = "fuel_fill_cap_center";
  fuel_fill_cap_center.rotation.x = Math.PI / 2;
  fuel_fill_cap_center.position.set(0, 0.88, 0.77);
  root.add(fuel_fill_cap_center);

  const glass_highlightsGeom = new THREE.CircleGeometry(0.10, 20);
  const glass_highlights = new THREE.InstancedMesh(
    glass_highlightsGeom,
    glassHighlightMat,
    2
  );
  glass_highlights.name = "glass_highlights";
  const highlight_normal = new THREE.Vector3();
  const glass_highlight_dummy = new THREE.Object3D();

  highlight_normal.set(-0.35, 0, 0.94).normalize();
  glass_highlight_dummy.position.set(-0.28, 3.18, 0.72);
  glass_highlight_dummy.quaternion.setFromUnitVectors(
    circle_normal,
    highlight_normal
  );
  glass_highlight_dummy.scale.set(0.55, 1.35, 1);
  glass_highlight_dummy.updateMatrix();
  glass_highlights.setMatrixAt(0, glass_highlight_dummy.matrix);

  highlight_normal.set(0.42, 0, 0.91).normalize();
  glass_highlight_dummy.position.set(0.34, 3.12, 0.68);
  glass_highlight_dummy.quaternion.setFromUnitVectors(
    circle_normal,
    highlight_normal
  );
  glass_highlight_dummy.scale.set(0.42, 1.05, 1);
  glass_highlight_dummy.updateMatrix();
  glass_highlights.setMatrixAt(1, glass_highlight_dummy.matrix);

  glass_highlights.instanceMatrix.needsUpdate = true;
  root.add(glass_highlights);

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
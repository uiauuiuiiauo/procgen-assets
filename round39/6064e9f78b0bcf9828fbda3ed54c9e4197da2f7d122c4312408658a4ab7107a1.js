export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "countertop_blender";

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const glossy_black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });
  const matte_black_rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panel_faceMat = new THREE.MeshStandardMaterial({
    color: 0x303438,
    metalness: 0.0,
    roughness: 0.3,
  });
  const display_screenMat = new THREE.MeshStandardMaterial({
    color: 0x090c0e,
    metalness: 0.0,
    roughness: 0.3,
  });
  const clear_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x60686b,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.55,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.0,
    roughness: 0.8,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x85898b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const display_segmentsMat = new THREE.MeshStandardMaterial({
    color: 0xd9e6e8,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xd9e6e8,
    emissiveIntensity: 1.0,
  });
  const blue_ledMat = new THREE.MeshStandardMaterial({
    color: 0x62baff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x62baff,
    emissiveIntensity: 1.0,
  });

  const base_plinthProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.47, 0.00),
    new THREE.Vector2(0.55, 0.025),
    new THREE.Vector2(0.62, 0.10),
    new THREE.Vector2(0.65, 0.19),
    new THREE.Vector2(0.64, 0.25),
    new THREE.Vector2(0.00, 0.25),
  ];
  const base_plinthGeom = new THREE.LatheGeometry(base_plinthProfile, 64);
  const base_plinth = new THREE.Mesh(base_plinthGeom, matte_black_rubberMat);
  base_plinth.name = "base_plinth";
  root.add(base_plinth);

  const base_feetGeom = new THREE.CylinderGeometry(0.055, 0.06, 0.04, 16);
  const base_feet = new THREE.InstancedMesh(base_feetGeom, matte_black_rubberMat, 4);
  base_feet.name = "base_feet";
  const feet_dummy = new THREE.Object3D();
  const foot_positions = [
    [-0.40, -0.015, 0.27],
    [0.40, -0.015, 0.27],
    [-0.40, -0.015, -0.27],
    [0.40, -0.015, -0.27],
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    feet_dummy.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    feet_dummy.updateMatrix();
    base_feet.setMatrixAt(i, feet_dummy.matrix);
  }
  base_feet.instanceMatrix.needsUpdate = true;
  root.add(base_feet);

  const base_bodyProfile = [
    new THREE.Vector2(0.00, 0.20),
    new THREE.Vector2(0.61, 0.20),
    new THREE.Vector2(0.64, 0.29),
    new THREE.Vector2(0.63, 0.43),
    new THREE.Vector2(0.59, 0.68),
    new THREE.Vector2(0.55, 0.90),
    new THREE.Vector2(0.51, 1.08),
    new THREE.Vector2(0.49, 1.16),
    new THREE.Vector2(0.00, 1.16),
  ];
  const base_bodyGeom = new THREE.LatheGeometry(base_bodyProfile, 64);
  const base_body = new THREE.Mesh(base_bodyGeom, brushed_metalMat);
  base_body.name = "base_body";
  root.add(base_body);

  const base_top_trimGeom = new THREE.TorusGeometry(0.485, 0.019, 12, 64);
  const base_top_trim = new THREE.Mesh(base_top_trimGeom, glossy_black_plasticMat);
  base_top_trim.name = "base_top_trim";
  base_top_trim.rotation.x = Math.PI / 2;
  base_top_trim.position.y = 1.16;
  root.add(base_top_trim);

  const base_upper_collarProfile = [
    new THREE.Vector2(0.00, 1.13),
    new THREE.Vector2(0.485, 1.13),
    new THREE.Vector2(0.475, 1.20),
    new THREE.Vector2(0.455, 1.34),
    new THREE.Vector2(0.455, 1.43),
    new THREE.Vector2(0.475, 1.53),
    new THREE.Vector2(0.505, 1.61),
    new THREE.Vector2(0.00, 1.61),
  ];
  const base_upper_collarGeom = new THREE.LatheGeometry(base_upper_collarProfile, 64);
  const base_upper_collar = new THREE.Mesh(base_upper_collarGeom, brushed_metalMat);
  base_upper_collar.name = "base_upper_collar";
  root.add(base_upper_collar);

  const jar_bottom_seamGeom = new THREE.TorusGeometry(0.505, 0.006, 8, 64);
  const jar_bottom_seam = new THREE.Mesh(jar_bottom_seamGeom, seamMat);
  jar_bottom_seam.name = "jar_bottom_seam";
  jar_bottom_seam.rotation.x = Math.PI / 2;
  jar_bottom_seam.position.y = 1.605;
  root.add(jar_bottom_seam);

  const jar_bodyProfile = [
    new THREE.Vector2(0.00, 1.57),
    new THREE.Vector2(0.505, 1.57),
    new THREE.Vector2(0.520, 1.70),
    new THREE.Vector2(0.545, 2.05),
    new THREE.Vector2(0.575, 2.45),
    new THREE.Vector2(0.610, 2.82),
    new THREE.Vector2(0.635, 3.10),
    new THREE.Vector2(0.640, 3.18),
    new THREE.Vector2(0.00, 3.18),
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(jar_bodyProfile, 64);
  const jar_body = new THREE.Mesh(jar_bodyGeom, brushed_metalMat);
  jar_body.name = "jar_body";
  root.add(jar_body);

  const jar_glass_bandProfile = [
    new THREE.Vector2(0.00, 3.15),
    new THREE.Vector2(0.640, 3.15),
    new THREE.Vector2(0.646, 3.20),
    new THREE.Vector2(0.646, 3.30),
    new THREE.Vector2(0.638, 3.34),
    new THREE.Vector2(0.00, 3.34),
  ];
  const jar_glass_bandGeom = new THREE.LatheGeometry(jar_glass_bandProfile, 64);
  const jar_glass_band = new THREE.Mesh(jar_glass_bandGeom, clear_glassMat);
  jar_glass_band.name = "jar_glass_band";
  root.add(jar_glass_band);

  const jar_lower_gasketGeom = new THREE.TorusGeometry(0.638, 0.008, 8, 64);
  const jar_lower_gasket = new THREE.Mesh(jar_lower_gasketGeom, seamMat);
  jar_lower_gasket.name = "jar_lower_gasket";
  jar_lower_gasket.rotation.x = Math.PI / 2;
  jar_lower_gasket.position.y = 3.155;
  root.add(jar_lower_gasket);

  const jar_upper_gasketGeom = new THREE.TorusGeometry(0.638, 0.010, 8, 64);
  const jar_upper_gasket = new THREE.Mesh(jar_upper_gasketGeom, seamMat);
  jar_upper_gasket.name = "jar_upper_gasket";
  jar_upper_gasket.rotation.x = Math.PI / 2;
  jar_upper_gasket.position.y = 3.335;
  root.add(jar_upper_gasket);

  const lidProfile = [
    new THREE.Vector2(0.00, 3.31),
    new THREE.Vector2(0.635, 3.31),
    new THREE.Vector2(0.665, 3.34),
    new THREE.Vector2(0.670, 3.48),
    new THREE.Vector2(0.650, 3.53),
    new THREE.Vector2(0.575, 3.555),
    new THREE.Vector2(0.00, 3.555),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, glossy_black_plasticMat);
  lid.name = "lid";
  root.add(lid);

  const lid_recessGeom = new THREE.CylinderGeometry(0.535, 0.535, 0.012, 64);
  const lid_recess = new THREE.Mesh(lid_recessGeom, glossy_black_plasticMat);
  lid_recess.name = "lid_recess";
  lid_recess.position.y = 3.558;
  root.add(lid_recess);

  const lid_center_capProfile = [
    new THREE.Vector2(0.00, 3.535),
    new THREE.Vector2(0.215, 3.535),
    new THREE.Vector2(0.255, 3.555),
    new THREE.Vector2(0.260, 3.625),
    new THREE.Vector2(0.235, 3.665),
    new THREE.Vector2(0.185, 3.685),
    new THREE.Vector2(0.00, 3.685),
  ];
  const lid_center_capGeom = new THREE.LatheGeometry(lid_center_capProfile, 48);
  const lid_center_cap = new THREE.Mesh(lid_center_capGeom, glossy_black_plasticMat);
  lid_center_cap.name = "lid_center_cap";
  root.add(lid_center_cap);

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  const control_panel_group = new THREE.Group();
  control_panel_group.name = "control_panel_group";
  control_panel_group.position.set(0, 0.68, 0.58);
  control_panel_group.rotation.x = -0.14;

  const control_panelShape = roundedRectShape(0.30, 0.48, 0.075);
  const control_panelGeom = new THREE.ExtrudeGeometry(control_panelShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const control_panel = new THREE.Mesh(control_panelGeom, glossy_black_plasticMat);
  control_panel.name = "control_panel";
  control_panel_group.add(control_panel);

  const control_panel_faceShape = roundedRectShape(0.255, 0.425, 0.060);
  const control_panel_faceGeom = new THREE.ShapeGeometry(control_panel_faceShape, 24);
  const control_panel_face = new THREE.Mesh(control_panel_faceGeom, panel_faceMat);
  control_panel_face.name = "control_panel_face";
  control_panel_face.position.z = 0.052;
  control_panel_group.add(control_panel_face);

  const display_screenShape = roundedRectShape(0.205, 0.105, 0.025);
  const display_screenGeom = new THREE.ShapeGeometry(display_screenShape, 18);
  const display_screen = new THREE.Mesh(display_screenGeom, display_screenMat);
  display_screen.name = "display_screen";
  display_screen.position.set(0, 0.125, 0.057);
  control_panel_group.add(display_screen);

  const display_segmentsGeom = new THREE.BoxGeometry(1, 1, 1);
  const display_segments = new THREE.InstancedMesh(
    display_segmentsGeom,
    display_segmentsMat,
    11
  );
  display_segments.name = "display_segments";
  const segment_dummy = new THREE.Object3D();
  let segment_index = 0;

  function setDisplaySegment(x, y, width, height) {
    segment_dummy.position.set(x, y, 0.064);
    segment_dummy.scale.set(width, height, 0.006);
    segment_dummy.updateMatrix();
    display_segments.setMatrixAt(segment_index, segment_dummy.matrix);
    segment_index++;
  }

  function addHorizontalSegment(x, y) {
    setDisplaySegment(x, y, 0.032, 0.005);
  }

  function addVerticalSegment(x, y) {
    setDisplaySegment(x, y, 0.005, 0.028);
  }

  addHorizontalSegment(-0.045, 0.157);
  addVerticalSegment(-0.026, 0.145);
  addVerticalSegment(-0.026, 0.113);
  addHorizontalSegment(0.050, 0.157);
  addHorizontalSegment(0.050, 0.128);
  addHorizontalSegment(0.050, 0.099);
  addVerticalSegment(0.031, 0.142);
  addVerticalSegment(0.069, 0.142);
  addVerticalSegment(0.031, 0.111);
  addVerticalSegment(0.069, 0.111);
  addHorizontalSegment(0, 0.075);

  display_segments.instanceMatrix.needsUpdate = true;
  control_panel_group.add(display_segments);

  const control_buttonsGeom = new THREE.CircleGeometry(0.012, 16);
  const control_buttons = new THREE.InstancedMesh(
    control_buttonsGeom,
    display_segmentsMat,
    5
  );
  control_buttons.name = "control_buttons";
  const button_dummy = new THREE.Object3D();
  const button_positions = [
    [-0.055, 0.025],
    [0.055, 0.025],
    [-0.055, -0.045],
    [0.055, -0.045],
    [0.000, -0.165],
  ];
  for (let i = 0; i < button_positions.length; i++) {
    button_dummy.position.set(button_positions[i][0], button_positions[i][1], 0.064);
    button_dummy.scale.set(1, 1, 1);
    button_dummy.updateMatrix();
    control_buttons.setMatrixAt(i, button_dummy.matrix);
  }
  control_buttons.instanceMatrix.needsUpdate = true;
  control_panel_group.add(control_buttons);

  const power_ringGeom = new THREE.RingGeometry(0.012, 0.017, 20);
  const power_ring = new THREE.Mesh(power_ringGeom, blue_ledMat);
  power_ring.name = "power_ring";
  power_ring.position.set(0, -0.165, 0.066);
  control_panel_group.add(power_ring);

  const status_ledGeom = new THREE.CircleGeometry(0.008, 16);
  const status_led = new THREE.Mesh(status_ledGeom, blue_ledMat);
  status_led.name = "status_led";
  status_led.position.set(0.055, 0.025, 0.067);
  control_panel_group.add(status_led);

  root.add(control_panel_group);

  const brand_markGeom = new THREE.BoxGeometry(1, 1, 1);
  const brand_mark = new THREE.InstancedMesh(brand_markGeom, markingMat, 7);
  brand_mark.name = "brand_mark";
  const brand_dummy = new THREE.Object3D();
  const brand_strokes = [
    [-0.080, 3.000, 0.005, 0.050],
    [-0.058, 3.022, 0.026, 0.005],
    [-0.058, 2.978, 0.026, 0.005],
    [-0.025, 3.000, 0.005, 0.050],
    [-0.002, 3.000, 0.005, 0.050],
    [0.024, 3.000, 0.005, 0.050],
    [0.058, 3.000, 0.035, 0.005],
  ];
  for (let i = 0; i < brand_strokes.length; i++) {
    const stroke = brand_strokes[i];
    brand_dummy.position.set(stroke[0], stroke[1], 0.647);
    brand_dummy.scale.set(stroke[2], stroke[3], 0.004);
    brand_dummy.updateMatrix();
    brand_mark.setMatrixAt(i, brand_dummy.matrix);
  }
  brand_mark.instanceMatrix.needsUpdate = true;
  root.add(brand_mark);

  const lower_logoGeom = new THREE.BoxGeometry(1, 1, 1);
  const lower_logo = new THREE.InstancedMesh(lower_logoGeom, markingMat, 4);
  lower_logo.name = "lower_logo";
  const lower_logo_dummy = new THREE.Object3D();
  const lower_logo_strokes = [
    [-0.025, 0.355, 0.005, 0.038],
    [-0.010, 0.371, 0.025, 0.005],
    [0.020, 0.355, 0.005, 0.038],
    [0.035, 0.371, 0.025, 0.005],
  ];
  for (let i = 0; i < lower_logo_strokes.length; i++) {
    const stroke = lower_logo_strokes[i];
    lower_logo_dummy.position.set(stroke[0], stroke[1], 0.625);
    lower_logo_dummy.scale.set(stroke[2], stroke[3], 0.004);
    lower_logo_dummy.updateMatrix();
    lower_logo.setMatrixAt(i, lower_logo_dummy.matrix);
  }
  lower_logo.instanceMatrix.needsUpdate = true;
  root.add(lower_logo);

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
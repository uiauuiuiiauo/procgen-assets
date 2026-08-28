export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "sail_rig";

  const sail_group = new THREE.Group();
  sail_group.name = "sail_group";
  root.add(sail_group);

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const rigging_group = new THREE.Group();
  rigging_group.name = "rigging_group";
  root.add(rigging_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a4f24,
    metalness: 0.0,
    roughness: 0.6
  });

  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x552b14,
    metalness: 0.0,
    roughness: 0.6
  });

  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xf1efe5,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.76,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const sail_seamMat = new THREE.MeshStandardMaterial({
    color: 0xd5d1c5,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.58,
    depthWrite: false
  });

  const reinforcementMat = new THREE.MeshStandardMaterial({
    color: 0xded9ca,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0xe5e1d5,
    metalness: 0.0,
    roughness: 0.95
  });

  const fittingMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  function makeTubeGeometry(points, radius, segments, closed) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal",
      0.5
    );
    return new THREE.TubeGeometry(curve, segments, radius, 6, closed);
  }

  function orientCylinder(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );
  }

  const main_sailShape = new THREE.Shape();
  main_sailShape.moveTo(-0.025, -0.58);
  main_sailShape.lineTo(-0.028, 2.32);
  main_sailShape.bezierCurveTo(-0.23, 1.84, -0.86, 0.25, -1.48, -0.86);
  main_sailShape.bezierCurveTo(-0.94, -0.75, -0.43, -0.61, -0.025, -0.58);
  main_sailShape.closePath();

  const main_sailGeom = new THREE.ShapeGeometry(main_sailShape, 20);
  const main_sail = new THREE.Mesh(main_sailGeom, sailMat);
  main_sail.name = "main_sail";
  main_sail.position.z = 0;
  main_sail.renderOrder = 0;
  sail_group.add(main_sail);

  const right_sailShape = new THREE.Shape();
  right_sailShape.moveTo(0.025, 2.32);
  right_sailShape.bezierCurveTo(0.34, 1.56, 0.94, 0.03, 1.55, -0.82);
  right_sailShape.bezierCurveTo(0.96, -0.74, 0.42, -0.63, 0.04, -0.58);
  right_sailShape.lineTo(0.025, 2.32);
  right_sailShape.closePath();

  const right_sailGeom = new THREE.ShapeGeometry(right_sailShape, 20);
  const right_sail = new THREE.Mesh(right_sailGeom, sailMat);
  right_sail.name = "right_sail";
  right_sail.position.z = 0;
  right_sail.renderOrder = 0;
  sail_group.add(right_sail);

  const main_sail_borderGeom = makeTubeGeometry([
    new THREE.Vector3(-0.028, 2.32, 0.014),
    new THREE.Vector3(-0.38, 1.55, 0.014),
    new THREE.Vector3(-0.84, 0.38, 0.014),
    new THREE.Vector3(-1.18, -0.45, 0.014),
    new THREE.Vector3(-1.48, -0.86, 0.014),
    new THREE.Vector3(-0.92, -0.74, 0.014),
    new THREE.Vector3(-0.45, -0.62, 0.014),
    new THREE.Vector3(-0.025, -0.58, 0.014)
  ], 0.011, 64, true);
  const main_sail_border = new THREE.Mesh(main_sail_borderGeom, sail_seamMat);
  main_sail_border.name = "main_sail_border";
  main_sail_border.renderOrder = 2;
  sail_group.add(main_sail_border);

  const right_sail_borderGeom = makeTubeGeometry([
    new THREE.Vector3(0.025, 2.32, 0.014),
    new THREE.Vector3(0.37, 1.56, 0.014),
    new THREE.Vector3(0.79, 0.58, 0.014),
    new THREE.Vector3(1.17, -0.35, 0.014),
    new THREE.Vector3(1.55, -0.82, 0.014),
    new THREE.Vector3(0.94, -0.73, 0.014),
    new THREE.Vector3(0.43, -0.62, 0.014),
    new THREE.Vector3(0.04, -0.58, 0.014)
  ], 0.011, 64, true);
  const right_sail_border = new THREE.Mesh(right_sail_borderGeom, sail_seamMat);
  right_sail_border.name = "right_sail_border";
  right_sail_border.renderOrder = 2;
  sail_group.add(right_sail_border);

  const main_upper_seamGeom = makeTubeGeometry([
    new THREE.Vector3(-0.022, 1.55, 0.017),
    new THREE.Vector3(-0.27, 1.48, 0.017),
    new THREE.Vector3(-0.52, 1.08, 0.017)
  ], 0.005, 12, false);
  const main_upper_seam = new THREE.Mesh(main_upper_seamGeom, sail_seamMat);
  main_upper_seam.name = "main_upper_seam";
  main_upper_seam.renderOrder = 2;
  sail_group.add(main_upper_seam);

  const main_lower_seamGeom = makeTubeGeometry([
    new THREE.Vector3(-0.025, 0.55, 0.017),
    new THREE.Vector3(-0.39, 0.45, 0.017),
    new THREE.Vector3(-0.83, -0.18, 0.017)
  ], 0.005, 14, false);
  const main_lower_seam = new THREE.Mesh(main_lower_seamGeom, sail_seamMat);
  main_lower_seam.name = "main_lower_seam";
  main_lower_seam.renderOrder = 2;
  sail_group.add(main_lower_seam);

  const main_radial_seamGeom = makeTubeGeometry([
    new THREE.Vector3(-0.022, -0.55, 0.017),
    new THREE.Vector3(-0.39, -0.39, 0.017),
    new THREE.Vector3(-0.91, -0.63, 0.017)
  ], 0.005, 14, false);
  const main_radial_seam = new THREE.Mesh(main_radial_seamGeom, sail_seamMat);
  main_radial_seam.name = "main_radial_seam";
  main_radial_seam.renderOrder = 2;
  sail_group.add(main_radial_seam);

  const right_upper_seamGeom = makeTubeGeometry([
    new THREE.Vector3(0.022, 1.42, 0.017),
    new THREE.Vector3(0.27, 1.35, 0.017),
    new THREE.Vector3(0.51, 1.01, 0.017)
  ], 0.005, 12, false);
  const right_upper_seam = new THREE.Mesh(right_upper_seamGeom, sail_seamMat);
  right_upper_seam.name = "right_upper_seam";
  right_upper_seam.renderOrder = 2;
  sail_group.add(right_upper_seam);

  const right_middle_seamGeom = makeTubeGeometry([
    new THREE.Vector3(0.025, 0.25, 0.017),
    new THREE.Vector3(0.43, 0.16, 0.017),
    new THREE.Vector3(0.89, -0.22, 0.017)
  ], 0.005, 14, false);
  const right_middle_seam = new THREE.Mesh(right_middle_seamGeom, sail_seamMat);
  right_middle_seam.name = "right_middle_seam";
  right_middle_seam.renderOrder = 2;
  sail_group.add(right_middle_seam);

  const right_radial_seamGeom = makeTubeGeometry([
    new THREE.Vector3(0.025, -0.55, 0.017),
    new THREE.Vector3(0.42, -0.42, 0.017),
    new THREE.Vector3(0.94, -0.64, 0.017)
  ], 0.005, 14, false);
  const right_radial_seam = new THREE.Mesh(right_radial_seamGeom, sail_seamMat);
  right_radial_seam.name = "right_radial_seam";
  right_radial_seam.renderOrder = 2;
  sail_group.add(right_radial_seam);

  const main_tack_patchShape = new THREE.Shape();
  main_tack_patchShape.moveTo(-0.03, -0.58);
  main_tack_patchShape.lineTo(-0.23, -0.57);
  main_tack_patchShape.lineTo(-0.03, -0.35);
  main_tack_patchShape.closePath();
  const main_tack_patchGeom = new THREE.ShapeGeometry(main_tack_patchShape);
  const main_tack_patch = new THREE.Mesh(main_tack_patchGeom, reinforcementMat);
  main_tack_patch.name = "main_tack_patch";
  main_tack_patch.position.z = 0.019;
  main_tack_patch.renderOrder = 2;
  sail_group.add(main_tack_patch);

  const right_clew_patchShape = new THREE.Shape();
  right_clew_patchShape.moveTo(1.55, -0.82);
  right_clew_patchShape.lineTo(1.25, -0.76);
  right_clew_patchShape.lineTo(1.36, -0.52);
  right_clew_patchShape.closePath();
  const right_clew_patchGeom = new THREE.ShapeGeometry(right_clew_patchShape);
  const right_clew_patch = new THREE.Mesh(right_clew_patchGeom, reinforcementMat);
  right_clew_patch.name = "right_clew_patch";
  right_clew_patch.position.z = 0.019;
  right_clew_patch.renderOrder = 2;
  sail_group.add(right_clew_patch);

  const right_tack_patchShape = new THREE.Shape();
  right_tack_patchShape.moveTo(0.03, -0.58);
  right_tack_patchShape.lineTo(0.22, -0.58);
  right_tack_patchShape.lineTo(0.025, -0.38);
  right_tack_patchShape.closePath();
  const right_tack_patchGeom = new THREE.ShapeGeometry(right_tack_patchShape);
  const right_tack_patch = new THREE.Mesh(right_tack_patchGeom, reinforcementMat);
  right_tack_patch.name = "right_tack_patch";
  right_tack_patch.position.z = 0.019;
  right_tack_patch.renderOrder = 2;
  sail_group.add(right_tack_patch);

  const mastGeom = new THREE.CylinderGeometry(0.045, 0.052, 3.42, 24);
  const mast = new THREE.Mesh(mastGeom, woodMat);
  mast.name = "mast";
  mast.position.set(0, 0.79, 0.085);
  frame_group.add(mast);

  const mast_top_capGeom = new THREE.SphereGeometry(0.047, 18, 10);
  const mast_top_cap = new THREE.Mesh(mast_top_capGeom, woodMat);
  mast_top_cap.name = "mast_top_cap";
  mast_top_cap.position.set(0, 2.5, 0.085);
  mast_top_cap.scale.set(1, 0.58, 1);
  frame_group.add(mast_top_cap);

  const mast_bottom_capGeom = new THREE.SphereGeometry(0.05, 18, 10);
  const mast_bottom_cap = new THREE.Mesh(mast_bottom_capGeom, dark_woodMat);
  mast_bottom_cap.name = "mast_bottom_cap";
  mast_bottom_cap.position.set(0, -0.92, 0.085);
  mast_bottom_cap.scale.set(1, 0.5, 1);
  frame_group.add(mast_bottom_cap);

  const boomsail_start = new THREE.Vector3(-0.01, -0.58, 0.105);
  const boomsail_end = new THREE.Vector3(-1.52, -1.0, 0.105);
  const boomsail_length = boomsail_start.distanceTo(boomsail_end);
  const boomsailGeom = new THREE.CylinderGeometry(
    0.033,
    0.043,
    boomsail_length,
    20
  );
  const boomsail = new THREE.Mesh(boomsailGeom, woodMat);
  boomsail.name = "boomsail";
  orientCylinder(boomsail, boomsail_start, boomsail_end);
  frame_group.add(boomsail);

  const boom_right_start = new THREE.Vector3(-0.01, -0.58, 0.11);
  const boom_right_end = new THREE.Vector3(1.62, -0.58, 0.11);
  const boom_right_length = boom_right_start.distanceTo(boom_right_end);
  const boom_rightGeom = new THREE.CylinderGeometry(
    0.037,
    0.043,
    boom_right_length,
    20
  );
  const boom_right = new THREE.Mesh(boom_rightGeom, woodMat);
  boom_right.name = "boom_right";
  orientCylinder(boom_right, boom_right_start, boom_right_end);
  frame_group.add(boom_right);

  const boom_end_capGeom = new THREE.SphereGeometry(0.043, 16, 10);

  const boomsail_end_cap = new THREE.Mesh(boom_end_capGeom, woodMat);
  boomsail_end_cap.name = "boomsail_end_cap";
  boomsail_end_cap.position.copy(boomsail_end);
  boomsail_end_cap.scale.set(1.05, 1, 1);
  frame_group.add(boomsail_end_cap);

  const boom_right_end_cap = new THREE.Mesh(boom_end_capGeom, woodMat);
  boom_right_end_cap.name = "boom_right_end_cap";
  boom_right_end_cap.position.copy(boom_right_end);
  boom_right_end_cap.scale.set(1.05, 1, 1);
  frame_group.add(boom_right_end_cap);

  const boom_jointGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.09, 20);
  const boom_joint = new THREE.Mesh(boom_jointGeom, dark_woodMat);
  boom_joint.name = "boom_joint";
  boom_joint.position.set(0, -0.59, 0.115);
  frame_group.add(boom_joint);

  const boom_direction = new THREE.Vector3()
    .subVectors(boomsail_end, boomsail_start)
    .normalize();
  const boom_sleeve_start = boomsail_end.clone().addScaledVector(boom_direction, -0.07);
  const boom_sleeve_end = boomsail_end.clone().addScaledVector(boom_direction, 0.015);
  const boomsail_end_sleeveGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    boom_sleeve_start.distanceTo(boom_sleeve_end),
    16
  );
  const boomsail_end_sleeve = new THREE.Mesh(boomsail_end_sleeveGeom, fittingMat);
  boomsail_end_sleeve.name = "boomsail_end_sleeve";
  orientCylinder(boomsail_end_sleeve, boom_sleeve_start, boom_sleeve_end);
  frame_group.add(boomsail_end_sleeve);

  const mast_lashingGeom = new THREE.TorusGeometry(0.057, 0.008, 8, 24);

  const top_lashing_upper = new THREE.Mesh(mast_lashingGeom, ropeMat);
  top_lashing_upper.name = "top_lashing_upper";
  top_lashing_upper.rotation.x = Math.PI / 2;
  top_lashing_upper.position.set(0, 2.34, 0.088);
  rigging_group.add(top_lashing_upper);

  const top_lashing_lower = new THREE.Mesh(mast_lashingGeom, ropeMat);
  top_lashing_lower.name = "top_lashing_lower";
  top_lashing_lower.rotation.x = Math.PI / 2;
  top_lashing_lower.position.set(0, 2.31, 0.088);
  rigging_group.add(top_lashing_lower);

  const boom_lashing_upper = new THREE.Mesh(mast_lashingGeom, ropeMat);
  boom_lashing_upper.name = "boom_lashing_upper";
  boom_lashing_upper.rotation.x = Math.PI / 2;
  boom_lashing_upper.position.set(0, -0.55, 0.115);
  rigging_group.add(boom_lashing_upper);

  const boom_lashing_lower = new THREE.Mesh(mast_lashingGeom, ropeMat);
  boom_lashing_lower.name = "boom_lashing_lower";
  boom_lashing_lower.rotation.x = Math.PI / 2;
  boom_lashing_lower.position.set(0, -0.58, 0.115);
  rigging_group.add(boom_lashing_lower);

  const top_halyardGeom = makeTubeGeometry([
    new THREE.Vector3(-0.055, 2.39, 0.15),
    new THREE.Vector3(0.015, 2.35, 0.17),
    new THREE.Vector3(0.075, 2.27, 0.16),
    new THREE.Vector3(0.025, 2.20, 0.14)
  ], 0.008, 18, false);
  const top_halyard = new THREE.Mesh(top_halyardGeom, ropeMat);
  top_halyard.name = "top_halyard";
  rigging_group.add(top_halyard);

  const top_knotGeom = new THREE.SphereGeometry(0.022, 12, 8);
  const top_knot = new THREE.Mesh(top_knotGeom, ropeMat);
  top_knot.name = "top_knot";
  top_knot.position.set(-0.048, 2.38, 0.15);
  rigging_group.add(top_knot);

  const lower_tieGeom = makeTubeGeometry([
    new THREE.Vector3(0.045, -0.58, 0.16),
    new THREE.Vector3(0.055, -0.65, 0.165),
    new THREE.Vector3(0.035, -0.72, 0.15)
  ], 0.007, 12, false);
  const lower_tie = new THREE.Mesh(lower_tieGeom, ropeMat);
  lower_tie.name = "lower_tie";
  rigging_group.add(lower_tie);

  const clew_tieGeom = makeTubeGeometry([
    new THREE.Vector3(1.55, -0.82, 0.13),
    new THREE.Vector3(1.58, -0.77, 0.15),
    new THREE.Vector3(1.59, -0.70, 0.14)
  ], 0.007, 10, false);
  const clew_tie = new THREE.Mesh(clew_tieGeom, ropeMat);
  clew_tie.name = "clew_tie";
  rigging_group.add(clew_tie);

  const left_sheetGeom = makeTubeGeometry([
    new THREE.Vector3(-1.52, -1.0, 0.13),
    new THREE.Vector3(-1.58, -1.04, 0.13),
    new THREE.Vector3(-1.68, -1.08, 0.12),
    new THREE.Vector3(-1.73, -1.04, 0.11)
  ], 0.007, 16, false);
  const left_sheet = new THREE.Mesh(left_sheetGeom, ropeMat);
  left_sheet.name = "left_sheet";
  rigging_group.add(left_sheet);

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
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "root";

  const gear_assembly = new THREE.Group();
  gear_assembly.name = "gear_assembly";
  root.add(gear_assembly);

  const gear_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const central_recessMat = new THREE.MeshStandardMaterial({
    color: 0x7f8384,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });

  const dark_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x292b2c,
    metalness: 0.2,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const bore_wallMat = new THREE.MeshStandardMaterial({
    color: 0x343637,
    metalness: 0.35,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const tooth_count = 20;
  const outer_radius = 1.0;
  const shoulder_radius = 0.875;
  const root_radius = 0.805;
  const bore_radius = 0.205;
  const body_depth = 0.16;
  const pitch = Math.PI * 2 / tooth_count;

  const gear_bodyShape = new THREE.Shape();
  for (let i = 0; i < tooth_count; i++) {
    const center_angle = i * pitch;
    const profile_points = [
      [center_angle - pitch * 0.50, root_radius],
      [center_angle - pitch * 0.34, root_radius],
      [center_angle - pitch * 0.25, shoulder_radius],
      [center_angle - pitch * 0.18, outer_radius],
      [center_angle + pitch * 0.18, outer_radius],
      [center_angle + pitch * 0.25, shoulder_radius],
      [center_angle + pitch * 0.34, root_radius],
    ];

    for (let j = 0; j < profile_points.length; j++) {
      const angle = profile_points[j][0];
      const radius = profile_points[j][1];
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0 && j === 0) {
        gear_bodyShape.moveTo(x, y);
      } else {
        gear_bodyShape.lineTo(x, y);
      }
    }
  }
  gear_bodyShape.closePath();

  const gear_bodyHole = new THREE.Path();
  gear_bodyHole.absarc(0, 0, bore_radius, 0, Math.PI * 2, true);
  gear_bodyShape.holes.push(gear_bodyHole);

  const gear_bodyGeom = new THREE.ExtrudeGeometry(gear_bodyShape, {
    depth: body_depth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 20,
  });
  gear_bodyGeom.translate(0, 0, -body_depth / 2);

  const gear_body = new THREE.Mesh(gear_bodyGeom, gear_bodyMat);
  gear_body.name = "gear_body";
  gear_assembly.add(gear_body);

  const front_face = body_depth / 2 + 0.019;

  const central_recessGeom = new THREE.RingGeometry(
    bore_radius,
    0.605,
    80,
    1
  );
  const central_recess = new THREE.Mesh(central_recessGeom, central_recessMat);
  central_recess.name = "central_recess";
  central_recess.position.z = front_face + 0.001;
  gear_assembly.add(central_recess);

  const recess_outer_grooveGeom = new THREE.TorusGeometry(
    0.615,
    0.012,
    8,
    80
  );
  const recess_outer_groove = new THREE.Mesh(
    recess_outer_grooveGeom,
    dark_grooveMat
  );
  recess_outer_groove.name = "recess_outer_groove";
  recess_outer_groove.position.z = front_face + 0.003;
  gear_assembly.add(recess_outer_groove);

  const bore_collarMat = gear_bodyMat;
  const bore_collarGeom = new THREE.TorusGeometry(0.275, 0.058, 14, 64);
  const bore_collar = new THREE.Mesh(bore_collarGeom, bore_collarMat);
  bore_collar.name = "bore_collar";
  bore_collar.position.z = front_face + 0.012;
  gear_assembly.add(bore_collar);

  const bore_lip_grooveGeom = new THREE.TorusGeometry(0.211, 0.009, 8, 64);
  const bore_lip_groove = new THREE.Mesh(
    bore_lip_grooveGeom,
    dark_grooveMat
  );
  bore_lip_groove.name = "bore_lip_groove";
  bore_lip_groove.position.z = front_face + 0.022;
  gear_assembly.add(bore_lip_groove);

  const bore_wallGeom = new THREE.CylinderGeometry(
    bore_radius * 0.985,
    bore_radius * 0.985,
    body_depth + 0.04,
    48,
    1,
    true
  );
  const bore_wall = new THREE.Mesh(bore_wallGeom, bore_wallMat);
  bore_wall.name = "bore_wall";
  bore_wall.rotation.x = Math.PI / 2;
  gear_assembly.add(bore_wall);

  const bore_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x151617,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const bore_shadowGeom = new THREE.CircleGeometry(bore_radius * 0.94, 48);
  const bore_shadow = new THREE.Mesh(bore_shadowGeom, bore_shadowMat);
  bore_shadow.name = "bore_shadow";
  bore_shadow.position.z = -body_depth / 2 - 0.027;
  gear_assembly.add(bore_shadow);

  const radial_slotShape = new THREE.Shape();
  radial_slotShape.moveTo(0.205, -0.024);
  radial_slotShape.lineTo(0.655, -0.039);
  radial_slotShape.lineTo(0.695, 0.010);
  radial_slotShape.lineTo(0.655, 0.050);
  radial_slotShape.lineTo(0.205, 0.030);
  radial_slotShape.closePath();

  const radial_slotGeom = new THREE.ShapeGeometry(radial_slotShape, 1);
  const radial_slot = new THREE.Mesh(radial_slotGeom, dark_grooveMat);
  radial_slot.name = "radial_slot";
  radial_slot.position.z = front_face + 0.005;
  gear_assembly.add(radial_slot);

  const stress_relief_cutPoints = [
    new THREE.Vector3(0.205, 0.035, front_face + 0.006),
    new THREE.Vector3(0.225, 0.145, front_face + 0.006),
    new THREE.Vector3(0.270, 0.255, front_face + 0.006),
    new THREE.Vector3(0.330, 0.315, front_face + 0.006),
    new THREE.Vector3(0.395, 0.305, front_face + 0.006),
    new THREE.Vector3(0.430, 0.245, front_face + 0.006),
  ];
  const stress_relief_cutCurve = new THREE.CatmullRomCurve3(
    stress_relief_cutPoints,
    false,
    "centripetal"
  );
  const stress_relief_cutGeom = new THREE.TubeGeometry(
    stress_relief_cutCurve,
    28,
    0.009,
    6,
    false
  );
  const stress_relief_cut = new THREE.Mesh(
    stress_relief_cutGeom,
    dark_grooveMat
  );
  stress_relief_cut.name = "stress_relief_cut";
  gear_assembly.add(stress_relief_cut);

  const machining_marksGeom = new THREE.BoxGeometry(0.14, 0.004, 0.003);
  const machining_marksMat = new THREE.MeshStandardMaterial({
    color: 0x5f6263,
    metalness: 0.25,
    roughness: 0.8,
  });
  const machining_marks = new THREE.InstancedMesh(
    machining_marksGeom,
    machining_marksMat,
    12
  );
  machining_marks.name = "machining_marks";

  const machining_mark_transform = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2 + 0.11;
    const radius = 0.38 + (i % 4) * 0.067;
    machining_mark_transform.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      front_face + 0.005
    );
    machining_mark_transform.rotation.set(
      0,
      0,
      angle + ((i % 3) - 1) * 0.43
    );
    machining_mark_transform.scale.set(0.55 + (i % 5) * 0.11, 1, 1);
    machining_mark_transform.updateMatrix();
    machining_marks.setMatrixAt(i, machining_mark_transform.matrix);
  }
  machining_marks.instanceMatrix.needsUpdate = true;
  gear_assembly.add(machining_marks);

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
export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "screwdriver";

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  root.add(handle_assembly);

  const metal_assembly = new THREE.Group();
  metal_assembly.name = "metal_assembly";
  root.add(metal_assembly);

  const tip_assembly = new THREE.Group();
  tip_assembly.name = "tip_assembly";
  root.add(tip_assembly);

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.0,
    roughness: 0.8
  });

  const gripInsetMat = new THREE.MeshStandardMaterial({
    color: 0x090a0c,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const endCapMat = new THREE.MeshStandardMaterial({
    color: 0xe43d36,
    metalness: 0.0,
    roughness: 0.3
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08d57,
    metalness: 0.6,
    roughness: 0.2
  });

  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const wornMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const handleProfile = [
    new THREE.Vector2(0.000, -1.650),
    new THREE.Vector2(0.335, -1.650),
    new THREE.Vector2(0.350, -1.520),
    new THREE.Vector2(0.380, -1.300),
    new THREE.Vector2(0.420, -0.950),
    new THREE.Vector2(0.440, -0.600),
    new THREE.Vector2(0.430, -0.300),
    new THREE.Vector2(0.380, -0.030),
    new THREE.Vector2(0.300, 0.220),
    new THREE.Vector2(0.225, 0.410),
    new THREE.Vector2(0.195, 0.480),
    new THREE.Vector2(0.000, 0.480)
  ];
  const handleGeom = new THREE.LatheGeometry(handleProfile, 48);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  handle.rotation.x = Math.PI / 2;
  handle_assembly.add(handle);

  const end_capProfile = [
    new THREE.Vector2(0.000, -2.050),
    new THREE.Vector2(0.160, -2.035),
    new THREE.Vector2(0.280, -1.980),
    new THREE.Vector2(0.350, -1.880),
    new THREE.Vector2(0.380, -1.730),
    new THREE.Vector2(0.375, -1.620),
    new THREE.Vector2(0.000, -1.620)
  ];
  const end_capGeom = new THREE.LatheGeometry(end_capProfile, 48);
  const end_cap = new THREE.Mesh(end_capGeom, endCapMat);
  end_cap.name = "end_cap";
  end_cap.rotation.x = Math.PI / 2;
  handle_assembly.add(end_cap);

  const end_cap_seamGeom = new THREE.TorusGeometry(0.365, 0.012, 8, 40);
  const end_cap_seam = new THREE.Mesh(end_cap_seamGeom, gripInsetMat);
  end_cap_seam.name = "end_cap_seam";
  end_cap_seam.position.z = -1.635;
  handle_assembly.add(end_cap_seam);

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

  const upper_grip_insetShape = roundedRectShape(0.34, 0.72, 0.075);
  const upper_grip_insetGeom = new THREE.ShapeGeometry(upper_grip_insetShape, 12);
  const upper_grip_inset = new THREE.Mesh(upper_grip_insetGeom, gripInsetMat);
  upper_grip_inset.name = "upper_grip_inset";
  upper_grip_inset.rotation.x = -Math.PI / 2;
  upper_grip_inset.position.set(0, 0.438, -1.020);
  handle_assembly.add(upper_grip_inset);

  const side_grip_insetShape = roundedRectShape(0.27, 0.52, 0.065);
  const side_grip_insetGeom = new THREE.ShapeGeometry(side_grip_insetShape, 12);
  const side_grip_inset = new THREE.Mesh(side_grip_insetGeom, gripInsetMat);
  side_grip_inset.name = "side_grip_inset";
  side_grip_inset.rotation.y = Math.PI / 2;
  side_grip_inset.position.set(0.438, 0, -1.020);
  handle_assembly.add(side_grip_inset);

  const brass_ferruleGeom = new THREE.CylinderGeometry(
    0.205,
    0.245,
    0.220,
    40,
    1,
    true
  );
  const brass_ferrule = new THREE.Mesh(brass_ferruleGeom, brassMat);
  brass_ferrule.name = "brass_ferrule";
  brass_ferrule.rotation.x = Math.PI / 2;
  brass_ferrule.position.z = 0.490;
  metal_assembly.add(brass_ferrule);

  const ferrule_faceGeom = new THREE.RingGeometry(0.086, 0.205, 40);
  const ferrule_face = new THREE.Mesh(ferrule_faceGeom, brassMat);
  ferrule_face.name = "ferrule_face";
  ferrule_face.position.z = 0.602;
  metal_assembly.add(ferrule_face);

  const ferrule_back_rimGeom = new THREE.TorusGeometry(0.224, 0.021, 8, 40);
  const ferrule_back_rim = new THREE.Mesh(ferrule_back_rimGeom, brassMat);
  ferrule_back_rim.name = "ferrule_back_rim";
  ferrule_back_rim.position.z = 0.380;
  metal_assembly.add(ferrule_back_rim);

  const ferrule_front_rimGeom = new THREE.TorusGeometry(0.184, 0.021, 8, 40);
  const ferrule_front_rim = new THREE.Mesh(ferrule_front_rimGeom, brassMat);
  ferrule_front_rim.name = "ferrule_front_rim";
  ferrule_front_rim.position.z = 0.604;
  metal_assembly.add(ferrule_front_rim);

  const shaft_socketGeom = new THREE.CylinderGeometry(
    0.087,
    0.087,
    0.060,
    32,
    1,
    true
  );
  const shaft_socket = new THREE.Mesh(shaft_socketGeom, wornMetalMat);
  shaft_socket.name = "shaft_socket";
  shaft_socket.rotation.x = Math.PI / 2;
  shaft_socket.position.z = 0.588;
  metal_assembly.add(shaft_socket);

  const shaftGeom = new THREE.CylinderGeometry(0.066, 0.066, 1.720, 32);
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.name = "shaft";
  shaft.rotation.x = Math.PI / 2;
  shaft.position.z = 1.450;
  metal_assembly.add(shaft);

  const shaft_base_ringGeom = new THREE.TorusGeometry(0.067, 0.007, 8, 32);
  const shaft_base_ring = new THREE.Mesh(shaft_base_ringGeom, wornMetalMat);
  shaft_base_ring.name = "shaft_base_ring";
  shaft_base_ring.position.z = 0.625;
  metal_assembly.add(shaft_base_ring);

  const tip_collarGeom = new THREE.CylinderGeometry(0.112, 0.112, 0.130, 32);
  const tip_collar = new THREE.Mesh(tip_collarGeom, wornMetalMat);
  tip_collar.name = "tip_collar";
  tip_collar.rotation.x = Math.PI / 2;
  tip_collar.position.z = 2.285;
  tip_assembly.add(tip_collar);

  const tip_collar_ringGeom = new THREE.TorusGeometry(0.094, 0.020, 8, 32);
  const tip_collar_ring = new THREE.Mesh(tip_collar_ringGeom, wornMetalMat);
  tip_collar_ring.name = "tip_collar_ring";
  tip_collar_ring.position.z = 2.345;
  tip_assembly.add(tip_collar_ring);

  const tip_neckGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.190, 28);
  const tip_neck = new THREE.Mesh(tip_neckGeom, wornMetalMat);
  tip_neck.name = "tip_neck";
  tip_neck.rotation.x = Math.PI / 2;
  tip_neck.position.z = 2.405;
  tip_assembly.add(tip_neck);

  const tip_threadPoints = [];
  const threadSteps = 80;
  const threadTurns = 3.25;
  for (let i = 0; i <= threadSteps; i++) {
    const t = i / threadSteps;
    const angle = t * threadTurns * Math.PI * 2;
    const radius = 0.098 + Math.sin(t * Math.PI) * 0.008;
    tip_threadPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        2.330 + t * 0.390
      )
    );
  }
  const tip_threadCurve = new THREE.CatmullRomCurve3(
    tip_threadPoints,
    false,
    "centripetal"
  );
  const tip_threadGeom = new THREE.TubeGeometry(
    tip_threadCurve,
    120,
    0.021,
    7,
    false
  );
  const tip_thread = new THREE.Mesh(tip_threadGeom, wornMetalMat);
  tip_thread.name = "tip_thread";
  tip_assembly.add(tip_thread);

  const pointed_tipGeom = new THREE.ConeGeometry(0.135, 0.360, 4);
  const pointed_tip = new THREE.Mesh(pointed_tipGeom, wornMetalMat);
  pointed_tip.name = "pointed_tip";
  pointed_tip.rotation.set(Math.PI / 2, Math.PI / 4, 0);
  pointed_tip.position.z = 2.690;
  tip_assembly.add(pointed_tip);

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
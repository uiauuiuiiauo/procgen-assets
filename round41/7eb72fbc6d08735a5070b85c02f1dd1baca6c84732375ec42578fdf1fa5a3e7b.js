export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "pulley";

  const pulley_body = new THREE.Group();
  pulley_body.name = "pulley_body";
  root.add(pulley_body);

  const front_assembly = new THREE.Group();
  front_assembly.name = "front_assembly";
  root.add(front_assembly);

  const rear_assembly = new THREE.Group();
  rear_assembly.name = "rear_assembly";
  root.add(rear_assembly);

  const grainSize = 64;
  const grainData = new Uint8Array(grainSize * grainSize * 4);
  for (let i = 0; i < grainSize * grainSize; i++) {
    const x = i % grainSize;
    const y = Math.floor(i / grainSize);
    const value = 108 + ((x * 37 + y * 61 + x * y * 13 + (x * x + y * y) * 3) % 42);
    const offset = i * 4;
    grainData[offset] = value;
    grainData[offset + 1] = value;
    grainData[offset + 2] = value;
    grainData[offset + 3] = 255;
  }
  const grainTexture = new THREE.DataTexture(
    grainData,
    grainSize,
    grainSize,
    THREE.RGBAFormat
  );
  grainTexture.wrapS = THREE.RepeatWrapping;
  grainTexture.wrapT = THREE.RepeatWrapping;
  grainTexture.repeat.set(12, 12);
  grainTexture.needsUpdate = true;

  const cast_ironMat = new THREE.MeshStandardMaterial({
    color: 0x3d3f42,
    metalness: 0.18,
    roughness: 0.9,
    bumpMap: grainTexture,
    bumpScale: 0.007
  });

  const raised_ironMat = new THREE.MeshStandardMaterial({
    color: 0x484a4e,
    metalness: 0.2,
    roughness: 0.82,
    bumpMap: grainTexture,
    bumpScale: 0.006
  });

  const recessed_ironMat = new THREE.MeshStandardMaterial({
    color: 0x292b2e,
    metalness: 0.12,
    roughness: 0.94,
    bumpMap: grainTexture,
    bumpScale: 0.008
  });

  const boreMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.08,
    roughness: 0.96,
    bumpMap: grainTexture,
    bumpScale: 0.005,
    side: THREE.DoubleSide
  });

  const rear_flangeProfile = [
    new THREE.Vector2(0.14, -0.30),
    new THREE.Vector2(0.58, -0.30),
    new THREE.Vector2(0.65, -0.285),
    new THREE.Vector2(0.70, -0.25),
    new THREE.Vector2(0.72, -0.21),
    new THREE.Vector2(0.70, -0.17),
    new THREE.Vector2(0.66, -0.145),
    new THREE.Vector2(0.57, -0.125),
    new THREE.Vector2(0.14, -0.125),
    new THREE.Vector2(0.14, -0.30)
  ];
  const rear_flangeGeom = new THREE.LatheGeometry(rear_flangeProfile, 64);
  const rear_flange = new THREE.Mesh(rear_flangeGeom, cast_ironMat);
  rear_flange.name = "rear_flange";
  rear_flange.rotation.x = Math.PI / 2;
  rear_assembly.add(rear_flange);

  const rear_edge_bandGeom = new THREE.TorusGeometry(0.64, 0.035, 12, 64);
  const rear_edge_band = new THREE.Mesh(rear_edge_bandGeom, raised_ironMat);
  rear_edge_band.name = "rear_edge_band";
  rear_edge_band.position.z = -0.255;
  rear_assembly.add(rear_edge_band);

  const rear_rimGeom = new THREE.TorusGeometry(0.575, 0.028, 12, 64);
  const rear_rim = new THREE.Mesh(rear_rimGeom, raised_ironMat);
  rear_rim.name = "rear_rim";
  rear_rim.position.z = -0.105;
  rear_assembly.add(rear_rim);

  const drive_sideProfile = [
    new THREE.Vector2(0.14, -0.15),
    new THREE.Vector2(0.49, -0.15),
    new THREE.Vector2(0.54, -0.12),
    new THREE.Vector2(0.565, -0.07),
    new THREE.Vector2(0.565, 0.07),
    new THREE.Vector2(0.54, 0.12),
    new THREE.Vector2(0.49, 0.15),
    new THREE.Vector2(0.14, 0.15),
    new THREE.Vector2(0.14, -0.15)
  ];
  const drive_sideGeom = new THREE.LatheGeometry(drive_sideProfile, 64);
  const drive_side = new THREE.Mesh(drive_sideGeom, cast_ironMat);
  drive_side.name = "drive_side";
  drive_side.rotation.x = Math.PI / 2;
  pulley_body.add(drive_side);

  const front_flangeProfile = [
    new THREE.Vector2(0.14, 0.10),
    new THREE.Vector2(0.57, 0.10),
    new THREE.Vector2(0.65, 0.115),
    new THREE.Vector2(0.70, 0.145),
    new THREE.Vector2(0.735, 0.185),
    new THREE.Vector2(0.75, 0.22),
    new THREE.Vector2(0.735, 0.255),
    new THREE.Vector2(0.70, 0.285),
    new THREE.Vector2(0.65, 0.31),
    new THREE.Vector2(0.60, 0.33),
    new THREE.Vector2(0.56, 0.34),
    new THREE.Vector2(0.52, 0.325),
    new THREE.Vector2(0.49, 0.30),
    new THREE.Vector2(0.46, 0.27),
    new THREE.Vector2(0.42, 0.245),
    new THREE.Vector2(0.37, 0.23),
    new THREE.Vector2(0.14, 0.23),
    new THREE.Vector2(0.14, 0.10)
  ];
  const front_flangeGeom = new THREE.LatheGeometry(front_flangeProfile, 64);
  const front_flange = new THREE.Mesh(front_flangeGeom, cast_ironMat);
  front_flange.name = "front_flange";
  front_flange.rotation.x = Math.PI / 2;
  front_assembly.add(front_flange);

  const front_outer_rimGeom = new THREE.TorusGeometry(0.615, 0.045, 16, 72);
  const front_outer_rim = new THREE.Mesh(front_outer_rimGeom, raised_ironMat);
  front_outer_rim.name = "front_outer_rim";
  front_outer_rim.position.z = 0.31;
  front_assembly.add(front_outer_rim);

  const front_recess_grooveGeom = new THREE.TorusGeometry(0.475, 0.026, 14, 64);
  const front_recess_groove = new THREE.Mesh(front_recess_grooveGeom, recessed_ironMat);
  front_recess_groove.name = "front_recess_groove";
  front_recess_groove.position.z = 0.286;
  front_assembly.add(front_recess_groove);

  const front_inner_ridgeGeom = new THREE.TorusGeometry(0.405, 0.025, 14, 64);
  const front_inner_ridge = new THREE.Mesh(front_inner_ridgeGeom, raised_ironMat);
  front_inner_ridge.name = "front_inner_ridge";
  front_inner_ridge.position.z = 0.267;
  front_assembly.add(front_inner_ridge);

  const front_hubProfile = [
    new THREE.Vector2(0.14, 0.14),
    new THREE.Vector2(0.31, 0.14),
    new THREE.Vector2(0.35, 0.17),
    new THREE.Vector2(0.37, 0.21),
    new THREE.Vector2(0.37, 0.30),
    new THREE.Vector2(0.355, 0.34),
    new THREE.Vector2(0.32, 0.365),
    new THREE.Vector2(0.27, 0.38),
    new THREE.Vector2(0.14, 0.38),
    new THREE.Vector2(0.14, 0.14)
  ];
  const front_hubGeom = new THREE.LatheGeometry(front_hubProfile, 64);
  const front_hub = new THREE.Mesh(front_hubGeom, raised_ironMat);
  front_hub.name = "front_hub";
  front_hub.rotation.x = Math.PI / 2;
  front_assembly.add(front_hub);

  const bore_bevelGeom = new THREE.TorusGeometry(0.165, 0.018, 12, 48);
  const bore_bevel = new THREE.Mesh(bore_bevelGeom, raised_ironMat);
  bore_bevel.name = "bore_bevel";
  bore_bevel.position.z = 0.382;
  front_assembly.add(bore_bevel);

  const inner_boreGeom = new THREE.CylinderGeometry(0.137, 0.137, 0.50, 48, 1, true);
  const inner_bore = new THREE.Mesh(inner_boreGeom, boreMat);
  inner_bore.name = "inner_bore";
  inner_bore.rotation.x = Math.PI / 2;
  inner_bore.position.z = 0.025;
  pulley_body.add(inner_bore);

  const rear_bore_shadowGeom = new THREE.CircleGeometry(0.132, 48);
  const rear_bore_shadow = new THREE.Mesh(rear_bore_shadowGeom, boreMat);
  rear_bore_shadow.name = "rear_bore_shadow";
  rear_bore_shadow.position.z = -0.292;
  rear_assembly.add(rear_bore_shadow);

  const belt_path = [];
  const beltPointCount = 48;
  const beltCenterY = -0.015;
  const beltCenterZ = -0.17;
  const beltRadiusY = 0.66;
  const beltRadiusZ = 0.22;
  for (let i = 0; i < beltPointCount; i++) {
    const angle = i / beltPointCount * Math.PI * 2;
    belt_path.push(new THREE.Vector3(
      Math.cos(angle) * 0.80,
      beltCenterY + Math.sin(angle) * beltRadiusY,
      beltCenterZ + Math.sin(angle) * beltRadiusZ
    ));
  }
  const belt_curve = new THREE.CatmullRomCurve3(belt_path, true, "centripetal");
  const belt_coreGeom = new THREE.TubeGeometry(belt_curve, 144, 0.075, 10, true);
  const belt_core = new THREE.Mesh(belt_coreGeom, recessed_ironMat);
  belt_core.name = "belt_core";
  root.add(belt_core);

  const belt_ribsShape = new THREE.Shape();
  belt_ribsShape.moveTo(-0.075, -0.032);
  belt_ribsShape.lineTo(0.075, -0.032);
  belt_ribsShape.lineTo(0.075, 0.032);
  belt_ribsShape.lineTo(-0.075, 0.032);
  belt_ribsShape.closePath();

  const belt_ribsGeom = new THREE.ExtrudeGeometry(belt_ribsShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  belt_ribsGeom.translate(0, 0, -0.07);

  const belt_ribCount = 12;
  const belt_ribs = new THREE.InstancedMesh(
    belt_ribsGeom,
    raised_ironMat,
    belt_ribCount
  );
  belt_ribs.name = "belt_ribs";

  const ribMatrix = new THREE.Matrix4();
  const ribRotationMatrix = new THREE.Matrix4();
  const ribQuaternion = new THREE.Quaternion();
  const ribScale = new THREE.Vector3(1, 1, 1);
  const ribXAxis = new THREE.Vector3();
  const ribYAxis = new THREE.Vector3();
  const ribZAxis = new THREE.Vector3();
  const ribPosition = new THREE.Vector3();

  for (let i = 0; i < belt_ribCount; i++) {
    const angle = i / belt_ribCount * Math.PI * 2;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    ribPosition.set(
      cosAngle * 0.80,
      beltCenterY + sinAngle * beltRadiusY,
      beltCenterZ + sinAngle * beltRadiusZ
    );

    ribXAxis.set(-sinAngle, 0, 0).normalize();
    ribYAxis.set(0, cosAngle * beltRadiusZ, sinAngle * beltRadiusZ).normalize();
    ribZAxis.crossVectors(ribXAxis, ribYAxis).normalize();

    ribRotationMatrix.makeBasis(ribXAxis, ribYAxis, ribZAxis);
    ribQuaternion.setFromRotationMatrix(ribRotationMatrix);
    ribMatrix.compose(ribPosition, ribQuaternion, ribScale);
    belt_ribs.setMatrixAt(i, ribMatrix);
  }
  belt_ribs.instanceMatrix.needsUpdate = true;
  root.add(belt_ribs);

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
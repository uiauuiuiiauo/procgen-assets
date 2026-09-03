export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "stainless_steel_infuser_mug";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const perforationMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, -0.500),
    new THREE.Vector2(0.270, -0.500),
    new THREE.Vector2(0.315, -0.488),
    new THREE.Vector2(0.345, -0.455),
    new THREE.Vector2(0.360, -0.390),
    new THREE.Vector2(0.365, 0.340),
    new THREE.Vector2(0.370, 0.385),
    new THREE.Vector2(0.365, 0.410),
    new THREE.Vector2(0.000, 0.410),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const body_rimGeom = new THREE.TorusGeometry(0.365, 0.010, 10, 64);
  const body_rim = new THREE.Mesh(body_rimGeom, handleMat);
  body_rim.name = "body_rim";
  body_rim.rotation.x = Math.PI / 2;
  body_rim.position.y = 0.405;
  root.add(body_rim);

  const lid_assembly = new THREE.Group();
  lid_assembly.name = "lid_assembly";
  root.add(lid_assembly);

  const lidProfile = [
    new THREE.Vector2(0.000, 0.414),
    new THREE.Vector2(0.355, 0.414),
    new THREE.Vector2(0.405, 0.423),
    new THREE.Vector2(0.445, 0.442),
    new THREE.Vector2(0.468, 0.463),
    new THREE.Vector2(0.470, 0.482),
    new THREE.Vector2(0.454, 0.505),
    new THREE.Vector2(0.415, 0.528),
    new THREE.Vector2(0.340, 0.546),
    new THREE.Vector2(0.220, 0.558),
    new THREE.Vector2(0.000, 0.565),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, lidMat);
  lid.name = "lid";
  lid_assembly.add(lid);

  const lid_edgeGeom = new THREE.TorusGeometry(0.462, 0.012, 12, 64);
  const lid_edge = new THREE.Mesh(lid_edgeGeom, handleMat);
  lid_edge.name = "lid_edge";
  lid_edge.rotation.x = Math.PI / 2;
  lid_edge.position.y = 0.478;
  lid_assembly.add(lid_edge);

  const lid_seamGeom = new THREE.TorusGeometry(0.370, 0.005, 8, 64);
  const lid_seam = new THREE.Mesh(lid_seamGeom, perforationMat);
  lid_seam.name = "lid_seam";
  lid_seam.rotation.x = Math.PI / 2;
  lid_seam.position.y = 0.417;
  lid_assembly.add(lid_seam);

  const ringRadii = [0.095, 0.145, 0.195, 0.245, 0.295, 0.345];
  const ringCounts = [10, 14, 18, 22, 26, 30];
  let perforationCount = 0;
  for (let i = 0; i < ringCounts.length; i++) {
    perforationCount += ringCounts[i];
  }

  const lid_perforationsGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    0.0025,
    12
  );
  const lid_perforations = new THREE.InstancedMesh(
    lid_perforationsGeom,
    perforationMat,
    perforationCount
  );
  lid_perforations.name = "lid_perforations";

  const perforationTransform = new THREE.Object3D();
  let perforationIndex = 0;
  for (let ringIndex = 0; ringIndex < ringRadii.length; ringIndex++) {
    const radius = ringRadii[ringIndex];
    const count = ringCounts[ringIndex];
    const offset = ringIndex * 0.37;
    const holeScale = 0.78 + ringIndex * 0.065;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 0.569 - 0.035 * (radius / 0.47) * (radius / 0.47);

      perforationTransform.position.set(x, y, z);
      perforationTransform.rotation.set(0, 0, 0);
      perforationTransform.scale.set(holeScale, 1, holeScale);
      perforationTransform.updateMatrix();
      lid_perforations.setMatrixAt(
        perforationIndex,
        perforationTransform.matrix
      );
      perforationIndex++;
    }
  }
  lid_perforations.instanceMatrix.needsUpdate = true;
  lid_assembly.add(lid_perforations);

  const center_recessGeom = new THREE.CylinderGeometry(
    0.026,
    0.026,
    0.003,
    24
  );
  const center_recess = new THREE.Mesh(center_recessGeom, perforationMat);
  center_recess.name = "center_recess";
  center_recess.position.y = 0.566;
  lid_assembly.add(center_recess);

  const center_fastenerGeom = new THREE.CylinderGeometry(
    0.013,
    0.016,
    0.010,
    20
  );
  const center_fastener = new THREE.Mesh(center_fastenerGeom, handleMat);
  center_fastener.name = "center_fastener";
  center_fastener.position.y = 0.570;
  lid_assembly.add(center_fastener);

  const center_slotGeom = new THREE.BoxGeometry(0.022, 0.002, 0.005);
  const center_slot = new THREE.Mesh(center_slotGeom, perforationMat);
  center_slot.name = "center_slot";
  center_slot.position.y = 0.576;
  lid_assembly.add(center_slot);

  const handlePath = [
    new THREE.Vector3(0.350, 0.300, 0.000),
    new THREE.Vector3(0.445, 0.325, 0.000),
    new THREE.Vector3(0.555, 0.285, 0.000),
    new THREE.Vector3(0.635, 0.190, 0.000),
    new THREE.Vector3(0.670, 0.045, 0.000),
    new THREE.Vector3(0.660, -0.105, 0.000),
    new THREE.Vector3(0.590, -0.225, 0.000),
    new THREE.Vector3(0.475, -0.290, 0.000),
    new THREE.Vector3(0.350, -0.310, 0.000),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePath,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    64,
    0.045,
    12,
    false
  );
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.CapsuleGeometry(0.040, 0.090, 6, 12);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, handleMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.365, 0.292, 0);
  upper_handle_mount.scale.set(0.72, 1, 0.82);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, handleMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.365, -0.300, 0);
  lower_handle_mount.scale.set(0.72, 1, 0.82);
  root.add(lower_handle_mount);

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
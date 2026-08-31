export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "minimalist_bow_stand";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const mast_assembly = new THREE.Group();
  mast_assembly.name = "mast_assembly";
  root.add(mast_assembly);

  const bow_assembly = new THREE.Group();
  bow_assembly.name = "bow_assembly";
  root.add(bow_assembly);

  const rigging_assembly = new THREE.Group();
  rigging_assembly.name = "rigging_assembly";
  root.add(rigging_assembly);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08d57,
    metalness: 0.6,
    roughness: 0.2
  });

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x743a22,
    metalness: 0.0,
    roughness: 0.6
  });

  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3f2117,
    metalness: 0.0,
    roughness: 0.6
  });

  const cordMat = new THREE.MeshStandardMaterial({
    color: 0xc8b991,
    metalness: 0.0,
    roughness: 0.95
  });

  const wireMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  function createTube(points, radius, material, segments, radialSegments) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");

    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        segments,
        radius,
        radialSegments,
        false
      ),
      material
    );
  }

  const baseProfile = [
    new THREE.Vector2(0.00, 0.000),
    new THREE.Vector2(0.34, 0.000),
    new THREE.Vector2(0.405, 0.018),
    new THREE.Vector2(0.43, 0.045),
    new THREE.Vector2(0.43, 0.070),
    new THREE.Vector2(0.405, 0.098),
    new THREE.Vector2(0.34, 0.120),
    new THREE.Vector2(0.00, 0.120)
  ];
  const baseGeom = new THREE.LatheGeometry(baseProfile, 48);
  const base = new THREE.Mesh(baseGeom, brassMat);
  base.name = "base";
  base_assembly.add(base);

  const base_rimGeom = new THREE.TorusGeometry(0.414, 0.009, 8, 48);
  const base_rim = new THREE.Mesh(base_rimGeom, brassMat);
  base_rim.name = "base_rim";
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.057;
  base_assembly.add(base_rim);

  const pedestalProfile = [
    new THREE.Vector2(0.00, 0.105),
    new THREE.Vector2(0.060, 0.105),
    new THREE.Vector2(0.070, 0.145),
    new THREE.Vector2(0.055, 0.195),
    new THREE.Vector2(0.050, 0.245),
    new THREE.Vector2(0.075, 0.330),
    new THREE.Vector2(0.095, 0.445),
    new THREE.Vector2(0.085, 0.500),
    new THREE.Vector2(0.00, 0.500)
  ];
  const pedestalGeom = new THREE.LatheGeometry(pedestalProfile, 32);
  const pedestal = new THREE.Mesh(pedestalGeom, brassMat);
  pedestal.name = "pedestal";
  base_assembly.add(pedestal);

  const mast_socketGeom = new THREE.CylinderGeometry(0.068, 0.092, 0.20, 24);
  const mast_socket = new THREE.Mesh(mast_socketGeom, brassMat);
  mast_socket.name = "mast_socket";
  mast_socket.position.y = 0.49;
  mast_assembly.add(mast_socket);

  const mast_socket_openingGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.012, 24);
  const mast_socket_opening = new THREE.Mesh(mast_socket_openingGeom, darkWoodMat);
  mast_socket_opening.name = "mast_socket_opening";
  mast_socket_opening.position.y = 0.592;
  mast_assembly.add(mast_socket_opening);

  const mastGeom = new THREE.CylinderGeometry(0.029, 0.041, 3.34, 16);
  const mast = new THREE.Mesh(mastGeom, woodMat);
  mast.name = "mast";
  mast.position.y = 2.25;
  mast_assembly.add(mast);

  const mast_grain = createTube([
    new THREE.Vector3(0.010, 0.66, 0.039),
    new THREE.Vector3(0.014, 1.45, 0.036),
    new THREE.Vector3(0.008, 2.40, 0.033),
    new THREE.Vector3(0.012, 3.76, 0.029)
  ], 0.0022, darkWoodMat, 28, 5);
  mast_grain.name = "mast_grain";
  mast_assembly.add(mast_grain);

  const top_collarGeom = new THREE.CylinderGeometry(0.050, 0.047, 0.045, 24);
  const top_collar = new THREE.Mesh(top_collarGeom, brassMat);
  top_collar.name = "top_collar";
  top_collar.position.y = 3.91;
  mast_assembly.add(top_collar);

  const top_finialGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.37, 24);
  const top_finial = new THREE.Mesh(top_finialGeom, brassMat);
  top_finial.name = "top_finial";
  top_finial.position.y = 4.095;
  mast_assembly.add(top_finial);

  const finial_capGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.018, 24);
  const finial_cap = new THREE.Mesh(finial_capGeom, brassMat);
  finial_cap.name = "finial_cap";
  finial_cap.position.y = 4.285;
  mast_assembly.add(finial_cap);

  const bow_stavePoints = [
    new THREE.Vector3(-1.20, 1.70, -0.025),
    new THREE.Vector3(-1.17, 1.48, -0.025),
    new THREE.Vector3(-1.08, 1.18, -0.025),
    new THREE.Vector3(-0.92, 0.84, -0.025),
    new THREE.Vector3(-0.70, 0.57, -0.025),
    new THREE.Vector3(-0.42, 0.40, -0.025),
    new THREE.Vector3(-0.15, 0.34, -0.025),
    new THREE.Vector3(0.035, 0.36, -0.025)
  ];
  const bow_stave = createTube(bow_stavePoints, 0.034, brassMat, 64, 10);
  bow_stave.name = "bow_stave";
  bow_assembly.add(bow_stave);

  const bow_tipGeom = new THREE.SphereGeometry(0.035, 16, 10);
  const bow_tip = new THREE.Mesh(bow_tipGeom, brassMat);
  bow_tip.name = "bow_tip";
  bow_tip.position.set(-1.20, 1.70, -0.025);
  bow_tip.scale.set(1.0, 1.12, 1.0);
  bow_assembly.add(bow_tip);

  const bow_tip_bandGeom = new THREE.TorusGeometry(0.034, 0.004, 6, 20);
  const bow_tip_band = new THREE.Mesh(bow_tip_bandGeom, brassMat);
  bow_tip_band.name = "bow_tip_band";
  bow_tip_band.position.set(-1.183, 1.565, -0.025);
  bow_tip_band.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(-0.08, -0.62, 0).normalize()
  );
  bow_assembly.add(bow_tip_band);

  const bow_mountGeom = new THREE.BoxGeometry(0.11, 0.10, 0.10);
  const bow_mount = new THREE.Mesh(bow_mountGeom, brassMat);
  bow_mount.name = "bow_mount";
  bow_mount.position.set(0.025, 0.36, -0.005);
  bow_mount.rotation.z = -0.08;
  bow_assembly.add(bow_mount);

  const lower_limb_bindingGeom = new THREE.TorusGeometry(0.036, 0.004, 6, 18);
  const lower_limb_bindings = new THREE.InstancedMesh(
    lower_limb_bindingGeom,
    cordMat,
    3
  );
  lower_limb_bindings.name = "lower_limb_bindings";

  const bindingDummy = new THREE.Object3D();
  const bindingAxis = new THREE.Vector3(0, 0, 1);
  const lowerLimbTangent = new THREE.Vector3(0.55, 0.16, 0).normalize();

  for (let i = 0; i < 3; i++) {
    bindingDummy.position.set(
      -0.105 + i * 0.022,
      0.356 + i * 0.006,
      -0.025
    );
    bindingDummy.quaternion.setFromUnitVectors(bindingAxis, lowerLimbTangent);
    bindingDummy.scale.set(1, 1, 1);
    bindingDummy.updateMatrix();
    lower_limb_bindings.setMatrixAt(i, bindingDummy.matrix);
  }
  lower_limb_bindings.instanceMatrix.needsUpdate = true;
  bow_assembly.add(lower_limb_bindings);

  const crossbarPoints = [
    new THREE.Vector3(-1.08, 1.18, 0.055),
    new THREE.Vector3(-0.56, 1.205, 0.055),
    new THREE.Vector3(0.02, 1.23, 0.055),
    new THREE.Vector3(0.61, 1.24, 0.055)
  ];
  const crossbar = createTube(crossbarPoints, 0.032, woodMat, 40, 10);
  crossbar.name = "crossbar";
  bow_assembly.add(crossbar);

  const crossbar_left_fittingGeom = new THREE.CylinderGeometry(
    0.037,
    0.037,
    0.035,
    16
  );
  const crossbar_left_fitting = new THREE.Mesh(
    crossbar_left_fittingGeom,
    brassMat
  );
  crossbar_left_fitting.name = "crossbar_left_fitting";
  crossbar_left_fitting.rotation.z = Math.PI / 2;
  crossbar_left_fitting.position.set(-1.08, 1.18, 0.055);
  bow_assembly.add(crossbar_left_fitting);

  const crossbar_bindingGeom = new THREE.TorusGeometry(0.034, 0.0035, 6, 18);
  const crossbar_bindings = new THREE.InstancedMesh(
    crossbar_bindingGeom,
    cordMat,
    5
  );
  crossbar_bindings.name = "crossbar_bindings";

  const crossbarTangent = new THREE.Vector3(1, 0.045, 0).normalize();
  for (let i = 0; i < 5; i++) {
    bindingDummy.position.set(
      -0.395 + i * 0.018,
      1.219 + i * 0.001,
      0.055
    );
    bindingDummy.quaternion.setFromUnitVectors(bindingAxis, crossbarTangent);
    bindingDummy.scale.set(1, 1, 1);
    bindingDummy.updateMatrix();
    crossbar_bindings.setMatrixAt(i, bindingDummy.matrix);
  }
  crossbar_bindings.instanceMatrix.needsUpdate = true;
  bow_assembly.add(crossbar_bindings);

  const crossbar_end_capGeom = new THREE.SphereGeometry(0.046, 18, 10);
  const crossbar_end_cap = new THREE.Mesh(crossbar_end_capGeom, woodMat);
  crossbar_end_cap.name = "crossbar_end_cap";
  crossbar_end_cap.position.set(0.61, 1.24, 0.055);
  crossbar_end_cap.scale.set(1.12, 0.72, 0.78);
  bow_assembly.add(crossbar_end_cap);

  const crossbar_end_bandGeom = new THREE.TorusGeometry(0.039, 0.004, 6, 20);
  const crossbar_end_band = new THREE.Mesh(crossbar_end_bandGeom, brassMat);
  crossbar_end_band.name = "crossbar_end_band";
  crossbar_end_band.position.set(0.565, 1.238, 0.055);
  crossbar_end_band.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0.02, 0).normalize()
  );
  bow_assembly.add(crossbar_end_band);

  const upper_left_rigging = createTube([
    new THREE.Vector3(-0.026, 3.90, 0.075),
    new THREE.Vector3(-0.31, 2.55, 0.075),
    new THREE.Vector3(-0.69, 1.20, 0.075)
  ], 0.0045, wireMat, 36, 6);
  upper_left_rigging.name = "upper_left_rigging";
  rigging_assembly.add(upper_left_rigging);

  const upper_right_rigging = createTube([
    new THREE.Vector3(0.026, 3.90, 0.070),
    new THREE.Vector3(0.25, 2.55, 0.070),
    new THREE.Vector3(0.58, 1.24, 0.070)
  ], 0.0045, wireMat, 36, 6);
  upper_right_rigging.name = "upper_right_rigging";
  rigging_assembly.add(upper_right_rigging);

  const lower_left_rigging = createTube([
    new THREE.Vector3(-0.69, 1.20, 0.078),
    new THREE.Vector3(-0.34, 0.72, 0.078),
    new THREE.Vector3(-0.055, 0.39, 0.078)
  ], 0.0045, wireMat, 28, 6);
  lower_left_rigging.name = "lower_left_rigging";
  rigging_assembly.add(lower_left_rigging);

  const lower_right_rigging = createTube([
    new THREE.Vector3(0.58, 1.24, 0.076),
    new THREE.Vector3(0.34, 0.76, 0.076),
    new THREE.Vector3(0.055, 0.39, 0.076)
  ], 0.0045, wireMat, 28, 6);
  lower_right_rigging.name = "lower_right_rigging";
  rigging_assembly.add(lower_right_rigging);

  const diagonal_rigging = createTube([
    new THREE.Vector3(-1.075, 1.19, 0.086),
    new THREE.Vector3(-0.28, 1.68, 0.086),
    new THREE.Vector3(0.10, 2.08, 0.086)
  ], 0.0042, wireMat, 32, 6);
  diagonal_rigging.name = "diagonal_rigging";
  rigging_assembly.add(diagonal_rigging);

  const mast_right_cord = createTube([
    new THREE.Vector3(0.038, 0.60, 0.068),
    new THREE.Vector3(0.038, 2.25, 0.068),
    new THREE.Vector3(0.038, 3.89, 0.068)
  ], 0.0032, cordMat, 40, 6);
  mast_right_cord.name = "mast_right_cord";
  rigging_assembly.add(mast_right_cord);

  const rigging_anchorGeom = new THREE.SphereGeometry(0.013, 10, 6);
  const rigging_anchors = new THREE.InstancedMesh(
    rigging_anchorGeom,
    brassMat,
    7
  );
  rigging_anchors.name = "rigging_anchors";

  const anchorPositions = [
    new THREE.Vector3(-0.026, 3.90, 0.075),
    new THREE.Vector3(0.026, 3.90, 0.070),
    new THREE.Vector3(-0.69, 1.20, 0.078),
    new THREE.Vector3(0.58, 1.24, 0.076),
    new THREE.Vector3(-0.055, 0.39, 0.078),
    new THREE.Vector3(0.055, 0.39, 0.076),
    new THREE.Vector3(0.10, 2.08, 0.086)
  ];

  for (let i = 0; i < anchorPositions.length; i++) {
    bindingDummy.position.copy(anchorPositions[i]);
    bindingDummy.quaternion.identity();
    bindingDummy.scale.set(1, 1, 1);
    bindingDummy.updateMatrix();
    rigging_anchors.setMatrixAt(i, bindingDummy.matrix);
  }
  rigging_anchors.instanceMatrix.needsUpdate = true;
  rigging_assembly.add(rigging_anchors);

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
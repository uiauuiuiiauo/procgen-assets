export default function generate(THREE) {
  const root = new THREE.Group();

  const black_barrelMat = new THREE.MeshStandardMaterial({
    color: 0x0b0c0e,
    metalness: 0.0,
    roughness: 0.3,
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6aa45,
    metalness: 0.6,
    roughness: 0.2,
  });

  const knurlMat = new THREE.MeshStandardMaterial({
    color: 0xb98527,
    metalness: 0.6,
    roughness: 0.5,
  });

  const end_capMat = new THREE.MeshStandardMaterial({
    color: 0x202327,
    metalness: 0.0,
    roughness: 0.8,
  });

  const black_barrelProfile = [
    new THREE.Vector2(0.000, -1.66),
    new THREE.Vector2(0.165, -1.66),
    new THREE.Vector2(0.195, -1.63),
    new THREE.Vector2(0.205, -1.56),
    new THREE.Vector2(0.205, 1.56),
    new THREE.Vector2(0.198, 1.62),
    new THREE.Vector2(0.170, 1.66),
    new THREE.Vector2(0.000, 1.66),
  ];
  const black_barrelGeom = new THREE.LatheGeometry(black_barrelProfile, 48);
  const black_barrel = new THREE.Mesh(black_barrelGeom, black_barrelMat);
  black_barrel.rotation.z = -Math.PI / 2;
  root.add(black_barrel);

  const left_connectorGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.18, 32);
  const left_connector = new THREE.Mesh(left_connectorGeom, goldMat);
  left_connector.rotation.z = -Math.PI / 2;
  left_connector.position.x = -2.12;
  root.add(left_connector);

  const left_tipGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.28, 32);
  const left_tip = new THREE.Mesh(left_tipGeom, goldMat);
  left_tip.rotation.z = -Math.PI / 2;
  left_tip.position.x = -2.33;
  root.add(left_tip);

  const left_tip_faceGeom = new THREE.CylinderGeometry(0.076, 0.076, 0.014, 32);
  const left_tip_face = new THREE.Mesh(left_tip_faceGeom, goldMat);
  left_tip_face.rotation.z = -Math.PI / 2;
  left_tip_face.position.x = -2.476;
  root.add(left_tip_face);

  const left_tip_edgeGeom = new THREE.TorusGeometry(0.081, 0.009, 8, 32);
  const left_tip_edge = new THREE.Mesh(left_tip_edgeGeom, goldMat);
  left_tip_edge.rotation.y = Math.PI / 2;
  left_tip_edge.position.x = -2.469;
  root.add(left_tip_edge);

  const left_collarProfile = [
    new THREE.Vector2(0.000, -0.18),
    new THREE.Vector2(0.120, -0.18),
    new THREE.Vector2(0.155, -0.165),
    new THREE.Vector2(0.190, -0.120),
    new THREE.Vector2(0.215, -0.055),
    new THREE.Vector2(0.215, 0.090),
    new THREE.Vector2(0.205, 0.135),
    new THREE.Vector2(0.180, 0.170),
    new THREE.Vector2(0.000, 0.180),
  ];
  const left_collarGeom = new THREE.LatheGeometry(left_collarProfile, 40);
  const left_collar = new THREE.Mesh(left_collarGeom, goldMat);
  left_collar.rotation.z = -Math.PI / 2;
  left_collar.position.x = -1.84;
  root.add(left_collar);

  const left_collar_seamGeom = new THREE.TorusGeometry(0.202, 0.009, 8, 32);
  const left_collar_seam = new THREE.Mesh(left_collar_seamGeom, knurlMat);
  left_collar_seam.rotation.y = Math.PI / 2;
  left_collar_seam.position.x = -1.675;
  root.add(left_collar_seam);

  const right_knurled_collarProfile = [
    new THREE.Vector2(0.000, -0.25),
    new THREE.Vector2(0.190, -0.25),
    new THREE.Vector2(0.215, -0.225),
    new THREE.Vector2(0.232, -0.180),
    new THREE.Vector2(0.232, 0.180),
    new THREE.Vector2(0.220, 0.225),
    new THREE.Vector2(0.190, 0.250),
    new THREE.Vector2(0.000, 0.250),
  ];
  const right_knurled_collarGeom = new THREE.LatheGeometry(right_knurled_collarProfile, 40);
  const right_knurled_collar = new THREE.Mesh(right_knurled_collarGeom, goldMat);
  right_knurled_collar.rotation.z = -Math.PI / 2;
  right_knurled_collar.position.x = 1.82;
  root.add(right_knurled_collar);

  const right_divider_bandGeom = new THREE.CylinderGeometry(0.225, 0.225, 0.08, 40);
  const right_divider_band = new THREE.Mesh(right_divider_bandGeom, goldMat);
  right_divider_band.rotation.z = -Math.PI / 2;
  right_divider_band.position.x = 2.075;
  root.add(right_divider_band);

  const right_divider_left_edgeGeom = new THREE.TorusGeometry(0.216, 0.009, 8, 32);
  const right_divider_left_edge = new THREE.Mesh(right_divider_left_edgeGeom, knurlMat);
  right_divider_left_edge.rotation.y = Math.PI / 2;
  right_divider_left_edge.position.x = 2.035;
  root.add(right_divider_left_edge);

  const right_divider_right_edgeGeom = new THREE.TorusGeometry(0.216, 0.009, 8, 32);
  const right_divider_right_edge = new THREE.Mesh(right_divider_right_edgeGeom, knurlMat);
  right_divider_right_edge.rotation.y = Math.PI / 2;
  right_divider_right_edge.position.x = 2.115;
  root.add(right_divider_right_edge);

  const right_end_capProfile = [
    new THREE.Vector2(0.000, -0.245),
    new THREE.Vector2(0.190, -0.245),
    new THREE.Vector2(0.215, -0.220),
    new THREE.Vector2(0.232, -0.160),
    new THREE.Vector2(0.232, 0.145),
    new THREE.Vector2(0.225, 0.195),
    new THREE.Vector2(0.205, 0.235),
    new THREE.Vector2(0.170, 0.255),
    new THREE.Vector2(0.000, 0.255),
  ];
  const right_end_capGeom = new THREE.LatheGeometry(right_end_capProfile, 40);
  const right_end_cap = new THREE.Mesh(right_end_capGeom, goldMat);
  right_end_cap.rotation.z = -Math.PI / 2;
  right_end_cap.position.x = 2.355;
  root.add(right_end_cap);

  const right_terminal_faceGeom = new THREE.CylinderGeometry(0.158, 0.158, 0.018, 40);
  const right_terminal_face = new THREE.Mesh(right_terminal_faceGeom, end_capMat);
  right_terminal_face.rotation.z = -Math.PI / 2;
  right_terminal_face.position.x = 2.615;
  root.add(right_terminal_face);

  const right_terminal_rimGeom = new THREE.TorusGeometry(0.170, 0.012, 8, 40);
  const right_terminal_rim = new THREE.Mesh(right_terminal_rimGeom, goldMat);
  right_terminal_rim.rotation.y = Math.PI / 2;
  right_terminal_rim.position.x = 2.610;
  root.add(right_terminal_rim);

  const local_y = new THREE.Vector3(0, 1, 0);
  const local_z = new THREE.Vector3(0, 0, 1);
  const radial = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const dummy = new THREE.Object3D();

  const left_collar_knurlGeom = new THREE.BoxGeometry(0.18, 0.014, 0.022);
  const left_collar_knurl = new THREE.InstancedMesh(
    left_collar_knurlGeom,
    knurlMat,
    128
  );
  let instance_index = 0;
  for (let row = 0; row < 4; row++) {
    const x = -1.95 + row * 0.072;
    for (let segment = 0; segment < 16; segment++) {
      const angle = segment / 16 * Math.PI * 2;
      radial.set(0, Math.cos(angle), Math.sin(angle));
      tangent.set(0, Math.sin(angle), -Math.cos(angle));
      for (const direction of [-1, 1]) {
        dummy.position.set(
          x + direction * 0.012,
          radial.y * 0.219,
          radial.z * 0.219
        );
        dummy.quaternion.setFromUnitVectors(local_y, radial);
        dummy.rotateY(direction * 0.68);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        left_collar_knurl.setMatrixAt(instance_index++, dummy.matrix);
      }
    }
  }
  left_collar_knurl.instanceMatrix.needsUpdate = true;
  root.add(left_collar_knurl);

  const right_collar_knurlGeom = new THREE.BoxGeometry(0.205, 0.014, 0.022);
  const right_collar_knurl = new THREE.InstancedMesh(
    right_collar_knurlGeom,
    knurlMat,
    160
  );
  instance_index = 0;
  for (let row = 0; row < 5; row++) {
    const x = 1.63 + row * 0.09;
    for (let segment = 0; segment < 16; segment++) {
      const angle = segment / 16 * Math.PI * 2;
      radial.set(0, Math.cos(angle), Math.sin(angle));
      tangent.set(0, Math.sin(angle), -Math.cos(angle));
      for (const direction of [-1, 1]) {
        dummy.position.set(
          x + direction * 0.014,
          radial.y * 0.237,
          radial.z * 0.237
        );
        dummy.quaternion.setFromUnitVectors(local_y, radial);
        dummy.rotateY(direction * 0.72);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        right_collar_knurl.setMatrixAt(instance_index++, dummy.matrix);
      }
    }
  }
  right_collar_knurl.instanceMatrix.needsUpdate = true;
  root.add(right_collar_knurl);

  const right_end_cap_knurlGeom = new THREE.BoxGeometry(0.18, 0.013, 0.021);
  const right_end_cap_knurl = new THREE.InstancedMesh(
    right_end_cap_knurlGeom,
    knurlMat,
    128
  );
  instance_index = 0;
  for (let row = 0; row < 4; row++) {
    const x = 2.17 + row * 0.10;
    for (let segment = 0; segment < 16; segment++) {
      const angle = segment / 16 * Math.PI * 2;
      radial.set(0, Math.cos(angle), Math.sin(angle));
      tangent.set(0, Math.sin(angle), -Math.cos(angle));
      for (const direction of [-1, 1]) {
        dummy.position.set(
          x + direction * 0.012,
          radial.y * 0.237,
          radial.z * 0.237
        );
        dummy.quaternion.setFromUnitVectors(local_y, radial);
        dummy.rotateY(direction * 0.68);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        right_end_cap_knurl.setMatrixAt(instance_index++, dummy.matrix);
      }
    }
  }
  right_end_cap_knurl.instanceMatrix.needsUpdate = true;
  root.add(right_end_cap_knurl);

  const right_end_cap_engravingGeom = new THREE.BoxGeometry(0.012, 0.075, 0.009);
  const right_end_cap_engraving = new THREE.InstancedMesh(
    right_end_cap_engravingGeom,
    knurlMat,
    12
  );
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    radial.set(0, Math.cos(angle), Math.sin(angle));
    dummy.position.set(
      2.49,
      radial.y * 0.228,
      radial.z * 0.228
    );
    dummy.quaternion.setFromUnitVectors(local_z, radial);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    right_end_cap_engraving.setMatrixAt(i, dummy.matrix);
  }
  right_end_cap_engraving.instanceMatrix.needsUpdate = true;
  root.add(right_end_cap_engraving);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}
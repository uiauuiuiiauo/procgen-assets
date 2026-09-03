export default function generate(THREE) {
  const root = new THREE.Group();
  const pipe_assembly = new THREE.Group();
  pipe_assembly.rotation.y = 0.2;
  root.add(pipe_assembly);

  const main_barrelMat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const transition_sleeveMat = new THREE.MeshStandardMaterial({
    color: 0x68645b,
    metalness: 0.6,
    roughness: 0.5,
  });
  const flangeMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x707070,
    metalness: 0.6,
    roughness: 0.5,
  });
  const socketMat = new THREE.MeshStandardMaterial({
    color: 0x303234,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const boreMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const oxidation_bandMat = new THREE.MeshStandardMaterial({
    color: 0x654b3d,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.38,
  });

  const main_barrelGeom = new THREE.CylinderGeometry(0.15, 0.15, 2.3, 48);
  const main_barrel = new THREE.Mesh(main_barrelGeom, main_barrelMat);
  main_barrel.rotation.z = Math.PI / 2;
  pipe_assembly.add(main_barrel);

  const oxidation_bandGeom = new THREE.CylinderGeometry(0.152, 0.152, 0.38, 48);
  const oxidation_band = new THREE.Mesh(oxidation_bandGeom, oxidation_bandMat);
  oxidation_band.rotation.z = Math.PI / 2;
  oxidation_band.position.x = 0.48;
  pipe_assembly.add(oxidation_band);

  const left_transition_sleeveGeom = new THREE.CylinderGeometry(0.15, 0.17, 0.34, 40);
  const left_transition_sleeve = new THREE.Mesh(left_transition_sleeveGeom, transition_sleeveMat);
  left_transition_sleeve.rotation.z = Math.PI / 2;
  left_transition_sleeve.position.x = -1.27;
  pipe_assembly.add(left_transition_sleeve);

  const right_transition_sleeveGeom = new THREE.CylinderGeometry(0.17, 0.15, 0.34, 40);
  const right_transition_sleeve = new THREE.Mesh(right_transition_sleeveGeom, transition_sleeveMat);
  right_transition_sleeve.rotation.z = Math.PI / 2;
  right_transition_sleeve.position.x = 1.27;
  pipe_assembly.add(right_transition_sleeve);

  const barrel_collarGeom = new THREE.CylinderGeometry(0.166, 0.166, 0.08, 40);

  const left_barrel_collar = new THREE.Mesh(barrel_collarGeom, flangeMat);
  left_barrel_collar.rotation.z = Math.PI / 2;
  left_barrel_collar.position.x = -1.1;
  pipe_assembly.add(left_barrel_collar);

  const right_barrel_collar = new THREE.Mesh(barrel_collarGeom, flangeMat);
  right_barrel_collar.rotation.z = Math.PI / 2;
  right_barrel_collar.position.x = 1.1;
  pipe_assembly.add(right_barrel_collar);

  const collar_edge_ringGeom = new THREE.TorusGeometry(0.157, 0.009, 10, 40);

  const left_collar_edge_ring = new THREE.Mesh(collar_edge_ringGeom, rimMat);
  left_collar_edge_ring.rotation.y = Math.PI / 2;
  left_collar_edge_ring.position.x = -1.13;
  pipe_assembly.add(left_collar_edge_ring);

  const right_collar_edge_ring = new THREE.Mesh(collar_edge_ringGeom, rimMat);
  right_collar_edge_ring.rotation.y = Math.PI / 2;
  right_collar_edge_ring.position.x = 1.13;
  pipe_assembly.add(right_collar_edge_ring);

  const flange_webGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.075, 48);

  const left_flange_web = new THREE.Mesh(flange_webGeom, flangeMat);
  left_flange_web.rotation.z = Math.PI / 2;
  left_flange_web.position.x = -1.43;
  pipe_assembly.add(left_flange_web);

  const right_flange_web = new THREE.Mesh(flange_webGeom, flangeMat);
  right_flange_web.rotation.z = Math.PI / 2;
  right_flange_web.position.x = 1.43;
  pipe_assembly.add(right_flange_web);

  const flange_bossGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.13, 40);

  const left_flange_boss = new THREE.Mesh(flange_bossGeom, flangeMat);
  left_flange_boss.rotation.z = Math.PI / 2;
  left_flange_boss.position.x = -1.49;
  pipe_assembly.add(left_flange_boss);

  const right_flange_boss = new THREE.Mesh(flange_bossGeom, flangeMat);
  right_flange_boss.rotation.z = Math.PI / 2;
  right_flange_boss.position.x = 1.49;
  pipe_assembly.add(right_flange_boss);

  const flange_outer_rimGeom = new THREE.TorusGeometry(0.193, 0.027, 12, 48);

  const left_flange_outer_rim = new THREE.Mesh(flange_outer_rimGeom, rimMat);
  left_flange_outer_rim.rotation.y = Math.PI / 2;
  left_flange_outer_rim.position.x = -1.465;
  pipe_assembly.add(left_flange_outer_rim);

  const right_flange_outer_rim = new THREE.Mesh(flange_outer_rimGeom, rimMat);
  right_flange_outer_rim.rotation.y = Math.PI / 2;
  right_flange_outer_rim.position.x = 1.465;
  pipe_assembly.add(right_flange_outer_rim);

  const flange_inner_rimGeom = new THREE.TorusGeometry(0.164, 0.014, 10, 40);

  const left_flange_inner_rim = new THREE.Mesh(flange_inner_rimGeom, rimMat);
  left_flange_inner_rim.rotation.y = Math.PI / 2;
  left_flange_inner_rim.position.x = -1.405;
  pipe_assembly.add(left_flange_inner_rim);

  const right_flange_inner_rim = new THREE.Mesh(flange_inner_rimGeom, rimMat);
  right_flange_inner_rim.rotation.y = Math.PI / 2;
  right_flange_inner_rim.position.x = 1.405;
  pipe_assembly.add(right_flange_inner_rim);

  const socket_neckGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.27, 40, 1, true);

  const left_socket_neck = new THREE.Mesh(socket_neckGeom, socketMat);
  left_socket_neck.rotation.z = Math.PI / 2;
  left_socket_neck.position.x = -1.615;
  pipe_assembly.add(left_socket_neck);

  const right_socket_neck = new THREE.Mesh(socket_neckGeom, socketMat);
  right_socket_neck.rotation.z = Math.PI / 2;
  right_socket_neck.position.x = 1.615;
  pipe_assembly.add(right_socket_neck);

  const socket_inner_wallGeom = new THREE.CylinderGeometry(0.108, 0.108, 0.21, 40, 1, true);

  const left_socket_inner_wall = new THREE.Mesh(socket_inner_wallGeom, boreMat);
  left_socket_inner_wall.rotation.z = Math.PI / 2;
  left_socket_inner_wall.position.x = -1.645;
  pipe_assembly.add(left_socket_inner_wall);

  const right_socket_inner_wall = new THREE.Mesh(socket_inner_wallGeom, boreMat);
  right_socket_inner_wall.rotation.z = Math.PI / 2;
  right_socket_inner_wall.position.x = 1.645;
  pipe_assembly.add(right_socket_inner_wall);

  const socket_mouth_faceGeom = new THREE.RingGeometry(0.108, 0.151, 40);

  const left_socket_mouth_face = new THREE.Mesh(socket_mouth_faceGeom, socketMat);
  left_socket_mouth_face.rotation.y = Math.PI / 2;
  left_socket_mouth_face.position.x = -1.752;
  pipe_assembly.add(left_socket_mouth_face);

  const right_socket_mouth_face = new THREE.Mesh(socket_mouth_faceGeom, socketMat);
  right_socket_mouth_face.rotation.y = Math.PI / 2;
  right_socket_mouth_face.position.x = 1.752;
  pipe_assembly.add(right_socket_mouth_face);

  const socket_mouth_rimGeom = new THREE.TorusGeometry(0.129, 0.022, 12, 48);

  const left_socket_mouth_rim = new THREE.Mesh(socket_mouth_rimGeom, rimMat);
  left_socket_mouth_rim.rotation.y = Math.PI / 2;
  left_socket_mouth_rim.position.x = -1.755;
  pipe_assembly.add(left_socket_mouth_rim);

  const right_socket_mouth_rim = new THREE.Mesh(socket_mouth_rimGeom, rimMat);
  right_socket_mouth_rim.rotation.y = Math.PI / 2;
  right_socket_mouth_rim.position.x = 1.755;
  pipe_assembly.add(right_socket_mouth_rim);

  const socket_boreGeom = new THREE.CircleGeometry(0.107, 40);

  const left_socket_bore = new THREE.Mesh(socket_boreGeom, boreMat);
  left_socket_bore.rotation.y = Math.PI / 2;
  left_socket_bore.position.x = -1.535;
  pipe_assembly.add(left_socket_bore);

  const right_socket_bore = new THREE.Mesh(socket_boreGeom, boreMat);
  right_socket_bore.rotation.y = Math.PI / 2;
  right_socket_bore.position.x = 1.535;
  pipe_assembly.add(right_socket_bore);

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
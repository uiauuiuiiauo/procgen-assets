export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "slim_dual_leg_table";

  const tabletop_assembly = new THREE.Group();
  tabletop_assembly.name = "tabletop_assembly";
  root.add(tabletop_assembly);

  const support_assembly = new THREE.Group();
  support_assembly.name = "support_assembly";
  root.add(support_assembly);

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0x2b2b2b,
    metalness: 0.0,
    roughness: 0.6,
  });

  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.6,
  });

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.6,
    roughness: 0.5,
  });

  function createRoundedRectShape(width, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -depth / 2;
    const y1 = depth / 2;
    const shape = new THREE.Shape();

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

  const tabletopShape = createRoundedRectShape(1.30, 0.86, 0.025);
  const tabletopGeom = new THREE.ExtrudeGeometry(tabletopShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 8,
  });
  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.name = "tabletop";
  tabletop.rotation.x = -Math.PI / 2;
  tabletop.position.y = 1.625;
  tabletop_assembly.add(tabletop);

  const front_edge_bandGeom = new THREE.BoxGeometry(1.28, 0.025, 0.018);
  const front_edge_band = new THREE.Mesh(front_edge_bandGeom, edgeMat);
  front_edge_band.name = "front_edge_band";
  front_edge_band.position.set(0, 1.625, 0.438);
  tabletop_assembly.add(front_edge_band);

  const back_edge_band = new THREE.Mesh(front_edge_bandGeom, edgeMat);
  back_edge_band.name = "back_edge_band";
  back_edge_band.position.set(0, 1.625, -0.438);
  tabletop_assembly.add(back_edge_band);

  const side_edge_bandGeom = new THREE.BoxGeometry(0.018, 0.025, 0.84);
  const left_edge_band = new THREE.Mesh(side_edge_bandGeom, edgeMat);
  left_edge_band.name = "left_edge_band";
  left_edge_band.position.set(-0.658, 1.625, 0);
  tabletop_assembly.add(left_edge_band);

  const right_edge_band = new THREE.Mesh(side_edge_bandGeom, edgeMat);
  right_edge_band.name = "right_edge_band";
  right_edge_band.position.set(0.658, 1.625, 0);
  tabletop_assembly.add(right_edge_band);

  const underside_panelGeom = new THREE.BoxGeometry(1.22, 0.014, 0.78);
  const underside_panel = new THREE.Mesh(underside_panelGeom, frameMat);
  underside_panel.name = "underside_panel";
  underside_panel.position.set(0, 1.599, 0);
  tabletop_assembly.add(underside_panel);

  const front_apronGeom = new THREE.BoxGeometry(1.18, 0.035, 0.035);
  const front_apron = new THREE.Mesh(front_apronGeom, frameMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 1.58, 0.385);
  tabletop_assembly.add(front_apron);

  const back_apron = new THREE.Mesh(front_apronGeom, frameMat);
  back_apron.name = "back_apron";
  back_apron.position.set(0, 1.58, -0.385);
  tabletop_assembly.add(back_apron);

  const side_apronGeom = new THREE.BoxGeometry(0.035, 0.035, 0.73);
  const left_apron = new THREE.Mesh(side_apronGeom, frameMat);
  left_apron.name = "left_apron";
  left_apron.position.set(-0.59, 1.58, 0);
  tabletop_assembly.add(left_apron);

  const right_apron = new THREE.Mesh(side_apronGeom, frameMat);
  right_apron.name = "right_apron";
  right_apron.position.set(0.59, 1.58, 0);
  tabletop_assembly.add(right_apron);

  const leg_mounting_collarsGeom = new THREE.CylinderGeometry(
    0.057,
    0.043,
    0.09,
    24
  );
  const leg_mounting_collars = new THREE.InstancedMesh(
    leg_mounting_collarsGeom,
    frameMat,
    2
  );
  leg_mounting_collars.name = "leg_mounting_collars";

  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    instance_dummy.position.set(side * 0.105, 1.555, 0.02);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    leg_mounting_collars.setMatrixAt(i, instance_dummy.matrix);
  }
  leg_mounting_collars.instanceMatrix.needsUpdate = true;
  support_assembly.add(leg_mounting_collars);

  const leg_postsGeom = new THREE.CylinderGeometry(0.043, 0.026, 1, 24);
  const leg_posts = new THREE.InstancedMesh(leg_postsGeom, frameMat, 2);
  leg_posts.name = "leg_posts";

  const up_axis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const top = new THREE.Vector3(side * 0.105, 1.58, 0.02);
    const bottom = new THREE.Vector3(side * 0.14, 0.03, 0.075);
    const direction = new THREE.Vector3().subVectors(top, bottom);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(top, bottom).multiplyScalar(0.5);

    instance_dummy.position.copy(midpoint);
    instance_dummy.quaternion.setFromUnitVectors(
      up_axis,
      direction.clone().normalize()
    );
    instance_dummy.scale.set(1, length, 1);
    instance_dummy.updateMatrix();
    leg_posts.setMatrixAt(i, instance_dummy.matrix);
  }
  leg_posts.instanceMatrix.needsUpdate = true;
  support_assembly.add(leg_posts);

  const foot_capsGeom = new THREE.SphereGeometry(1, 16, 8);
  const foot_caps = new THREE.InstancedMesh(foot_capsGeom, frameMat, 2);
  foot_caps.name = "foot_caps";

  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    instance_dummy.position.set(side * 0.14, 0.022, 0.075);
    instance_dummy.quaternion.identity();
    instance_dummy.scale.set(0.027, 0.018, 0.027);
    instance_dummy.updateMatrix();
    foot_caps.setMatrixAt(i, instance_dummy.matrix);
  }
  foot_caps.instanceMatrix.needsUpdate = true;
  support_assembly.add(foot_caps);

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
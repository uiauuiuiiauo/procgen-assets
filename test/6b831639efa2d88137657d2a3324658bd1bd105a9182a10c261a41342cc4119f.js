export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "pearl_charm_bracelet";

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const pearlMat = new THREE.MeshPhysicalMaterial({
    color: 0xeee8dc,
    metalness: 0.0,
    roughness: 0.2,
    clearcoat: 0.8,
    clearcoatRoughness: 0.16,
  });

  const pearlGeom = new THREE.SphereGeometry(1, 32, 20);

  const rear_pearl = new THREE.Mesh(pearlGeom, pearlMat);
  rear_pearl.name = "rear_pearl";
  rear_pearl.position.set(-0.24, -0.12, 0.0);
  rear_pearl.scale.setScalar(0.074);
  root.add(rear_pearl);

  const upper_middle_pearl = new THREE.Mesh(pearlGeom, pearlMat);
  upper_middle_pearl.name = "upper_middle_pearl";
  upper_middle_pearl.position.set(-0.14, -0.22, 0.018);
  upper_middle_pearl.scale.setScalar(0.078);
  root.add(upper_middle_pearl);

  const lower_middle_pearl = new THREE.Mesh(pearlGeom, pearlMat);
  lower_middle_pearl.name = "lower_middle_pearl";
  lower_middle_pearl.position.set(-0.04, -0.31, 0.035);
  lower_middle_pearl.scale.setScalar(0.08);
  root.add(lower_middle_pearl);

  const front_pearl = new THREE.Mesh(pearlGeom, pearlMat);
  front_pearl.name = "front_pearl";
  front_pearl.position.set(0.08, -0.37, 0.055);
  front_pearl.scale.setScalar(0.082);
  root.add(front_pearl);

  const attachment_ringGeom = new THREE.TorusGeometry(0.034, 0.006, 10, 28);
  const attachment_ring = new THREE.Mesh(attachment_ringGeom, silverMat);
  attachment_ring.name = "attachment_ring";
  attachment_ring.position.set(0.035, -0.11, 0.07);
  attachment_ring.rotation.set(0.08, 0.35, -0.22);
  attachment_ring.scale.set(0.86, 1.0, 1.0);
  root.add(attachment_ring);

  const rear_pearl_wirePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.012, -0.132, 0.064),
    new THREE.Vector3(-0.08, -0.15, 0.045),
    new THREE.Vector3(-0.16, -0.145, 0.022),
    new THREE.Vector3(-0.225, -0.126, 0.006),
  ]);
  const rear_pearl_wireGeom = new THREE.TubeGeometry(
    rear_pearl_wirePath,
    18,
    0.0028,
    6,
    false
  );
  const rear_pearl_wire = new THREE.Mesh(rear_pearl_wireGeom, silverMat);
  rear_pearl_wire.name = "rear_pearl_wire";
  root.add(rear_pearl_wire);

  const upper_middle_pearl_wirePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.014, -0.137, 0.066),
    new THREE.Vector3(-0.035, -0.17, 0.055),
    new THREE.Vector3(-0.085, -0.198, 0.035),
    new THREE.Vector3(-0.125, -0.216, 0.021),
  ]);
  const upper_middle_pearl_wireGeom = new THREE.TubeGeometry(
    upper_middle_pearl_wirePath,
    16,
    0.0028,
    6,
    false
  );
  const upper_middle_pearl_wire = new THREE.Mesh(
    upper_middle_pearl_wireGeom,
    silverMat
  );
  upper_middle_pearl_wire.name = "upper_middle_pearl_wire";
  root.add(upper_middle_pearl_wire);

  const lower_middle_pearl_wirePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.016, -0.143, 0.068),
    new THREE.Vector3(-0.005, -0.19, 0.058),
    new THREE.Vector3(-0.026, -0.25, 0.046),
    new THREE.Vector3(-0.04, -0.286, 0.038),
  ]);
  const lower_middle_pearl_wireGeom = new THREE.TubeGeometry(
    lower_middle_pearl_wirePath,
    16,
    0.0028,
    6,
    false
  );
  const lower_middle_pearl_wire = new THREE.Mesh(
    lower_middle_pearl_wireGeom,
    silverMat
  );
  lower_middle_pearl_wire.name = "lower_middle_pearl_wire";
  root.add(lower_middle_pearl_wire);

  const front_pearl_wirePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.022, -0.145, 0.07),
    new THREE.Vector3(0.035, -0.205, 0.066),
    new THREE.Vector3(0.055, -0.285, 0.062),
    new THREE.Vector3(0.075, -0.338, 0.058),
  ]);
  const front_pearl_wireGeom = new THREE.TubeGeometry(
    front_pearl_wirePath,
    18,
    0.0028,
    6,
    false
  );
  const front_pearl_wire = new THREE.Mesh(front_pearl_wireGeom, silverMat);
  front_pearl_wire.name = "front_pearl_wire";
  root.add(front_pearl_wire);

  const chain_linkGeom = new THREE.TorusGeometry(0.022, 0.0045, 8, 20);
  const chain_link_count = 27;
  const flat_link_count = 14;
  const edge_link_count = 13;

  const chain_flat_links = new THREE.InstancedMesh(
    chain_linkGeom,
    silverMat,
    flat_link_count
  );
  chain_flat_links.name = "chain_flat_links";

  const chain_edge_links = new THREE.InstancedMesh(
    chain_linkGeom,
    silverMat,
    edge_link_count
  );
  chain_edge_links.name = "chain_edge_links";

  const chain_dummy = new THREE.Object3D();
  const chain_align = new THREE.Quaternion();
  const chain_twist = new THREE.Quaternion();
  const chain_z_axis = new THREE.Vector3(0, 0, 1);
  const chain_y_axis = new THREE.Vector3(0, 1, 0);

  let flat_index = 0;
  let edge_index = 0;

  for (let i = 0; i < chain_link_count; i++) {
    const t = i / (chain_link_count - 1);
    const x = 0.025 + 0.93 * t + 0.025 * Math.sin(Math.PI * t);
    const y = -0.065 + 0.9 * t;
    const dx = 0.93 + 0.025 * Math.PI * Math.cos(Math.PI * t);
    const dy = 0.9;
    const angle = Math.atan2(-dx, dy);

    chain_align.setFromAxisAngle(chain_z_axis, angle);
    chain_twist.setFromAxisAngle(
      chain_y_axis,
      i % 2 === 0 ? 0 : Math.PI / 2
    );

    chain_dummy.position.set(x, y, 0.072);
    chain_dummy.quaternion.copy(chain_align).multiply(chain_twist);
    chain_dummy.scale.set(0.78, 1.12, 1.0);
    chain_dummy.updateMatrix();

    if (i % 2 === 0) {
      chain_flat_links.setMatrixAt(flat_index, chain_dummy.matrix);
      flat_index++;
    } else {
      chain_edge_links.setMatrixAt(edge_index, chain_dummy.matrix);
      edge_index++;
    }
  }

  chain_flat_links.instanceMatrix.needsUpdate = true;
  chain_edge_links.instanceMatrix.needsUpdate = true;
  chain_flat_links.frustumCulled = false;
  chain_edge_links.frustumCulled = false;
  root.add(chain_flat_links, chain_edge_links);

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
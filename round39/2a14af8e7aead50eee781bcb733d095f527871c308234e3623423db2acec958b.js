export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "metallic_spinning_top";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const face_details = new THREE.Group();
  face_details.name = "face_details";
  root.add(face_details);

  const rim_details = new THREE.Group();
  rim_details.name = "rim_details";
  root.add(rim_details);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x4a4d50,
    metalness: 0.5,
    roughness: 0.5
  });

  const redMat = new THREE.MeshStandardMaterial({
    color: 0xe23832,
    metalness: 0.0,
    roughness: 0.3
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xf28b18,
    metalness: 0.0,
    roughness: 0.3
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf1d51d,
    metalness: 0.0,
    roughness: 0.3
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x38a84d,
    metalness: 0.0,
    roughness: 0.3
  });
  const cyanMat = new THREE.MeshStandardMaterial({
    color: 0x18a8ad,
    metalness: 0.0,
    roughness: 0.3
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x1769cf,
    metalness: 0.0,
    roughness: 0.3
  });
  const purpleMat = new THREE.MeshStandardMaterial({
    color: 0x7136aa,
    metalness: 0.0,
    roughness: 0.3
  });
  const magentaMat = new THREE.MeshStandardMaterial({
    color: 0xc52b83,
    metalness: 0.0,
    roughness: 0.3
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.00, -0.220),
    new THREE.Vector2(0.22, -0.215),
    new THREE.Vector2(0.55, -0.205),
    new THREE.Vector2(0.78, -0.180),
    new THREE.Vector2(0.91, -0.140),
    new THREE.Vector2(0.98, -0.080),
    new THREE.Vector2(1.00, -0.015),
    new THREE.Vector2(0.99, 0.050),
    new THREE.Vector2(0.965, 0.110),
    new THREE.Vector2(0.930, 0.160),
    new THREE.Vector2(0.890, 0.190),
    new THREE.Vector2(0.840, 0.205),
    new THREE.Vector2(0.790, 0.198),
    new THREE.Vector2(0.740, 0.170),
    new THREE.Vector2(0.690, 0.130),
    new THREE.Vector2(0.640, 0.095),
    new THREE.Vector2(0.590, 0.075),
    new THREE.Vector2(0.530, 0.070),
    new THREE.Vector2(0.470, 0.082),
    new THREE.Vector2(0.420, 0.105),
    new THREE.Vector2(0.380, 0.140),
    new THREE.Vector2(0.340, 0.185),
    new THREE.Vector2(0.310, 0.230),
    new THREE.Vector2(0.270, 0.265),
    new THREE.Vector2(0.210, 0.285),
    new THREE.Vector2(0.000, 0.292)
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 96);
  const main_body = new THREE.Mesh(main_bodyGeom, silverMat);
  main_body.name = "main_body";
  main_body.rotation.x = Math.PI / 2;
  body_group.add(main_body);

  const outer_rolled_rimGeom = new THREE.TorusGeometry(0.865, 0.072, 16, 128);
  const outer_rolled_rim = new THREE.Mesh(outer_rolled_rimGeom, silverMat);
  outer_rolled_rim.name = "outer_rolled_rim";
  outer_rolled_rim.position.z = 0.195;
  rim_details.add(outer_rolled_rim);

  const rim_inner_shadowGeom = new THREE.TorusGeometry(0.778, 0.012, 8, 128);
  const rim_inner_shadow = new THREE.Mesh(rim_inner_shadowGeom, grooveMat);
  rim_inner_shadow.name = "rim_inner_shadow";
  rim_inner_shadow.position.z = 0.188;
  face_details.add(rim_inner_shadow);

  const rim_inner_beadGeom = new THREE.TorusGeometry(0.793, 0.018, 10, 128);
  const rim_inner_bead = new THREE.Mesh(rim_inner_beadGeom, silverMat);
  rim_inner_bead.name = "rim_inner_bead";
  rim_inner_bead.position.z = 0.205;
  rim_details.add(rim_inner_bead);

  const rim_outer_beadGeom = new THREE.TorusGeometry(0.948, 0.018, 10, 128);
  const rim_outer_bead = new THREE.Mesh(rim_outer_beadGeom, silverMat);
  rim_outer_bead.name = "rim_outer_bead";
  rim_outer_bead.position.z = 0.145;
  rim_details.add(rim_outer_bead);

  const outer_side_grooveGeom = new THREE.TorusGeometry(0.982, 0.009, 8, 128);
  const outer_side_groove = new THREE.Mesh(outer_side_grooveGeom, grooveMat);
  outer_side_groove.name = "outer_side_groove";
  outer_side_groove.position.z = 0.025;
  rim_details.add(outer_side_groove);

  const central_hubProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.120, 0.000),
    new THREE.Vector2(0.220, 0.006),
    new THREE.Vector2(0.275, 0.020),
    new THREE.Vector2(0.300, 0.045),
    new THREE.Vector2(0.292, 0.075),
    new THREE.Vector2(0.260, 0.100),
    new THREE.Vector2(0.220, 0.112),
    new THREE.Vector2(0.190, 0.116),
    new THREE.Vector2(0.168, 0.145),
    new THREE.Vector2(0.145, 0.185),
    new THREE.Vector2(0.110, 0.225),
    new THREE.Vector2(0.060, 0.252),
    new THREE.Vector2(0.000, 0.262)
  ];
  const central_hubGeom = new THREE.LatheGeometry(central_hubProfile, 96);
  const central_hub = new THREE.Mesh(central_hubGeom, silverMat);
  central_hub.name = "central_hub";
  central_hub.rotation.x = Math.PI / 2;
  central_hub.position.z = 0.080;
  body_group.add(central_hub);

  const hub_base_shadowGeom = new THREE.TorusGeometry(0.294, 0.012, 8, 96);
  const hub_base_shadow = new THREE.Mesh(hub_base_shadowGeom, grooveMat);
  hub_base_shadow.name = "hub_base_shadow";
  hub_base_shadow.position.z = 0.137;
  face_details.add(hub_base_shadow);

  const hub_collarGeom = new THREE.TorusGeometry(0.274, 0.020, 10, 96);
  const hub_collar = new THREE.Mesh(hub_collarGeom, silverMat);
  hub_collar.name = "hub_collar";
  hub_collar.position.z = 0.160;
  face_details.add(hub_collar);

  const hub_step_ringGeom = new THREE.TorusGeometry(0.174, 0.010, 8, 96);
  const hub_step_ring = new THREE.Mesh(hub_step_ringGeom, brushedMat);
  hub_step_ring.name = "hub_step_ring";
  hub_step_ring.position.z = 0.228;
  face_details.add(hub_step_ring);

  function addFaceRing(name, radius, tube, z, material) {
    const geom = new THREE.TorusGeometry(radius, tube, 8, 128);
    const mesh = new THREE.Mesh(geom, material);
    mesh.name = name;
    mesh.position.z = z;
    face_details.add(mesh);
    return mesh;
  }

  const face_red_ring = addFaceRing("face_red_ring", 0.598, 0.011, 0.084, redMat);
  const face_orange_ring = addFaceRing("face_orange_ring", 0.616, 0.011, 0.087, orangeMat);
  const face_yellow_ring = addFaceRing("face_yellow_ring", 0.634, 0.011, 0.090, yellowMat);
  const face_green_ring = addFaceRing("face_green_ring", 0.652, 0.011, 0.093, greenMat);
  const face_cyan_ring = addFaceRing("face_cyan_ring", 0.670, 0.011, 0.096, cyanMat);
  const face_blue_ring = addFaceRing("face_blue_ring", 0.688, 0.011, 0.099, blueMat);
  const face_purple_ring = addFaceRing("face_purple_ring", 0.706, 0.011, 0.102, purpleMat);
  const face_magenta_ring = addFaceRing("face_magenta_ring", 0.724, 0.011, 0.105, magentaMat);

  const inner_magenta_ring = addFaceRing("inner_magenta_ring", 0.522, 0.010, 0.078, magentaMat);
  const inner_blue_ring = addFaceRing("inner_blue_ring", 0.540, 0.010, 0.080, blueMat);
  const inner_cyan_ring = addFaceRing("inner_cyan_ring", 0.558, 0.010, 0.082, cyanMat);

  const rim_red_stripe = addFaceRing("rim_red_stripe", 0.970, 0.008, 0.074, redMat);
  const rim_orange_stripe = addFaceRing("rim_orange_stripe", 0.972, 0.008, 0.062, orangeMat);
  const rim_yellow_stripe = addFaceRing("rim_yellow_stripe", 0.974, 0.008, 0.050, yellowMat);
  const rim_green_stripe = addFaceRing("rim_green_stripe", 0.976, 0.008, 0.038, greenMat);
  const rim_cyan_stripe = addFaceRing("rim_cyan_stripe", 0.978, 0.008, 0.026, cyanMat);
  const rim_blue_stripe = addFaceRing("rim_blue_stripe", 0.980, 0.008, 0.014, blueMat);
  const rim_purple_stripe = addFaceRing("rim_purple_stripe", 0.982, 0.008, 0.002, purpleMat);
  const rim_magenta_stripe = addFaceRing("rim_magenta_stripe", 0.984, 0.008, -0.010, magentaMat);

  const machining_groove_1 = addFaceRing("machining_groove_1", 0.438, 0.0035, 0.112, brushedMat);
  const machining_groove_2 = addFaceRing("machining_groove_2", 0.492, 0.0030, 0.080, brushedMat);
  const machining_groove_3 = addFaceRing("machining_groove_3", 0.565, 0.0030, 0.077, brushedMat);
  const machining_groove_4 = addFaceRing("machining_groove_4", 0.748, 0.0035, 0.151, brushedMat);
  const machining_groove_5 = addFaceRing("machining_groove_5", 0.782, 0.0030, 0.180, brushedMat);

  const hub_machining_groove_1 = addFaceRing("hub_machining_groove_1", 0.070, 0.0025, 0.332, brushedMat);
  const hub_machining_groove_2 = addFaceRing("hub_machining_groove_2", 0.105, 0.0025, 0.310, brushedMat);
  const hub_machining_groove_3 = addFaceRing("hub_machining_groove_3", 0.140, 0.0025, 0.275, brushedMat);

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
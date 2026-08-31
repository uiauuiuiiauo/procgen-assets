export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bicycle_sprocket_wheel";

  const tooth_count = 44;
  const rim_outer_radius = 0.90;
  const rim_inner_radius = 0.74;
  const spoke_count = 18;

  const black_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x24272d,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const recessed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x111318,
    metalness: 0.45,
    roughness: 0.32,
    side: THREE.DoubleSide,
  });
  const edge_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x454a52,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  function make_cylinder_between(start, end, radius, material, radial_segments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      radial_segments
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  function make_tube(points, radius, material, tubular_segments) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        tubular_segments,
        radius,
        8,
        false
      ),
      material
    );
  }

  const sprocket_assembly = new THREE.Group();
  sprocket_assembly.name = "sprocket_assembly";
  root.add(sprocket_assembly);

  const sprocket_shape = new THREE.Shape();
  const tooth_pitch = Math.PI * 2 / tooth_count;
  const tooth_profile = [
    [-0.50, 0.935],
    [-0.38, 0.955],
    [-0.28, 1.005],
    [-0.14, 1.035],
    [0.02, 1.035],
    [0.16, 1.005],
    [0.27, 0.955],
    [0.50, 0.935],
  ];

  let sprocket_first_point = true;
  for (let i = 0; i < tooth_count; i++) {
    const tooth_center = i * tooth_pitch;
    for (let j = 0; j < tooth_profile.length; j++) {
      const angle = tooth_center + tooth_profile[j][0] * tooth_pitch;
      const radius = tooth_profile[j][1];
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (sprocket_first_point) {
        sprocket_shape.moveTo(x, y);
        sprocket_first_point = false;
      } else {
        sprocket_shape.lineTo(x, y);
      }
    }
  }
  sprocket_shape.closePath();

  const sprocket_hole = new THREE.Path();
  sprocket_hole.absarc(0, 0, 0.875, 0, Math.PI * 2, true);
  sprocket_shape.holes.push(sprocket_hole);

  const sprocket_body_geom = new THREE.ExtrudeGeometry(sprocket_shape, {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.007,
    bevelSegments: 2,
    curveSegments: 4,
  });
  sprocket_body_geom.translate(0, 0, -0.0375);

  const sprocket_body = new THREE.Mesh(
    sprocket_body_geom,
    black_metal_mat
  );
  sprocket_body.name = "sprocket_body";
  sprocket_assembly.add(sprocket_body);

  const sprocket_inner_band_geom = new THREE.RingGeometry(
    0.835,
    0.915,
    128
  );
  const sprocket_inner_band = new THREE.Mesh(
    sprocket_inner_band_geom,
    recessed_metal_mat
  );
  sprocket_inner_band.name = "sprocket_inner_band";
  sprocket_inner_band.position.z = 0.048;
  sprocket_assembly.add(sprocket_inner_band);

  const sprocket_outer_groove_geom = new THREE.TorusGeometry(
    0.912,
    0.007,
    8,
    128
  );
  const sprocket_outer_groove = new THREE.Mesh(
    sprocket_outer_groove_geom,
    recessed_metal_mat
  );
  sprocket_outer_groove.name = "sprocket_outer_groove";
  sprocket_outer_groove.position.z = 0.055;
  sprocket_assembly.add(sprocket_outer_groove);

  const sprocket_inner_groove_geom = new THREE.TorusGeometry(
    0.842,
    0.008,
    8,
    128
  );
  const sprocket_inner_groove = new THREE.Mesh(
    sprocket_inner_groove_geom,
    edge_metal_mat
  );
  sprocket_inner_groove.name = "sprocket_inner_groove";
  sprocket_inner_groove.position.z = 0.057;
  sprocket_assembly.add(sprocket_inner_groove);

  const wheel_assembly = new THREE.Group();
  wheel_assembly.name = "wheel_assembly";
  root.add(wheel_assembly);

  const outer_rim_shape = new THREE.Shape();
  outer_rim_shape.absarc(
    0,
    0,
    rim_outer_radius,
    0,
    Math.PI * 2,
    false
  );
  const outer_rim_hole = new THREE.Path();
  outer_rim_hole.absarc(
    0,
    0,
    rim_inner_radius,
    0,
    Math.PI * 2,
    true
  );
  outer_rim_shape.holes.push(outer_rim_hole);

  const outer_rim_geom = new THREE.ExtrudeGeometry(outer_rim_shape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.011,
    bevelSegments: 3,
    curveSegments: 64,
  });
  outer_rim_geom.translate(0, 0, -0.035);

  const outer_rim = new THREE.Mesh(outer_rim_geom, black_metal_mat);
  outer_rim.name = "outer_rim";
  wheel_assembly.add(outer_rim);

  const outer_rim_outer_bead_geom = new THREE.TorusGeometry(
    0.884,
    0.014,
    10,
    128
  );
  const outer_rim_outer_bead = new THREE.Mesh(
    outer_rim_outer_bead_geom,
    edge_metal_mat
  );
  outer_rim_outer_bead.name = "outer_rim_outer_bead";
  outer_rim_outer_bead.position.z = 0.049;
  wheel_assembly.add(outer_rim_outer_bead);

  const outer_rim_inner_bead_geom = new THREE.TorusGeometry(
    0.758,
    0.014,
    10,
    128
  );
  const outer_rim_inner_bead = new THREE.Mesh(
    outer_rim_inner_bead_geom,
    edge_metal_mat
  );
  outer_rim_inner_bead.name = "outer_rim_inner_bead";
  outer_rim_inner_bead.position.z = 0.049;
  wheel_assembly.add(outer_rim_inner_bead);

  const rear_spokes_geom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    1,
    8
  );
  const rear_spokes = new THREE.InstancedMesh(
    rear_spokes_geom,
    recessed_metal_mat,
    spoke_count
  );
  rear_spokes.name = "rear_spokes";

  const spoke_dummy = new THREE.Object3D();
  const spoke_up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < spoke_count; i++) {
    const outer_angle = i / spoke_count * Math.PI * 2;
    const inner_angle = outer_angle + 0.17;
    const start = new THREE.Vector3(
      Math.cos(inner_angle) * 0.245,
      Math.sin(inner_angle) * 0.245,
      -0.047
    );
    const end = new THREE.Vector3(
      Math.cos(outer_angle) * 0.748,
      Math.sin(outer_angle) * 0.748,
      -0.028
    );
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();

    spoke_dummy.position.copy(start).add(end).multiplyScalar(0.5);
    spoke_dummy.quaternion.setFromUnitVectors(
      spoke_up,
      direction.normalize()
    );
    spoke_dummy.scale.set(1, length, 1);
    spoke_dummy.updateMatrix();
    rear_spokes.setMatrixAt(i, spoke_dummy.matrix);
  }
  rear_spokes.instanceMatrix.needsUpdate = true;
  wheel_assembly.add(rear_spokes);

  const front_spokes_geom = new THREE.CylinderGeometry(
    0.010,
    0.010,
    1,
    8
  );
  const front_spokes = new THREE.InstancedMesh(
    front_spokes_geom,
    black_metal_mat,
    spoke_count
  );
  front_spokes.name = "front_spokes";

  for (let i = 0; i < spoke_count; i++) {
    const outer_angle = i / spoke_count * Math.PI * 2;
    const inner_angle = outer_angle - 0.17;
    const start = new THREE.Vector3(
      Math.cos(inner_angle) * 0.245,
      Math.sin(inner_angle) * 0.245,
      0.047
    );
    const end = new THREE.Vector3(
      Math.cos(outer_angle) * 0.748,
      Math.sin(outer_angle) * 0.748,
      0.028
    );
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();

    spoke_dummy.position.copy(start).add(end).multiplyScalar(0.5);
    spoke_dummy.quaternion.setFromUnitVectors(
      spoke_up,
      direction.normalize()
    );
    spoke_dummy.scale.set(1, length, 1);
    spoke_dummy.updateMatrix();
    front_spokes.setMatrixAt(i, spoke_dummy.matrix);
  }
  front_spokes.instanceMatrix.needsUpdate = true;
  wheel_assembly.add(front_spokes);

  const rim_spoke_nipples_geom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.045,
    10
  );
  const rim_spoke_nipples = new THREE.InstancedMesh(
    rim_spoke_nipples_geom,
    edge_metal_mat,
    spoke_count
  );
  rim_spoke_nipples.name = "rim_spoke_nipples";

  for (let i = 0; i < spoke_count; i++) {
    const angle = i / spoke_count * Math.PI * 2;
    const radial = new THREE.Vector3(
      Math.cos(angle),
      Math.sin(angle),
      0
    );
    spoke_dummy.position.set(
      radial.x * 0.748,
      radial.y * 0.748,
      0.002
    );
    spoke_dummy.quaternion.setFromUnitVectors(spoke_up, radial);
    spoke_dummy.scale.set(1, 1, 1);
    spoke_dummy.updateMatrix();
    rim_spoke_nipples.setMatrixAt(i, spoke_dummy.matrix);
  }
  rim_spoke_nipples.instanceMatrix.needsUpdate = true;
  wheel_assembly.add(rim_spoke_nipples);

  const structural_spokes = new THREE.Group();
  structural_spokes.name = "structural_spokes";
  wheel_assembly.add(structural_spokes);

  const structural_angles = [
    0,
    Math.PI / 3,
    Math.PI * 2 / 3,
    Math.PI,
    Math.PI * 4 / 3,
    Math.PI * 5 / 3,
  ];

  for (let i = 0; i < structural_angles.length; i++) {
    const angle = structural_angles[i];
    const structural_spoke = make_tube(
      [
        new THREE.Vector3(
          Math.cos(angle - 0.08) * 0.19,
          Math.sin(angle - 0.08) * 0.19,
          0.045
        ),
        new THREE.Vector3(
          Math.cos(angle - 0.035) * 0.39,
          Math.sin(angle - 0.035) * 0.39,
          0.045
        ),
        new THREE.Vector3(
          Math.cos(angle + 0.025) * 0.61,
          Math.sin(angle + 0.025) * 0.61,
          0.045
        ),
        new THREE.Vector3(
          Math.cos(angle) * 0.755,
          Math.sin(angle) * 0.755,
          0.045
        ),
      ],
      0.022,
      black_metal_mat,
      24
    );
    structural_spoke.name = "structural_spoke_" + i;
    structural_spokes.add(structural_spoke);
  }

  const central_hub = new THREE.Group();
  central_hub.name = "central_hub";
  wheel_assembly.add(central_hub);

  const hub_body_geom = new THREE.CylinderGeometry(
    0.235,
    0.235,
    0.10,
    64
  );
  const hub_body = new THREE.Mesh(hub_body_geom, black_metal_mat);
  hub_body.name = "hub_body";
  hub_body.rotation.x = Math.PI / 2;
  hub_body.position.z = 0.018;
  central_hub.add(hub_body);

  const hub_outer_flange_geom = new THREE.CylinderGeometry(
    0.255,
    0.255,
    0.035,
    64
  );
  const hub_outer_flange = new THREE.Mesh(
    hub_outer_flange_geom,
    recessed_metal_mat
  );
  hub_outer_flange.name = "hub_outer_flange";
  hub_outer_flange.rotation.x = Math.PI / 2;
  hub_outer_flange.position.z = 0.052;
  central_hub.add(hub_outer_flange);

  const hub_outer_trim_geom = new THREE.TorusGeometry(
    0.224,
    0.014,
    10,
    96
  );
  const hub_outer_trim = new THREE.Mesh(
    hub_outer_trim_geom,
    edge_metal_mat
  );
  hub_outer_trim.name = "hub_outer_trim";
  hub_outer_trim.position.z = 0.075;
  central_hub.add(hub_outer_trim);

  const hub_concentric_ring_geom = new THREE.TorusGeometry(
    0.184,
    0.010,
    8,
    96
  );
  const hub_concentric_ring = new THREE.Mesh(
    hub_concentric_ring_geom,
    edge_metal_mat
  );
  hub_concentric_ring.name = "hub_concentric_ring";
  hub_concentric_ring.position.z = 0.078;
  central_hub.add(hub_concentric_ring);

  const hub_bore_ring_geom = new THREE.RingGeometry(
    0.088,
    0.143,
    64
  );
  const hub_bore_ring = new THREE.Mesh(
    hub_bore_ring_geom,
    recessed_metal_mat
  );
  hub_bore_ring.name = "hub_bore_ring";
  hub_bore_ring.position.z = 0.081;
  central_hub.add(hub_bore_ring);

  const hub_bore_trim_geom = new THREE.TorusGeometry(
    0.116,
    0.012,
    10,
    96
  );
  const hub_bore_trim = new THREE.Mesh(
    hub_bore_trim_geom,
    edge_metal_mat
  );
  hub_bore_trim.name = "hub_bore_trim";
  hub_bore_trim.position.z = 0.087;
  central_hub.add(hub_bore_trim);

  const axle_sleeve_geom = new THREE.CylinderGeometry(
    0.086,
    0.086,
    0.13,
    48,
    1,
    true
  );
  const axle_sleeve = new THREE.Mesh(
    axle_sleeve_geom,
    recessed_metal_mat
  );
  axle_sleeve.name = "axle_sleeve";
  axle_sleeve.rotation.x = Math.PI / 2;
  axle_sleeve.position.z = 0.018;
  central_hub.add(axle_sleeve);

  const rear_hub_cap_geom = new THREE.CylinderGeometry(
    0.16,
    0.16,
    0.025,
    64
  );
  const rear_hub_cap = new THREE.Mesh(
    rear_hub_cap_geom,
    recessed_metal_mat
  );
  rear_hub_cap.name = "rear_hub_cap";
  rear_hub_cap.rotation.x = Math.PI / 2;
  rear_hub_cap.position.z = -0.042;
  central_hub.add(rear_hub_cap);

  const valve_angle = Math.PI * 0.82;
  const valve_base = new THREE.Vector3(
    Math.cos(valve_angle) * 0.752,
    Math.sin(valve_angle) * 0.752,
    0.058
  );
  const valve_mid = new THREE.Vector3(
    Math.cos(valve_angle + 0.012) * 0.782,
    Math.sin(valve_angle + 0.012) * 0.782,
    0.061
  );
  const valve_tip = new THREE.Vector3(
    Math.cos(valve_angle + 0.025) * 0.812,
    Math.sin(valve_angle + 0.025) * 0.812,
    0.064
  );

  const rim_valve_stem = make_cylinder_between(
    valve_base,
    valve_mid,
    0.006,
    edge_metal_mat,
    10
  );
  rim_valve_stem.name = "rim_valve_stem";
  wheel_assembly.add(rim_valve_stem);

  const rim_valve_cap = make_cylinder_between(
    valve_mid,
    valve_tip,
    0.009,
    edge_metal_mat,
    10
  );
  rim_valve_cap.name = "rim_valve_cap";
  wheel_assembly.add(rim_valve_cap);

  fit_to_unit_cube(root);
  return root;

  function fit_to_unit_cube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const max_dim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / max_dim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}
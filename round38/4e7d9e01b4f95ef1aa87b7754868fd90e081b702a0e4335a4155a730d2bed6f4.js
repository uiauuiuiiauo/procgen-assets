export default function generate(THREE) {
  const root = new THREE.Group();
  const cabochon_group = new THREE.Group();
  root.add(cabochon_group);

  const radius_x = 0.52;
  const radius_y = 0.72;
  const radius_z = 0.22;
  const latitude_power = 2.15;
  const longitude_power = 2.10;

  function signed_power(value, power) {
    if (value === 0) return 0;
    return (value < 0 ? -1 : 1) * Math.pow(Math.abs(value), power);
  }

  function surface_point(u, angle, offset) {
    const cos_u = Math.cos(u);
    const sin_u = Math.sin(u);
    const radial = Math.pow(Math.max(0, cos_u * cos_u), 1 / latitude_power);
    const x = radius_x * radial * signed_power(Math.cos(angle), 2 / longitude_power);
    const y = radius_y * signed_power(Math.sin(u), 2 / latitude_power);
    const z = radius_z * radial * signed_power(Math.sin(angle), 2 / longitude_power);
    const normal = new THREE.Vector3(
      x / (radius_x * radius_x),
      y / (radius_y * radius_y),
      z / (radius_z * radius_z)
    ).normalize();
    return new THREE.Vector3(x, y, z).addScaledVector(normal, offset);
  }

  function surface_frame(u, angle, offset) {
    const position = surface_point(u, angle, offset);
    const normal = new THREE.Vector3(
      position.x / (radius_x * radius_x),
      position.y / (radius_y * radius_y),
      position.z / (radius_z * radius_z)
    ).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  const cabochon_bodyGeom = new THREE.SphereGeometry(1, 72, 48);
  const cabochon_positions = cabochon_bodyGeom.attributes.position;
  const cabochon_colors = [];
  const cabochon_base_color = new THREE.Color(0xeadfd8);

  for (let i = 0; i < cabochon_positions.count; i++) {
    const source_x = cabochon_positions.getX(i);
    const source_y = cabochon_positions.getY(i);
    const source_z = cabochon_positions.getZ(i);
    const source_length = Math.sqrt(
      source_x * source_x + source_y * source_y + source_z * source_z
    ) || 1;

    const unit_x = source_x / source_length;
    const unit_y = source_y / source_length;
    const unit_z = source_z / source_length;
    const u = Math.asin(Math.max(-1, Math.min(1, unit_y)));
    const angle = Math.atan2(unit_z, unit_x);
    const cos_u = Math.cos(u);
    const radial = Math.pow(Math.max(0, cos_u * cos_u), 1 / latitude_power);

    const x = radius_x * radial *
      signed_power(Math.cos(angle), 2 / longitude_power);
    const y = radius_y * signed_power(Math.sin(u), 2 / latitude_power);
    const z = radius_z * radial *
      signed_power(Math.sin(angle), 2 / longitude_power);

    cabochon_positions.setXYZ(i, x, y, z);

    const fine_mottle =
      Math.sin(x * 18 + y * 9) * Math.sin(y * 15 - z * 12);
    const broad_mottle = Math.sin(x * 7 - y * 5 + z * 6);
    const shade = 0.975 + fine_mottle * 0.012 + broad_mottle * 0.008;

    cabochon_colors.push(
      cabochon_base_color.r * shade,
      cabochon_base_color.g * shade,
      cabochon_base_color.b * shade
    );
  }

  cabochon_bodyGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(cabochon_colors, 3)
  );
  cabochon_bodyGeom.computeVertexNormals();
  cabochon_bodyGeom.computeBoundingBox();
  cabochon_bodyGeom.computeBoundingSphere();

  const cabochon_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.28,
    transmission: 0.16,
    ior: 1.46,
    transparent: true,
    opacity: 0.98,
    clearcoat: 0.8,
    clearcoatRoughness: 0.16,
    emissive: 0x6e625d,
    emissiveIntensity: 0.18
  });

  const cabochon_body = new THREE.Mesh(cabochon_bodyGeom, cabochon_bodyMat);
  cabochon_body.renderOrder = 0;
  cabochon_group.add(cabochon_body);

  const glitter_count = 1900;
  const glitter_data = [];

  for (let i = 0; i < glitter_count; i++) {
    const t = (i + 0.5) / glitter_count;
    const v = 1 - 2 * Math.pow(1 - t, 1.45);
    const u = Math.asin(v);
    const angle = i * 2.399963229728653 +
      Math.sin(i * 1.73) * 0.16 +
      Math.sin(i * 0.31) * 0.07;
    const size = 0.0028 + (i % 12) * 0.00034;
    glitter_data.push({ u, angle, size });
  }

  const glitter_specksGeom = new THREE.CircleGeometry(1, 8);
  const glitter_specksMat = new THREE.MeshBasicMaterial({
    color: 0xf8ffff,
    transparent: true,
    opacity: 0.98,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const glitter_specks = new THREE.InstancedMesh(
    glitter_specksGeom,
    glitter_specksMat,
    glitter_data.length
  );
  glitter_specks.renderOrder = 1;

  const glitter_matrix = new THREE.Matrix4();
  const glitter_scale = new THREE.Vector3();

  for (let i = 0; i < glitter_data.length; i++) {
    const data = glitter_data[i];
    const frame = surface_frame(data.u, data.angle, 0.004);
    glitter_scale.set(data.size, data.size, data.size);
    glitter_matrix.compose(frame.position, frame.quaternion, glitter_scale);
    glitter_specks.setMatrixAt(i, glitter_matrix);
  }
  glitter_specks.instanceMatrix.needsUpdate = true;
  cabochon_group.add(glitter_specks);

  const warm_glitter_data = [];
  const warm_glitter_count = 34;

  for (let i = 0; i < warm_glitter_count; i++) {
    const t = (i + 0.5) / warm_glitter_count;
    const v = 1 - 2 * Math.pow(1 - t, 1.6);
    warm_glitter_data.push({
      u: Math.asin(v),
      angle: i * 2.683240461 + Math.sin(i * 0.91) * 0.24,
      size: 0.0032 + (i % 5) * 0.00055
    });
  }

  const warm_glitter_specksGeom = glitter_specksGeom;
  const warm_glitter_specksMat = new THREE.MeshBasicMaterial({
    color: 0xfff3d5,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const warm_glitter_specks = new THREE.InstancedMesh(
    warm_glitter_specksGeom,
    warm_glitter_specksMat,
    warm_glitter_data.length
  );
  warm_glitter_specks.renderOrder = 2;

  for (let i = 0; i < warm_glitter_data.length; i++) {
    const data = warm_glitter_data[i];
    const frame = surface_frame(data.u, data.angle, 0.0045);
    glitter_scale.set(data.size, data.size, data.size);
    glitter_matrix.compose(frame.position, frame.quaternion, glitter_scale);
    warm_glitter_specks.setMatrixAt(i, glitter_matrix);
  }
  warm_glitter_specks.instanceMatrix.needsUpdate = true;
  cabochon_group.add(warm_glitter_specks);

  const highlight_positions = [];
  const highlight_indices = [];
  const highlight_segments = 32;
  const highlight_angle = 0.95;

  for (let i = 0; i <= highlight_segments; i++) {
    const t = i / highlight_segments;
    const center_u = -1.08 + t * 2.16;
    const half_width = 0.043 *
      (0.72 + 0.28 * Math.pow(Math.sin(t * Math.PI), 0.55));
    const angle_width = half_width / radius_y;
    const left = surface_point(center_u - half_width, highlight_angle, 0.009);
    const right = surface_point(center_u + half_width, highlight_angle, 0.009);
    highlight_positions.push(
      left.x, left.y, left.z,
      right.x, right.y, right.z
    );

    if (i < highlight_segments) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      highlight_indices.push(a, b, c, b, d, c);
    }
  }

  const broad_highlightGeom = new THREE.BufferGeometry();
  broad_highlightGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(highlight_positions, 3)
  );
  broad_highlightGeom.setIndex(highlight_indices);
  broad_highlightGeom.computeVertexNormals();
  broad_highlightGeom.computeBoundingSphere();

  const broad_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const broad_highlight = new THREE.Mesh(
    broad_highlightGeom,
    broad_highlightMat
  );
  broad_highlight.renderOrder = 3;
  cabochon_group.add(broad_highlight);

  const highlight_glowMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const highlight_glow = new THREE.Mesh(
    broad_highlightGeom,
    highlight_glowMat
  );
  highlight_glow.scale.set(1.18, 1.18, 1.18);
  highlight_glow.renderOrder = 2;
  cabochon_group.add(highlight_glow);

  cabochon_group.rotation.set(-0.08, 0.05, -0.28);

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
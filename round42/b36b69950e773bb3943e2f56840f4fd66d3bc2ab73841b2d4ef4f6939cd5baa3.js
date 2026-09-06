export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "soccer_ball";

  const ball_surface = new THREE.Group();
  ball_surface.name = "ball_surface";
  root.add(ball_surface);

  const ball_coreMat = new THREE.MeshStandardMaterial({
    color: 0xc95a12,
    metalness: 0.0,
    roughness: 0.7,
  });
  const orange_hexagon_panelsMat = new THREE.MeshStandardMaterial({
    color: 0xff7908,
    metalness: 0.0,
    roughness: 0.7,
  });
  const black_pentagon_panelsMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.7,
  });
  const seam_detailMat = new THREE.MeshStandardMaterial({
    color: 0x21130e,
    metalness: 0.0,
    roughness: 0.8,
  });

  const ball_coreGeom = new THREE.SphereGeometry(0.992, 64, 32);
  const ball_core = new THREE.Mesh(ball_coreGeom, ball_coreMat);
  ball_core.name = "ball_core";
  ball_surface.add(ball_core);

  const phi = (1 + Math.sqrt(5)) / 2;
  const base_vertices = [
    new THREE.Vector3(-1, phi, 0),
    new THREE.Vector3(1, phi, 0),
    new THREE.Vector3(-1, -phi, 0),
    new THREE.Vector3(1, -phi, 0),
    new THREE.Vector3(0, -1, phi),
    new THREE.Vector3(0, 1, phi),
    new THREE.Vector3(0, -1, -phi),
    new THREE.Vector3(0, 1, -phi),
    new THREE.Vector3(phi, 0, -1),
    new THREE.Vector3(phi, 0, 1),
    new THREE.Vector3(-phi, 0, -1),
    new THREE.Vector3(-phi, 0, 1),
  ];

  for (const vertex of base_vertices) {
    vertex.normalize();
  }

  const front_axis = new THREE.Vector3(0, 0, 1);
  const pattern_alignment = new THREE.Quaternion().setFromUnitVectors(
    base_vertices[5].clone(),
    front_axis
  );

  for (const vertex of base_vertices) {
    vertex.applyQuaternion(pattern_alignment);
    vertex.applyAxisAngle(front_axis, 0.12);
  }

  const icosahedron_faces = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  const neighbor_sets = [];
  for (let i = 0; i < base_vertices.length; i++) {
    neighbor_sets.push(new Set());
  }

  for (const face of icosahedron_faces) {
    neighbor_sets[face[0]].add(face[1]);
    neighbor_sets[face[0]].add(face[2]);
    neighbor_sets[face[1]].add(face[0]);
    neighbor_sets[face[1]].add(face[2]);
    neighbor_sets[face[2]].add(face[0]);
    neighbor_sets[face[2]].add(face[1]);
  }

  function truncatedPoint(a, b) {
    return base_vertices[a]
      .clone()
      .multiplyScalar(2)
      .add(base_vertices[b])
      .normalize();
  }

  function orientFaceIndices(first_point, second_point, face_indices) {
    const edge_a = second_point.clone().sub(first_point);
    let edge_b;
    let edge_c;

    for (let i = 1; i < face_indices.length; i++) {
      edge_b = face_indices[i].clone().sub(first_point);
      edge_c = face_indices[i + 1].clone().sub(first_point);

      if (edge_a.cross(edge_b).dot(edge_c) >= 0) {
        return face_indices;
      }

      face_indices.reverse();
      return face_indices;
    }

    return face_indices;
  }

  function createFaceData(first_point, second_point, face_indices, radius) {
    const center = new THREE.Vector3();

    for (const point of face_indices) {
      center.add(point);
    }
    center.normalize();

    const inset = 0.026;
    const shrink = 1 - inset;
    const contour = [];

    for (const point of face_indices) {
      contour.push(
        point
          .clone()
          .multiplyScalar(shrink)
          .add(center.clone().multiplyScalar(inset))
          .normalize()
          .multiplyScalar(radius)
      );
    }

    return {
      center: center.clone(),
      contour: contour,
    };
  }

  const pentagon_faces = [];

  for (
    let vertex_index = 0;
    vertex_index < base_vertices.length;
    vertex_index++
  ) {
    const vertex = base_vertices[vertex_index];
    const reference =
      Math.abs(vertex.y) < 0.85
        ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(1, 0, 0);

    const tangent_x = reference.clone().cross(vertex).normalize();
    const tangent_y = vertex.clone().cross(tangent_x).normalize();
    const ordered_neighbors = Array.from(neighbor_sets[vertex_index]);

    ordered_neighbors.sort((a, b) => {
      const offset_a = base_vertices[a]
        .clone()
        .sub(vertex.clone().multiplyScalar(base_vertices[a].dot(vertex)));
      const offset_b = base_vertices[b]
        .clone()
        .sub(vertex.clone().multiplyScalar(base_vertices[b].dot(vertex)));

      const angle_a = Math.atan2(
        offset_a.dot(tangent_y),
        offset_a.dot(tangent_x)
      );
      const angle_b = Math.atan2(
        offset_b.dot(tangent_y),
        offset_b.dot(tangent_x)
      );

      return angle_a - angle_b;
    });

    const face_indices = ordered_neighbors.map((neighbor) =>
      truncatedPoint(vertex_index, neighbor)
    );

    pentagon_faces.push(
      createFaceData(
        truncatedPoint(vertex_index, ordered_neighbors[0]),
        truncatedPoint(vertex_index, ordered_neighbors[1]),
        orientFaceIndices(
          truncatedPoint(vertex_index, ordered_neighbors[0]),
          truncatedPoint(vertex_index, ordered_neighbors[1]),
          face_indices
        ),
        1.012
      )
    );
  }

  const hexagon_faces = [];

  for (const face of icosahedron_faces) {
    const a = face[0];
    const b = face[1];
    const c = face[2];
    const face_indices = [
      truncatedPoint(a, b),
      truncatedPoint(b, a),
      truncatedPoint(b, c),
      truncatedPoint(c, b),
      truncatedPoint(c, a),
      truncatedPoint(a, c),
    ];

    hexagon_faces.push(
      createFaceData(
        truncatedPoint(a, b),
        truncatedPoint(b, a),
        orientFaceIndices(
          truncatedPoint(a, b),
          truncatedPoint(b, a),
          face_indices
        ),
        1.014
      )
    );
  }

  function appendTriangle(positions, normals, a, b, c) {
    const edge_ab = b.clone().sub(a);
    const edge_ac = c.clone().sub(a);
    const face_normal = edge_ab.cross(edge_ac).normalize();

    const points = [a, b, c];

    for (const point of points) {
      positions.push(point.x, point.y, point.z);
      normals.push(face_normal.x, face_normal.y, face_normal.z);
    }
  }

  function createPanelGeometry(face_data) {
    const positions = [];
    const normals = [];
    const center_radius = 1.026;
    const center = face_data.center
      .clone()
      .multiplyScalar(center_radius);

    for (let i = 0; i < face_data.contour.length; i++) {
      appendTriangle(
        positions,
        normals,
        center,
        face_data.contour[i],
        face_data.contour[(i + 1) % face_data.contour.length]
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.computeBoundingSphere();
    return geometry;
  }

  const black_pentagon_panels = new THREE.Group();
  black_pentagon_panels.name = "black_pentagon_panels";
  ball_surface.add(black_pentagon_panels);

  for (let i = 0; i < pentagon_faces.length; i++) {
    const black_pentagon_panelGeom = createPanelGeometry(pentagon_faces[i]);
    const black_pentagon_panel = new THREE.Mesh(
      black_pentagon_panelGeom,
      black_pentagon_panelsMat
    );
    black_pentagon_panel.name = "black_pentagon_panel_" + i;
    black_pentagon_panels.add(black_pentagon_panel);
  }

  const orange_hexagon_panels = new THREE.Group();
  orange_hexagon_panels.name = "orange_hexagon_panels";
  ball_surface.add(orange_hexagon_panels);

  for (let i = 0; i < hexagon_faces.length; i++) {
    const orange_hexagon_panelGeom = createPanelGeometry(hexagon_faces[i]);
    const orange_hexagon_panel = new THREE.Mesh(
      orange_hexagon_panelGeom,
      orange_hexagon_panelsMat
    );
    orange_hexagon_panel.name = "orange_hexagon_panel_" + i;
    orange_hexagon_panels.add(orange_hexagon_panel);
  }

  const edge_map = new Map();
  const all_faces = pentagon_faces.concat(hexagon_faces);

  for (const face_data of all_faces) {
    const contour = face_data.contour;

    for (let i = 0; i < contour.length; i++) {
      const start = contour[i];
      const end = contour[(i + 1) % contour.length];
      const start_key = start
        .clone()
        .multiplyScalar(100000)
        .round()
        .toArray()
        .join(":");
      const end_key = end
        .clone()
        .multiplyScalar(100000)
        .round()
        .toArray()
        .join(":");
      const edge_key =
        start_key < end_key
          ? start_key + "|" + end_key
          : end_key + "|" + start_key;

      if (!edge_map.has(edge_key)) {
        edge_map.set(edge_key, [start.clone(), end.clone()]);
      }
    }
  }

  const seam_edges = Array.from(edge_map.values());
  const seam_polygons = [];

  for (const edge of seam_edges) {
    const start = edge[0];
    const end = edge[1];
    const center = start.clone().add(end).normalize();
    const tangent = end.clone().sub(start).normalize();
    const side = center.clone().cross(tangent).normalize();
    const half_width = 0.0055;
    const polygon = [];

    for (let step = 0; step <= 6; step++) {
      const t = step / 6;
      const point = start.clone().lerp(end, t);
      point.add(side.clone().multiplyScalar(half_width));
      point.normalize().multiplyScalar(1.028);
      polygon.push(point);
    }

    for (let step = 6; step >= 0; step--) {
      const t = step / 6;
      const point = start.clone().lerp(end, t);
      point.add(side.clone().multiplyScalar(-half_width));
      point.normalize().multiplyScalar(1.028);
      polygon.push(point);
    }

    seam_polygons.push(polygon);
  }

  function createSeamGeometry(polygons) {
    const positions = [];
    const normals = [];

    for (const polygon of polygons) {
      for (let i = 1; i < polygon.length - 1; i++) {
        appendTriangle(
          positions,
          normals,
          polygon[0],
          polygon[i],
          polygon[i + 1]
        );
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.computeBoundingSphere();
    return geometry;
  }

  const seam_networkGeom = createSeamGeometry(seam_polygons);
  const seam_networkMat = seam_detailMat;
  const seam_network = new THREE.Mesh(seam_networkGeom, seam_networkMat);
  seam_network.name = "seam_network";
  ball_surface.add(seam_network);

  const stitch_polygons = [];
  const stitch_radius = 1.031;
  const stitch_half_length = 0.0065;
  const stitch_half_width = 0.0022;

  for (const edge of seam_edges) {
    const start = edge[0];
    const end = edge[1];

    for (let i = 1; i <= 5; i++) {
      const t = i / 6;
      const center = start.clone().lerp(end, t).normalize();
      const tangent = end.clone().sub(start).normalize();
      const side = center.clone().cross(tangent).normalize();

      const stitch_start = center
        .clone()
        .add(tangent.clone().multiplyScalar(-stitch_half_length))
        .add(side.clone().multiplyScalar(stitch_half_width))
        .normalize()
        .multiplyScalar(stitch_radius);

      const stitch_end = center
        .clone()
        .add(tangent.clone().multiplyScalar(stitch_half_length))
        .add(side.clone().multiplyScalar(stitch_half_width))
        .normalize()
        .multiplyScalar(stitch_radius);

      const lower_left = center
        .clone()
        .add(tangent.clone().multiplyScalar(-stitch_half_length))
        .add(side.clone().multiplyScalar(-stitch_half_width))
        .normalize()
        .multiplyScalar(stitch_radius);

      const lower_right = center
        .clone()
        .add(tangent.clone().multiplyScalar(stitch_half_length))
        .add(side.clone().multiplyScalar(-stitch_half_width))
        .normalize()
        .multiplyScalar(stitch_radius);

      stitch_polygons.push([
        stitch_start,
        stitch_end,
        lower_right,
        lower_left,
      ]);
    }
  }

  const seam_stitchesGeom = createSeamGeometry(stitch_polygons);
  const seam_stitchesMat = seam_detailMat;
  const seam_stitches = new THREE.Mesh(
    seam_stitchesGeom,
    seam_stitchesMat
  );
  seam_stitches.name = "seam_stitches";
  ball_surface.add(seam_stitches);

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
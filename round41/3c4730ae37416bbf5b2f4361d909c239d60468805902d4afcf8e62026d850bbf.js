export default function generate(THREE) {
  const root = new THREE.Group();

  const rose_goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8a084,
    metalness: 0.6,
    roughness: 0.2,
  });

  const ring_bandGeom = new THREE.TorusGeometry(0.60, 0.105, 20, 72);
  const ring_band = new THREE.Mesh(ring_bandGeom, rose_goldMat);
  ring_band.rotation.x = Math.PI / 2;
  ring_band.position.y = -0.02;
  root.add(ring_band);

  const star_outer_radius = 0.68;
  const star_inner_radius = 0.31;
  const star_vertices = [];

  for (let i = 0; i < 10; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 === 0 ? star_outer_radius : star_inner_radius;
    star_vertices.push(
      new THREE.Vector2(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      )
    );
  }

  const star_shape = new THREE.Shape();
  const first_vertex = star_vertices[0];
  const last_vertex = star_vertices[star_vertices.length - 1];
  const corner_cut = 0.11;

  function toward(point, target, amount) {
    return new THREE.Vector2(
      point.x + (target.x - point.x) * amount,
      point.y + (target.y - point.y) * amount
    );
  }

  star_shape.moveTo(
    last_vertex.x + (first_vertex.x - last_vertex.x) * corner_cut,
    last_vertex.y + (first_vertex.y - last_vertex.y) * corner_cut
  );

  for (let i = 0; i < star_vertices.length; i++) {
    const previous = star_vertices[(i + star_vertices.length - 1) % star_vertices.length];
    const current = star_vertices[i];
    const next = star_vertices[(i + 1) % star_vertices.length];
    const incoming = toward(current, previous, corner_cut);
    const outgoing = toward(current, next, corner_cut);

    star_shape.lineTo(incoming.x, incoming.y);
    star_shape.bezierCurveTo(
      current.x,
      current.y,
      current.x,
      current.y,
      outgoing.x,
      outgoing.y
    );
  }

  star_shape.closePath();

  const star_depth = 0.13;
  const star_emblemGeom = new THREE.ExtrudeGeometry(star_shape, {
    depth: star_depth,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.055,
    bevelOffset: 0,
    bevelSegments: 6,
  });
  star_emblemGeom.translate(0, 0, -star_depth / 2);

  const star_emblem = new THREE.Mesh(star_emblemGeom, rose_goldMat);
  star_emblem.position.set(0, -0.04, 0.60);
  root.add(star_emblem);

  const center_finial_profile = [
    new THREE.Vector2(0.00, -0.08),
    new THREE.Vector2(0.34, -0.08),
    new THREE.Vector2(0.40, -0.06),
    new THREE.Vector2(0.42, -0.025),
    new THREE.Vector2(0.40, 0.015),
    new THREE.Vector2(0.35, 0.065),
    new THREE.Vector2(0.30, 0.12),
    new THREE.Vector2(0.255, 0.19),
    new THREE.Vector2(0.22, 0.28),
    new THREE.Vector2(0.185, 0.39),
    new THREE.Vector2(0.15, 0.50),
    new THREE.Vector2(0.115, 0.60),
    new THREE.Vector2(0.085, 0.675),
    new THREE.Vector2(0.055, 0.72),
    new THREE.Vector2(0.025, 0.742),
    new THREE.Vector2(0.00, 0.748),
  ];

  const center_finialGeom = new THREE.LatheGeometry(center_finial_profile, 48);
  const center_finial = new THREE.Mesh(center_finialGeom, rose_goldMat);
  center_finial.position.set(0, 0.015, 0.75);
  root.add(center_finial);

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
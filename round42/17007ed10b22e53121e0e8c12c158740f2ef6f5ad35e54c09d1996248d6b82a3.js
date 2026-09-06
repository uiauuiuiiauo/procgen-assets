export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "knife";

  const knife_assembly = new THREE.Group();
  knife_assembly.name = "knife_assembly";
  knife_assembly.rotation.z = -Math.PI * 0.24;
  root.add(knife_assembly);

  const blade_group = new THREE.Group();
  blade_group.name = "blade_group";
  knife_assembly.add(blade_group);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  knife_assembly.add(handle_group);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const cutting_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide
  });

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x202124,
    metalness: 0.0,
    roughness: 0.95
  });

  const handle_fibersMat = new THREE.MeshStandardMaterial({
    color: 0x34363a,
    metalness: 0.0,
    roughness: 0.95
  });

  const handle_ringsMat = new THREE.MeshStandardMaterial({
    color: 0x17181a,
    metalness: 0.0,
    roughness: 0.95
  });

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0.0, -1.72);
  bladeShape.bezierCurveTo(0.10, -1.55, 0.24, -0.75, 0.26, 0.18);
  bladeShape.lineTo(0.26, 0.34);
  bladeShape.bezierCurveTo(0.26, 0.40, 0.20, 0.46, 0.14, 0.47);
  bladeShape.lineTo(-0.14, 0.47);
  bladeShape.bezierCurveTo(-0.20, 0.46, -0.26, 0.40, -0.26, 0.34);
  bladeShape.lineTo(-0.26, -0.16);
  bladeShape.bezierCurveTo(-0.25, -0.80, -0.12, -1.55, 0.0, -1.72);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.05,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.009,
    bevelSegments: 3
  });
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.name = "blade";
  blade.position.z = -0.025;
  blade_group.add(blade);

  const cutting_edgeShape = new THREE.Shape();
  cutting_edgeShape.moveTo(0.0, -1.70);
  cutting_edgeShape.bezierCurveTo(0.10, -1.54, 0.235, -0.74, 0.255, 0.18);
  cutting_edgeShape.lineTo(0.255, 0.30);
  cutting_edgeShape.lineTo(0.215, 0.29);
  cutting_edgeShape.lineTo(0.215, 0.16);
  cutting_edgeShape.bezierCurveTo(0.20, -0.40, 0.10, -1.20, 0.0, -1.66);
  cutting_edgeShape.closePath();

  const cutting_edgeGeom = new THREE.ShapeGeometry(cutting_edgeShape, 24);
  const cutting_edge = new THREE.Mesh(cutting_edgeGeom, cutting_edgeMat);
  cutting_edge.name = "cutting_edge";
  cutting_edge.position.z = 0.039;
  blade_group.add(cutting_edge);

  const blade_tangGeom = new THREE.BoxGeometry(0.34, 0.30, 0.05);
  const blade_tang = new THREE.Mesh(blade_tangGeom, bladeMat);
  blade_tang.name = "blade_tang";
  blade_tang.position.set(0, 0.50, 0);
  blade_group.add(blade_tang);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.24, 0.48);
  handleShape.lineTo(0.24, 0.48);
  handleShape.bezierCurveTo(0.29, 0.50, 0.31, 0.61, 0.31, 0.74);
  handleShape.lineTo(0.31, 1.93);
  handleShape.bezierCurveTo(0.31, 2.05, 0.20, 2.14, 0.0, 2.16);
  handleShape.bezierCurveTo(-0.20, 2.14, -0.31, 2.05, -0.31, 1.93);
  handleShape.lineTo(-0.31, 0.74);
  handleShape.bezierCurveTo(-0.31, 0.61, -0.29, 0.50, -0.24, 0.48);
  handleShape.closePath();

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.28,
    steps: 1,
    curveSegments: 28,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.025,
    bevelSegments: 4
  });
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  handle.position.z = -0.14;
  handle_group.add(handle);

  const handle_fibersGeom = new THREE.CylinderGeometry(
    0.0022,
    0.0028,
    0.055,
    5
  );
  const fiberRows = 30;
  const fiberColumns = 17;
  const fiberCount = fiberRows * fiberColumns;
  const handle_fibers = new THREE.InstancedMesh(
    handle_fibersGeom,
    handle_fibersMat,
    fiberCount
  );
  handle_fibers.name = "handle_fibers";

  const fiberDummy = new THREE.Object3D();
  const fiberUp = new THREE.Vector3(0, 1, 0);
  const fiberDirection = new THREE.Vector3();
  let fiberIndex = 0;

  for (let row = 0; row < fiberRows; row++) {
    const rowT = row / (fiberRows - 1);
    const y = 0.55 + rowT * 1.50;
    const endTaper = y > 1.92 ? 1 - (y - 1.92) * 1.6 : 1;
    const rowOffset = ((row % 3) - 1) * 0.006;

    for (let column = 0; column < fiberColumns; column++) {
      const columnT = column / (fiberColumns - 1);
      const x = (-0.92 + columnT * 1.84) * 0.275 * endTaper + rowOffset;
      const z = 0.183 + ((row + column) % 3) * 0.0015;
      const lengthScale = 0.72 + ((row * 7 + column * 5) % 6) * 0.055;
      const angle = ((row * 11 + column * 7) % 9 - 4) * 0.035;

      fiberDummy.position.set(x, y, z);
      fiberDummy.rotation.set(angle, 0, angle * 1.7);
      fiberDummy.scale.set(1, lengthScale, 1);
      fiberDummy.updateMatrix();
      handle_fibers.setMatrixAt(fiberIndex, fiberDummy.matrix);
      fiberIndex++;
    }
  }
  handle_fibers.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_fibers);

  const handle_ringsGeom = new THREE.TorusGeometry(0.278, 0.004, 5, 32);
  const handle_rings = new THREE.InstancedMesh(
    handle_ringsGeom,
    handle_ringsMat,
    12
  );
  handle_rings.name = "handle_rings";

  const ringDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const y = 0.66 + i * 0.105;
    const endScale = y > 1.90 ? 0.90 : 1.0;
    ringDummy.position.set(0, y, 0);
    ringDummy.rotation.set(Math.PI / 2, 0, 0);
    ringDummy.scale.set(endScale, 0.52, 1);
    ringDummy.updateMatrix();
    handle_rings.setMatrixAt(i, ringDummy.matrix);
  }
  handle_rings.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_rings);

  const surface_fibersGeom = new THREE.CylinderGeometry(
    0.0024,
    0.0032,
    0.075,
    5
  );
  const surfaceFiberCount = 120;
  const surface_fibers = new THREE.InstancedMesh(
    surface_fibersGeom,
    handle_fibersMat,
    surfaceFiberCount
  );
  surface_fibers.name = "surface_fibers";

  const surfaceDummy = new THREE.Object3D();
  const surfaceDirection = new THREE.Vector3();
  const surfaceAxis = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < surfaceFiberCount; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const level = Math.floor(i / 2);
    const t = level / 59;
    const y = 0.54 + t * 1.54;
    const endTaper = y > 1.92 ? 1 - (y - 1.92) * 1.5 : 1;
    const z = -0.12 + (i % 12) * 0.021;
    const x = side * 0.315 * endTaper;
    const lengthScale = 0.68 + (i % 7) * 0.045;

    surfaceDirection.set(
      side * (0.88 + (i % 3) * 0.04),
      ((i % 5) - 2) * 0.08,
      ((i % 9) - 4) * 0.035
    ).normalize();

    surfaceDummy.position.set(
      x + surfaceDirection.x * 0.025 * lengthScale,
      y + surfaceDirection.y * 0.025 * lengthScale,
      z + surfaceDirection.z * 0.025 * lengthScale
    );
    surfaceDummy.quaternion.setFromUnitVectors(surfaceAxis, surfaceDirection);
    surfaceDummy.scale.set(1, lengthScale, 1);
    surfaceDummy.updateMatrix();
    surface_fibers.setMatrixAt(i, surfaceDummy.matrix);
  }
  surface_fibers.instanceMatrix.needsUpdate = true;
  handle_group.add(surface_fibers);

  const blade_logo = new THREE.Group();
  blade_logo.name = "blade_logo";
  blade_group.add(blade_logo);

  const blade_logoGeom = new THREE.BoxGeometry(0.075, 0.008, 0.004);
  const blade_logoMat = new THREE.MeshStandardMaterial({
    color: 0x454545,
    metalness: 0.0,
    roughness: 0.7
  });
  const logoSpecs = [
    [-0.080, 0.180, 0.62, 0.90, 0.00],
    [-0.045, 0.145, 0.72, 0.85, 0.00],
    [-0.045, 0.115, 0.72, 0.85, 0.00],
    [-0.045, 0.085, 0.72, 0.85, 0.00],
    [-0.045, 0.055, 0.72, 0.85, 0.00],
    [-0.045, 0.025, 0.72, 0.85, 0.00],
    [-0.045, -0.005, 0.72, 0.85, 0.00],
    [-0.045, -0.035, 0.72, 0.85, 0.00],
    [-0.045, -0.065, 0.72, 0.85, 0.00]
  ];
  const blade_logo_marks = new THREE.InstancedMesh(
    blade_logoGeom,
    blade_logoMat,
    logoSpecs.length
  );
  blade_logo_marks.name = "blade_logo_marks";

  const logoDummy = new THREE.Object3D();
  for (let i = 0; i < logoSpecs.length; i++) {
    const spec = logoSpecs[i];
    logoDummy.position.set(spec[0], spec[1], 0.041);
    logoDummy.rotation.set(0, 0, spec[4]);
    logoDummy.scale.set(spec[2], spec[3], 1);
    logoDummy.updateMatrix();
    blade_logo_marks.setMatrixAt(i, logoDummy.matrix);
  }
  blade_logo_marks.instanceMatrix.needsUpdate = true;
  blade_logo.add(blade_logo_marks);

  const blade_logo_emblemGeom = new THREE.RingGeometry(0.014, 0.022, 16);
  const blade_logo_emblem = new THREE.Mesh(
    blade_logo_emblemGeom,
    blade_logoMat
  );
  blade_logo_emblem.name = "blade_logo_emblem";
  blade_logo_emblem.position.set(-0.105, 0.182, 0.043);
  blade_logo_emblem.scale.set(0.72, 1.15, 1);
  blade_logo.add(blade_logo_emblem);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    object.updateMatrixWorld(true);
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
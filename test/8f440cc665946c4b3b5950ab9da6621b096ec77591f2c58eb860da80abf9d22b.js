export default function generate(THREE) {
  const root = new THREE.Group();

  const textureSize = 64;
  const textureData = new Uint8Array(textureSize * textureSize * 4);
  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const index = (y * textureSize + x) * 4;
      const grain = 92 + ((x * 37 + y * 61 + x * y * 11) % 100);
      textureData[index] = grain;
      textureData[index + 1] = grain;
      textureData[index + 2] = grain;
      textureData[index + 3] = 255;
    }
  }
  const cast_texture = new THREE.DataTexture(
    textureData,
    textureSize,
    textureSize,
    THREE.RGBAFormat
  );
  cast_texture.wrapS = THREE.RepeatWrapping;
  cast_texture.wrapT = THREE.RepeatWrapping;
  cast_texture.repeat.set(7, 7);
  cast_texture.magFilter = THREE.LinearFilter;
  cast_texture.minFilter = THREE.LinearFilter;
  cast_texture.needsUpdate = true;

  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x343638,
    metalness: 0.0,
    roughness: 0.72,
    bumpMap: cast_texture,
    bumpScale: 0.012,
  });
  const spokesMat = new THREE.MeshStandardMaterial({
    color: 0x383a3c,
    metalness: 0.0,
    roughness: 0.7,
    bumpMap: cast_texture,
    bumpScale: 0.014,
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x3a3c3e,
    metalness: 0.0,
    roughness: 0.7,
    bumpMap: cast_texture,
    bumpScale: 0.012,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    metalness: 0.0,
    roughness: 0.8,
  });
  const embossedMat = new THREE.MeshStandardMaterial({
    color: 0x292b2d,
    metalness: 0.0,
    roughness: 0.75,
    bumpMap: cast_texture,
    bumpScale: 0.006,
  });

  const rimRadius = 1.4;
  const rimTube = 0.14;
  const rimGeom = new THREE.TorusGeometry(rimRadius, rimTube, 24, 112);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.position.z = -0.015;
  rim.scale.z = 0.82;
  root.add(rim);

  const rim_inner_grooveGeom = new THREE.TorusGeometry(1.29, 0.012, 10, 112);
  const rim_inner_groove = new THREE.Mesh(rim_inner_grooveGeom, grooveMat);
  rim_inner_groove.position.z = 0.078;
  root.add(rim_inner_groove);

  const spokesShape = new THREE.Shape();
  spokesShape.moveTo(-0.105, 0.15);
  spokesShape.lineTo(-0.23, 1.18);
  spokesShape.bezierCurveTo(-0.225, 1.27, -0.18, 1.32, -0.105, 1.34);
  spokesShape.lineTo(0.105, 1.34);
  spokesShape.bezierCurveTo(0.18, 1.32, 0.225, 1.27, 0.23, 1.18);
  spokesShape.lineTo(0.105, 0.15);
  spokesShape.closePath();

  const spokesGeom = new THREE.ExtrudeGeometry(spokesShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  spokesGeom.translate(0, 0, -0.08);

  const spokes = new THREE.InstancedMesh(spokesGeom, spokesMat, 4);
  const spoke_transform = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    spoke_transform.position.set(0, 0, 0);
    spoke_transform.rotation.set(0, 0, -i * Math.PI / 2);
    spoke_transform.scale.set(1, 1, 1);
    spoke_transform.updateMatrix();
    spokes.setMatrixAt(i, spoke_transform.matrix);
  }
  spokes.instanceMatrix.needsUpdate = true;
  root.add(spokes);

  const hub_back_collarGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.14, 64);
  const hub_back_collar = new THREE.Mesh(hub_back_collarGeom, rimMat);
  hub_back_collar.rotation.x = Math.PI / 2;
  hub_back_collar.position.z = 0.015;
  root.add(hub_back_collar);

  const hub_bodyGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 64);
  const hub_body = new THREE.Mesh(hub_bodyGeom, hubMat);
  hub_body.rotation.x = Math.PI / 2;
  hub_body.position.z = 0.07;
  root.add(hub_body);

  const hub_faceGeom = new THREE.CylinderGeometry(0.267, 0.267, 0.035, 64);
  const hub_face = new THREE.Mesh(hub_faceGeom, hubMat);
  hub_face.rotation.x = Math.PI / 2;
  hub_face.position.z = 0.178;
  root.add(hub_face);

  const hub_bezelGeom = new THREE.TorusGeometry(0.267, 0.018, 12, 64);
  const hub_bezel = new THREE.Mesh(hub_bezelGeom, grooveMat);
  hub_bezel.position.z = 0.199;
  root.add(hub_bezel);

  const center_dimpleGeom = new THREE.TorusGeometry(0.027, 0.006, 8, 32);
  const center_dimple = new THREE.Mesh(center_dimpleGeom, embossedMat);
  center_dimple.position.z = 0.202;
  root.add(center_dimple);

  const right_spoke_emblemGeom = new THREE.TorusGeometry(0.068, 0.006, 8, 40);
  const right_spoke_emblem = new THREE.Mesh(right_spoke_emblemGeom, embossedMat);
  right_spoke_emblem.position.set(1.02, -0.13, 0.125);
  root.add(right_spoke_emblem);

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
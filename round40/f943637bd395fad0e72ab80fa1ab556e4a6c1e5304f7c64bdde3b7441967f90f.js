export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_lounge_chair";

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const upholstery_group = new THREE.Group();
  upholstery_group.name = "upholstery_group";
  root.add(upholstery_group);

  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  root.add(hardware_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xc99b69,
    metalness: 0.0,
    roughness: 0.6
  });

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xc5e0e3,
    metalness: 0.0,
    roughness: 0.95
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xa8ccd0,
    metalness: 0.0,
    roughness: 0.95
  });

  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);

    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function roundedLoopXYGeometry(width, height, radius, z, tubeRadius) {
    const points = [];
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);
    const corners = [
      [hw - r, hh - r, 0],
      [-hw + r, hh - r, Math.PI / 2],
      [-hw + r, -hh + r, Math.PI],
      [hw - r, -hh + r, Math.PI * 1.5]
    ];

    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i < 5; i++) {
        const angle = corner[2] + i / 4 * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * r,
          corner[1] + Math.sin(angle) * r,
          z
        ));
      }
    }

    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 64, tubeRadius, 8, true);
  }

  function roundedLoopXZGeometry(width, depth, radius, y, tubeRadius) {
    const points = [];
    const hw = width / 2;
    const hd = depth / 2;
    const r = Math.min(radius, hw, hd);
    const corners = [
      [hw - r, hd - r, 0],
      [-hw + r, hd - r, Math.PI / 2],
      [-hw + r, -hd + r, Math.PI],
      [hw - r, -hd + r, Math.PI * 1.5]
    ];

    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i < 5; i++) {
        const angle = corner[2] + i / 4 * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * r,
          y,
          corner[1] + Math.sin(angle) * r
        ));
      }
    }

    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 64, tubeRadius, 8, true);
  }

  function placeBetween(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.scale.set(1, length, 1);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
  }

  function setInstance(mesh, index, position, rotation, scale) {
    const dummy = new THREE.Object3D();
    dummy.position.copy(position);
    dummy.rotation.set(rotation.x, rotation.y, rotation.z);
    dummy.scale.copy(scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const seatW = 1.04;
  const seatD = 0.76;
  const seatH = 0.80;
  const cushionH = 0.18;
  const backH = 1.04;
  const armW = 0.14;
  const armH = 1.16;
  const legH = 1.10;

  const seat_cushionGeom = roundedExtrudeGeometry(
    seatW,
    seatD,
    cushionH,
    0.085,
    0.018
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.rotation.x = Math.PI / 2;
  seat_cushion.position.set(0, seatH, 0.045);
  upholstery_group.add(seat_cushion);

  const seat_cushion_pipingGeom = roundedLoopXZGeometry(
    seatW + 0.015,
    seatD + 0.015,
    0.09,
    seatH + cushionH / 2 + 0.014,
    0.008
  );
  const seat_cushion_piping = new THREE.Mesh(
    seat_cushion_pipingGeom,
    seamMat
  );
  seat_cushion_piping.name = "seat_cushion_piping";
  seat_cushion_piping.position.z = 0.045;
  upholstery_group.add(seat_cushion_piping);

  const back_cushionGeom = roundedExtrudeGeometry(
    0.99,
    backH,
    0.16,
    0.09,
    0.018
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, fabricMat);
  back_cushion.name = "back_cushion";
  back_cushion.position.set(0, 1.36, -0.34);
  back_cushion.rotation.x = -0.18;
  upholstery_group.add(back_cushion);

  const back_cushion_pipingGeom = roundedLoopXYGeometry(
    1.005,
    backH + 0.01,
    0.095,
    0.098,
    0.008
  );
  const back_cushion_piping = new THREE.Mesh(
    back_cushion_pipingGeom,
    seamMat
  );
  back_cushion_piping.name = "back_cushion_piping";
  back_cushion.add(back_cushion_piping);

  const back_horizontal_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.88,
    8
  );
  const back_horizontal_seam = new THREE.Mesh(
    back_horizontal_seamGeom,
    seamMat
  );
  back_horizontal_seam.name = "back_horizontal_seam";
  back_horizontal_seam.rotation.z = Math.PI / 2;
  back_horizontal_seam.position.set(0, 0.06, 0.101);
  back_cushion.add(back_horizontal_seam);

  const seat_frame_railGeom = roundedExtrudeGeometry(
    1.14,
    0.12,
    0.11,
    0.045,
    0.012
  );

  const front_seat_rail = new THREE.Mesh(seat_frame_railGeom, woodMat);
  front_seat_rail.name = "front_seat_rail";
  front_seat_rail.position.set(0, 0.66, 0.43);
  frame_group.add(front_seat_rail);

  const rear_seat_rail = new THREE.Mesh(seat_frame_railGeom, woodMat);
  rear_seat_rail.name = "rear_seat_rail";
  rear_seat_rail.position.set(0, 0.66, -0.34);
  frame_group.add(rear_seat_rail);

  const side_seat_railGeom = roundedExtrudeGeometry(
    seatD,
    0.11,
    0.10,
    0.04,
    0.01
  );

  const left_seat_rail = new THREE.Mesh(side_seat_railGeom, woodMat);
  left_seat_rail.name = "left_seat_rail";
  left_seat_rail.rotation.y = Math.PI / 2;
  left_seat_rail.position.set(-0.57, 0.66, 0.045);
  frame_group.add(left_seat_rail);

  const right_seat_rail = new THREE.Mesh(side_seat_railGeom, woodMat);
  right_seat_rail.name = "right_seat_rail";
  right_seat_rail.rotation.y = Math.PI / 2;
  right_seat_rail.position.set(0.57, 0.66, 0.045);
  frame_group.add(right_seat_rail);

  const armrestGeom = roundedExtrudeGeometry(
    armW,
    0.94,
    0.085,
    0.055,
    0.014
  );

  const left_armrest = new THREE.Mesh(armrestGeom, woodMat);
  left_armrest.name = "left_armrest";
  left_armrest.rotation.x = Math.PI / 2;
  left_armrest.position.set(-0.64, armH, 0.06);
  frame_group.add(left_armrest);

  const right_armrest = new THREE.Mesh(armrestGeom, woodMat);
  right_armrest.name = "right_armrest";
  right_armrest.rotation.x = Math.PI / 2;
  right_armrest.position.set(0.64, armH, 0.06);
  frame_group.add(right_armrest);

  const front_legGeom = new THREE.CylinderGeometry(
    0.075,
    0.052,
    1,
    4
  );
  front_legGeom.rotateY(Math.PI / 4);

  const left_front_leg = new THREE.Mesh(front_legGeom, woodMat);
  left_front_leg.name = "left_front_leg";
  placeBetween(
    left_front_leg,
    new THREE.Vector3(-0.66, 0.075, 0.43),
    new THREE.Vector3(-0.61, legH, 0.27)
  );
  frame_group.add(left_front_leg);

  const right_front_leg = new THREE.Mesh(front_legGeom, woodMat);
  right_front_leg.name = "right_front_leg";
  placeBetween(
    right_front_leg,
    new THREE.Vector3(0.66, 0.075, 0.43),
    new THREE.Vector3(0.61, legH, 0.27)
  );
  frame_group.add(right_front_leg);

  const rear_legGeom = new THREE.CylinderGeometry(
    0.073,
    0.05,
    1,
    4
  );
  rear_legGeom.rotateY(Math.PI / 4);

  const left_rear_leg = new THREE.Mesh(rear_legGeom, woodMat);
  left_rear_leg.name = "left_rear_leg";
  placeBetween(
    left_rear_leg,
    new THREE.Vector3(-0.66, 0.075, -0.43),
    new THREE.Vector3(-0.61, 1.08, -0.29)
  );
  frame_group.add(left_rear_leg);

  const right_rear_leg = new THREE.Mesh(rear_legGeom, woodMat);
  right_rear_leg.name = "right_rear_leg";
  placeBetween(
    right_rear_leg,
    new THREE.Vector3(0.66, 0.075, -0.43),
    new THREE.Vector3(0.61, 1.08, -0.29)
  );
  frame_group.add(right_rear_leg);

  const lower_stretcherGeom = roundedExtrudeGeometry(
    1.18,
    0.075,
    0.075,
    0.025,
    0.008
  );

  const front_lower_stretcher = new THREE.Mesh(
    lower_stretcherGeom,
    woodMat
  );
  front_lower_stretcher.name = "front_lower_stretcher";
  front_lower_stretcher.position.set(0, 0.18, 0.40);
  frame_group.add(front_lower_stretcher);

  const rear_lower_stretcher = new THREE.Mesh(
    lower_stretcherGeom,
    woodMat
  );
  rear_lower_stretcher.name = "rear_lower_stretcher";
  rear_lower_stretcher.position.set(0, 0.18, -0.40);
  frame_group.add(rear_lower_stretcher);

  const side_lower_stretcherGeom = roundedExtrudeGeometry(
    0.76,
    0.075,
    0.075,
    0.025,
    0.008
  );

  const left_lower_stretcher = new THREE.Mesh(
    side_lower_stretcherGeom,
    woodMat
  );
  left_lower_stretcher.name = "left_lower_stretcher";
  left_lower_stretcher.rotation.y = Math.PI / 2;
  left_lower_stretcher.position.set(-0.64, 0.18, 0);
  frame_group.add(left_lower_stretcher);

  const right_lower_stretcher = new THREE.Mesh(
    side_lower_stretcherGeom,
    woodMat
  );
  right_lower_stretcher.name = "right_lower_stretcher";
  right_lower_stretcher.rotation.y = Math.PI / 2;
  right_lower_stretcher.position.set(0.64, 0.18, 0);
  frame_group.add(right_lower_stretcher);

  const back_supportGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    1,
    10
  );

  const left_back_support = new THREE.Mesh(back_supportGeom, woodMat);
  left_back_support.name = "left_back_support";
  placeBetween(
    left_back_support,
    new THREE.Vector3(-0.49, 0.70, -0.35),
    new THREE.Vector3(-0.49, 1.79, -0.52)
  );
  frame_group.add(left_back_support);

  const right_back_support = new THREE.Mesh(back_supportGeom, woodMat);
  right_back_support.name = "right_back_support";
  placeBetween(
    right_back_support,
    new THREE.Vector3(0.49, 0.70, -0.35),
    new THREE.Vector3(0.49, 1.79, -0.52)
  );
  frame_group.add(right_back_support);

  const side_boltsGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.014,
    16
  );
  const side_bolts = new THREE.InstancedMesh(
    side_boltsGeom,
    hardwareMat,
    8
  );
  side_bolts.name = "side_bolts";

  const bolt_positions = [
    new THREE.Vector3(-0.675, 0.66, 0.34),
    new THREE.Vector3(-0.675, 0.66, -0.25),
    new THREE.Vector3(-0.675, 1.06, 0.29),
    new THREE.Vector3(-0.675, 1.04, -0.30),
    new THREE.Vector3(0.675, 0.66, 0.34),
    new THREE.Vector3(0.675, 0.66, -0.25),
    new THREE.Vector3(0.675, 1.06, 0.29),
    new THREE.Vector3(0.675, 1.04, -0.30)
  ];

  for (let i = 0; i < bolt_positions.length; i++) {
    setInstance(
      side_bolts,
      i,
      bolt_positions[i],
      new THREE.Euler(0, 0, Math.PI / 2),
      new THREE.Vector3(1, 1, 1)
    );
  }
  side_bolts.instanceMatrix.needsUpdate = true;
  hardware_group.add(side_bolts);

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
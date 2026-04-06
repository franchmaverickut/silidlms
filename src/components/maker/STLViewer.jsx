import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, ZoomIn, ZoomOut, Move3d } from "lucide-react";
import { Button } from "@/components/ui/button";

function loadSTL(url) {
  return fetch(url)
    .then(r => r.arrayBuffer())
    .then(buffer => {
      // Binary STL parser
      const view = new DataView(buffer);
      const numTriangles = view.getUint32(80, true);
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(numTriangles * 9);
      const normals = new Float32Array(numTriangles * 9);
      let offset = 84;
      for (let i = 0; i < numTriangles; i++) {
        const nx = view.getFloat32(offset, true); offset += 4;
        const ny = view.getFloat32(offset, true); offset += 4;
        const nz = view.getFloat32(offset, true); offset += 4;
        for (let v = 0; v < 3; v++) {
          const bi = i * 9 + v * 3;
          positions[bi] = view.getFloat32(offset, true); offset += 4;
          positions[bi + 1] = view.getFloat32(offset, true); offset += 4;
          positions[bi + 2] = view.getFloat32(offset, true); offset += 4;
          normals[bi] = nx; normals[bi + 1] = ny; normals[bi + 2] = nz;
        }
        offset += 2; // attribute byte count
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
      geometry.computeBoundingBox();
      return geometry;
    });
}

export default function STLViewer({ url, height = 320, className = "" }) {
  const mountRef = useRef(null);
  const sceneRef = useRef({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url || !mountRef.current) return;
    const el = mountRef.current;
    const w = el.clientWidth || 400;
    const h = height;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f7f5);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 10000);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xffc87c, 0.4);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Grid
    const grid = new THREE.GridHelper(10, 20, 0xdddddd, 0xeeeeee);
    scene.add(grid);

    // Mouse controls state
    let isDragging = false;
    let isRightDrag = false;
    let lastMouse = { x: 0, y: 0 };
    let spherical = { theta: 0.4, phi: 1.0, radius: 5 };
    let target = new THREE.Vector3(0, 0, 0);

    function updateCamera() {
      camera.position.set(
        target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta),
        target.y + spherical.radius * Math.cos(spherical.phi),
        target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
      );
      camera.lookAt(target);
    }
    updateCamera();

    const onMouseDown = (e) => {
      isDragging = true;
      isRightDrag = e.button === 2;
      lastMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      lastMouse = { x: e.clientX, y: e.clientY };
      if (isRightDrag) {
        const speed = 0.005 * spherical.radius;
        const right = new THREE.Vector3().crossVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(camera.position, target).normalize()
        ).normalize();
        target.addScaledVector(right, dx * speed);
        target.y += dy * speed;
      } else {
        spherical.theta -= dx * 0.01;
        spherical.phi = Math.max(0.05, Math.min(Math.PI - 0.05, spherical.phi - dy * 0.01));
      }
      updateCamera();
    };
    const onMouseUp = () => { isDragging = false; };
    const onWheel = (e) => {
      e.preventDefault();
      spherical.radius = Math.max(0.5, spherical.radius * (1 + e.deltaY * 0.001));
      updateCamera();
    };
    const onContextMenu = (e) => e.preventDefault();

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("contextmenu", onContextMenu);

    // Load model
    const isGLB = url.toLowerCase().includes(".glb") || url.toLowerCase().includes(".gltf");
    let mesh = null;

    const addGeometry = (geometry) => {
      geometry.center();
      geometry.computeBoundingSphere();
      const r = geometry.boundingSphere.radius;
      spherical.radius = r * 2.8;
      updateCamera();
      grid.position.y = -(r * 0.8);
      const mat = new THREE.MeshPhongMaterial({ color: 0xf97316, specular: 0xffd0a0, shininess: 40 });
      mesh = new THREE.Mesh(geometry, mat);
      scene.add(mesh);
      setLoading(false);
    };

    if (isGLB) {
      import("three/examples/jsm/loaders/GLTFLoader.js").then(({ GLTFLoader }) => {
        new GLTFLoader().load(url, (gltf) => {
          scene.add(gltf.scene);
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const r = Math.max(size.x, size.y, size.z);
          gltf.scene.position.sub(center);
          spherical.radius = r * 2;
          updateCamera();
          setLoading(false);
        }, undefined, () => setError("Failed to load model"));
      });
    } else {
      loadSTL(url).then(addGeometry).catch(() => setError("Failed to load STL"));
    }

    // Animation loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, camera, scene, spherical, target, updateCamera };

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("contextmenu", onContextMenu);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [url, height]);

  const resetView = () => {
    const { spherical, target, updateCamera } = sceneRef.current;
    if (!spherical) return;
    target.set(0, 0, 0);
    spherical.theta = 0.4;
    spherical.phi = 1.0;
    updateCamera();
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-border/60 bg-[#f8f7f5] ${className}`} style={{ height }}>
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#f8f7f5]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground">Loading 3D model...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <Move3d className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{error}</p>
          </div>
        </div>
      )}
      <div ref={mountRef} className="w-full" style={{ height }} />
      {!loading && !error && (
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <Button size="icon" variant="secondary" className="w-7 h-7 rounded-lg shadow-sm opacity-80 hover:opacity-100" onClick={resetView} title="Reset view">
            <RotateCcw size={12} />
          </Button>
        </div>
      )}
      {!loading && !error && (
        <div className="absolute bottom-3 left-3 bg-black/30 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm">
          Drag to rotate • Scroll to zoom • Right-drag to pan
        </div>
      )}
    </div>
  );
}
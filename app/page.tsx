"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Navbar from "@/components/Navbar";
import { OBJLoader } from 'three-stdlib';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2).normalize();
    scene.add(light);

    // Load 3D Object
    const loader = new OBJLoader();
    loader.load('/assets/img/Logo_Ecoute.obj', (object) => {
      object.scale.set(0.5, 0.5, 0.5); // Adjust size as needed
      object.position.x = 0; // Position the object
      object.position.y = 0; // Adjust for vertical positioning
      scene.add(object);

      // Rotate animation
      const animate = () => {
        requestAnimationFrame(animate);
        object.rotation.y += 0.05; // Speed of rotation
        renderer.render(scene, camera);
      };
      animate();
    });

    // Camera position
    camera.position.z = 5;

    // Resize listener
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="bg-[#EEECEB] h-screen text-black">
      <Navbar />

      {/* Grid layout for 3D Object and Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* 3D Object Section (Left) */}
        <div className="flex items-center justify-center">
          <canvas ref={canvasRef} className="w-full h-full"></canvas> {/* Canvas for 3D Model */}
        </div>

        {/* Text Content Section (Right) */}
        <div className="flex flex-col justify-center pl-8 md:pl-20 space-y-6">
          <h2 className="text-sm font-light uppercase text-gray-600">
            Unleashing the Power of Artificial Intelligence to Transform Your Business
          </h2>
          <h1 className="text-6xl font-bold leading-none text-black">
            Your Voice,
            <br />
            Our Priority
          </h1>
          <p className="text-lg font-light text-gray-700">
            Listen - Connect - Evolve
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white py-4">
        <div className="container mx-auto flex justify-between px-8 md:px-20">
          <div className="text-xs text-gray-600">KVARASCALEIE©2024</div>
          <div className="flex space-x-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-black">100</h3>
              <p className="text-sm text-gray-600">Booked</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-black">75</h3>
              <p className="text-sm text-gray-600">Launch</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-black">310</h3>
              <p className="text-sm text-gray-600">Success</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

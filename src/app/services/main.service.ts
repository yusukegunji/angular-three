import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
  providedIn: 'root',
})
export class MainService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;
  private lightDirec: THREE.DirectionalLight;

  private geometry: THREE.BoxGeometry;
  private material: THREE.MeshPhongMaterial;
  private cube: THREE.Mesh;
  private isRotate: boolean;

  private frameId: number = null;

  private controls: any;

  constructor(private ngZone: NgZone) {}

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    // カメラの位置
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // 環境光源
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);

    // 並行光源
    this.lightDirec = new THREE.DirectionalLight(0xffff, 1);
    this.lightDirec.position.set(0, 10, 10);
    this.scene.add(this.lightDirec);

    // ボックス
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshPhongMaterial({ color: 0x000000 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.renderer.render(this.scene, this.camera);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);

      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  animate(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('DOMContentLoaded', () => {
        this.render();
      });
    });

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    if (this.isRotate) {
      this.cube.rotation.x += 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  rotate(): void {
    this.isRotate = true;
    console.log(this.isRotate);

    console.log('rotate');
  }

  rotateOff(): void {
    this.isRotate = false;
    console.log(this.isRotate);

    console.log('off');
  }

  ngOnDestroy(): void {
    if (this.frameId != null) {
      console.log('check');
      console.log(this.frameId);

      cancelAnimationFrame(this.frameId);
    }
  }
}

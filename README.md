<p align="center">
  <img width="1916" height="821" alt="Moonshot Robotics" src="https://github.com/user-attachments/assets/ed8d7cff-5754-4832-a57d-23dbcd6344f2" />
</p>

> ### AI-native robotics sandbox for designing, simulating, and training robots from natural language 

### full demo : https://www.youtube.com/watch?v=1JEDouzUEo8 / 

## 3D Physics sandbox

<img width="1143" height="585" alt="Screenshot 2026-06-30 at 12 47 33 AM" src="https://github.com/user-attachments/assets/4ad729b8-3b04-4b64-ac16-c20d96f9b1a9" />

## IDO Library

<p align="center">
  <img width="1710" height="869" alt="IDO Library" src="https://github.com/user-attachments/assets/9feac411-b5c8-411b-80db-ecc9f74f23f7" />
</p>

Moonshot uses IDO, an open-source 3D design harness I built for parametric engineering assets (https://github.com/v1shay/ido)

IDO works across tools like Blender and OpenSCAD to generate high-quality robotic components. In Moonshot, it acts as the physical design layer for Luna

The asset system includes nearly 600 robotics assets stored through MongoDB

---

<div align = "center">

<img width="475" height="600" alt="ChatGPT Image Jun 30, 2026, 12_59_12 AM" src="https://github.com/user-attachments/assets/2a7bf5c4-30d3-4ff8-b685-0e63ab0a6317" />

</div>

## What people have built with Luna:

<p align="center">
  <img height="380" alt="Luna Built Robot" src="https://github.com/user-attachments/assets/03069bee-fd9d-4af4-aeba-60e6fc6f20b4" />
  <img height="380" alt="Luna Built Robot" src="https://github.com/user-attachments/assets/6ba56990-2473-4f09-a1d3-001b4ef4fc7d" />
</p>

<p align="center">
  <img height="200" alt="Luna Built Rover" src="https://github.com/user-attachments/assets/626a1c9c-504b-4520-a6ec-069b95c72630" />
  <img height="200" alt="Luna Built Robot" src="https://github.com/user-attachments/assets/f723da8e-3441-45e1-ba13-50801b730d19" />
  <img height="200" alt="Luna Built Robotic Dog" src="https://github.com/user-attachments/assets/4c8ce2b4-0777-4e0f-a544-6cd6e12aaa8f" />
</p>

## Training

Moonshot also builds simulation tasks and runs repeated training episodes. Luna defines the environment, objects, task objective, and success criteria. The system then runs structured episodes using reinforcement-learning logic until the robot completes the task

Below training images include:

* humanoid box transfer
* disaster rover debris navigation & survivor search
* robotic arm trash sorting

<p align="center">
  <img width="1149" height="551" alt="Luna Trained Humanoid" src="https://github.com/user-attachments/assets/0897dce0-8a04-4090-a384-cf9c45c76057" />
</p>

<p align="center">
  <img width="1146" height="548" alt="Luna Trained Rover" src="https://github.com/user-attachments/assets/ed4f55d7-c0fd-4fdc-8009-705b4c1843cc" />
</p>

<p align="center">
  <img width="1147" height="552" alt="Luna Trained Arm" src="https://github.com/user-attachments/assets/9d62d3d4-4520-4c01-acc3-e3322de5b257" />
</p>

## Stack

```txt
Frontend        TypeScript, React, Vite
Rendering       Three.js, WebGL
Assets          STL, OBJ, XML
Asset Library   MongoDB
Design          IDO, Blender, OpenSCAD
Training        C++ RL-style episodes
Agents          Luna + IDO
```

## Paper

Full project writeup: [moonshot-robotics-hackathon-paper.pdf](https://github.com/user-attachments/files/29495856/moonshot-robotics-hackathon-paper.pdf)



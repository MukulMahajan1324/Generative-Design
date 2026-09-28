import React, { useState } from 'react';
import CraftInteractiveBackground, { DEFAULT_SHADER_CONFIG } from './components/CraftInteractiveBackground';
import ShaderControlsHUD from './components/ShaderControlsHUD';

export default function App() {
  const [shaderConfig, setShaderConfig] = useState(DEFAULT_SHADER_CONFIG);

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#19231f] select-none touch-none m-0 p-0">
      {/* Edge-to-Edge WebGL Interactive Background */}
      <CraftInteractiveBackground config={shaderConfig} />

      {/* Floating Shader Customizer HUD (Collapsible, Press H to toggle) */}
      <ShaderControlsHUD 
        config={shaderConfig} 
        onChangeConfig={setShaderConfig} 
      />
    </main>
  );
}

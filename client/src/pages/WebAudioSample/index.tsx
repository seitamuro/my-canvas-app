import React from "react";

const context = new AudioContext();
const osc = context.createOscillator();
const amp = context.createGain();

osc.connect(amp)
amp.connect(context.destination)

osc.connect(amp)
amp.connect(context.destination)

osc.start()

const toggleAudio = () => {
  if (context.state === "suspended") {
    context.resume()
  } else {
    context.suspend()
  }
}

const updateValues = (e: React.MouseEvent) => {
  const freq = (e.clientX / window.innerWidth) * 1000
  const gain = e.clientY / window.innerHeight

  osc.frequency.value = freq
  amp.gain.value = gain
}

export const WebAudioSample = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onMouseMove={updateValues}
      onClick={toggleAudio}
    />
  )
}
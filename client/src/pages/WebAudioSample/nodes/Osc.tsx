import { Handle, Position } from "reactflow"
import { tw } from "twind"
import { shallow } from "zustand/shallow"

import type { Store } from "../store"
import { useStore } from "../store"

const selector = (id: string) => (store: Store) => ({
  setFrequency: (e: any) => store.updateNode(id, { frequency: +e.target.value }),
  setType: (e: any) => store.updateNode(id, { type: e.target.value }),
})

type OscProps = {
  id: string,
  data: any
}

export const Osc = ({ id, data }: OscProps) => {
  const { setFrequency, setType } = useStore(selector(id), shallow)

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <p className={tw("rounded-t-md px-2 py-1 bg-pink-500 text-white text-sm")}>Oscillaotor Nodes</p>

      <label className={tw("flex flex-col px-2 py-1")}>
        <p className={tw("text-xs font-bold mb-2")}>Frequency</p>
        <input
          className="nodrag"
          type="range"
          min="10"
          max="1000"
          value={data.frequency}
          onChange={setFrequency}
        />
        <p className={tw("text-right text-xs")}>{data.frequency}Hz</p>
      </label>

      <hr className={tw("border-gray-200 mx-2")} />

      <label className={tw("flex flex-col px-2 pt-1 pb-4")}>
        <p className={tw("text-xs font-bold mb-2")}>Waveform</p>
        <select className="nodrag" value={data.type} onChange={setType}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="triangle">Triangle</option>
        </select>
      </label>

      <Handle className={tw("w-2 h-2")} type="source" position={Position.Bottom} />
    </div>
  )
}
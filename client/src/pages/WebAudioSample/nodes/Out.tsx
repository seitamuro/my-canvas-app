import { Handle, Position } from "reactflow";
import { tw } from "twind";
import { shallow } from "zustand/shallow";

import { Store, useStore } from "../store";

const selector = (store: Store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio
})

type OutProps = {
  id: string,
  data: any
}

export const Out: React.FC<OutProps> = ({ id, data }) => {
  const { isRunning, toggleAudio } = useStore(selector, shallow)

  return (
    <div className={tw("rounded-md bg-white shadow-xl")}>
      <button className={tw("px-2 py-1")} onClick={toggleAudio}>
        {isRunning ? (
          <span role="img" arial-label="mute">
            🔇
          </span>) : (
          <span role="img" arial-label="unmute">
            🔈
          </span>
        )
        }
      </button>

      <Handle className={tw("w-2 h-2")} type="target" position={Position.Top} />
    </div>
  )
}
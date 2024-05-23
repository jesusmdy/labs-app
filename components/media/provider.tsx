import { useToggle } from "@uidotdev/usehooks"
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react"

interface IMediaContext {
  isFullScreen: boolean, toggleFullScreen: () => void,
  mediaIndex: number, setMediaIndex: (i: number) => void
}

export const MediaContext = createContext<IMediaContext>({} as IMediaContext)
export const useMediaProviderContext = () => useContext(MediaContext)

export default function Provider(props: PropsWithChildren) {
  const [isFullScreen, toggleFullScreen] = useToggle(false)
  const [mediaIndex, setMediaIndex] = useState(0)

  const valueToProvide = useMemo(
    () => ({
      isFullScreen, toggleFullScreen,
      mediaIndex, setMediaIndex
    }),
    [isFullScreen]
  )
  return (
    <MediaContext.Provider value={valueToProvide}>
      {props.children}
    </MediaContext.Provider>
  )
}
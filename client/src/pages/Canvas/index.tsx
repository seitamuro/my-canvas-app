import { AppBar, Button, Toolbar } from "@mui/material"
import { CSSProperties } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

const HorizontalCenteringStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const VerticalCenteringStyle: CSSProperties = {
  textAlign: "center"
}

const RoundedStyle: CSSProperties = {
  borderRadius: "15px"
}

const PanelStyle: CSSProperties = {
  ...VerticalCenteringStyle,
  ...HorizontalCenteringStyle,
  ...RoundedStyle,
  backgroundColor: "white"
}

const PanelResizeHandleStyle: CSSProperties = {
  width: "10px",
}

export const Canvas = () => {
  return <>
    <AppBar position="static">
      <Toolbar>
        {["Files", "Share"].map((text) =>
          <Button key={text} sx={{ my: 2, color: "white", display: "block" }}>
            {text}
          </Button>
        )}
      </Toolbar>
    </AppBar>
    <PanelGroup direction="horizontal" style={{ minHeight: "100vh", backgroundColor: "silver" }}>
      <Panel defaultSize={30} minSize={20} style={{ ...PanelStyle }}>left</Panel>
      <PanelResizeHandle style={{ ...PanelResizeHandleStyle }} />
      <Panel minSize={30} style={{ ...PanelStyle }}>middle</Panel>
      <PanelResizeHandle style={{ ...PanelResizeHandleStyle }} />
      <Panel defaultSize={30} minSize={20} style={{ ...PanelStyle }}>right</Panel>
    </PanelGroup>
  </>
}
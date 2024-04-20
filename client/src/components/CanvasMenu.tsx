import { AppBar, Button, Toolbar } from "@mui/material"

export const CanvasMenu = () => {
  return <AppBar position="static">
    <Toolbar>
      {["Files", "Share"].map((text) => {
        return (
          <>
            <Button
              key={text}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {text}
            </Button>
          </>)
      }
      )}
    </Toolbar>
  </AppBar>
}
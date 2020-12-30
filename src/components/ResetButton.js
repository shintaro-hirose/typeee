import { Button } from "@material-ui/core";
import React from "react";

export default function ResetButton({ refreshAll }) {
  return (
    <Button onClick={refreshAll} color="primary" variant="contained">
      リセット
    </Button>
  );
}

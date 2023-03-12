import { Paper } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

export function New(props) {
    return (<Paper elevation={4}  sx={{padding: 1}}>
        <MDEditor.Markdown disableCopy={true} source={props.newdata.text} key={props.key} />
    </Paper>
    )
}
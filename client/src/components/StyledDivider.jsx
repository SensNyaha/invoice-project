import { Divider, styled } from "@mui/material";

const DividerStyle = styled(Divider)({
    width: "50%",
    marginTop: "10px",
    marginBottom: "50px",
    marginLeft:"auto",
    marginRight:"auto",
    height: "3px",
    background: "linear-gradient(to right, rgba(0,0,0,0), rgb(9,84,132))"
})

function StyledDivider() {
  return (
    <DividerStyle/>
  )
}

export default StyledDivider
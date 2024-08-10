import { Avatar, Box } from "@mui/material";

const { getInitCharOfFullName } = require("src/utils/fullname-util")
const { default: readMediaUrl } = require("src/utils/read-media-url")

const CustomAvatar = ({
    hasBorder = false,
    onClick,
    sx,
    src,
    fullname
}) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                ...sx,
                padding: hasBorder && '5px',
                backgroundColor: '#f5f5f5',
                borderRadius: '200px',
            }}>
            <Avatar
                sx={{ width: '100%', height: '100%' }}
                src={readMediaUrl(src)} >
                {getInitCharOfFullName(fullname)}
            </Avatar>
        </Box>
    )
}

export default CustomAvatar;
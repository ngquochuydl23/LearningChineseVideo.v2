import { Box, Typography } from "@mui/material"
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { CommentItem } from "./comment-list";

const VideoInfo = ({
    title,
    description,
    tags = [],
    level
}) => {

    const LevelCard = ({ level }) => {
        return (
            <Chip
                sx={{
                    borderRadius: '4px',
                    ml: '10px',
                    fontWeight: '600',
                    backgroundColor: 'rgb(241, 238, 131, 0.5)',
                    fontSize: '20px',
                    color: '#e5d300'
                }}
                label={"HSK " + level} />
        )
    }

    return (
        <Box
            padding="15px"
            flex="2"
            flexDirection="column"
            display="flex">
            <Typography
                lineHeight="35px"
                fontSize="25px"
                variant='h1'>
                {title}
            </Typography>
            <Stack
                mt="30px"
                direction="row">
                <Typography
                    fontWeight="500"
                    fontSize="20px">
                    Cấp độ:
                </Typography>
                <LevelCard level={level}/>
            </Stack>
            <Stack
                mt="20px"
                direction="row"
                spacing={1}>
                <Typography
                    fontWeight="500"
                    fontSize="20px">
                    Chủ đề:
                </Typography>
                {_.map(tags, tag => (
                    <Chip
                        sx={{
                            fontWeight: '600',
                            backgroundColor: '#b100cd',
                            fontSize: '14px',
                            color: 'white'
                        }} 
                        label={tag} />
                ))}
            </Stack>
            <Typography
                mt="30px"
                fontSize="16px"
                variant='subtitle2'>
                {description}
            </Typography>
        
        </Box>
    )
}

export default VideoInfo
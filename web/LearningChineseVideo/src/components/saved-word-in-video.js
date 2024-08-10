import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardMedia, Chip, Stack } from '@mui/material';
import readMediaUrl from 'src/utils/read-media-url';
import Link from 'next/link';


const SavedWordInVideo = ({
    video,
    wordCount = 0
}) => {
    return (
        <Stack
            component={Link}
            href={"/admin/videos/" + video.id}
            direction="row"
            sx={{ width: '100%', textDecoration: 'none' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                position: 'relative'
            }}>
                <img
                    style={{
                        borderRadius: '10px',
                        height: '100px',
                        width: '170px',
                        transition: 'transform .2s',
                        position: 'relative'
                    }}
                    src={readMediaUrl(video.thumbnail)}
                />
                <div
                    style={{
                        margin: '10px',
                        display: 'flex',
                        position: 'absolute',
                        zIndex: 1
                    }}>
                    <Chip
                        sx={{
                            fontWeight: '600',
                            backgroundColor: 'green',
                            fontSize: '14px',
                            color: 'white'
                        }}
                        label={"HSK " + video.level} />
                </div>
            </div>
            <Box sx={{ padding: '10px', ml: '10px' }}>
                <Typography
                    fontSize="20px"
                    gutterBottom
                    variant="h5"
                    sx={{ color: 'black' }}
                    component="div">
                    {video.title}
                </Typography>

                <Typography
                    fontSize='14px'
                    variant="subtitle2"
                    color="text.secondary">
                    Chủ đề: {video.topics.join(', ')}
                </Typography>
                <Typography
                    fontSize='14px'
                    variant="subtitle2"
                    color="text.secondary">
                    Từ vựng đã lưu: 20
                </Typography>
            </Box>
        </Stack>
    )
}

export default SavedWordInVideo;
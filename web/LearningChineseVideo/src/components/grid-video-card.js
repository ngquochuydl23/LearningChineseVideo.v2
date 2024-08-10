import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardMedia, Chip, Stack } from '@mui/material';
import readMediaUrl from 'src/utils/read-media-url';
import Link from 'next/link';


const GridVideoCard = ({
    id,
    thumbnail,
    title,
    level,
    topics = [],
    duration
}) => {
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return (
        <Card
            sx={{
                width: '100%',
                textDecoration: 'none',
                borderRadius: '10px',
                overflow: 'hidden'
            }}>
            <CardActionArea
                component={Link}
                href={"videos/" + id}>
                <div
                    style={{
                        display: 'flex',
                        position: 'relative',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        overflow: 'hidden'
                    }}>
                    <CardMedia
                        component="img"
                        height="200"
                        sx={{
                            transition: 'transform .2s',
                            position: 'relative',
                            top: "-1px",
                            ':hover': {
                                transform: 'scale(1.1)'
                            }
                        }}
                        image={readMediaUrl(thumbnail)}
                        alt={id}
                    />
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: '15px',
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
                            label={"HSK " + level} />
                        <Chip
                            sx={{
                                fontWeight: '600',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                fontSize: '14px',
                                color: 'white'
                            }}
                            label={millisToMinutesAndSeconds(duration)} />
                    </div>
                </div>
                <CardContent sx={{ padding: '10px' }}>
                    <Typography
                        fontSize="20px"
                        gutterBottom
                        line
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }}
                        variant="h5"
                        component="div">
                        {title}
                    </Typography>
                    <Typography
                        fontSize='14px'
                        variant="subtitle2"
                        color="text.secondary">
                        Chủ đề : {topics.join(', ')}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    )
}

export default GridVideoCard;
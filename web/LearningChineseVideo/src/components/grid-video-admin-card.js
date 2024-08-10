import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardMedia, Chip, MenuItem, Popover, Stack } from '@mui/material';
import readMediaUrl from 'src/utils/read-media-url';
import Link from 'next/link';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';

const GridVideoAdminCard = ({
    id,
    thumbnail,
    title,
    level,
    topics,
    onClick,
    onDeleteItem,
    createdAt
}) => {


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const idPopover = open ? 'simple-popover' : undefined;

    return (
        <Stack
            direction="row"
            sx={{ width: '100%', textDecoration: 'none' }}>
            <div
                onClick={onClick}   
                style={{
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
                    src={readMediaUrl(thumbnail)}
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
                        label={"HSK " + level} />
                </div>
            </div>
            <Box
                sx={{ padding: '10px', ml: '10px', width: "100%" }}>
                <Stack
                    justifyContent="space-between"
                    direction="row"
                    sx={{ width: "100%" }}>
                    <Typography
                        fontSize="20px"
                        gutterBottom
                        variant="h5"
                        sx={{ color: 'black' }}
                        component="div">
                        {title}
                    </Typography>
                    <MoreVertIcon onClick={handleClick} />
                </Stack>
                <Typography
                    fontSize='14px'
                    variant="subtitle2"
                    color="text.secondary">
                    Tải lên lúc: {moment(createdAt).format("DD/MM/YYYY")}
                </Typography>
                <Typography
                    fontSize='14px'
                    variant="subtitle2"
                    color="text.secondary">
                    Chủ đề: {topics.join(', ')}
                </Typography>
            </Box>
            <Popover
                id={idPopover}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <MenuItem
                    onClick={() => onDeleteItem(id)}>
                    Xóa video
                </MenuItem>
            </Popover>
        </Stack>
    )
}

export default GridVideoAdminCard;
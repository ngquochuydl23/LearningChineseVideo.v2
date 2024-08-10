import { Box, Stack, Typography } from "@mui/material";
import _ from "lodash";
import CustomAvatar from "src/components/custom-avt";

export const CommentItem = ({
    
}) => {
    return (
        <Stack
            direction="row"
            py="10px">
            <CustomAvatar
                fullname={"Quốc Huy"}
              //  src={'/storage/c29jaWFsLXYyLmNsb3RoZXMtMTcwMzc2MzY4NTc2NQ=='}
                sx={{
                    cursor: 'pointer',
                    height: 50,
                    width: 50
                }} />
            <Box
                sx={{ width: '100%' }}
                ml="15px">
                <Stack
                    spacing="10px"
                    alignItems="center"
                    direction="row">
                    <Typography
                        variant="subtitle1"
                        fontSize="18px"
                        fontWeight="600">
                        {'Nguyễn Thị Thanh Phương'}
                    </Typography>
                    <Typography
                        color="#696969"
                        variant="subtitle2"
                        fontSize="14px">
                        {'1 tháng trước'}
                    </Typography>
                </Stack>
                <Typography mt="10px">
                    {'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'}</Typography>
            </Box>
        </Stack >
    )
}


const CommentList = ({
    comments = [],
    loading = true
}) => {
    return (
        <Stack>
            {_.map(comments, (item) => (
                <CommentItem
                    key={item.id}
                    {...item} />
            ))}
        </Stack>
    )
}

export default CommentList;
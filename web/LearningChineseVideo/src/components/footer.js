import { Logo } from "./logo";

const { Container, Grid, Box, Typography } = require("@mui/material")

const HayugoFooter = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5' }}>
            <Container
                maxWidth="xl">
                <Grid container>
                    <Grid
                        sx={{ padding: '25px' }}
                        xl="5">
                        <Box sx={{ width: '80%' }}>
                            <img
                                style={{ height: '70px' }}
                                src={'/hayugo-logo_landscape.png'} />
                            <Typography
                                variant="subtitle1">
                                {`HayuGo - Điểm đến lý tưởng cho việc học tiếng Trung thú vị và hiệu quả. Với bộ sưu tập video đa dạng từ cấp độ HSK 1 đến HSK 5, bao gồm các video mang nội dung giải trí, học thuật và nhiều hơn nữa. `}
                                <br></br>
                                <br></br>
                                {`Các tính năng như tra từ trực tiếp trên phụ đề, linh hoạt chuyển đổi giữa các loại phụ đề, cùng tính năng lưu từ vựng sẽ giúp bạn hiểu rõ hơn và ghi nhớ từ vựng một cách hiệu quả. Theo dõi fanpage của nhóm nghiên cứu để khám phá thêm nhiều thông tin thú vị và cập nhật mới nhất!`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        sx={{ padding: '25px' }}
                        xl="3.5">
                        <Box pt="20px">
                            <Typography
                                fontSize="20px"
                                variant="h5">
                                {`THÔNG TIN NHÓM KHÓA LUẬN IUH`}
                            </Typography>
                            <Typography
                                fontSize="14px"
                                mt="30px"
                                variant="subtitle1">
                                {`Danh sách thành viên`}
                            </Typography>
                            <ul style={{ listStylePosition: 'outside' }}>
                                <li style={{ marginTop: '10px', color: 'black' }}>
                                    <a style={{ color: 'black' }}>
                                        {`Phạm Thanh Nhật`}
                                    </a>
                                </li>
                                <li style={{ marginTop: '10px', color: 'black' }}>
                                    <a style={{ color: 'black' }}>
                                        {`Phạm Ngọc Huy Hoàng`}
                                    </a>
                                </li>
                            </ul>
                        </Box>
                        <Box pt="20px">
                            <Typography
                                fontSize="14px"
                                mt="30px"
                                variant="subtitle1">
                                {`Giảng viên: Đặng Thị Thu Hà`}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default HayugoFooter;
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import _ from "lodash";
import { useEffect, useState } from "react";
import GridCourseCard from "src/components/teacher/grid-course-card";

const GridCourseSection = ({
    title,
    loadCourses,
    limitPerTrans
}) => {
    const [courses, setCourses] = useState([]);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(100);

    useEffect(() => {
        const fetchCourses = async () => {
            setCourses(await loadCourses(offset, limitPerTrans));
        }

        setCount(1000);
        fetchCourses();
    }, [offset]);

    return (
        <Box
            justifyContents="center">
            <Typography
                my="20px"
                fontSize="30px"
                fontWeight="800"
                variant="h5">
                {title}
            </Typography>
            {courses &&
                <Grid
                    spacing="15px"
                    container>
                    {_.map(courses, (course) => (
                        <Grid item lg={3}>
                            <GridCourseCard
                                key={course._id}
                                {...course} />
                        </Grid>
                    ))}
                </Grid>
            }
            
        </Box>
    )
}

export default GridCourseSection;
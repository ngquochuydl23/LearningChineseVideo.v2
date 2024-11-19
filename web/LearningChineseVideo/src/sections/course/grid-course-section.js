import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import _ from "lodash";
import { useEffect, useState } from "react";
import GridCourseCard from "src/components/teacher/grid-course-card";

const GridCourseSection = ({ title, loadCourses, limitPerTrans }) => {
  const [courses, setCourses] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseSearch, setCourseSearch] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      setCourses(await loadCourses(offset, limitPerTrans));
      setCourseSearch(await loadCourses(offset, limitPerTrans));
    };

    setCount(1000);
    fetchCourses();
  }, [offset]);
  const handleSearchChange = (event) => {
    const dataSearch = event.target.value;
    setSearchTerm(dataSearch);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(dataSearch.toLowerCase())
    );

    setCourseSearch(filtered);
  };
  return (
    <Box justifyContents="center">
      <Typography my="20px" fontSize="30px" fontWeight="800" variant="h5">
        {title}
      </Typography>
      <TextField
        fullWidth
        label="Tìm kiếm khóa học"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ my: "20px", fontSize: "30px", fontWeight: "800" }}
      />
      {courses && (
        <Grid spacing="15px" container>
          {courseSearch
            .filter((item) => item.status === "ACCEPTED")
            .map((course) => (
              <Grid item lg={3} key={course._id}>
                <GridCourseCard {...course} />
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default GridCourseSection;

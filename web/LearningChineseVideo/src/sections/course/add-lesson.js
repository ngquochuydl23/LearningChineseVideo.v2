import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useEffect, useState } from "react";
import AlertDialog from "src/components/alert-dialog";
import UploadVideoThumbnail from 'src/sections/video/upload-thumbnail';
import UploadVideoFrame from 'src/sections/video/upload-video-frame';
import UploadVttList from 'src/sections/video/upload-vtt-list';
import * as Yup from "yup";
export default function AddLesson({idCourse, open, handleClose, onAdded }) {
  const [showAlert, setShowAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const resetForm = () => {
    formik.setValues({
      title: "",
      description: "",
      thumbnail: "",
      videoUrl: "",
      duration: "",
    });
  };

  const formik = useFormik({
    initialValues: {
      courseId: idCourse,
      title: "",
      description: "",
      thumbnail: "",
      videoUrl: "",
      duration: "",
    },
     validationSchema: Yup.object({
      title: Yup.string().required("Tiêu đề không được để trống"),
      description: Yup.string().required("Mô tả không được để trống"),
      thumbnail: Yup.string().required("Hình video không được để trống"),
      videoUrl: Yup.string().required("Video không được để trống"),
      duration: Yup.number().required("Thời lượng video không được để trống"),
     }),
    onSubmit: (values, helpers) => {
      // console.log(values);
      onAdded(values);
      helpers.resetForm();
      handleClose();
    },
  });



  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="alert-dialog-title">Thêm bài học</DialogTitle>
        <DialogContent sx={{ minWidth: "500px" }}>
          <Stack spacing="20px">
            <TextField
              error={!!(formik.touched.title && formik.errors.title)}
              fullWidth
              helperText={formik.touched.title && formik.errors.title}
              label="Nhập tiêu đề bài học"
              id="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <TextField
              error={!!(formik.touched.description && formik.errors.description)}
              fullWidth
              helperText={formik.touched.description && formik.errors.description}
              label="Nhập mô tả"
              multiline
              minRows={5}
              id="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <UploadVideoThumbnail
              onReceiveThumbnail={(thumbnail) => formik.setFieldValue("thumbnail", thumbnail)}
            />
            {/* <TextField
              error={!!(formik.touched.thumbnail && formik.errors.thumbnail)}
              fullWidth
              helperText={formik.touched.thumbnail && formik.errors.thumbnail}
              label="Nhập hình video"
              id="thumbnail"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.thumbnail}
            /> */}
            <div>
              <UploadVideoFrame
                onUploadedVideo={(data) => {
                  console.log(data);
                  formik.setFieldValue("videoUrl", data.videoUrl);
                  formik.setFieldValue("duration", data.duration);
                  formik.setFieldValue("mimetype", data.mimetype);
                }}
              />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "gray" }}
            onClick={() => {
              resetForm();
              handleClose();
            }}
          >
            Hủy
          </Button>
          <Button autoFocus type="submit">
            Thêm bài học
          </Button>
        </DialogActions>
      </form>
      <AlertDialog
        title="Từ đã bị trùng!"
        content="Từ đã tồn tại trong từ điển, vui lòng nhập từ khác"
        open={showAlert}
        rightTxt="OK"
        handleClose={() => setShowAlert(false)}
        onRightClick={() => setShowAlert(false)}
      />
    </Dialog>
  );
}
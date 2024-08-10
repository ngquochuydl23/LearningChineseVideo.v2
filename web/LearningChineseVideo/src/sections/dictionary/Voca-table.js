import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import moment from 'moment/moment';
import Link from 'next/link';
import CustomAvatar from 'src/components/custom-avt';

export const VocaTable = (props) => {
  const {
    count = 0,
    vocas = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    onChoose,
  } = props;

  return (
    <Stack>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  #
                </TableCell>
                <TableCell>
                  Từ
                </TableCell>
                <TableCell>
                  Nghĩa
                </TableCell>
                <TableCell>
                  Hán việt
                </TableCell>
                <TableCell>
                  Từ tính
                </TableCell>
                <TableCell>
                  Pinyin
                </TableCell>
                <TableCell>
                  Từ gần nghĩa
                </TableCell>
                <TableCell>
                  Từ trái nghĩa
                </TableCell>
                <TableCell>
                  Cấp độ
                </TableCell>
                <TableCell>
                  Câu ví dụ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vocas.map((item, index) => {
                const isSelected = selected.includes(item.id);
                return (
                  <TableRow
                    hover
                    // component={Link}
                    sx={{ textDecoration: 'none' }}
                    // href={"/customers/" + item.id}
                    key={item.id}
                    onClick={() => onChoose(item)}
                    selected={isSelected}>
                    <TableCell padding="checkbox">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {item.originWord}
                    </TableCell>
                    <TableCell>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{item.vietnameseMean}</p>
                    </TableCell>
                    <TableCell>
                      {item.sinoVietnamese}
                    </TableCell>
                    <TableCell>
                      {item.wordType}
                    </TableCell>
                    <TableCell>
                      {item.pinyin}
                    </TableCell>
                    <TableCell>
                      {item.similiarMeaning}
                    </TableCell>
                    <TableCell>
                      {item.oppositeMeaning}
                    </TableCell>
                    <TableCell>
                      {item.level}
                    </TableCell>
                    <TableCell>
                      {item.example}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Stack>
  );
};

VocaTable.propTypes = {
  count: PropTypes.number,
  vocas: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  onChoose: PropTypes.func
};

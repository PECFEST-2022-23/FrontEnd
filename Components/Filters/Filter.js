import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Chip,
} from '@mui/material';
import classes from './Filters.module.css';

const Filters = (props) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    // disableScrollLock: true,
  };
  return (
    <>
      <Chip
        label="Clickable"
        style={{ marginTop: 10, marginRight: 5 }}
        color={'primary'}
        onClick={() => {}}
      />
      <Chip
        label="Clickable"
        style={{ marginTop: 10, marginRight: 5 }}
        color={'primary'}
        onClick={() => {}}
      />
      <Chip
        label="Clickable"
        style={{ marginTop: 10, marginRight: 5 }}
        color={'primary'}
        onClick={() => {}}
      />
      <Chip
        label="Clickable"
        style={{ marginTop: 10, marginRight: 5 }}
        color={'primary'}
        onClick={() => {}}
      />
      <Chip
        label="Clickable"
        style={{ marginTop: 10, marginRight: 5 }}
        color={'primary'}
        onClick={() => {}}
      />
    </>
  );
};
export default Filters;

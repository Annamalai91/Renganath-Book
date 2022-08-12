import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import styled1 from "styled-components";
import { styled } from "@mui/material/styles";

const Wrapper = styled1.div`
  .auto-select {
    .MuiAutocomplete-endAdornment {
      display: none;
    }
    .MuiOutlinedInput-root {
      padding-right: 0px !important;
    }
  }
`;

const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "#86efac",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "#fda4af",
    borderWidth: 2,
  },
  "& input:hover + fieldset": {
    borderColor: "#9ca3af !important",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
});

const FormRowSelectAutoComplete = ({
  labelText,
  name,
  handleChange,
  list,
  value,
}) => {
  return (
    <Wrapper>
      <div className="form-row">
        <Autocomplete
          disablePortal
          className="auto-select"
          onChange={(event, newValue) => handleChange(newValue)}
          name={name}
          value={value || null}
          options={list}
          defaultValue={null}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField required {...params} label={labelText} />
          )}
        />
      </div>
    </Wrapper>
  );
};

export default FormRowSelectAutoComplete;

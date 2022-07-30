import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    .edit-icon {
      background-color: teal;
      display: flex;
      align-content: center;
      border-radius: 100%;
      cursor: pointer;
      padding: 5px;
      pointer-events: visible;
      .MuiSvgIcon-root {
        fill: wheat;
      }
    }
    .edit-icon:hover {
      background-color: darkblue;
    }
    .edit-icon:active,
    .delete-icon:active {
      transform: translatey(0.175rem);
    }
    .delete-icon:hover {
      background-color: red;
    }
    .delete-icon {
      background-color: crimson;
      display: flex;
      cursor: pointer;
      align-content: center;
      border-radius: 100%;
      padding: 5px;
      .MuiSvgIcon-root {
        fill: wheat;
      }
    }
    .table {
      overflow: auto;
    }
    .total-sum {
      display: flex;
      .card-content {
        width: 100%;
      }
      .charges {
        display: flex;
        justify-content: space-between;
      }
    }
    .charge-label {
      background-color: #cffafe;
      border-radius: 8px;
      padding: 10px 30px;

      align-items: center;
      display: flex;
    }
    .card-content {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }

    .charge-amount {
      border-radius: 8px;
      align-items: center;
      img {
        height: 15px;
        margin-right: 5px;
      }
      input {
        border: 0px;
        background-color: #f3f4f6;
        height: 100%;
        padding: 10px 30px;
        width: 85px;
        border-radius: 8px;
        padding: 10px;
        -moz-appearance: textfield;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input:focus {
        outline-color: #757ce8;
      }
    }
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      grid-column-start: 1;
      grid-column-end: 2;
    }
    .text-area {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .form-center button {
      height: 50px;
      margin-top: 0;
    }
    .table {
      grid-column-start: 1;
      grid-column-end: 4;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
      row-gap: 1rem;
    }
    .btn-container {
      grid-column-start: 1;
      grid-column-end: 2;
    }
    .text-area {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .table {
      grid-column-start: 1;
      grid-column-end: 4;
    }
    .form-center button {
      height: 50px;
      margin-top: 0;
    }
  }
`;

export default Wrapper;

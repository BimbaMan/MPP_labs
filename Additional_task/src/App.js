import { Component, createRef } from "react";
import "./style.css";

const DATE_FORMAT = "dd/mm/yy";

class DatePicker extends Component {
  inputRef = createRef();

  componentDidMount() {
    const { onDateChange, value } = this.props;

    $(this.inputRef.current).datepicker({
      dateFormat: DATE_FORMAT,
      onSelect: onDateChange,
    });
    $(this.inputRef.current).datepicker("setDate", value || "");
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    if (prevProps.value !== value) {
      $(this.inputRef.current).datepicker("setDate", value || "");
    }
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}

export default class App extends Component {
  state = { date: "" };

  handleDateChange = (date) => {
    this.setState({ date: date });
  };

  handleDateReset = () => {
    this.setState({ date: "" });
  };

  render() {
    const { date } = this.state;

    return (
      <>
        <div>{date ? `Date: ${date}` : "Select date"}</div>
        <div>
          <DatePicker value={date} onDateChange={this.handleDateChange} />
        </div>
        <div>
          <button onClick={this.handleDateReset}>Reset date</button>
        </div>
      </>
    );
  }
}

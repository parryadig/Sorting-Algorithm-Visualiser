import React, { Component } from "react";
import "./Bars.css";

class VisualiserApp extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     barArr: props.barArr,
  //     items: props.items,
  //   };
  // }

  // componentDidUpdate(prevProps) {
  //   const a = this.props.barArr;
  //   const b = prevProps.barArr;
  //   if (this.props.items !== prevProps.items) {
  //     console.log("Updating items...");
  //     this.setState(this.props);
  //     this.props.resetArray();
  //   }
  //   if (!arraysEqual(a, b)) {
  //     this.setState({ barArr: this.props.barArr });
  //   }
  // }

  render() {
    return (
      <>
        <div className="main-window">
          <ul className="bars">
            {this.props.barArr.map((bar, index) => {
              console.log("animation states: ", this.props.animArr);
              return (
                <li key={index}>
                  <div
                    className="bar"
                    style={{
                      height: `${bar}%`,
                      backgroundColor: this.props.animArr[index]
                        ? "#00cfcf"
                        : "palevioletred",
                      // marginLeft: this.props.animArr[index] ? "3px" : "1px",
                    }}
                  ></div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pretty"></div>
        <div className="dash">
          <div className="information">
            <h1>{this.props.currAlgo}</h1>
            <br />
            <p>{this.props.algoDesc} </p>
          </div>
          <div className="barrier"></div>
          <div className="complexities">
            <h1>Performance</h1>
            <br />
            <p>
              Worst-case time complexity: <b>{this.props.algoPerf[0]}</b>
              <br />
              <br />
              Average time complexity: <b>{this.props.algoPerf[1]}</b>
              <br />
              <br />
              Best-case time complexity: <b>{this.props.algoPerf[2]}</b>
              <br />
              <br />
              Worst-case space complexity: <b>{this.props.algoPerf[3]}</b>
              <br />
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default VisualiserApp;

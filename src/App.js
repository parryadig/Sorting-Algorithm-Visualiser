import { Component } from "react";
import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import VisualiserApp from "./components/VisualiserApp/VisualiserApp";
// import { SelectionSort } from "./components/VisualiserApp/SelectionSort";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barArr: [],
      items: 10,
      animArr: [],
      currentAlgo: "No algorithm selected",
    };
    for (let i = 0; i < this.state.items; i++) {
      this.state.barArr.push(randomIntFromInterval(5, 90));
      this.state.animArr.push(0);
    }
  }

  changeItems = (event) => {
    console.log("Num items (App): ", event.target.value);
    this.setState({ items: event.target.value });
    this.resetArray();
  };

  handleSort = (event) => {
    let algo = event.target.className;
    if (algo === "buttonA sel-sort") {
      this.setState({ currentAlgo: "Selection Sort" });
      this.SelectionSort(this.state.barArr);
    } else if (algo === "buttonA bub-sort") {
      this.setState({ currentAlgo: "Bubble Sort" });
      this.BubbleSort(this.state.barArr);
    } else if (algo === "buttonA ins-sort") {
      this.setState({ currentAlgo: "Insertion Sort" });
      this.InsertionSort(this.state.barArr);
    } else if (algo === "buttonA mer-sort") {
      this.setState({ currentAlgo: "Merge Sort" });
      this.MergeSort(this.state.barArr);
    }
    console.log("Sort complete.");
    this.setState({ animArr: Array.from(Array(this.state.items), () => 1) });
  };

  SelectionSort = async (barArr) => {
    let arr = barArr;
    let anims = Array.from(Array(this.state.items), () => 0);
    let temp = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        anims[i] = 1;
        anims[j] = 1;
        if (arr[j] < arr[i]) {
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
        this.setState({ barArr: arr, animArr: anims });
        await sleep(5);
        anims[i] = 0;
        anims[j] = 0;
      }
    }
    this.setState({ barArr: arr, animArr: anims });
    await sleep(5);
  };

  InsertionSort = async (barArr) => {
    let arr = barArr;
    let anims = Array.from(Array(this.state.items), () => 0);
    for (let i = 1; i < barArr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j > -1 && current < arr[j]) {
        anims[i] = 1;
        anims[j] = 1;
        arr[j + 1] = arr[j];
        this.setState({ barArr: arr, animArr: anims });
        await sleep(5);
        anims[i] = 0;
        anims[j] = 0;
        j--;
      }
      arr[j + 1] = current;
      this.setState({ barArr: arr, animArr: anims });
      await sleep(5);
      anims[i] = 0;
      anims[j] = 0;
    }
  };

  BubbleSort = async (barArr) => {
    let arr = barArr;
    let anims = Array.from(Array(this.state.items), () => 0);
    let temp = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        anims[i] = 1;
        anims[j] = 1;
        if (arr[j] > arr[j + 1]) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
        this.setState({ barArr: arr, animArr: anims });
        await sleep(5);
        anims[i] = 0;
        anims[j] = 0;
      }
    }
    this.setState({ barArr: arr, animArr: anims });
    await sleep(5);
  };

  resetArray = () => {
    let arr = [];
    console.log("Resetting array to length: ", this.state.items);
    for (let i = 0; i < this.state.items; i++) {
      arr.push(randomIntFromInterval(5, 90));
    }
    this.setState({
      barArr: arr,
      animArr: Array.from(Array(this.state.items), () => 0),
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          items={this.state.items}
          changeItems={this.changeItems}
          handleSort={this.handleSort}
        />
        <VisualiserApp
          items={this.state.items}
          barArr={this.state.barArr}
          animArr={this.state.animArr}
          currAlgo={this.state.currentAlgo}
          algoDesc={algoDict[this.state.currentAlgo]}
          algoPerf={algoPerf[this.state.currentAlgo]}
          resetArray={this.resetArray}
          changeItems={this.changeItems}
        />
      </div>
    );
  }
}

export default App;

let randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const algoDict = {
  "Selection Sort":
    "The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.",
  "Bubble Sort":
    "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.",
  "Insertion Sort":
    "Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.",
  "Merge Sort":
    "Like QuickSort, Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is a key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one. ",
  "No algorithm selected": "Please select an algorithm.",
};

const algoPerf = {
  "Selection Sort": ["O(n2)", "O(n2)", "O(n2)", "O(1)"],
  "Bubble Sort": ["O(n2)", "O(n2)", "O(n)", "O(1)"],
  "Insertion Sort": ["O(n2)", "O(n2)", "O(n)", "O(1)"],
  "Merge Sort": ["O(n log n)", "O(n log n)", "O(n log n)", "O(n)"],
  "No algorithm selected": [" ", " ", " ", " "],
};

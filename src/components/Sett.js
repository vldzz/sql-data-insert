import React from 'react'
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import Result from './Insert.js'
import Slider, {Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const RangeSlider = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};




function ResultNothing(){
    return(
      <div className="flex-fill flex-center result">
        <label className="resultLabel">
            There is nothing yet.
        </label>
      </div>
    );
  }



class Sett extends React.Component{
    constructor(){
      super();
      this.countAdd = 0;
      this.state = {
        createButtonClicked: true, ///Change to false
        existSomeCode: true,       ///Change to false
        tableName: "table1",
        selectedDataOption: 0,
        sliderRange: 50,
        dataType: false,
        intRange: false,
        intRanges: [-10000, 10000],
        dontpadOn: false,
        constranints: false,
        columns: [
          {}
      ]
      };
      
      
      this.keyPress = this.keyPress.bind(this);
    }
    
  
  
    toogleCreateTable () {
      if(!this.state.createButtonClicked)
        this.setState(
          {createButtonClicked: true}
        )
    }
  
    notExistYet(colN){
  
      for(var i = 0; i < this.state.columns.length; i++){
        if(this.state.columns[i].colNameValue === colN.toLowerCase())
          return false
      }
    
      return true;
    }
    notExistPrimary(radio){
      if(radio === "PK")
        for(var i = 0; i < this.state.columns.length; i++){
          if(this.state.columns[i].radio === "PK")
            return false
        }
    
      return true;
    }
  
    addColumn = () => {
        var col = this.state.columns;
        var e = document.getElementById("typeSelection");
        var radio = "";
        var colNameValue = document.getElementById("columnName").value.toLowerCase();
        var selectedOption = e.options[e.selectedIndex].text;
        var radio1 = "";
        var radio2 = "";

        //If contains constraints
        if(this.state.constranints){
          radio1 = document.getElementById("inlineRadio1").checked;
          radio2 = document.getElementById("inlineRadio2").checked;
          if(radio1){
            radio = "PK";
          }
          if(radio2){
            radio = "UQ";
          }
        }
  
        if(selectedOption === "Int Range")
          selectedOption = "Int";
  
        if(colNameValue !== "" && e.selectedIndex !== 0 && this.notExistYet(colNameValue) && this.notExistPrimary(radio) && !this.state.dataType && !this.state.intRange){
          var intRangeState = false;
          col.push(
            {
              colNameValue,
              selectedOption,
              radio,
              intRangeState
            }
          );          
            //Clear value
            document.getElementById("columnName").value = "";
          this.setState(
            {columns: col,
            dataType: false}
            )  
        }
        else if(this.state.dataType && colNameValue !== "" && e.selectedIndex !== 0 && this.notExistYet(colNameValue) && this.notExistPrimary(radio)){
          if(document.getElementById("typeDataSelection").options.selectedIndex == 0){
              toast.notify("Enter a valid option for nvarchar source")
          }
          else{
              var d = document.getElementById("typeDataSelection");
              var selectedDataOption = d.options[d.selectedIndex].text;
              var intRangeState = false;
                    
              col.push(
                  {
                  colNameValue,
                  selectedOption,
                  radio,
                  selectedDataOption,
                  intRangeState
                  }
              );   
                      
              //Clear value
              document.getElementById("columnName").value = "";
      
              this.setState(
                  {columns: col}
                  )
            }  
          }
        else if(this.state.intRange && colNameValue !== "" && e.selectedIndex !== 0 && this.notExistYet(colNameValue) && this.notExistPrimary(radio)){
          var min = this.state.intRanges[0];
          var max = this.state.intRanges[1];
          var intRangeState = true;
  
          col.push(
            {
              colNameValue,
              selectedOption,
              radio,
              intRangeState,
              min,
              max
            }
          );   
                 
            //Clear value
            document.getElementById("columnName").value = "";
  
          this.setState(
            {columns: col}
            )  
        }
        else{
          if(colNameValue === ""){
            toast.notify("Please set an name for your column");
          }
          else if(e.selectedIndex === 0){
            toast.notify("Please set an type for your column");
          }
          else if(!this.notExistYet(colNameValue)){
            toast.notify("This column already exist");
          }
          else if(!this.notExistPrimary(radio)){
            toast.notify("There can be only one Primary Key");
          }
        }
    }
  
    
    changeRange = (props) => {
      console.log(props);
      this.setState(
        {sliderRange: props}
      );
    }
    changeIntRange = (props) => {
      console.log(props);
      this.setState(
        {intRanges: props}
      )
    }
  
  
    
    tableNameChanged(){
      var d = document.getElementById("tableName");
      d.value = d.value.replace(' ', '');
      d.value = d.value.replace(',', '');
      d.value = d.value.replace('.', '');
      this.setState(
        {tableName: d}
      )
    }
    columnNameChanged(){
      var d = document.getElementById("columnName");
      d.value = d.value.replace(' ', '');
      d.value = d.value.replace(',', '');
      d.value = d.value.replace('.', '');
    }
    selectionDontpadToggleOn(){
      this.setState(
        {dontpadOn: true}
      )
    }
    selectionDontpadToggleOff(){
      this.setState(
        {dontpadOn: false}
      )
    }
    selectedOptioToggle = () => {
      var e = document.getElementById("typeSelection");
      var selectedOption = e.options[e.selectedIndex].text;
      if(selectedOption === "Nvarchar"){
        this.setState({
          dataType: true
        })
      }
      else{
        this.setState({
          dataType: false
        })
      }
  
      if(selectedOption === "Int Range"){
        this.setState({
          intRange: true
        })
      }
      else{
        this.setState({
          intRange: false
        })
      }

      if(selectedOption === "Int" || selectedOption === "Tinyint" || selectedOption === "Bigint" || selectedOption === "Nvarchar"){
        this.setState({
          constranints: true
        })
      }
      else{
        this.setState({
          constranints: false
        })
      }
    }
    selectedDataOptionToggle = () => {
  
      var e = document.getElementById("typeDataSelection");
      var selectedOption = e.options[e.selectedIndex].text;
  
      if(selectedOption === "Dontpad link"){
        this.selectionDontpadToggleOn();
      }
      else{
        this.selectionDontpadToggleOff();      
      }
    }
  
  
    removeFromState(index){
      console.log(index);
  
      var arr = this.state.columns;
      var removed = [];
      
      for(var i = 0; i < arr.length; i++){
        if(i != index){
          removed.push(arr[i]);
        }
      }
  
      this.setState(
      {columns: removed}
      );
    }
    

    keyPress(e){
      if(e.keyCode == 13){
         this.addColumn();
      }
   }
    
  
  
    nothing (){
      return(
        <div className="nothing flex-center">
          <button className="btn btn-primary" onClick={this.toogleCreateTable.bind(this)}>Create table</button>
        </div>
      )
    }
  
    dataType(){
      return(
        <>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Data Type</label>
            </div>
            <select className="custom-select" id="typeDataSelection" onChange={this.selectedDataOptionToggle}>
              <option defaultChecked value="0">Choose...</option>
              <option value="1">Names</option>
              <option value="2">Last Name</option>
              <option value="3">Cities</option>
              <option value="4">Countries</option>
              <option value="5">Dontpad link</option>
            </select>
          </div>
        </>
      )
    }
    dontpadInput(){
      return (
        <div>
           <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Link</span>
            </div>
            <input type="text" className="form-control" placeholder="Dontpad Link" aria-label="dontpadLink" id="dontpadLink"/>
          </div>
        </div>
      );
    }
    radioButtons(){
      return(
        <div className="radioButtonGroup">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
          <label className="form-check-label" htmlFor="inlineRadio1">Primary Key</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
          <label className="form-check-label" htmlFor="inlineRadio2">Unique</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
          <label className="form-check-label" htmlFor="inlineRadio3">None</label>
        </div>
      </div>
      )
    }
  
    inputs(){
      var col = [];
  
      for(var i = 1; i < this.state.columns.length; i++){  
        var badge = this.state.columns[i].selectedOption;
        let boundClick = this.removeFromState.bind(this, i);
  
        col.push(
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center" onDoubleClick={boundClick}>
            {this.state.columns[i].colNameValue} {badge} {this.state.columns[i].radio}
          <span className="badge badge-primary badge-pill">{badge}</span>
        </li>);
            
      };
  /**
   * 
  
    <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect02">Data Type</label>
            </div>
            <select className="custom-select" id="datatypeSelection">
              <option defaultChecked>Choose...</option>
              <option value="1">Number </option>
              <option value="2">Random number 1 - 1000</option>
              <option value="4">Date now</option>
              <option value="5">Date Time</option>
            </select>
          </div>
  
  
   */
  
      return(
        <>
          <div className="input-group mb-3">
            <div className="input-group-prepend tableName">
              <span className="input-group-text" >Table name</span>
            </div>
            <input type="text" className="form-control" aria-label="TableName" id="tableName" onChange={this.tableNameChanged.bind(this)} />
          </div>
  
          <div className="slider">
            <Slider min={0} max={100} defaultValue={50} handle={handle} onChange={this.changeRange} />
          </div>
  
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Column name</span>
            </div>
            <input type="text" className="form-control" placeholder="Columns name" aria-label="columnName" id="columnName" onKeyDown={this.keyPress} onChange={this.columnNameChanged}/>
          </div>
  
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Type</label>
            </div>
            <select className="custom-select" id="typeSelection" onChange={this.selectedOptioToggle}>
              <option defaultChecked>Choose...</option>
              <option value="1">Bit</option>
              <option value="2">Tinyint</option>
              <option value="3">Int</option>
              <option value="4">Bigint</option>
              <option value="5">Float</option>
              <option value="6">Date</option>
              <option value="7">Time</option>
              <option value="8">DateTime</option>
              <option value="11">Nvarchar</option>
              <option value="12">Int Range</option>
            </select>
          </div>
  
          {this.state.dataType ? this.dataType() : ""}
          {this.state.dontpadOn ? this.dontpadInput() : ""}
          {this.state.intRange ? 
              <Range defaultValue={[0, 600]} min={-1000} max={5000} step={100} handle={handle} pushable={true} onChange={this.changeIntRange} />
          : "" }
          {this.state.constranints ? this.radioButtons() : ""}

          <button type="button" className="btn btn-success btn-lg btn-block addColumn" id="addColumn" onClick={this.addColumn}>Add column</button>
  
        <ul className="list-group col-list-group">
          {col}
        </ul>
  
      </>
  
      )
    }
  
    controllers(){
      return(
        <div>
          {this.inputs()}
        </div>
      )
    }
  
    render() {
      return(
        <div className="d-flex workbench">
          <div className={
            this.state.createButtonClicked ? "flex-fill sett container" : "flex-fill flex-center sett"}>
            {
            this.state.createButtonClicked ? 
            this.controllers() :
            this.nothing()
            }
          </div>
          {this.state.existSomeCode ? <Result props={this.state.columns} tableName={this.state.tableName} sliderRange={this.state.sliderRange}/> : <ResultNothing />  } 
        </div>
      );
    }
  }

  export default Sett
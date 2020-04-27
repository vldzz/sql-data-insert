import React from 'react';
import '../index.css';
import data from '../jsonInfo';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';


var tab = "    ";
var index = [];

for(var i=0; i < data.length; i++){
  index.push(-1);
}

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



class Insert {

	static numbers_random(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	  }
	static numbers_float(){
		return (Math.random() * (100 - 0) + 0).toFixed(4);
	}
	static numbers() {
		return Math.ceil(Math.random() * (1000 - 0) + 0);
	}
	static date(){
        var m = this.numbers_random(1, 12);
        var d = this.numbers_random(1, 29);
        if(m < 10){
            m = "0" + m;
        }
        if(d < 10){
            d = "0" + d;
        }
		var d = this.numbers_random(2000, 2019) + "." + m + "." + d; 
		return  "'" + d + "'";
  }
  static time(){
    var t = this.numbers_random(0, 23) + ":" + this.numbers_random(0, 59) + ":" + this.numbers_random(0, 59);
    return "'" + t + "'";
  }
  static dateTime(){
    var d = this.numbers_random(2000, 2019) + "." + this.numbers_random(1, 12) + "." + this.numbers_random(1, 29); 
    var t = this.numbers_random(0, 23) + ":" + this.numbers_random(0, 59) + ":" + this.numbers_random(0, 59);
    return "'" + d + " " + t + "'";
  }
  
  /**
   * Nvarchar:
  **/
  static getName(radio){
    index[0] = index[0] < data.names.length-1 ? index[0]+1 : 0;
    var inx = radio != "" ? index[0] : Insert.numbers_random(0, data.names.length-1);
    return data.names[inx];
  }
  static getLastName(radio){
    index[1] = index[1] < data.last.length-1 ? index[1]+1 : 0;
    var inx = radio != "" ? index[1] : Insert.numbers_random(0, data.names.length-1);
    return data.last[inx];
  }
  static getCity(radio){
    index[2] = index[2] < data.cities.length-1 ? index[2]+1 : 0;
    var inx = radio != "" ? index[2] : Insert.numbers_random(0, data.names.length-1);
    return data.cities[inx];
  }
  static getCountry(radio){
    index[3] = index[3] < data.countries.length-1 ? index[3]+1 : 0;
    var inx = radio != "" ? index[3] : Insert.numbers_random(0, data.names.length-1);
    return data.countries[inx];
  }
  ///////////////////////////////////////////
  static getSample(radio){
    index[99] = index[99] < data.sample.length-1 ? index[99]+1 : 0;
    var inx = radio != "" ? index[99] : Insert.numbers_random(0, data.sample.length-1);
    return data.sample[inx];
  }
  ///////////////////////////////////////////
  static getDontpadLink(){
    const dontpad = require('dontpad-api');
    const dontPadTarget = 'reactTestDates'; 

    dontpad.writeContent(dontPadTarget, 'This is a test ')

  } 
}

function Result(props){
  /**
   * Table create
   */
  //  Insert.getDontpadLink();
  
  
  var tableName = props.tableName.value;
  var columns = "\n";
  var coll = "";
  var bigInts = [];

  for(var i = 1; i < props.props.length; i++){
    var radio = "(128)";
    var n = "";
    var v = props.props.length -1 === i ? "" : ", ";
    

    if(props.props[i].selectedOption !== "Nvarchar"){ 
      n = "";  
      if(props.props[i].radio === "UQ"){
        radio = "UNIQUE";
      }
      if(props.props[i].radio === "PK"){
        radio = "PRIMARY KEY";
      }
    }


    columns += tab + props.props[i].colNameValue + " " + props.props[i].selectedOption + n + " " + radio + v + "\n";
    coll += props.props[i].colNameValue + v;
  }

  
  /**
   * Table insert data
   */
  //SET DATEFORMAT ymd\nGO 

  var createTable = "CREATE TABLE " + tableName + "(" + columns.toLowerCase() + ")\nGO";
  var insert = "\nINSERT INTO " + props.tableName.value + "( " + coll + ") VALUES\n";
  var values = [];
  var dontpadIndex = 0;
  values.push(insert);
  var type = 0;       //0 - num, 1 - alpha
  var customList;

  var customIndex = [];
  for(var i = 0; i < props.props.length; i++){
    customIndex.push(0);
  }
  
  for(var j = 1; j < props.sliderRange; j++){
    var row = "(";
    for(var i = 0; i < props.props.length; i++){
      var v = props.props.length -1 === i ? "" : ", ";
      
        switch(props.props[i].selectedOption){
          case("Bit"):
            if(Insert.numbers_random(0, 100) % 2 === 0){
                row += 1 + v;                
            }
            else{
                row += 0 + v;
            }
            break;

          case("Tinyint"):
            if(props.props[i].radio === "PK"){
              row += j + v;
            }
            else{
              row += Insert.numbers_random(0, 255) + v;
            }
            break;

          case("Int"):
            if(props.props[i].intRangeState){
              var min = props.props[i].min;
              var max = props.props[i].max;

              row += Insert.numbers_random(min, max) + v;
            }
            else
              if(props.props[i].radio === "PK")
                row += j + v;
              else
                row += Insert.numbers() + v;
            break;

          case("Bigint"):
          if(props.props[i].radio === "PK"){
            var m = Insert.numbers() + "" + Insert.numbers() + "" + Insert.numbers();
            
            while(bigInts.includes(m)){
              m = Insert.numbers() + "" + Insert.numbers() + "" + Insert.numbers();
            }

            row += m + v;
          }
          else{
            row += Insert.numbers() + "" + Insert.numbers() + "" + Insert.numbers() + v;
          }
            break;

          case("Float"):
            row += Insert.numbers_float() + v;
            break;
          
          case("Date"):
            row += Insert.date() + v;  
            break;

          case("Time"):
            row += Insert.time() + v;
            break;

          case("DateTime"):
            row += Insert.dateTime() + v;
            break;
            
          case("Nvarchar"):
            switch(props.props[i].selectedDataOption){
              case("Names"):
                row += "'" + Insert.getName(radio) + "'" + v;
                break;
              case("Last Name"):
                row += "'" + Insert.getLastName(radio) + "'" + v;
                break;
              case("Cities"):
                row += "'" + Insert.getCity(radio) + "'" + v;
                break;
              case("Countries"):
                row += "'" + Insert.getCountry(radio) + "'" + v;
                break;
              ///////////////////////////////////////////
              case("Sample"):
                row += "[']" + Insert.getSample(radio) + "[']" + v;
                break;
              ///////////////////////////////////////////
              case("Custom list"):
                customList = props.props[i].customList;

                if(customIndex[i] >= customList.split(" ").length){
                  customIndex[i] = 0;
                }
                  row += customList.split(" ")[customIndex[i]] + v;
                  customIndex[i]++;
                break;  
              case("Custom list nvarchar"):
                customList = props.props[i].customList;
                console.log(props.props[i].customList)

                if(customIndex[i] >= customList.split(" ").length){
                  customIndex[i] = 0;
                }
                row += "'" + customList.split(" ")[customIndex[i]] + "'" + v;
                customIndex[i]++;
              break;  
              }
            break;
			}
    }
      
    var vv = props.sliderRange -1 === j ? "" : ", ";
    row += ")" + vv + "\n";
    values.push(row);
    }
  
  var val = "";
  for(var i = 0; i < values.length; i++){
    val += values[i];
  }

  var toCopy = createTable + val;

  return(
    <div className="flex-fill result">
      <div className="container">
      <CopyToClipboard text={toCopy}>
      <textarea readOnly
          value={toCopy}
          className="textAreaResult"
      />
      </CopyToClipboard>
      </div>
    </div>
  );
}

export default Result
import React from 'react';
import '../index.css';
import data from '../jsonInfo';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';


var tab = "    ";


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
		return Math.ceil(Math.random() * (max - min) + min);
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
    var t = this.numbers_random(0, 23) + "." + this.numbers_random(0, 59) + "." + this.numbers_random(0, 59);
    return "'" + t + "'";
  }
  static dateTime(){
    var d = this.numbers_random(2000, 2019) + "." + this.numbers_random(1, 12) + "." + this.numbers_random(1, 29); 
    var t = this.numbers_random(0, 23) + "." + this.numbers_random(0, 59) + "." + this.numbers_random(0, 59);
    return "'" + d + " " + t + "'";
  }
  
  /**
   * Nvarchar:
  **/
  static getName(){
    return data.names[Math.ceil(Math.random() * ((data.names.length-1) - 0) + 0)];
  }
  static getLastName(){
    return data.last[Math.ceil(Math.random() * ((data.last.length-1) - 0) + 0)];
  }
  static getCity(){
    return data.cities[Math.ceil(Math.random() * ((data.cities.length-1) - 0) + 0)];
  }
  static getCountry(){
    return data.countries[Math.ceil(Math.random() * ((data.countries.length-1) - 0) + 0)];
  }
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
  Insert.getDontpadLink();


  var tableName = props.tableName.value;
  
  var columns = "\n";
  var coll = "";

  for(var i = 1; i < props.props.length; i++){
    var radio = "";
    if(props.props[i].radio === "UQ"){
      radio = "UNIQUE";
    }
    if(props.props[i].radio === "PK"){
      radio = "PRIMARY KEY";
    }

    var v = props.props.length -1 === i ? "" : ", ";

    columns += tab + props.props[i].colNameValue + " " + props.props[i].selectedOption + " " + radio + v + "\n";
    coll += props.props[i].colNameValue + v;
  }

  var createTable = "CREATE TABLE " + tableName + "(" + columns.toLowerCase() + ")\nGO";

  /**
   * Table insert data
   */
  //SET DATEFORMAT ymd\nGO 
  var insert = "\nINSERT INTO " + props.tableName.value + "( " + coll + ") VALUES\n";
  var values = [];

  values.push(insert);
  
  var dontpadIndex = 0;

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
            row += Insert.numbers_random(0, 255) + v;
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
            row += Insert.numbers() + "" + Insert.numbers() + "" + Insert.numbers() + v;
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
                row += "'" + Insert.getName() + "'" + v;
                break;
              case("Last Name"):
                row += "'" + Insert.getLastName() + "'" + v;
                break;
              case("Cities"):
                row += "'" + Insert.getCity() + "'" + v;
                break;
              case("Countries"):
                row += "'" + Insert.getCountry() + "'" + v;
                break;
              case("Dontpad link"):
                console.log("Under construction");
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


  return(
    <div className="flex-fill result">
      <div className="container">
      <CopyToClipboard text={document.getElementsByClassName("textAreaResult").value}>
      <textarea readOnly
          value={createTable + val}
          className="textAreaResult"
      />
      </CopyToClipboard>
      </div>
    </div>
  );
}

export default Result
import React from "react";
import { Manager } from "socket.io-client";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";
import date from "date-and-time";

TimeAgo.addLocale(es);
const timeAgo = new TimeAgo("es");
const AppContext: any = React.createContext<any>({});
export default AppContext;

export class AppContextProvider extends React.Component {
  private manager: any;
  private socketIO: any;
  state: any = {
    io: null,
    getIO: () => {},
    timeAgo: null,
    getDateTimeNow: () => {},
    getTime: () => {},
    validateCantDay: () => {},
    getStringDate: () => {},
  };

  constructor(props: any) {
    super(props);
    this.manager = new Manager(String(process.env.REACT_APP_URL));
    this.socketIO = this.manager.socket("/");
    
    this.state = {
      io: this.socketIO,
      getIO: this.getIO,
      timeAgo: timeAgo,
      getDateTimeNow: this.getDateTimeNow,
      getTime: this.getTime,
      validateCantDay: this.validateCantDay,
      getStringDate: this.getStringDate,
    };
  }
  getDateTimeNow(format: string): any {
    return date.format(new Date(), format);
  }

  getTime(dateM: any, format: any): any {
    return date.format(new Date(dateM), format);
  }
  shouldComponentUpdate(prop1: any, state1: any) {
    return this.state.getIO !== state1.getIO;
  }

  getIO = () => {
    return this.state.io;
  };
  validateCantDay(date: any): boolean {
  
    if ((new Date().getTime() - new Date(date).getTime())/(1000*60*60*24) > 2) {
      return true;
    } else {
      return false;
    }
  }

  getStringDate(message: any,yearArray:any): any {
    const year = this.getTime(message, "YYYY/MM/DD").substr(0, 4);
    const month = this.getTime(message, "YYYY/MM/DD").substr(5, 7);
    let day = this.getTime(message, "YYYY/MM/DD").substr(8, 10);
    if(day.substr(0,1)==='0'){
      day=day.substr(1,1);
    }
    return day + " DE " + yearArray[parseInt(month) - 1] + " DE " + year;
  }
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

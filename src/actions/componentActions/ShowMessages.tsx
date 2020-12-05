import React from "react";

export class ShowMessages extends React.Component {
  static check: any;
private year:any = [
  "ENERO",
  "FEBRERO",
  "MARZO",
  "ABRIL",
  "MAYO",
  "JUNIO",
  "JULIO",
  "AGOSTO",
  "SEPTIEMBRE",
  "OCTUBRE",
  "NOVIEMBRE",
  "DICIEMBRE",
];
/* async onMessage(state:any,context:any,callback:Function):Promise<void> {
 await   context.getIO().on("send message", async (data: any) => {
    await  callback({
        messages: [data.message, ...state.messages],
      });
    await  callback({
        maxFile:data.message.maxFile
      });
    await  console.log(state.messages)
      context.getIO().emit("update lastMessage", data);
    });
  }*/

 

  compareIdUser(message: any, props: any, index: number, context: any): any {
    if (message.id_usuario === props.id_usuario) {
      return (
        <div key={"a" + index} className="mensajeRigth">
          <p key={"c"+index} className='mR'>{message.contenido}</p>
          <p key={"d"+index} className='hourM'>{context.getTime(message.created_at, "HH:mm")}</p>
        </div>
      );
    } else {
      return (
        <div key={"a" + index} className="mensajeLeft">
          <p key={"c"+index}  className='mI'>
          <b> {message.user}</b>: {message.contenido}
          </p>
          <p key={"d"+index} className='hourM'> {context.getTime(message.created_at, "HH:mm")}</p>
        </div>
      );
    }
  }

  checkDay(message: any, index: any, context: any): any {
    if (
      context.getTime(message.created_at, "YYYY/MM/DD") !=
      context.getTime(ShowMessages.check, "YYYY/MM/DD")
    ) {
      ShowMessages.check = message.created_at;
      if (
        context.getTime(message.created_at, "YYYY/MM/DD") !=
        context.getDateTimeNow("YYYY/MM/DD")
      ) { if(context.validateCantDay(message.created_at)){
       return (
        <div key={"b" + index} className="contAgo">{context.getStringDate(message.created_at,this.year)}
        </div>
        );
      }else{
        return (
          <div key={"b" + index} className="contAgo">
            {context.timeAgo.format(Date.parse(message.created_at))}
          </div>
        );
      }
      } else {
        return (
          <div key={"b" + index} className="contAgo">
            Hoy
          </div>
        );
      }
    } else {
      ShowMessages.check = message.created_at;
    }
  }

  newMessagePaint(state: any, context: any, props: any): any {
    try {
      return state.messages.map((message: any) => {
        if (Array.isArray(message)) {
          return message.map((newMessage: any, j: number) => {
            return (
              <div key={newMessage.id_mensaje} className="w-full">
                {this.checkDay(newMessage, j, context)}
                {this.compareIdUser(newMessage, props, j, context)}
              </div>
            );
          });
        }
      });
    } catch (error) {
      return error;
    }
  }

  messagePaint(state: any, context: any, props: any): any {
    try {
      return state.messages.map((message: any, i: number) => {
        if (!Array.isArray(message)) {
          return (
            <div key={i} className="w-full via-white">
              {this.checkDay(message, i, context)}
              {this.compareIdUser(message, props, i, context)}
            </div>
          );
        }
      });
    } catch (error) {
      return error;
    }
  }
}

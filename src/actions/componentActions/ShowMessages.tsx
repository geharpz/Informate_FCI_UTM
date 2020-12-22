import React, { DetailedHTMLProps } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faCheck,
  faExclamationTriangle,
  faSortDown,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { MessageActions } from "../message.actions";
export class ShowMessages extends React.Component {
  static check: any;
  private messageActions: MessageActions;
  private year: any = [
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
  constructor(props: any) {
    super(props);
    this.messageActions = new MessageActions();
  }
  closeReply(callback: Function) {
    const contReply: any = document.getElementById("contReply");
    const insideReply: any = document.getElementById("insideReply");
    if (contReply && insideReply) {
      callback({ respuesta_de: undefined });
      insideReply.innerHTML = "";
      contReply.style.display = "none";
    }
  }
  showUser(nameUser: string, id_user: number, props: any): any {
    if (id_user === props.id_usuario) {
      return "Tú";
    } else {
      return nameUser;
    }
  }
  replyMessage(state: any, props: any, callback: Function) {
    const contReply: any = document.getElementById("contReply");
    const insideReply: any = document.getElementById("insideReply");
    if (contReply && insideReply) {
      const user: string = this.showUser(state.user, state.id_usuario, props);

      callback({ respuesta_de: state.id_mensaje });
      callback({
        replyCont: {
          user: user,
          contenido: state.contenido,
          id_usuario: state.id_usuario,
        },
      });
      insideReply.innerHTML =
        '<div class="reply"><b>' +
        user +
        "</b><p>" +
        state.contenido +
        "</p></div>";
      contReply.style.display = "flex";
    }
  }
  showFliterMessages(state: any) {
    if (state.filter) {
      return state.messages.filter(
        (message: any) => message.tipo_usuario != "ESTUDIANTE"
      );
    } else {
      return state.messages;
    }
  }

  switchFilter(callback: Function, estado: boolean) {
    callback({ filter: estado });
  }

  closeOptionMessages(i: number){
    const option = document.getElementsByClassName("contOptionMessage")[i] as HTMLElement;
    const selectO = document.getElementsByClassName("selectAccion")[i] as HTMLElement;
    const elementH = document.getElementsByClassName("elementHidden")[i] as HTMLElement;
    if (option && selectO && elementH) {
      setTimeout(() => {  if(selectO.style.visibility != "hidden"){
        elementH.style.visibility='';
        selectO.style.display = "";
        option.style.opacity = "0";
        option.style.visibility = "hidden";
        option.style.width = "0";
      } }, 500);
    
    
    }
  }
  showOptionMessages(i: number) {
    const option = document.getElementsByClassName("contOptionMessage")[i] as HTMLElement;
    const selectO = document.getElementsByClassName("selectAccion")[i] as HTMLElement;
    const elementH = document.getElementsByClassName("elementHidden")[i] as HTMLElement;

  if (option && selectO && elementH) {
      if(selectO.style.display != "block"){
        elementH.style.visibility='hidden';
        selectO.style.display = "block";
        option.style.opacity = "1";
        option.style.visibility = "visible";
        option.style.width = "7vw";
      }else{
        elementH.style.visibility='';
        selectO.style.display = "";
        option.style.opacity = "0";
        option.style.visibility = "hidden";
        option.style.width = "0";
      }
    
    }
  }

  compareIdUser(
    state: any,
    message: any,
    props: any,
    index: number,
    context: any,
    callback: Function
  ): any {
    let rigthP='0';
    let padding='0';
    if (message.id_usuario === props.id_usuario) {
      rigthP='0';
      padding='0'
    }else{
      rigthP='';
      padding='4'
    }
 
    let reply: any;
    if (message.respuesta_de) {
      const arrayReply = message.userCont.split("=");
      const user: string = this.showUser(
        arrayReply[0],
        parseInt(arrayReply[2]),
        props
      );

      reply = (
        <a href={"#" + message.respuesta_de} className="showReply">
          <b>{user}</b>
          <p>{arrayReply[1]}</p>
        </a>
      );
    }
    
    let faSelectIcon: any = (
      <ul
        className={"selectAccion hidden pl-"+padding}
        id={"selectAccion" + message.id_mensaje}
      >
        <li>
          <button className='focus:outline-none' onClick={() => this.showOptionMessages(index)} onBlur={() => this.closeOptionMessages(index)}>
          <FontAwesomeIcon
            icon={faSortDown}
            className="text-sm"
            
          /></button>
          <ul
            className={"contOptionMessage right-"+rigthP} 
            id={"contOptionMessage" + message.id_mensaje}
          >
            <li  onClick={() => this.replyMessage(message, props, callback)}>
              <span>
                <FontAwesomeIcon
                  icon={faReply}
                 
                />
                <p className="pl-2">Responser</p>
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faEraser} />
                <p className="pl-2">Eliminar</p>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    );
    if (message.id_usuario === props.id_usuario) {
      
      let iconCurrent = (
        <FontAwesomeIcon icon={faCheck} className="iconCurrent" />
      );

      if (!message.id_mensaje) {
        if (!state.contErrorMessage.length) {
          iconCurrent = <FontAwesomeIcon icon={faClock} />;
        } else {
          iconCurrent = (
            <FontAwesomeIcon
              title="Reenviar mensaje"
              className="text-xs"
              icon={faExclamationTriangle}
              onClick={() =>
                this.messageActions.fetchSetMessage(message, state, callback)
              }
            />
          );
        }
        faSelectIcon = "";
      }

      return (
        <div
          key={"a" + index}
          id={message.id_mensaje}
          tabIndex={-1}
          className="mensajeRigth text-blackO-400 focus:outline-none"
        >
          {reply}
          <span className="Rigth">
            <p className="mR">
              {message.contenido}
            </p>
            <span className="hourM">
              {context.getTime(message.created_at, "HH:mm")}
            </span>
            <span className="contIcontCurrent mt-2">
              {faSelectIcon}
              <span
                className="elementHidden"
                id={"elementHidden" + message.id_mensaje}
              >
                {iconCurrent}
              </span>
            </span>
          </span>
        </div>
      );
    } else {
      let userType: string = "";
      let colorUserType: string = "bg-blackO-500";
      if (message.tipo_usuario != "ESTUDIANTE") {
        userType = message.tipo_usuario;
        colorUserType = "bg-blackO-200 ";
      }

      return (
        <div
          key={"a" + index}
          id={message.id_mensaje}
          tabIndex={-1}
          className={"mensajeLeft " + colorUserType + " focus:outline-none"}
        >
          <div key={"c" + index} className="mI">
            <span className="nameUser">
              <b className="p-1 text-gray-600"> {message.user}</b>
              <b className="p-1 text-clar">{userType}</b>
            </span>
            {reply}
            <span className="contenidoH">
              <span>
                {message.contenido}
              </span>
              <span className="contH">
                <span className="hourM">
                  {faSelectIcon}

                  <p
                    className="elementHidden"
                    id={"elementHidden" + message.id_mensaje}
                  >
                    {context.getTime(message.created_at, "HH:mm")}
                  </p>
                </span>
              </span>
            </span>
          </div>
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
      ) {
        if (context.validateCantDay(message.created_at)) {
          return (
            <div key={"b" + index} className="contAgo">
              {context.getStringDate(message.created_at, this.year)}
            </div>
          );
        } else {
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

  newMessagePaint(
    state: any,
    context: any,
    props: any,
    callback: Function
  ): any {
    try {
      return this.showFliterMessages(state).map(
        (newMessage: any, j: number) => {
          return (
            <div key={j} className="w-full">
              {this.checkDay(newMessage, j, context)}
              {this.compareIdUser(
                state,
                newMessage,
                props,
                j,
                context,
                callback
              )}
            </div>
          );
        }
      );
    } catch (error) {
      return error;
    }
  }
}

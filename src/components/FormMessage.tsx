import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faInfo,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { MessageActions } from "../actions/message.actions";
import AppContext from "../context/contextMessage";
import { ShowMessages } from "../actions/componentActions/ShowMessages";
export class FormMessages extends React.Component<IPropsFormMessages> {
  static context = AppContext;
  private messageActions: MessageActions;
  private showMessages: ShowMessages;
  private contenidoRef: React.RefObject<any>;
  private contScrollRef: React.RefObject<any>;
  private isMountedComponent: boolean = false;
  state: any = {
    contErrorMessage: [],
    idMessageTemp: 0,
    respuesta_de: undefined,
    filter: false,
    skipOld: null,
    skipLast: null,
    loading: false,
    maxFile: null,
    messages: [],
    cantMessages: [],
    replyCont: [],
  };

  constructor(props: IPropsFormMessages) {
    super(props);
    this.messageActions = new MessageActions();
    this.showMessages = new ShowMessages(props);
    this.contenidoRef = React.createRef();
    this.contScrollRef = React.createRef();
  }

  async componentDidMount() {
    this.isMountedComponent = true;

    this.context
      .getIO()
      .emit("subscribe", { room: "Group" + this.props.id_grupo });
    await this.messageActions.fetchGetLastMessages(
      this.state,
      this.setState.bind(this),
      this.props,
      20
    );
    this.updateLastMessage();
    this.onMessage();
    if(this.isMountedComponent){
    this.contScrollRef.current.scrollTop =
      (this.contScrollRef.current.scrollHeight -
        this.contScrollRef.current.clientHeight) *
      0.98;
    this.contenidoRef.current.focus();}
  }
  componentWillUnmount() {
    this.isMountedComponent = false;
  }
  /*shouldComponentUpdate(nextProps:IPropsFormMessages,nextState:any){
  
    return (nextState.messages!==this.state.messages || nextState.messages!==this.state.messages);
  }*/

  updatePosition() {
    const id = document.getElementById("281");
    const id2 = document.getElementById("contM");
    if (id) {
      const { x, y } = id.getBoundingClientRect();
      console.log(id);
      id.focus();
    }
  }
  
  async onMessage(): Promise<void> {
    this.context.getIO().on("send message", async (data: any) => {
      if (this.isMountedComponent) {
        if (data.message.id_usuario != this.props.id_usuario) {
          this.setState({
            messages: [...this.state.messages, data.message],
          });

          this.contScrollRef.current.scrollTop = this.contScrollRef.current.scrollHeight;
        } else {
          await this.messageActions.updateMessages(
            this.state,
            this.setState.bind(this),
            data.message.id_mensaje,
            data.message.idMessageTemp
          );
          await this.messageActions.removeContErrorMessage(
            data.message.idMessageTemp,
            this.state,
            this.setState.bind(this)
          );
        }
        const mensaje: any = {
          id_usuario: data.message.id_usuario,
          id_grupo: data.message.id_grupo,
          id_mensaje: data.message.id_mensaje,
        };
        this.setState({
          maxFile: data.maxFile,
        });
        this.context.getIO().emit("update lastMessage", mensaje);
      }
    });
  }
  async updateLastMessage() {
    if (this.state.messages[this.state.messages.length - 1] != undefined) {
      if (
        this.state.cantMessages[0].nuevos > 0 &&
        this.state.messages[this.state.messages.length - 1].id_mensaje >
          this.state.cantMessages[0].lastM
      ) {
        let data: any = {
          id_usuario: this.props.id_usuario,
          id_grupo: this.props.id_grupo,
          id_mensaje: this.state.messages[this.state.messages.length - 1]
            .id_mensaje,
        };
        this.context.getIO().emit("update lastMessage", data);
      }
    }
  }

  async loadMessages(skip: number, limit: number, direccion: boolean) {
    this.setState({ loading: true });
    await this.messageActions.fetchGetMessages(
      direccion,
      this.state.messages,
      this.setState.bind(this),
      this.props.id_grupo,
      skip,
      limit
    );
    //this.setState({ loading: false });
  }

  //

  async handleScroll(event: any): Promise<void> {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    let limit = 20;
    if (
      scrollTop === 0 &&
      this.state.skipOld > 0 &&
      this.state.maxFile >= limit
    ) {
      if (this.state.skipOld - limit >= 0) {
        await this.setState({ skipOld: this.state.skipOld - limit });
      }
      if (this.state.maxFile - this.state.skipOld <= limit) {
        await this.setState({ skipOld: this.state.skipOld - limit });
      }
      if (this.state.skipOld < 0 || this.state.skipOld - limit < 0) {
        await this.setState({ skipOld: 0 });
      }
      await this.loadMessages(this.state.skipOld, limit, false);
      //  this.updatePosition();

      //  this.contScrollRef.current.scrollTop =
      //     (scrollHeight - clientHeight) * 0.;

      //id.posi
    }

    if (
      scrollHeight - scrollTop === clientHeight &&
      this.state.skipLast < this.state.maxFile
    ) {
      if (this.state.skipLast + limit >= this.state.maxFile) {
        await this.setState({ skipLast: this.state.maxFile });
        return;
      } else {
        await this.setState({ skipLast: this.state.skipLast + limit });
        if (this.state.maxFile - this.state.skipLast < limit) {
          await this.setState({ skipLast: this.state.maxFile - limit });
        }
      }
      await this.loadMessages(this.state.skipLast, limit, true);
      await this.updateLastMessage();
      // this.contScrollRef.current.scrollTop =
      //  (scrollHeight - clientHeight) * 0.1;
    }
  }

  render() {
    ShowMessages.check = "1900-11-28";
    return (
      <>
        <div className="contFilter bg-blackO-200 p-2">
          <span className="fle flex-row justify-between">
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-3">{this.props.group}</span>
          </span>
          <span className="flex flex-row justify-around w-6/12">
            <button
              className="bg-blackO-100 w-5/12 rounded-xl p-1 focus:outline-none"
              onClick={() =>
                this.showMessages.switchFilter(this.setState.bind(this), false)
              }
            >
              <b>Todos</b>
            </button>
            <button
              className="bg-mar2  w-5/12  rounded-xl p-1 focus:outline-none"
              onClick={() =>
                this.showMessages.switchFilter(this.setState.bind(this), true)
              }
            >
              <b>Relevantes</b>
            </button>
            <span className="infoGroup bg-mar2">
              <FontAwesomeIcon icon={faInfo} />
            </span>
          </span>
        </div>
        <div
          className="contM w-full row-span-11"
          id="contM"
          ref={this.contScrollRef}
          onScroll={this.handleScroll.bind(this)}
        >
          {this.showMessages.newMessagePaint(
            this.state,
            this.context,
            this.props,
            this.setState.bind(this)
          )}
        </div>
        <div className="formMessage  bg-gray-300">
          <span id="contReply" className="contReply hidden">
            <div id="insideReply" className="insideReply"></div>
            <button
              className="p-2 text-2xl text-center w-auto text-blackO-500 focus:outline-none"
              onClick={() =>
                this.showMessages.closeReply(this.setState.bind(this))
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </span>
          <div className="contInsideM">
            <div className="container justify-items-center content-center w-auto text-gray-600">
              <FontAwesomeIcon icon={faPaperclip} />
            </div>
            <input
              type="text"
              name="contenido"
              ref={this.contenidoRef}
              placeholder="Escribe un mensaje"
              className="inputContM text-gray-700 rounded-md p-1 bg-white"
              onKeyPress={(e) =>
                this.messageActions.handleNewMessage(
                  e,
                  this.state,
                  this.props,
                  this.contenidoRef,
                  this.contScrollRef,
                  this.context,
                  this.setState.bind(this)
                )
              }
            />
            <button
              type="button"
              className="text-mar  focus:outline-none"
              onClick={(e) =>
                this.messageActions.handleNewMessage(
                  e,
                  this.state,
                  this.props,
                  this.contenidoRef,
                  this.contScrollRef,
                  this.context,
                  this.setState.bind(this)
                )
              }
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </>
    );
  }
}
interface IPropsFormMessages {
  id_usuario: number;
  id_grupo: number;
  group: string;
  foto: string;
  user: string;
  tipo_usuario: string;
}

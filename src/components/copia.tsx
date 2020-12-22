/*import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { MessageActions } from "../actions/message.actions";
import AppContext from "../context/contextMessage";
import { ShowMessages } from "../actions/componentActions/ShowMessages";

export class FormMessages extends React.Component<IPropsFormMessages> {
  static context = AppContext;
  private messageActions: MessageActions;
  private showMessages: ShowMessages;
  private contenidoRef: React.RefObject<any>;
  private contScrollRef: React.RefObject<any>;
  private contScrollTopRef: React.RefObject<any>;
  private contScrollBottomRef: React.RefObject<any>
  state: any = {
    skip: null,
    loading: false,
    maxFile: null,
    sendMessage: {
      contenido: "",
      respuesta_de: undefined,
      id_usuario: 0,
      id_grupo: 0,
      created_at: "",
    },
    messages: [],
    cantMessages: [],
  };

  constructor(props: IPropsFormMessages) {
    super(props);
    this.messageActions = new MessageActions();
    this.showMessages = new ShowMessages(props);
    this.contenidoRef = React.createRef();
    this.contScrollRef = React.createRef();
    this.contScrollTopRef= React.createRef();
    this.contScrollBottomRef= React.createRef()
  }

  async componentDidMount() {
    await this.messageActions.fetchGetLastMessages(
      this.state,
      this.setState.bind(this),
      this.props,50
    );
    this.contenidoRef.current.focus();
    const {clientHeight, scrollHeight } = this.contScrollRef.current;
    let positionScrolltop:any;
    this.contScrollRef.current.scrollTop=positionScrolltop= (scrollHeight - clientHeight) * 0.9;


    await this.onMessage();
    const options = {
      root: document.querySelector('.contM'),
      rootMargin: '0px',
      threshold: 0.1
    }
    let limit=50;
    //Cargar viejos///////////////////////////
    const intersectionTopObserver:any=new IntersectionObserver(async(entries)=>{
      const {clientHeight, scrollHeight } =  this.contScrollRef.current;
      const ratio=entries[0].intersectionRatio;
      console.log("1er: "+ratio)
      if (ratio > 0 && this.state.skip > 0 && this.state.maxFile>=limit) {
        if (this.state.skip - limit > 0) {
          this.setState({ skip: this.state.skip - limit });
         
        }  if (this.state.maxFile - this.state.skip <= limit ){
          this.setState({ skip: this.state.skip-limit });
        }
        if(this.state.skip<0){
          this.setState({ skip:0});
        }
      
  
        this.loadMessages(limit);
       this.contScrollRef.current.scrollTop =
          (scrollHeight - clientHeight)/2;
      }
  
    },options);
//Cargar nuevos///////////////////////////
    const intersectionBottomObserver:any=new IntersectionObserver(async (entries)=>{
      const ratio=entries[0].intersectionRatio;
      console.log("2do: "+ratio)
      if (
       ratio>0 &&
        this.state.skip < this.state.maxFile
      ) {
        if (this.state.skip + 50 >= this.state.maxFile) {
           this.setState({ skip: this.state.maxFile });
          return;
        } else {
           this.setState({ skip: this.state.skip + limit });
          if (this.state.maxFile - this.state.skip < limit) {
            this.setState({ skip: this.state.maxFile - limit });
          }
        }
        
         this.loadMessages(limit);
      }


    },options);

  intersectionTopObserver.observe(this.contScrollTopRef.current);
   intersectionBottomObserver.observe(this.contScrollBottomRef.current);

    
  }
  async onMessage(): Promise<void> {
    await this.context.getIO().on("send message", async (data: any) => {
      await this.setState({
        messages: [data.message, ...this.state.messages],
      });
 this.contScrollRef.current.scrollTop =  this.contScrollRef.current.scrollHeight;
      await this.setState({
        maxFile: data.message.maxFile,
      });

      this.context.getIO().emit("update lastMessage", data);
    });
  }

  loadMessages = async (limit:number) => {
    this.setState({ loading: true });
    await this.messageActions.fetchGetMessages(
      this.state,
      this.setState.bind(this),
      this.props.id_grupo,
      this.state.skip,
      limit
    );
    this.setState({ loading: false });
  };

  newMessage(sendMessage: any): void {
    this.setState({
      sendMessage: sendMessage,
    });
  }

  async handleScroll(event: any): Promise<void> {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    let limit=100;

    if (scrollTop === 0 && this.state.skip > 0 && this.state.maxFile>=limit) {
      if (this.state.skip - limit > 0) {
        await this.setState({ skip: this.state.skip - limit });
       
      }  if (this.state.maxFile - this.state.skip <= limit ){
        await this.setState({ skip: this.state.skip-limit });
      }
      if(this.state.skip<0){
        await this.setState({ skip:0});
      }
    

      await this.loadMessages(limit);
      this.contScrollRef.current.scrollTop =
        (scrollHeight - clientHeight) * 0.9;
    }

    if (
      scrollHeight - scrollTop === clientHeight &&
      this.state.skip < this.state.maxFile
    ) {
      if (this.state.skip + 50 >= this.state.maxFile) {
        await this.setState({ skip: this.state.maxFile });
        return;
      } else {
        await this.setState({ skip: this.state.skip + limit });
        if (this.state.maxFile - this.state.skip < limit) {
          this.setState({ skip: this.state.maxFile - limit });
        }
      }
      this.contScrollRef.current.scrollTop =
        (scrollHeight - clientHeight) * 0.12;
      await this.loadMessages(limit);
    }
  }

  render() {
    ShowMessages.check = "1900-11-28";
    return (
      <>
        <div
          className="contM w-full row-span-11"
          ref={this.contScrollRef}
        >
          <div ref={this.contScrollTopRef}></div>
          <div className="contMessageMain w-full">
            {this.showMessages.newMessagePaint(
              this.state,
              this.context,
              this.props
            )}
          </div>

          <div className="contMessageSecond">
            {this.showMessages.messagePaint(
              this.state,
              this.context,
              this.props
            )}
          </div>
          <div ref={this.contScrollBottomRef}></div>
        </div>
        
        <form
          className="grid grid-cols-14 justify-items-center content-center row-span-1 h-12 bg-gray-300"
          method="post"
          onSubmit={(e) =>
            this.messageActions.handleNewMessage(
              e,
              this.state,
              this.props,
              this.contenidoRef,
              this.context,
              this.newMessage.bind(this)
            )
          }
        >
          <div className="container grid justify-items-center content-center col-span-1 text-gray-600">
            <FontAwesomeIcon icon={faPaperclip} />
          </div>
          <div className="container grid grid-cols-12 justify-items-center content-center col-span-13 ">
            <input
              type="text"
              name="contenido"
              ref={this.contenidoRef}
              placeholder="Escribe un mensaje"
              className="col-span-11 w-full text-gray-700 rounded-md p-1 bg-white"
            />
            <button className="text-mar col-span-1 focus:outline-none">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </form>
      </>
    );
  }
}
interface IPropsFormMessages {
  id_usuario: number;
  id_grupo: number;
  user: string;
}
*/
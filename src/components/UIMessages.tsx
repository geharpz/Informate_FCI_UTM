import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Groups } from "./Groups";
import { FormMessages } from "./FormMessage";
import AppContext from "../context/contextMessage";
FormMessages.contextType = AppContext;
Groups.contextType = AppContext;

export class UIMessages extends React.Component {
  state = {
    id_usuario: 3,
    id_grupo: 0,
    group: "",
    foto: "",
    user: "geharpz",
    tipo_usuario: "ESTUDIANTE",
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}
 
  render() {
    if (this.state.id_grupo != 0) {
      return (
        <div className="contFM grid grid-cols-12 gap-2 m-auto mt-16 w-8/12 h-screen2">
          <Groups
            id_usuario={this.state.id_usuario}
            id_grupo={this.state.id_grupo}
            group={this.state.group}
            foto={this.state.foto}
            user={this.state.user}
            setInfo={this.setState.bind(this)}
          />

          <div className="mainCont grid col-span-8 border border-solid border-blackO-100 ">
            <FormMessages
              key={this.state.id_grupo}
              id_usuario={this.state.id_usuario}
              id_grupo={this.state.id_grupo}
              group={this.state.group}
              foto={this.state.foto}
              user={this.state.user}
              tipo_usuario={this.state.tipo_usuario}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="contFM grid grid-cols-12 gap-2 m-auto mt-16 w-8/12 h-screen2">
          <Groups
            id_usuario={this.state.id_usuario}
            id_grupo={this.state.id_grupo}
            group={this.state.group}
            foto={this.state.foto}
            user={this.state.user}
            setInfo={this.setState.bind(this)}
          />

          <div className="grid col-span-8 border border-solid border-blackO-100 ">
            <div className="contMVoid w-full row-span-11">
              <div>
                <img src="../../public/Img/fci.png" alt="Escudo de FCI" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { GroupsActions } from "../actions/groups.actions";
import AppContext from "../context/contextMessage";
export class Groups extends React.Component<IPropsGroups> {
  static context = AppContext;
  private groupsActions = new GroupsActions();

  constructor(props: IPropsGroups) {
    super(props);
  }
  state: any = {
    groups: [],
  };

  async componentDidMount() {
    await this.groupsActions.fetchGetGrupsUser(
      this.props.id_usuario,
      this.state,
      this.setState.bind(this)
    );

    this.context.getIO().on("Update state group", (data: any) => {
      this.updateGroups(data.id_grupo, data);
    });
  }

  updateGroups(id_grupo: number, data: any) {
    this.state.groups.map((group: any, i: number) => {
      if (group.id_grupo === id_grupo) {
        let nuevos = 0;
        if (group.id_grupo != this.props.id_grupo) {
          nuevos = group.nuevos + 1;
        }
        const updateGroup = {
          id_grupo: group.id_grupo,
          nombre: group.nombre,
          descipcion: group.descripcion,
          foto: group.foto,
          created_at: group.created_at,
          userContenido: data.user + ": " + data.contenido,
          nuevos: nuevos,
        };
        let arrayCopy: any = this.state.groups;
        arrayCopy.splice(i, 1);
        arrayCopy.unshift(updateGroup);
        this.setState({ groups: arrayCopy });
      }
    });
  }
   selectGroup(state: any):void{
     this.props.setInfo({ id_grupo: state.id_grupo });
     this.props.setInfo({ group: state.nombre });
     this.props.setInfo({ foto: state.foto });
    const nuevo = document.getElementById(String("nuevos" + state.id_grupo));

    if (nuevo) {
      nuevo.style.display = "none";
    }

    this.context.getIO().emit("unsubscribe");
  }
  groupsPaint(): any {
    try {
      return this.state.groups.map((group: any, i: number) => {
        let lastContentM = "Se te añadió al grupo";
        let nuevos: any = "";
        if (group.user != "") {
          lastContentM = group.userContenido;
        }
        if (group.nuevos != 0) {
          nuevos = (
            <p
              key={"nuevos" + group.id_grupo}
              id={"nuevos" + group.id_grupo}
              className="newMessages"
            >
              {group.nuevos}
            </p>
          );
        }
        return (
          <button
            key={"Componente" + group.id_grupo}
            className="compGroup w-full focus:outline-none"
            onClick={(e) => this.selectGroup(group)}
          >
            <div
              key={"0-" + group.id_grupo}
              className="flex flex-col justify-items-center w-1/5  h-full "
            >
              <div
                key={"icon-" + group.id_grupo}
                className="flex flex-col justify-items-center w-full h-full text-center"
              >
                <FontAwesomeIcon icon={faUser} className="m-auto" />
              </div>
            </div>
            <div key={"1-" + group.id_grupo} className="groupComponent">
              <p key={"n-" + group.id_grupo}>{group.nombre}</p>
              <div key={"cont-" + group.id_grupo} className="contentNew">
                <p>{lastContentM}</p>
                {nuevos}
              </div>
            </div>
          </button>
        );
      });
    } catch (error) {
      return error;
    }
  }

  render() {
    return (
      <>
        <div className="contGM grid col-span-4 border border-solid rounded border-blackO-100 overflow-y-scroll">
          {this.groupsPaint()}
        </div>
      </>
    );
  }
}

interface IPropsGroups {
  id_usuario: number;
  id_grupo: number;
  group: string;
  foto: string;
  user: string;
  setInfo: Function;
}

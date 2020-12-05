import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormMessages } from "./FormMessage";
import { GroupsActions } from "../actions/groups.actions";
import AppContext from "../context/contextMessage";
FormMessages.contextType = AppContext;

export class UIMessages extends React.Component {
  private groupsActions = new GroupsActions();

  componentDidMount() {
    //this.groupsActions.fetchGetGrups("all_1", 0);
  }

  render() {
    return (
      <div className="contFM grid grid-cols-12 gap-2 m-auto mt-16 w-8/12">
        <div className="contGM grid col-span-4 border border-solid rounded border-blackO-100 overflow-y-scroll"></div>
        <div className="grid col-span-8 border border-solid border-blackO-100 ">
          <FormMessages id_usuario={1} id_grupo={2} user="geharpz" />
        </div>
      </div>
    );
  }
}

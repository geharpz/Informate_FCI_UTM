export class GroupsActions {
  public async fetchGetGrups(criterio: any, skip: number): Promise<void> {
    await fetch("https://informate-fci.herokuapp.com/api/grupo/" + criterio + "/" + skip
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  public async fetchGetGrupsUser(id_user:number,state:any,callback:Function): Promise<void> {
    await fetch("https://informate-fci.herokuapp.com/api/grupo/" + id_user
    )
      .then((res) => res.json())
      .then((data) => {
        callback({groups:data,...state.groups});
      })
      .catch((error) => console.log(error));
  }

  
}

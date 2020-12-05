export class GroupsActions {
  public async fetchGetGrups(criterio: any, skip: number): Promise<void> {
    await fetch(
      process.env.REACT_APP_URL + "/api/grupo/" + criterio + "/" + skip
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
}

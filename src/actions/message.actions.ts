export class MessageActions {
  public async fetchGetMessages(
    state: any,
    callback: any,
    id_group: number,
    skip: number
  ): Promise<any> {
    await fetch(
     "https://informate-fci.herokuapp.com/api/mensaje/" + id_group + "/" + skip + "/50"
    )
      .then((res) => {
        return res.json();
      })
      .then( (data) => {
       callback({ messages: [data] });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  public async fetchGetLastMessages(
    state: any,
    callback: any,
    props: any
  ): Promise<any> {
    await fetch(
      "https://informate-fci.herokuapp.com/api/mensaje/ultimoMensaje/" +
        props.id_usuario +
        "/" +
        props.id_grupo +
        "/50"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback({
          messages: [data.newMessages, ...state.messages],
        });
        callback({
          cantMessages: [data.cantMessages, ...state.messages],
        });
        callback({ skip: data.cantMessages[0].positionLastM-50});
        callback({ maxFile: data.cantMessages[0].allMessages});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public async fetchSetMessage(mensaje: any): Promise<void> {
    await fetch("https://informate-fci.herokuapp.com/api/mensaje/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(mensaje),
    })
      .then((data) => {})
      .catch((error) => console.log(error.json()));
  }
  public async fetchPutLastMessage(lastMessge: any): Promise<void> {
    await fetch("https://informate-fci.herokuapp.com/api/mensaje/actualizarID/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(lastMessge),
    })
      .then((data) => {})
      .catch((error) => console.log(error.json()));
  }

  public async handleNewMessage(
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
    stateMessage: any,
    props: any,
    contenido: any,
    created_at: any,
    callback: Function
  ): Promise<void> {
    try {
      e.preventDefault();
      if (contenido.current.value != "") {
        const newMessage: any = {
          contenido: contenido.current.value,
          respuesta_de: undefined,
          id_usuario: props.id_usuario,
          id_grupo: props.id_grupo,
          user: props.user,
          created_at: created_at.getDateTimeNow("YYYY/MM/DD HH:mm:ss"),
        };
        await callback(newMessage);
        await this.fetchSetMessage(newMessage);
      }
      contenido.current.value = "";
    } catch (error) {
      console.error(error);
    }
  }
}

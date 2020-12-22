export class MessageActions {
  updateMessages(
    state: any,
    callback: Function,
    id_mensaje: number,
    idMessageTemp: number
  ): void {
    state.messages.map((message: any, i: number) => {
      if (message.idMessageTemp === idMessageTemp) {
        message.id_mensaje = id_mensaje;
        let arrayCopy: any = state.messages;
        arrayCopy.splice(i, 1);
        arrayCopy.push(message);
        callback({ messages: arrayCopy });
      }
    });
  }
  async removeContErrorMessage(
    idMessageTemp: number,
    state: any,
    callback: Function
  ) {
    await state.contErrorMessage.map(async (message: any, i: number) => {
      if (message === idMessageTemp) {
        let arraycopy = state.contErrorMessage;
        arraycopy.splice(i, 1);
        await callback({ contErrorMessage: arraycopy });
      }
    });
  }
  updateContErrorMessage(
    idMessageTemp: number,
    state: any,
    callback: Function
  ): void {
    if (state.contErrorMessage.length) {
      if (!state.contErrorMessage.includes(idMessageTemp)) {
        callback({
          contErrorMessage: [...state.contErrorMessage, idMessageTemp],
        });
      }
    } else {
      callback({ contErrorMessage: [idMessageTemp] });
    }
  }
  public async fetchGetMessages(
    direcction: boolean,
    messages: any,
    callback: any,
    id_group: number,
    skip: number,
    limit: number
  ): Promise<void> {
    await fetch(
      process.env.REACT_APP_URL +
        "api/mensaje/" +
        id_group +
        "/" +
        skip +
        "/" +
        limit
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (direcction) {
          const messagesCopy = messages;
          callback({ messages: messagesCopy.concat(data) });
        } else {
          callback({
            messages: data.concat(messages),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  public async fetchGetLastMessages(
    state: any,
    callback: any,
    props: any,
    limit: number
  ): Promise<any> {
    await fetch(
      process.env.REACT_APP_URL +
        "api/mensaje/ultimoMensaje/" +
        props.id_usuario +
        "/" +
        props.id_grupo +
        "/" +
        limit
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback({
          messages: data.newMessages,
        });
        callback({
          cantMessages: [
            {
              nuevos: data.cantMessages[0].nuevos,
              lastM: data.cantMessages[0].lastM,
            },
          ],
        });

        callback({ skipOld: data.cantMessages[0].skip });
        callback({ skipLast: data.cantMessages[0].skip });
        callback({ maxFile: data.cantMessages[0].allMessages });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public async fetchSetMessage(
    mensaje: any,
    state: any,
    callback: any
  ): Promise<void> {
    await fetch(process.env.REACT_APP_URL + "api/mensaje/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(mensaje),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {})
      .catch((error) => {
        this.updateContErrorMessage(mensaje.idMessageTemp, state, callback);
        console.log(error);
      });
  }
  public async fetchPutLastMessage(lastMessge: any): Promise<void> {
    await fetch(process.env.REACT_APP_URL + "api/mensaje/actualizarID/", {
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
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
    state: any,
    props: any,
    contenido: any,
    contScrollRef: any,
    context: any,
    callback: Function
  ): Promise<void> {
    try {
      if (e.type === "keypress") {
        if ((e as React.KeyboardEvent<HTMLInputElement>).key != "Enter") {
          return;
        }
      }
      if (contenido.current.value != "") {
        const newMessage: any = {
          idMessageTemp: state.idMessageTemp + 1,
          contenido: contenido.current.value,
          respuesta_de: state.respuesta_de,
          id_usuario: props.id_usuario,
          id_grupo: props.id_grupo,
          user: props.user,
          created_at: context.getDateTimeNow("YYYY/MM/DD HH:mm:ss"),
          tipo_usuario: props.tipo_usuario,
          userCont:
            state.replyCont.user +
            "=" +
            state.replyCont.contenido +
            "=" +
            state.replyCont.id_usuario,
        };
        contenido.current.value = "";
        contenido.current.focus();
        callback({ idMessageTemp: state.idMessageTemp + 1 });
        callback(
          {
            messages: [...state.messages, newMessage],
          },
          () => {
            contScrollRef.current.scrollTop =
              contScrollRef.current.scrollHeight;
          }
        );

        await this.fetchSetMessage(newMessage, state, callback);

        if (state.respuesta_de) {
          callback({ respuesta_de: undefined });
          callback({ replyCont: [] });
        }
      }
      const contReply = document.getElementById("contReply");
      if (contReply) {
        contReply.style.display = "none";
      }
    } catch (error) {
      console.error(error);
    }
  }
}

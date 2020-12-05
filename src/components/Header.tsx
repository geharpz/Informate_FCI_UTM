import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export class Header extends React.Component<IPropsHeader> {
  constructor(props: IPropsHeader) {
    super(props);
  }

  render() {
    return (
      <>
        <header className="grid grid-cols-1 mt-0 sm:grid-cols-2 bg-blackO-200">
          <div className="grid justify-start content-center p-5">
            <a
              href="#responsive-header"
              className="font-sans font-bold hover:text-mar"
              rel="noopener noreferrer"
            >
              <span className="mr-2">
                {" "}
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              <span>{this.props.title}</span>
            </a>
          </div>
          <div className="grid justify-items-center sm:justify-items-end  p-5">
            <ul className="grid grid-cols-1 justify-items-center content-center sm:grid-cols-2 gap-2">
              <li className="text-base hover:text-mar ">Mi Perfil</li>
              <li className="text-base hover:text-mar">Cerrar sesion</li>
            </ul>
          </div>
        </header>
      </>
    );
  }
}

interface IPropsHeader {
  title: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { AuthCtx } from "../context/AuthCtx";

export default function Login() {
  const socialList = [
    { label: 'Github, y repo...', icon: 'fa-brands fa-github', to: 'https://github.com/Tzzent', color: 'text-stone-800' },
    { label: 'Linkedin', icon: 'fa-brands fa-linkedin', to: 'https://www.linkedin.com/in/carlos-ramirez-32859b204/', color: 'text-blue-800' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram', to: 'https://www.linkedin.com/in/carlos-ramirez-32859b204/', color: 'text-pink-700' },
    { label: 'Facebook', icon: 'fa-brands fa-facebook', to: 'https://www.linkedin.com/in/carlos-ramirez-32859b204/', color: 'text-blue-700' },
    { label: 'Whatsapp', icon: 'fa-brands fa-whatsapp', to: 'https://www.linkedin.com/in/carlos-ramirez-32859b204/', color: 'text-green-700' },
  ];

  const { logIn, user, logInAsGuest } = useContext(AuthCtx);


  if (user) {
    return <Navigate to={'/home'} />
  }

  const enterLike = async (social: 'guest' | 'deezer') => {
    if (social === 'guest') {
      logInAsGuest();
    }

    if (social === 'deezer') {
      logIn();
    }
  };

  return (
    <div
      className="
      w-screen
      h-screen
      flex
      justify-center
      items-center
      bg-gray-400
      "
    >
      <div
        className="
        max-w-[40em]
        h-full
        bg-white
        rounded-2xl
        flex
        flex-col
        justify-between
        gap-5
        shadow-2xl
        overflow-hidden
        sm:flex-row
        sm:h-auto
        "
      >
        <div className="p-5 w-full">
          <div className="max-w-xs">
            <img
              src="/assets/images/foxbel-music@3x.png"
              alt="FoxbelMusic"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p>Foxbel Music es un clone de Deezer que solo puede reproducir 30 segundos por musica.</p>
            <p>Por si quieres contactarme... 😉</p>
          </div>
          <div className="mt-5">
            <ul>
              {socialList.map(({ label, icon, to, color }, index) => (
                <li key={index}>
                  <a
                    href={to}
                    target='_blank'
                    className='flex gap-5 items-center'>
                    <Icon icon={icon as any} className={color} />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="
          bg-red-50
          shadow-inner
          p-5
          rounded-t-3xl
          flex
          flex-col
          justify-center
          gap-5
          sm:rounded-l-full
          "
        >
          <Button label="Invitado" color="#EB5999" onClick={() => enterLike('guest')}>
            <Icon icon="user" />
          </Button>
          <Button label="Deezer" color="#EB5757" onClick={() => enterLike('deezer')}>
            <Icon icon="music" />
          </Button>
        </div>
      </div>
    </div>
  )
}

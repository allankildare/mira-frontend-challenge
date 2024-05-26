import Image from 'next/image'
import './styles.css'

export function Menu() {
  return (
    <header className="menu px-5">
      <nav className="flex items-center justify-between mx-auto py-4">
        <Image
          src="/images/mira_logo.png"
          alt="Mira healthcare logo"
          width={106}
          height={46}
        />
        <ul className="flex gap-x-4 underline">
          <li>
            <a href="https://www.talktomira.com/" className="text-decoration-underline" rel="noopener noreferrer" target="_blank">
              Mira official website
            </a>
          </li>
          <li>
            <a href="https://github.com/allankildare/mira-frontend-challenge" rel="noopener noreferrer" target="_blank">Github repository</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

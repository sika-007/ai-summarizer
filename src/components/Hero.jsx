import { logo } from "../assets"


const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center flex-col">
        <img src={logo} alt="sum-logo" className="w-28 object-contain" />
        <button type="button" onClick={() => {
          open("")
        }}></button>
      </nav>
    </header>
  )
}

export default Hero

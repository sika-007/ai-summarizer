import { logo } from "../assets"


const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sum-logo" className="w-28 object-contain" />
        <button 
          type="button" 
          onClick={() => {
            window.open("https://github.com/sika-007/ai-summarizer")
          }}
          className="black_btn"
          >
            GitHub
          </button>
      </nav>
      <h1 className="head_text"> Summarize any Article of your choice with <br className=" md:hidden" /><span className="orange_gradient">OpenAI GPT-4</span></h1>
      <h2 className="desc">Speed up your reading with Sumz, an open-source article summarizer that converts lengthy articles into clear and concise summaries.</h2>
    </header>
  )
}

export default Hero

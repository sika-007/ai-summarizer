import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { submitIcon } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("")

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"))

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async () => {
    try {
      const { data } = await getSummary({ articleUrl: article.url })
      if(data?.summary) {
        const newArticle = { ...article, summary: data.summary }
        const updateAllArticles = [newArticle, ...allArticles]
        setArticle(newArticle)
        setAllArticles(updateAllArticles)
        localStorage.setItem("articles", JSON.stringify(updateAllArticles))
      }
    } catch(err) {
      console.error(err)
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied("")
    }, 3000)
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center" 
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <img src={linkIcon} alt="link icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder="Enter a url"
            value={article.url}
            onChange={(e) => {
              setArticle(prev => {
                return {
                  ...prev,
                  url: e.target.value
                }
              })
            }}
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            title="get summary"
          >
            <img src={submitIcon} alt="submit" width={20} />
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto ">
            {allArticles.map((item, index) => (
              <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
                <div className="copy_btn" title="copy to clipboard" onClick={() => handleCopy(item.url)}>
                  <img
                    src={copied === item.url ? tick : copy}
                    alt="copy icon"
                    className="object-contain"
                  />
                </div>
                <p className="fex-1 font-satoshi text-blue-700 font-medium text-small truncate">{item.url}</p>
              </div>
            ))}
        </div>
      </div>
      
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Sorry! <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl text-center">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-md text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo

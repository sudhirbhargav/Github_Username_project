import styles from "./Github.module.css"
import React,{useState,useEffect} from 'react'
import axios from 'axios'


const Github =()=> {
  const [query,setquery] = useState("Sudhir Bhargav")
  const [loading,setload] = useState(false)
  const [data,setdata] = useState([])
  const [error,seterror] = useState(false)
  const [page,setpage] = useState(1)
   const handleclick = (query)=>setquery(query)
   const getgithubuser = (q,page)=>{
     return axios.get("https://api.github.com/search/users",{
       method:"GET",
       params:{
         q,
         per_page:12,
         page
        }
      })
    }
    {console.log(data)}
    useEffect(()=>{
      setload(true)
      getgithubuser(query,page)
      .then((res)=>{
        setload(false)
        setdata(res.data)
        seterror(false)
      })
      .catch((err)=>{
        setload(false)
        seterror(true)
        console.log(err)
      })
    },[query,page])
    // console.log(data,query)
  return (
    <div className={styles.container}>
    {loading && <div>..Loading</div>}
    {error && <div>Error<div>Refresh the page [Problaly API issue]</div></div>}
    <h1>Search Your Github Username</h1>
     <Textprovider handleclick={handleclick} />
        <div>
          <button onClick={()=>setpage(page+1)}>Next</button>
          <button disabled={page===1} onClick={()=>setpage(page-1)}>Pevious</button>
        </div>
        <div>
          {`Page : ${page}`}
        </div>
     {data?.items?.map((item)=>(
      <>
        <Githubcard  {...item} />
      </>
     ))}
    </div>
  )
}
  const Textprovider = ({handleclick})=>{
    const [text,setText] = useState("")
    return(
      <>
        <div>
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
            <button onClick={()=>handleclick(text)}>Search</button>
        </div>
      </>
  )
}

const Githubcard = ({login,avatar_url,id,html_url}) =>{
return(
  <div className={styles.gitcard}>
  <a className={styles.gita} target="_blank" href={html_url}>
  <div key={id} >
        <img  className={styles.gitimage} src={avatar_url} alt={login} />
        <div>{login}</div>
      </div>
  </a>
  </div>
)
}

export default Github
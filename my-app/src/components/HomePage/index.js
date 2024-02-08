import {Component} from "react"
import { IoSearchSharp ,IoSunnySharp,IoMoon} from "react-icons/io5";
import BeatLoader	 from "react-spinners/BeatLoader";
import "./index.css"


const apiStatusConstant ={
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    loader:"LOADER"
}

class HomePage extends Component{
    state={countryList:[],userinput:"",apiStatus:apiStatusConstant.initial,lightTheme:true}



    serachCountry=async()=>{
        const {userinput} = this.state
        this.setState({apiStatus:apiStatusConstant.loader})
        const lowerCaseInput = userinput.toLowerCase()
        const url = `https://restcountries.com/v3.1/currency/${lowerCaseInput}`
        const response = await fetch(url)
        if(response.ok){
            const jsonData = await response.json()
            this.setState({countryList:jsonData,userinput:"",apiStatus:apiStatusConstant.success})
        }
        else{
            this.setState({apiStatus:apiStatusConstant.failure})
        }
       
    }

    searchOnHit=(event)=>{
        if(event.key==="Enter"){
            this.serachCountry()
        }
    }

    changeTheme=()=>{
        this.setState(prevState=>({lightTheme:!prevState.lightTheme}))
    }

    goHome=()=>{
        this.setState({apiStatus:apiStatusConstant.initial,userinput:""})
    }

    userInputFunction=(event)=>{
      this.setState({userinput:event.target.value})
    }


    renderHomePage=()=>{
        const {lightTheme} = this.state
        return(
            <div className="diiferentViewDiv">
        <h1 className={lightTheme? "MsgText" : "darkMsgText"}>Search country by valid currancy code.</h1>
        <img className="worldMapImage" src="https://i.ibb.co/h2170SP/World-Flag-map.png" alt="countryFlags"/>
    </div>

        )
    }

    renderSuccessView=()=>{
        const {countryList,lightTheme} = this.state
        return(
            
<ul className="listboxUnordered">
                    {countryList.length ===1 ? (<div className={lightTheme? "countryDetailsDiv":"darkCountryDetailsDiv"}>
                        <img src={countryList[0].flags.png} alt={countryList[0].flags.alt} className="flagImage"/>
                        <hr className="seperator-line"/>
                        <div className="textBox">  <p className="textElement">Name:- {countryList[0].name.common}</p>
                        <p className="textElement">Capital:- {countryList[0].capital}</p>
                        <p className="textElement">Population:- {countryList[0].population}</p></div>
                      
                       
                    </div>):(<div className="countryDiv">{countryList.map((eachCountry)=>(
                        <li key={countryList.tid} className={lightTheme? "countryDetailsDiv":"darkCountryDetailsDiv"}>
                            <img src={eachCountry.flags.png} alt={eachCountry.flags.alt} className="flagImage"/>
                            <hr className="seperator-line"/>
                           <div className="textBox">
                           <p className="textElement">Name:- {eachCountry.name.common}</p>
                            <p className="textElement">Capital:- {eachCountry.capital[0]}</p>
                            <p className="textElement">Population:- {eachCountry.population}</p>
                            <p className="textElement">{eachCountry.currencies[0]}</p>
                           </div>
                        

                        </li>
                    ))}</div>)}
                    
                </ul>
        )
    }

    renderFailureView=()=>{
        const {lightTheme} = this.state
        return(
            <div className="diiferentViewDiv">
        <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png" alt="notfoundimage"/>
        <h1 className={lightTheme? "NotFOundMsgText":"darkMsgNotFound"}>Not Found.</h1>
        <p className={lightTheme? "msgInfo notfoundinfo":"darkmsgINfo"}>Make sure you enter Valid country currancy code.</p>
    </div>
        )
    }

    renderLoader=()=>{
        const {lightTheme} = this.state
        return(
            <div className="loader-container">
              <BeatLoader size={20} aria-label="BounceLoader" color={lightTheme? "#000000":"#ffffff"} />
       <p className={lightTheme? "msgInfo notfoundinfo":"darkmsgINfo"}>Loading...</p>
      </div>
        )
    }

    renderApiCalls=()=>{
        const {apiStatus} = this.state
        switch(apiStatus){
            case apiStatusConstant.initial:
                return this.renderHomePage()
                case apiStatusConstant.success:
                    return this.renderSuccessView()
                    case apiStatusConstant.failure:
                        return this.renderFailureView()
                        case apiStatusConstant.loader:
                            return this.renderLoader()
                        default:
                            return null
        }
    }

    render(){
        const {userinput,lightTheme} = this.state
        return(
            <div className={lightTheme? "MainContainer":"darkMainContainer"}>
                <div className="HeaderSection"><h1 className={lightTheme? "app-heading":"darkAppHeading"}>World By Currancy</h1>
                <button type="button" onClick={this.changeTheme} className={lightTheme? "themeButton":"darkthemeButton"}>{lightTheme? (<IoMoon size={18}/>):(<IoSunnySharp size={18}/>)}</button>
                </div>
                
                <div className="SearchBarContainer">
                    <button type="button" onClick={this.serachCountry} className="SearchButton"><IoSearchSharp size={18}/></button>
                    <input type="search" onKeyDown={this.searchOnHit} className="inputElement" value={userinput} placeholder="Search by currancy INR,EUR" onChange={this.userInputFunction}/>
                    <button type="button" onClick={this.goHome} className="gohomeButton">Go Home</button>
                    <div>
                    </div>
                </div>
               <div>
               {this.renderApiCalls()}
               </div>
            </div>
        )
    }
}

export default HomePage
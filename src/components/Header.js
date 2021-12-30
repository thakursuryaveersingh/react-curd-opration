import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import { FaTimes} from 'react-icons/fa'

const Header = ({title , showForm , showAddTask, pageTitle}) => {
    const location= useLocation()
    const setPageTitle =  (location,pageTitle) =>{
        let ptitle ='No title'
        pageTitle.map((page) =>{ 
            // console.log(location)
            if(page.location === location){
                ptitle = page.title
                
            } 
        })
        // console.log(ptitle)
        return ptitle
    }
    document.title = "Task Traker | " + setPageTitle(location.pathname,pageTitle)
    return (
        <header className="header">
            <h1>{title}</h1>
            { location.pathname === "/" && <Button color={showAddTask? "red" : "green"} text={showAddTask?(<FaTimes  />):'Add'} onClick ={showForm}/> }
            
        </header>
    )
}

Header.defaultProps = {
    title:"Task Traker",
}
Header.propTypes = {
    title: PropTypes.string.isRequired,
}
export default Header

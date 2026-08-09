import styles from './Navebar.module.css'

function Navebar (){
    return(
        <>
            <div >
                <div className={styles.topnav}>
                <a href="#home">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
                </div>
  
            </div>
                

        </>
    )
}

export default Navebar;
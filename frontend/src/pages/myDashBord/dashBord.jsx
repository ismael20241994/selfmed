import { useState, useEffect } from "react";
import styles  from './DSB.module.css';
 
function DSB (){

    const card = ["registPac", "registClin","markConsult","registFarm"];
    return(
        <div className={styles.container}>
            <div className={styles.contTopNave}>
                <div className={styles.topnav}>
                    <a href="#home">Home</a>
                    <a href="#news">News</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>
            </div>

            <div className={styles.sideBar} > 
                <div  className={styles.cardSd} >
                    <div className={styles.contentCardSd}>
                        <a href="/regc" className={styles.link}>Registro de Usuarios</a>
                    </div>
                </div>

                <div  className={styles.cardSd} >
                    <div className={styles.contentCardSd}>
                        <a href="/allCons" className={styles.link}>Registro de Consultas</a>
                    </div>
                </div>

                <div  className={styles.cardSd}>
                    <div className={styles.contentCardSd}>
                        <a href="/clinic" className={styles.link}>Registro de Clinicas</a>
                    </div>
                </div>

                <div  className={styles.cardSd} >
                    <div className={styles.contentCardSd}>
                        <a href="#" className={styles.link}>Actualização de Atestados</a>
                    </div>
                </div>

                <div  className={styles.cardSd} >
                    <div className={styles.contentCardSd}>
                        <a href="#" className={styles.link}>Registro de Farmacias</a>
                    </div>
                </div>
            </div>
                  
            <div className={styles.content}>
            
                <div  className={styles.card} >
                    <h4>Pac:</h4>
                    <div className={styles.contentCard}>
                        <p>User Regist</p>
                    </div>
                </div>

                <div  className={styles.card} >
                    <h4>Clinicas Registradas</h4>
                    <div className={styles.contentCard}>
                        <p>User Regist</p>
                    </div>
                </div>

                <div  className={styles.card} >
                    <div className={styles.contentCard}>
                        <p>User Regist</p>
                    </div>
                </div>

                <div  className={styles.card} >
                    <div className={styles.contentCard}>
                        <p>User Regist</p>
                    </div>
                </div>

                <div  className={styles.card} >
                    <div className={styles.contentCard}>
                        <p>User Regist</p>
                    </div>
                </div>

                <div  className={styles.card} >
                    <div className={styles.contentCard}>
                        <p>User Regist
                            
                        </p>
                    </div>
                </div>
                                 
            </div>

            
        </div>

    )
}

export default DSB;
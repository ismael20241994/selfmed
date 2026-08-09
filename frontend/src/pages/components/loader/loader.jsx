import styles from "./Loader.module.css";

export async function Loader({loding}) {
    if(!loding) return null;
  return (
    <div className={styles.loader_container}>
      <div className={styles.spinner}></div>
      <p>Carregando...</p>
    </div>
  );
};
export  function LoaderCircule (){
  return(
    <div className={styles.LoaderCircule}></div>
  )
}


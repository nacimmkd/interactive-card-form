import styles from './Confirmation.module.css'

const Confirmation: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.confiration_container}>
                <div className={styles.info_container}>
                    <img src="/images/icon-complete.svg" alt="Validation OK image" />
                    <h3>THANK YOU</h3>
                    <p>We've added your card details</p>
                </div>
                <div className={styles.btn_container}>
                    <a href="https://github.com/nacimmkd/interactive-card-form">Continue</a>
                </div>                
            </div>
        </div>
    )
}

export default Confirmation;
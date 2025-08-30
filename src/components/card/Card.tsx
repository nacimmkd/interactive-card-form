import styles from './Card.module.css'

type CardType = {
    card_holder?: string;
    card_number?: string;
    exp_date?: {month:string , year: string};
    cvc?: string;
    side: 'front' | 'back';
}

const Card: React.FC<CardType> = ({card_holder , card_number , exp_date , cvc  , side}) => {

    const CardNumberArray = card_number !== "" ? card_number?.split(" ") : "0000 0000 0000 0000".split(" ") ;

    if(side === "front") {
        return (
            <div className={styles.container} style={{backgroundImage : "url('/images/bg-card-front.png')"}}>
                <div className={styles.card}>
                    <div className={styles.logo_container}>
                        <div className={styles.card_logo}><img src="/images/card-logo.svg" alt="logo" /></div>
                    </div>

                    <div className={styles.info_container}>
                        <div className={styles.card_number}>
                            {CardNumberArray?.map((block , i) => <span key={i}>{block}</span>)}
                        </div>
                        <div className={styles.card_name_date}>
                            <div className={styles.card_name}><p>{card_holder !== "" ? card_holder : "Jane Appleseed"}</p></div>
                            <div className={styles.card_date}><p>{exp_date?.month !== "" ? exp_date?.month : "02"}</p> / <p>{exp_date?.year !== "" ? exp_date?.year : "25"}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if(side === "back") {
        return (
            <div className={styles.container} style={{backgroundImage : "url('/images/bg-card-back.png')"}}>
                <div className={styles.card_back}>
                    <div className={styles.cvc_container}>
                        <p>{cvc !== "" ? cvc : "123"}</p>
                    </div>
                </div>
            </div>
        )
    }

    return;
    
}

export default Card;
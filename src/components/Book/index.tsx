import React, {FC} from 'react';
import styles from './Book.module.scss'
import {Link} from "react-router-dom";

export const Book: FC = (props: any) => {
    const imgUrl = props.volumeInfo.imageLinks && props.volumeInfo.imageLinks.smallThumbnail
    const descriptionProps = (props.volumeInfo.description) ? props.volumeInfo.description : 'Немає опису'
    const description = descriptionProps.slice(0, 40)
    return (
        <div className={styles.book}>
            <img src={(imgUrl) ? imgUrl : '/img/notFound.jpg'} alt="book"/>
            <h3>{`${props.volumeInfo.title.slice(0, 35)}${(props.volumeInfo.title.length > 35 ? '...' : '')}`}</h3>
            <p>{`${description}${descriptionProps.length > 40 ? '...' : ''}`}</p>
            <div className={styles.interaction}>
                <Link to={`/${props.id}`}><button className={styles.read}>Read More</button></Link>
                <button className={styles.fav}><img src="/img/fav.png" alt="fav"/></button>
            </div>
        </div>
    );
};

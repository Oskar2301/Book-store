import React, {FC} from 'react';

export const NotFound: FC = () => {
    return (
        <div className='notfound'>
            <img src="/img/404.png" alt="404"/>
            <h1>Книга не найдена</h1>
            <p>Введіть коректну назву або надішліть в особистому кабінеті запит</p>
        </div>
    );
};

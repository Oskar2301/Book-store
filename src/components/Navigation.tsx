import React, {FC, useEffect, useState} from 'react';
import styles from "../pages/Home/Home.module.scss";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setItems} from "../redux/slices/homeSlice";

export const Navigation: FC = () => {
    const dispatch = useDispatch();
    const [currentCategory, setCurrentCategory] = useState<string>('')
    const [first, setFirst] = useState<boolean>(false)

    useEffect(() => {
       if(first){
           axios.get(`https://www.googleapis.com/books/v1/volumes?q=+subject:${currentCategory.toLowerCase()}&orderBy=newest&key=AIzaSyAm_7tIFZxbn-d_mvLS_Ov1UzPwYswDmw0&maxResults=28`)
               .then(res => {
                   dispatch(setItems(res.data.items))
               })
               .catch(err => {
                   console.log(err)
               })
       }
       setFirst(true)
    }, [currentCategory])

    const category = ['Humor', 'Science', 'Business', 'Drama', 'Fiction', 'Computers']
    return (
        <>
            <ul className={styles.nav}>
                {category.map((item: string, index: number) => <li key={index} onClick={() => setCurrentCategory(category[index])}>{category[index]}</li>)}
            </ul>
        </>
    );
};

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GlobalSevice(query, pageNumber){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [starships, setStarships] = useState([])
    const [search, setSearch] = useState(false)
    const [searchShip, setSearchShip] = useState([])
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        setSearchShip([])
    }, [query])
    
    useEffect(() => {
        setLoading(true)
        setSearch(false)
        setError(false)
        let cancel;
        if (query === ''){
            if(page < 5){
                axios ({
              method: 'GET',
              url: 'https://swapi.dev/api/starships/?page='+page
            }).then(res => {
                setStarships(prevShips => {
                    return [...new Set([...prevShips, ...res.data.results])]
                })
                setPage(p => p+1)
                console.log(page)
                setLoading(false)
            })   
            }
        }else{
            let cancel;
            setLoading(true)
            setError(false)
            setSearch(true)
            axios ({
                method: 'GET',
                url: 'https://swapi.dev/api/starships/?search='+query,
                params: {q: query, page: pageNumber},
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setSearchShip(prevSearch => {
                    return ([...res.data.results])
                })
                setPage(p => p = 1)
                setLoading(false)
            }).catch(e => {
                if(axios.isCancel(e)) return
                setError(true)
            })
            return () => cancel()   
        }
    }, [query, pageNumber])
    return {loading, error, starships, page, search, searchShip}
    
}